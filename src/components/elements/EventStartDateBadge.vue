<template>
    <div class="h-16 w-16 m-auto font-header text-3xl bg-white rounded-lg shadow-md flex flex-col items-center justify-center leading-none">
        <div
            class="h-5 w-full rounded-t-lg text-sm tracking-widest text-white flex flex-col items-center justify-center"
            :class="bottomColorClass"
        >{{ startDate | parseISO | format('MMM') }}</div>
        
        <div
            class="flex-1 flex flex-col items-center justify-center"
        >{{ startDate | parseISO | format('dd') }}</div>
    </div>
</template>

<script>
import { parseISO } from 'date-fns'
import { format } from '@/util/date'

export default {
    props: {
        startDate: String,
        bottomColorClass: String,
    },
    filters: {
        parseISO,
        format,
    },
}
</script>