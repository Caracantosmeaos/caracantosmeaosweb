<template>
    <div v-if="status==200">
        <div class="flex w-full  flex-col items-center justify-center align-middle" v-if="!isLoading">
            <p class="w-full text-5xl md:text-6xl font-bold text-center" :class="resultColor">{{ reverseResult.get(match.result).toUpperCase() }}</p>
            <div class="items-center justify-center align-middle h-full w-full p-4 hidden md:flex">
                <p class="text-end self-center font-medium text-2xl">{{match.localClub.name}}</p>
                <p class="text-end font-extrabold text-4xl  ml-4">{{ match.localClub.matchStats.goals }}</p>
                <div class="self-center justify-self-center text-lg font-bold mx-6 relative text-center">
                    :
                </div>
                <p class="text-end font-extrabold text-4xl  mr-4">{{ match.awayClub.matchStats.goals }}</p>
                <p class="text-end self-center font-medium text-2xl">{{match.awayClub.name}}</p>
            </div>
            <div class="items-center justify-center align-middle h-full w-full p-4 flex flex-col md:hidden mt-2">
                <div class="items-center justify-center align-middle h-full w-full flex">
                    <p class="text-end self-center font-medium text-2xl">{{match.localClub.name}}</p>
                    <p class="text-end font-extrabold text-4xl  ml-4">{{ match.localClub.matchStats.goals }}</p>
                </div>
                <div class="self-center justify-self-center text-lg font-bold my-2 relative text-center">
                    vs
                </div>
                <div class="items-center justify-center align-middle h-full w-full flex">
                    <p class="text-end self-center font-medium text-2xl">{{match.awayClub.name}}</p>
                    <p class="text-end font-extrabold text-4xl  ml-4">{{ match.awayClub.matchStats.goals }}</p>
                </div>
            </div>

            <FootbalField :players="players" :selectedplayer="selectedPlayer" @selectplayer="selectedPlayer = $event" class="mt-4"></FootbalField>
        </div>
    </div>
    <div class="flex flex-col h-full overflow-hidden" v-else-if="!isLoading">
        <h3 class="text-center text-2xl p-3">No se ha podido obtener los datos del partido :/</h3>
        <div class="flex place-content-center p-6">
            <img src="/illustrations/bugfixingsvg.svg" class="lg:w-2/3 w-full select-none pointer-events-none" alt="Image representing error">
        </div>
    </div>
</template>
<script setup lang="ts">
    import { computed, onBeforeMount, ref, type Ref } from 'vue';
    import ClubMember from '@/model/ClubMemberEntity';
    import ClubMatchService from '@services/ClubMatchService';
    import ClubMatchEntity, {Result} from '@models/match/ClubMatchEntity'
    import FootbalField from './FootbalField.vue';   
    import type MatchPlayerEntity from '@/model/match/MatchPlayerEntity';
    
    const props = defineProps<{
        matchId: number
    }>()
    
    const selectedPlayer = ref<number>(0)

    const matchService = new ClubMatchService(props.matchId)
    const match:Ref<ClubMatchEntity> = matchService.getData()
    const isLoading = matchService.isloading
    const status = matchService.getStatus()

    const reverseResult = new Map<string, Result>();
    Object.keys(Result).forEach((pos: Result) => {
    const modeValue: string = Result[pos as any];
    reverseResult.set(modeValue, pos);
    });

    function trimDecimal(decimal:number, trim:number){
        return decimal.toFixed(trim)
    }

    /*const topImage = computed(() => {
        return `/players/${props.player.playerName}_top_transp.png`
    })*/

    function defaultTopImage(e){
        e.target.src = '/players/placeholder_top_transp.png'
    }

    const resultColor = computed((local?)=>{
        let resp = {
            'text-error': match.value.result=="loose",
            'text-success': match.value.result=="win"
        }
        return resp
    })

    /**OWN COPYPASTE FROM MATCHFIELD :D */
    function getRedCardPlayers(localclub:boolean){
        var plist = []
        if(localclub){
            for(var p in match.value.localClub.players){
                var parsedp:MatchPlayerEntity = match.value.localClub.players[p]
                if(parsedp.redCards!=0) plist.push(parsedp.playername);
            }
        }else{
            for(var p in match.value.awayClub.players){
                var parsedp:MatchPlayerEntity = match.value.awayClub.players[p]
                if(parsedp.redCards!=0) plist.push(parsedp.playername)
            }
        }
        return plist
    }

    const players = computed(() => {
        return match.value.localTeam ? match.value.localClub.players : match.value.awayClub.players
    });
    
    onBeforeMount(async ()=>{
        await matchService.fetch()
    })

</script>