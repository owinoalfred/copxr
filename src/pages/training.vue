<template>
    <div>
        <div class="bg-purple-500 m-2 lg:relative">
            <div class="lg:w-1/2 p-6 lg:px-16 lg:py-24 relative z-10">
                <div class="font-header text-lg text-gray-900 mb-1">{{ $t('training_subtitle') }}</div>
                <h1 class="font-header text-5xl md:text-7xl text-white leading-none">{{ $t('training_title') }}</h1>
                <p class="font-semibold text-xl mt-2 mb-8">

                </p>
                <p class="font-semibold text-xl mt-2 mb-8 whitespace-pre-wrap">{{ $t('training_description') }}</p>

                <svg class="hidden lg:block absolute left-100 inset-y-0 h-full w-24" viewBox="0 0 50 100"
                     preserveAspectRatio="none">
                    <polygon class="text-purple-500" fill="currentColor" points="0,0 50,0 0,100"/>
                    <polygon class="text-gray-100" fill="currentColor" points="45,0 50,0 5,100 0,100"/>
                </svg>
            </div>

            <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <div class="h-56 w-full bg-black bg-cover bg-center sm:h-72 md:h-96 lg:w-full lg:h-full"
                     :style="{ backgroundImage: 'url(/assets/img/stock/flags.jpg)' }"/>
            </div>
        </div>
        <div class="m-2">
            <iframe class="w-full h-90vh max-h-9/16ratio"
                    loading="lazy"
                    src="https://tube.rebellion.global/videos/embed/5d97596f-f7a8-4310-9282-06c8ef8b43c6"
                    sandbox="allow-same-origin allow-scripts" allowfullscreen="allowfullscreen"></iframe>
        </div>
        <div class="flex flex-col lg:flex-row bg-yellow-500 m-2">
            <div class="lg:w-1/2 p-6 lg:px-16 lg:py-24">
                <div class="font-header text-lg text-gray-900 mb-1">{{ $t('training_subtitle_2') }}</div>
                <h1 class="font-header text-5xl md:text-7xl text-white leading-none">{{ $t('training_title_2') }}</h1>
                <p class="font-semibold text-xl mt-2 mb-8">

                </p>
                <i18n path="training_description_2" tag="p" class="font-semibold text-xl mt-2 mb-8 whitespace-pre-wrap">
                    <template v-slot:link>
                        <a class="underline text-green-500" href='https://cloud.organise.earth/apps/calendar/p/es9Aoyc6dyeHbHLw/dayGridMonth/now'>{{ $t('link') }}</a>
                    </template>
                </i18n>
            </div>

            <div class="relative lg:w-1/2 p-4 flex justify-center items-center">
                <div class="absolute inset-0 z-0 flex justify-center items-center font-header">
                    {{ $t('loading calendar') }}
                </div>
                <iframe
                    class="relative z-10"
                    loading="lazy"
                    style="min-height: 500px;"
                    width="100%"
                    height="100%"
                    src="https://cloud.organise.earth/apps/calendar/embed/iCoaNMwWCwFWbpHw"></iframe>
            </div>
        </div>
<!--        <div class="bg-pink-400 m-2 relative overflow-hidden">-->
<!--            <img-->
<!--                class="block absolute right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-5 lg:opacity-10 max-w-600 max-h-100vw"-->
<!--                src="/assets/img/wood-blocks/hourglass.svg"-->
<!--                loading="lazy"-->
<!--                alt="black and white drawing of an hourglass"-->
<!--            />-->
<!--            <div class="max-w-screen-lg p-6 lg:px-16 lg:py-24">-->
<!--                <div class="font-header text-lg text-gray-900 mb-1">{{ $t('training_subtitle_3') }}</div>-->
<!--                <h1 class="font-header text-5xl md:text-7xl text-white leading-none">{{ $t('training_title_3') }}</h1>-->
<!--                <p class="font-semibold text-xl mt-2 mb-8">-->

