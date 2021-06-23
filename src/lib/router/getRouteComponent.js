import routes from './routes'

/**
 * Tries to find a matching route for our URL and parses params
 */
export default function getRouteComponent(url) {
    for (const route of routes) {
        // every route has a regex => see if this URL matches it
        const found = url.match(route.regex) // <- regex created in ./utils/makeRoutes
        if (!found) {
            continue
        }

        // We have a match! Extract any params:
        // /groups/_group.vue => /groups/:group
        // /groups/be-belgium => { group: 'be-belgium' }
        const params = found.groups || {}
        
        const $route = {
            ...route,
            url,
            params,
        }
        return $route
    }

    throw new Error('Could not find route - should never happen because there is a wildcard route (/* => 404.vue) defined')
}
