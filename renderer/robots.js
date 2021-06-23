const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const copyFile = promisify(fs.copyFile)
const { APP_ENV } = require('./config')

module.exports = async function generateRobots() {
    const outDir = path.resolve(__dirname, '../public')
    const robotsEnvPath = path.join(outDir, `robots.txt.${APP_ENV}`)
    const robotsResultPath = path.join(outDir, `robots.txt`)
    await copyFile(robotsEnvPath, robotsResultPath)
}