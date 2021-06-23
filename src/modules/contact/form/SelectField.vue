<template>
  <BaseField
    :title="title"
    :description="description"
    :name="name"
    :showWarning="showWarning"
    :rightLabel="rightLabel"
  >
    <select
        ref="input"
        :aria-label="title"
        :id="name"
        :name="name"
        class="form-select block w-full sm:text-sm sm:leading-5 transition ease-in-out duration-150"
        :class="inputClasses"
        :value="value"
        :aria-invalid="!!showWarning"
        @input="$emit('input', $event.target.value)"
    >
        <option disabled value="">{{ placeholder }}</option>
        <option v-for="opt in options" :key="opt.id || opt" :value="opt.id || opt">{{ opt.title || opt }}</option>
    </select>
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
    type: { type: String, default: 'text' },
    showWarning: [String, Boolean],
    rightLabel: String,
    options: Array,
  },
  components: {
    BaseField,
  },
  computed: {
    inputClasses () {
      if (this.showWarning) {
        return 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red'
      }
      return ''
    }
  },
  methods: {
    focus () {
      if (this.$refs.input) {
        this.$refs.input.focus()
      }
    }
  }
}
</script>
