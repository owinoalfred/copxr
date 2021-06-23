import getLanguageFromRoute from '../utils/getLanguageFromRoute'

/**
 * Converts filepaths to a URL route that we can match to.
 * This creates a permalink and from this path we can create a regex
 * 
 * @param {String} modulePath system filePath to the vue or markdown component
 */
export default function getPathFromModulePath(modulePath) {
    const path = modulePath
        .replace(/\.(vue|md)$/, '/') // /groups/_slug.vue => /groups/_slug/
        .replace('./index', '/') // /index => / (exception for root index)
        .replace(/\/index\/?$/, '/') // ./groups/index => /groups/
        .replace(/^\.\//, '/') // ./groups/_slug => /groups/_slug
        .replace(/\/_/gm, '/:') // /groups/_slug => /groups/:slug
        .replace(/\/\//gm, '/') // // => /

    // /the-emergency/index-es/ => /es/the-emergency/
    const language = getLanguageFromRoute(path)
    if (language !== 'en') {
        return `/${language}${path}`
            .replace(new RegExp(`/index-${language}/?$`), '/')
    }
    
    return path
}