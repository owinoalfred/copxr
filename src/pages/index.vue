<template>
    <div class="text-white">
        <div class="bg-moody_blue-500 m-2 relative overflow-hidden">
            <img
                class="block absolute object-cover right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-10 lg:opacity-8 max-w-850 max-h-100vw"
                src="/assets/img/imgs/vector_assets/camille_chameleon_white_eye.svg"
                loading="lazy"
                alt="black and white drawing of a chameleon"
            />
            <div class="max-w-screen-xl mx-auto p-6 lg:px-16 lg:py-24">
                <div class="max-w-2xl">
                    <h1 class="text-5xl md:text-7xl text-white leading-none">
                        {{ $t("intro_climate_title") }}
                    </h1>
                    <p class="font-semibold text-white text-xl mt-2 mb-8">
                        {{ $t("intro_description_climate_emergency") }}
                    </p>

                    <p class="font-header text-2xl text-white">
                        {{ $t("intro_climate_emergency_moral_duty") }}
                    </p>


                </div>
            </div>
        </div>
        <div class="bg-pastel_green-500 m-2 relative overflow-hidden">
            <img
                class="block absolute right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-5 lg:opacity-5 max-w-1000 max-h-100vw"
                src="/assets/img/imgs/vector_assets/cop26_symbol.svg"
                loading="lazy"
                alt="extinction rebellion logo"
            />
            <div class="max-w-screen-xl mx-auto p-6 lg:px-16 lg:py-24">

                <h1 class="text-5xl md:text-7xl text-white leading-none">
                    {{ $t("Our demands") }}
                </h1>
                <div class="mt-6 mb-8 md:flex">
                   <p class="font-semibold text-xl mt-2 mb-8">
                        {{ $t("We_rebel_against_injustice") }}
                    </p>
                </div>
                <link-to
                    href="/about-us/"
                    class="bg-black shadow-md text-white font-header text-2xl px-4 py-2 mt-2 inline-block"
                    >{{ $t("Get involved") }}</link-to
                >
                <p class="font-header text-2xl text-white py-10">
                        {{ $t("if_not_us") }}
                    </p>
            </div>

        </div>
        <div class="bg-spray-500 m-2 relative overflow-hidden">
            <img
                class="block absolute object-cover right-0 bottom-0 top-1/2 transform ssm:h-scre -translate-y-1/2 h-full pointer-events-none opacity-5 lg:opacity-8 w-screen h-screen"
                src="/assets/img/imgs/vector_assets/cop_background_landscape.svg"
                loading="lazy"
                alt="black and white drawing of an hourglass"
            />
            <div class="max-w-screen-xl mx-auto p-6 lg:px-16 lg:py-24">
                <div class="max-w-3xl">

                    <h1 class="text-5xl md:text-7xl text-white leading-none">
                        {{ $t("intro_science_title") }}
                    </h1>

                    <p class="font-semibold text-xl mt-2 mb-8">
                        {{ $t("intro_description_science") }}
                    </p>
                    <link-to
                        href="/why-rebel/"
                        class="bg-black shadow-md text-white font-header text-2xl px-4 py-2 mt-2 inline-block"
                        >{{ $t("Join the Rebellion") }}</link-to
                    >
                    <link-to href ="/twitter">
                     <p class="font-semibold text-xl mt-2 mb-8 text-blue-800 py-10">
                        {{ $t("make it possible") }}
                    </p></link-to>
                </div>
            </div>
        </div>
        <div class="bg-pastel_green-500 m-2 relative overflow-hidden">
            <img
                class="block absolute rotate-90 right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-5 lg:opacity-8 max-w-1000 max-h-100vw"
                src="/assets/img/imgs/vector_assets/camille_chameleon_2.svg"
                loading="lazy"
                alt="black and white drawing of a singing bird on extinction rebellion logo"
            />
            <div class="max-w-screen-xl mx-auto p-6 lg:px-16 lg:py-24">

                <div class="max-w-3xl">
                    <h1 class="text-5xl md:text-7xl text-white leading-none">
                        {{ $t("A global movement") }}
                    </h1>
                    <p class="font-semibold text-xl mt-2 mb-8">
                        {{ $t("intro_description_global") }}
                    </p>
                    <link-to
                        href="/get-involved/"
                        class="bg-black shadow-md text-white font-header text-2xl px-4 py-2 mt-2 inline-block"
                        >{{ $t("Learn more About Xr COP") }}</link-to
                    >
                </div>
            </div>
        </div>
        <div class="bg-moody_blue-500 m-2 relative overflow-hidden">
            <img
                class="block absolute object-cover right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-5 lg:opacity-10 w-screen h-screen"
                src="/assets/img/imgs/vector_assets/cop_background_landscape.svg"
                loading="lazy"
                alt="black and white drawing of an orchid"
            />
            <div class="max-w-screen-xl mx-auto p-6 lg:px-16 lg:py-24">
                <div class="md:flex">



                     <div class="max-w-3xl">
                     <p
                         class="font-semibold text-xl mt-2 mb-8 whitespace-pre-line"
                      >
                        {{ $t("intro_description_act_now1") }}
                           {{ $t("intro_description_act_now2")}}
                    </p>
                      </div>
                     <div>
                    <h1 class="text-5xl md:text-7xl text-white leading-none">
                    {{ $t("intro_act_now_title") }}
                  </h1>
                   </div>
                  </div>
                   <div>
                          <link-to
                            href="/get-involved/"
                          class="bg-black shadow-md text-white font-header text-2xl px-4 py-2 mt-2 inline-block"
                              >{{ $t("Volunteer with XR COP") }}</link-to
                          >
                              <link-to
                                href="/get-involved/"
                                    class="bg-black shadow-md text-white font-header text-2xl px-4 py-2 mt-2 inline-block"
                                  >{{ $t("Donate money") }}</link-to
                                 >
                                 <link-to
                               href="/get-involved/"
                                 class="bg-black shadow-md text-white font-header text-2xl px-4 py-2 mt-2 inline-block"
                             >{{ $t("Find your local XR group") }}</link-to
                                     >
                                     <link-to
                        href="/get-involved/"
                        class="bg-black shadow-md text-white font-header text-2xl px-4 py-2 mt-2 inline-block"
                        >{{ $t("Findout more") }}</link-to
                    >
                  </div>
            </div>
        </div>


    </div>
</template>

<script>


export default {
    components: {

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
        eventsCount() {
            return this.$site.branch_events_array.length;
        },
    },
    created() {
        this.$ssrContext.title = `${this.$t(
            "extinction rebellion"
        )} | ${this.$t("seo_title_home")}`;
        this.$ssrContext.seoDescription = this.$t("seo_description_home");
        this.$ssrContext.seoImage = "/assets/img/social/home.jpg";
    },
};
</script>