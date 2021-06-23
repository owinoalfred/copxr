<template>
  <BaseField
    :title="title"
    :description="description"
    :name="name"
    :showWarning="showWarning"
    :rightLabel="rightLabel"
  >
    <textarea
      v-if="rows"
      :rows="rows"
      :id="name"
      :name="name"
      ref="input"
      class="form-textarea block w-full sm:text-sm sm:leading-5 transition ease-in-out duration-150"
      :class="inputClasses"
      :placeholder="placeholder"
      :value="value"
      :aria-invalid="!!showWarning"
      @input="$emit('input', $event.target.value)"
    ></textarea>
    <input
      v-else
      :id="name"
      :name="name"
      ref="input"
      class="form-input block w-full sm:text-sm sm:leading-5 transition ease-in-out duration-150"
      :class="inputClasses"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      :step="step"
      :aria-invalid="!!showWarning"
      @input="$emit('input', $event.target.value)"
    >
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
