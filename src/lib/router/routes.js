import resolveFiles from './utils/resolveFiles'
import makeRoutes from './utils/makeRoutes'

// finds all vue/md files in src/pages and maps them to a { route: filepath } map
// { '/groups/:slug': 'src/pages/groups/_slug.vue' }
const pathToFileMap = resolveFiles()

// generate a regex for every route and returns an array of routes
// [{ path: /^\/groups\/([\w-]+)$/, modulePath: 'src/pages/groups/_slug.vue',  ...]
const routes = makeRoutes(pathToFileMap)

export default routes
