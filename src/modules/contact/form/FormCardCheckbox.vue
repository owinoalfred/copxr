<template>
    <div
        class="overflow-hidden shadow rounded-lg transition duration-150 ease-in-out"
        :class="{
            'bg-green-200 text-green-700': isSelected,
            'bg-white hover:bg-gray-200 text-gray-500 cursor-pointer': !isSelected,
        }"
        @click="$emit('click')"
    >
        <div class="py-4 px-6 flex items-start justify-between">
            <div>
                <div class="font-header text-2xl flex items-center">
                    {{ title }}
                    <svg v-if="isSelected" class="ml-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                </div>
                <div class="font-header">{{ description }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
        isSelected: Boolean,
    }
}
</script>