<!--                </p>-->
<!--                <p class="font-semibold text-xl mt-2 mb-8 whitespace-pre-wrap">{{ $t('training_description_3') }}</p>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="flex flex-row flex-wrap mx-1 mb-1 -mt-1">-->
<!--            <iframe class="flex-auto w-100 h-56 m-1"-->
<!--                    loading="lazy"-->
<!--                    src="https://tube.rebellion.global/videos/embed/2ad12b6b-bb53-473c-ad74-14eef02874b5"-->
<!--                    sandbox="allow-same-origin allow-scripts" allowfullscreen="allowfullscreen"></iframe>-->
<!--            <iframe class="flex-auto w-100 h-56 m-1"-->
<!--                    loading="lazy"-->
<!--                    src="https://tube.rebellion.global/videos/embed/6eb82881-c3cb-4e86-8431-f6d759595799"-->
<!--                    sandbox="allow-same-origin allow-scripts" allowfullscreen="allowfullscreen"></iframe>-->
<!--            <iframe class="flex-auto w-100 h-56 m-1"-->
<!--                    loading="lazy"-->
<!--                    src="https://tube.rebellion.global/videos/embed/7f91ab01-fc65-42a1-9db0-bbc878916b0c"-->
<!--                    sandbox="allow-same-origin allow-scripts" allowfullscreen="allowfullscreen"></iframe>-->
<!--            <iframe class="flex-auto w-100 h-56 m-1"-->
<!--                    loading="lazy"-->
<!--                    src="https://tube.rebellion.global/videos/embed/171d27f9-c181-4182-b69f-87b0b3b2486b"-->
<!--                    sandbox="allow-same-origin allow-scripts" allowfullscreen="allowfullscreen"></iframe>-->
<!--            <iframe class="flex-auto w-100 h-56 m-1"-->
<!--                    loading="lazy"-->
<!--                    src="https://tube.rebellion.global/videos/embed/6c04eb93-3805-4ae2-ace9-aacf25cfca60"-->
<!--                    sandbox="allow-same-origin allow-scripts" allowfullscreen="allowfullscreen"></iframe>-->
<!--            <iframe class="flex-auto w-100 h-56 m-1"-->
<!--                    src="https://tube.rebellion.global/videos/embed/54a0784e-db76-47f6-9ff5-be9d5fe9b848"-->
<!--                    sandbox="allow-same-origin allow-scripts" allowfullscreen="allowfullscreen"></iframe>-->
<!--            <iframe class="flex-auto w-100 h-56 m-1"-->
<!--                    loading="lazy"-->
<!--                    src="https://tube.rebellion.global/videos/embed/417cde0e-8df6-489f-97a1-2eab5ea92d9e"-->
<!--                    sandbox="allow-same-origin allow-scripts" allowfullscreen="allowfullscreen"></iframe>-->
<!--            <iframe class="flex-auto w-100 h-56 m-1"-->
<!--                    loading="lazy"-->
<!--                    src="https://tube.rebellion.global/videos/embed/64be2043-0ca7-493a-a940-dee6e2422158"-->
<!--                    sandbox="allow-same-origin allow-scripts" allowfullscreen="allowfullscreen"></iframe>-->
<!--        </div>-->
    </div>
</template>

<script>
export default {
    computed: {
        groupsCount() {
            return Object.keys(this.$site.groups).length
        },
        groupCountriesMap() {
            const groupCountriesMap = {}
            for (const groupKey in this.$site.groups) {
                const group = this.$site.groups[groupKey]
                if (!groupCountriesMap[group.country]) {
                    groupCountriesMap[group.country] = []
                }
                groupCountriesMap[group.country].push(group)
            }
            return groupCountriesMap
        },
        countriesCount() {
            return Object.keys(this.groupCountriesMap).length
        },
        eventsCount() {
            return this.$site.branch_events_array.length
        },
    },
    created() {
        this.$ssrContext.title = `${this.$t('seo_title_training')} | ${this.$t('extinction rebellion')}`
        this.$ssrContext.seoDescription = this.$t('seo_description_training')
        this.$ssrContext.seoImage = '/assets/img/social/home.jpg'
    }
}
</script>