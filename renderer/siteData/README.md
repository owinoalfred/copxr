# siteData

All our siteData is gathered here. All our .md files are parsed as JSON and HTML.
These are included in every .vue file via `this.$site`.

We do this so webpack does not have to be aware of the markdown rendering, making it only aware of how to render data when it is already parsed.
This way we can do very quick lookups of siteData, allowing us to look at questions like "how many groups are there?", or "which events are there in Belgium?"
Without having to do very expensive rendering steps in webpack.
All this data is cached very quickly and is accessible flatly, without having to go up a tree of markdown files to see which data is required.

This data structure is likely what makes this build so speedy. We have seperated our data-acquisition step with our template-rendering step.