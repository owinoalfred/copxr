<template>
    <div
        v-if="!isEmbed"
        class="flex flex-col"
    >
            <link-to :href="`/groups/${group.key}/`">
                <div class="flex flex-col justify-between items-start p-6" :class="topColorClass">
                    <div class="leading-tight m-1">
                        <div class="font-header text-3xl">{{ nativePlaceName || group.name }}</div>
                        <div v-if="nativePlaceName" class="font-header text-lg">{{ group.name }}</div>
                    </div>
                    <GroupSocialLinks v-if="group.links" :group="group" class="flex text-white text-lg leading-none flex-wrap" />
                </div>
            </link-to>
            <div v-if="showButton" class="flex flex-col justify-between items-center px-6 py-4" :class="bottomColorClass">
                <div>
                    <link-to :href="`/groups/${group.key}/`" class="inline-block bg-black shadow-md text-white font-header px-4 py-3 opacity-90 hover:opacity-100">{{ $t('Go to group') }}</link-to>
                </div>
                <a
                        v-if="showWebsite && group.links && group.links.website"
                        :href="group.links.website"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        class="font-header py-2 opacity-90 hover:opacity-100 truncate"
                >{{ group.links.website | toDomain }}</a>
            </div>
    </div>
    <div
            v-else
            class="flex flex-col">
        <div class="flex flex-col justify-between items-start p-6" :class="topColorClass">
            <div class="leading-tight m-1">
                <div class="font-header text-3xl">{{ nativePlaceName || group.name }}</div>
                <div v-if="nativePlaceName" class="font-header text-lg">{{ group.name }}</div>
            </div>
            <GroupSocialLinks v-if="group.links" :group="group" class="flex text-white text-lg leading-none" />
        </div>
        <div v-if="showButton && showWebsite && group.links && group.links.website" class="flex justify-between items-center px-6 py-4" :class="bottomColorClass">
            <a
                :href="group.links.website"
                target="_blank"
                rel="noopener noreferrer nofollow"
                class="font-header py-2 opacity-90 hover:opacity-100 truncate"
            >{{ group.links.website | toDomain }}</a>
        </div>
    </div>
</template>

<script>
import extendVue from '@/extendVue'

import toDomain from '@/modules/groups/util/toDomain'
import toNativePlaceName from '@/modules/groups/util/toNativePlaceName'
import GroupSocialLinks from '@/modules/groups/components/GroupSocialLinks'
import { getColor, topColorClass, bottomColorClass } from '@/modules/groups/util/makeColors'

export default extendVue({
    props: {
        group: Object,
        showWebsite: { type: Boolean, default: true },
        showButton: { type: Boolean, default: true },
        isEmbed: { type: Boolean, default: false },
    },

    components: {
        GroupSocialLinks,
    },

    computed: {
        color() {
            return getColor(this.group.name)
        },
        topColorClass() { return topColorClass(this.color) },
        bottomColorClass() { return bottomColorClass(this.color) },
        nativePlaceName() {
            return toNativePlaceName(this.group.name)
        },
    },

    filters: {
        toDomain,
    },
})
</script>