<template>
    <div>
         <div class="bg-minsk-500 m-2 relative overflow-hidden">
            <img
                class="block absolute object-cover right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-10 lg:opacity-8 max-w-850 max-h-100vw"
                src="/assets/img/imgs/vector_assets/camille_chameleon_white_eye.svg"
                loading="lazy"
                alt="black and white drawing of a chameleon"
            />
            <div class="max-w-screen-xl mx-auto p-6 lg:px-16 lg:py-24">
                <div class="max-w-2xl">
                    <h1 class="text-5xl md:text-7xl text-white leading-none">
                        {{ $t("SUPPORT OUR ACTIVISM") }}
                    </h1>
                    <p class="font-semibold text-white text-xl mt-2 mb-8">
                        {{ $t("surpport_our_activism1") }}
                    </p>
                    <p class="font-semibold text-white text-xl mt-2 mb-8">
                        {{ $t("surpport_our_activism2") }}
                    </p>

                 <p class="font-semibold text-white text-xl mt-2 mb-8">
                        {{ $t("surpport_our_activism3") }}
                    </p>
                    <h3 class="font-semibold text-white text-xl mt-2 mb-8">
                        {{ $t("donate_today") }}
                    </h3>
                     <img
                class="block absolute object-cover right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-10 lg:opacity-8 max-w-850 max-h-100vw"
                src="/assets/img/imgs/vector_assets/cop_shock.svg"
                loading="lazy"
                alt="COP SHOCK"
            />
                  <a
                    href="https://opencollective.com/extinction-rebellion-cop/contribute"
                    class="bg-black shadow-md text-white font-header text-2xl px-3 py-2 inline-block"
                >{{ $t('VISIT OUR CROWDFUNDING PAGE') }}</a>
                </div>
            </div>
        </div>

        <div class="bg-pastel_green-500 m-2 relative overflow-hidden">
            <img
                class="block absolute object-cover right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-10 lg:opacity-8 max-w-850 max-h-100vw"
                src="/assets/img/imgs/vector_assets/cop_border_landscape.svg"
                alt="drawing showing praying hands"
                loading="lazy"
            />
            <div class="max-w-screen-lg p-6 lg:px-16 lg:py-24">
                <h1
                    class="text-5xl md:text-7xl text-white leading-none"
                >{{ $t('our_latest_fundrising_campaign') }}</h1>
                <p
                    class="font-semibold text-xl mt-2 mb-8 whitespace-pre-line"
                >{{ $t('our_latest_fundrising_campaign_DESC1') }}</p>
                 <p
                    class="font-semibold text-xl mt-2 mb-8 whitespace-pre-line"
                >{{ $t('our_latest_fundrising_campaign_DESC2') }}</p>
                 <p
                    class="font-semibold text-xl mt-2 mb-8 whitespace-pre-line"
                >{{ $t('our_latest_fundrising_campaign_DESC3') }}</p>
                <div class="btn flex-box">
                <a
                    href="https://opencollective.com/extinction-rebellion-cop/events/g7-crowdfunding-event-5d21248e"
                    class="bg-black shadow-md text-white font-header text-2xl px-3 py-2 inline-block"
                >{{ $t('DONATE') }}</a>
                <a
                    href="https://opencollective.com/extinction-rebellion-cop/contribute"
                    class="bg-black shadow-md text-white font-header text-2xl px-3 py-2 inline-block"
                >{{ $t('fundrasing_groups') }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        groupsCount() {
            return Object.keys(this.$site.groups).length;
        },
        groupCountriesMap() {
            const groupCountriesMap = {};
            for (const groupKey in this.$site.groups) {
                const group = this.$site.groups[groupKey];
                if (!groupCountriesMap[group.country]) {
                    groupCountriesMap[group.country] = [];
                }
                groupCountriesMap[group.country].push(group);
            }
            return groupCountriesMap;
        },
        countriesCount() {
            return Object.keys(this.groupCountriesMap).length;
        },
        eventsCount() {
            return this.$site.branch_events_array.length;
        },
    },
    created() {
        this.$ssrContext.title = `${this.$t("seo_title_donate")} | ${this.$t(
            "extinction rebellion"
        )}`;
        this.$ssrContext.seoDescription = this.$t("seo_description_donate");
        this.$ssrContext.seoImage = "/assets/img/social/donate.jpg";

        this.$ssrContext.pageScripts.push("video-controls.js");
    },
};
</script>