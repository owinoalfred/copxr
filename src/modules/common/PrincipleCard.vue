<template>
    <div class="bg-green-400 p-2 pb-2 md:pb-4 md:p-4 md:pr-8 mb-4">
        <input type="checkbox" class="read-more-state" :id="count" />
        <label
            :for="count"
            class="read-more-trigger use-arrow relative z-10 cursor-pointer"
        >
            <div class="flex items-center mb-2">
                <div
                    class="text-4xl md:text-6xl font-header text-green-700 mr-4 md:mr-8 w-6 md:w-16 text-right"
                >
                    {{ count }}
                </div>
                <div class="flex-1">
                    <h2 class="text-white text-lg md:text-xl mb-1">
                        {{ title }}
                    </h2>
                    <p class="font-semibold text-lg md:text-xl">
                        {{ desciption }}
                    </p>
                </div>
                <div
                    class="arrow text-4xl md:text-6xl font-header leading-none text-green-700 m-2"
                >
                    ›
                </div>
            </div>
        </label>
        <div 
            class="read-more-target prose prose max-w-none text-black font-semibold text-lg mx-2 md:mx-20 px-3 md:px-4" 
            v-html="parsedMarkdown" />
    </div>
</template>

<script>
import md from "markdown-it";
export default {
    props: {
        count: Number,
        title: String,
        desciption: String,
        expansion: String,
    },
    data() {
        return {
            parsedMarkdown: ""
        }
    },
    created() {
        this.parsedMarkdown = md().render(this.expansion)
    }
};
</script>