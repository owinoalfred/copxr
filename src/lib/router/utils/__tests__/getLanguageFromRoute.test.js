import getLanguageFromRoute from '../getLanguageFromRoute'

test('getLanguageFromRoute', () => {
    expect(getLanguageFromRoute('/test')).toBe('en')
    expect(getLanguageFromRoute('/test/index')).toBe('en')
    expect(getLanguageFromRoute('/test-xr')).toBe('en') // and not "xr"
    if (process.env.APP_ENV !== 'staging') {
        expect(getLanguageFromRoute('/test-es')).toBe('es')
        expect(getLanguageFromRoute('/test-fr')).toBe('fr')
        expect(getLanguageFromRoute('/es/the-emergency')).toBe('es')
        expect(getLanguageFromRoute('/the-emergency/index-es/')).toBe('es')
        expect(getLanguageFromRoute('/es/what-is-xr')).toBe('es') // and not "xr"
    }
})