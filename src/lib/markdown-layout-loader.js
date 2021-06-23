'use strict';
const matter = require('gray-matter')

/**
 * This loader knows how to handle .md files with webpack
 * We don't want to include the parsed markdown files as HTML in our webpack bundle, this will be too much
 * As our data is provided by rendered/siteData because we can cache it very effectively there!
 * 
 * So this module just returns the "layout" params for the markdown file, this is then picked up by our Site.vue
 * And this will render the layout file instead.
 */
module.exports = function markdownLayoutLoader(source) {
    let layout = ''
    try {
        const parsed = matter(source)
        layout = parsed.data.layout
        if (!layout) {
            // add a default layout: page
            layout = 'page'
        }
    } catch (err) {
        console.error('Could not parse markdown file', { err })
        return ''
    }

    return `export default ${JSON.stringify({ layout })};`
};
