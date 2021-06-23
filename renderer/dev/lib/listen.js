const http = require('http')

/**
 * Our mini http server with zero dependencies
 */
module.exports = function listen(port, requestListener) {
    console.time('server listen')

    const server = new http.Server(requestListener)

    server.on('error', err => {
        console.error('server:', err.stack)
        throw err
    })

    server.listen(port, () => {
        registerShutdown(() => server.close())
        console.log(`server: Accepting connections on port ${port}`)

        // https://github.com/patrick-steele-idem/browser-refresh
        // live reload: tells the client to restart when the server has restarted after data has changed
        if (process.send) {
            process.send({
                event: 'online', // tell client that we are live
                url: 'http://localhost:' + port // open browser
            })
        }

        console.timeEnd('server listen')
    })

    return server
}

/**
 * Close the server on an exit signal
 */
function registerShutdown(fn) {
    let run = false

    const wrapper = () => {
        if (!run) {
            run = true
            fn()
        }
    }

    process.on('SIGINT', wrapper)
    process.on('SIGTERM', wrapper)
    process.on('exit', wrapper)
}
