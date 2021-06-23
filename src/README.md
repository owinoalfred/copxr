# The src folder

Our src folder is built by webpack into a vue-ssr-server-bundle and vue-ssr-client-manifest.

# index.template.html

Our base HTML template. Add head elements or scripts here in this file.

Variables in the template can be used, they are passed via the context created in renderer/render.js
You can adjust the context from Vue.js components by using the `this.$ssrContext` object.

```
created() {
    this.$ssrContext.title = this.page.seoTitle || this.page.title
    this.$ssrContext.seoDescription = this.page.seoDescription
    this.$ssrContext.seoTitle = this.page.seoTitle
    this.$ssrContext.seoImage = this.page.seoImage
},
```

Other:

- *entry.js*: Our webpack entry file, Vue.js plugins belong here.
- *Site.vue*: Our base Vue.js component that renders the route / page or layout components.