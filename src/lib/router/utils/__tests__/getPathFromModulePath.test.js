import getPathFromModulePath from '../getPathFromModulePath'

test('getPathFromModulePath', () => {
    expect(getPathFromModulePath('./404.vue')).toEqual('/404/')
    expect(getPathFromModulePath('./index.vue')).toEqual('/')
    expect(getPathFromModulePath('./groups/_group.vue')).toEqual('/groups/:group/')
    expect(getPathFromModulePath('./the-emergency/index.md')).toEqual('/the-emergency/')
    if (process.env.APP_ENV !== 'staging') {
        expect(getPathFromModulePath('./the-emergency/index-es.md')).toEqual('/es/the-emergency/')
    }
})