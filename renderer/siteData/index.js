const glob = require('util').promisify(require('glob'))
const readFile = require('util').promisify(require('fs').readFile)
const path = require('path')
const MarkdownIt = require('markdown-it')
const MarkdownItAttrs = require('markdown-it-attrs')
const MarkdownItAnchor = require('markdown-it-anchor')
const MarkdownItFootnote = require('markdown-it-footnote')
const md = new MarkdownIt({html: true})
    .use(MarkdownItAttrs)
    .use(MarkdownItAnchor)
    .use(MarkdownItFootnote);
const matter = require('gray-matter')

let _cache = {}
let useCache = false

function removeEmails(branches){
    Object.keys(branches).forEach(k => {        
        if (!branches[k].publiciseemail) delete branches[k].email;
    });
    return branches;
}

function sliceObject(object, sliceDepth) {
    const entries = Object.entries(object).slice(0, sliceDepth)
    return entries.reduce((object, [key, value]) => ({
        ...object,
        [key]: value
    }), {})
}

/**
 * Finds all the markdown files and parses them to HTML and JSON data
 */
module.exports = async function getSiteData() {
    if (!useCache) {
        console.time('siteData')
        _cache = {
            pages: await readMarkdownFiles('src/pages'),
            blog: {...(await readMarkdownFiles('_posts/blog')), ...(await readHTMLFiles('_posts/blog'))},
            press: await readMarkdownFiles('_posts/press'),
            groups: removeEmails(await readMarkdownFiles('_groups', true)),
            branch_events_array: require('../../_data/events/branch_events_array.json'),
            branch_events: require('../../_data/events/branch_events.json'),
        }
        if (process.env.APP_ENV === 'translations' || process.env.APP_ENV === 'staging') {
            const branchEventsSubset = {
                ...sliceObject(_cache.branch_events, 25),
                'be-belgium':  _cache.branch_events['be-belgium'] || [],
                'fr-france':  _cache.branch_events['fr-france'] || []
            }
            const branchEventsArraySubset = Object.values(branchEventsSubset)
            const groupsSubset = process.env.APP_ENV === 'staging'
                ? _cache.groups
                : Object.keys(branchEventsSubset).reduce((groups, groupKey) => ({
                    ...groups,
                    [groupKey]: _cache.groups[groupKey]
                }), {})
            _cache = {
                ..._cache,
                groups: groupsSubset,
                branch_events_array: branchEventsArraySubset,
                branch_events: branchEventsSubset
            }
        }
        console.timeEnd('siteData')
        
        // Cache our siteData, so subsequent fetches don't parse all the data
        // This is fine to do, because our dev-server restarts via nodemon every time something changes and the cache is invalidated
        // And when we are generating our site for production, the data won't change
        useCache = true
    }
    
    return _cache
}

async function readMarkdownFiles(baseDir, flat = false){
    return await readFilesOfType(baseDir, 'md', a => md.render(a), flat)
}

async function readHTMLFiles(baseDir, flat = false){
    return await readFilesOfType(baseDir, 'html', a => a, flat)
}

async function readFilesOfType(baseDir, extension, renderFn, flat = false) {
    const results = {}
    // find all .md files in this folder
    const absolutePathToBaseDir = path.resolve(__dirname, '../../', baseDir)
    const globPath = path.resolve(absolutePathToBaseDir, `**/*.${extension}`)
    const filesPaths = await glob(globPath)

    // parses to json and html
    for (const filePath of filesPaths) {
        try {
            const fileBuffer = await readFile(filePath, 'utf8')
            const parsed = matter(fileBuffer) // yaml in an object
            const markdown = renderFn(parsed.content) // markdown as html
            const relativePath = normalizePath(absolutePathToBaseDir, filePath, flat) // the key of our file
            results[relativePath] = {
                ...parsed.data,
                key: relativePath, // be-belgium; we need this in /branches to link to /branches/be-belgium
                content: markdown,
            }
        } catch(err) {
            console.error('File skipped: Could not parse ', { filePath, err })
        }
    }

    return results
}

/**
 * Get a valid key for our file without the folder name and extension.
 * Eg: Converts 'src/pages/the-emergency/index.md' to 'the-emergency/index'
 * Why: This allows our webpack router to find the matching path!
 */
function normalizePath(absolutePathToBaseDir, filePath, flat) {
    if(flat) {
        return path.basename(filePath, path.extname(filePath))
    } else {
        return path.relative(absolutePathToBaseDir, filePath).replace(path.extname(filePath), '')
    }
}
