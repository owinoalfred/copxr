import VueI18n from 'vue-i18n'
import setupGlobalComponents from './components/setupGlobalComponents'
import icons from './components/icons'

export default function setupVueInstance(localVue) {
    // https://kazupon.github.io/vue-i18n/guide/formatting.html
    // enables i18n found in src/i18n to be rendered via this.$t('locale')
    localVue.use(VueI18n)

    // These components are available in every file, don't need to mount them
    // eg: <LinkTo href="/test">Test</LinkTo>
    localVue.use(setupGlobalComponents)

    // vue-material-design-icons available
    // eg: <IconChevronDown />
    localVue.use(icons)
}