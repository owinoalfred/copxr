import LinkTo from '@/components/elements/LinkTo'

/**
 * Set up global components, so we don't have to import them in every file
 */
export default {
    install(Vue) {
        Vue.component('link-to', LinkTo)
    }
}
