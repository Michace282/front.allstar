<template>
    <gmap-custom-marker
        ref="mark"
        :clickable="true"
        :marker="model.position"
    >
        <div :class="{'active' :model.is_show}" class="marker"
             @click="open">
            <div v-if="type === 'rent'" class="marker__inner">
                {{ model.front_map_rent_price }}
            </div>
            <div v-else class="marker__inner">
                {{ model.front_map_sale_price }}
            </div>
        </div>
    </gmap-custom-marker>
</template>

<script>

export default {
    name: 'MapMarker',
    props: {
        model: Object,
        type: {
            type: String,
        },
        index: {
            type: Number
        }
    },
    methods: {
        open()
        {
            this.$nuxt.$emit('setSliderRealty', this.index)
            this.model.show()
        },
    },
}
</script>
