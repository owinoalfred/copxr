import isGeocodeRelevant from './isGeocodeRelevant'

/**
 * @param { Object } event 
 */
export default function getEventLocation(event) {
    if (event.geocode && isGeocodeRelevant(event.geocode, 0.7, event.organizer_country) && event.geocode.context) {
        for (const ctx of event.geocode.context) {
            if (ctx.id.indexOf('place') > -1) {
                return ctx.text
            }
            if (ctx.id.indexOf('locality') > -1) {
                return ctx.text
            }
        }
    }
    if (event.where) {
        return event.where
    }
    return null
}