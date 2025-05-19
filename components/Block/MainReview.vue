<template>
    <div class="review">
        <div class="container" v-if="block">
            <div class="review__top">
                <div class="wrap">
                    <div class="main-title">
                        {{ $t('pages.reviews', {count: block.data.length}) }}
                    </div>
                    <a target="_blank" v-if="reviewLink" :href="this.reviewLink.value" class="review__more">
                        {{ $t('pages.reviews_google') }}
                    </a>
                </div>
                <div class="sliders__btn">
                    <span class="show_animate" @click="$refs.countrySlider.prev().catch(e => {})">
                        <IconArrowLeftWhite></IconArrowLeftWhite>
                    </span>
                    <span class="show_animate" @click="$refs.countrySlider.next().catch(e => {})">
                        <IconArrowRightWhite></IconArrowRightWhite>
                    </span>
                </div>
            </div>
            <div class="review__slider">
                <flicking
                    :options="options"
                    :viewportTag="'div'"
                    :cameraTag="'div'"
                    :plugins="plugins"
                    ref="countrySlider"
                >
                    <div class="review__slide" v-for="(item, index) in block.data">
                        <BlockMainReviewItem v-if="item" :key="`review-${index}`" :item="item"/>
                    </div>
                </flicking>
            </div>
        </div>
    </div>
</template>

<script>
import Setting from '~/models/Setting'
import Block from '~/models/Block'
import { AutoPlay } from "@egjs/flicking-plugins";

export default {
    name: 'MainReview',
    data()
    {
        return {
            options: {
                align: 'prev',
                // panelsPerView: 2,
                gap: 10,
                circular: true,
            },
            plugins: [
                new AutoPlay({
                    duration: 8000,
                    direction: 'NEXT',
                })
            ],
        }
    },
    computed: {
        block()
        {
            return Block.query()
                        .where('template', 'ReviewBlock')
                        .first()
        },
        reviewLink()
        {
            return Setting.query()
                          .where('key', 'googleRew')
                          .first()
        },
    },
}

</script>

<style scoped>

</style>
