<template>
    <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
                <h3 v-if="title" class="text-2xl text-gray-200">{{ title }}</h3>
                <p v-if="description" class="mt-1 text-lg leading-tight text-gray-300">{{ description }}</p>
            </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
    },
}
</script>