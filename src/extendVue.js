import Vue from 'vue'
import setupVueInstance from "./setupVueInstance"

export default function extendVue(options) {
    setupVueInstance(Vue)
    return Vue.extend({
        ...options,
    })
}