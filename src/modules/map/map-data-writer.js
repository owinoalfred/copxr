import fsDefault from 'fs';
import isGeocodeRelevant from '../events/util/isGeocodeRelevant'


function cleanGroups(groups){
    return groups.map(b => {
        const {
            name, 
            country, 
            iscountry, 
            latitude, 
            longitude, 
            email, 
            links,
            key,
        } = b;
        if (!links && !iscountry) { // countries can have no links, local groups must have no links
            console.error('No links', name)
        }
        if (links) {
            Object.keys(links).forEach(k => (!links[k] && links[k] !== undefined) && delete links[k]);
        }
        return {
            name, 
            country, 
            iscountry, 
            latitude, 
            longitude,
            email,
            links,
            key,
        };
    });
}

function cleanEvents(events){
    return events.map(ev => {
        const {
            id,
            title,
            files,
            geocode,
            latitude,
            longitude,
            group_name,
            start_date,
            where
        } = ev;
        return {
            id,
            title,
            files,
            geocode,
            latitude,
            longitude,
            group_name,
            start_date,
            where
        };
    });
}

function getCitiesForGroup({ allGroups, groupKey }){
    if (!groupKey) return allGroups;

    const thisGroup = allGroups.find(b => b.key === groupKey)
    if (!thisGroup) {
        throw new Error(`No group found with key: ${groupKey}`)
    }
    return allGroups.filter(b => !b.isCountry && (b.country === thisGroup.country || b.country === thisGroup.name));
}

function getEventsForGroup({ allEvents, allGroups, groupKey }){
    if (!groupKey) return allEvents;

    const thisGroup = allGroups.find(b => b.key === groupKey);

    // 'national events' will have the key in the group_descr.
    // 'regional events' will have their country set to the country name.
    return allEvents.filter(e => e.group_descr === groupKey || (e.country === thisGroup.country || e.country === thisGroup.name));
}

const writeFileIfNecessary = ({filename, jsonData, fs = fsDefault, cacheHours = 1}) => {
    const shouldWriteFile = !fs.existsSync(filename) || ((Date.now() - fs.statSync(filename).mtime)/1000/60/60 > cacheHours);
    if (shouldWriteFile){
        console.log(`Writing File: ${filename}`)
        fs.writeFileSync(filename,
            JSON.stringify(jsonData)   
        );
    }
}

export const writeGroupsFile = ({
    allGroups,
    groupKey,
    fs = fsDefault,
}) => {
    const groupJsonFile = `public/assets/map-data/${groupKey ? groupKey : 'allGroups'}.json`
    const allGroupsArray = Object.values(allGroups);
    const groupsToWrite = groupKey ?
        getCitiesForGroup({
            allGroups: allGroupsArray,
            groupKey}) :
        allGroupsArray;
    const cleanedGroupsToWrite = cleanGroups(groupsToWrite);
    writeFileIfNecessary({
        filename: groupJsonFile,
        jsonData: cleanedGroupsToWrite,
        fs,
    });
}

export const writeEventsFile = ({
    allGroupEvents,
    allGroups,
    groupKey,
    fs = fsDefault,
}) => {
    const eventsJsonFile = `public/assets/map-data/${groupKey ? groupKey : 'all'}Events.json`
    const allGroupsArray = Object.values(allGroups);
    // This flattens the array of arrays, and removes the ones with no/bad location
    const allEventsArray = [].concat(...(Object.values(allGroupEvents))).filter(event => isGeocodeRelevant(event.geocode, 0.7, event.organizer_country));
    const eventsToWrite = groupKey ?
                getEventsForGroup({
                    allEvents: allEventsArray,
                    allGroups: allGroupsArray,
                    groupKey}) :
                allEventsArray;
    const cleanedEventsToWrite = cleanEvents(eventsToWrite);
    writeFileIfNecessary({
        filename: eventsJsonFile,
        jsonData: cleanedEventsToWrite,
        fs,
    });
}
