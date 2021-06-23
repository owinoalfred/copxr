<template>
  <BaseField
    :title="title"
    :description="description"
    :name="name"
    :showWarning="showWarning"
    :rightLabel="rightLabel"
  >
    <input type="hidden" :name="name" :value="value">
    <div class="flex items-center -mx-1">
        <IconStar class="text-3xl p-1 transition ease-in-out duration-200" :class="{ 'text-gray-300 hover:text-gray-400': value < 1, 'text-yellow-500 hover:text-yellow-400': value >= 1 }" @click="$emit('input', 1)" />
        <IconStar class="text-3xl p-1 transition ease-in-out duration-200" :class="{ 'text-gray-300 hover:text-gray-400': value < 2, 'text-yellow-500 hover:text-yellow-400': value >= 2 }" @click="$emit('input', 2)" />
        <IconStar class="text-3xl p-1 transition ease-in-out duration-200" :class="{ 'text-gray-300 hover:text-gray-400': value < 3, 'text-yellow-500 hover:text-yellow-400': value >= 3 }" @click="$emit('input', 3)" />
        <IconStar class="text-3xl p-1 transition ease-in-out duration-200" :class="{ 'text-gray-300 hover:text-gray-400': value < 4, 'text-yellow-500 hover:text-yellow-400': value >= 4 }" @click="$emit('input', 4)" />
        <IconStar class="text-3xl p-1 transition ease-in-out duration-200" :class="{ 'text-gray-300 hover:text-gray-400': value < 5, 'text-yellow-500 hover:text-yellow-400': value >= 5 }" @click="$emit('input', 5)" />
    </div>
  </BaseField>
</template>

<script>
import BaseField from './BaseField.vue'

export default {
  props: {
    value: [Number, String],
    title: String,
    description: String,
    name: { type: String, required: true },
    placeholder: String,
    rightLabel: String,
    type: { type: String, default: 'text' },
    step: String,
    rows: Number,
    showWarning: [String, Boolean]
  },
  components: {
    BaseField,
  },
}
</script>
