const url = require('url')

/**
 * 
 * @param { string } groupWebsite https://xrbelgium.be/test-123
 * @returns { string } xrbelgium.be
 */
export default function toDomain(groupWebsite) {
    if (!groupWebsite) {
        return
    }
    if (groupWebsite.indexOf('.') === -1) {
        return
    }
    if (groupWebsite.indexOf('http') === -1) {
        groupWebsite = `https://${groupWebsite}`
    }
    const q = url.parse(groupWebsite, true)
    const host = q.host
    return host.replace(/^www\./, '')
}