<template>
    <div class="container">
        <div class="sliders__company" v-if="block">
            <flicking
                :options="options"
                :viewportTag="'div'"
                :cameraTag="'div'"
                :plugins="plugins"
                ref="countrySlider"
            >
                <div class=" sliders__our-client-slide" v-for="(item, index) in  block.data">
                    <div class="company">
                        <picture class="company__image">
                            <img :alt="`company__image ${index}`"
                                 :data-src="`${BASE}/${item.image}`"
                                 :src="`${BASE}/${item.image}`">
                        </picture>
                    </div>
                </div>
            </flicking>
        </div>
    </div>
</template>

<script>
import Block from '~/models/Block'
import variables from '~/mixins/variables'
import {AutoPlay} from '@egjs/flicking-plugins'

export default {
    name: 'SliderCompany',
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
                duration: 6000,
                direction: 'NEXT',
            })
        ],
    }),
    computed: {
        block()
        {
            return Block.query()
                        .where('template', 'CompanyLogotypeBlock')
                        .first()
        },
    },
}
</script>

<style scoped>

</style>
