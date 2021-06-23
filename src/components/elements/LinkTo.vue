<template>
    <a :href="linkToLanguage" :class="computedClass" :target="target"><slot /></a>
</template>

<script>
import { getLangPath } from '@/lib/router/utils/fillLanguagesInPathToFileMap'

export default {
    props: {
        href: String,
        baseClass: [String, Object, Array],
        activeClass: [String, Object, Array],
        inactiveClass: [String, Object, Array],
        external: { type: Boolean, default: false }, // open in new tab <- when embed
    },
    computed: {
        target () {
            if (this.external) {
                return '_blank'
            }
            return null
        },
        url() {
            if (this.$route) {
                return this.$route.url // ssr
            }
            return window.location.pathname // client
        },
        isActive() {
            return this.url === this.linkToLanguage
        },
        computedClass() {
            if (this.isActive) {
                return [ this.baseClass, this.activeClass ]
            } else if (this.inactiveClass) {
                return [ this.baseClass, this.inactiveClass ]
            }
            return this.baseClass
        },
        linkToLanguage() {
            const currentLanguage = this.$t ? this.$t('locale') : 'en'
            return getLangPath(currentLanguage, this.href)
        },
    },
    created () {
        if (!this.href.endsWith('/')) {
            if (this.href.includes('#')) {
                return // is ok
            }
            console.log(this.$route.path, `=> add slash: ${this.href} => ${this.href}/`)
        }
    }
}
</script>