<template>
    <div
        v-if="!isEmbed"
        class="flex flex-col"
    >
        <div class="flex-1 flex flex-col shadow border-2">
            <link-to :href="`/event/${event.id}/`" :external="isEmbed">
                <div class="relative w-full bg-black">
                    <img class="w-full h-full object-cover" :src="`/assets/img/events/${image}`" :alt="`Event Banner for ${event.title}`" />
                    <EventStartDateBadge
                            class="absolute right-0 inset-y-0 mr-4"
                            :startDate="event.start_date"
                            :bottomColorClass="bottomColorClass"
                    />
                </div>
            </link-to>
            <div class="flex-1 p-6">
                <div v-if="location" class="font-header leading-none">{{ location }}</div>
                <link-to :href="`/event/${event.id}/`" class="block font-header text-3xl leading-tight hover:underline" :external="isEmbed">{{ event.title }}</link-to>
            </div>
            <div v-if="showButton" class="flex justify-between items-center p-6" :class="bottomColorClass">
                <link-to :href="`/event/${event.id}/`" class="bg-black shadow-md text-white font-header px-4 py-2 text-sm opacity-90 hover:opacity-100" :external="isEmbed">{{ $t('Find out more') }}</link-to>
                <DateRange class="font-header text-sm" :start="event.start_date" :end="event.end_date" />
            </div>
        </div>
    </div>
    <div
        v-else
        class="flex flex-col"
    >
        <div class="flex-1 flex flex-col shadow border-2">
            <a :href="`https://www.facebook.com/events/${event.id}`">
                <div class="relative w-full bg-black">
                    <img class="w-full h-full object-cover" :src="`/assets/img/events/${image}`" :alt="`Event Banner for ${event.title}`" />
                    <EventStartDateBadge
                            class="absolute right-0 inset-y-0 mr-4"
                            :startDate="event.start_date"
                            :bottomColorClass="bottomColorClass"
                    />
                </div>
            </a>
            <div class="flex-1 p-6">
                <div v-if="location" class="font-header leading-none">{{ location }}</div>
                <a :href="`https://www.facebook.com/events/${event.id}`" class="block font-header text-3xl leading-tight hover:underline">{{ event.title }}</a>
            </div>
            <div v-if="showButton" class="flex justify-between items-center p-6" :class="bottomColorClass">
                <a :href="`https://www.facebook.com/events/${event.id}`" class="bg-black shadow-md text-white font-header px-4 py-2 text-sm opacity-90 hover:opacity-100">{{ $t('Find out more') }}</a>
                <DateRange class="font-header text-sm" :start="event.start_date" :end="event.end_date" />
            </div>
        </div>
    </div>
</template>

<script>
import extendVue from '@/extendVue'
import { bottomColorClass, topColorClass, getColor } from '@/modules/groups/util/makeColors'
import truncateWords from '@/modules/groups/util/truncateWords'
import getEventLocation from '@/modules/events/util/getEventLocation'
import DateRange from '@/components/elements/DateRange'
import EventStartDateBadge from '@/components/elements/EventStartDateBadge'
import LinkTo from '@/components/elements/LinkTo'
import LazyImage from '@/components/LazyImage'

export default extendVue({
    props: {
        event: Object,
        showButton: {type: Boolean, default: true},
        isEmbed: { type: Boolean, default: false },
    },

    components: {
        LinkTo,
        DateRange,
        EventStartDateBadge,
        LazyImage,
    },

    computed: {
        color() {
            return getColor(this.event.title)
        },
        topColorClass() { return topColorClass(this.color) },
        bottomColorClass() { return bottomColorClass(this.color) },
        image() {
            for (const file of this.event.files) {
                return file.path
            }
            return ''
        },
        location() {
            return getEventLocation(this.event)
        },
    },

    filters: {
        truncateWords,
    },
})
</script>