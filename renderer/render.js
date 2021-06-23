require('@babel/register')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
const getSiteData = require('./siteData')
const renderPageScripts = require('./lib/renderPageScripts')
const renderHrefLang = require('./lib/renderHrefLang')
const getLanguageFromRoute = require('../src/lib/router/utils/getLanguageFromRoute').default
const { host } = require('./config')
const { languages } = require('../src/i18n/config')

// our base HTML template
const template = require('fs').readFileSync(path.join(__dirname, '../src/index.template.html'), 'utf-8')

// Webpack builds these files
const serverBundle = require('../public/vue-ssr-server-bundle.json') // this contains all the vue components
const clientManifest = require('../public/vue-ssr-client-manifest.json') // this contains all the css files

const bundleRenderer = createBundleRenderer(serverBundle, {
    runInNewContext: false, // don't create a new global Node.js context, this is fine as we don't have dynamic user data per request
    template,
    clientManifest,

    // Don't auto-inject scripts => we add our own custom renderStyles() in index.template.html so the CSS is included
    // This way we don't include the generated unusedClientBundle making the resulting output super-safe,
    // as there is no Javascript engine running for the user! Only static content!
    inject: false,
})

const defaultContext = {
    title: 'Extinction Rebellion', // the {{ title }} in our index.template.html needs this
    host,
    production: process.env.APP_ENV === 'production',
}

/**
 * Our main render function
 * 1. Is passed the URL to render + defaultcontext
 * 2. Gets the siteData
 * 3. Passes all this data to src/entry.js
 * 4. All the Vue.js content is rendered into a string and is returned
 */
module.exports = async function renderURL(url) {
    try {
        const language = getLanguageFromRoute(url)
        const context = {
            ...defaultContext,
            ...await getSiteData(),
            url,
            language,
            pageScripts: [],
            matomoID: getMatomoID(url)
        }
        context.renderPageScripts = () => renderPageScripts(context.pageScripts)
        context.renderHrefLang = () => renderHrefLang(url, language, languages)
        validateRenderContext(context)
        return await bundleRenderer.renderToString(context)
    } catch(e) {
        console.error('renderURL failed', url, e)
        return ''
    }
}

function getMatomoID(url) {
    if (url.indexOf('/maps') > -1) {
        return 3 // global map embed
    }
    return 1 // global
}

/**
 * Catch errors early, should never happen really
 */
function validateRenderContext(context) {
    if (!context.url) {
        throw new Error('context is missing "url" param')
    }
    if (!context.title) {
        throw new Error('context is missing "title" param, you should provide a default here')
    }
    if (!context.language) {
        throw new Error('context is missing "language" param, you should provide a default here')
    }
}