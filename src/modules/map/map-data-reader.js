import axios from 'axios';


export const readGroupsFile = async (groupKey) => {
    try{
        const groupJsonFile = `/assets/map-data/${groupKey ? groupKey : 'allGroups'}.json`
        const response = await axios.get(groupJsonFile);
        return response.data;
    } catch (error) {
        console.error(error);
    }     
}

export const readEventsFile = async (groupKey) => {
    try {
        const eventsJsonFile = `/assets/map-data/${groupKey ? groupKey : 'all'}Events.json`
        const response = await axios.get(eventsJsonFile);
        return response.data;
    } catch (error) {
        console.error(error);
    }    
}