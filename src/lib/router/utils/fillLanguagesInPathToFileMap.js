import getLanguageFromRoute from './getLanguageFromRoute'

/**
 * This file is what allows other languages to display content in their language
 * Before this: a route is generated such as /the-emergency => src/pages/the-emergency.vue
 * This adds: /es/the-emergency => src/pages/the-emergency.vue
 * For every languages, it adds a compatible path that leads to the module
 * 
 * @param { { [path: string]: string }} pathToFileMap 
 * @param {string[]} languages 
 * @mutation
 */
export default function fillLanguagesInPathToFileMap(pathToFileMap, languages) {
    const result = {}
    const langToPathsArray = getPathPerLanguage(pathToFileMap, languages)

    // English should always have a path for a route
    // it's not possible to have an Spanish-only route for example
    const basePathToFileMap = langToPathsArray['en']

    for (const path in basePathToFileMap) {
        const baseModulePath = pathToFileMap[path]
        result[path] = baseModulePath // add the English result first

        // for all the other languages, check if we have an equivalent 
        for (const language in langToPathsArray) {
            if (language === 'en') { continue }
            const langPathToFileMap = langToPathsArray[language]
    

            const langPath = getLangPath(language, path)
            const langModulePath = langPathToFileMap[path]
            
            if (langModulePath) {
                // do we have an existing file? Then add it's specific modulePath
                result[langPath] = langModulePath
                continue
            }

            // fall back to the English modulePath
            result[langPath] = baseModulePath
        }
    }

    return result
}

/**
 * Adds the /es part to /es/the-path
 * @param { string } language 
 * @param { string } path 
 */
export function getLangPath(language, path) {
    if (language === 'en') {
        return path // path should always be passed as root
    }

    if (path === '/') {
        return `/${language}/` // /es/ should be /es
    }

    return `/${language}${path}`
}

/**
 * 
 * @param { { [path: string]: string }} pathToFileMap
 * @param {string[]} languages
 */
function getPathPerLanguage(pathToFileMap, languages) {
    /** @type {{ [language: string]: { [path: string]: string } }} */
    const langToPathsArray = {}
    for (const lang of languages) {
        langToPathsArray[lang] = {}
    }

    for (const path in pathToFileMap) {
        const modulePath = pathToFileMap[path]
        const language = getLanguageFromRoute(path)
        const pathWithoutLang = getPathWithoutLang(path, language)
        langToPathsArray[language][pathWithoutLang] = modulePath
    }

    return langToPathsArray
}

/**
 * Remove the /es part of /es/the-emergency
 * Or the es part of /es
 */
export function getPathWithoutLang(path, language) {
    const regexp = new RegExp(`^/${language}(/|$)`) // string starts with /es/
    return path.replace(regexp, '/') // /es/ -> /
}