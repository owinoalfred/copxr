<template>
  <div>
    <div class="flex items-center justify-between">
      <label :for="name" class="block font-header text-gray-700">{{ title }}</label>
      <div v-if="showWarning" class="font-sans italic text-xs text-red-500">
        {{ showWarning }}
      </div>
      <div v-else-if="rightLabel" class="font-sans italic text-xs text-gray-600">
        {{ rightLabel }}
      </div>
    </div>
    <div class="mt-1 relative">
      <slot />
      <div v-if="showWarning" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    <div v-if="description" class="mt-2 font-sans italic text-xs text-gray-600">{{ description }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    name: { type: String, required: true },
    showWarning: [String, Boolean],
    rightLabel: String,
  },
}
</script>
