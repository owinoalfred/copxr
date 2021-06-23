<template>
    <div>
        <div class="m-2 p-8 bg-green-400">
            <div class="max-w-screen-xl mx-auto">
                <h3 class="font-header text-5xl leading-none text-white">  {{ $t('submit_group_title') }}</h3>
                <div class="text-lg font-bold leading-tight mt-2">
                    <div class="mt-2">{{ $t('submit_group_description_1') }}</div>
                    <i18n path="submit_group_description_2" tag="p" class="font-serif font-semibold text-xl mt-2">
                        <template v-slot:link>
                            <a href="https://organise.earth/" target="_blank" class="underline font-bold">organise.earth</a>
                        </template>
                    </i18n>
                    <i18n path="submit_group_description_3" tag="p" class="font-serif font-semibold text-xl mt-2">
                        <template v-slot:link>
                            <link-to class="underline font-bold" href="/contact-us/">{{ $t('Contact us').toLowerCase()}}</link-to>
                        </template>
                    </i18n>
                    <div class="mt-2"><em>{{ $t('submit_group_description_4') }}</em></div>
                </div>
            </div>
        </div>

        <div class="m-2 py-8 px-4 sm:px-8 bg-gray-900">
          <div class="max-w-screen-xl mx-auto">
                <div v-if="responseMessage" class="text-center font-header text-xl">
                    <div class="text-green-300">{{ responseMessage }}</div>
                </div>
              <form v-else action="/php/group/" method="post" @submit.prevent.stop="submit">
                <FormSection
                    :title="$t('form_section_action_title')"
                    :description="$t('form_section_action_description')"
                >
                    <div class="grid sm:grid-cols-2 gap-6">
                        <FormCardCheckbox
                            :title="$t('addOrEdit_add')"
                            :isSelected="addOrEdit === 'add'"
                            @click="addOrEdit = 'add'"
                        />
                        <FormCardCheckbox
                            :title="$t('addOrEdit_edit')"
                            :isSelected="addOrEdit === 'edit'"
                            @click="addOrEdit = 'edit'"
                        />
                    </div>

                    <div
                        v-if="addOrEdit"
                        class="mt-6 grid sm:grid-cols-2 gap-6">
                        <FormCardCheckbox
                                :title="$t('Group')"
                                :isSelected="groupOrCommunity === 'group'"
                                description="eg. XR India, XR Paris, XR Puerto Escondido..."
                                @click="groupOrCommunity = 'group'"
                        />
                        <FormCardCheckbox
                                :title="$t('community')"
                                :isSelected="groupOrCommunity === 'community'"
                                description="eg. XR Scientists, XR Disabled..."
                                @click="groupOrCommunity = 'community'"
                        />
                    </div>

                    <div
                        v-if="groupOrCommunity && addOrEdit === 'edit'"
                        class="mt-6 shadow sm:rounded-md sm:overflow-hidden"
                    >
                        <div class="px-4 py-5 bg-white text-gray-900 sm:p-6">
                            <label for="about" class="block font-header text-gray-700 mb-1">
                                {{ $t('Which group do you want to edit?') }}
                            </label>
                            <GroupSelector
                                v-model="selectedGroupKey"
                                :groups="groupOrCommunity === 'group' ? groups : communities"
                            />
                        </div>
                    </div>

                </FormSection>
                <div v-if="hasChosenGroup && groupOrCommunity">
                    <div class="py-5">
                        <div class="border-t border-gray-700"></div>
                    </div>

                    <FormSection
                        :title="$t('form_section_basics_title')"
                        :description="$t('form_section_basics_description')"
                    >
                        <div class="shadow sm:rounded-md px-4 py-5 bg-white text-gray-900 sm:p-6">
                            <div class="grid grid-cols-2 gap-6">
                                <TextField
                                    v-model="form.name"
                                    class="col-span-2"
                                    name="group"
                                    :title="$t('group_title')"
                                    :placeholder="$t('group_placeholder')"
                                    :description="groupOrCommunity === 'group' ? $t('group_description') : ''"
                                    :showWarning="validationErrorsMap['group']"
                                />
                                <SelectField
                                    v-if="groupOrCommunity === 'group'"
                                    v-model="form.country"
                                    class="col-span-2 sm:col-span-1"
                                    name="country"
                                    :title="$t('country_title')"
                                    :placeholder="$t('country_placeholder')"
                                    :options="countries"
                                    :showWarning="validationErrorsMap['country']"
                                />
                                <TextField
                                    v-if="groupOrCommunity === 'group'"
                                    v-model="form.city"
                                    name="city"
                                    :title="$t('city_town_village')"
                                    :rightLabel="$t('Optional')"
                                    :showWarning="validationErrorsMap['city']"
                                />
                            </div>
                        </div>
                    </FormSection>

                    <div class="py-5">
                        <div class="border-t border-gray-700"></div>
                    </div>

                    <FormSection
                        v-if="groupOrCommunity === 'group'"
                        :title="$t('form_section_location_title')"
                        :description="$t('form_section_location_description')"
                    >
                        <div class="shadow sm:rounded-md px-4 py-5 bg-white text-gray-900 sm:p-6">
                            <div class="grid grid-cols-2 gap-6">
                                <TextField
                                    v-model="form.latitude"
                                    name="latitude"
                                    :title="$t('latitude')"
                                    type="number"
                                    step="any"
                                    :showWarning="validationErrorsMap['latitude']"
                                />
                                <TextField
                                    v-model="form.longitude"
                                    name="longitude"
                                    :title="$t('longitude')"
                                    type="number"
                                    step="any"
                                    :showWarning="validationErrorsMap['longitude']"
                                />

                                <div class="col-span-2">
                                    <div class="rounded-md shadow-md bg-gray-900 text-center text-white h-64 overflow-hidden">
                                        <MapChooseLocation
                                            :latitude.sync="form.latitude"
                                            :longitude.sync="form.longitude"
                                        />
                                    </div>
                                    <div class="mt-2 font-sans italic text-xs text-gray-600 text-center">{{ $t('location_map_description') }}</div>
                                </div>

                            </div>
                        </div>
                    </FormSection>


                    <div class="py-5">
                        <div class="border-t border-gray-700"></div>
                    </div>

                    <FormSection
                        :title="$t('form_section_links_title')"
                        :description="$t('form_section_links_description')"
                    >
                        <div class="shadow sm:rounded-md px-4 py-5 bg-white text-gray-900 sm:p-6">
                            <TextField
                                v-model="form.email"
                                name="email"
                                type="email"
                                :placeholder="$t('email_placeholder')"
                                :title="$t('email_title')"
                                :description="$t('email_description')"
                                :showWarning="validationErrorsMap['email']"
                            />
                            <div class="mt-6">
                                <div class="flex items-center" @click="form.publiciseemail = !form.publiciseemail">
                                    <input type="hidden" name="publiciseemail" :value="form.publiciseemail">
                                    <span role="checkbox" tabindex="0"
                                        :aria-checked="form.publiciseemail"
                                        class="relative inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline"
                                        :class="{ 'bg-green-600': form.publiciseemail, 'bg-gray-200': !form.publiciseemail }"
                                    >
                                        <span aria-hidden="true" class="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"
                                            :class="{ 'translate-x-5': form.publiciseemail, 'translate-x-0': !form.publiciseemail }"
                                        ></span>
                                    </span>
                                    <label class="pl-2 font-sans text-sm text-gray-700">{{ $t('publiciseemail_title') }}</label>
                                </div>
                            </div>

                            <div class="py-5">
                                <div class="border-t border-gray-200"></div>
                            </div>

                            <SocialLinksForms
                                v-model="form.links"
                            />
                        </div>
                    </FormSection>

                    <div class="py-5">
                        <div class="border-t border-gray-700"></div>
                    </div>

                    <FormSection
                    >
                        <div class="shadow sm:rounded-md px-4 py-5 bg-white text-gray-900 sm:p-6">
                            <div class="grid grid-col-2 gap-6">
                                <SelectField
                                    v-if="!isEdit && groupOrCommunity === 'group'"
                                    v-model="form.groupType"
                                    class="col-span-2 xl:col-span-1"
                                    name="group-type"
                                    :title="$t('groupType_title')"
                                    :placeholder="$t('groupType_placeholder')"
                                    :options="[
                                        { id: 'national', title: $t('national') },
                                        { id: 'regional', title: $t('regional') },
                                        { id: 'local', title: $t('local') },
                                    ]"
                                    :showWarning="validationErrorsMap['groupType']"
                                />
                                <SelectField
                                    v-if="!isEdit && groupOrCommunity === 'group'"
                                    v-model="form.groupsContacted"
                                    class="col-span-2 xl:col-span-1"
                                    name="groups-contacted"
                                    :title="$t('groupsContacted_title')"
                                    :placeholder="$t('select_an_option')"
                                    :options="[
                                        { id: 'national coordinators', title: $t('national coordinators') },
                                        { id: 'regional liaisons', title: $t('regional liaisons') },
                                        { id: 'both', title: $t('both') },
                                        { id: 'neither', title: $t('neither') },
                                    ]"
                                    :showWarning="validationErrorsMap['groupsContacted']"
                                />
                                <TextField
                                    v-model="form.coordinatorContact"
                                    class="col-span-2"
                                    name="coordinator-contact"
                                    :title="isEdit ? $t('coordinatorContact_title_edit') : $t('coordinatorContact_title_new')"
                                    :rightLabel="isEdit ? $t('coordinatorContact_rightLabel') : ''"
                                    :description="$t('coordinatorContact_description')"
                                    :showWarning="validationErrorsMap['coordinatorContact']"
                                />
                            </div>

                            <div class="py-5">
                                <div class="border-t border-gray-200"></div>
                            </div>

                             <TextField
                                v-model="form.message"
                                :rows="5"
                                name="message"
                                :title="$t('anything_else_tell_us')"
                                :rightLabel="$t('Optional')"
                                :showWarning="validationErrorsMap['message']"
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
                            <div class="flex-1">
                                <div v-if="addOrEdit === 'add'">
                                    <div class="flex items-center" @click="form.principlesAndValues = !form.principlesAndValues">
                                        <span role="checkbox" tabindex="0"
                                            ref="principesAndValues"
                                            :aria-checked="form.principlesAndValues"
                                            class="relative inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline"
                                            :class="{ 'bg-green-400': form.principlesAndValues, 'bg-gray-400': !form.principlesAndValues, 'shadow-outline-red': validationErrorsMap['principlesAndValues'] }"
                                        >
                                            <span aria-hidden="true" class="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"
                                                :class="{ 'translate-x-5': form.principlesAndValues, 'translate-x-0': !form.principlesAndValues }"
                                            ></span>
                                        </span>
                                        <label class="pl-5 font-sans text-sm text-gray-200"
                                        >
                                            <i18n path="tick_button_xr_principles_values_description_1" tag="span" class="fpl-5 font-sans text-sm text-gray-200">
                                                <template v-slot:link>
                                                    <link-to class="text-green-500" target="_blank" href="/about-us/">{{ $t('principles_and_values')}}</link-to>
                                                </template>
                                            </i18n>
                                            <i18n path="tick_button_xr_principles_values_description_2" tag="span" class="block text-xs text-gray-300">
                                                <template v-slot:link>
                                                    <link-to class="text-green-500" target="_blank" href="/about-us/">{{ $t('Contact us').toLowerCase()}}</link-to>
                                                </template>
                                            </i18n>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="text-right mt-6 sm:text-left sm:mt-0">
                                <div v-if="validationErrors.length > 0" class="cursor-pointer py-2 px-6 inline-block bg-green-500 shadow-md text-white font-header opacity-90 hover:opacity-100" @click="showErrors = true">{{ $t('SAVE') }}</div>
                                <button v-else type="submit" class="cursor-pointer py-2 px-6 inline-block bg-green-500 shadow-md text-white font-header opacity-90 hover:opacity-100">{{ $t('SAVE') }}</button>
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


                    <div v-show="isDevelopment" class="bg-gray-700 text-gray-200 mt-16">
                                <pre class="font-monospace">
