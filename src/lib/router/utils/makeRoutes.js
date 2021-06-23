import getLanguageFromRoute from './getLanguageFromRoute'
import getRegex from './getRegex'

/**
 * From our { route: filePath } map, make an array of routes with a correct regex
 */
export default function makeRoutes(pathToFileMap) {
    // parse and recreate config for use
    const routes = Object.keys(pathToFileMap).map(function (path) {
        const modulePath = pathToFileMap[path]

        const language = getLanguageFromRoute(path)

        // /world/:country/:city creates a regex that can find match these :params via regex groups
        const regex = getRegex(path)

        return makeRoute(path, regex, modulePath, language)
    })

    // Add our 404 page as a wildcard
    routes.push(makeRoute('*', /.*/, 'src/pages/404.vue', 'en'))

    return routes
}

function makeRoute(path, regex, modulePath, language) {
    return { path, regex, modulePath, language }
}
