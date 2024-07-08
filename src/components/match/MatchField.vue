<template>
    <div tabindex="0" class="collapse collapse-arrow border-base-200 bg-base-100 border my-3 w-full min-w-full shadow-lg dark:shadow">
        <div class="collapse-title flex flex-col w-full min-w-full px-2 py-0">
            <div class="flex items-center justify-center">
                <div class="badge badge-ghost badge-sm">{{ timestampToStr(match.timestamp) }}</div>
            </div>
            <div class="flex items-center justify-center align-middle h-full w-full">
                <div class="justify-self-start w-full flex justify-end">
                    <!-- Own Team -->
                    <div class="indicator self-center p-2 m-2" v-if="match.ownClub.matchStats.redCards>0">
                        <span class="indicator-item badge badge-neutral badge-xs">{{ match.ownClub.matchStats.redCards }}</span>
                        <div class="grid h-6 w-4 place-items-center bg-error rounded-sm"></div>
                    </div>
                    <p class="text-end self-center font-medium text-2xl hidden md:flex">{{match.ownClub.name}}</p>
                    <p class="text-end font-extrabold text-4xl bg-base-200 dark:bg-base-300 justify-self-end self-end p-4 m-4 mr-1 rounded-2xl"
                    :class=resultColor>{{ match.ownClub.matchStats.goals }}</p>
                </div>
                <div class="self-center justify-self-center text-xl font-extrabold m-2 relative text-center">
                    :
                </div>
                <div class="justify-self-end w-full flex justify-start">
                    <!-- Rival Team -->
                    <p class="text-start font-extrabold text-4xl bg-base-200 dark:bg-base-300 justify-self-end self-end p-4 m-4 ml-1 rounded-2xl">{{ match.opponentClub.matchStats.goals }}</p>
                    <p class="text-start self-center font-medium text-2xl hidden md:flex">{{match.opponentClub.name}}</p>
                    <div class="indicator self-center p-2 m-2" v-if="match.opponentClub.matchStats.redCards>0">
                        <span class="indicator-item badge badge-neutral badge-xs">{{ match.opponentClub.matchStats.redCards }}</span>
                        <div class="grid h-6 w-4 place-items-center bg-error rounded-sm"></div>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-center align-middle  w-full md:hidden">
                <div class="justify-self-start w-full flex justify-end text-sm">
                    {{ match.ownClub.name }}
                </div>
                <div class="self-center justify-self-center text-md font-extrabold mx-2 relative text-center">
                    VS
                </div>
                <div class="justify-self-end w-full flex justify-start text-sm">
                    {{ match.opponentClub.name }}
                </div>
            </div>
            <div class="flex items-center justify-center mt-2 md:mt-0" v-if="match.winnerByDnf">
                <div class="badge badge-error badge-sm badge-outline">Desconexión</div>
            </div>
        </div>
        <div class="collapse-content flex flex-col w-full h-full px-2 justify-center align-middle items-center">
            <div class="mt-4 w-full">
                <header class="font-semibold text-lg md:text-xl text-primary text-center">RESUMEN DEL PARTIDO</header>
                <div class="flex w-full mt-2 items-center flex-col mx-auto lg:px-48">
                    <table class="w-full min-w-full text-center">
                        <tbody>
                            <tr class="" v-for="(stat, index) in match.ownClub.matchStats">
                                <td class="py-2 flex text-end self-end justify-end font-semibold">
                                    <p class="w-fit px-2 rounded-md text-end" :class="{'bg-base-300': match.ownClub.matchStats[index]>match.opponentClub.matchStats[index],
                                'font-bold': match.ownClub.matchStats[index]>match.opponentClub.matchStats[index]
                            }">{{ trimDecimal(match.ownClub.matchStats[index], 1) }}<span v-if='reverseStatStr2[index].includes("%")'>%</span></p>
                                </td>
                                <td class="py-2 text-sm md:text-md lg:text-lg font-bold">{{ reverseStatStr2[index] }}</td>
                                <td class="py-2 flex text-start self-start justify-start font-semibold">
                                    <p class="w-fit px-2 rounded-md" :class="{'bg-base-300': match.opponentClub.matchStats[index]>match.ownClub.matchStats[index],
                                        'font-bold': match.opponentClub.matchStats[index]>match.ownClub.matchStats[index]
                                    }">{{ trimDecimal(match.opponentClub.matchStats[index], 1) }}<span v-if='reverseStatStr2[index].includes("%")'>%</span></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!--
                    <div class="flex items-center justify-center align-middle w-full" v-for="(stat, index) in match.ownClub.matchStats">
                        <div class="w-full justify-end justify-self-center text-end text-lg font-semibold flex content-end">
                            <p class="w-fit p-2 rounded-md" 
                            :class="{'bg-base-300': match.ownClub.matchStats[index]>match.opponentClub.matchStats[index],
                                'font-bold': match.ownClub.matchStats[index]>match.opponentClub.matchStats[index]
                            }">1</p>
                        </div>
                        <div class="self-center justify-self-center  font-bold mx-8 md:mx-14 text-center align-middle"><p>{{ reverseStatString(stat) }}</p></div>
                        <div class="w-full justify-start align-middle text-start text-lg font-semibold flex content-start">
                            <p class="w-fit p-2 rounded-md" 
                            :class="{'bg-base-300': match.opponentClub.matchStats[index]>match.ownClub.matchStats[index],
                                'font-bold': match.opponentClub.matchStats[index]>match.ownClub.matchStats[index]
                            }">{{ match.opponentClub.matchStats[index] }}</p>
                        </div>
                    </div>
                    
                    <div class="flex flex-col" v-for="(stat, index) in match.ownClub.matchStats" :key="stat" :index="index">
                        <div class="w-full justify-end justify-self-center text-end text-lg font-semibold flex content-end">
                            <p class="w-fit p-2 rounded-md" 
                            :class="{'bg-base-300': match.ownClub.matchStats[index]>match.opponentClub.matchStats[index],
                                'font-bold': match.ownClub.matchStats[index]>match.opponentClub.matchStats[index]
                            }">{{ match.ownClub.matchStats[index] }}</p>
                        </div>
                        <div class="self-center justify-self-center text-lg md:text-xl  font-bold mx-8 md:mx-14 text-center align-middle"><p>{{ reverseStatString(index) }}</p></div>
                        <div class="w-full justify-start align-middle text-start text-lg font-semibold flex content-start">
                            <p class="w-fit p-2 rounded-md" 
                            :class="{'bg-base-300': match.opponentClub.matchStats[index]>match.ownClub.matchStats[index],
                                'font-bold': match.opponentClub.matchStats[index]>match.ownClub.matchStats[index]
                            }">{{ match.opponentClub.matchStats[index] }}</p>
                        </div>
                    </div>
                    -->
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { computed, ref } from 'vue';
    import ClubMatch from '@models/match/ClubMatch'
    const props = defineProps<{
        match: ClubMatch,
        index: number
        key
    }>()

    const resultColor = {
        'text-error': props.match.result==2,
        'text-success': props.match.result==1
    }

    const reverseStatStr2 = {
        goals: "Goles",
        shots: "Disparos",
        shotSuccessRate: "Acierto disparos (%)",
        passesMade: "Pases intentados",
        passesSuccess: "Pases acertados",
        passSuccessRate: "Acierto pases (%)",
        redCards: "Tarjetas rojas",
        tacklesMade: "Tacklees intentados",
        tackleSuccess: "Tacklees acertados",
        tackleSuccessRate: "Acierto tacklees (%)"
    }

    function trimDecimal(decimal:number, trim:number){
        if(decimal.toString().split(".").length>1 && decimal.toString().split(".")[1].length>trim){
            return decimal.toFixed(trim)
        }else return decimal
    }


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