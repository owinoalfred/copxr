# Pages

Our rendering system knows how to deal with vue files and markdown files.

## .vue files

This is the *"template"* first approach. The .vue file is rendered on its own and has access to the entire siteData via `this.$site`.

An example can be found in `src/pages/groups`.

## .md files

This is the *"data"* first approach. The .md file references a `layout` file (found in `src/layouts`) that knows how to render the data.

Any data between the `---` is passed in the `this.page` object and the markdown is parsed as HTML and is accessible via `this.page.content`.

An example can be found in `src/pages/the-emergency`.
