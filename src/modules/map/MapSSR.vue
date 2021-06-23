<template>
    <div
        class="map-client w-full h-full bg-gray-900 flex items-center justify-center relative"
    >
        <div class="map-client-data hidden" v-html="JSON.stringify({ isEmbed, groupKey, showGroups, showEvents })">
            <!--
                webpack generates this file separately and this contains live client-side code
                this file itself does not really have access to the client-side code!

                Why v-html? Because otherwise the content will be encodeURIComponent'ized and things like
                & will become &quot; or &null; etc... This changes the output HTML from 1.6MB to 2.3MB!
            -->
        </div>

        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    </div>
</template>

<script>
import {writeGroupsFile, writeEventsFile} from './map-data-writer';
export default {
    props: {
        groupKey: String,
        showEvents: { type: Boolean, default: true },
        showGroups: { type: Boolean, default: true },
        isEmbed: { type: Boolean, default: false },
    },
    created() {
        if (!this.showEvents && !this.showGroups) {
            throw new Error('showEvents or showGroups should be true')
        }

        if (this.showGroups) {
            writeGroupsFile({
                groupKey: this.groupKey,
                allGroups: this.$site.groups,
            })
        }

        if (this.showEvents){
            writeEventsFile({
                groupKey: this.groupKey,
                allGroups: this.$site.groups,
                allGroupEvents: this.$site.branch_events,
            })
        }

        this.$ssrContext.pageScripts.push('map-loader.js')
    },
}
</script>