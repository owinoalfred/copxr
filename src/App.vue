<template>
    <div class="font-serif antialiased">
        <NavHeader v-if="!isEmbed" />
        <slot /> <!-- the page / layout -->
        <NavFooter v-if="!isEmbed" />
        <div v-if="hasFeedback" class="feedback-form">
            <div class="data hidden" v-html="JSON.stringify({  })">
                <!--
                    webpack generates this file separately and this contains live client-side code
                    this file itself does not really have access to the client-side code!

                    Why v-html? Because otherwise the content will be encodeURIComponent'ized and things like
                    & will become &quot; or &null; etc... Making the output bigger.
                -->
            </div>
        </div>
    </div>
</template>

<script>
import NavHeader from '@/components/elements/NavHeader.vue'
import NavFooter from '@/components/elements/NavFooter.vue'

export default {
    data: () => ({
        hasFeedback: false
    }),
    components: {
        NavHeader,
        NavFooter,
    },
    computed: {
        isEmbed() {
            if (this.$route.url.indexOf('/maps') > -1) {
                return true
            }
            return false
        },
    },
    created() {
        if (!this.isEmbed && this.hasFeedback) {
            this.$ssrContext.pageScripts.push('feedback-form-loader.js')
        }
    }
}
</script>