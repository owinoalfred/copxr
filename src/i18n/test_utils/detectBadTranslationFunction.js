const glob = require('glob')
const path = require('path')
const fs = require('fs')

const red = '\x1b[1m\x1b[31m'
const wht = '\x1b[1m\x1b[36m'
const rst = '\x1b[0m'

/**
 * This file searches all .js and .vue files for $() and returns an error status code
 */

/** @returns {Boolean} isOkay */
export default function detectBadTranslationFunction () {
  const files = glob.sync(path.join(__dirname, '../..', '**', '**.?(js|vue)'))

  const result = {
    files: [],
    ok: true
  }

  // detect
  for (const fp of files) {
    if (fp.includes('test')) {
      continue
    }

    const file = fs.readFileSync(fp).toString()
    const lines = file.split('\n')

    const resultFile = {
      path: fp.replace(path.join(__dirname, '..'), ''),
      lines: [],
      ok: true
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      const match = line.match(/\$\(/gmi)
      if (match) {
        resultFile.lines.push({
          line: i,
          text: line,
          match: match
        })

        resultFile.ok = false
      }
    }

    if (!resultFile.ok) {
      result.ok = false
      result.files.push(resultFile)
    }
  }

  // report
  if (!result.ok) {
    reportToConsole(result)
  }

  return result.ok
}

function reportToConsole (result) {
  console.log('\nDetected invalid translation $() vs $t() in %d files\n\n', result.files.length)

  for (const file of result.files) {
    console.log('%s%s%s', wht, file.path, rst)

    for (const line of file.lines) {
      let match = line.text
      for (const m of line.match) {
        match = match.replace(m, `${red}${m}${rst}`)
      }

      console.log(' %d   %s', line.line, match)
    }

    console.log()
  }
}
