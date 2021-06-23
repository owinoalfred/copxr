export default function getRegex(path) {
    // réunion, córdoba, dobříš, san-luís, liège, göttingen, århus
    // fi-jyväskylä, cœur-du-var, arctic-tromsø, bacău
    // auckland-region-tāmaki-makaurau, łodź, poznań, málaga
    return new RegExp("^" + path.replace(/:([^\s/]+)/g, '(?<$1>[\\w-éóříšèöåäøāłźœńăá]+)') + "/?$")
}