<template>
    <PageArticle
        type="blog"
        :page="page"
    />
</template>

<script>
import PageArticle from '@/modules/posts/PageArticle.vue'

export default {
    components: {
        PageArticle,
    },
    computed: {
        page() {
            let page = null
            for (const post of Object.values(this.$site.blog)) {
                if (!post.published && process.env.APP_ENV === 'production') {
                    continue // these are filtered out in production
                }

                if (this.$route.params.slug !== post.slug) {
                    continue
                }

                // does not exist yet - and is in the default language
                if (!page && post.lang === 'en') {
                    page = post
                }

                // does exist or does not exist, doesn't matter, we want our language to show
                if (post.lang === this.$t('locale')) {
                    page = post
                }
            }
            return page
        },
    },
}
</script>