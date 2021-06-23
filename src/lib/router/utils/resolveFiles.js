import getPathFromModulePath from './getPathFromModulePath'
import fillLanguagesInPathToFileMap from './fillLanguagesInPathToFileMap'
import { languages } from '../../../i18n/config'

/**
 * Find all .vue and .md files in the src/pages folder.
 * Then convert our filename to a route
 * returns a map of { route: filepath }
 */
export default function resolveFiles() {
    /** @type { { [path: string]: string }} */
    const pathToFileMap = {}

    const filesInDir = getFilesInPageDirectory()

    for (const modulePath of filesInDir) {
        const path = getPathFromModulePath(modulePath)
        if (/\.vue$/.test(modulePath) || !pathToFileMap[path]) {
            pathToFileMap[path] = modulePath
        }
    }

    const pathToFileMapForEveryLanguage = fillLanguagesInPathToFileMap(pathToFileMap, languages)

    return pathToFileMapForEveryLanguage
}

function getFilesInPageDirectory() {
    if (process.env.NODE_ENV === 'test') {
        // jest needs these files via glob because it doesn't have require.context
        const glob = require('glob')
        return glob.sync('src/pages/**/*.{vue,md}').map((filePath) => filePath.replace('src/pages/', './'))
    }

    // get files in directory via webpack's require.context
    return require.context('../../../pages', true, /\.(vue|md)$/).keys()
}