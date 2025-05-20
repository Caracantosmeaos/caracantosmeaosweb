<style>
.clip-half-circle-left {
  clip-path: inset(0 0 0 50%);
}

.clip-half-circle-right {
  clip-path: inset(0 50% 0 0);
}

.clip-half-circle-top {
  clip-path: inset(50% 0 0 0);
}

.clip-half-circle-bot {
  clip-path: inset(0 0 50% 0);
}
</style>
<template>
    <div class="flex justify-center items-center">
      <div class="atropos atropos-football-field w-full max-w-md" ref="atroposElement">

        <div class="atropos-scale">
          <div class="atropos-rotate">
            <div class="atropos-inner relative bg-green-600 rounded-2xl overflow-hidden" style="aspect-ratio: 68/105;">

              <div data-atropos-offset="0" class="absolute inset-0 border-4 border-white border-opacity-80 rounded-lg"></div>

              <!-- Línea central -->
              <div data-atropos-offset="1" class="absolute left-0 right-0 top-1/2 h-0.5 bg-white"></div>

              <!-- Círculo central -->
              <div  class="absolute left-1/2 top-1/2 w-24 h-24 border-2 border-white rounded-full" style="transform: translate(-50%, -50%)"></div>
              <div  class="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-white rounded-full" style="transform: translate(-50%, -50%)"></div>

              <!-- Área superior -->
              <div class="absolute left-1/2 top-0 w-44 h-16 border-b-2 border-l-2 border-r-2 border-white" style="transform: translateX(-50%)"></div>
              <div class="absolute left-1/2 top-0 w-20 h-6 border-b-2 border-l-2 border-r-2 border-white" style="transform: translateX(-50%)"></div>
              <div class="absolute left-1/2 top-16 w-20 h-20 border-2 border-white rounded-full clip-half-circle-top" style="transform: translate(-50%, -50%)"></div>
              <div class="absolute left-1/2 top-11 w-1.5 h-1.5 bg-white rounded-full" style="transform: translateX(-50%)"></div>

              <!-- Área inferior -->
              <div class="absolute left-1/2 bottom-0 w-44 h-16 border-t-2 border-l-2 border-r-2 border-white" style="transform: translateX(-50%)"></div>
              <div class="absolute left-1/2 bottom-0 w-20 h-6 border-t-2 border-l-2 border-r-2 border-white" style="transform: translateX(-50%)"></div>
              <div class="absolute left-1/2 bottom-16 w-20 h-20 border-2 border-white rounded-full clip-half-circle-bot" style="transform: translate(-50%, 50%)"></div>
              <div class="absolute left-1/2 bottom-11 w-1.5 h-1.5 bg-white rounded-full" style="transform: translateX(-50%)"></div>

              <!-- Córners -->
              <div data-atropos-offset="1" class="absolute top-0 left-0 w-4 h-4 border-r-2 border-b-2 border-white" style="border-bottom-right-radius: 100%"></div>
              <div data-atropos-offset="1" class="absolute top-0 right-0 w-4 h-4 border-l-2 border-b-2 border-white" style="border-bottom-left-radius: 100%"></div>
              <div data-atropos-offset="1" class="absolute bottom-0 left-0 w-4 h-4 border-r-2 border-t-2 border-white" style="border-top-right-radius: 100%"></div>
              <div data-atropos-offset="1" class="absolute bottom-0 right-0 w-4 h-4 border-l-2 border-t-2 border-white" style="border-top-left-radius: 100%"></div>

              <div data-atropos-offset="-2" class="absolute -inset-2 bg-black opacity-20 blur-xl rounded-xl"></div>

              <!-- JUGADORES -->
              <div data-atropos-offset="2" class="absolute inset-x-0 h-full flex flex-col justify-between pb-16 pt-4">
                <!-- Portero -->
                <div class="absolute left-1/2 top-0 transform -translate-x-1/2">
                  <div class="flex-col bg-base-300/55 backdrop-blur-sm hover:bg-base-300/75 p-1 rounded-xl h-fit m-10 mt-2 items-center justify-center align-middle w-20 overflow-hidden hidden lg:flex cursor-pointer shadow-lg" 
                  v-for="pl in playersByPos('goalkeeper')" @click="selectPlayer(players.indexOf(pl))" :class="{
                    'bg-primary hover:bg-primary': props.selectedplayer == players.indexOf(pl)
                  }">
                    <div class="grid h-5 w-4 place-items-center bg-error rounded-sm self-center" v-if="pl.redCards>0"></div>
                    <img :src="topImage(pl.playername)" class="drop-shadow-lg select-none pointer-events-none" alt="Player ingame top image" @error="defaultTopImage"/>
                    <span class="text-sm" :class="{
                      'text-primary-content ': props.selectedplayer == players.indexOf(pl)
                    }">
                      {{ pl.playername }}
                    </span>
                  </div>
                  <div class="inline-flex bg-base-300/55 backdrop-blur-sm hover:bg-base-300/75  p-1 rounded-xl h-fit mt-2 items-center justify-center align-middle overflow-hidden lg:hidden w-fit cursor-pointer shadow-lg" 
                  v-for="pl in playersByPos('goalkeeper')" @click="selectPlayer(players.indexOf(pl))" :class="{
                    'bg-primary hover:bg-primary': props.selectedplayer == players.indexOf(pl)
                  }">
                    <span class="text-sm text-center" :class="{
                      'text-primary-content ': props.selectedplayer == players.indexOf(pl)
                    }">{{ pl.playername }}</span>
                    <div class="grid h-3 w-2 place-items-center bg-error rounded-sm self-center mx-1" v-if="pl.redCards>0"></div>
                  </div>
                </div>
                
                <!-- Línea de defensa -->
                <div class="absolute left-0 right-0 top-[16%] flex justify-evenly px-6 ">
                  <div class="flex-col bg-base-300/55 backdrop-blur-sm hover:bg-base-300/75 p-1 rounded-xl h-fit m-10 items-center justify-center align-middle w-20 overflow-hidden hidden lg:flex cursor-pointer shadow-lg" 
                  v-for="pl in playersByPos('defender')" @click="selectPlayer(players.indexOf(pl))" :class="{
                    'bg-primary hover:bg-primary': props.selectedplayer == players.indexOf(pl)
                  }">
                    <img :src="topImage(pl.playername)" class="drop-shadow-lg select-none pointer-events-none" alt="Player ingame top image" @error="defaultTopImage"/>
                    <span class="text-sm" :class="{
                      'text-primary-content ': props.selectedplayer == players.indexOf(pl)
                      }">
                      {{ pl.playername }}
                    </span>
                  </div>
                  <div class="inline-flex bg-base-300/55 backdrop-blur-sm hover:bg-base-300/75 p-1 rounded-xl h-fit mt-4 items-center justify-center align-middle overflow-x-hidden lg:hidden w-fit cursor-pointer shadow-lg" 
                  v-for="pl in playersByPos('defender')" @click="selectPlayer(players.indexOf(pl))" :class="{
                    'bg-primary hover:bg-primary': props.selectedplayer == players.indexOf(pl)
                  }">
                    <span class="text-sm text-center overflow-x-clip" :class="{
                      'text-primary-content ': props.selectedplayer == players.indexOf(pl)
                    }">{{ pl.playername }}</span>
                    <div class="grid h-3 w-2 place-items-center bg-error rounded-sm self-center mx-1" v-if="pl.redCards>0"></div>
                  </div>
                </div>
                  
                  <!-- Línea de mediocampo -->
                <div class="absolute left-0 right-0 top-[43%] flex justify-evenly px-8">
                    <div class="flex-col bg-base-300/55 backdrop-blur-sm hover:bg-base-300/75 p-1 rounded-xl h-fit m-10 items-center justify-center align-middle w-20 overflow-hidden hidden lg:flex cursor-pointer shadow-lg" 
                    v-for="pl in playersByPos('midfielder')" @click="selectPlayer(players.indexOf(pl))" :class="{
                    'bg-primary hover:bg-primary': props.selectedplayer == players.indexOf(pl)
                  }">
                      <img :src="topImage(pl.playername)" class=" drop-shadow-lg select-none pointer-events-none" alt="Player ingame top image" @error="defaultTopImage"/>
                      <span class="text-sm" :class="{
                        'text-primary-content ': props.selectedplayer == players.indexOf(pl)
                        }">
                        {{ pl.playername }}
                      </span>
                    </div>
                    <div class="inline-flex bg-base-300/55 backdrop-blur-sm hover:bg-base-300/75 p-1 rounded-xl h-fit mt-4 items-center justify-center align-middle overflow-x-hidden lg:hidden w-fit cursor-pointer" 
                    v-for="pl in playersByPos('midfielder')" @click="selectPlayer(players.indexOf(pl))" :class="{
                    'bg-primary hover:bg-primary': props.selectedplayer == players.indexOf(pl)
                  }">
                      <span class="text-sm text-center overflow-x-clip" :class="{
                      'text-primary-content ': props.selectedplayer == players.indexOf(pl)
                    }">{{ pl.playername }}</span>
                    <div class="grid h-3 w-2 place-items-center bg-error rounded-sm self-center mx-1" v-if="pl.redCards>0"></div>
                    </div>
                </div>
                
                <!-- Línea de delantera -->
                <div class="absolute left-0 right-0 top-[71%] flex justify-evenly px-6">
                  <div class="flex-col bg-base-300/55 backdrop-blur-sm hover:bg-base-300/75 p-1 rounded-xl h-fit m-10 items-center justify-center align-middle w-20 overflow-hidden hidden lg:flex cursor-pointer" 
                  v-for="pl in playersByPos('forward')" @click="selectPlayer(players.indexOf(pl))" :class="{
                    'bg-primary hover:bg-primary': props.selectedplayer == players.indexOf(pl)
                  }">
                    <div class="absolute top-2 right-2 grid h-5 w-3 place-items-center bg-error rounded-sm self-center" v-if="pl.redCards>0"></div>
                    <img :src="topImage(pl.playername)" class="drop-shadow-lg select-none pointer-events-none" alt="Player ingame top image" @error="defaultTopImage"/>
                    <span class="text-sm" :class="{
                        'text-primary-content': props.selectedplayer == players.indexOf(pl)
                      }">
                        {{ pl.playername }}
                    </span>
                  </div>
                  <div class="inline-flex bg-base-300/55 backdrop-blur-sm hover:bg-base-300/75 p-1 rounded-xl h-fit mt-4 items-center justify-center align-middle overflow-x-hidden lg:hidden w-fit cursor-pointer" 
                  v-for="pl in playersByPos('forward')" @click="selectPlayer(players.indexOf(pl))" :class="{
                    'bg-primary hover:bg-primary': props.selectedplayer == players.indexOf(pl)
                  }">
                    <span class="text-sm text-center overflow-x-clip" :class="{
                      'text-primary-content': props.selectedplayer == players.indexOf(pl)
                    }">{{ pl.playername }}</span>
                    <div class="grid h-3 w-2 place-items-center bg-error rounded-sm self-center mx-1" v-if="pl.redCards>0"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
  </div>
  </template>
  <script setup lang="ts">
  import { computed, onMounted,ref } from 'vue';
  import Atropos from 'atropos';
  import 'atropos/css';
  import MatchPlayerEntity from '@/model/match/MatchPlayerEntity';

  const props = defineProps<{
        players: MatchPlayerEntity[],
        selectedplayer: number
  }>()

  const emit = defineEmits<{
    (e: 'selectplayer', player: number): void
  }>()

  function selectPlayer(index: number){
    emit('selectplayer', index)
  }


  function playersByPos (position){
    return props.players.filter((el) => el.position==position)
  }


    function topImage(playername){
      return `/players/${playername}_top_transp.png`
    }

    function defaultTopImage(e){
        e.target.src = '/players/placeholder_top_transp.png'
    }

  const atroposElement = ref(null);

  onMounted(() => {
    if(atroposElement.value){
      Atropos({
        el: atroposElement.value,
        shadow: true,
        highlight: false,
        shadowScale: 0.95,
        duration: 800,
        rotate: true,
        rotateXMax: 3,
        rotateYMax: 3,
        activeOffset: 10,
        rotateTouch: true,
        stretchX: 0,
        stretchZ: 0,
        stretchY: 0
      });
    }
  });
  </script>