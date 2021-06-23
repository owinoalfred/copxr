
const productionLanguages = [
    "en",
    "cs",
    "de",
    "el",
    "es",
    "fr",
    "it",
    "pl",
    "pt",
    "ru",
    "xh",
    "zh"
]

const devLanguages = [
    'nl',
    'hu',
    'sv',
    'sw'
]

export const languages = process.env.APP_ENV === 'staging'
    ? ['en']
    : process.env.APP_ENV === 'translations'
        ? [...productionLanguages, ...devLanguages]
        : productionLanguages

export const languageNames = {
    zh: '汉语',
    de: 'Deutsch',
    en: 'English',
    es: 'Español',
    fr: 'Français',
    pt: 'Português',
    sv: 'Svenska',
    ru: 'русский',
    pl: 'Polski',
    nl: 'Nederlands',
    el: 'ελληνικά', 
    cs: 'čeština',
    sw: 'Kiswahili', 
    hu: 'Magyar',
    xh: 'Xhosa',
    it: 'Italiano'
}