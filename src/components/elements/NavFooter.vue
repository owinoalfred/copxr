<template>
    <div class="bg-minsk-500 text-white w-full leading-none">
        <div class="max-w-screen-xl mx-auto px-6 lg:px-12 mr-0">
            <div class="py-8 sm:flex justify-around items-center">
                <div class="md:flex-1 sm:flex flex-wrap sm:-ml-2 text-center sm:text-left">
                    <div class="pb-8 sm:pb-4 sm:pl-4 lg:pr-16 text-xl">
                        <div class="mx-2 font-header my-2">{{ $t('COP REBELLION').replace('.', '') }}</div>
                        <link-to baseClass="block px-2 py-1 rounded" inactiveClass="hover:bg-gray-800 text-gray-100 hover:text-white" activeClass="bg-gray-800 text-white" href="/get-involved/">{{ $t('Get involved') }}</link-to>
                        <link-to baseClass="block px-2 py-1 rounded" inactiveClass="hover:bg-gray-800 text-gray-100 hover:text-white" activeClass="bg-gray-800 text-white" href="/groups/">{{ $t('Sign_up_newsletter') }}</link-to>
                        <link-to baseClass="block px-2 py-1 rounded" inactiveClass="hover:bg-gray-800 text-gray-100 hover:text-white" activeClass="bg-gray-800 text-white" href="/donate/">{{ $t('Donate') }}</link-to>

                    </div>

                    <div class="pb-8 sm:pb-4 sm:pl-4 lg:pr-16 text-xl">
                        <div class="mx-2 font-header my-2">XR COP</div>
                        <link-to baseClass="block px-2 py-1 rounded" inactiveClass="hover:bg-gray-800 text-gray-100 hover:text-white" activeClass="bg-gray-800 text-white" href="/">{{ $t('What is COP') }}</link-to>
                        <link-to baseClass="block px-2 py-1 rounded" inactiveClass="hover:bg-gray-800 text-gray-100 hover:text-white" activeClass="bg-gray-800 text-white" href="/frequently-asked-questions/">{{ $t('faq') }}</link-to>
                    </div>

                    <div class="pb-8 sm:pb-4 sm:pl-4 lg:pr-16 text-xl">
                        <div class="mx-2 font-header my-2">{{ $t('News') }}</div>
                        <link-to baseClass="block px-2 py-1 rounded" inactiveClass="hover:bg-gray-800 text-gray-100 hover:text-white" activeClass="bg-gray-800 text-white" href="/news/#blog">{{ $t('News Blog') }}</link-to>
                        <link-to baseClass="block px-2 py-1 rounded" inactiveClass="hover:bg-gray-800 text-gray-100 hover:text-white" activeClass="bg-gray-800 text-white" href="/news/#press">{{ $t('Press') }}</link-to>
                    </div>

                    <div class="pb-8 sm:pb-4 sm:pl-4 lg:pr-16 text-xl">
                        <div class="mx-2 font-header my-2">{{ $t('Rebellion Support') }}</div>
                        <link-to baseClass="block px-2 py-1 rounded" inactiveClass="hover:bg-gray-800 text-gray-100 hover:text-white" activeClass="bg-gray-800 text-white" href="/contact-us/">{{ $t('Contact us') }}</link-to>
                        <link-to baseClass="block px-2 py-1 rounded" inactiveClass="hover:bg-gray-800 text-gray-100 hover:text-white" activeClass="bg-gray-800 text-white" href="/contact-web-team/">{{ $t('Private Policy') }}</link-to>
                        <link-to baseClass="block px-2 py-1 rounded" inactiveClass="hover:bg-gray-800 text-gray-100 hover:text-white" activeClass="bg-gray-800 text-white" href="/privacy-policy/">{{ $t('Regen Hub') }}</link-to>
                    </div>
                </div>

                <div class="flex flex-col justify-end items-center">
                    <NewsSocialLinks class="mt-3 flex items-center justify-center text-3xl" />
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import NewsSocialLinks from '@/components/elements/NewsSocialLinks.vue'

export default {
    components: {
        NewsSocialLinks,
    },
}
</script>