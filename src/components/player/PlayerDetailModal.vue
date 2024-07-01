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


    const fullImage = computed(() => {
        return `/players/${props.player.name}_full_transp.png`
    })

    function defaultFullImage(e){
        e.target.src = '/players/placeholder_full_transp.png'
    }


    onMounted(async ()=>{
        showModal()
    })

</script>
<template>
    <dialog ref="dialog" id="modal" class="modal modal-middle p-2 lg:p-4" @close="modalClosed()">
        <div class="modal-box overflow-hidden p-1 w-full">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost fixed right-1 top-1">✕</button>
            </form>
            <header>
                <h3 class="font-bold text-xl text-primary text-center">{{ player.name }} <span class="font-semibold text-lg text-base-content">({{ player.proName }})</span></h3>
                <h4 class="text-md text-center">{{ player.favoritePosition }} <span class="font-semibold">({{ player.proOverall }})</span></h4>
            </header>
            <section class="hidden lg:flex content-center mt-2 w-full">
                <div class="w-full">
                    <img :src=fullImage class="select-none pointer-events-none h-full m-auto  w-full drop-shadow-lg" alt="Player ingame photo" @error="defaultFullImage" />
                </div>
                <div class="text-center w-full p-2 flex flex-col ">
                    <div class="flex px-2 ">
                            <div class="flex flex-col text-left space-y-2 ">
                                <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                    <p class="self-center w-full text-clip text-pretty">Pases totales</p>
                                    <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.passesMade" :decimal-places="0" class="inline"></count-up></p>
                                </div>
                                <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                    <p class="self-center w-full text-clip text-pretty">Pases exitosos</p>
                                    <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.passesSuccess" :decimal-places="0" class="inline"></count-up></p>
                                </div>
                                <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                    <p class="self-center w-full text-clip text-pretty">Pases exitosos (%)</p>
                                    <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.passSuccessRate" :decimal-places="1" class="inline"></count-up>%</p>
                                </div>
                                <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                    <p class="self-center w-full text-clip text-pretty">Tacklees totales</p>
                                    <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.tacklesMade" :decimal-places="0" class="inline"></count-up></p>
                                </div>
                                <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                    <p class="self-center w-full text-clip text-pretty">Tacklees existosos</p>
                                    <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.tacklesSuccess" :decimal-places="0" class="inline"></count-up></p>
                                </div>
                                <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                    <p class="self-center w-full text-clip text-pretty">Tacklees existosos (%)</p>
                                    <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.tackleSuccessRate" :decimal-places="1" class="inline"></count-up>%</p>
                                </div>
                            </div>
                            <div class="flex flex-col text-left space-y-2 ml-6">
                                <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                    <p class="self-center w-full text-clip text-pretty">Goles </p>
                                    <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.goals" class="inline"></count-up></p>
                                </div>
                                <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                    <p class="self-center w-full text-clip text-pretty">Goles por partido</p>
                                    <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.goalsPerMatch" :decimal-places="2" class="inline"></count-up></p>
                                </div>
                                <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                    <p class="self-center w-full text-clip text-pretty">Disparos convertidos (%)</p>
                                    <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.shotSuccessRate" :decimal-places="1" class="inline"></count-up>%</p>
                                </div>
                                <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                    <p class="self-center w-full text-clip text-pretty">Asistencias </p>
                                    <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.assists" class="inline"></count-up></p>
                                </div>
                                <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                    <p class="self-center w-full text-clip text-pretty">Asistencias por partido</p>
                                    <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.assistsPerMatch" :decimal-places="2" class="inline"></count-up></p>
                                </div>
                                <div class="font-semibold w-full flex content-center align-middle  space-x-1 overflow-hidden">
                                    <p class="self-center w-full text-clip text-pretty">Valoración media </p>
                                    <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.ratingAve" :decimal-places="1" class="inline"></count-up></p>
                                </div>
                                <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                    <p class="self-center w-full text-clip text-pretty">Tarjetas rojas </p>
                                    <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.redCards" :decimal-places="0" class="inline"></count-up></p>
                                </div>
                            </div>
                    </div>
                    <div class="divider p-0 m-0"></div>
                    <div class="content-center px-2 space-y-2 text-left">
                        <div class="font-semibold w-full flex content-center align-middle  space-x-1">
                                    <p class="self-center w-full text-clip text-pretty">Partidos jugados </p>
                                    <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.gamesPlayed" class="inline"></count-up></p>
                                </div>
                                <div class="font-semibold w-full flex content-center align-middle  space-x-1  overflow-hidden">
                                    <p class="self-center w-full text-clip text-pretty">Porcentaje ganados </p>
                                    <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.winRate" :decimal-places="1" class="inline"></count-up>%</p>
                                </div>
                                <div class="font-semibold w-full flex content-center align-middle  space-x-1  overflow-hidden">
                                    <p class="self-center w-full text-clip text-pretty">Mejor del partido </p>
                                    <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.manOfTheMatch" class="inline"></count-up></p>
                                </div>
                                <div class="font-semibold w-full flex content-center align-middle  space-x-1  overflow-hidden">
                                    <p class="self-center w-full text-clip text-pretty">Mejor del partido (%)</p>
                                    <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.manOfTheMatchPercent" :decimal-places="1" class="inline"></count-up>%</p>
                                </div>
                    </div>

                </div>
            </section>
            <section class="lg:hidden ">
                <div class="relative flex container w-full h-96  p-2 overflow-visible">
                    <img :src=fullImage class="absolute plimg select-none pointer-events-none w-3/6 object-scale-down object-left-top h-fit" alt="Player ingame photo" @error="defaultFullImage">
                    <div class="absolute z-20 right-0 top-0 w-8/12  ploverlay  rounded-lg overflow-scroll h-full">
                        <div class="relative h-full overflow-scroll pt-2">
                            <div class="absolute h-full space-y-2">
                            <div class="font-semibold w-full flex content-center align-middle  space-x-1">
                                <p class="self-center w-full text-clip text-pretty">Partidos jugados </p>
                                <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.gamesPlayed" class="inline"></count-up></p>
                            </div>
                            <div class="font-semibold w-full flex content-center align-middle  space-x-1  overflow-hidden">
                                <p class="self-center w-full text-clip text-pretty">Porcentaje ganados </p>
                                <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.winRate" :decimal-places="1" class="inline"></count-up>%</p>
                            </div>
                            <div class="font-semibold w-full flex content-center align-middle  space-x-1  overflow-hidden">
                                <p class="self-center w-full text-clip text-pretty">Mejor del partido </p>
                                <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.manOfTheMatch" class="inline"></count-up></p>
                            </div>
                            <div class="font-semibold w-full flex content-center align-middle  space-x-1  overflow-hidden">
                                <p class="self-center w-full text-clip text-pretty">Mejor del partido (%)</p>
                                <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.manOfTheMatchPercent" :decimal-places="1" class="inline"></count-up>%</p>
                            </div>
                            <div class="font-semibold w-full flex content-center align-middle  space-x-1 overflow-hidden">
                                <p class="self-center w-full text-clip text-pretty">Valoración media </p>
                                <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.ratingAve" :decimal-places="1" class="inline"></count-up></p>
                            </div>
                            <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                <p class="self-center w-full text-clip text-pretty">Tarjetas rojas </p>
                                <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.redCards" :decimal-places="0" class="inline"></count-up></p>
                            </div>
                            <div class="divider p-0 m-0"></div>
                            <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                <p class="self-center w-full text-clip text-pretty">Goles </p>
                                <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.goals" class="inline"></count-up></p>
                            </div>
                            <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                <p class="self-center w-full text-clip text-pretty">Goles por partido</p>
                                <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.goalsPerMatch" :decimal-places="2" class="inline"></count-up></p>
                            </div>
                            <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                <p class="self-center w-full text-clip text-pretty">Disparos convertidos (%)</p>
                                <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.shotSuccessRate" :decimal-places="1" class="inline"></count-up>%</p>
                            </div>
                            <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                <p class="self-center w-full text-clip text-pretty">Asistencias </p>
                                <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.assists" class="inline"></count-up></p>
                            </div>
                            <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                <p class="self-center w-full text-clip text-pretty">Asistencias por partido</p>
                                <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.assistsPerMatch" :decimal-places="2" class="inline"></count-up></p>
                            </div>
                            <div class="divider p-0 m-0"></div>
                            <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                <p class="self-center w-full text-clip text-pretty">Pases totales</p>
                                <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.passesMade" :decimal-places="0" class="inline"></count-up></p>
                            </div>
                            <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                <p class="self-center w-full text-clip text-pretty">Pases exitosos</p>
                                <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.passesSuccess" :decimal-places="0" class="inline"></count-up></p>
                            </div>
                            <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                <p class="self-center w-full text-clip text-pretty">Pases exitosos (%)</p>
                                <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.passSuccessRate" :decimal-places="1" class="inline"></count-up>%</p>
                            </div>
                            <div class="divider p-0 m-0"></div>
                            <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                <p class="self-center w-full text-clip text-pretty">Tacklees totales</p>
                                <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.tacklesMade" :decimal-places="0" class="inline"></count-up></p>
                            </div>
                            <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                <p class="self-center w-full text-clip text-pretty">Tacklees existosos</p>
                                <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.tacklesSuccess" :decimal-places="0" class="inline"></count-up></p>
                            </div>
                            <div class="font-semibold w-full flex content-center align-middle space-x-1 overflow-hidden">
                                <p class="self-center w-full text-clip text-pretty">Tacklees existosos (%)</p>
                                <p class="self-center text-end text-primary text-lg"><count-up :end-val="player.tackleSuccessRate" :decimal-places="1" class="inline"></count-up>%</p>
                            </div>
                            </div>
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
    backdrop-filter: blur(30px);
}


</style>