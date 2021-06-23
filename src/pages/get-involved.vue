<template>
  <div>
    <div class="bg-pastel_green-500 m-2 relative overflow-hidden ml-2">
      <div class="black mt-10">
      <h1 class="text-5xl md:text-7xl ml-2 text-white leading-none">
        {{ $t("get_involved_title") }}
      </h1>
      </div>
      <img
                class="block absolute object-cover right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-10 lg:opacity-8 max-w-850 max-h-100vw"
                src="/assets/img/imgs/vector_assets/impossible_xr_symbol.svg"
                loading="lazy"
                alt="black and white drawing of a chameleon"
            />
      <p class="font-semibold text-xl mt-2 mb-8 ml-2">
        {{ $t("get_involved_desc") }}
      </p>

      <div class="buttons  mb-1 ml-1 flex  left-2">
        <link-to
          href="/groups/"
          class="bg-white shadow-md text-black font-header text-2xl px-3 py-2 inline-block"
          >{{ $t("Join XR COP") }}</link-to
        >

        <link-to
          href="/groups/"
          class="bg-white shadow-md text-black ml-10 font-header text-2xl px-3 py-2 inline-block"
          >{{ $t("Learn More Aout XR COP") }}</link-to
        >
      </div>
    </div>
    <div class="bg-moody_blue-500 m-2 relative overflow-hidden ml-2">
       <img
                class="block absolute object-cover right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-10 lg:opacity-8 max-w-850 max-h-100vw"
                src="/assets/img/imgs/vector_assets/impossible_rectangle.svg"
                loading="lazy"
                alt="black and white drawing of a chameleon"
            />
      <div class="heders mt-10"><h1 class="text-5xl ml-2 md:text-7xl text-white leading-none">
        {{ $t("About The Cop Rebellion") }}
      </h1>

            </div>
      <p class="font-semibold ml-2 text-xl mt-2 mb-8">
        {{ $t("About the cop rebellion desc") }}
      </p>
      <h3 class="text-white ml-2">
        {{ $t("See you on the streets") }}
        </h3>
      <div class="buttons flex bottom-4  mb-1 ml-1 left-2">
        <link-to
          href="/groups/"
          class="bg-white shadow-md text-black font-header text-2xl px-3 py-2 inline-block"
          >{{ $t("Glasgow COP Rebellion") }}</link-to
        >

        <link-to
          href="/groups/"
          class="bg-white shadow-md ml-10 text-black font-header text-2xl px-3 py-2 inline-block"
          >{{ $t("Global COP Rebellion") }}</link-to
        >
      </div>
    </div>
     <div class="bg-spray-500 m-2 relative overflow-hidden  ml-2">
     <div class="headers mt-10"> <h1 class="text-5xl ml-2 md:text-7xl text-white leading-none">
        {{ $t("DONATE") }}
      </h1>
      <img
                class="block absolute object-cover right-0 bottom-0 top-1/2 transform -translate-y-1/2 h-full pointer-events-none opacity-10 lg:opacity-8 max-w-850 max-h-100vw"
                src="/assets/img/imgs/vector_assets/cop_shock.svg"
                loading="lazy"
                alt="black and white drawing of a chameleon"
            />
            </div>
      <p class="font-semibold ml-2 text-xl mt-2 mb-8">
        {{ $t("DONATE TO XR COP desc") }}
      </p>
      <div class="setbuttons flex-box mb-1 ml-1">
      <div class="buttons flex-box mb-4">
        <link-to
          href="/groups/"
          class="bg-white shadow-md text-black font-header px-1 py-1  text-2xl  inline-block"
          >{{ $t("DONATE") }}</link-to
        >

        <link-to
          href="/groups/"
          class="bg-white shadow-md text-black ml-7 px-1 py-1 font-header text-2xl inline-block"
          >{{ $t("CAMPAIGN 1") }}</link-to
        >
      </div>
      <div class="buttons flex-box ">
        <link-to
          href="/groups/"
          class="bg-white shadow-md text-black  px-1 py-1 font-header text-2xl  inline-block"
          >{{ $t("CAMPAIGN 2") }}</link-to
        >

        <link-to
          href="/groups/"
          class="bg-white shadow-md text-black ml-10 px-1 py-1 font-header text-2xl inline-block"
          >{{ $t("CAMPAIGN 3") }}</link-to
        >
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$ssrContext.title = `${this.$t("seo_title_get_involved")} | ${this.$t(
      "extinction rebellion"
    )}`;
    this.$ssrContext.seoDescription = this.$t("seo_description_get_involved");
    this.$ssrContext.seoImage = "/assets/img/social/home.jpg";

    this.$ssrContext.pageScripts.push("video-controls.js");
  },
};
</script>