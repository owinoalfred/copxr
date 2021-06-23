import VueI18n from 'vue-i18n';
import { languages } from './config';
import getChoiceIndex from './getChoiceIndex';

export const messages = {}
for (const lang of languages) {
    try {
        messages[lang] = require('./' + lang + '.json') || { locale: lang }
    } catch (e) {
        messages[lang] = { locale: lang }
    }
}

VueI18n.prototype.getChoiceIndex = getChoiceIndex;

export let i18n;

/**
 * Use the i18n instance for the specified language
 * @param {'en'|'nl'|'fr'|'es'|'pl'|'pt'|'ru'|'zh'|'sv'|'el'|'xh'} lang 
 */
export default function(lang) {
    i18n = new VueI18n({
        locale: lang || 'en',
        fallbackLocale: 'en',
        messages,
    })
    return i18n;
}