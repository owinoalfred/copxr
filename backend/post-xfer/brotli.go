/*

This program is run (as a script, with "go run") every time an rsync is made
to the target webserver.

It runs as a background job, compressing all css/svg/json/js/xml/html files with
brotli (unless there are already matching .br files present).

We use a unix socket in brotli/brotli.sock to get notification that another
instance of this program wants to take over (because a new rsync has uploaded
a new docroot before we could finish all the compression).

We also use a lockfile in brotli/connecting.lock to make sure there is only
a single instance of this program attempting to connect to the unix socket
at a given time.

The actions are the following:

- Make sure there is a brotli directory where we can create/remove files
- Make sure there is a www/docroot directory

- Acquire a lock on brotli/connecting.lock. If the lock is busy, another
  instance of this program is already connecting to the socket. In this
  case, abort right away.

- Try to connect to the unix socket to signal another running instance of this
  program that it should terminate asap, because we want to run.

- If the connection succeeds, wait for the socket to get closed, meaning that the
  running program is terminating.

- If the connection fails, there was no running instance of the program.

- Create the socket and start listening immediately on it.

- Then, remove the connecting.lock file so other instances of the program
  can take over if needed.

- At any time, if a connection is noticed on the socket :
  . stop all compressing tasks as soon as possible
  . close the socket down
  . terminate immediately.

- Find all files to be compressed in www/docroot and compress them with
  low priority so we do not eat too many server resources at once.

*/

package main

import (
	"context"
	"fmt"
	"log/syslog"
	"net"
	"os"
	"os/exec"
	"os/signal"
	"path/filepath"
	"strconv"
	"strings"
	"syscall"
	"time"
)

var (
	Debug         bool   = false
	CompressLevel string = "11"
	CompressStats map[string]int
	sysLog        *syslog.Writer
)

func Fatal(msg string, args ...interface{}) { //{
	if sysLog != nil {
		fmt.Fprintf(sysLog, msg, args...)
	}
	fmt.Fprintf(os.Stderr, msg, args...)
	os.Exit(1)
} //}

// File locks - based on https://github.com/juju/fslock/blob/master/fslock_nix.go
type Lock struct { //{
	filename string
	fd       int
} //}
func CreateLock(filename string) (*Lock, error) { //{
	l := &Lock{filename: filename}
	fd, err := syscall.Open(l.filename, syscall.O_CREAT|syscall.O_RDONLY, 0600)
	if err != nil {
		return nil, err
	}
	l.fd = fd
	err = syscall.Flock(l.fd, syscall.LOCK_EX|syscall.LOCK_NB)
	if err != nil {
		syscall.Close(l.fd)
		return nil, err
	}
	return l, nil
} //}
func (l *Lock) Close() error { //{
	os.Remove(l.filename)
	return syscall.Close(l.fd)
} //}

func CompressJob(ctx context.Context, id int, f string, c chan int) { //{	[GoRoutine]

	tmp := fmt.Sprintf("%s.br.%d.tmp", f, os.Getpid())

	if err := exec.CommandContext(ctx, "ionice", "-c", "3", "nice", "-n", "18", "/usr/bin/brotli", "-q", CompressLevel, "-k", "-o", tmp, f).Run(); err != nil {
		fmt.Printf("FAILURE FOR %s: %s\n", f, err.Error())
		os.Remove(tmp)
	} else {
		if err := os.Rename(tmp, f+".br"); err != nil {
			os.Remove(tmp)
		} else if Debug {
			fmt.Printf("[%5d] COMPRESSED %s\n", id, f)
		}
	}

	c <- id

} //}

func ScanFiles(fc chan string) { //{	[GoRoutine]

	check := func(path string, info os.FileInfo, err error) error {

		var ext string

		switch {
		case err != nil:
			// Failure accessing path - let's ignore it
			return nil

		case !info.Mode().IsRegular():
			// Not a regular file
			return nil

		case info.Size() < 128:
			// File too small to be worth compressing
			return nil

		case strings.HasSuffix(path, ".css"):
			ext = "css"
		case strings.HasSuffix(path, ".svg"):
			ext = "svg"
		case strings.HasSuffix(path, ".json"):
			ext = "json"
		case strings.HasSuffix(path, ".js"):
			ext = "js"
		case strings.HasSuffix(path, ".xml"):
			ext = "xml"
		case strings.HasSuffix(path, ".html"):
			ext = "html"

		default:
			// We don't need to compress this file
			return nil
		}

		// Check if there is already a ".br" file
		if _, err := os.Stat(path + ".br"); err == nil {
			return nil
		}

		// Need to compress this file
		fc <- path

		CompressStats[ext] += 1

		return nil
	}

	err := filepath.Walk(".", check)
	if err != nil {
		Fatal("filepath.Walk(): %s\n", err.Error())
	}

	// Tell the main loop we have scanned all files
	close(fc)

} //}

func SocketAccept(l net.Listener, c chan struct{}) { //{ [GoRoutine]
	// Wait for a connection on the Unix socket.
	// As soon as a connection is noticed, close the c chan and return.
	l.Accept()
	close(c)
} //}

