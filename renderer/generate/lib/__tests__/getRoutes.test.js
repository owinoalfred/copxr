const getRoutes = require('../getRoutes')
const getSiteData = require('../../../siteData')

test('getRoutes', async () => {
    const data = await getSiteData()
    const routes = await getRoutes(data)
    expect(routes).toContain('/')
    expect(routes).toContain('/about-us/')

    expect(routes).toContain('/groups/')
    expect(routes).toContain('/groups/be-belgium/')
    expect(routes).toContain('/maps/be-belgium/')
    expect(routes).toContain('/maps/be-belgium/groups/')

    expect(routes).toContain('/maps/be-belgium/events/')
    expect(routes).not.toContain('/es/maps/be-ghent/') // not cities, only countries
    expect(routes).toContain('/frequently-asked-questions/')
    expect(routes).toContain('/blog/2020/03/13/newsletter-37/')
    expect(routes).toContain('/press/2020/03/14/coronavirus/')
    expect(routes).toContain('/press/2019/12/30/xr-2019/') // key = year-in-review, slug = xr-2019

    // staging has all languages removed for build speed
    if(process.env.APP_ENV !== 'staging') {
        expect(routes).toContain('/es/')
        expect(routes).toContain('/es/groups/')
        expect(routes).toContain('/fr/groups/be-belgium/')
        expect(routes).toContain('/fr/maps/fr-france/')
        expect(routes).toContain('/fr/maps/fr-france/groups/')
        expect(routes).toContain('/fr/maps/fr-france/events/')
        expect(routes).toContain('/es/frequently-asked-questions/')
        expect(routes).toContain('/es/blog/2020/03/13/newsletter-37/')
    }
    console.log('getRoutes:', routes.length)
})