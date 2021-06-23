<template>
    <div v-if="selectedGroup" class="border border-gray-200 rounded-md shadow-lg flex items-center justify-between leading-none px-4 py-2 text-gray-700">
        <div class="font-header">
            <div class="text-xl">{{ selectedGroup.name }}</div>
            <div class="text-sm text-gray-600">{{ selectedGroup.country }}</div>
        </div>
        <div
            class="font-header flex items-center justify-center text-red-500 hover:text-red-600 cursor-pointer"
            @click="clearGroup"
        >
            {{ $t('clear_selection') }}
        </div>
    </div>
    <div
        v-else
        class="relative"
    >
        <input
            v-model="search"
            type="text"
            class="form-input block rounded-t-md shadow-md w-full transition duration-150 ease-in-out"
            :placeholder="$t('search_city_country')"
            @focus="() => this.isDropdownOpen = true"
            v-on-clickaway="clickaway"
        >

        <transition
            enter-class="transition ease-out duration-100"
            enter-active-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-class="transition ease-in duration-75"
            leave-active-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
            <div
                v-if="canShowMenu"
                class="bg-white"
                :class="{
                    'origin-top-center absolute inset-x-0 mt-2 rounded-md shadow-lg z-20000 overflow-hidden': isDropdown,
                    'border border-gray-200 rounded-md shadow-lg mt-2': !isDropdown
                }"
            >
                <div class="py-1 overflow-y-scroll h-64">
                    <template v-if="isDropdown">
                        <LinkTo
                            v-for="group in filteredGroups"
                            :key="group.key"
                            :href="`/groups/${group.key}/`"
                        >
                            <GroupSelectorItem
                                :name="group.name"
                                :country="group.country"
                                :isSelected="false"
                            />
                        </LinkTo>
                    </template>
                    <template v-else>
                        <GroupSelectorItem
                            v-for="group in filteredGroups"
                            :key="group.key"
                            :name="group.name"
                            :country="group.country"
                            :isSelected="group.key === value"
                            @click.native="onSelectGroup(group.key)"
                        />
                    </template>
                </div>
            </div>
        </transition>


    </div>
</template>

<script>
import extendVue from "@/extendVue";
import GroupSelectorItem from './GroupSelectorItem.vue'
import LinkTo from '@/components/elements/LinkTo.vue'
import { directive as onClickaway } from 'vue-clickaway';
import isGroupContainingSearchTerm from '@/modules/groups/util/isGroupContainingSearchTerm'

export default extendVue({
    props: {
        value: String,
        groups: Object,
        isDropdown: Boolean,
    },
    directives: {
        onClickaway,
    },
    components: {
        GroupSelectorItem,
        LinkTo,
    },
    data () {
        return {
            search: '',
            isDropdownOpen: false,
        }
    },
    computed: {
        canShowMenu() {
            if (this.isDropdown) {
                return this.isDropdownOpen
            }
            return true
        },
        selectedGroup() {
            return this.groups[this.value]
        },
        filteredGroups() {
            const countryResults = []
            const localResults = []
            const communityResults = []

            const { search, groups } = this
            const lower_search = search.toLowerCase().trim()
            for (const groupKey in groups) {
                const group = groups[groupKey]
                if (!isGroupContainingSearchTerm(group, lower_search)) {
                    continue
                }
                
                if (group.isCommunity) {
                    communityResults.push(group)
                } else if (group.iscountry) {
                    countryResults.push(group)
                } else {
                    localResults.push(group)
                }
            }

            // We push to different results so we can sort by priority
            return [
                ...countryResults,
                ...communityResults,
                ...localResults
            ]
        },
    },
    methods: {
        onSelectGroup(groupKey) {
            this.$emit('input', groupKey)
        },
        clearGroup() {
            this.search = ''
            this.$emit('input', null)
        },
        clickaway () {
            this.isDropdownOpen = false
        },
    },
})
</script>