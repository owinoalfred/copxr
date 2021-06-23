<template>
    <div class="map-section w-full h-full">
        <div id="map" ref="map" class="w-full h-full z-0" />
    </div>
</template>

<script>
import Vue from 'vue'

import L from 'leaflet'

let mapData = {}

/** Vue.extend allows us to directly mount this element on the DOM */
export default {
    props: {
        latitude: Number,
        longitude: Number,
    },
    computed: {
        lat_lng() {
            return [ this.latitude, this.longitude ]
        }
    },
    watch: {
        lat_lng() {
            if (mapData.marker) {
                mapData.marker.setLatLng([this.latitude, this.longitude])
            }
        },
    },
    mounted() {
        this.resetMapData()
        this.initMap()
        this.initMarker()

        if (mapData.marker.getLatLng().lat !== 0) {
            mapData.mymap.setView(mapData.marker.getLatLng(), 5)
        } else {
            mapData.mymap.fitWorld()
        }
    },
    methods: {
        resetMapData () {
            mapData = {}
        },
        initMap() {
            mapData.mymap = L.map('map', {
                zoom: 10,
                minZoom: 2,
                maxZoom: 15,
                dragging: true,
                scrollWheelZoom: false,
                boxZoom: false,
                closePopupOnClick: false,
                zoomControl: false
            })

            L.control.zoom({
                position: 'bottomright',
                zoomInText: '+',
                zoomOutText: '-'
            }).addTo(mapData.mymap)

            L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
                attribution:    'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC</a> BY 3.0. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC</a> BY SA.',
                maxZoom:        18,
                keepBuffer:     4,
            }).addTo(mapData.mymap)

            L.tileLayer('https://maps.rebellion.global/styles/xr_places_non-latin/{z}/{x}/{y}@2x.png', {
                maxZoom:        18,
                keepBuffer:     4,
            }).addTo(mapData.mymap)
        },
        addControl(controlOptions, componentClass, componentOptions) {
            const component = new Vue({
                render: (h)  => h(componentClass, componentOptions)
            }).$mount()

            const control = L.control(controlOptions)
            control.onAdd = () => component.$el
            control.addTo(mapData.mymap)
            return control
        },
        initMarker() {
            mapData.marker = L.marker([this.latitude, this.longitude], {draggable: true}).addTo(mapData.mymap)
            mapData.marker.on('dragend', this.onMarkerDragged)
        },
        onMarkerDragged(event) {
            const coords = event.target.getLatLng()
            this.$emit('update:latitude', Math.round(coords.lat * 1000000) / 1000000)
            this.$emit('update:longitude', Math.round(coords.lng * 1000000) / 1000000)
        },
    },
}
</script>