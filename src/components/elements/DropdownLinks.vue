<template>
    <div class="group inline-block relative">
        <button
            :class="buttonClasses"
        >
            <slot name="target" :activeLink="activeLink" />
        </button>
        <div class="absolute z-20 top-100 right-0 pb-2 hidden group-hover:block w-48">
            <div class="bg-gray-800 text-gray-200 rounded py-1 font-semibold">
                <a
                    v-for="link in list" :key="link.id"
                    class="py-2 px-4 block whitespace-no-wrap"
                    :class="{
                        'hover:bg-green-700 hover:text-green-200': link.id !== id,
                        'bg-green-600 text-green-100 pointer-events-none': link.id === id,
                    }"
                    :href="link.href"
                >{{ link.title }}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
        list: Array,
        buttonClasses: String,
    },
    computed: {
        activeLink() {
            for (const link of this.list) {
                if (link.id === this.id) {
                    return link
                }
            }
            return null
        },
    },
}
</script>