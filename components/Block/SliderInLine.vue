<template>
        <div class="container">
            <div class="sliders__wrap" v-if="block">
                <div class="sliders__item"v-for="(item,index) in block.data">
                    <div class="img">
                        <img :src="`${BASE}/${item.image}`" alt="">
                    </div>
                    <div class="wrap">
                        <h4>{{ item.name }}</h4>
                        <p>{{ item.content }}</p>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import Block from '~/models/Block'
import variables from '~/mixins/variables'

export default {
    name: 'SliderInLine',
    mixins: [
        variables
    ],
    computed: {
        block(){
            return Block.query().where('template', 'AdvantageBlock' ).first()
        }
    }
}
</script>

<style scoped>

</style>