<template>
    <gmap-info-window
        :opened="model.is_show && windowWidth > 991"
        :options="infoOptions"
        :position="model.position">
        <div ref="card" class="map-card">
            <picture class="map-card__image" v-if="model.front_images.length">
                <LayoutsLImage :src="model.front_images[0].mediumFree" :scroll-container="$refs.card" :alt="`${model.name} map`"/>
            </picture>
            <a :href="model[`link_${type}`]" target="_blank" class="map-card__title" tabindex="0">
                {{ model.name }}
            </a>
            <div class="map-card__subtitle" v-if="model.front_complex_name.length || model.front_business_name.length">
                <span v-if="model.front_complex_name.length">{{ model.front_complex_name }}</span>
                <span v-if="model.front_business_name.length">{{ model.front_business_name }}</span>
            </div>
            <div class="map-card__text">{{ model.info }}</div>
            <div class="map-card__footer">
                <div v-if="type === 'sale'" class="map-card__sqm">
                    {{ $t('realty.perSqm', {price: model.front_price_per_area_sale}) }}
                </div>
                <div v-if="type === 'rent'" :data-option="$t('realty.month')" class="map-card__price map-card__price_month">
                    {{ model.front_rent_price }}
                </div>
                <div v-else  class="map-card__price map-card__price_month">
                    {{ model.front_sale_price }}
                </div>
            </div>
        </div>
    </gmap-info-window>
</template>

<script>
import variables from '@/mixins/variables'

export default {
    name: 'Map',
    mixins: [
        variables,
    ],
    props: {
        model: Object,
        type: {
            type: String
        }
    },
    data: () => ({
        infoOptions: {
            pixelOffset: {
                width: 0,
                height: -25,
            },
        }
    }),
    watch: {
        'model.is_show'(){
            this.$nextTick(()=>{
                this.$refs.card.dispatchEvent(new Event('scroll'))
            })
        }
    }
}
</script>

<style scoped>

</style>
