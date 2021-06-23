const listen = require('./lib/listen')
const render = require('../render')
const serve = require('serve-handler')
const path = require('path')

/**
 * Our dev-server renders a specific page only for the URL you're visiting
 * This allows us to only build changed / required files
 *
 * This is a very tiny server with only 1 tiny dependency that handles static files via serve-handler
 * This should only run during development, in production, we can just use nginx or apache.
 */
async function requestListener(request, response) {
    // console.log('requestListener:', request.url)

    // a lazy way of finding favicon.ico or /css/main.css or images in /assets
    if (isValidPublicFile(request.url)) {
        await serve(request, response, { public: path.join(__dirname, '../../public') })
        return // serve-handler should handle this entire request
    }

    if (request.url.indexOf('/php') === 0) {
        response.writeHead(307,
            { Location: 'http://localhost:8081' + request.url}
        )
        response.end()
        return
    }

    // render the HTML and see how long it took us
    console.time('render')
    const html = await render(request.url)
    console.timeEnd('render')

    // send the HTML
    response.writeHead(200, { "Content-Type": "text/html" })
    
    const HTMLWithBrowserRefresh = injectBrowserRestart(html)
    response.end(HTMLWithBrowserRefresh)
}

/**
 * Injects code for browser-refresh to reload the browser whenever the server restarts
 * @param {string} html
 */
function injectBrowserRestart(html) {
    if (!process.env.BROWSER_REFRESH_URL) {
        return html
    }

    const bodyEndTagIndex = html.indexOf('</body>')
    return `
        ${html.substr(0, bodyEndTagIndex)}
        <script src="${process.env.BROWSER_REFRESH_URL}"></script>
        </body>
        </html>
    `
}

function isValidPublicFile(url) {
    if (url.indexOf('/css') === 0) {
        return true
    }
    if (url.indexOf('/js') === 0) {
        return true
    }
    if (url.indexOf('/assets') === 0) {
        return true
    }
    if (url.indexOf('/admin') === 0) {
        return true
    }
    if (url.indexOf('.ico') > -1) {
        return true
    }
    return false
}

// listen to the port, and send every request to requestListener
listen(process.env.PORT || 3000, requestListener)