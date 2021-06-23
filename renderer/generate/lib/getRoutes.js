const glob = require('glob')
const path = require('path')
const getPathFromModulePath = require('../../../src/lib/router/utils/getPathFromModulePath').default
const fillLanguagesInPathToFileMap = require('../../../src/lib/router/utils/fillLanguagesInPathToFileMap').default
const languages = require('../../../src/i18n/config').languages
const { parseISO, isValid, format } = require('date-fns')

/**
 * a list of routes that should be rendered during the generate step
 * right now, it's hard to know which routes are actually required
 * it's trivial to set this up this way however
 */
module.exports = function getRoutes(siteData) {
    const groups = Object.values(siteData.groups)
    const countries = groups.filter(g => g.iscountry)

    const blog = getPosts(siteData.blog, 'blog')
    const press = getPosts(siteData.press, 'press')
    const events = siteData.branch_events_array.map((event) => `/event/${event.id}/`)

    // all our pages as the route: eg. /the-emergency
    const pages = glob.sync(path.resolve(__dirname, '../../..', 'src/pages/**/*.{md,vue}')).map(filePath => {
        const basePath = path.resolve(__dirname, '../../../src/pages')
        const modulePath = filePath.replace(basePath, '')
        const url = getPathFromModulePath(modulePath)
        return url
    })

    const englishLanguageLinks = [
        '/',
        '/404/',
        '/groups/',
        ...groups.map(group => `/groups/${group.key}/`),
        '/maps/',
        ...countries.map(group => `/maps/${group.key}/`),
        ...countries.map(group => `/maps/${group.key}/groups/`),
        ...countries.map(group => `/maps/${group.key}/events/`),
        ...pages,
        ...blog,
        ...press,
        ...events,
    ]

    const allLanguageLinks = fillLinksWithLanguages(englishLanguageLinks)

    return allLanguageLinks
}

function getPosts(posts, base) {
    const result = []
    for (const key in posts) {
        const post = posts[key]
        const dateObj = parseISO(post.date)
        if (!isValid(dateObj)) {
            continue
        }

        const dateStr = format(dateObj, 'yyyy/MM/dd')
        const url = `/${base}/${dateStr}/${post.slug}/`
        result.push(url)
    }
    return result
}

/**
 * Checks all the links (such as /the-path) and adds /es/the-path to every link if it does not exist already
 * Will also remove duplicates and empty routes
 * @param { string[] } links
 */
function fillLinksWithLanguages(links) {
    /** @type { { [path: string]: string }} */
    const fakePathToFileMap = {}
    for (const link of links) {
        if (!link) {
            continue // remove empty routes
        }
        fakePathToFileMap[link] = link
    }
    const fakePathToFileMapWithLang = fillLanguagesInPathToFileMap(fakePathToFileMap, languages)
    return Object.keys(fakePathToFileMapWithLang)
}