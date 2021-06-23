const renderHrefLang = require('../renderHrefLang')

test('renderHrefLang', async () => {
    const generatedTags = renderHrefLang('/de/why-rebel/', 'de', ['en', 'de', 'fr'])
    const expectedTags = [
        `<link rel="alternate" hreflang="en" href="/why-rebel/" />`,
        `<link rel="alternate" hreflang="de" href="/de/why-rebel/" />`,
        `<link rel="alternate" hreflang="fr" href="/fr/why-rebel/" />`
    ]

    expect(generatedTags).toMatch(expectedTags.join(''))
})