<code ref="groupCodeResult">
name: {{form.name}}<template v-if="groupOrCommunity === 'community'">
isCommunity: true</template><template v-if="groupOrCommunity === 'group'">
country: {{form.country}}
city: {{form.city}}</template><template v-if="groupOrCommunity === 'group' && form.groupType === 'national'">
iscountry: {{form.groupType === 'national'}}</template><template v-if="groupOrCommunity === 'group'">
latitude: {{form.latitude}}
longitude: {{form.longitude}}</template>
email: {{form.email}}
publiciseemail: {{form.publiciseemail}}
links:
<template v-for="link in form.links">  {{link.type}}: {{link.link}}
</template>
</code>
</pre>
</div>


                </div>
              </form>
          </div>
        </div>

    </div>
</template>

<script>
import extendVue from '@/extendVue'
import FormSection from './form/FormSection.vue'
import FormCardCheckbox from './form/FormCardCheckbox.vue'
import GroupSelector from './form/GroupSelector.vue'
import countries from '@/util/countries.json'
import MapChooseLocation from './form/MapChooseLocation.vue'
import SocialLinksForms from './form/SocialLinksForms.vue'
import TextField from './form/TextField.vue'
import SelectField from './form/SelectField.vue'
import axios from 'axios'

/** Vue.extend allows us to directly mount this element on the DOM */
export default extendVue({
    props: {
        inputGroups: Object,
    },
    components: {
        FormSection,
        FormCardCheckbox,
        GroupSelector,
        MapChooseLocation,
        SocialLinksForms,
        TextField,
        SelectField,
    },
    data () {
        return {
            addOrEdit: '',
            groupOrCommunity: '',
            key: '',
            selectedGroupKey: null,
            countries,
            groups: {},
            communities: {},
            form: {
                name: '',
                country: '',
                city: '',
                latitude: 0,
                longitude: 0,
                email: '',
                publiciseemail: true,
                links: [{ type: 'website', link: '' }],
                coordinatorContact: '',
                message: '',
                principlesAndValues: false,
                groupType: '',
                groupsContacted: '',
            },
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
        isDevelopment() {
            return process.env.APP_ENV !== 'production'
        },
        selectedGroup() {
            return this.inputGroups[this.selectedGroupKey]
        },
        isEdit() {
            return this.addOrEdit === 'edit' && this.selectedGroup
        },
        hasChosenGroup() {
            if (this.addOrEdit === 'add') {
                return true
            }
            if (this.isEdit) {
                return true
            }
            return false
        },

        // validation logic
        validationErrors() {
            const validationErrors = []
            if (!this.form.name) {
                validationErrors.push({ name: 'group', message: this.$t('group_required') })
            }
            if (!this.form.email) {
                validationErrors.push({ name: 'email', message: this.$t('email_required') })
            }
            if (!this.form.country && this.groupOrCommunity === 'group') {
                validationErrors.push({ name: 'country', message: this.$t('country_required') })
            }
            if (!this.form.latitude && !this.form.longitude && this.groupOrCommunity === 'group') {
                validationErrors.push({ name: 'latitude', message: this.$t('latitude_required') })
                validationErrors.push({ name: 'longitude', message: this.$t('longitude_required') })
            }

            if (!this.isEdit) {
                if (!this.form.principlesAndValues) {
                    validationErrors.push({ name: 'principlesAndValues', message: this.$t('principlesAndValues_required') })
                }
                if (!this.form.groupType && this.groupOrCommunity === 'group') {
                    validationErrors.push({ name: 'groupType', message: this.$t('groupType_required') })
                }
                if (!this.form.groupsContacted && this.groupOrCommunity === 'group') {
                    validationErrors.push({ name: 'groupsContacted', message: this.$t('groupsContacted_required') })
                }
                if (!this.form.coordinatorContact) {
                    validationErrors.push({ name: 'coordinatorContact', message: this.$t('coordinatorContact_required') })
                }
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
    watch: {
        selectedGroupKey() {
            this.fillDataFromGroup(this.selectedGroup)
        },
    },
    methods: {
        fillDataFromGroup(group) {
            if (!this.isEdit) {
                return
            }
            this.form.name = group.name
            this.form.country = group.country
            this.form.city = group.city
            if (!this.form.city && !group.iscountry) {
                this.form.city = group.name
            }
            this.form.latitude = group.latitude
            this.form.longitude = group.longitude

            this.form.groupType = ''
            if (group.iscountry) {
                this.form.groupType = 'national'
            }

            this.form.links = []
            for (const type in group.links) {
                const link = group.links[type]
                if (!link) {
                    continue
                }
                this.form.links.push({ type, link })
            }

            this.form.publiciseemail = false
            this.form.email = ''
            if (group.email) {
                this.form.email = group.email
                this.form.publiciseemail = true
            }
        },
        async submit() {
            if (this.validationErrors.length > 0) {
                return
            }
            this.responseMessage = ''
            this.responseError = ''
            this.isSent = true
            const formData = new FormData()
            formData.set('operation', this.addOrEdit === 'add' ? 'Create' : 'Update')
            formData.set('name', this.form.name)
            formData.set('code', this.$refs.groupCodeResult.innerHTML)
            formData.set('email', this.form.email)
            formData.set('publiciseemail', this.form.publiciseemail)
            formData.set('coordinator-contact', this.form.coordinatorContact)
            formData.set('message', this.form.message)
            formData.set('country', this.form.country)
            formData.set('city', this.form.city)
            formData.set('group-type', this.form.groupType)
            formData.set('groups-contacted', this.form.groupsContacted)
            const res = await axios.post('/php/group/', formData)
            this.responseMessage = res.data.message
            this.responseError = res.data.error
        }
    },
    created() {
        for (const groupKey in this.inputGroups) {
            const group = this.inputGroups[groupKey]
            if (group.isCommunity) {
                this.communities[groupKey] = group
            } else {
                this.groups[groupKey] = group
            }
        }
    }
})
</script>
