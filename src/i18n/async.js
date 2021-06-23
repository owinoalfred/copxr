import VueI18n from 'vue-i18n';
import { languages } from './config';
import getChoiceIndex from './getChoiceIndex';

/**
 * Creates async-chunks from all json files that can be loaded from async-client-bundles
 * Otherwise all languages appear in the shipped bundle, now it's only en.json, if it's another
 * language then we first load the json file for that language before mounting the components
 */
const loadMessages = {}
for (const lang of languages) {
    loadMessages[lang] = () => import(/* webpackChunkName: '[request]' */ './' + lang + '.json')
}

VueI18n.prototype.getChoiceIndex = getChoiceIndex;

/**
 * Use the i18n instance for the specified language
 * @param {'en'|'nl'|'fr'|'es'|'pl'|'pt'|'ru'|'zh'|'sv'|'xh'} lang 
 */
export default async function(lang) {
    const messages = {
        en: require('./en.json') // always loaded because is fallback
    }

    if (lang !== 'en') {
        try {
            const langMessages = await loadMessages[lang]()
            messages[lang] = langMessages
        } catch (e) {
            messages[lang] = { locale: lang }
        }
    }

    return new VueI18n({
        locale: lang || 'en',
        fallbackLocale: 'en',
        messages,
    })
}