<template>
    <div id="map-slider" class="map-slider">
        <flicking v-if="model.length" ref="realtySlider" @changed="e => sliderPagination(e.index)" :options="optionsSlider">
            <div class="slide-wrapper" v-for="(item,index) in model" :key="`slide-${index}`">
                <div class="slide">
                    <nuxt-link :to="item[`link_${type}`]" class="thumb">
                        <div v-for="(image,index) in item.front_images" :key="`item${index}`" v-if="index ===0">
                            <img :src="image['mediumFree']" :alt="`${item.name}`">
                        </div>
                    </nuxt-link>
                    <div class="content">
                        <nuxt-link :to="item[`link_${type}`]" class="catalog__item-title">{{ item.name }}</nuxt-link>
                        <div class="map-card__subtitle" v-if="item.front_complex_name.length || item.front_business_name.length">
                            <span v-if="item.front_complex_name.length">{{ item.front_complex_name }}</span>
                            <span v-if="item.front_business_name.length">{{ item.front_business_name }}</span>
                        </div>
                        <div class="map-card__text">{{ item.info }}</div>
                        <div class="catalog__footer">
                            <div class="catalog__item-id">{{ $t('realty.id', {id: item.id}) }}</div>
                            <div v-if="$route.params.deal_type === 'rent'" :data-after="$t('realty.month')" class="catalog__price">
                                <span>{{ item.front_rent_price }}</span>
                            </div>
                            <div v-else class="catalog__price">
                                <span>{{ item.front_sale_price }}</span>
                                <div class="catalog__per-sqm">
                                    {{ $t('realty.perSqm', {price: item.front_price_per_area_sale}) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </flicking>
    </div>
</template>

<script>
export default {
    name: 'MapSlider',
    props: {
        model: Array,
        type: {
            type: String
        }
    },
    created()
    {
        this.$nuxt.$on('setSliderRealty', data => {
            this.index = data
            this.$refs.realtySlider.moveTo(data)
                .catch(() => {})
        })
    },
    beforeDestroy()
    {
        this.$nuxt.$off('setSliderRealty')
    },
    data: () => ({
        index: null,
        optionsSlider: {
            align: 'center',
            panelsPerView: 1,
            circular: true,
        },
    }),
    methods: {
        sliderPagination(index)
        {
            if(index !== this.index) {
                this.$nuxt.$emit('centerCenterMap', index)
            }
        },
    },
}
</script>

<style scoped>

</style>
