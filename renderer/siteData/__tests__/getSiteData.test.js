import getSiteData from '../index'

describe('siteData', () => {
    let data
    beforeAll(async () => {
        data = await getSiteData()
    })

    test('keys', () => {
        expect(Object.keys(data)).toEqual([
            'pages',
            'blog',
            'press',
            'groups',
            'branch_events_array',
            'branch_events',
        ])
    })

    test('groups', () => {
        // contains some groups in a map { 'be-belgium': {}, ... }
        expect(Object.keys(data.groups)).toContain('be-belgium')

        // can parse yaml to json object
        expect(data.groups['be-belgium'].name).toBe('Belgium')

        // if email is not public, email is not included for privacy reasons
        // in the siteData, it should never be used and should never be displayed
        expect(Object.values(data.groups)
            .some(b => !b.publiciseemail && b.email))
            .toBeFalsy()
        
        for (const groupKey in data.groups) {
            if (!/^[\w-éóříšèöåäøāłźœńăá]+$/.test(groupKey)) {
                // src/libs/router/utils//getRegex needs to be updated
                throw new Error(`Unrecognized char in group key (${groupKey}) - see comments`)
            }
        }
    })

    test('pages', () => {
        // found /src/pages/frequently-asked-questions/index.md
        expect(Object.keys(data.pages)).toContain('frequently-asked-questions/index')
        
        // can parse yaml
        expect(data.pages['frequently-asked-questions/index'].layout).toBe('hero-double-image')

        // can convert markdown to html
        expect(data.pages['frequently-asked-questions/index'].content.length).toBeGreaterThan(0)
    })

    test('blog', () => {
        // contains posts in multiple languages
        expect(Object.keys(data.blog)).toContain('2020-03-13-newsletter-37')
        expect(Object.keys(data.blog)).toContain('2020-03-13-newsletter-37-fr')

        // pick up html blog posts
        expect(Object.keys(data.blog)).toContain('2019-10-10-rebel-daily-3')
        
        throwIfSlugAndLangOverLap(data.blog)
        throwIfSlugAndLangOverLap(data.press)
    })
})

function throwIfSlugAndLangOverLap(posts) {
    // test that an article does not appear twice (slug + lang)
    const postsBySlugAndLang = {}

    // we have articles in both translated (lang='es') and in English (lang='en')
    // they can have a similar slug: 'newsletter-37'
    // even though the filename is 2020-03-13-newsletter-37-fr
    // so an editor could make the mistake of writing the -fr article above and setting the yaml
    // lang to 'en', we want to prevent this from building and deploying
    for (const key in posts) {
        const item = posts[key]
        const slugLangKey = item.lang + item.slug
        const overLappingPost = postsBySlugAndLang[slugLangKey]
        if (overLappingPost) {
            throw new Error(`Post ${key} vs ${overLappingPost.key} duplicate: slug "${item.slug}" and lang "${item.lang}" appear twice.`)
        }
        postsBySlugAndLang[slugLangKey] = item
    }
}