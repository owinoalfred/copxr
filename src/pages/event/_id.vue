<template>
    <div
        v-if="!event"
        class="bg-blue-300 m-2 p-16 font-header text-4xl text-center"
    >
        Could not find event <b>{{ $route.params.id }}</b>
    </div>
    <div v-else>
        <div class="lg:relative lg:flex">
            <div class="lg:w-1/3 flex flex-col">
                <div
                    class="flex-1 bg-blue-300 m-2 mb-0 flex items-center justify-center"
                >
                    <img
                        v-if="image"
                        :src="`/assets/img/events/${image}`"
                        :alt="`image for event ${event.title}`"
                        class="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <img
                        v-else
                        src="/assets/img/wood-blocks/french-superbird_final.svg"
                        class="w-48 h-48 object-contain"
                        alt="singing bird on extinction rebellion logo"
                    />
                </div>
                <GroupCard
                    v-if="group"
                    class="hidden lg:block m-2 mb-0 lg:mb-2"
                    :key="group.key"
                    :group="group"
                    color="light-blue"
                    :showWebsite="false"
                    :showEvents="false"
                />
            </div>
            <div class="bg-yellow-400 m-2 lg:ml-0 lg:w-2/3">
                <div
                    class="h-full px-4 lg:px-16 py-12 relative z-10 overflow-hidden flex items-center"
                >
                    <img
                        class="block absolute right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-5 lg:opacity-10 max-w-600 max-h-100vw"
                        src="/assets/img/wood-blocks/french-superbird_final.svg"
                        alt="singing bird on extinction rebellion logo"
                        loading="lazy"
                    />
                    <div class="max-w-4xl">
                        <h1
                            class="text-4xl md:text-7xl text-white leading-none"
                        >
                            {{ event.title }}
                        </h1>

                        <div class="flex flex-col items-start -mx-2">
                            <div
                                class="border-4 border-yellow-700 px-4 py-2 m-1 font-header text-lg"
                            >
                                <DateRange
                                    class="font-header text-xl"
                                    :start="event.start_date"
                                    :end="event.end_date"
                                    type="long"
                                />
                            </div>
                            <div
                                v-if="location"
                                class="border-4 border-yellow-700 px-4 py-2 m-1 font-header text-lg"
                            >
                                {{ location }}
                            </div>
                            <a
                                :href="`https://www.facebook.com/events/${event.id}`"
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                class="inline-block h-12 lg:g-auto m-1 font-header text-lg inline-flex items-center justify-center leading-none"
                            >
                                <span
                                    class="w-12 h-full text-3xl inline-flex items-center justify-center text-white"
                                    :style="{ backgroundColor: '#385fa9' }"
                                >
                                    <IconFacebook />
                                </span>
                                <span class="inline-block px-4 underline">{{
                                    $t("Join event")
                                }}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <main
            role="main"
            class="flex-1 max-w-xl w-full mx-auto flex flex-wrap mt-8 mb-8 px-3 lg:px-0 pb-12"
        >
            <h3 class="text-lg md:text-xl leading-none">
                {{$t("details")}}:
            </h3>
            <article class="article-content">
                <p class="font-semibold text-xl whitespace-pre-line -mt-4">
                    {{ event.description }}
                </p>
            </article>
            <a
                :href="`https://www.facebook.com/events/${event.id}`"
                target="_blank"
                rel="noopener noreferrer nofollow"
                class="inline-block h-12 lg:g-auto m-1 font-header text-lg inline-flex items-center justify-center leading-none mt-4"
            >
                <span
                    class="w-12 h-full text-3xl inline-flex items-center justify-center text-white"
                    :style="{ backgroundColor: '#385fa9' }"
                >
                    <IconFacebook />
                </span>
                <span class="inline-block px-4 underline">{{
                    $t("Join event")
                }}</span>
            </a>
        </main>
    </div>
</template>
<script>
import DateRange from "@/components/elements/DateRange";
import GroupCard from "@/modules/groups/components/GroupCard";
import truncateWords from "@/modules/groups/util/truncateWords";

export default {
    components: {
        DateRange,
        GroupCard,
    },
    computed: {
        event() {
            for (const ev of this.$site.branch_events_array) {
                if (ev.id == this.$route.params.id) {
                    return ev;
                }
            }
            return null;
        },
        image() {
            for (const file of this.event.files) {
                return file.path;
            }
            return "";
        },
        location() {
            return this.event.location.name || this.event.where;
        },
        group() {
            return this.$site.groups[this.event.group_descr];
        },
    },
    created() {
        if (!this.event) {
            return;
        }

        this.$ssrContext.title = `${this.event.title}`;
        this.$ssrContext.seoDescription = `${truncateWords(
            this.event.description,
            78
        )}`;
    },
};
</script>