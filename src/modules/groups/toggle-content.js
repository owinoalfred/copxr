// toggle-content.js provides a reusable way to hide / show content based on css classes.
// To use, simply add the classes `.toggle-btn .[name]-toggle-btn` to your togglers, and
// `.toggle-section .[name]-toggle-section` to the sections in your page that you wish to toggle.
// Then, add active and inactive classes under the html data tag for the toggle buttons
// (eg. <button data-active-class="bg-green-600,text-white" data-inactive-class="bg-grey-500,text-black"></button>)
// IMPORTANT: In order for the toggle button to correctly associate with the correct section,
// the [name] part of both classes must match exactly.

const toggleButtons = document.querySelectorAll('.toggle-btn')
const sections = document.querySelectorAll('.toggle-section')
const initialIdentifierToShowFromRoute = window.location.hash // set the initial section to show based on the hash in the URL

function onToggle(identifierToShow, elementsToToggle, buttonsToToggle) {
    window.location.hash = identifierToShow
    elementsToToggle.forEach(elementToToggle => {
        if(elementToToggle.classList.value.includes(identifierToShow)) {
            elementToToggle.classList.remove('hidden')
        } else {
            elementToToggle.classList.add('hidden')
        }
    })
    buttonsToToggle.forEach(button => {
        const activeClasses = button.dataset.activeClass.split(' ')
        const inactiveClasses = button.dataset.inactiveClass.split(' ')
        if(button.classList.value.includes(identifierToShow)) {
            button.classList.add(...activeClasses)
            button.classList.remove(...inactiveClasses)
        } else {
            button.classList.remove(...activeClasses)
            button.classList.add(...inactiveClasses)
        }
    })
}

toggleButtons.forEach((button, i) => {
    const elementIdentifier = button.classList.value.match(/^.*?([^ -]+)-toggle-btn.*$/)[1]
    button.addEventListener('click', () => onToggle(elementIdentifier, sections, toggleButtons))
    if(i === 0 || initialIdentifierToShowFromRoute && initialIdentifierToShowFromRoute.includes(elementIdentifier)) {
        onToggle(elementIdentifier, sections, toggleButtons)
    }
})
