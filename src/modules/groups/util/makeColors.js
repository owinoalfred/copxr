const options = ['light-blue', 'warm-yellow', 'khaki', 'red', 'dark-blue', 'pink', 'purple', 'lemon', 'green']

/**
 * 
 * @param { number } length 
 */
export default function makeColors(length) {
    const colors = []
    for (let index = 0; index < length; index++) {
        const color = options[index % options.length]
        colors[index] = color
    }
    return colors
}

export function getColor(key) {
    const bytes = key.split('').reduce((acc, val) => acc + val.charCodeAt(0), 0)
    return options[bytes % options.length]
}

export function topColorClass(color) {
    switch (color) {
        case 'lemon':
            return 'bg-lemon-300'
        case 'khaki':
            return 'bg-khaki-300'
        case 'warm-yellow':
            return 'bg-yellow-400'
        case 'pink':
            return 'bg-pink-300'
        case 'green':
            return 'bg-green-500'
        case 'purple':
            return 'bg-purple-500'
        case 'red':
            return 'bg-red-400'
        case 'dark-blue':
            return 'bg-blue-700'
        case 'light-blue':
        default:
            return 'bg-blue-200'
    }
}

export function bottomColorClass(color) {
    switch (color) {
        case 'lemon':
            return 'bg-lemon-500'
        case 'khaki':
            return 'bg-khaki-500'
        case 'warm-yellow':
            return 'bg-yellow-700'
        case 'pink':
            return 'bg-pink-400'
        case 'green':
            return 'bg-green-600'
        case 'purple':
            return 'bg-purple-600'
        case 'red':
            return 'bg-red-500'
        case 'dark-blue':
            return 'bg-blue-800'
        case 'light-blue':
        default:
            return 'bg-blue-300'
    }
}
