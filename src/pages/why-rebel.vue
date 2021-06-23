<template>
    <div class="page">
        <div class="bg-pink-600 m-2 lg:relative lg:flex items-end justify-end">
            <div class="lg:w-1/2 p-6 lg:px-10 lg:py-14 relative z-10">
                <svg
                    class="hidden lg:block absolute right-100 inset-y-0 h-full w-24 -mr-1"
                    viewBox="0 0 50 100"
                    preserveAspectRatio="none"
                >
                    <polygon class="text-pink-600" fill="currentColor" points="0,0 50,0 50,100" />
                    <polygon
                        class="text-gray-100"
                        fill="currentColor"
                        points="0,0 5,0 50,100 45,100"
                    />
                </svg>
                <div class="font-header text-lg text-gray-900 mb-1">{{ $t('extinction rebellion') }}</div>
                <h1 class="font-header text-5xl md:text-7xl text-white leading-none">{{ $t('Why rebel') }}</h1>
                <p class="font-semibold text-xl mt-2 mb-8">{{ $t('rebel_description_1') }}</p>
                <p class="font-semibold text-xl mt-2">{{ $t('rebel_description_2') }}</p>
                <p class="font-semibold text-xl mt-2">{{ $t('rebel_description_3') }}</p>
            </div>

            <div class="lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 bg-black">
                <video
                    poster="/assets/videos/bridge.jpeg"
                    class="slow-motion h-56 w-full bg-black object-cover object-center sm:h-72 md:h-96 lg:w-full lg:h-full"
                    preload="none"
                    playsinline
                    loop
                    autoplay
                    muted
                >
                    <source src="/assets/videos/bridge.mp4" type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                </video>
            </div>
        </div>
        <main role="main" class="flex-1 bg-red-100 xl:relative">
            <div class="hidden xl:flex sticky flex-row-reverse top-0">
                <div class="absolute top-14 right-2 bg-pink-600 font-header p-4">
                    <p class="font-header text-white">{{ $t('ready_to_join_xr') }}</p>
                    <link-to
                        href="/get-involved/"
                        class="bg-black shadow-md text-white font-header text-xl px-3 py-2 inline-block"
                    >{{ $t('Get involved') }}</link-to>
                </div>
            </div>
            <article
                class="article-content max-w-3xl w-full mx-auto flex flex-wrap px-4 lg:px-16 pb-12"
            >
                <section class="text-center">
                    <input type="checkbox" class="read-more-state" :id="`post-1`" />
                    <h2
                        class="text-left font-header text-3xl text-pink-600 leading-none mt-14 mb-3"
                    >{{ $t(`rebel_body_title_1`) }}</h2>
                    <p class="prose prose-xl max-w-none text-black text-left read-more-wrap">{{ $t(`rebel_body_description_1`) }}</p>
                    <div class="read-more-target">
                        <h6 class="text-left text-xl mt-6">{{ $t(`rebel_body_subheader_1`) }}</h6>
                        <i18n
                            path="rebel_body_description_1_overflow_1"
                            tag="p"
                            class="prose prose-xl max-w-none text-black text-left whitespace-pre-wrap"
                        >
                            <template v-slot:link>
                                <a
                                    href="https://ipbes.net/global-assessment"
                                >{{ $t('over 1 million species') }}</a>
                            </template>
                            <template v-slot:break>
                                <br />
                            </template>
                        </i18n>
                        <blockquote class="prose prose-xl max-w-none text-black text-left">
                            {{ $t(`rebel_body_description_1_overflow_1_quote`) }}
                            <br />-
                            <a
                                href="https://www.theguardian.com/world/2020/apr/27/halt-destruction-nature-worse-pandemics-top-scientists"
                                class="underline"
                            >The Guardian</a>
                        </blockquote>
                        <i18n
                            path="rebel_body_description_1_overflow_2"
                            tag="p"
                            class="prose prose-xl max-w-none text-black text-left whitespace-pre-wrap mt-6"
                        >
                            <template v-slot:link>
                                <a
                                    href="https://www.scientificamerican.com/article/mother-natures-medicine-c/"
                                >{{ $t('come from irreplaceable natural sources') }}</a>
                            </template>
                            <template v-slot:break>
                                <br />
                            </template>
                        </i18n>
                        <h6 class="text-left text-xl mt-6">{{ $t(`rebel_body_subheader_2`) }}</h6>
                        <i18n
                            path="rebel_body_description_1_overflow_3"
                            tag="p"
                            class="prose prose-xl max-w-none text-black text-left whitespace-pre-wrap"
                        >
                            <template v-slot:link>
                                <a href="https://www.ipcc.ch/sr15/">{{ $t('special report') }}</a>
                            </template>
                            <template v-slot:break>
                                <br />
                            </template>
                        </i18n>
                    </div>
                    <label
                        :for="`post-1`"
                        class="read-more-trigger inline-block relative z-10 cursor-pointer bg-red-100 text-gray-500 font-header px-4 mt-4 text-lg"
                    ></label>
                    <hr class="read-more-ruler" />
                </section>
                <section class="text-center">
                    <input type="checkbox" class="read-more-state" :id="`post-2`" />
                    <h2
                        class="text-left font-header text-3xl text-pink-600 leading-none mt-14 mb-3"
                    >{{ $t(`rebel_body_title_2`) }}</h2>
                    <p class="prose prose-xl max-w-none text-black text-left read-more-wrap">{{ $t(`rebel_body_description_2`) }}</p>
                    <i18n
                        path="rebel_body_description_2_overflow"
                        tag="p"
                        class="prose prose-xl max-w-none text-black text-left read-more-target whitespace-pre-wrap mt-6"
                    >
                        <template v-slot:break>
                            <br />
                        </template>
                    </i18n>
                    <label
                        :for="`post-2`"
                        class="read-more-trigger inline-block relative z-10 cursor-pointer bg-red-100 text-gray-500 font-header px-4 mt-4 text-lg"
                    ></label>
                    <hr class="read-more-ruler" />
                </section>
                <section class="text-center">
                    <input type="checkbox" class="read-more-state" :id="`post-3`" />
                    <h2
                        class="text-left font-header text-3xl text-pink-600 leading-none mt-14 mb-3"
                    >{{ $t(`rebel_body_title_3`) }}</h2>
                    <p class="prose prose-xl max-w-none text-black text-left read-more-wrap">{{ $t(`rebel_body_description_3`) }}</p>
                    <i18n
                        path="rebel_body_description_3_overflow"
                        tag="p"
                        class="prose prose-xl max-w-none text-black text-left read-more-target whitespace-pre-wrap mt-6"
                    >
                        <template v-slot:break>
                            <br />
                        </template>
                    </i18n>
                    <label
                        :for="`post-3`"
                        class="read-more-trigger inline-block relative z-10 cursor-pointer bg-red-100 text-gray-500 font-header px-4 mt-4 text-lg"
                    ></label>
                    <hr class="read-more-ruler" />
                </section>
                <section class="text-center">
                    <input type="checkbox" class="read-more-state" :id="`post-4`" />
                    <h2
                        class="text-left font-header text-3xl text-pink-600 leading-none mt-14 mb-3"
                    >{{ $t(`rebel_body_title_4`) }}</h2>
                    <p class="prose prose-xl max-w-none text-black text-left read-more-wrap">{{ $t(`rebel_body_description_4`) }}</p>
                    <i18n
                        path="rebel_body_description_4_overflow_1"
                        tag="p"
                        class="prose prose-xl max-w-none text-black text-left read-more-target whitespace-pre-wrap mt-6"
                    >
                        <template v-slot:link>
                            <a
                                href="https://www.kateraworth.com/wp/wp-content/uploads/2020/04/20200406-AMS-portrait-EN-Single-page-web-420x210mm.pdf"
                            >{{ $t('economies overhauled') }}</a>
                        </template>
                        <template v-slot:break>
                            <br />
                        </template>
                    </i18n>
                    <label
                        :for="`post-4`"
                        class="read-more-trigger inline-block relative z-10 cursor-pointer bg-red-100 text-gray-500 font-header px-4 mt-4 text-lg"
                    ></label>
                    <hr class="read-more-ruler" />
                </section>
                <section class="text-center">
                    <h2
                        class="text-left font-header text-3xl text-pink-600 leading-none mt-14 mb-3"
                    >{{ $t(`rebel_body_title_5`) }}</h2>
                    <p
                        class="prose prose-xl max-w-none text-black text-left read-more-wrap"
                    >{{ $t(`rebel_body_description_5`, {groupsCount, countriesCount}) }}</p>
                </section>
                <section class="text-center">
                    <h2
                        class="text-left font-header text-3xl text-pink-600 leading-none mt-14 mb-3"
                    >{{ $t(`rebel_body_title_6`) }}</h2>
                    <p class="prose prose-xl max-w-none text-black text-left read-more-wrap">{{ $t(`rebel_body_description_6`) }}</p>
                    <blockquote class="prose prose-xl max-w-none text-black text-left">
                        {{ $t(`rebel_body_description_6_quote`) }}
                        <br />- Nelson Mandela
                    </blockquote>
                </section>
            </article>
            <div class="text-center pb-12 pt-4">
                <link-to
                    href="/get-involved/"
                    class="bg-black shadow-md text-white font-header text-2xl px-3 py-2 inline-block"
                >{{ $t(`Get involved`) }}</link-to>
                <a
                    href="https://www.scientistsforxr.earth/faq"
                    class="underline font-header text-lg px-3 py-2 inline-block"
                >{{ $t(`or take a deeper dive`) }}</a>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data: () => ({
        sections: 2,
    }),
    created() {
        this.$ssrContext.title = `${this.$t(
            "seo_title_why_rebel"
        )} | ${this.$t("extinction rebellion")}`;
        this.$ssrContext.seoDescription = this.$t("seo_description_why_rebel");
        this.$ssrContext.seoImage = "/assets/img/social/home.jpg";

        this.$ssrContext.pageScripts.push("video-controls.js");
    },
    computed: {
        groupsCount() {
            return Object.keys(this.$site.groups).length - this.countriesCount;
        },
        countriesCount() {
            return Object.values(this.$site.groups).filter(
                (group) => group.iscountry
            ).length;
        },
    },
};
</script>