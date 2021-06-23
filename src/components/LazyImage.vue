<template>
  <span
    v-if="!hasBeenInViewport"
    class="block w-full h-full"
  />
  <img
    v-else-if="!loaded"
    :src="`${src}`"
    class="w-px h-px absolute opacity-0"
    alt=""
    @load="loaded = true">
  <transition
    v-else
    enter-class="opacity-0"
    enter-active-class="transition-opacity ease-out duration-200"
    enter-to-class="opacity-100"
    leave-class="opacity-100"
    leave-active-class="transition-opacity ease-in duration-200"
    leave-to-class="opacity-0"
    appear
  >
    <span
      :style="`background-image: url(${src})`"
      class="block bg-center bg-cover w-full h-full"/>
  </transition>
</template>

<script>
require('intersection-observer');
export default {
	props: { src: String },
	data () {
		return {
      observer: null,
      hasBeenInViewport: false,
			loaded: false,
		}
    },
    mounted() {
        this.observer = new IntersectionObserver((entries) => {
            const image = entries[0]
            if (image.isIntersecting) {
                this.hasBeenInViewport = true
                if (this.observer) {
                    this.observer.disconnect()
                }
            }
        })

        this.observer.observe(this.$el)
    },
    destroyed() {
        if (this.observer) {
            this.observer.disconnect()
        }
    },
    methods: {
        onLoad() {
            this.loaded = true // increases opacity
        },
    },
}
</script>