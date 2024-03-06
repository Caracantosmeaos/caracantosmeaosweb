<template>
<!-- <div role="container" v-if="isloading">Cargando...</div> -->
<div role="container" v-if="!hasError" class="flex flex-wrap  p-6 md:p-10 lg:p-12 justify-center items-center h-fit">

    <div role="container" class="flex flex-col justify-between gap-16 items-center p-12 basis-2/2 lg:basis-1/2 h-full w-full statsleft">
        <div class="stats stats-vertical lg:stats-horizontal shadow-md w-full">
            <div class="stat dark:bg-base-200">
                <div class="stat-figure text-secondary">
                    <svg class="inline-block w-8 h-8 stroke-current text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-width="2" d="M11 5.1a1 1 0 0 1 2 0l1.7 4c.1.4.4.6.8.6l4.5.4a1 1 0 0 1 .5 1.7l-3.3 2.8a1 1 0 0 0-.3 1l1 4a1 1 0 0 1-1.5 1.2l-3.9-2.3a1 1 0 0 0-1 0l-4 2.3a1 1 0 0 1-1.4-1.1l1-4.1c.1-.4 0-.8-.3-1l-3.3-2.8a1 1 0 0 1 .5-1.7l4.5-.4c.4 0 .7-.2.8-.6l1.8-4Z"/>
                    </svg>
                </div>
                <div class="stat-title">Habilidad</div>
                <div class="stat-value">
                    <div v-if="isloading" class="skeleton dark:bg-base-100  w-full h-10 skeletondark"></div>
                    <count-up v-else :end-val="stats.skillRating"></count-up>
                </div>
            </div>
            <div class="stat dark:bg-base-200">
                <div class="stat-figure text-secondary">
                    <svg class="inline-block w-8 h-8 stroke-current text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4.5V19c0 .6.4 1 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.2M20 9v3.2"/>
                    </svg>
                </div>
                <div class="stat-title">Mejor división</div>
                <div class="stat-value">
                    <div v-if="isloading" class="skeleton dark:bg-base-100 dark:skeletondark  w-full h-10"></div>
                    <span v-else>{{stats.bestDivision}}</span>
                </div>
            </div>
        </div>
        <div class="stats stats-vertical lg:stats-horizontal shadow-md w-full">
            <div class="stat dark:bg-base-200">
                <div class="stat-figure text-secondary">
                    <svg class="inline-block w-8 h-8 stroke-current text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.1 17.6A7.2 7.2 0 0 1 12 21a6.6 6.6 0 0 1-5.8-3c-2.7-4.6.3-8.8.9-9.7A4.4 4.4 0 0 0 8 4c1.3 1 6.4 3.3 5.5 10.6 1.5-1.1 2.7-3 2.9-6.2 1.4 1 4 5.5 1.7 9.2Z"/>
                    </svg>
                </div>
                <div class="stat-title">Racha victorias</div>
                <div class="stat-value">
                    <div v-if="isloading" class="skeleton dark:bg-base-100 dark:skeletondark w-16 h-10"></div>
                    <count-up v-else :end-val="stats.winstreak"></count-up>
                </div>
            </div>
            <div class="stat dark:bg-base-200">
                <div class="stat-figure text-secondary">
                    <svg class="inline-block w-8 h-8 stroke-current text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.5 11.5 11 13l4-3.5M12 20A16.4 16.4 0 0 1 5 6.7L12 4l7 2.7A16.7 16.7 0 0 1 12 20Z"/>
                    </svg>
                </div>
                <div class="stat-title">Racha Imbatidos</div>
                <div class="stat-value">
                    <div v-if="isloading" class="skeleton dark:bg-base-100 dark:skeletondark  w-16 h-10 "></div>
                    <count-up v-else :end-val="stats.unbeatenstreak"></count-up>
                </div>
            </div>
        </div>
    </div>
    <div role="container" class="flex flex-wrap p-8 basis-2/2 lg:basis-1/2 h-full w-full align-middle justify-center items-center">
        <div id="donutchartnotloaded" v-if="isloading" role="container" class="flex flex-col w-full lg:w-8/12 justify-start items-center dark:bg-base-200 dark:shadow rounded-xl shadow-lg  p-6 h-full statsright">
            <div class="w-full flex flex-col justify-center align-middle items-center">
                <div class="md:hidden w-full flex flex-col justify-center align-middle items-center">
                    <div class="skeleton dark:bg-base-100 dark:skeletondark w-2/3 h-8 p-2"></div>
                    <div class="skeleton dark:bg-base-100 dark:skeletondark w-2/3 h-8 p-2"></div>
                    <div class="skeleton dark:bg-base-100 dark:skeletondark w-2/3 h-8 p-2"></div>
                </div>
                
                <div class="hidden lg:block skeleton dark:bg-base-100 dark:skeletondark w-full h-8 p-2 "></div>

            </div>
            <div class="pt-10">
                <div class="skeleton dark:bg-base-100 dark:skeletondark w-48 h-48 rounded-full"></div>
            </div>
        </div>
        <div v-else class="statsright">
            <div class="hidden dark:block dark:bg-base-200 rounded-xl shadow-md  p-6 statsright">
                <vc-donut 
                :sections="donutsections" 
                :background="'#1D232A'" 
                :thickness=25
                :has-legend="true" legend-placement="top"
                :auto-adjust-text-size="true"
                >
                    <div>
                        <count-up class="text-base-content font-bold text-4xl hover:text-6xl text-center" :end-val="gamesData.played"></count-up>
                        <p>Partidos</p>
                    </div>
                </vc-donut>
            </div>
            <div class="dark:hidden dark:bg-base-200 rounded-xl shadow-md  p-6 statsright">
                <vc-donut
                :sections="donutsections" 
                :thickness=25
                :has-legend="true" legend-placement="top"
                :auto-adjust-text-size="true"
                >
                    <div>
                        <count-up class="text-base-content font-bold text-4xl text-center" :end-val="gamesData.played"></count-up>
                        <p>Partidos</p>
                    </div>
                </vc-donut>
            </div>
        </div>
    </div>


