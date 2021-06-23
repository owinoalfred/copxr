const { getLangPath, getPathWithoutLang } = require('../../src/lib/router/utils/fillLanguagesInPathToFileMap')


/**
 * returns a list of meta tags for the head to populate the "hreflang"s for each page
 */
module.exports = function renderHrefLang(pageUrl, pageLanguage, siteLanguages) {
    return siteLanguages
            .map(siteLanguage => `<link rel="alternate" hreflang="${siteLanguage}" href="${getLangPath(siteLanguage, getPathWithoutLang(pageUrl, pageLanguage))}" />`)
            .join('')
}
