import {writeGroupsFile, writeEventsFile} from '../map-data-writer';

describe('writeGroupsFile', () => {
    it('writes the file if it doesnt exist', () => {
        const writeFileSync = jest.fn();
        writeGroupsFile({
            allGroups: {},
            fs: {
                existsSync: jest.fn().mockReturnValue(false),
                writeFileSync,
            }
        });

        expect(writeFileSync).toHaveBeenCalled()
    })
    it('writes the file if it exists but is old', () => {
        const writeFileSync = jest.fn();
        writeGroupsFile({
            allGroups: {},
            fs: {
                existsSync: jest.fn().mockReturnValue(true),
                writeFileSync,
                statSync: jest.fn().mockReturnValue({mtime:123}), // very small modify time
            }
        });

        expect(writeFileSync).toHaveBeenCalled()
    })
    it('doesnt write the file if it exists and is new', () => {
        const writeFileSync = jest.fn();
        writeGroupsFile({
            allGroups: {},
            fs: {
                existsSync: jest.fn().mockReturnValue(true),
                writeFileSync,
                statSync: jest.fn().mockReturnValue({mtime:Date.now()}),
            }
        });

        expect(writeFileSync).not.toHaveBeenCalled()
    })
    it('only saves values required', () => {
        const writeFileSync = jest.fn();
        writeGroupsFile({
            allGroups: {
                "es-spain": {
                    "name": "Spain",
                    "city": null,
                    "region": null,
                    "country": "Spain",
                    "countrycode": "es",
                    "iscountry": true,
                    "latitude": 40.2954133,
                    "longitude": -3.8236644,
                    "email": "foo@BarProp.com",
                    "links": {
                        "website": "https://www.extinctionrebellion.es",
                        "facebook": "https://www.facebook.com/esXrebellion/",
                        "youtube": "youtube",
                        "twitter": "https://twitter.com/esxrebellion",
                        "instagram": "https://www.instagram.com/esxrebellion/",
                        "diaspora": "diaspora",
                        "peertube": "peertube",
                        "mastodon": "mastodon"
                    },
                    "key": "es-spain",
                    "content": ""
                },
                "es-valencia": {
                    "name": "Valencia",
                    "city": null,
                    "region": null,
                    "country": "Spain",
                    "countrycode": "es",
                    "latitude": 39.46667,
                    "longitude": -0.375,
                    "links": {
                        "website": null,
                        "facebook": null,
                        "youtube": null,
                        "twitter": "https://twitter.com/XRValencia1",
                        "instagram": null,
                        "diaspora": null,
                        "peertube": null,
                        "mastodon": null
                    },
                    "key": "es-valencia",
                    "content": ""
                }
            },
            fs: {
                existsSync: jest.fn().mockReturnValue(false),
                writeFileSync,
            }
        });

        expect(writeFileSync.mock.calls[0][1]).toEqual(JSON.stringify([
            {
                "name": "Spain",
                "country": "Spain",
                "iscountry": true,
                "latitude": 40.2954133,
                "longitude": -3.8236644,
                "email": "foo@BarProp.com",
                "links": {
                    "website": "https://www.extinctionrebellion.es",
                    "facebook": "https://www.facebook.com/esXrebellion/",
                    "youtube": "youtube",
                    "twitter": "https://twitter.com/esxrebellion",
                    "instagram": "https://www.instagram.com/esxrebellion/",
                    "diaspora": "diaspora",
                    "peertube": "peertube",
                    "mastodon": "mastodon"
                },
                "key": "es-spain",
            },
            {
                "name": "Valencia",
                "country": "Spain",
                "latitude": 39.46667,
                "longitude": -0.375,
                "links": {
                    "twitter": "https://twitter.com/XRValencia1",
                },
                "key": "es-valencia",
            },
        ]));
    });
});

describe('writeEventsFile', () => {
    it('writes the file if it doesnt exist', () => {
        const writeFileSync = jest.fn();
        writeEventsFile({
            allGroupEvents: {},
            allGroups: {},
            fs: {
                existsSync: jest.fn().mockReturnValue(false),
                writeFileSync,
            }
        });

        expect(writeFileSync).toHaveBeenCalled()
    })
    it('writes the file if it exists but is old', () => {
        const writeFileSync = jest.fn();
        writeEventsFile({
            allGroupEvents: {},
            allGroups: {},
            fs: {
                existsSync: jest.fn().mockReturnValue(true),
                writeFileSync,
                statSync: jest.fn().mockReturnValue({mtime:123}), // very small modify time
            }
        });

        expect(writeFileSync).toHaveBeenCalled()
    });
    it('doesnt write the file if it exists and is new', () => {
        const writeFileSync = jest.fn();
        writeEventsFile({
            allGroupEvents: {},
            allGroups: {},
            fs: {
                existsSync: jest.fn().mockReturnValue(true),
                writeFileSync,
                statSync: jest.fn().mockReturnValue({mtime:Date.now()}),
            }
        });

        expect(writeFileSync).not.toHaveBeenCalled()
    });
    it('removes events with no geocode', () => {
        const writeFileSync = jest.fn();
        writeEventsFile({
            allGroupEvents: {
                group1: [
                    {
                        title:'event with Geocode',
                        organizer_country: 'United Kingdom',
                        geocode: {
                            "id": "place.7106482947249340",
                            "type": "Feature",
                            "place_type": ["place"],
                            "relevance": 0.8,
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
                        },
                    },
                    {
                        title: 'event without Geocode',
                    }
                ]
            },
            allGroups: {},
            fs: {
                existsSync: jest.fn().mockReturnValue(false),
                writeFileSync,
            }
        });

        expect(writeFileSync.mock.calls[0][1]).toEqual(JSON.stringify([
            {
                title:'event with Geocode',
                geocode: {
                    "id": "place.7106482947249340",
                    "type": "Feature",
                    "place_type": ["place"],
                    "relevance": 0.8,
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
                },
            },
        ]));
    });
});