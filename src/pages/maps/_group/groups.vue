<template>
    <div class="h-screen">
        <MapSSR :is-embed="true" :groupKey="groupKey" :showEvents="false" />
    </div>
</template>

<script>
import MapSSR from '@/modules/map/MapSSR'

export default {
    components: {
        MapSSR,
    },
    computed: {
        groupKey() {
            return this.$route.params.group;
        },
    },
}
</script>