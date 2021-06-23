<template>
    <div>
        <div class="bg-yellow-500 m-2 relative overflow-hidden">
            <img
                class="block absolute right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-5 lg:opacity-10 max-w-600 max-h-100vw"
                src="/assets/img/wood-blocks/skull-charcoal.svg"
                alt="drawing showing a skull"
                loading="lazy"
            />
            <div class="max-w-screen-xl mx-auto p-6 lg:px-16 lg:py-24">
                <div class="max-w-2xl">
                    <div class="font-header text-lg text-red-500 mb-1">404</div>
                    <h1 class="text-7xl text-red-500 leading-none">{{ $t('Page not found') }}</h1>
                    <link-to href="/" class="bg-red-600 shadow-md text-yellow-500 font-header text-3xl px-4 py-2 mt-2 inline-block">{{ $t('Go back') }}</link-to>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>