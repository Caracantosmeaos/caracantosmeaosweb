<template>
    <div v-if="status==200">
        <div id="to_image" class="toimage flex w-full flex-initial overflow-hidden" v-if="!isLoading">
            <div class="w-7/12 flex-initial flex flex-col">
                <p class="w-full text-9xl font-extrabold text-center" :class="resultColor">{{ reverseResult.get(match.result).toUpperCase() }}</p>
                <div class="my-2 w-full flex-initial flex p-1 h-full flex-nowrap items-center place-content-evenly">
                    <div v-for="p in sortedPlayers" class="text-3xl text-center">
                        <div class="backdrop-blur-md bg-base-300/50 mx-6 rounded-xl">
                            <div class="flex w-full text-center self-centeralign-middle place-content-center">
                                <svg  v-if="p.manOfTheMatch" xmlns="http://www.w3.org/2000/svg" class="mr-1 w-10 h-11 text-primary" width="24" height="24" fill="currentColor" viewBox="0 -960 960 960" ><path d="m363-310 117-71 117 71-31-133 104-90-137-11-53-126-53 126-137 11 104 90-31 133ZM480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-112 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"/></svg>
                                <p class="text-primary font-semibold text-center">{{ p.playername }}</p>
                            </div>
                            <p class="text-neutral-content">{{ p.rating }}</p>
                        </div>
                        <img :src="'/players/' + p.playername + '_full_transp.png'" class="" alt="Player ingame photo" 
                        @error="defaultTopImage"/>
                    </div>
                </div>
            </div>
            <div class="w-5/12 h-full min-h-full max-h-full flex flex-col flex-initial justify-stretch backdrop-blur-md bg-base-300/75 rounded-l-2xl overflow-hidden">
                <div class="w-full grid grid-cols-12 grid-rows-1 content-center justify-center items-center bg-base-300 dark:bg-base-100">
                    <p class="col-span-9 text-6xl overflow-hidden truncate px-1">{{ match.localClub.name }}</p>
                    <p class="col-span-3 bg-base-100 dark:bg-base-300 text-9xl font-extrabold text-center text-primary py-5">{{ match.localClub.matchStats.goals }}</p>
                </div>
                <div class="h-full w-full flex flex-col flex-initial">
                    <div class="w-full h-full flex overflow-hidden flex-initial">
                        <div class="w-9/12 h-full flex-col px-12 py-6 flex-initial place-content-center">
                            <div class="w-full flex py-1" v-for="player in match.localClub.players">
                                <div v-if="player.redCards!=0" class="bg-error w-6 h-10 mr-2 rounded-sm"></div>
                                <svg  v-if="player.manOfTheMatch" xmlns="http://www.w3.org/2000/svg" class="mr-1 w-10 h-11 text-primary" width="24" height="24" fill="currentColor" viewBox="0 -960 960 960" ><path d="m363-310 117-71 117 71-31-133 104-90-137-11-53-126-53 126-137 11 104 90-31 133ZM480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-112 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"/></svg>
                                <span class="text-4xl dark:text-primary mr-4">{{ player.playername }}</span>
                                <svg v-for="g in player.goals" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m414-168 12-56q3-13 12.5-21.5T462-256l124-10q13-2 24 5t16 19l16 38q39-23 70-55.5t52-72.5l-12-6q-11-8-16-19.5t-2-24.5l28-122q3-12 12.5-20t21.5-10q-5-25-12.5-48.5T764-628q-9 5-19.5 4.5T726-630l-106-64q-11-7-16-19t-2-25l8-34q-31-14-63.5-21t-66.5-7q-14 0-29 1.5t-29 4.5l30 68q5 12 2.5 25T442-680l-94 82q-10 9-23.5 10t-24.5-6l-92-56q-23 38-35.5 81.5T160-480q0 16 4 52l88-8q14-2 25.5 4.5T294-412l48 114q5 12 2.5 25T332-252l-38 32q27 20 57.5 33t62.5 19Zm72-172q-13 2-24-5t-16-19l-54-124q-5-12-1.5-25t13.5-21l102-86q9-9 22-10t24 6l112 66q11 7 17 19t3 25l-32 130q-3 13-12 21.5T618-352l-132 12Zm-6 260q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                                <svg v-for="a in player.assists" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M484-120q-17 0-28.5-11.5T444-160q0-7 3-14.5t9-13.5l185-185-29-29-184 185q-6 6-13 9t-15 3q-17 0-28.5-11.5T360-245q0-10 3-16.5t8-11.5l185-185-28-28-185 184q-6 6-13 9t-16 3q-16 0-28-12t-12-28q0-8 3-15t9-13l185-185-29-28-184 185q-5 5-12 8t-17 3q-17 0-28.5-11.5T189-415q0-8 3-15t9-13l223-223 150 151q11 11 26 17.5t30 6.5q32 0 56-22.5t24-57.5q0-14-5-29t-18-28L508-807q17-16 38-24.5t42-8.5q26 0 48 8.5t40 26.5l169 170q18 18 26.5 40t8.5 51q0 20-9 40.5T845-466L512-132q-8 8-14 10t-14 2ZM141-440l-26-26q-17-16-26-38t-9-46q0-26 10-48t25-37l169-170q16-16 38-25.5t43-9.5q27 0 48 7.5t41 27.5l205 205q6 6 9 13t3 15q0 16-12 28t-28 12q-9 0-15-2.5t-13-9.5L423-722 141-440Z"/></svg>
                            </div>
                        </div>
                        <div class="w-3/12 flex flex-col-reverse bg-base-200 rounded-bl-xl justify-evenly py-1">
                            <div class="w-full justify-center align-middle text-center">
                                <span class="text-primary text-3xl font-light">DISPAROS</span>
                                <p class="text-8xl ">{{ match.localClub.matchStats.shots }}</p>
                            </div>
                            <div class="w-full justify-center align-middle text-center">
                                <span class="text-primary text-3xl font-light">PASES</span>
                                <p class="text-8xl ">{{ match.localClub.matchStats.passesMade }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="w-full divider divider-neutral px-2"></div>
                    <div class="w-full h-full flex">
                        <div class="w-9/12 flex-col px-12 py-6 flex-initial place-content-center ">
                            <div class="w-full flex py-1" v-for="player in match.awayClub.players">
                                <div v-if="player.redCards!=0" class="bg-error w-6 h-10 mr-2 rounded-sm"></div>
                                <svg  v-if="player.manOfTheMatch" xmlns="http://www.w3.org/2000/svg" class="mr-1 w-10 h-11 text-primary" width="24" height="24" fill="currentColor" viewBox="0 -960 960 960" ><path d="m363-310 117-71 117 71-31-133 104-90-137-11-53-126-53 126-137 11 104 90-31 133ZM480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-112 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"/></svg>
                                <span class="text-4xl dark:text-primary mr-4">{{ player.playername }}</span>
                                <svg v-for="g in player.goals" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m414-168 12-56q3-13 12.5-21.5T462-256l124-10q13-2 24 5t16 19l16 38q39-23 70-55.5t52-72.5l-12-6q-11-8-16-19.5t-2-24.5l28-122q3-12 12.5-20t21.5-10q-5-25-12.5-48.5T764-628q-9 5-19.5 4.5T726-630l-106-64q-11-7-16-19t-2-25l8-34q-31-14-63.5-21t-66.5-7q-14 0-29 1.5t-29 4.5l30 68q5 12 2.5 25T442-680l-94 82q-10 9-23.5 10t-24.5-6l-92-56q-23 38-35.5 81.5T160-480q0 16 4 52l88-8q14-2 25.5 4.5T294-412l48 114q5 12 2.5 25T332-252l-38 32q27 20 57.5 33t62.5 19Zm72-172q-13 2-24-5t-16-19l-54-124q-5-12-1.5-25t13.5-21l102-86q9-9 22-10t24 6l112 66q11 7 17 19t3 25l-32 130q-3 13-12 21.5T618-352l-132 12Zm-6 260q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                                <svg v-for="a in player.assists" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M484-120q-17 0-28.5-11.5T444-160q0-7 3-14.5t9-13.5l185-185-29-29-184 185q-6 6-13 9t-15 3q-17 0-28.5-11.5T360-245q0-10 3-16.5t8-11.5l185-185-28-28-185 184q-6 6-13 9t-16 3q-16 0-28-12t-12-28q0-8 3-15t9-13l185-185-29-28-184 185q-5 5-12 8t-17 3q-17 0-28.5-11.5T189-415q0-8 3-15t9-13l223-223 150 151q11 11 26 17.5t30 6.5q32 0 56-22.5t24-57.5q0-14-5-29t-18-28L508-807q17-16 38-24.5t42-8.5q26 0 48 8.5t40 26.5l169 170q18 18 26.5 40t8.5 51q0 20-9 40.5T845-466L512-132q-8 8-14 10t-14 2ZM141-440l-26-26q-17-16-26-38t-9-46q0-26 10-48t25-37l169-170q16-16 38-25.5t43-9.5q27 0 48 7.5t41 27.5l205 205q6 6 9 13t3 15q0 16-12 28t-28 12q-9 0-15-2.5t-13-9.5L423-722 141-440Z"/></svg>
                            </div>
                        </div>
                        <div class="w-3/12 flex flex-col bg-base-200 rounded-tl-xl justify-evenly py-1">
                            <div class="w-full justify-center align-middle text-center">
                                <span class="text-primary text-3xl font-light">DISPAROS</span>
                                <p class="text-8xl">{{ match.awayClub.matchStats.shots }}</p>
                            </div>
                            <div class="w-full justify-center align-middle text-center">
                                <span class="text-primary text-3xl font-light">PASES</span>
                                <p class="text-8xl">{{ match.awayClub.matchStats.passesMade }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full grid grid-cols-12 grid-rows-1 content-center justify-center items-center bg-base-300 dark:bg-base-100 place-self-end">
                    <p class="col-span-9 text-6xl overflow-hidden truncate px-1">{{ match.awayClub.name }}</p>
                    <p class="col-span-3 bg-base-100 dark:bg-base-300 text-9xl font-extrabold text-center text-primary py-5">{{ match.awayClub.matchStats.goals }}</p>
                </div>
            </div>
        </div>
    </div>
    <div id="to_image" class="toimage flex flex-col  h-full" v-else-if="!isLoading">
        <div class="m-auto p-28 pb-0 h-full">
            <p class="text-center font-bold text-5xl text-error">Ha ocurrido un error al generar la imágen</p>
        </div>
        <div class="flex place-content-center p-28 pt-4 h-full">
            <img src="/illustrations/bugfixingsvg.svg" class="select-none pointer-events-none" alt="Image representing error">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, type Ref, computed } from 'vue';
import ClubMatchService from '@services/ClubMatchService';
import ClubMatchEntity, {Result} from '@models/match/ClubMatchEntity'

const props = defineProps<{
        matchId: number
    }>()

const matchService = new ClubMatchService(props.matchId)
const match:Ref<ClubMatchEntity> = matchService.getData()
const isLoading = matchService.isloading
const status = matchService.getStatus()

const reverseResult = new Map<string, Result>();
Object.keys(Result).forEach((pos: Result) => {
const modeValue: string = Result[pos as any];
reverseResult.set(modeValue, pos);
});

const resultColor = computed((local?)=>{
    let resp = {
        'text-error': match.value.result=="loose",
        'text-lime-500': match.value.result=="win"
    }
    return resp
})

const sortedPlayers = computed(() => {
    const plys = match.value.localTeam ? match.value.localClub.players : match.value.awayClub.players

    const mvpPl = plys.find(item => item.manOfTheMatch);
    const filteredPlys = plys.filter(item => !item.manOfTheMatch);

    if (mvpPl) {
        const middleIndex = Math.floor(filteredPlys.length / 2);
        
        return [
        ...filteredPlys.slice(0, middleIndex),
        mvpPl,
        ...filteredPlys.slice(middleIndex)
        ];
  }else return plys;
});

function defaultTopImage(e){
        e.target.src = '/players/placeholder_full_transp.png'
    }

</script>

<style scoped>
    .toimage{
        width: 1920px;
        height: 1080px;
        background-image: url("/vestuario_blurred_1920x1080.jpg");
    }
</style>