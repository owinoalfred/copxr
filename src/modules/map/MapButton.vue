<template>
    <div class="shadow-lg">
        <a
            class="border border-gray-100 px-2 py-1 font-header text-lg flex items-center bg-white hover:bg-gray-100"
            role="button"
            @click.prevent.stop="$emit('click')"
        >{{ title }}</a>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
    },
}
</script>
