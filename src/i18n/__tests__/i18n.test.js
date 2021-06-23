
import detectBadTranslationFunction from '../test_utils/detectBadTranslationFunction'
import detectNonExistingTranslationString from '../test_utils/detectNonExistingTranslationString'
import { languages } from '../config'

describe('i18n: language files', () => {
  const lang_map = languages.reduce((acc, lang) => {
    const strings = require(`../${lang}.json`)
    acc[lang] = {
      keys: Object.keys(strings),
      lang,
      strings,
    }
    return acc
  }, {})
  const en_strings = lang_map['en'].strings

  it('keys with plurals like | should also have equal in translation', () => {
    for (const { lang, keys, strings } of Object.values(lang_map)) {
      if (lang === 'en') continue

      for (const key of keys) {
        if (!en_strings[key]) {
          console.error(`"${key}" in ${lang}.json does not exist in `)
          continue
        }
        if (en_strings[key].indexOf('|') > -1) {
          expect(strings[key]).toContain('|')
        }
      }
    }
  })

  function hasBadKeys(key) {
    if (/[^a-z#A-Z_0-9.?!():\- ]+/gm.test(key)) {
      return true // only allow alphanumeric and numbers and _ #
    }
    if (key.indexOf('..') > -1) {
      return true
    }
    return false
  }

  it('hadBadKeys can detect bad keys', () => {
    expect(hasBadKeys('hello')).toBe(false)
    expect(hasBadKeys('HELLO_WORLD')).toBe(false)
    expect(hasBadKeys('HELLO_WORLD_123')).toBe(false)

    // one dot is ok, multiple are not
    expect(hasBadKeys('nodots...')).toBe(true)
    expect(hasBadKeys('Some sentence.')).toBe(false)

    // some characters are ok for now, but can be removed later
    expect(hasBadKeys('(work)')).toBe(false)
    expect(hasBadKeys('signature:')).toBe(false)
    expect(hasBadKeys('a-dash')).toBe(false)
    expect(hasBadKeys('when?')).toBe(false)
    expect(hasBadKeys('now!')).toBe(false)

    // not ok
    expect(hasBadKeys('no-frénch')).toBe(true)
  })

  it('disallow specific characters in keys', () => {
    for (const { lang, keys } of Object.values(lang_map)) {
      for (const key of keys) {
        if (hasBadKeys(key)) {
          throw new Error('Some characters are not allowed in translation keys: ' + key + ' in ' + lang)
        }
      }
    }
  })

  it('keys with {variable} should also have equal in translation', () => {
    const regex = /\{(\w+)\}/gm

    for (const { lang, keys, strings } of Object.values(lang_map)) {
      if (lang === 'en') continue

      for (const key of keys) {
        if (!en_strings[key]) {
          continue
        }

        const en_match = (en_strings[key].match(regex) || []).reduce((acc, cur) => {
          if (cur.includes('break')) return acc
          if (cur.includes('link')) return acc
          if (cur.includes('image')) return acc
          return acc.includes(cur) ? acc : [ ...acc, cur ] // remove duplicates
        }, [])

        const foreing_match = (strings[key].match(regex)||[]).reduce((acc, cur) => {
          if (cur.includes('break')) return acc
          if (cur.includes('link')) return acc
          if (cur.includes('image')) return acc
          return acc.includes(cur) ? acc : [...acc, cur]
        }, [])

        if (JSON.stringify(foreing_match) !== JSON.stringify(en_match)) {
          console.error('%s: variables dont match in %s (%s) vs %s (%s)', key, lang, foreing_match, 'en', en_match)
        }
      }
    }
  })

  it('check for error-prone translations: $() vs $t()', () => {
    const isOkay = detectBadTranslationFunction()
    expect(isOkay).toBe(true)
  })

  it('check for unexisting translations', () => {
    const isOkay = detectNonExistingTranslationString(en_strings)
    expect(isOkay).toBe(true)
  })
})
