
// From this list: https://materialdesignicons.com/
// 
const icons = [
    require('vue-material-design-icons/Twitter.vue'),
    require('vue-material-design-icons/Facebook.vue'),
    require('vue-material-design-icons/Instagram.vue'),
    require('vue-material-design-icons/Youtube.vue'),
    require('vue-material-design-icons/Rss.vue'),
    require('vue-material-design-icons/Email.vue'),
    require('vue-material-design-icons/CheckboxBlankOutline.vue'),
    require('vue-material-design-icons/CheckboxMarked.vue'),
    require('vue-material-design-icons/Check.vue'),
    require('vue-material-design-icons/Close.vue'),
    require('vue-material-design-icons/OpenInNew.vue'),
    require('vue-material-design-icons/Star.vue'),
]

/**
 * Set up global components, so we don't have to import them in every file
 */
export default {
    install(Vue) {
        for (const iconRequire of icons) {
            const component = iconRequire.default
            Vue.component(formatName(component.name), component)
        }
    },
}

/**
 * If an icon is imported with "ChevronDown.vue" we can use it in code
 * with "<IconChevronDown />"
 * 
 * @param { string } iconName 
 */
function formatName(iconName) {
    return `Icon${iconName.replace('Icon', '')}`
}