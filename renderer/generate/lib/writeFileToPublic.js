const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const write = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)

module.exports = async function writeFileToPublic(filename, contents) {
    const outDir = path.resolve(__dirname, '../../../public')
    const fullPath = path.join(outDir, filename)
    await mkdir(path.dirname(fullPath), { recursive: true })
    await write(fullPath, contents)
}