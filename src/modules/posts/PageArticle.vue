<template>
    <div class="page mb-16">
        <div class="bg-yellow-400 m-2 text-center h-full px-4 lg:px-16 py-12">
            <template v-if="shouldSplitTitle">
                <h2 class="text-2xl text-black leading-none">{{ firstPartOfTitle }}</h2>
                <h1 class="text-4xl md:text-6xl text-black leading-none">{{ endPartOfTitle }}</h1>
            </template>
            <h1 v-else class="text-4xl md:text-6xl text-black leading-none">{{ page.title }}</h1>
            <div class="font-header text-lg mt-4">
                {{ page.date | parseISO | format('EEEE, MMMM dd, yyyy') }} by {{page.author || 'Extinction Rebellion'}}
            </div>
        </div>
        <article class="article-content prose prose-xl max-w-2xl text-black mx-auto p-4 md:p-0" v-html="page.content" />
        <div class="max-w-3xl mx-auto">
            <hr class="my-16">
        </div>
        <div class="max-w-2xl mx-auto px-4 pb-16 text-black text-lg">
            <h5>{{ $t('about the rebellion') }}</h5>
            <i18n path="about the rebellion explainer" tag="p" class="whitespace-pre-wrap">
                <template v-slot:link_one>
                    <link-to class="text-green-500 font-semibold" href="/" >{{$t('extinction rebellion')}}</link-to>
                </template>
                <template v-slot:link_two>
                    <link-to class="text-green-500 font-semibold" href="/groups/">{{$t('a local branch very close to you')}}</link-to>
                </template>
                <template v-slot:link_three>
                    <link-to class="text-green-500 font-semibold xr-button bg-gray-800" href="/get-involved/">{{$t('Get involved')}}</link-to>
                </template>
                <template v-slot:link_four>
                    <link-to class="text-green-500 font-semibold" href="/donate/">{{$t('consider making a donation')}}</link-to>
                </template>
            </i18n>
        </div>
        <div class="max-w-6xl mx-auto px-4">
            <h5>{{ $t('more from the rebellion') }}</h5>
            <div class="flex flex-wrap items-stretch">
                <ArticleCard
                    v-for="(item, i) in relatedPosts"
                    :key="item.key"
                    :article="item"
                    :color="getColor(i)"
                    :type="type"
                    :minimal="true">
                </ArticleCard>
            </div>
        </div>
    </div>
</template>

<script>
import { parseISO } from '@/util/date'
import { format } from 'date-fns'
import getSortedPostsInLanguage from "@/modules/posts/getSortedPostsInLanguage";
import ArticleCard from "@/modules/posts/ArticleCard";

export default {
    components: {ArticleCard},
    props: {
        page: Object,
        type: String
    },
    computed: {
        shouldSplitTitle() {
            return this.page.title.indexOf(':') > -1
        },
        firstPartOfTitle() {
            if (this.shouldSplitTitle) {
                const splitIndex = this.page.title.indexOf(':')
                return this.page.title.substr(0, splitIndex)
            }
            return ''
        },
        endPartOfTitle() {
            if (this.shouldSplitTitle) {
                const splitIndex = this.page.title.indexOf(':')
                return this.page.title.substr(splitIndex + 1)
            }
            return ''
        },
        relatedPosts() {
            return Object.values(getSortedPostsInLanguage(this.$site[this.type], this.$t('locale')))
                .filter(post => post.key !== this.page.key)
                .slice(0, 9)
                .sort(() => 0.5 - Math.random())
                .slice(0,6)
        },
    },
    methods: {
        getColor(i) {
            const colors = ['light-blue', 'warm-yellow', 'khaki', 'red', 'dark-blue', 'pink', 'purple', 'lemon', 'green']
            return colors[i % colors.length]
        },
    },
    filters: {
        parseISO,
        format,
    },
    created() {
        this.$ssrContext.title = this.page.title
        this.$ssrContext.seoTitle = this.page.seoTitle
        this.$ssrContext.seoDescription = this.page.seoDescription
        this.$ssrContext.seoImage = this.page.seoImage
    },
}
</script>