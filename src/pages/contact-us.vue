<template>
    <div class="contact-form">
        <div class="data hidden" v-html="JSON.stringify({ title, description, cf_contact })">
            <!--
                webpack generates this file separately and this contains live client-side code
                this file itself does not really have access to the client-side code!

                Why v-html? Because otherwise the content will be encodeURIComponent'ized and things like
                & will become &quot; or &null; etc... Making the output bigger.
            -->
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            title: this.$t('cf_contact_title'),
            description: this.$t('cf_contact_description'),
            cf_contact: "contact",
        }
    },
    created() {
        this.$ssrContext.pageScripts.push('contact-form-loader.js')
    }
}
</script>