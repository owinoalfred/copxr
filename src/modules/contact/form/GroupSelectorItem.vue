<template>
    <div
        class="flex items-center justify-between cursor-pointer leading-none px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
    >
        <div class="font-header">
            <div class="text-xl">{{ name }}</div>
            <div class="text-sm text-gray-600">{{ country }}</div>
        </div>
        <div
            v-if="isSelected"
            class="text-lg rounded-full w-6 h-6 flex items-center justify-center bg-green-100 text-green-500"
        >
            <IconCheck  />
        </div>
    </div>
</template>

<script>

export default {
    props: {
        name: String,
        country: String,
        isSelected: Boolean,
    },
}
</script>