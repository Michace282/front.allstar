<template>
    <div class="simple__project">
        <div class="simple__project-title">{{ $t('realty.plan_title') }}</div>
        <ul class="simple__project-list">
            <li class="simple__project-item" v-for="(document, index) in model.front_documents">
                <span @click="openFancy(index)">
                    <img :src="document['medium-free']" alt="">
                </span>
            </li>
        </ul>
        <client-only>
            <lightGallery
                v-if="this.windowWidth > 1025"
                :images="images"
                :show-caption="false"
                :show-thumbs="false"
                id="documents"
                ref="documents"
            />
            <RealtySingleModalDialog
                v-else-if="this.windowWidth <= 1025 && this.modalVisible"
                :images="model.front_documents"
                @childhideModal="parentHide"
            ></RealtySingleModalDialog>
        </client-only>
    </div>
</template>

<script>
import variables from '@/mixins/variables'

export default {
    name: 'Document',
    mixins: [variables],
    props: {
        model: {
            type: Object,
        },
    },
    data()
    {
        return {
            modalVisible: false,
        }
    },
    computed: {
        images()
        {
            return this.model.front_documents.map((item, index) => {
                return {
                    src: item.fullFree,
                    thumb: item.mediumFree,
                }
            })
        },
    },
    methods: {
        openFancy(idx)
        {
            if(this.windowWidth > 1025){
                this.$refs.documents.showImage(idx)
            } else {
                this.modalVisible = !this.modalVisible
            }
        },
        parentHide()
        {
            this.modalVisible = false
            this.$nextTick(() => {
                document.documentElement.style.overflowY = 'visible'
            })
        },
    },
}
</script>

<style scoped>

</style>
