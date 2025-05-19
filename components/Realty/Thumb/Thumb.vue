<template>
    <div class="slide show_animate">
        <div class="hot__card">
            <nuxt-link :to="model[`link_${type}`]">
                <picture class="hot__image">
                    <LayoutsLImage :src="model.front_images[0].mediumFree" :alt="model.name" :scroll-container="null"/>
                </picture>
            </nuxt-link>
            <nuxt-link :to="model[`link_${type}`]" class="hot__title link">{{ model.name }}</nuxt-link>
            <p class="hot__description">{{ model.info }}</p>
            <div class="hot__tags" v-if="model.front_attribute_features.length">
                <div class="tag" v-for="attribute in model.front_attribute_features">
                    {{ attribute.title }}
                </div>
            </div>
            <p v-if="type === 'rent'" :data-option="$t('realty.month')" class="hot__footer">
                {{ model.front_rent_price }}
            </p>
            <p v-else class="hot__footer">
                {{ model.front_sale_price }}
            </p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Thumb',
    props: {
        model: {
            type: Object
        },
        type: {
            type: String
        }
    }
}
</script>

<style scoped>

</style>
