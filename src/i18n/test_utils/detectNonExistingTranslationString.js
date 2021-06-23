const glob = require('glob')
const path = require('path')
const fs = require('fs')


const red = '\x1b[1m\x1b[31m'
const wht = '\x1b[1m\x1b[36m'
const rst = '\x1b[0m'

/**
 * This file searches all .js and .vue files for $() and returns an error status code
 */

const regex = /\$t\(['|"|`](\w+)['|"|`]\)/gmi

/** @returns {Boolean} isOkay */
export default function detectNonExistingTranslationString (dict, writeUsage = false) {
  const usageMap = Object.keys(dict).reduce((acc, cur) => {
    acc[cur] = 0
    return acc
  }, {})

  const files = glob.sync(path.join(__dirname, '../..', '**', '**.?(js|vue)'))
  const result = {
    files: [],
    ok: true
  }

  // detect
  for (const fp of files) {
    const file = fs.readFileSync(fp).toString()
    const lines = file.split('\n')

    const resultFile = {
      path: fp.replace(path.join(__dirname, '..'), ''),
      lines: [],
      ok: true
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      const hasMatch = regex.test(line)
      regex.lastIndex = 0
      if (hasMatch) {
        let m
        while ((m = regex.exec(line)) !== null) {
          const key = m[1]
          usageMap[key]++
          if (!dict[key]) {
            resultFile.lines.push({
              line: i,
              text: line,
              match: key,
            })

            usageMap[key] = -1
            resultFile.ok = false
          } else {
            usageMap[key]++
          }
        }
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

  if (writeUsage) {
    const sortedUsageMap = Object.keys(usageMap).sort(function(a,b){return usageMap[b]-usageMap[a]}).reduce((acc, cur) => {
      acc[cur] = usageMap[cur]
      return acc
    }, {})
    fs.writeFileSync(`${__dirname}/usage.log`, JSON.stringify(sortedUsageMap, null, 2))
  }

  return result.ok
}

function reportToConsole (result) {
  console.log('\nDetected possibly non-existant string in %d files\n\n', result.files.length)
  for (const file of result.files) {
    console.log('%s%s%s', wht, file.path, rst)

    for (const line of file.lines) {
      let match = line.text.replace(line.match, `${red}${line.match}${rst}`)
      console.log(' %d   %s', line.line, match)
    }
  }
}
