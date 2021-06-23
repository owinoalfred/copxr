<template>
<div class="shadow-lg flex flex-col">
    <a
            v-if="countryGroupsCount"
            class="border border-gray-100 px-2 py-1 font-header text-lg flex items-center bg-white hover:bg-gray-100"
            title="Toggle countryGroups"
            role="button"
            aria-label="Toggle countryGroups"
            @click.prevent.stop="toggleCountryGroups"
    >
        <IconCheckboxBlankOutline v-if="!showCountryGroups" class="text-xl" />
        <IconCheckboxMarked v-else class="text-xl text-green-600" />
        <span class="ml-2">{{ $tc('SHOW_X_COUNTRY_GROUPS', countryGroupsCount) }}</span>
    </a>

    <a
        v-if="localGroupsCount"
        class="border border-gray-100 px-2 py-1 font-header text-lg flex items-center bg-white hover:bg-gray-100"
        title="Toggle localGroups"
        role="button"
        aria-label="Toggle localGroups"
        @click.prevent.stop="toggleLocalGroups"
    >
        <IconCheckboxBlankOutline v-if="!showLocalGroups" class="text-xl" />
        <IconCheckboxMarked v-else class="text-xl text-blue-800" />
        <span class="ml-2">{{ $tc('SHOW_X_LOCAL_GROUPS', localGroupsCount) }}</span>
    </a>

    <a
        v-if="eventsCount"
        class="border border-gray-100 px-2 py-1 font-header text-lg flex items-center bg-white hover:bg-gray-100"
        title="Toggle events"
        role="button"
        aria-label="Toggle events"
        @click.prevent.stop="toggleEvents"
    >
        <IconCheckboxBlankOutline v-if="!showEvents" class="text-xl" />
        <IconCheckboxMarked v-else class="text-xl text-yellow-500" />
        <span class="ml-2"> {{ $tc('SHOW_X_EVENTS', eventsCount) }}</span>
    </a>
</div>
</template>

<script>
export default {
    props: {
        countryGroupsCount: Number,
        localGroupsCount: Number,
        eventsCount: Number,
    },
    data() {
        return {
            showEvents: true,
            showLocalGroups: true,
            showCountryGroups: true,
        }
    },
    methods: {
        toggleLocalGroups() {
            this.showLocalGroups = !this.showLocalGroups
            this.layersChanged()
        },
        toggleCountryGroups() {
            this.showCountryGroups = !this.showCountryGroups
            this.layersChanged()
        },
        toggleEvents() {
            this.showEvents = !this.showEvents
            this.layersChanged()
        },
        layersChanged() {
            this.$emit('layersChanged', {
                showEvents: this.showEvents,
                showLocalGroups: this.showLocalGroups,
                showCountryGroups: this.showCountryGroups,
            })
        },
    }
}
</script>
