<script setup lang="ts">
    import { computed, onBeforeMount, onMounted, ref} from 'vue';
    import ClubMember from '@models/ClubMember'
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
        <div class="modal-box ">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <header><h3 class="font-bold text-2xl text-primary text-center">{{ player.name }}</h3></header>
            <section class="flex content-center mt-2">
                <div class="w-full">
                    <img :src=fullImage class="select-none pointer-events-none h-full m-auto  drop-shadow-lg" alt="Player ingame photo" />
                </div>
                <div class="text-center w-full">a</div>
            </section>
        </div>
    </dialog>
</template>