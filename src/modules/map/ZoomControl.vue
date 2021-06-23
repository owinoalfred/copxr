<template>
<div class="shadow-lg flex flex-col">
    <a class="border border-gray-100 px-2 py-1 font-header text-lg bg-white hover:bg-gray-100"
        v-for="level in levels" :key="level.title"
        title="Zoom"
        role="button"
        aria-label="Zoom"
        @click.prevent.stop="level.click()">{{ level.title }}</a>
</div>
</template>

<script>
export default {
    props: {
        group: Object,
    },
    computed: {
        levels() {
            const levels = []

            if (this.group) {
                levels.push({
                    title: this.group.name,
                    click: () => {
                        this.$emit('zoomToGroup')
                    },
                })
            }

            levels.push({
                title: this.$t('Global'),
                click: () => {
                    this.$emit('zoomToWorld')
                },
            })

            return levels
        },
    },
}
</script>
