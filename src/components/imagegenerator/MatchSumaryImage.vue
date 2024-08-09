<template>
    <div v-if="status==200">
        <div id="to_image" class="toimage bg-green-500" v-if="!isLoading">
            OK
        </div>
    </div>
    <div id="to_image" class="toimage flex flex-col  h-full" v-else>
        <div class="m-auto p-28 pb-0 h-full">
            <p class="text-center font-bold text-5xl text-error">Ha ocurrido un error al generar la imágen</p>
        </div>
        <div class="flex place-content-center p-28 pt-4 h-full">
            <img src="/illustrations/bugfixingsvg.svg" class="select-none pointer-events-none" alt="Image representing error">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, type Ref, onBeforeMount, onMounted, computed } from 'vue';
import ClubMatchService from '@services/ClubMatchService';
import ClubMatchEntity, {Result} from '@models/match/ClubMatchEntity'

const props = defineProps<{
        matchId: number
    }>()

const matchService = new ClubMatchService(props.matchId)
const match:Ref<ClubMatchEntity> = matchService.getData()
const isLoading = matchService.isloading
const status = matchService.getStatus()

onBeforeMount(async ()=>{
    await matchService.fetch()
})
</script>

<style scoped>
    .toimage{
        width: 1920px;
        height: 1080px;
    }
</style>