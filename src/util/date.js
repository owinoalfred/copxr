import _format from 'date-fns/format'
import _formatDistanceToNow from 'date-fns/formatDistanceToNow'
import _parseISO from 'date-fns/parseISO'
import _isValid from 'date-fns/isValid'

import en from 'date-fns/locale/en-GB'
import nl from 'date-fns/locale/nl'
import zh from 'date-fns/locale/zh-CN'
import de from 'date-fns/locale/de'
import es from 'date-fns/locale/es'
import fr from 'date-fns/locale/fr'
import pt from 'date-fns/locale/pt'
import sv from 'date-fns/locale/sv'
import ru from 'date-fns/locale/ru'
import pl from 'date-fns/locale/pl'

const locales = {
    en,
    nl,
    zh,
    de,
    es,
    fr,
    pt,
    sv,
    ru,
    pl,
}

let locale = 'en'
if (process.browser && document && document.documentElement) {
    locale = document.documentElement.lang
} else if (!process.browser && global.context) {
    locale = global.context.language
}

export function format(date, formatStr) {
    try {
        return _format(date, formatStr, {
            locale: locales[locale],
        })
    } catch(e) {
        try { // no locale?
            return _format(date, formatStr)
        } catch(e) { // Invalid Date?
            return ''
        }
    }
}

export function formatDistanceToNow(date) {
    return _formatDistanceToNow(date, {
        locale: locales[locale],
    })
}


export function parseISO(date) {
    if (!date) {
        return null
    }

    const parsedDate = _parseISO(date)
    
    if (!_isValid(parsedDate)) {
        console.error('Could not parseISO: %s', date)
        // parsing an incorrect date here will return 'Invalid Date' object
        // we prefer having a null, because it is easier to handle in an if-statement as it returns false
        return null
    }

    return parsedDate
}
