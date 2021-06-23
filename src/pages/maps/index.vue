<template>
    <div class="h-screen">
        <MapSSR :is-embed="true" />
    </div>
</template>

<script>
import MapSSR from '@/modules/map/MapSSR'

export default {
    components: {
        MapSSR,
    },
}
</script>