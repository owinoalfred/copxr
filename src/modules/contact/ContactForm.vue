<template>
    <div>
        <div class="m-2 p-8 bg-green-400">
            <div class="max-w-screen-xl mx-auto">
                <h3 class="text-5xl leading-none text-white">{{ title }}</h3>
                <div class="text-lg font-bold leading-tight mt-2">{{ description }}</div>
            </div>
        </div>
        <div class="m-2 p-8 bg-gray-900">
          <div class="max-w-screen-xl mx-auto">
            <div v-if="responseMessage" class="text-center font-header text-xl">
                <div class="text-green-300">{{ responseMessage }}</div>
            </div>
              <form v-else action="/php/contact/" method="post" @submit.prevent.stop="submit">
                <input type="hidden" name="cf_contact" :value="cf_contact" />

                <FormSection
                    :title="$t('cf_section_info_title')"
                >
                    <div class="shadow sm:rounded-md px-4 py-5 bg-white text-gray-900 sm:p-6">
                        <div class="grid grid-col-2 gap-6">
                            <TextField
                                v-model="cf_name"
                                class="col-span-2 sm:col-span-1"
                                name="cf_name"
                                :title="$t('cf_name_title')"
                                :showWarning="validationErrorsMap['cf_name']"
                            />
                            <TextField
                                v-model="cf_region"
                                class="col-span-2 sm:col-span-1"
                                name="cf_region"
                                :title="$t('cf_region_title')"
                                :showWarning="validationErrorsMap['cf_region']"
                            />
                            <TextField
                                v-model="cf_email"
                                class="col-span-2"
                                name="cf_email"
                                type="email"
                                :title="$t('cf_email_title')"
                                :showWarning="validationErrorsMap['cf_email']"
                            />
                        </div>
                    </div>
                </FormSection>

                <div class="py-5">
                    <div class="border-t border-gray-700"></div>
                </div>

                <FormSection
                    :title="$t('cf_section_message_title')"
                >
                    <div class="shadow sm:rounded-md px-4 py-5 bg-white text-gray-900 sm:p-6">
                        <TextField
                            v-model="cf_message"
                            :rows="5"
                            name="cf_message"
                            type="email"
                            :title="$t('cf_message_title')"
                            :showWarning="validationErrorsMap['cf_message']"
                        />
                    </div>
                </FormSection>

                <div class="py-5">
                    <div class="border-t border-gray-800"></div>
                </div>

                <FormSection>
                    <div v-if="isSending" class="text-center font-header text-xl">
                        <div class="text-gray-600">{{ $t('Sending_') }}</div>
                    </div>
                    <div v-else class="sm:flex items-center justify-between">
                        <div class="flex-1 font-sans text-sm text-gray-200">
                            {{ $t('cf_consent') }}
                        </div>
                        <div class="text-right mt-6 sm:text-left sm:mt-0">
                            <div v-if="validationErrors.length > 0" class="cursor-pointer py-2 px-6 inline-block bg-green-500 shadow-md text-white font-header opacity-90 hover:opacity-100" @click="showErrors = true">{{ $t('send_message') }}</div>
                            <button v-else type="submit" class="cursor-pointer py-2 px-6 inline-block bg-green-500 shadow-md text-white font-header opacity-90 hover:opacity-100">{{ $t('send_message') }}</button>
                        </div>
                    </div>
                </FormSection>

                <template v-if="visibleValidationErrors.length > 0 || responseError">
                    <div class="py-5">
                        <div class="border-t border-gray-800"></div>
                    </div>

                    <FormSection>
                        <div class="shadow sm:rounded-md px-4 py-5 bg-white text-gray-900 sm:p-6">
                            <div v-if="responseError">
                                <span class="text-red-400">•</span>&emsp;<span class="text-red-500">{{ responseError }}</span>
                            </div>
                            <div v-if="visibleValidationErrors.length > 0">
                                <div
                                    v-for="(error, i) in visibleValidationErrors"
                                    :key="i"
                                >
                                    <span class="text-red-400">•</span>&emsp;<span class="text-red-500">{{ error.message }}</span>
                                </div>
                            </div>
                        </div>
                    </FormSection>
                </template>
              </form>
          </div>
        </div>
    </div>
</template>

<script>
import extendVue from '@/extendVue'
import FormSection from './form/FormSection.vue'
import TextField from './form/TextField.vue'
import axios from 'axios'

/** Vue.extend allows us to directly mount this element on the DOM */
export default extendVue({
    props: {
        title: String,
        description: String,
        cf_contact: String,
    },
    components: {
        FormSection,
        TextField,
    },
    data () {
        return {
            cf_name: '',
            cf_region: '',
            cf_email: '',
            cf_message: '',

            showErrors: false,
            isSent: false,
            responseMessage: '',
            responseError: ''
        }
    },
    computed: {
        isSending() {
            // if error = can retry send
            return this.isSent && !this.responseError && !this.responseMessage
        },

        // validation logic
        validationErrors() {
            const validationErrors = []
            if (!this.cf_name) {
                validationErrors.push({ name: 'cf_name', message:this.$t('cf_name_required') })
            }
            if (!this.cf_region) {
                validationErrors.push({ name: 'cf_region', message:this.$t('cf_region_required') })
            }
            if (!this.cf_email) {
                validationErrors.push({ name: 'cf_email', message:this.$t('cf_email_required') })
            }
            if (!this.cf_message) {
                validationErrors.push({ name: 'cf_message', message:this.$t('cf_message_required') })
            }
            return validationErrors
        },
        visibleValidationErrors() {
            if (!this.showErrors) {
                return []
            }
            return this.validationErrors
        },
        validationErrorsMap () {
            return this.visibleValidationErrors.reduce((acc, cur) => {
                acc[cur.name] = cur.message
                return acc
            }, {})
        },
    },
    methods: {
        async submit() {
            if (this.validationErrors.length > 0) {
                return
            }
            this.responseMessage = ''
            this.responseError = ''
            this.isSent = true
            const formData = new FormData()
            formData.set('cf_contact', this.cf_contact)
            formData.set('cf_name', this.cf_name)
            formData.set('cf_region', this.cf_region)
            formData.set('cf_email', this.cf_email)
            formData.set('cf_message', this.cf_message)
            const res = await axios.post('/php/contact/', formData)
            this.responseMessage = res.data.message
            this.responseError = res.data.error
        }
    }
})
</script>
