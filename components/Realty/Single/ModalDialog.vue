<template>
    <div id="modal" ref="modal" class="modal" @click.self="hideModal()">
        <div class="modal__control" @click="hideModal()"></div>
        <div
            ref="allModalImages"
            class="modal__all-images"
            @click.self="hideModal()"
        >
            <div
                v-for="(slide, idx) in images"
                :key="slide.id"
                class="modal__image-wrapper"
            >
                <picture class="block-images__image"  >
                    <img :src="slide['full']" alt="Picture"/>
                </picture>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalDialog',
    props: {
        images: {
            type: Array,
        },
    },
    methods: {
        hideModal()
        {
            this.$emit('childhideModal', this.hiddenModal)
        },
    },
}
</script>

<style scoped>

</style>
