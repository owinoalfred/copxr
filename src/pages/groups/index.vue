<template>
    <div>
        <div class="md:relative md:flex">
            <div
                class="bg-green-500 m-2 md:w-2/3 relative z-50 flex items-center justify-center"
            >
                <div class="bg-green-500 absolute inset-0 overflow-hidden">
                    <img
                        class="block absolute right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-5 lg:opacity-10 max-w-600 max-h-100vw"
                        src="/assets/img/wood-blocks/tree.svg"
                        alt="drawing showing a tree"
                        loading="lazy"
                    />
                </div>
                <div class="p-6 lg:px-16 lg:py-24 relative z-10">
                    <div class="font-header text-lg text-gray-900">
                        {{ $t("Join your local extinction rebellion group") }}
                    </div>
                    <h1 class="text-5xl md:text-7xl text-white leading-none">
                        {{ $t("XR in your area") }}
                    </h1>
                    <p class="font-semibold text-xl mt-2">
                        {{ $t("groups_description") }}
                    </p>
                    <div class="mt-4">
                        <div class="group-selector z-10">
                            <!--
                                webpack generates this file separately and this contains live client-side code
                                this file itself does not really have access to the client-side code!
                            -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-pink-500 m-2 md:ml-0 md:w-1/3">
                <div class="px-8 lg:px-6 py-8 relative z-10">
                    <div class="p-4">
                        <h2 class="text-2xl text-white leading-tight">
                            {{ $t("Other options to join XR") }}
                        </h2>
                        <p class="font-semibold">
                            {{ $t("join_options_description") }}
                        </p>
                    </div>
                    <div class="p-4 bg-pink-300">
                        <h2 class="text-lg text-white leading-tight">
                            {{ $t("Join the global support team") }}
                        </h2>
                        <i18n
                            path="GS supports local and national groups"
                            tag="p"
                            class="font-semibold"
                        >
                            <template v-slot:link>
                                <a
                                    class="underline"
                                    href="https://forms.organise.earth/index.php?r=survey/index&sid=433164&lang=en"
                                    target="_blank"
                                    >{{ $t("Global Support Team") }}</a
                                >
                            </template>
                        </i18n>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-black mx-2 mt-0">
            <div class="h-600px max-h-3/4vh">
                <MapSSR :showEvents="false" class="z-0" />
            </div>
        </div>

        <div
            class="w-full leading-none font-header text-3xl bg-green-500 text-black"
        >
            <div
                class="max-w-screen-xl mx-auto relative flex flex-col md:flex-row py-4"
            >
                <button
                    data-active-class="bg-green-600 text-white shadow-sm"
                    data-inactive-class="text-black border-solid border-4 border-black opacity-25"
                    class="toggle-btn countries-toggle-btn px-4 py-1 m-4 my-1 hover:opacity-100"
                >
                    {{ $tc("COUNTRY_X", countries.length, [countries.length]) }}
                </button>
                <button
                    data-active-class="bg-green-600 text-white shadow-sm"
                    data-inactive-class="text-black border-solid border-4 border-black opacity-25"
                    class="toggle-btn communities-toggle-btn px-4 py-1 mx-4 my-1 hover:opacity-100"
                >
                    {{
                        $tc("COMMUNITY_X", communities.length, [
                            communities.length,
                        ])
                    }}
                </button>
                <link-to href="/submit-group/">
                    <button
                        data-active-class="bg-green-600 text-white shadow-sm"
                        data-inactive-class="text-black border-solid border-4 border-black opacity-25"
                        class="toggle-btn px-4 py-1 mx-4 my-1 hover:opacity-100"
                    >
                        {{ $t("add or update a group") }}
                    </button>
                </link-to>
            </div>
        </div>

        <div class="toggle-section countries-section flex flex-wrap my-1 mx-1">
            <GroupCard
                v-for="(group, i) of countries"
                class="p-1 w-full md:w-1/2 xl:w-1/3"
                :key="group.key"
                :group="group"
                :color="getColor(i)"
            />
        </div>
        <div
            class="toggle-section communities-section flex flex-wrap my-1 mx-1"
        >
            <GroupCard
                v-for="(group, i) of communities"
                class="p-1 w-full md:w-1/2 xl:w-1/3"
                :key="group.key"
                :group="group"
                :color="getColor(i)"
            />
        </div>
    </div>
</template>

<script>
import GroupCard from "@/modules/groups/components/GroupCard";
import MapSSR from "@/modules/map/MapSSR";

export default {
    components: {
        GroupCard,
        MapSSR,
    },
    methods: {
        getColor(index) {
            const options = [
                "light-blue",
                "warm-yellow",
                "khaki",
                "red",
                "dark-blue",
                "pink",
                "purple",
                "lemon",
                "green",
            ];
            return options[index % options.length];
        },
    },
    computed: {
        groups() {
            return this.$site.groups;
        },
        countries() {
            const blacklist = ["Wales", "Scotland", "Northern Ireland"];
            return Object.values(this.groups)
                .filter(
                    (group) =>
                        !!group.iscountry && !blacklist.includes(group.name)
                )
                .sort((a, b) => (a.name < b.name ? -1 : 1));
        },
        communities() {
            return Object.values(this.groups).filter(
                (group) => group.isCommunity
            );
        },
    },
    created() {
        this.$ssrContext.pageScripts.push("toggle-content.js");
        this.$ssrContext.pageScripts.push("group-selector-loader.js");
        this.$ssrContext.title = `${this.$t("seo_title_groups")} | ${this.$t(
            "extinction rebellion"
        )}`;
        this.$ssrContext.seoDescription = this.$t("seo_description_groups");
        this.$ssrContext.seoImage = "/assets/img/social/donate.jpg";
    },
};
</script>