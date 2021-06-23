import { parseISO } from '@/util/date'
import { isBefore } from 'date-fns'

export default function getSortedPostsInLanguage(posts, preferredLanguage) {
    const postsBySlug = {}

    // we have articles in both translated (lang='es') and in English
    // prefer other language if it is the current language we are rendering
    for (const key in posts) {
        const item = posts[key]

        if (!item.published && process.env.APP_ENV === 'production') {
            continue // these are filtered out in production
        }

        // does not exist yet - and is in the default language
        if (!postsBySlug[item.slug] && item.lang === 'en') {
            postsBySlug[item.slug] = item
        }

        // does exist or does not exist, doesn't matter, we want our language to show
        if (item.lang === preferredLanguage) {
            postsBySlug[item.slug] = item
        }
    }

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