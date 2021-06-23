<template>
    <div>
        <div class="block font-header text-gray-700 mb-1">
            {{ $t('website_social_media') }}
        </div>

        <div
            v-for="(row, i) in value"
            :key="i"
            class="grid grid-cols-9 gap-3 mb-3"
        >
            <div class="col-span-3 sm:col-span-2">
                <select :value="row.type" @input="onChange(i, 'type', $event)" :aria-label="$t('linkType_placeholder')" id="LinkType" class="form-select block w-full sm:text-sm sm:leading-5 transition ease-in-out duration-150">
                    <option disabled value="">{{ $t('linkType_placeholder') }}</option>
                    <option v-for="opt in options" :key="opt.id" :value="opt.id">{{ opt.title }}</option>
                </select>
            </div>
            <div class="col-span-5 sm:col-span-6">
                <input :value="row.link" pattern="https?://.*" @input="onChange(i, 'link', $event)" type="text" class="form-input block w-full sm:text-sm sm:leading-5 transition ease-in-out duration-150">
            </div>
            <div>
                <div class="h-full flex items-center justify-center font-header text-red-500 hover:text-red-600 cursor-pointer" @click="removeRow(i)">
                    <span class="hidden sm:inline">{{ $t('remove') }}</span>
                    <span class="sm:hidden">×</span>
                </div>
            </div>
        </div>

        <div class="cursor-pointer py-2 px-4 inline-block bg-green-500 shadow-md text-white font-header opacity-90 hover:opacity-100" @click="addNewRow">{{ $t('add') }}</div>
    </div>
</template>

<script>
export default {
    props: {
        value: Array,
    },
    computed: {
        options() {
            return [
                { id: 'website', title: this.$t('social_website') },
                { id: 'facebook', title: 'Facebook' },
                { id: 'instagram', title: 'Instagram' },
                { id: 'mastodon', title: 'Mastodon' },
                { id: 'diaspora', title: 'Diaspora' },
                { id: 'peertube', title: 'Peertube' },
                { id: 'twitter', title: 'Twitter' },
                { id: 'youtube', title: 'YouTube' },
                { id: 'other', title: this.$t('social_other') },
            ]
        },
        nextUnusedOption() {
            const usedOptions = this.value.map(r => r.type)
            for (const option of this.options) {
                if (usedOptions.indexOf(option.id) > -1) {
                    continue
                }
                return option.id
            }
            return 'other'
        },
    },
    methods: {
        addNewRow() {
            const row = { type: this.nextUnusedOption, link: '' }
            this.$emit('input', [ ...this.value, row ])
        },
        onChange(index, prop, event) {
            const newRows = this.value.slice()
            const newRow = { ...newRows[index], [prop]: event.target.value }
            this.$set(newRows, index, newRow)
            this.$emit('input', newRows)
        },
        removeRow(index) {
            const newValue = this.value.slice()
            newValue.splice(index, 1)
            this.$emit('input', newValue)
        },
    },
}
</script>