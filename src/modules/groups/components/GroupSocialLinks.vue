<template>
    <div v-if="group && (group.email || group.links)">
        <a v-if="group.email" :href="`mailto:${group.email}`" target="_blank" rel="noopener noreferrer nofollow" class="rounded-full w-8 h-8 inline-flex items-center justify-center bg-black m-1 opacity-90 hover:opacity-100">
            <IconEmail />
        </a>
        <a v-if="group.links.diaspora" :href="group.links.diaspora" target="_blank" rel="noopener noreferrer nofollow" class="rounded-full w-8 h-8 inline-flex items-center justify-center bg-black m-1 opacity-90 hover:opacity-100">
            <img src="/assets/img/icons/diaspora.svg" class="h-4 w-4 fill-current" alt="diaspora" loading="lazy">
        </a>
        <a v-if="group.links.mastodon" :href="group.links.mastodon" target="_blank" rel="noopener noreferrer nofollow" class="rounded-full w-8 h-8 inline-flex items-center justify-center bg-black m-1 opacity-90 hover:opacity-100">
            <img src="/assets/img/icons/mastodon.svg" class="h-4 w-4 fill-current" alt="mastodon" loading="lazy">
        </a>
        <a v-if="group.links.peertube" :href="group.links.peertube" target="_blank" rel="noopener noreferrer nofollow" class="rounded-full w-8 h-8 inline-flex items-center justify-center bg-black m-1 opacity-90 hover:opacity-100">
            <img src="/assets/img/icons/peertube.svg" class="h-4 w-4 fill-current" alt="peertube" loading="lazy">
        </a>
        <a v-if="group.links.youtube" :href="group.links.youtube" target="_blank" rel="noopener noreferrer nofollow" class="rounded-full w-8 h-8 inline-flex items-center justify-center bg-black m-1 opacity-90 hover:opacity-100">
            <IconYoutube />
        </a>
        <a v-if="group.links.instagram" :href="group.links.instagram" target="_blank" rel="noopener noreferrer nofollow" class="rounded-full w-8 h-8 inline-flex items-center justify-center bg-black m-1 opacity-90 hover:opacity-100">
            <IconInstagram />
        </a>
        <a v-if="group.links.twitter" :href="group.links.twitter" target="_blank" rel="noopener noreferrer nofollow" class="rounded-full w-8 h-8 inline-flex items-center justify-center bg-black m-1 opacity-90 hover:opacity-100">
            <IconTwitter />
        </a>
        <a v-if="group.links.facebook" :href="group.links.facebook" target="_blank" rel="noopener noreferrer nofollow" class="rounded-full w-8 h-8 inline-flex items-center justify-center bg-black m-1 opacity-90 hover:opacity-100">
            <IconFacebook />
        </a>
    </div>
</template>

<script>
export default {
    props: {
        group: Object,
    },
}
</script>