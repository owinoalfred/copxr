
const { host } = require('./config')
const writeFileToPublic = require('./generate/lib/writeFileToPublic')

/**
 * https://www.sitemaps.org/protocol.html
 */
module.exports = async function generateSitemap(routes) {
    const text = routes.map((path) => `${host}${path}`).join('\n')
    await writeFileToPublic('sitemap.txt', text)
}