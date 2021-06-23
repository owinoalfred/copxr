<template>
    <div class="flex flex-col bg-white">
        <link-to :href="`/event/${event.id}/`">
            <div class="relative w-full h-48">
                <img v-if="image" :src="`/assets/img/events/${image}`" alt="" class="w-full h-full object-cover" loading="lazy">
                <EventStartDateBadge
                        class="absolute right-0 inset-y-0 mr-4"
                        :startDate="event.start_date"
                        :bottomColorClass="bottomColorClass"
                />
            </div>
        </link-to>
        <div class="flex-auto p-6">
            <span v-if="location" class="font-header leading-none">{{ location }}</span>
            <link-to :href="`/event/${event.id}/`" class="block font-header text-3xl leading-tight mb-4 hover:underline">{{ event.title }}</link-to>
            <span class="font-serif text-lg">{{ event.description | truncateWords(30) }}</span>
        </div>
        <div class="flex justify-between items-center flex-wrap p-6" :class="bottomColorClass">
            <link-to :href="`/event/${event.id}/`" class="bg-black shadow-md text-white font-header px-4 py-2 text-sm opacity-90 hover:opacity-100">{{ $t('Find out more') }}</link-to>
            <DateRange class="font-header py-1" :start="event.start_date" :end="event.end_date" />
        </div>
    </div>
</template>

<script>
import { bottomColorClass, topColorClass } from '@/modules/groups/util/makeColors'
import truncateWords from '@/modules/groups/util/truncateWords'
import getEventLocation from '@/modules/events/util/getEventLocation'
import DateRange from '@/components/elements/DateRange'
import EventStartDateBadge from '@/components/elements/EventStartDateBadge'

export default {
    props: {
        event: Object,
        color: String,
    },

    components: {
        DateRange,
        EventStartDateBadge,
    },

    computed: {
        topColorClass() { return topColorClass(this.color) },
        bottomColorClass() { return bottomColorClass(this.color) },
        image() {
            for (const file of this.event.files) {
                return file.path
            }
            return ''
        },
        location() {
            const location = getEventLocation(this.event)
            return location && !location.includes('http') ? location : "Online event"
        },
    },

    filters: {
        truncateWords,
    },
}
</script>