<template>
    <div tabindex="0" class="collapse collapse-arrow border-base-200 bg-base-100 border my-3 w-full min-w-full">
        <div class="collapse-title flex flex-col w-full min-w-full px-2 py-0">
            <div>
                <div class="badge badge-ghost badge-sm">{{ timestampToStr(match.timestamp) }}</div>
            </div>
            <div class="text-lg font-bold">
                {{ match.ownClub.name }} vs {{ match.opponentClub.name }}
            </div>
        </div>
        <div class="collapse-content">
            asadf
        </div>
    </div>
</template>
<script setup lang="ts">
    import { computed, ref } from 'vue';
    import ClubMatch from '@models/match/ClubMatch'
    import {Result} from '@models/match/ClubMatch'
    const props = defineProps<{
        match: ClubMatch,
        index: number
        key
    }>()

    function timestampToStr(timestamp:number){
        const dt = new Date(timestamp*1000)
        var day = dt.getDate().toString()
        day = (day.toString().length==1) ? "0"+day : day
        var month = (dt.getMonth()+1).toString()
        month = (month.toString().length==1) ? "0"+month : month
        var h = dt.getHours().toString()
        h = (h.toString().length==1) ? "0"+h : h
        var m = dt.getMinutes().toString()
        m = (m.toString().length==1) ? "0"+m : m

        return day+"/"+month+"/"+dt.getFullYear()+" a las "+h+":"+m
    }
</script>