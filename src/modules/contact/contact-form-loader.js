/**
 * This file is bundled indepentently by webpack and is sent as Javascript to the browser
 * Be aware of what packages you include
 */
import ContactForm from './ContactForm.vue'
import loadi18n from '@/i18n/async'

const rootElements = document.querySelectorAll('.contact-form')
for (const rootElement of rootElements) {
    mountForm(rootElement)
}

async function mountForm(rootElement) {
    if (rootElement.hasAttribute('data-mounted')) {
        console.error('Attempted to mount element twice - should not happen')
        return
    }
    rootElement.setAttribute('data-mounted', '1')

    const rootElementData = rootElement.querySelector('.data')
    const propsData = JSON.parse(rootElementData.innerHTML)

    const i18n = await loadi18n(document.documentElement.lang)
    const component = new ContactForm({ propsData, i18n })
    component.$mount(rootElement)
}