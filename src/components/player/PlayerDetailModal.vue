<script setup lang="ts">
    import { computed, onBeforeMount, onMounted, ref} from 'vue';
    import ClubMember from '@models/ClubMember'
    import CountUp from 'vue-countup-v3'
    const dialog = ref<HTMLDialogElement>();
    const props = defineProps<{
        player: ClubMember
    }>()

    const emit = defineEmits([
        'detailModalClosed'
    ])

    function modalClosed(){
        emit('detailModalClosed')
    }


    const showModal = () => {
        dialog.value?.showModal();
    };


    function trimDecimal(decimal:number, trim:number){
        return decimal.toFixed(trim)
    }

    const fullImage = computed(() => {
        return `/players/${props.player.name}_full_transp.png`
    })


    onMounted(async ()=>{
        showModal()
    })

</script>
<template>
    <dialog ref="dialog" id="modal" class="modal modal-middle p-2 lg:p-4" @close="modalClosed()">
        <div class="modal-box overflow-hidden p-1">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost fixed right-1 top-1">✕</button>
            </form>
            <header>
                <h3 class="font-bold text-xl text-primary text-center">{{ player.name }} <span class="font-semibold text-lg text-base-content">({{ player.proName }})</span></h3>
                <h4 class="text-md text-center">{{ player.favoritePosition }} <span class="font-semibold">({{ player.proOverall }})</span></h4>
            </header>
            <section class="hidden lg:flex content-center mt-2">
                <div class="w-full">
                    <img :src=fullImage class="select-none pointer-events-none h-full m-auto  drop-shadow-lg" alt="Player ingame photo" />
                </div>
                <div class="text-center w-full">a</div>
            </section>
            <section class="lg:hidden p-2 ">
                <div class="relative flex container w-full p-2 px-4 overflow-auto">
                    <div class="absolute divider divider-horizontal h-full min-h-full p-1 m-1 z-10 text-primary">
                        {{ player.proHeight }} cm
                    </div>
                    <img :src=fullImage class="relative plimg select-none pointer-events-none w-4/6" alt="Player ingame photo">
                    <div class="absolute z-20 right-0 top-0 w-6/12  ploverlay  rounded-lg overflow-clip">
                        <div class="font-semibold w-full flex content-center align-middle h-full space-x-1 overflow-hidden">
                            <p class="self-center w-full text-clip text-pretty">Partidos jugados </p>
                            <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.gamesPlayed" class="inline"></count-up></p>
                        </div>
                        <div class="font-semibold w-full flex content-center align-middle h-full space-x-1 overflow-hidden">
                            <p class="self-center w-full text-clip text-pretty">Porcentaje ganados </p>
                            <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.winRate" :decimal-places="1" class="inline"></count-up>%</p>
                        </div>
                        <div class="font-semibold w-full flex content-center align-middle h-full space-x-1 overflow-hidden">
                            <p class="self-center w-full text-clip text-pretty">Mejor del partido </p>
                            <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.manOfTheMatch" class="inline"></count-up></p>
                        </div>
                        <div class="font-semibold w-full flex content-center align-middle h-full space-x-1 overflow-hidden">
                            <p class="self-center w-full text-clip text-pretty">Mejor del partido (%)</p>
                            <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.manOfTheMatchPercent" :decimal-places="1" class="inline"></count-up>%</p>
                        </div>
                        <div class="font-semibold w-full flex content-center align-middle h-full space-x-1 overflow-hidden">
                            <p class="self-center w-full text-clip text-pretty">Valoración media </p>
                            <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.ratingAve" :decimal-places="1" class="inline"></count-up></p>
                        </div>
                        <div class="font-semibold w-full flex content-center align-middle h-full space-x-1 overflow-hidden">
                            <p class="self-center w-full text-clip text-pretty">tarjetas rojas </p>
                            <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.redCards" :decimal-places="0" class="inline"></count-up></p>
                        </div>
                        <div class="divider p-0 m-0"></div>
                        <div class="font-semibold w-full flex content-center align-middle h-full space-x-1 overflow-hidden">
                            <p class="self-center w-full text-clip text-pretty">Goles </p>
                            <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.goals" class="inline"></count-up></p>
                        </div>
                        <div class="font-semibold w-full flex content-center align-middle h-full space-x-1 overflow-hidden">
                            <p class="self-center w-full text-clip text-pretty">Goles por partido</p>
                            <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.goalsPerMatch" :decimal-places="2" class="inline"></count-up></p>
                        </div>
                        <div class="font-semibold w-full flex content-center align-middle h-full space-x-1 overflow-hidden">
                            <p class="self-center w-full text-clip text-pretty">Disparos convertidos (%)</p>
                            <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.shotSuccessRate" :decimal-places="1" class="inline"></count-up>%</p>
                        </div>
                        <div class="font-semibold w-full flex content-center align-middle h-full space-x-1 overflow-hidden">
                            <p class="self-center w-full text-clip text-pretty">Asistencias </p>
                            <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.assists" class="inline"></count-up></p>
                        </div>
                        <div class="font-semibold w-full flex content-center align-middle h-full space-x-1 overflow-hidden">
                            <p class="self-center w-full text-clip text-pretty">Asistencias por partido</p>
                            <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.assistsPerMatch" :decimal-places="2" class="inline"></count-up></p>
                        </div>
                        <div class="divider p-0 m-0"></div>
                        <div class="font-semibold w-full flex content-center align-middle h-full space-x-1 overflow-hidden">
                            <p class="self-center w-full text-clip text-pretty">Pases totales</p>
                            <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.passesMade" :decimal-places="0" class="inline"></count-up></p>
                        </div>
                        <div class="font-semibold w-full flex content-center align-middle h-full space-x-1 overflow-hidden">
                            <p class="self-center w-full text-clip text-pretty">Pases exitosos</p>
                            <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.passesSuccess" :decimal-places="0" class="inline"></count-up></p>
                        </div>
                        <div class="divider p-0 m-0"></div>
                        <div class="font-semibold w-full flex content-center align-middle h-full space-x-1 overflow-hidden">
                            <p class="self-center w-full text-clip text-pretty">Tacklees totales</p>
                            <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.tacklesMade" :decimal-places="0" class="inline"></count-up></p>
                        </div>
                        <div class="font-semibold w-full flex content-center align-middle h-full space-x-1 overflow-hidden">
                            <p class="self-center w-full text-clip text-pretty">Tacklees existosos</p>
                            <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.tacklesSuccess" :decimal-places="0" class="inline"></count-up></p>
                        </div>
                        <div class="font-semibold w-full flex content-center align-middle h-full space-x-1 overflow-hidden">
                            <p class="self-center w-full text-clip text-pretty">Tacklees existosos (%)</p>
                            <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.tackleSuccessRate" :decimal-places="1" class="inline"></count-up>%</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </dialog>
</template>

<style scoped>

.plimg{
        aspect-ratio: 40/97;
    }

.ploverlay{
    /*background: rgba(0, 0, 0, 0.155);*/
    backdrop-filter: blur(50px);
}

</style>