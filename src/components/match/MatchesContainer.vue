<template>
    <div v-if="isloading">
        <p>asdasd</p>
    </div>
    <div v-else>
        <p>b</p>
    </div>
</template>

<script lang="ts" setup>
    import { onBeforeMount, type Ref, ref, watch, computed, type ComputedRef, onMounted } from 'vue';
    import ClubMatchService from '@services/ClubMatchService';
    import ClubMatch from '@models/match/ClubMatch'

    const matchService = new ClubMatchService("league")
    const matches:Ref<ClubMatch[]> = matchService.getData()
    const isloading = matchService.isloading
    const errorText = matchService.getError()
    const hasError:Boolean = (errorText.value=='') ? false : true


    onBeforeMount(async ()=>{
        await matchService.fetch()
        console.log(matches)
    })
</script>