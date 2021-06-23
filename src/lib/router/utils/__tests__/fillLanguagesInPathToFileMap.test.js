import fillLanguagesInPathToFileMap, { getPathWithoutLang } from '../fillLanguagesInPathToFileMap'

test('fillLanguagesInPathToFileMap', () => {
    const pathToFileMap = {
        '/404/': './404.vue',
        '/groups/:group/': './groups/_group.vue',
        '/groups/': './groups/index.vue',
        '/': './index.vue',
        '/test/': './test.vue',
        '/de/the-emergency/': './the-emergency/index-de.md',
        '/es/the-emergency/': './the-emergency/index-ru.md',
        '/the-emergency/': './the-emergency/index.md'
    }
    const languages = ['en', 'de', 'es']
    const result = fillLanguagesInPathToFileMap(pathToFileMap, languages)
    if (process.env.APP_ENV !== 'staging') {
        expect(result).toEqual({
            '/404/': './404.vue',
            '/de/404/': './404.vue',
            '/es/404/': './404.vue',
            '/groups/:group/': './groups/_group.vue',
            '/de/groups/:group/': './groups/_group.vue',
            '/es/groups/:group/': './groups/_group.vue',
            '/groups/': './groups/index.vue',
            '/de/groups/': './groups/index.vue',
            '/es/groups/': './groups/index.vue',
            '/': './index.vue',
            '/de/': './index.vue',
            '/es/': './index.vue',
            '/test/': './test.vue',
            '/de/test/': './test.vue',
            '/es/test/': './test.vue',
            '/de/the-emergency/': './the-emergency/index-de.md',
            '/es/the-emergency/': './the-emergency/index-ru.md',
            '/the-emergency/': './the-emergency/index.md'
        })
    }
})

test('getPathWithoutLang', () => {
    expect(getPathWithoutLang('/es', 'es')).toEqual('/')
    expect(getPathWithoutLang('/es/', 'es')).toEqual('/')
    expect(getPathWithoutLang('/esa', 'es')).toEqual('/esa')
    expect(getPathWithoutLang('/esa/', 'es')).toEqual('/esa/')
    expect(getPathWithoutLang('/es/the-emergency', 'es')).toEqual('/the-emergency')
    expect(getPathWithoutLang('/es/the-emergency/', 'es')).toEqual('/the-emergency/')
})