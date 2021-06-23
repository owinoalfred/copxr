<template>
    <div class="page">
        <div class="m-2 flex">
            <div class="flex-1 bg-cover bg-center" :style="{ backgroundImage: `url(${page.imageLeft})` }" />
            <div class="bg-khaki-300 max-w-3xl mx-2 py-24 px-4 lg:px-16">
                <div class="font-header text-lg text-gray-900 mb-1">{{ page.subTitle }}</div>
                <h1 class="text-5xl md:text-7xl text-white leading-none">{{ page.title }}</h1>
                <p class="font-semibold text-xl mt-2 mb-8">{{ page.description }}</p>
            </div>
            <div class="flex-1 bg-cover bg-center" :style="{ backgroundImage: `url(${page.imageRight})` }" />
        </div>

        <main role="main" class="flex-1 max-w-3xl w-full mx-auto mt-12 flex flex-wrap px-4 lg:px-16 pb-12">
            <article class="article-content prose prose-xl text-black" v-html="page.content" />
        </main>
    </div>
</template>

<script>
export default {
    props: {
        page: { type: Object, default: () => ({})},
    },
}
</script>