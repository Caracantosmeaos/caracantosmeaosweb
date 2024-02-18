<template>
    <div class="bg-base-100 text-center rounded-lg cursor-pointer hover:shadow-md" v-on:click="clickPlayer(index,player)">
        <p>nickname: {{ player.name }}</p>
        <p>pro name: {{ player.proName }}</p>
        <p>played: {{ player.gamesPlayed }}</p>
        <p>goals: {{ player.goals }}</p>
        <p>assists: {{ player.assists }}</p>
        <p>redcards: {{ player.redCards }}</p>
        <p>overall: {{ player.proOverall }}</p>
        <p>MOTM: {{ player.manOfTheMatch }} ({{ player.manOfTheMatchPercent }}%)</p>
    </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import ClubMember from '../../model/ClubMember';
    defineProps<{
        player: ClubMember,
        index: number
        key: number
    }>()
    const emit = defineEmits({
        clickedPlayer: ({index, player}) => {return true}
    })

    function clickPlayer(index, player){
        emit('clickedPlayer', {index, player})
    }

</script>