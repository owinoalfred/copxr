const { Feed } = require("feed")
const { parseISO, isValid, format, isBefore } = require('date-fns')
const writeFileToPublic = require('./generate/lib/writeFileToPublic')
const { host } = require('./config')

module.exports = async function generateFeed(siteData) {
    const feed = await getFeed(siteData)
    await writeFileToPublic('feed.xml', feed.atom1())
    await writeFileToPublic('feed.json', feed.json1())
    await writeFileToPublic('rss.xml', feed.rss2())
}

async function getFeed(siteData) {
    const posts = getSortedPostsInLanguage(siteData, 'en').slice(0, 10) // last 10
    const updated = parseISO(posts[0].date)

    const feed = new Feed({
        title: "Ecological & Climate Change News | Extinction Rebellion",
        description: "Life as we know it is on the brink of collapse. Our governments have failed to protect us. Help us to build a powerful movement to change the course we are on.",
        id: `${host}/feed.xml`,
        link: `${host}/feed.xml`,
        language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
        image: `${host}/assets/img/social/home.jpg`,
        favicon: `${host}/favicon.ico`,
        copyright: "Made with love and rage",
        updated: updated, // optional, default = today
        generator: "xr-vue",
        feedLinks: {
            json: `${host}/feed.json`,
            atom: `${host}/feed.xml`,
            rss: `${host}/rss.xml`,
        },
        author: {
            name: "Extinction Rebellion"
        }
    })

    for (const post of posts) {
        feed.addItem({
            title: post.title,
            id: `${host}${post.url}`,
            link: `${host}${post.url}`,
            content: post.content,
            author: [ { name: "Extinction Rebellion", } ],
            date: parseISO(post.date),
            image: `${host}${post.image}`,
        })
    }

    return feed
}

function getSortedPostsInLanguage(siteData, preferredLanguage = 'en') {
    const postsBySlug = {}

    fillPosts(postsBySlug, siteData.blog, preferredLanguage)
    fillPosts(postsBySlug, siteData.press, preferredLanguage)

    // turn to an Array and sort these by date
    return Object.values(postsBySlug).sort((a, b) => {
        const dateA = parseISO(a.date)
        const dateB = parseISO(b.date)

        if (isBefore(dateA, dateB)) {
            return 1
        } else if (isBefore(dateB, dateA)) {
            return -1
        }
        return 0
    })
}

function fillPosts(postsBySlug, posts, preferredLanguage = 'en') {
    for (const key in posts) {
        const post = posts[key]
        const dateObj = parseISO(post.date)
        if (!isValid(dateObj)) {
            continue
        }
        if (!post.published) {
            continue // these are filtered out
        }

        const dateStr = format(dateObj, 'yyyy/MM/dd')
        const url = `/blog/${dateStr}/${post.slug}`

        // does not exist yet - and is in the default language
        if (!postsBySlug[url] && post.lang === 'en') {
            postsBySlug[url] = { ...post, url }
        }

        // does exist or does not exist, doesn't matter, we want our language to show
        if (post.lang === preferredLanguage) {
            postsBySlug[url] = { ...post, url }
        }
    }
}
