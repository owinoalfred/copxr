<template>
    <div
        v-if="!group"
        class="bg-blue-300 m-2 p-16 font-header text-4xl text-center"
    >
        Could not find group <b>{{ $route.params.group }}</b>
    </div>
    <div v-else>
        <div class="lg:relative lg:flex">
            <div class="hidden lg:block lg:w-1/3">
                <div
                    class="bg-pink-500 m-2 p-8 flex items-center justify-center max-h-1/3vh"
                >
                    <img
                        src="/assets/img/wood-blocks/Eyes_01.svg"
                        class="w-64 h-48 object-contain"
                        alt="drawing of two open eyes"
                        loading="lazy"
                    />
                </div>
                <div
                    v-if="group.iscountry || group.isCommunity"
                    class="bg-blue-300 m-2 p-8 flex items-center justify-center max-h-1/3vh"
                >
                    <img
                        src="/assets/img/wood-blocks/french-superbird_final.svg"
                        class="w-48 h-48 object-contain"
                        alt="singing bird on a extinction rebellion logo"
                        loading="lazy"
                    />
                </div>
                <GroupCard
                    v-else-if="relatedCountryGroup"
                    class="m-2"
                    :key="relatedCountryGroup.key"
                    :group="relatedCountryGroup"
                    color="light-blue"
                    :showWebsite="false"
                    :showEvents="false"
                />
            </div>

            <div class="bg-yellow-400 m-2 lg:ml-0 lg:w-2/3">
                <div
                    class="flex flex-col justify-around items-start h-full p-8 relative z-10 overflow-hidden"
                >
                    <img
                        class="block absolute right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-5 lg:opacity-10 max-w-600 max-h-100vw"
                        src="/assets/img/wood-blocks/tree.svg"
                        alt="drawing representing a tree"
                        loading="lazy"
                    />
                    <div>
                        <div
                            v-if="nativePlaceName"
                            class="font-header text-lg text-gray-900"
                        >
                            {{ group.name }}
                        </div>
                        <h1
                            class="text-5xl md:text-7xl text-white leading-none"
                        >
                            <span v-if="!group.isCommunity">XR </span>
                            {{ nativePlaceName || group.name }}
                        </h1>
                    </div>
                    <div v-if="group.links">
                        <div v-if="group.links.website" class="font-header">
                            Visit website
                        </div>
                        <a
                            v-if="group.links.website"
                            :href="group.links.website"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            class="bg-black shadow-md text-white font-header px-4 py-3 opacity-90 hover:opacity-100 inline-block leading-none"
                        >
                            <span class="text-2xl">{{
                                group.links.website | toDomain
                            }}</span>
                        </a>
                        <div class="mt-4 flex max-w-lg items-center">
                            <GroupSocialLinks
                                v-if="group.links"
                                :group="group"
                                class="flex text-white text-lg leading-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="group.iscountry" class="bg-black m-2 mt-0">
            <div class="h-600px max-h-3/4vh">
                <MapSSR :groupKey="groupKey" />
            </div>
        </div>

        <div
            v-if="showToggle"
            class="w-full leading-none font-header text-3xl bg-green-500 text-black"
        >
            <div
                class="flex flex-col sm:flex-row max-w-screen-xl mx-auto relative flex flex-row py-4"
            >
                <button
                    v-if="groups.length > 0"
                    data-active-class="bg-green-600 text-white shadow-sm border-green-600"
                    data-inactive-class="text-black border-black opacity-25"
                    class="toggle-btn groups-toggle-btn px-4 py-1 mx-4 my-1 border-solid border-4 hover:opacity-100"
                >
                    {{ $tc("LOCAL_GROUPS_X", groups.length, [groups.length]) }}
                </button>
                <button
                    v-if="events.length > 0"
                    data-active-class="bg-green-600 text-white shadow-sm border-green-600"
                    data-inactive-class="text-black border-black opacity-25"
                    class="toggle-btn events-toggle-btn px-4 py-1 mx-4 my-1 border-solid border-4 hover:opacity-100"
                >
                    {{
                        $tc("EVENTS_UPCOMING_X", events.length, [events.length])
                    }}
                </button>
                <link-to
                    v-if="groups.length > 0"
                    href="/submit-group/">
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

        <div
            v-if="group.iscountry"
            class="toggle-section groups-section flex flex-wrap items-stretch my-1 mx-1"
        >
            <GroupCard
                v-for="(group, i) of groups"
                class="p-1 w-full md:w-1/2 xl:w-1/3"
                :key="group.key"
                :group="group"
                :color="cityColors[i]"
            />
        </div>

        <div
            class="toggle-section events-section flex flex-wrap items-stretch my-1 mx-1"
        >
            <EventCard
                v-for="(event, i) in events"
                class="p-1 w-full md:w-1/3 xl:w-1/4"
                :key="i"
                :event="event"
                :color="eventColors[i]"
            />
        </div>
    </div>
</template>

<script>
import toDomain from "@/modules/groups/util/toDomain";
import toNativePlaceName from "@/modules/groups/util/toNativePlaceName";
import GroupSocialLinks from "@/modules/groups/components/GroupSocialLinks.vue";
import GroupCard from "@/modules/groups/components/GroupCard.vue";
import EventCard from "@/modules/groups/components/EventCard.vue";
import makeColors from "@/modules/groups/util/makeColors";
import MapSSR from "@/modules/map/MapSSR.vue";

export default {
    name: "GroupPage",
    components: {
        GroupSocialLinks,
        GroupCard,
        EventCard,
        MapSSR,
    },
    computed: {
        showToggle() {
            return this.groups.length > 0 || this.events.length > 0;
        },
        group() {
            const key = decodeURIComponent(this.$route.params.group);
            return this.$site.groups[key];
        },
        groupKey() {
            return this.$route.params.group;
        },
        nativePlaceName() {
            return toNativePlaceName(this.group.name);
        },
        groups() {
            return Object.values(this.$site.groups)
                .filter(
                    (group) =>
                        !group.iscountry && group.country === this.group.name
                )
                .sort((a, b) => (a.name < b.name ? -1 : 1));
        },
        cityColors() {
            return makeColors(this.groups.length);
        },
        events() {
            return this.$site.branch_events[this.group.key] || [];
        },
        eventColors() {
            return makeColors(this.events.length);
        },
        relatedCountryGroup() {
            if (this.group.iscountry) {
                return null;
            }
            for (const groupKey in this.$site.groups) {
                const group = this.$site.groups[groupKey];
                if (!group.iscountry) {
                    continue;
                }
                if (group.name !== this.group.country) {
                    continue;
                }
                return group;
            }
            return null;
        },
    },
    filters: {
        toDomain,
    },
    created() {
        if (!this.group) {
            return;
        }
        if (this.group.iscountry || !this.group.country) {
            this.$ssrContext.title = `XR ${this.group.name} | ${this.$t(
                "extinction rebellion"
            )}`;
        } else if (this.group.country) {
            this.$ssrContext.title = `XR ${this.group.name} - ${
                this.group.country
            } | ${this.$t("extinction rebellion")}`;
        }

        this.$ssrContext.seoDescription = this.$t("seo_description_group", {
            group: this.group.name,
        });

        if (this.showToggle) {
            this.$ssrContext.pageScripts.push("toggle-content.js");
        }
    },
};
</script>