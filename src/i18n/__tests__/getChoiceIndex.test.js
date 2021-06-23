import { mount } from '@/tests/vue'
import VueI18n from 'vue-i18n'
import { createLocalVue } from '@vue/test-utils'
import getChoiceIndex from '../getChoiceIndex'
import { i18n } from '@/i18n'

describe('getChoiceIndex', () => {
    it('vue-i18n loading works', async () => {
        const localVue = createLocalVue()
        localVue.use(VueI18n)
        const wrapper = mount({
            template: `<div>{{ $tc('LOCAL_GROUPS_X', groupsCount, [groupsCount]) }}</div>`,
            data() { return { groupsCount: 1 } },
        }, { localVue })
        expect(wrapper.text()).toEqual('1 group')
    })

    it('English: uses default implementation', async () => {
        i18n.locale = 'en'
        expect(i18n.tc('LOCAL_GROUPS_X', 0, [0])).toEqual('0 groups')
        expect(i18n.tc('LOCAL_GROUPS_X', 1, [1])).toEqual('1 group') // <- different
        expect(i18n.tc('LOCAL_GROUPS_X', 2, [2])).toEqual('2 groups')
        expect(i18n.tc('LOCAL_GROUPS_X', 12, [12])).toEqual('12 groups')
        expect(i18n.tc('LOCAL_GROUPS_X', 125, [125])).toEqual('125 groups')
    })

    it('Polish: uses getChoiceIndexPolish', async () => {
        if(process.env.APP_ENV !== 'staging') {
            i18n.locale = 'pl'
            expect(i18n.tc('LOCAL_GROUPS_X', 0, [0])).toEqual('0 grupa')
            expect(i18n.tc('LOCAL_GROUPS_X', 1, [1])).toEqual('1 grupa')

            expect(i18n.tc('LOCAL_GROUPS_X', 2, [2])).toEqual('2 grupy')

            expect(i18n.tc('LOCAL_GROUPS_X', 12, [12])).toEqual('12 grup')
            expect(i18n.tc('LOCAL_GROUPS_X', 125, [125])).toEqual('125 grup')
        }
    })

    describe('getChoiceIndexPolish', () => {
        if(process.env.APP_ENV !== 'staging') {
            const locale = 'pl';
            // Note: PL plural strings should be like:
            // [01] Things | {endingIn[234]ButNotinTeens} things | {theRest} things
            it('returns 0 for 0 or 1 things', () => {
                expect(getChoiceIndex(0, null, locale)).toBe(0);
                expect(getChoiceIndex(1, null, locale)).toBe(0);
            });
            it('returns 1 for most things ending in 2,3,4', () => {
                expect(getChoiceIndex(2, null, locale)).toBe(1);
                expect(getChoiceIndex(3, null, locale)).toBe(1);
                expect(getChoiceIndex(4, null, locale)).toBe(1);
                expect(getChoiceIndex(22, null, locale)).toBe(1);
                expect(getChoiceIndex(43, null, locale)).toBe(1);
                expect(getChoiceIndex(34, null, locale)).toBe(1);
            });
            it('returns 2 for 12, 13 or 14 things', () => {
                expect(getChoiceIndex(12, null, locale)).toBe(2);
                expect(getChoiceIndex(13, null, locale)).toBe(2);
                expect(getChoiceIndex(14, null, locale)).toBe(2);
            });
            it('returns 2 for everything else', () => {
                expect(getChoiceIndex(5, null, locale)).toBe(2);
                expect(getChoiceIndex(8, null, locale)).toBe(2);
                expect(getChoiceIndex(15, null, locale)).toBe(2);
                expect(getChoiceIndex(29, null, locale)).toBe(2);
                expect(getChoiceIndex(125, null, locale)).toBe(2);
                expect(getChoiceIndex(123456789, null, locale)).toBe(2);
            });
        }
    });
})