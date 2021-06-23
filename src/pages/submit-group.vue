<template>
    <div class="submit-group-form">
        <div class="data hidden" v-html="JSON.stringify({ inputGroups: groups })">
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
    computed: {
        groups() {
            return this.$site.groups
        },
    },
    created() {
        this.$ssrContext.pageScripts.push('submit-group-form-loader.js')
    }
}
</script>