<template>
    <div class="sticky top-0 z-20000">
        <div class="relative z-10 flex items-center justify-center w-full leading-none font-header text-xl" :class="colorClass()">
            <div class="relative flex items-center justify-between w-full max-w-screen-xl">
                <link-to href="/">
                    <img class="w-8 mx-4" :src="logoPath" alt="XR">
                </link-to>
                <div class="flex-grow relative -mx-4 overflow-hidden">
                    <div class="absolute top-0 left-0 z-10 pr-5 h-full w-4 pointer-events-none" :class="colorClass('gradient', 'right')"></div>
                    <div class="overflow-auto custom-scrollbar">
                        <div class="flex justify-around whitespace-no-wrap min-w-fit">
                            <link-to baseClass="inline-block px-4 lg:px-5 xl:px-6 py-2 md:py-4" activeClass="bg-blue-200 text-black shadow-sm" inactiveClass="bg-opaque" href="/">{{ $t('What is COP') }}</link-to>
                            <link-to baseClass="inline-block px-4 lg:px-5 xl:px-6 py-2 md:py-4" activeClass="bg-yellow-300 text-black shadow-sm" inactiveClass="bg-opaque" href="/get-involved/">{{ $t('Get involved') }}</link-to>
                            <link-to class="inline-block lg:mx-2 bg-yellow-500 hover:bg-yellow-400 py-2 md:py-4 px-4 lg:px-5 xl:px-6" href="/donate/">{{ $t('Donate') }}</link-to>
                            <link-to class="inline-block lg:mx-2 bg-yellow-500 hover:bg-yellow-400 py-2 md:py-4 px-4 lg:px-5 xl:px-6" href="https://rebellion.global/">{{ $t('XR') }}</link-to>

                        </div>
                    </div>  
                    <div class="absolute top-0 right-0 z-10 pr-5 h-full w-4 pointer-events-none" :class="colorClass('gradient', 'left')"></div>
                </div>
                <LanguageSwitcher />
            </div>
        </div>
        <!-- <div v-if="isHomePage">
            <input type="checkbox" class="show-banner-state" :id="'close'" />
            <div class="absolute z-0 bg-orange-500 max-w-4xl w-full py-2 px-4 font-header text-lg rounded-b-lg flex flex-row justify-center items-start show-banner-target">
                <link-to href="/press/2020/09/01/global-rebellion/" class="underline">{{ $t('banner text') }}</link-to>
                <label :for="'close'" class="font-sans ml-6 cursor-pointer">⨯</label>
            </div>
        </div> -->
    </div>
</template>

<script>
import LanguageSwitcher from '@/components/elements/LanguageSwitcher.vue'

export default {
    components: {
        LanguageSwitcher,
    },
    methods: {
        colorClass(type, gradientDirection) {
            if (this.$route.url.indexOf('about-us') > -1) {
                return type === 'gradient' ? `nav-gradient-minsk-500-${gradientDirection}` : 'bg-minsk-500 text-white'
            }
            if (this.$route.url.indexOf('why-rebel') > -1) {
                return type === 'gradient' ? `nav-gradient-minsk-500-${gradientDirection}` : 'bg-minsk-500 text-white'
            }
            if (this.$route.url.indexOf('news') > -1) {
                return type === 'gradient' ? `nav-gradient-minsk-500-${gradientDirection}` : 'bg-minsk-500 text-white'
            }
            if (this.$route.url.indexOf('get-involved') > -1) {
                return type === 'gradient' ? `nav-gradient-minsk-500-${gradientDirection}` : 'bg-minsk-500 text-white'
            }
            if (this.$route.url.indexOf('donate') > -1) {
                return type === 'gradient' ? `nav-gradient-minsk-500-${gradientDirection}` : 'bg-minsk-500 text-white'
            }
            return type === 'gradient' ? `nav-gradient-minsk-500-${gradientDirection}` : 'bg-minsk-500 text-white'
        },
    },
    computed: {
        logoPath() {
            if (this.$route.url.indexOf('news')> -1) {
                return '/assets/img/logos/xr-white.svg'
            }
            return '/assets/img/logos/xr.svg'
        },
        isHomePage() {
            return this.$route.url === "/" || this.$route.url.length === 4
        }
    }
}
</script>