<template>
    <div class="flex flex-col">
        <div class="flex-auto flex flex-row items-center" :class="topColorClass">
            <link-to :href="`/groups/${group.key}/`" class="leading-tight flex-auto">
                <div class="h-full flex flex-col justify-center px-4 py-6 md:p-8 hover:underline">
                    <div class="font-header text-3xl">{{ nativePlaceName || group.name }}</div>
                    <div v-if="nativePlaceName" class="font-header text-lg">{{ group.name }}</div>
                </div>
            </link-to>
            <GroupSocialLinks v-if="group.links" :group="group" class="flex flex-wrap justify-end text-white text-lg leading-none p-4 pl-0 md:pr-8" />
        </div>
        <div class="flex justify-between items-center px-4 py-2 md:px-8" :class="bottomColorClass">
            <div class="flex flex-wrap items-center">
                <link-to :href="`/groups/${group.key}/`" class="inline-block bg-black shadow-md text-white font-header px-4 py-3 opacity-90 hover:opacity-100">{{ $t('Go to group') }}</link-to>
                <span v-if="showEvents && eventsCount" class="font-header text-sm ml-2">{{ $tc('EVENTS_X', eventsCount, [eventsCount]) }}</span>
            </div>
            <a
                v-if="showWebsite && group.links && group.links.website"
                :href="group.links.website"
                target="_blank"
                rel="noopener noreferrer nofollow"
                class="font-header text-xl pl-4 py-2 opacity-90 hover:opacity-100"
            >{{ $t('WEBSITE') }}</a>
        </div>
    </div>
</template>

<script>
import toDomain from '@/modules/groups/util/toDomain'
import toNativePlaceName from '@/modules/groups/util/toNativePlaceName'
import GroupSocialLinks from '@/modules/groups/components/GroupSocialLinks.vue'
import { topColorClass, bottomColorClass } from '@/modules/groups/util/makeColors'

export default {
    props: {
        group: Object,
        color: String,
        showWebsite: { type: Boolean, default: true },
        showEvents: { type: Boolean, default: true },
    },

    components: {
        GroupSocialLinks,
    },

    computed: {
        topColorClass() { return topColorClass(this.color) },
        bottomColorClass() { return bottomColorClass(this.color) },
        nativePlaceName() {
            return toNativePlaceName(this.group.name)
        },
        eventsCount() {
            const events = this.$site.branch_events[this.group.key]
            if (!events) {
                return 0
            }
            return events.length
        }
    },

    filters: {
        toDomain,
    },
}
</script>