</div>
<div v-else>Error: {{ errorText }}</div>

</template>

<script lang="ts" setup>
    import ClubStatsService from '@services/ClubStatsService';
    import { onBeforeMount, computed, watch, reactive, ref } from 'vue';
    import CountUp from 'vue-countup-v3'


    const statsService = new ClubStatsService()
    const stats = statsService.getData()
    const isloading = statsService.isloading
    const errorText = statsService.getError()
    const hasError:Boolean = (errorText.value=='') ? false : true


    const gamesData = reactive({
        wins: 0,
        losses: 0,
        ties: 0,
        played: 0

    })


    watch(stats, (newStats) =>{
        if(newStats && (newStats.wins!=null || newStats.wins!=undefined)){
            gamesData.wins = newStats.wins
            gamesData.played = newStats.gamesPlayed
            gamesData.losses = newStats.losses
            gamesData.ties = newStats.ties
            donutsections.value = [
                {label:`Victorias:  ${gamesData.wins} (${trimDecimal(winsPercent.value)}%)`, value: winsPercent, color: '#00A96E'},
                {label:`Derrotas:  ${gamesData.losses} (${trimDecimal(lossesPercent.value)}%)`, value: lossesPercent, color: '#FF5861'},
                {label:`Empates:  ${gamesData.ties} (${trimDecimal(tiesPercent.value)}%)`, value: tiesPercent, color: '#A6ADBB'}
            ]
        }
    })

    const winsPercent = computed( ()=>{
        return (gamesData.wins / gamesData.played) * 100
    })

    const lossesPercent = computed( ()=>{
        return (gamesData.losses / gamesData.played) * 100
    })

    const tiesPercent = computed( ()=>{
        return (gamesData.ties / gamesData.played) * 100
    })

    const donutsections = ref([])

    function trimDecimal(decimal:number){
        return decimal.toFixed(0)
    }


    onBeforeMount(async ()=>{
        await statsService.fetch()
    })
</script>

<style>

@tailwind base;
@tailwind components;
@tailwind utilities;

    @keyframes stats-zoomin-anim {
        from{
            opacity: 0.1;
            scale: 0;
        }
		to {
			opacity: 1;
            scale: 1;
		}
	}
    @keyframes stats-slide-anim {
        from{
            opacity: 0.5;
            transform: translateX(100%);
        }
		to {
			opacity: 1;
		}
	}
    .statsleft {
		animation:  stats-zoomin-anim linear both;
		animation-timeline: view(y);
        animation-range: entry;
        animation-delay: 600ms;
	}
    .statsright {
		animation:  stats-slide-anim linear both;
		animation-timeline: view(y);
        /*animation-range: entry contain 33%;*/
        animation-range: entry;
        animation-delay: 600ms;
	}

    @layer components{
        .skeletondark{
            background-image: linear-gradient( 105deg, transparent 0%, transparent 35%, rgba(108, 108, 108, 0.2)50%, transparent 65%, transparent 100% );
        }
    }

</style>