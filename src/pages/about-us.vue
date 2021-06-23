<template>
    <div>
        <div class="bg-blue-300 m-2 lg:relative">
            <div class="lg:w-1/2 p-4 md:p-6 lg:px-16 lg:py-24 relative z-10">
                <div class="font-header text-lg text-gray-900 mb-1">
                    {{ $t("extinction rebellion") }}
                </div>
                <h1 class="text-5xl md:text-7xl text-white leading-none">
                    {{ $t("About us") }}
                </h1>
                <p class="font-semibold text-xl mt-2">
                    {{ $t("about_us_description") }}
                </p>

                <svg
                    class="hidden lg:block absolute left-100 inset-y-0 h-full w-24"
                    viewBox="0 0 50 100"
                    preserveAspectRatio="none"
                >
                    <polygon
                        class="text-blue-300"
                        fill="currentColor"
                        points="0,0 50,0 0,100"
                    />
                    <polygon
                        class="text-gray-100"
                        fill="currentColor"
                        points="45,0 50,0 5,100 0,100"
                    />
                </svg>
            </div>

            <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-black">
                <video
                    poster="/assets/videos/flags.jpeg"
                    class="slow-motion h-56 w-full bg-black object-cover object-center sm:h-72 md:h-96 lg:w-full lg:h-full"
                    preload="none"
                    playsinline
                    loop
                    autoplay
                    muted
                >
                    <source src="/assets/videos/flags.mp4" type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                </video>
            </div>
        </div>

        <div class="bg-yellow-500 m-2 relative overflow-hidden">
            <img
                class="block absolute right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-5 lg:opacity-10 max-w-600 max-h-100vw"
                src="/assets/img/logos/xr.svg"
                loading="lazy"
                alt="extinction rebellion logo"
            />
            <div class="mx-auto p-4 md:p-6 lg:px-16 lg:py-24">
                <h1 class="text-5xl md:text-7xl text-white leading-none">
                    {{ $t("Our demands") }}
                </h1>

                <div class="mt-6 md:flex">
                    <div class="pb-6 md:pb-0 md:pr-12 lg:pr-24">
                        <h2 class="text-xl text-white">
                            1. {{ $t("Tell the truth") }}
                        </h2>
                        <p class="font-semibold text-lg">
                            {{ $t("tell_the_truth_explanation") }}
                        </p>
                        <link-to
                            href="/blog/2020/12/11/tell-the-truth/"
                            class="font-semibold text-lg underline text-green-600"
                            >>>> {{ $t("learn more") }}</link-to
                        >
                    </div>
                    <div class="pb-6 md:pb-0 md:pr-12 lg:pr-24">
                        <h2 class="text-xl text-white">
                            2. {{ $t("Act now") }}
                        </h2>
                        <p class="font-semibold text-lg">
                            {{ $t("act_now_explanation") }}
                        </p>
                        <link-to
                            href="/blog/2020/08/31/act-now-extinction-rebellion-demands/"
                            class="font-semibold text-lg underline text-green-600"
                            >>>> {{ $t("learn more") }}</link-to
                        >
                    </div>
                    <div class="md:pr-12 lg:pr-24">
                        <h2 class="text-xl text-white">3. {{ $t('Beyond politics') }}</h2>
                        <p class="font-semibold text-lg">{{ $t('beyond_politics_explanation') }}</p>
                        <link-to
                            href="/blog/2021/01/05/citizens-assembly-climate-change/"
                            class="font-semibold text-lg underline text-green-600"
                        >>>> {{ $t('learn more') }}</link-to>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-green-500 m-2 relative overflow-hidden">
            <img
                class="block absolute right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-5 lg:opacity-10 max-w-600 max-h-100vw"
                src="/assets/img/wood-blocks/bee2.svg"
                loading="lazy"
                alt="black and white drawing of a bee"
            />
            <div class="max-w-screen-xl p-4 md:p-6 lg:px-16 lg:py-24">
                <h1 class="text-5xl md:text-7xl text-white leading-none">
                    {{ $t("Our values") }}
                </h1>
                <p class="font-semibold text-xl mt-2 mb-8">
                    {{ $t("our_values_description") }}
                </p>
                <PrincipleCard
                    v-for="count in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                    :count="count"
                    :title="$t(`our_values_${count}`)"
                    :desciption="$t(`our_values_${count}_explanation`)"
                    :expansion="$t(`our_values_${count}_expansion`)"
                    :key="count"
                ></PrincipleCard>
            </div>
        </div>

        <div class="bg-pink-400 m-2 relative overflow-hidden">
            <img
                class="block absolute right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-5 lg:opacity-10 max-w-600 max-h-100vw"
                src="/assets/img/wood-blocks/hourglass.svg"
                loading="lazy"
                alt="black and white drawing of an hourglass"
            />
            <div class="max-w-screen-lg p-4 md:p-6 lg:px-16 lg:py-24">
                <h1 class="text-5xl md:text-7xl text-white leading-none">
                    {{ $t("Our story") }}
                </h1>
                <p class="font-semibold text-xl mt-2 mb-8 whitespace-pre-line">
                    {{ $t("our_story_description") }}
                </p>
                <link-to
                    href="/why-rebel/"
                    class="bg-black shadow-md text-white font-header text-3xl px-4 py-2 mt-2 inline-block"
                    >{{ $t("Why rebel") }}</link-to
                >
            </div>
        </div>

        <div class="bg-blue-300 m-2 relative overflow-hidden">
            <img
                class="block absolute right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-5 lg:opacity-10 max-w-600 max-h-100vw"
                src="/assets/img/wood-blocks/orchid.svg"
                loading="lazy"
                alt="black and white drawing of an orchid"
            />
            <div class="max-w-screen-lg p-4 md:p-6 lg:px-16 lg:py-24">
                <div class="font-header text-lg text-gray-900 mb-1">
                    {{ $t("What you can do") }}
                </div>
                <h1 class="text-5xl md:text-7xl text-white leading-none">
                    {{ $t("intro_act_now_title") }}
                </h1>
                <p
                    class="max-w-3xl font-semibold text-xl mt-2 whitespace-pre-line"
                >
                    {{ $t("intro_description_act_now") }}
                </p>
            </div>
            <div class="bg-blue-800 font-header text-2xl">
                <div
                    class="px-4 lg:px-16 py-12 md:flex items-center justify-between"
                >
                    <h1 class="text-white">{{ $t("Join us and act now") }}</h1>
                    <div class="md:flex md:-mx-4 relative z-1">
                        <link-to class="block text-blue-300 md:text-black md:bg-blue-300 md:border-4 border-blue-200 hover:bg-blue-200 hover:border-blue-300 md:px-4 md:py-2 md:mx-4" href="/get-involved/">1. {{ $t('Join the rebellion') }}</link-to>
                        <link-to class="block text-blue-300 md:text-black md:bg-blue-300 md:border-4 border-blue-200 hover:bg-blue-200 hover:border-blue-300 md:px-4 md:py-2 md:mx-4" href="/groups/">2. {{ $t('Find your group') }}</link-to>
                        <link-to class="block text-blue-300 md:text-black md:bg-blue-300 md:border-4 border-blue-200 hover:bg-blue-200 hover:border-blue-300 md:px-4 md:py-2 md:mx-4" href="/training/">3. {{ $t('Get trained up') }}</link-to>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PrincipleCard from "../modules/common/PrincipleCard.vue";

export default {
    components: {
        PrincipleCard,
    },
    created() {
        this.$ssrContext.title = `${this.$t("seo_title_about_us")} | ${this.$t(
            "extinction rebellion"
        )}`;
        this.$ssrContext.seoDescription = this.$t("seo_description_about_us");
        this.$ssrContext.seoImage = "/assets/img/social/about.jpg";

        this.$ssrContext.pageScripts.push("video-controls.js");
    },
};
</script>