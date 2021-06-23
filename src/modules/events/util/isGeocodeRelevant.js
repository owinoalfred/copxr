/**
 *
 * @param { Object } [geocode]
 * @param { number } [relevance] decimal of geocode relevance required
 * @param { string } [country] country the geocode must match to
 */
export default function isGeocodeRelevant(geocode, relevance, country) {
    return geocode
        && geocode.center
        && geocode.relevance
        && geocode.relevance > relevance
        && geocode.context
        && geocode.context.length > 0
        && geocode.context[geocode.context.length - 1].text
        && geocode.context[geocode.context.length - 1].text === country
}