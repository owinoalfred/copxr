import { languages } from '../../../i18n/config'

export default function getLanguageFromRoute(path) {
    const language = extractLanguage(path)

    // extracted en from the-emergency/index-en
    if (language) {
        
        // someone changed the regex and it broke
        // the language should always be 2 characters, as it's used by the language files
        // and when determining routes
        if (language.length !== 2) {
            throw new Error('Language from route extracted incorrectly - should never happen')
        }

        if (languages.indexOf(language) > -1) {
            return language
        }
    }
    
    return 'en'
}

/**
 * 
 * @param {string} path 
 */
function extractLanguage(path) {
    // find the last 2 characters at the end
    const regexAtEnd = new RegExp(`-(${languages.join('|')})/?$`) // the-path-nl or the-path-es or the-path-nl/
    const regexAtEndMatch = path.match(regexAtEnd)
    if (regexAtEndMatch) {
        const regexLanguage = regexAtEndMatch[1]
        return regexLanguage
    }

    // find the last 2 characters at the front
    const regexAtFront = new RegExp(`^/(${languages.join('|')})(/|$)`) // /nl/the-path
    // ^ = beginning of line
    // \/ = / slashes
    // (\w{2}) = match any 2 characters
    // (\/|$) = match a slash and then more stuff, or match the end of the line

    const regexAtFrontMatch = path.match(regexAtFront)
    if (regexAtFrontMatch) {
        const regexLanguage = regexAtFrontMatch[1]
        return regexLanguage
    }
}
