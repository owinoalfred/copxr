<template>
    <div class="fixed bottom-0 z-20000">
        <span class="bg-purple-500 text-black font-header px-4 py-2 cursor-pointer text-2xl z-20000" @click="shown = !shown">{{ $t('feedback') }} <span v-if="!shown">▲</span><span v-else>▼</span></span>
        <div v-if="shown" class="max-h-3/4vh overflow-auto p-8 bg-purple-500">
            <div class="max-w-screen-xl mx-auto">
                <div v-if="responseMessage" class="text-center font-header text-xl">
                    <div class="text-green-300">{{ responseMessage }}</div>
                </div>
                <form v-else action="/php/feedback/" method="post" @submit.prevent.stop="submit">
                    <p class="font-header text-2xl">This feedback form is for technical feedback about rebellion.global.</p>
                    <p class="font-header text-2xl">If you have questions about XR, please see the FAQ or send us a message on the contact page</p>
                    <div class="py-5">
                        <div class="border-t border-purple-600"></div>
                    </div>
                    <FormSection
                            :title="$t('cf_section_info_title')"
                    >
                        <div class="shadow sm:rounded-md px-4 py-5 bg-white text-gray-900 sm:p-6">
                            <div class="grid grid-col-2 gap-6">
                                <TextField
                                        v-model="ff_handle"
                                        class="col-span-2 sm:col-span-1"
                                        name="ff_handle"
                                        :title="$t('ff_handle_title')"
                                        :showWarning="validationErrorsMap['ff_handle']"
                                />
                            </div>
                        </div>
                    </FormSection>

                    <div class="py-5">
                        <div class="border-t border-purple-600"></div>
                    </div>

                    <FormSection
                            :title="$t('ff_section_message_title')"
                    >
                        <div class="shadow sm:rounded-md px-4 py-5 bg-white text-gray-900 sm:p-6">
                            <div class="grid grid-col-2 gap-6">
                                <RatingField
                                    v-model="ff_rating"
                                    name="ff_rating"
                                    :title="$t('cf_rating_title')"
                                    :showWarning="validationErrorsMap['ff_rating']"
                                />
                                <TextField
                                        v-model="ff_message"
                                        :rows="5"
                                        name="ff_message"
                                        type="email"
                                        :title="$t('cf_message_title')"
                                        :showWarning="validationErrorsMap['ff_message']"
                                />
                            </div>
                        </div>
                    </FormSection>

                    <div class="py-5">
                        <div class="border-t border-purple-600"></div>
                    </div>

                    <FormSection>
                        <div v-if="isSending" class="text-center font-header text-xl">
                            <div class="text-gray-600">{{ $t('Sending_') }}</div>
                        </div>
                        <div v-else class="sm:flex items-center justify-between">
                            <div class="flex-1 font-sans text-sm text-gray-200">
                                {{ $t('ff_consent') }}
                            </div>
                            <div class="text-right mt-6 sm:text-left sm:mt-0">
                                <div v-if="validationErrors.length > 0" class="cursor-pointer py-2 px-6 inline-block bg-green-500 shadow-md text-white font-header opacity-90 hover:opacity-100" @click="showErrors = true">{{ $t('send_message') }}</div>
                                <button v-else type="submit" class="cursor-pointer py-2 px-6 inline-block bg-green-500 shadow-md text-white font-header opacity-90 hover:opacity-100">{{ $t('send_message') }}</button>
                            </div>
                        </div>
                    </FormSection>

                    <template v-if="visibleValidationErrors.length > 0 || responseError">
                        <div class="py-5">
                            <div class="border-t border-purple-600"></div>
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
import RatingField from './form/RatingField.vue'
import axios from 'axios'

/** Vue.extend allows us to directly mount this element on the DOM */
export default extendVue({
    props: {
        title: String,
        description: String,
        ff_contact: String,
    },
    components: {
        FormSection,
        TextField,
        RatingField,
    },
    data () {
        return {
            shown: false,
            ff_handle: '',
            ff_message: '',
            ff_rating: 0,

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
            if (!this.ff_handle) {
                validationErrors.push({ name: 'ff_handle', message:this.$t('ff_handle_required') })
            }
            if (!this.ff_message) {
                validationErrors.push({ name: 'ff_message', message:this.$t('cf_message_required') })
            }
            if (!this.ff_rating) {
                validationErrors.push({ name: 'ff_rating', message:this.$t('cf_rating_required') })
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
            formData.set('ff_handle', this.ff_handle)
            formData.set('ff_message', this.ff_message)
            formData.set('ff_rating', this.ff_rating)
            formData.set('ff_path', document.URL)
            const res = await axios.post('/php/feedback/', formData)
            this.responseMessage = res.data.message
            this.responseError = res.data.error
        }
    }
})
</script>
