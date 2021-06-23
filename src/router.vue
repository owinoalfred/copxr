<template>
    <App>
        <component :is="routeComponent" v-bind="routeProps" />
    </App>
</template>

<script>
import Vue from 'vue'
import App from './App.vue'

// use webpack's require.context to find all files with the following extensions (vue/md) in the given folders
// we can not find them at run-time, and require.context is special code that has temporary access to the filesystem at
// webpack compile time, all these files are then accessible from the pagesCache or layoutsCache and only in this specific file
const pagesCache = {}
const layoutsCache = {}
function importAll(cacheFile, r) {
    const keys = r.keys()
    keys.forEach(key => cacheFile[key] = r(key).default)
}
importAll(pagesCache, require.context('./pages/', true, /\.(vue|md)$/))
importAll(layoutsCache, require.context('./layouts/', true, /\.vue$/))

// This is the root component for our Vue.js site
// This renders the provided page or layout
export default Vue.extend({
    components: {
        App,
    },
    data() {
        const cacheKey = this.$route.modulePath.replace('src/pages', '.')
        
        let routeComponent = pagesCache[cacheKey]
        const routeProps = {}

        if (!routeComponent) {
            // Should never happen, this means that the require.context above has a mismatch with our lib/router/resolveFiles.js code
            console.error({ cacheKey })
            throw new Error('Route not found as file')
        }

        // if we are rendering a markdown file, a `layout` key must be set
        // our vue.js route component is then the layout file
        if (routeComponent.layout) {
            routeComponent = layoutsCache['./' + routeComponent.layout + '.vue']
            
            // we don't want to parse the markdown content in our Vue.js bundle
            // we are passing the parsed markdown file from our siteData, which is available as `this.$site` in every .vue file
            // our parsed markdown pages are available in this.$site.pages, we are setting the props here for our layout file as 'page' for the matching page
            const pageKey = cacheKey.replace('./', '').replace('.md', '')
            routeProps.page = this.$site.pages[pageKey]
        }

        return {
            routeComponent,
            routeProps,
        }
    },
})
</script>
