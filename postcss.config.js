
module.exports = ({ env }) => {
    // base plugins
    const plugins = [
        // allows @import statements
        require('postcss-import')(),
    
        // see src/css/README.md
        require('tailwindcss')('tailwind.config.js'),

        // adds vendor prefixes like -webkit or -moz
        require('autoprefixer')(),
    ]
    
    // only during production built because these are a bit slower
    if (env === 'production') {
        // minify our css as much as possible
        plugins.push(require('cssnano')({ preset: 'default' }))
    }

    return { plugins }
}