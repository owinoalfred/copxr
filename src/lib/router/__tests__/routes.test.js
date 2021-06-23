import routes from '../routes'

test('routes', () => {
    // exact match test, will fail when new properties are added, paths or regex is changed
    expect(getByModulePath('./404.vue')).toEqual({
        modulePath: './404.vue',
        path: '/404/',
        regex: jasmine.any(RegExp),
        language: 'en',
    })

    // test /directory/_group.vue => /directory/:group slug url
    expect(getByModulePath('./index.vue')).toEqual(jasmine.objectContaining({
        modulePath: './index.vue',
        path: '/',
        regex: jasmine.any(RegExp),
        language: 'en',
    }))
    expect(getByPath('/')).toEqual(jasmine.objectContaining({ path: '/' })) // getByPath working

    // test /directory/_group.vue => /directory/:group slug url
    expect(getByModulePath('./groups/_group.vue')).toEqual(jasmine.objectContaining({
        modulePath: './groups/_group.vue',
        path: '/groups/:group/',
        regex: jasmine.any(RegExp),
    }))

    // test /directory/index.vue => /directory url
    expect(getByModulePath('./groups/index.vue')).toEqual(jasmine.objectContaining({
        modulePath: './groups/index.vue',
        path: '/groups/',
        regex: jasmine.any(RegExp),
        language: 'en',
    }))

    expect(getByModulePath('./privacy-policy/index.md')).toEqual(jasmine.objectContaining({
        modulePath: './privacy-policy/index.md',
        path: '/privacy-policy/',
        regex: jasmine.any(RegExp),
        language: 'en',
    }))

    if(process.env.APP_ENV !== 'staging') {
        expect(getByPath('/es/')).toEqual(jasmine.objectContaining({
            modulePath: './index.vue',
            path: '/es/',
            regex: jasmine.any(RegExp),
            language: 'es',
        }))

        expect(getByModulePath('./privacy-policy/index-es.md')).toEqual({
            language: 'es',
            modulePath: './privacy-policy/index-es.md',
            path: '/es/privacy-policy/',
            regex: jasmine.any(RegExp),
        })
    }

})

function getByModulePath(modulePath) {
    for (const route of routes) {
        if (route.modulePath === modulePath) {
            return route
        }
    }

    console.error({ routes, modulePath })
    throw new Error('file not found')
}

function getByPath(path) {
    for (const route of routes) {
        if (route.path === path) {
            return route
        }
    }

    console.error({ routes, path })
    throw new Error('file not found')
}