func main() { //{

	// Open syslog
	var err error
	sysLog, err = syslog.Dial("", "", syslog.LOG_NOTICE|syslog.LOG_USER, "vue-brotli-compressor")
	if err != nil {
		sysLog = nil
	}

	// Check command line
	for _, arg := range os.Args[1:] {
		i, err := strconv.Atoi(arg)
		switch {
		case arg == "-d":
			Debug = true
		case err == nil && i >= -11 && i <= -1:
			CompressLevel = fmt.Sprintf("%d", -i)
		default:
			Fatal("Unexpected arg: %s\n", arg)
		}
	}

	// Get the current directory
	currentWorkingDirectory, err := os.Getwd()
	if err != nil {
		Fatal("%s\n", err.Error())
	}

	// Compute the paths
	docrootPath := filepath.Join(currentWorkingDirectory, "www", "docroot")
	cLockPath := filepath.Join(currentWorkingDirectory, "brotli", "connecting.lock")
	testFilePath := filepath.Join(currentWorkingDirectory, "brotli", fmt.Sprintf("test.%d.tmp", os.Getpid()))
	socketPath := filepath.Join(currentWorkingDirectory, "brotli", "brotli.sock")

	// Make sure we can chdir into the docroot. We will scan for files from there, so
	// there's no issue if it's a symlink and it gets suddenly changed (by a new rsync push).
	if err := os.Chdir(docrootPath); err != nil {
		Fatal("%s\n", err.Error())
	}

	// Make sure there is a brotli directory and that we can create files in it
	f, err := os.Create(testFilePath)
	if err != nil {
		Fatal("Unable to create %s\n", testFilePath)
	}
	f.Close()
	os.Remove(testFilePath)

	// Acquire the connecting lock
	cLock, err := CreateLock(cLockPath)
	if err != nil {
		Fatal("%s\n", err.Error())
	}

	// Connect to the unix socket
	c, err := net.Dial("unix", socketPath)
	if err == nil {
		// The connection succeeded. Another instance was running.
		// Wait for it to terminate.
		buf := make([]byte, 1)
		c.Read(buf)
		c.Close()
	}

	// Ok, we are now the only intance running.

	takeOverChan := make(chan struct{})
	fileChan := make(chan string, 16)
	CompressStats = make(map[string]int)

	// Create the UNIX socket and start listening immediately.
	os.Remove(socketPath)
	listener, err := net.Listen("unix", socketPath)
	if err != nil {
		Fatal("Listen error: %s\n", err.Error())
	}

	go SocketAccept(listener, takeOverChan)

	// Close and remove the connecting lock
	cLock.Close()

	sigNotification := make(chan os.Signal, 1)
	signal.Notify(sigNotification, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT, syscall.SIGHUP)

	start := time.Now()

	// Start scanning for files to compress
	go ScanFiles(fileChan)

	// Enter the main loop

	jobs := make(map[int]context.CancelFunc)
	maxRunningJobs := 2
	curJobId := 0
	scanDone := false
	jobChan := make(chan int, 8)
	takeover := false
	abort := false

mainloop:
	for !scanDone || len(jobs) > 0 {
		// Create subprocesses if there are pending files and free process slots

		for !scanDone && len(jobs) < maxRunningJobs {
			// We can spawn another job. Get a file to compress.
			if file, ok := <-fileChan; ok {
				curJobId++
				ctx, cfunc := context.WithCancel(context.Background())
				jobs[curJobId] = cfunc
				go CompressJob(ctx, curJobId, file, jobChan)
			} else {
				// No more file to scan
				scanDone = true
				if Debug {
					fmt.Printf("All files have been scanned.\n")
				}
			}
		}

		if scanDone && len(jobs) == 0 {
			break mainloop
		}

		select {

		case id := <-jobChan:
			// One job is done
			jobs[id]() // run the context CancelFunc
			delete(jobs, id)

		case <-takeOverChan:
			takeover = true
			break mainloop

		case <-sigNotification:
			abort = true
			break mainloop
		}
	}

	if takeover || abort {
		// Kill all running jobs
		for _, cfunc := range jobs {
			cfunc()
		}
		// Wait for completion
		for len(jobs) > 0 {
			id := <-jobChan
			delete(jobs, id)
		}
	}

	// Cleanup and exit

	stats := "Compressed: "

	if len(CompressStats) > 0 {
		for ext, n := range CompressStats {
			stats += fmt.Sprintf("%d %s, ", n, ext)
		}
		stats = stats[:len(stats)-2] + fmt.Sprintf(" files in %s", time.Since(start))
	} else {
		stats += fmt.Sprintf("no file (ran for %s)", time.Since(start))
	}

	if abort {
		stats += " [SIGNAL CAUGHT, ABORTED]"
	} else if takeover {
		stats += " [ANOTHER INSTANCE IS NOW TAKING OVER]"
	}

	if Debug {
		fmt.Printf("%s\n", stats)
		fmt.Printf("Exiting.\n")
	} else if sysLog != nil {
		fmt.Fprintf(sysLog, "%s\n", stats)
	}

	os.Remove(socketPath)
	listener.Close()
	os.Exit(0)

} //}

// vim: set ts=4 sw=4 foldenable foldmethod=marker foldmarker=//{,//}:
