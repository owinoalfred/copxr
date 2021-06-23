import getSortedPostsInLanguage from '../getSortedPostsInLanguage'

test('getSortedPostsInLanguage', () => {
    const posts = getSortedPostsInLanguage([
        { content: 'unpublished', published: false, slug: 'hidden', lang: 'nl', date: '2019-01-01' }, // not published
        { content: 'nop', published: true, slug: 'test', lang: 'en', date: '2019-01-01' }, // prefer nl slug
        { content: 'yup', published: true, slug: 'test', lang: 'nl', date: '2019-01-01' },
        { content: 'nup', published: true, slug: 'test', lang: 'es', date: '2019-01-01' }, // not same lang
        { content: 'nop', published: true, slug: 'test', lang: 'en', date: '2019-01-01' }, // also prefer nl slug
        { content: 'yess', published: true, slug: 'hello', lang: 'nl', date: '2020-01-01' }, // sorted first and in own language
        { content: 'nope', published: true, slug: 'other', lang: 'es', date: '2019-01-01' }, // other lang not include
    ], 'nl')

    const expected = process.env.APP_ENV === 'production'
        ? [
            { content: 'yess', published: true, slug: 'hello', lang: 'nl', date: '2020-01-01' },
            { content: 'yup', published: true, slug: 'test', lang: 'nl', date: '2019-01-01' },
        ] : [
            { content: 'yess', published: true, slug: 'hello', lang: 'nl', date: '2020-01-01' },
            { content: 'unpublished', published: false, slug: 'hidden', lang: 'nl', date: '2019-01-01' },
            { content: 'yup', published: true, slug: 'test', lang: 'nl', date: '2019-01-01' },
        ]


    expect(posts).toEqual(expected)
})