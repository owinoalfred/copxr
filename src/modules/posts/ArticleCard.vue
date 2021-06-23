<template>
    <div
        class="flex flex-col p-1 w-full md:w-1/2 xl:w-1/3"
    >
        <link-to :href="getPostLink(article, type)">
            <div v-if="article.image" :class="['relative', 'w-full', minimal ? 'h-32' : 'h-64']">
                <img :src="article.image" :alt="`image for article ${article.title}`" class="w-full h-full object-cover"
                     loading="lazy">
            </div>
        </link-to>
        <div class="flex-auto p-6" :class="topColorClass(color)">
            <link-to :href="getPostLink(article, type)"
                     :class="['block', 'font-header', 'leading-tight', 'hover:underline', minimal ? 'text-lg' : 'text-2xl']">
                {{ article.title }}
            </link-to>
            <p v-if="!minimal" class="font-serif text-lg my-2">{{article.seoDescription}}</p>
        </div>
        <div v-if="!minimal" class="flex justify-between items-center px-8 py-2" :class="bottomColorClass(color)">
            <div class="font-header">
                {{ article.date | parseISO | format('EEEE, MMMM dd, yyyy') }}
            </div>
        </div>
    </div>
</template>

<script>
import {topColorClass, bottomColorClass} from '@/modules/groups/util/makeColors'
import {parseISO} from '@/util/date'
import {format} from 'date-fns'
import truncateWords from "@/modules/groups/util/truncateWords";

export default {
    props: {
        article: Object,
        type: String,
        color: String,
        minimal: Boolean
    },
    filters: {
        parseISO,
        format,
        truncateWords
    },
    methods: {
        topColorClass,
        bottomColorClass,
        getPostLink(post, type) {
            const dateObj = parseISO(post.date)
            const dateStr = format(dateObj, 'yyyy/MM/dd')
            return `/${type}/${dateStr}/${post.slug}/`
        },
    }
}
</script>