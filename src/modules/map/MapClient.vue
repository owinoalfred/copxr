<template>
    <div class="map-section w-full h-full">
        <div id="map" ref="map" class="w-full h-full z-0" />

        <transition
            enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-active-class="ease-out duration-300"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="ease-in duration-200"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
            <div
                v-if="showEmbedInfo"
                class="z-10000 transform transition-all fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center pointer-events-none"
            >
                <div
                    class="bg-gray-100 rounded-lg px-4 pt-5 pb-4 shadow-xl sm:max-w-lg sm:w-full sm:p-6 relative pointer-events-auto"
                >
                    <div @click="showEmbedInfo = false" class="absolute top-0 right-0 cursor-pointer -mr-2 -mt-2 flex items-center justify-center h-6 w-6 bg-gray-100 text-gray-600 hover:text-red-600 hover:bg-gray-200 rounded-full font-header text-xl leading-none shadow-lg pt-1">×</div>
                    <h5 class="text-xl">Choose your map type and copy the corresponding code snippet into your website</h5>
                    <details class="mt-4">
                        <summary class="flex items-center">
                            <h6>Full map (shows countries, groups and events)</h6>
                        </summary>
                        <div class="p-4 text-gray-100 bg-gray-900">
                            <code v-if="group"> &lt;iframe title="XR {{ group.name }} map" allowfullscreen width="100%" height="100%" src="https://rebellion.global/maps/{{ group.key }}/"&gt;&lt;/iframe&gt; </code>
                            <code v-else> &lt;iframe title="XR map" allowfullscreen width="100%" height="100%" src="https://rebellion.global/maps/"&gt;&lt;/iframe&gt; </code>
                        </div>
                    </details>
                    <details v-if="group" class="mt-4">
                        <summary class="flex items-center">
                            <h6>Group map (only shows countries and groups)</h6>
                        </summary>
                        <div class="p-4 text-gray-100 bg-gray-900">
                            <code> &lt;iframe title="XR {{ group.name }} map" allowfullscreen width="100%" height="100%" src="https://rebellion.global/maps/{{ group.key }}/groups/"&gt;&lt;/iframe&gt; </code>
                        </div>
                    </details>
                    <details v-if="group" class="mt-4">
                        <summary class="flex items-center">
                            <h6>Events map (Only shows events)</h6>
                        </summary>
                        <div class="p-4 text-gray-100 bg-gray-900">
                            <code> &lt;iframe title="XR {{ group.name }} map" allowfullscreen width="100%" height="100%" src="https://rebellion.global/maps/{{ group.key }}/events/"&gt;&lt;/iframe&gt; </code>
                        </div>
                    </details>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
import extendVue from '@/extendVue'
import Vue from 'vue'

import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet-fullscreen'

import MapGroupPopup from './MapGroupPopup.vue'
import MapEventPopup from './MapEventPopup.vue'

import ZoomControl from './ZoomControl.vue'
import ToggleLayers from './ToggleLayers.vue'
import MapButton from './MapButton.vue'

let mapData = {}

const groupIcon = L.icon({
    iconUrl: '/assets/img/logos/xr-pin-shadowed-blue.svg',
    iconSize: [50, 40],
    iconAnchor: [25, 40],
    className: 'xrMarker'
})

const eventIcon = L.icon({
    iconUrl: '/assets/img/logos/xr-pin-shadowed-yellow.svg',
    iconSize: [50, 40],
    iconAnchor: [25, 40],
    className: 'xrMarker'
})

const countryIcon = L.icon({
    iconUrl: '/assets/img/logos/xr-pin-shadowed.svg',
    iconSize: [50, 40],
    iconAnchor: [25, 40],
    className: 'xrMarker'
})

