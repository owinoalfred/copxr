const path = require('path')
const manifest = require('../../public/js/manifest.json')

/**
 * loads the async scripts generated in webpack.config.js
 * because we are using split-chunks, we need to load all the seperate chunks as well
 * this allows much quicker loads, smaller and shared files
 */
module.exports = function renderPageScripts(pageScripts) {
    const result = []

    for (const scriptRelativePath of pageScripts) {
        addScript(result, scriptRelativePath)
    }

    return result.join(' ')
}

function addScript(result, scriptRelativePath) {
    const scriptName = path.basename(scriptRelativePath)
    if (scriptName !== scriptRelativePath) (
        console.log('just use the script name without path:', scriptName)
    )

    const entryFile = manifest.entrypoints[path.basename(scriptName, '.js')]
    if (!entryFile) {
        console.log('Generated path not found', { scriptRelativePath, scriptName })
        return
    }

    const assets = entryFile.assets
    for (const assetName of assets) {
        const htmlModern = `<script type="module" src="/js-modern/${assetName}" defer></script>`
        if (result.indexOf(htmlModern) === -1) {
            result.push(htmlModern)
        }

        const html = `<script nomodule src="/js/${assetName}" defer></script>`
        if (result.indexOf(html) === -1) {
            result.push(html)
        }
    }
}