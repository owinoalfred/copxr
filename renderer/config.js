
export const APP_ENV = process.env.APP_ENV || 'staging'

let chosenHost = ''
if (APP_ENV === 'production') {
    chosenHost = 'https://rebellion.global'
} else if (APP_ENV === 'staging') {
    chosenHost = 'https://vue.dev.rebellion.global'
}

export const host = chosenHost