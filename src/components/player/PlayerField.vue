<template>
    <div class="bg-base-100 text-center rounded-lg shadow-md flex flex-col overflow-clip" v-on:click="clickPlayer(index,player)">
        <header class="relative">
            <div class="w-full container relative" v-on:mouseover="hovered=true"  v-on:mouseleave="hovered=false" >
                <img :src=topImage class="relative plimg select-none pointer-events-none w-4/6 h-full m-auto z-10" alt="Player ingame photo" :class="{
                    'plimghover': hovered
                }"/>
                <div class="top-0 absolute right-0 p-2 font-semibold text-8xl lg:text-9xl z-0 ">{{ player.proOverall }}</div>
            </div>
            <div class="absolute ploverlay w-full bg-base-100 bg-opacity-70 flex flex-col z-20" v-on:mouseover="hovered=true" v-on:mouseleave="hovered=false"
            :class="{
                    'plextrainfo-opened': hovered
                }">
                <p class="font-bold text-2xl">{{ player.name }}
                
                <svg class="w-6 fixed top-2 right-0 animate-bounce" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                :class="{
                    'invisible': hovered
                }">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 17-4-4-4 4m8-6-4-4-4 4"/>
                </svg>
                </p>
                <div role="contentinfo">
                    <p class="text-secondary dark:text-primary font-semibold text-xl">{{ player.favoritePosition }}</p>
                </div>
                <div class="plextrainfo-container" >
                    <div class="divider px-4 my-1"></div>
                    <div class="plextrainfo p-1">
                        <div class="flex md:text-lg">
                            <div class="w-full">
                                <p><strong>Partidos: </strong>{{ player.gamesPlayed }}</p>
                                <p><strong>Goles: </strong>{{ player.goals }}</p>
                                <p><strong>Total pases: </strong>{{ player.passesMade }}</p>
                                <p><strong>Val. Media: </strong>{{ player.ratingAve }}</p>
                            </div>
                            <div class="w-full">
                                <p><strong>Motm: </strong>{{ player.manOfTheMatch }}</p>
                                <p><strong>Asistencias: </strong>{{ player.assists }}</p>
                                <p><strong>Acierto pases: </strong>{{ player.passSuccessRate }}%</p>
                                <p><strong>Rojas: </strong>{{ player.redCards }}</p>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-primary my-1 md:my-2">Ver más</button>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>
<script setup lang="ts">
    import { computed, ref } from 'vue';
    import ClubMember from '@models/ClubMember';
    const props = defineProps<{
        player: ClubMember,
        index: number
        key
    }>()

    const hovered = ref(false)

    const emit = defineEmits({
        clickedPlayer: ({index, player}) => {return true}
    })

    function clickPlayer(index, player){
        emit('clickedPlayer', {index, player})
    }

    function trimDecimal(decimal:number, trim:number){
        return decimal.toFixed(trim)
    }

    const topImage = computed(() => {
        return `/players/${props.player.name}_top_transp.png`
    })


</script>
<style>

    .ploverlay{
        /*background: rgba(255,255,255,0);*/
        backdrop-filter: blur(4px);
        bottom: 0;
    }

    .plextrainfo-container{
        max-height: 0;
        overflow: hidden;
        transition: max-height 1s ease-in-out;
    }

    .plextrainfo-opened .plextrainfo-container{
        max-height: 100vh;
    }


    .plimg{
        aspect-ratio: 8/9;
    }

    .plimghover{
        scale: 1.025;
        transition: all 0.8s ease-in-out;
    }

</style>