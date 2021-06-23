import getRegex from '../getRegex'

test('getRegex', () => {
    // exact match test, will fail when new properties are added, paths or regex is changed
    expect(getRegex('/404')).toEqual(/^\/404\/?$/)
    expect(getRegex('/')).toEqual(/^\/\/?$/)
    expect(getRegex('/es/the-emergency')).toEqual(/^\/es\/the-emergency\/?$/)
})

test('getRegex -> special character in groups', () => {
    const regex = getRegex('/groups/:group')
    expect(regex.test('/groups/gb-united-kingdom/events')).toEqual(false)
    expect(regex.test('/groups/be-belgium')).toEqual(true)
    expect(regex.test('/groups/fr-réunion')).toEqual(true) // special chars
    // expect(regex.test('/groups/fr-r%C3%A9union')).toEqual(true) // uri encoded
    expect(regex).toEqual(/^\/groups\/(?<group>[\w-éóříšèöåäøāłźœńăá]+)\/?$/)
})