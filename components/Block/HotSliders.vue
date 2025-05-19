<template>
    <div class="hot" v-if="realties.length">
        <div class="container">
            <div class="hot__top">
                <div class="main-title">
                    {{ blockTitle }}
                </div>
                <div class="sliders__btn" v-if="showSlider">
                    <span class="show_animate" @click="$refs.countrySlider.prev().catch(e => {})">
                        <IconArrowLeftWhite></IconArrowLeftWhite>
                    </span>
                    <span class="show_animate" @click="$refs.countrySlider.next().catch(e => {})">
                        <IconArrowRightWhite></IconArrowRightWhite>
                    </span>
                </div>
            </div>
            <div class="hot__slider">
                <flicking
                    :options="options"
                    :viewportTag="'div'"
                    :cameraTag="'div'"
                    :plugins="plugins"
                    ref="countrySlider"
                >
                    <div class="hot__slide" v-for="realty in realties">
                        <RealtyThumb :model="realty" :type="type"/>
                    </div>
                </flicking>
            </div>
        </div>
    </div>
</template>

<script>
import HotRealty from '~/models/HotRealty'
import variables from '@/mixins/variables'
import {AutoPlay} from '@egjs/flicking-plugins'

export default {
    name: 'HotSliders',
    mixins: [
        variables,
    ],
    props: {
        blockTitle: String,
        type: String,
    },
    data()
    {
        return {
            options: {
                // freeScroll: false,
                align: 'prev',
                // panelsPerView: 4,
                circular: true,
                bounce: "20%"
            },
            plugins: [],
        }
    },
    computed: {
        realties()
        {
            return HotRealty.query()
                            .where(`is_${this.type}_hot`, 1)
                            .get()
        },
        showSlider()
        {
            if(this.windowWidth >= 374 && this.realties.length > 2){
                return true
            } else if(this.windowWidth >= 450 && this.realties.length > 3){
                return true
            } else if(this.windowWidth >= 767 && this.realties.length > 4){
                return true
            }
            return false
        },
    },
}
</script>

<style scoped>

</style>
