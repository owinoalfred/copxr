import { shallowMount as testShallow, mount as testMount } from '@vue/test-utils'
import createi18n,{ i18n } from '@/i18n'

/**
 * This module adds `i18n` to the options of the shallow and mount functions of the @vue/test-utils
 * See: https://github.com/kazupon/vue-i18n/issues/323#issuecomment-506332850
*/

export function shallowMount(component, opts = {}) {
    if (!i18n) { createi18n('en') }
    return testShallow(component, { ...opts, i18n })
}

export function mount(component, opts = {}) {
    if (!i18n) { createi18n('en') }
    return testMount(component, { ...opts, i18n })
}