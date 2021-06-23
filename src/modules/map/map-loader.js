/**
 * This file is bundled indepentently by webpack and is sent as Javascript to the browser
 * Be aware of what packages you include
 */
require('intersection-observer');
import loadi18n from '@/i18n/async'

import { readGroupsFile, readEventsFile } from './map-data-reader';
const loadMapClientChunk = () => import(/* webpackChunkName: 'map-client' */'./MapClient.vue')
const mapClientsElements = document.querySelectorAll('.map-client')

for (let mapClientElement of mapClientsElements) {
    enableMapClient(mapClientElement)
}

async function enableMapClient(mapClientElement) {
    if (mapClientElement.hasAttribute('data-mounted')) {
        console.error('Attempted to mount element twice - should not happen')
        return
    }
    mapClientElement.setAttribute('data-mounted', '1')

    function triggerMapLoad() {
        if(observer) {
            observer.disconnect()
        }
        loadMap(mapClientElement)
    }

    // Split off the leaflet + vue code for filesize
    // And only load when our browser has scrolled to the map
    const observer = new IntersectionObserver(async (entries) => {
        const el = entries[0]
        if (el.isIntersecting) {
            triggerMapLoad(mapClientElement)
        }
    }, {rootMargin: '0px 0px 100% 0px'})
    observer.observe(mapClientElement)
}

async function loadMap(mapClientElement) {
    const mapClientDataElement = mapClientElement.querySelector('.map-client-data')
    const mapClientData = JSON.parse(mapClientDataElement.innerHTML)

    const { isEmbed, groupKey, showGroups, showEvents } = mapClientData;

    // load the full groups and events data. This will be cached in browser so only really loaded once
    try {
        const promises = []
        const propsData = { groupKey, isEmbed }
        
        if (showGroups) {
            promises.push((async () => {
                propsData.groups = await readGroupsFile(groupKey)
            })())
        }

        if (showEvents){
            promises.push((async () => {
                propsData.events = await readEventsFile(groupKey)
            })())
        }

        let MapClient

        promises.push((async () => {
            const mapClientChunk = await loadMapClientChunk()
            MapClient = mapClientChunk.default
        })())

        // load all the external files via promises in parallel
        await Promise.all(promises)
        
        // i18n chunk can't be include above because it requires Vue to have been loaded
        const i18n = await loadi18n(document.documentElement.lang)
        const component = new MapClient({ propsData, i18n })

        // replaces entire .map-client so the original element will be gone
        component.$mount(mapClientElement)
    } catch (error) {
        console.error('failed map-loader', error);
    }
}