/** Vue.extend allows us to directly mount this element on the DOM */
export default extendVue({
    props: {
        groupKey: String,
        groups: { type: Array, default: () => [] },
        events: { type: Array, default: () => [] },
        isEmbed: { type: Boolean, default: false },
    },
    data() {
        return {
            showEmbedInfo: false,
        }
    },
    computed: {
        group () {
            for (const group of this.groups) {
                if (group.key === this.groupKey) {
                    return group
                }
            }
            return null
        },
    },
    mounted() {
        this.resetMapData()
        this.initMap()
        this.initMarkers()
        this.addControls()
        this.layersChanged()
        this.zoomToGroup()
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
            L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
                attribution:    'Map tiles by <a href="http://stamen.com" target="_blank">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0" target="_blank">CC</a> BY 3.0. Data by <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0" target="_blank">CC</a> BY SA.',
                maxZoom:        18,
                keepBuffer:     4,
            }).addTo(mapData.mymap)
            L.tileLayer('https://maps.rebellion.global/styles/xr_places_non-latin/{z}/{x}/{y}@2x.png', {
                maxZoom:        18,
                keepBuffer:     4,
            }).addTo(mapData.mymap)
        },
        initMarkers() {
            // cluster markers when really close together
            mapData.clusterEvents = L.markerClusterGroup({
                showCoverageOnHover: false,
                iconCreateFunction: function(cluster) {
                    return L.divIcon({
                        html: '<span>' + cluster.getChildCount() + '</span>',
                        className: 'marker-cluster marker-cluster-event'
                    });
                }
            })
            mapData.clusterLocalGroups = L.markerClusterGroup({
                showCoverageOnHover: false,
                iconCreateFunction: function(cluster) {
                    return L.divIcon({
                        html: '<span>' + cluster.getChildCount() + '</span>',
                        className: 'marker-cluster marker-cluster-group'
                    });
                }
            })
            mapData.clusterCountryGroups = L.markerClusterGroup({
                showCoverageOnHover: false,
                iconCreateFunction: function(cluster) {
                    return L.divIcon({
                        html: '<span>' + cluster.getChildCount() + '</span>',
                        className: 'marker-cluster marker-cluster-country'
                    });
                }
            })

            for (const group of this.groups) {
                const marker = this.createMarker(group, group.iscountry ? 'country': 'local')
                if (!marker) continue
                if (group.iscountry){
                    mapData.clusterCountryGroups.addLayer(marker);
                } else {
                    mapData.clusterLocalGroups.addLayer(marker);
                }
            }

            for (const event of this.events) {
                const marker = this.createMarker(event, 'event')
                if (!marker) continue
                mapData.clusterEvents.addLayer(marker)
            }
        },
        createMarker(item, itemType) {
            const location = this.getLocationForMarkerData(item)
            if (!location) {
                return // location for marker
            }

            const marker = L.marker(location, {
                riseOnHover: true,
                alt: item.name,
                icon: itemType === "event"
                    ? eventIcon
                    : itemType === "country"
                        ? countryIcon
                        : groupIcon
            })

            /* eslint no-inner-declarations: 0 */
            function addTooltip () {
                marker.bindTooltip('', {
                    sticky: true,
                    className: 'tooltip',
                    opacity: 0.8,
                })
            }

            marker.on('tooltipopen', () => {
                const tooltipComponent = itemType === 'event'
                    ? new MapEventPopup({
                        propsData: { event: item, showButton: false, isEmbed: this.isEmbed },
                        i18n: this.$i18n,
                    }).$mount()
                    : new MapGroupPopup({
                        propsData: { group: item, showButton: false, isEmbed: this.isEmbed },
                        i18n: this.$i18n,
                    }).$mount()
                marker.setTooltipContent(tooltipComponent.$el)
            })

            marker.on('click', () => {
                this.onMarkerClick(marker, item, itemType, addTooltip)
            })
            addTooltip()

            return marker

        },
        getLocationForMarkerData(markerData) {
            if (markerData.latitude) { // group
                return [ markerData.latitude, markerData.longitude ]
            } else if (markerData.geocode) {
                const center = markerData.geocode.center
                return [ center[1], center[0] ]
            }
            console.error('Location not found for marker', markerData)
        },
        async onMarkerClick(marker, markerData, itemType, addTooltip) {
            // hide controls that overlap the popup in mobile
            const leafletControlContainer =  document.querySelector('.leaflet-control-container');
            leafletControlContainer.classList.add('hidden')
            leafletControlContainer.classList.add('lg:block')

            marker.unbindTooltip()

            if (mapData.mapPopup) {
                if (mapData.mapPopup._marker === markerData) {
                    return
                }
                // previous popup is still open
                mapData.mapPopup.remove()
                mapData.mapPopup = null
            }

            const popupComponent = itemType === 'event'
                ? new MapEventPopup({
                    propsData: { event: markerData, isEmbed: this.isEmbed },
                    i18n: this.$i18n,
                }).$mount()
                : new MapGroupPopup({
                    propsData: { group: markerData, isEmbed: this.isEmbed },
                    i18n: this.$i18n,
                }).$mount()

            mapData.mapPopup = L.popup({
                offset: [0, -30],
                closeOnClick: true
            })
            .setLatLng(this.getLocationForMarkerData(markerData))
            .setContent(popupComponent.$el)
            .openOn(mapData.mymap)

            mapData.mapPopup._marker = markerData

            mapData.mapPopup.on('remove', () => {
                leafletControlContainer.classList.remove('hidden')
                leafletControlContainer.classList.remove('lg:block')
                addTooltip()
                mapData.mapPopup.remove()
                mapData.mapPopup = null
            })
        },
        addControls() {
            this.createControl({ position: 'topright' }, ToggleLayers, {
                attrs: {
                    countryGroupsCount: mapData.clusterCountryGroups && mapData.clusterCountryGroups.getLayers().length,
                    localGroupsCount: mapData.clusterLocalGroups && mapData.clusterLocalGroups.getLayers().length,
                    eventsCount: mapData.clusterEvents &&  mapData.clusterEvents.getLayers().length
                },
                on: { layersChanged: this.layersChanged },
            })

            this.createControl({ position: 'bottomleft' }, MapButton, {
                attrs: { title: this.isEmbed ?
                        this.$t('ADD_OR_UPDATE_LINK') :
                        this.$t('Update') },
                on: { click: () => {
                        if (this.isEmbed){
                            window.open('https://rebellion.global/submit-group','_blank');
                        } else {
                            window.location.pathname = '/submit-group';
                        }
                    } },
            })

            if (this.group) {
                this.createControl({ position: 'bottomleft' }, MapButton, {
                    attrs: { title: 'embed' },
                    on: { click: () => {
                            this.showEmbedInfo = !this.showEmbedInfo;
                        } },
                })
            }

            this.createControl({ position: 'bottomright' }, ZoomControl, {
                attrs: { group: this.group },
                on: { zoomToGroup: this.zoomToGroup, zoomToWorld: this.zoomToWorld },
            })

            L.control.fullscreen({
                position:'bottomright'
            }).addTo(mapData.mymap);

            L.control.zoom({
                position: 'bottomright',
                zoomInText: '+',
                zoomOutText: '-'
            }).addTo(mapData.mymap)
        },
        createControl(controlOptions, componentClass, componentOptions) {
            const component = new Vue({
                render: (h)  => h(componentClass, componentOptions),
                i18n: this.$i18n,
            }).$mount()

            const control = L.control(controlOptions)
            control.onAdd = () => component.$el
            control.addTo(mapData.mymap)
            return control
        },
        zoomTo(markerData, zoom) {
            if (!zoom) console.error('no zoom level set')
            const location = this.getLocationForMarkerData(markerData)
            mapData.mymap.flyTo(location, zoom, {
                duration: 0.1,
                easeLinearity: 0.5
            })
        },
        zoomToGroup() {
            // edge cases: https://boundingbox.klokantech.com/
            // export as csv, then switch the order like [[2, 1], [4, 3]]
            if (this.groupKey === 'gb-wales') {
                // for example: -5.76,51.24,-1.43,53.7 =>
                mapData.mymap.fitBounds([ [51.24, -5.76], [53.7, -1.43] ], { padding: [20, 20] })
                return
            }
            if (this.groupKey === 'gb-scotland') {
                mapData.mymap.fitBounds([ [55.6, -9.2], [60.0, 0.7] ], { padding: [20, 20] })
                return
            }
            if (this.groupKey === 'gb-northern-ireland') {
                mapData.mymap.fitBounds([ [53.4, -8.97], [55.79, -4.4] ], { padding: [20, 20] })
                return
            }

            // zoom to fit all markers
            const allGroups = L.featureGroup([mapData.clusterEvents, mapData.clusterLocalGroups, mapData.clusterCountryGroups])
            if(allGroups.getBounds().isValid()) {
                mapData.mymap.fitBounds(allGroups.getBounds(), { padding: [20, 20] })

                if (this.groups.length === 1 && this.group) {
                    // only 1 country group to show
                    this.zoomTo(this.group, 5)
                }

                return
            }

            // no markers, fallback: show earth
            mapData.mymap.fitWorld()
        },
        zoomToWorld() {
            mapData.mymap.setZoom(2)
        },
        layersChanged({ showEvents, showLocalGroups, showCountryGroups } = { showEvents: true, showLocalGroups: true, showCountryGroups: true }) {
            mapData.clusterEvents.remove()
            mapData.clusterLocalGroups.remove()
            mapData.clusterCountryGroups.remove()
            if (showEvents) {
                mapData.clusterEvents.addTo(mapData.mymap)
            }
            if (showLocalGroups) {
                mapData.clusterLocalGroups.addTo(mapData.mymap)
            }
            if (showCountryGroups) {
                mapData.clusterCountryGroups.addTo(mapData.mymap)
            }
        },
    },
})
</script>