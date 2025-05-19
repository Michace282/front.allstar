<template>
    <div class="sliders" v-if="block">
        <div class="container">
            <div class="sliders__top">
                <div class="sliders__title main-title">
                    {{ $t('pages.our_clients') }}
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
            <div class="sliders__country">
                <flicking
                    :options="options"
                    :viewportTag="'div'"
                    :cameraTag="'div'"
                    :plugins="plugins"
                    ref="countrySlider"
                >
                    <div class="sliders__country-slide" v-for="(item,index) in block.data">
                        <div class="client">
                            <picture class="client__image">
                                <img :src="`${BASE}/${item.image}`" :alt="item.name" />
                            </picture>
                            <div class="client__text">{{ item.name }}</div>
                        </div>
                    </div>
                </flicking>
            </div>
        </div>
    </div>
</template>

<script>
import variables from '~/mixins/variables'
import Block from '~/models/Block'
import { AutoPlay } from "@egjs/flicking-plugins";

export default {
    name: 'SliderTop',
    mixins: [
        variables,
    ],
    data: () => ({
        options: {
            align: 'prev',
            gap: 10,
            circular: true,
        },
        plugins: [
            new AutoPlay({
                duration: 4000,
                direction: 'NEXT',
            })
        ],
    }),
    computed: {
        block()
        {
            return Block.query()
                        .where('template', 'EmbassyBlock')
                        .first()
        },
    }
}
</script>

<style scoped>

</style>
