<template>
    <div>
        <div class="flex flex-col sm:flex-row bg-blue-700 m-2 font-header text-3xl py-4">
            <button data-active-class="bg-blue-800 text-white shadow-sm border-blue-800" data-inactive-class="text-black border-black opacity-25" class="toggle-btn blog-toggle-btn px-4 py-1 mx-4 my-1 border-solid border-4 hover:opacity-100">{{ $t('Blog') }}</button>
            <button data-active-class="bg-blue-800 text-white shadow-sm border-blue-800" data-inactive-class="text-black border-black opacity-25" class="toggle-btn press-toggle-btn px-4 py-1 mx-4 my-1 border-solid border-4 hover:opacity-100">{{ $t('Press') }}</button>
        </div>
        <div class="toggle-section blog-section flex flex-wrap items-stretch my-1 mx-1">
            <ArticleCard
                v-for="(item, i) in blogPosts"
                :key="item.key"
                :article="item"
                :color="getColor(i)"
                :type="'blog'"
            >
            </ArticleCard>
        </div>
        <div class="toggle-section press-section flex flex-wrap items-stretch my-1 mx-1">
            <ArticleCard
                v-for="(item, i) in pressPosts"
                :key="item.key"
                :article="item"
                :color="getColor(i)"
                :type="'press'"
            >
            </ArticleCard>
        </div>
    </div>
</template>

<script>
    import {topColorClass, bottomColorClass} from '@/modules/groups/util/makeColors'
    import {parseISO} from '@/util/date'
    import {format} from 'date-fns'
    import getSortedPostsInLanguage from '@/modules/posts/getSortedPostsInLanguage'
    import ArticleCard from "@/modules/posts/ArticleCard";

    export default {
        components: {ArticleCard},
        data() {
            return {
                feedPosts: [],
            }
        },
        computed: {
            blogPosts() {
                return getSortedPostsInLanguage(this.$site.blog, this.$t('locale'))
            },
            pressPosts() {
                return getSortedPostsInLanguage(this.$site.press, this.$t('locale'))
            },
        },
        created() {
            this.$ssrContext.title = `${this.$t('seo_title_news')} | ${this.$t('extinction rebellion')}`
            this.$ssrContext.seoDescription = this.$t('seo_description_news')
            this.$ssrContext.seoImage = '/assets/img/social/blog.jpg'
            this.$ssrContext.pageScripts.push('toggle-content.js')
        },
        filters: {
            parseISO,
            format,
        },
        methods: {
            topColorClass,
            bottomColorClass,
            getPostLink(post, type) {
                const dateObj = parseISO(post.date)
                const dateStr = format(dateObj, 'yyyy/MM/dd')
                return `/${type}/${dateStr}/${post.slug}/`
            },
            getColor(i) {
                const colors = ['light-blue', 'warm-yellow', 'khaki', 'red', 'dark-blue', 'pink', 'purple', 'lemon', 'green']
                return colors[i % colors.length]
            },
        }
    }
</script>