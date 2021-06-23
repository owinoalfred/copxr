<template>
    <span>{{ text }}</span>
</template>

<script>
import { isSameDay } from 'date-fns'
import { parseISO, format } from '@/util/date'

export default {
    props: {
        start: String,
        end: String,
        type: { type: String, default: 'short' },
    },

    computed: {
        startDate() { return parseISO(this.start) },
        endDate() { return parseISO(this.end) },
        isSameDay() { return isSameDay(this.endDate, this.startDate) },

        text() {
            if (!this.startDate) {
                return ''
            }

            if (this.isSameDay) {
                if (this.type === 'long') {
                    if (this.endDate) {
                        return format(this.startDate, 'EEEE, MMMM dd, yyyy — p') + ' - ' + format(this.endDate, 'p')
                    }
                    return format(this.startDate, 'EEEE, MMMM dd, yyyy — p')
                }

                // Wed, Apr 8 at 8PM
                return format(this.startDate, 'EEE, MMM dd - p')
            }

            // Fri, Apr 24 - Apr 25
            if (this.endDate) {
                return format(this.startDate, 'EEE, MMM dd') + ' - ' + format(this.endDate, 'MMM dd')
            }
            return format(this.startDate, 'EEE, MMM dd')
        },
    },

    filters: {
        parseISO,
        format,
    },
}
</script>