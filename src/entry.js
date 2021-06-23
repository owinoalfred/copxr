import Vue from 'vue'
import router from './router.vue'
import i18n from './i18n'
import getRouteComponent from './lib/router/getRouteComponent'
import setupVueInstance from '@/setupVueInstance'

/**
 * This is our webpack entry file and the first function to be called.
 * It returns a Vue.js file to be rendered to the server-rendered.
 */
export default function entry(context) {
    setupVueInstance(Vue)
    
    // we have a list of routes from our lib/router/routes file => this is gathed from looking at all the files in src/pages
    // and we have our url that we are trying to render => we try to find which src/page file matches our URL
    const route = getRouteComponent(context.url)

    Vue.use({
        // A Vue.js project-wide plugin that adds the followings properties to every Vue.js component instance
        install(Vue) {
            // adds a $route context that is accessible everywhere, useful for extracting this.$route.params.group from our route:
            // Example: this.$route = { url, path: '/groups/:group', modulePath: './groups/_group.vue', params: { group: 'be-belgium }  }
            Vue.prototype.$route = route

            // all our content gathered in rendered/siteData, this allows direct access to the server-rendered instead of having to deal with
            // having all of this data in our webpack server bundle
            // -> dynamic content should be gathered in rendered/siteData
            Vue.prototype.$site = context
        },
    })

    // enable context to be readable from anywhere, we use this in utils/date.js to get current language
    global.context = context
    return new router({ i18n: i18n(context.language) })
}
