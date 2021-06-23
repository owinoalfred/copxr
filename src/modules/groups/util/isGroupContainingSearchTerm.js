export default function isGroupContainingSearchTerm (group, search) {
    if (group.name.toLowerCase().trim().includes(search)) {
        return true
    }
    if (group.country && group.country.toLowerCase().trim().includes(search)) {
        return true
    }
    return false
}