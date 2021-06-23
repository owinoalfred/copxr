const glob = require('glob')

module.exports = function resolveFiles(rootDir) {
    const files = {}

    const filesInDir = glob.sync(rootDir + '/**/*.vue')

    for (const page of filesInDir) {
        const key = getRouteKeyForFile(rootDir, page)
        if (/\.vue$/.test(page) || !files[key]) {
            files[key] = page
        }
    }

    return files
}

function getRouteKeyForFile(rootDir, page) {
    return page
        .replace('.vue', '') // src/pages/groups/_slug.vue => src/pages/groups/_slug
        .replace(rootDir, '') // src/pages/groups/_slug => /groups/_slug
        .replace(/\/_/gm, '/:') // src/pages/groups/_slug => /groups/:slug
}

