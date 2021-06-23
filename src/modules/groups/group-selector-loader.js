/**
 * This file is bundled indepentently by webpack and is sent as Javascript to the browser
 * Be aware of what packages you include
 */
import GroupSelector from "../contact/form/GroupSelector.vue";
import {readGroupsFile} from "@/modules/map/map-data-reader";
import loadi18n from '@/i18n/async'

const rootElements = document.querySelectorAll('.group-selector')
for (const rootElement of rootElements) {
    mountForm(rootElement)
}

async function mountForm(rootElement) {
    if (rootElement.hasAttribute('data-mounted')) {
        console.error('Attempted to mount element twice - should not happen')
        return
    }
    rootElement.setAttribute('data-mounted', '1')

    const arrayToObject = (array, keyField) =>
        array.reduce((obj, item) => {
            obj[item[keyField]] = item
            return obj
        }, {})

    try {
        const groupsArray = await readGroupsFile();
        const groupsObject = arrayToObject(groupsArray, 'key')
        const propsData = { groups: groupsObject, isDropdown: true }
        const i18n = await loadi18n(document.documentElement.lang)
        const component = new GroupSelector({ propsData, i18n })
        component.$mount(rootElement)
    } catch (error) {
        console.error(error);
    }
}