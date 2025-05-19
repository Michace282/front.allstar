<template>
    <div class="simple__slider">
        <div class="simple__slider-main">
            <IconVideo v-if="model.video" class="simple__video_icon" fill="#FFF"/>
            <flicking
                :options="main"
                :viewportTag="'div'"
                :cameraTag="'div'"
                @changed="e => sliderPagination(e.index)"
                :plugins="plugins"
                ref="main">
                <template v-for="(slide, index) in model.front_images">
                    <template v-if="index === 0">
                        <div class="slide" :key="`main-slider-${index}`" @click="openFancy(index)">
                            <img :src="slide.fullFree" :alt="`${model.h1[$route.params.deal_type]} ${(index)}`">
                        </div>
                        <div v-if="model.video.length" class="slide" :key="`main-slider-video`">
                            <div class="simple__video-product">
                                <youtube ref="player" @playing="playing" @paused="pause" @ended="stop" @ready="ready" player-width="420" player-height="240"
                                         :video-id="model.video"></youtube>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="slide" :key="`main-slider-${index}`" @click="openFancy((model.video.length) ? index + 1 : index)">
                            <img :src="slide.fullFree" :alt="`${model.h1[$route.params.deal_type]} ${(index)}`">
                        </div>
                    </template>
                </template>
                <div slot="viewport" v-show="showNavigate" class="flicking-pagination"></div>
            </flicking>
            <template v-if="showNavigate">
                <span class="show_animate show_animate_prev prev" @click="sliderPrev()">
                    <IconArrowCatalog/>
                </span>
                <span class="show_animate show_animate_next next" @click="sliderNext()">
                    <IconArrowCatalog/>
                </span>
            </template>
        </div>
        <div class="simple__slider-thumbnails" :class="{'all-images':show} ">
            <flicking ref="thumbnails" :options="thumbnails" :viewportTag="'div'" :cameraTag="'div'" @changed="e => sliderPagination(e.index)">
                <template v-for="(slide, index) in model.front_images">
                    <template v-if="index === 0">
                        <div class="slide" :key="`thumb-slider-${index}`" @click="sliderPagination(index)">
                            <div class="slide-wrap">
                                <img :src="slide.mediumFree" :alt="`${model.name} sub ${(index)}`">
                            </div>
                        </div>
                        <div v-if="model.video.length" class="slide" :key="`main-slider-video`">
                            <div class="video-product" @click="sliderPagination(index+1)">
                                <img :src="`https://img.youtube.com/vi/${model.video}/0.jpg`" alt="">
                                <span class="play-btn"><i class="el-icon-video-play"></i></span>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="slide" :key="`thumb-slider-${index}`" @click="sliderPagination((model.video.length) ? index + 1 : index)">
                            <div class="slide-wrap">
                                <img :src="slide.mediumFree" :alt="`${model.name} sub ${(index)}`">
                            </div>
                        </div>
                    </template>
                </template>
            </flicking>
            <span v-if="model.front_images.length > 4" @click="showAll(); show = true" class="show-all-image">
                <p>{{ $t('realty.more') }}</p>
                <IconArrowLeftBlue></IconArrowLeftBlue>
            </span>
            <span v-if="model.front_images.length > 4" @click="hideAll(); show = false" class="hide-all-image">
                <IconArrowLeftBlue></IconArrowLeftBlue>
                <p>{{ $t('pages.hide_text') }} </p>
            </span>
        </div>

        <client-only>
            <lightGallery
                v-if="windowWidth > 1025"
                :images="images"
                :show-caption="false"
                :show-thumbs="false"
                id="images"
                ref="images"
            />
            <RealtySingleModalDialog
                v-else-if="windowWidth <= 1025 && modalVisible"
                :images="model.front_images"
                @childhideModal="parentHide"
            ></RealtySingleModalDialog>
        </client-only>

        <RealtySingleDocument v-if="model.front_documents.length" :model="model"></RealtySingleDocument>
    </div>
</template>

<script>
import {Pagination} from '@egjs/flicking-plugins'
import variables from '@/mixins/variables'

export default {
    name: 'Slider',
    mixins: [variables],
    data: () => ({
        showNavigate: true,
        show: false,
        curImage: 0,
        main: {
            align: 'prev',
            panelsPerView: 1,
            circular: true,
            overflow: true
        },
        thumbnails: {
            align: 'prev',
            panelsPerView: 4,
            circular: true,
        },
        plugins: [
            new Pagination({type: 'scroll'}),
        ],
        modalVisible: false,
    }),
    props: {
        model: Object,
    },
    computed: {
        images()
        {
            return this.model.front_images.map((item, index) => {
                return {
                    src: this.model.show_watermark ? item.full : item.fullFree,
                    thumb: item.mediumFree,
                }
            })
        },
    },
    methods: {
        ready(event)
        {
            this.player = event.target
        },
        playing(event)
        {
            this.showNavigate = false
        },
        stop () {
            this.player.stopVideo()
        },
        pause () {
            this.player.pauseVideo()
            this.showNavigate = true
        },
        parentHide()
        {
            this.modalVisible = false
            this.$nextTick(() => {
                document.documentElement.style.overflowY = 'visible'
            })
        },
        openFancy(index)
        {
            if(this.model.video.length && index > 0){
                --index
            }
            if(this.windowWidth > 1025){
                this.$refs.images.showImage(index)
            } else {
                this.modalVisible = !this.modalVisible
            }
        },
        sliderPrev()
        {
            this.$refs.main.prev()
                .catch(() => {})
            this.$refs.thumbnails.prev()
                .catch(() => {})
            if(this.model.video.length){
                this.player.stopVideo()
            }
        },
        sliderNext()
        {
            this.$refs.main.next()
                .catch(() => {})
            this.$refs.thumbnails.next()
                .catch(() => {})
            if(this.model.video.length){
                this.player.stopVideo()
            }
        },
        showAll()
        {
            this.$refs.thumbnails.destroy()
        },
        hideAll()
        {
            this.$refs.thumbnails.init()
        },
        sliderPagination(idx)
        {
            this.showNavigate = true
            this.$refs.main.moveTo(idx)
                .catch(() => {})
            this.$refs.thumbnails.moveTo(idx)
                .catch(() => {})
            if(this.model.video.length){
                this.player.stopVideo()
            }
        },
    },
}
</script>
<style>
.show_animate_prev {
  position: absolute;
  top: 42%;
  z-index: 5;
  left: 15px;
  border-radius: 50%;
  box-shadow: 5px 7px 16px rgba(0,0,0,.04);
  cursor: pointer;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.show_animate_next {
  position: absolute;
  top: 42%;
  z-index: 5;
  right: 15px;
  border-radius: 50%;
  box-shadow: 5px 7px 16px rgba(0,0,0,.04);
  cursor: pointer;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.show_animate_next svg {
  transform: rotate(180deg);
}
.show_animate_prev svg, .show_animate_next svg {
  width: 40px;
  height: 40px;
}

.show_animate_prev svg path, .show_animate_next svg path {
  fill: #fff;
}
</style>
