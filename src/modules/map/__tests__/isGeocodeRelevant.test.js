import isGeocodeRelevant from '../../events/util/isGeocodeRelevant'


describe('isGeocodeRelevant', () => {
    const mockGeocode = {
        "id": "place.7106482947249340",
        "type": "Feature",
        "place_type": ["place"],
        "relevance": 0.333333,
        "properties": {"wikidata": "Q643160"},
        "text": "Farnham",
        "place_name": "Farnham, Surrey, England, United Kingdom",
        "bbox": [-0.903671, 51.127365, -0.667393, 51.255582],
        "center": [-0.799, 51.214],
        "geometry": {"type": "Point", "coordinates": [-0.799, 51.214]},
        "context": [{
            "id": "district.13042761630466560",
            "wikidata": "Q23276",
            "text": "Surrey"
        }, {
            "id": "region.16980108045453920",
            "short_code": "GB-ENG",
            "wikidata": "Q21",
            "text": "England"
        }, {"id": "country.10368356586814600", "short_code": "gb", "wikidata": "Q145", "text": "United Kingdom"}]
    }
    it('returns false for geocodes without required relevance', () => {
        expect(isGeocodeRelevant(mockGeocode, 0.4, "United Kingdom")).toBeFalsy();
    });
    it('returns false for geocodes that dont match given country', () => {
        expect(isGeocodeRelevant(mockGeocode, 0.3, "France")).toBeFalsy();
    });
});
