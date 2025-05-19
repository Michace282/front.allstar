<template>
    <div class="catalog__item" @mouseenter="$emit('center', model)">
        <div class="catalog__image-wrapper">
          <template v-if="model.is_closed">
            <nuxt-link :to="model[`link_${type}`]">
              <img :src="'/image/' + type + '_' + $i18n.locale + '.png'" class="default-image"/>
            </nuxt-link>
          </template>
          <template v-else>
            <IconVideo v-if="model.video" class="catalog__video" fill="#FFF"/>
            <flicking
              v-if="model.front_images.length"
              :options="main"
              :viewportTag="'div'"
              :cameraTag="'div'"
              :plugins="plugins"
              ref="main">
              <div class="slide" v-for="(slide, slideIndex) in model.front_images" v-if="slideIndex < 7" :key="slideIndex">
                <nuxt-link :to="model[`link_${type}`]">
                  <picture class="catalog__image">
                    <LayoutsLImage :src="slide.mediumFree" :alt="`${model.name} (${(slideIndex + 1)})`" width="327" height="184"/>
                  </picture>
                </nuxt-link>
              </div>
              <div slot="viewport" class="flicking-pagination"></div>
            </flicking>
            <div class="catalog__btn">
              <span class="show_animate prev" @click.prevent="sliderPrev()">
                  <IconArrowCatalog/>
              </span>
              <span class="show_animate next" @click.prevent="sliderNext()">
                  <IconArrowCatalog/>
              </span>
            </div>
          </template>
        </div>
        <div class="DWQ catalog__item-content">
            <nuxt-link :to="model[`link_${type}`]" class="catalog__item-title">{{ model.is_closed ? hide_house_number(model.name, model.house_number) : model.name }}</nuxt-link>
            <template v-if="!model.is_closed">
              <div class="catalog__text" v-if="model.front_complex_name.length || model.front_business_name.length">
                  <span v-if="model.front_complex_name.length">{{ model.front_complex_name }}</span>
                  <span v-if="model.front_business_name.length">{{ model.front_business_name }}</span>
              </div>
            </template>
            <div v-if="model.is_closed" class="catalog__subtext">{{ model.area }} {{ $t('realty.sq_m') }}</div>
            <div v-else class="catalog__subtext">{{ model.info }}</div>
            <div class="catalog__tags" v-if="model.front_attribute_features.length && !model.is_closed">
                <div class="tag" v-for="attribute in model.front_attribute_features">
                    {{ attribute.title }}
                </div>
            </div>
            <div class="catalog__footer">
                <div class="catalog__item-id">{{ $t('realty.id', {id: model.id}) }}</div>
                <div v-if="type === 'sale'" class="catalog__price">
                  <span>{{ model.front_sale_price }}</span>
                  <div class="catalog__per-sqm">
                    {{ $t('realty.perSqm', {price: model.front_price_per_area_sale}) }}
                  </div>
                </div>
                <div v-else-if="type === 'rent' && (model.type == 'business' || model.type == 'building')" class="catalog__price">
                  <span>{{ model.front_rent_price }}</span>
                  <div class="catalog__per-sqm">
                    {{ $t('realty.perSqm', {price: model.front_price_per_area_rent }) }}
                  </div>
                </div>
                <div v-else class="catalog__price">
                  <span>{{ model.front_rent_price }}</span>
                  <div class="catalog__price-month">{{ $t('realty.month') }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Pagination} from '@egjs/flicking-plugins'

export default {
    name: 'Catalog',
    mounted() {},
    data: () => ({
        main: {
            align: 'prev',
            panelsPerView: 1,
            circular: true,
        },
        plugins: [
            new Pagination({type: 'scroll'}),
        ],
    }),
    props: {
        model: Object,
        type: String,
    },
    methods: {
        sliderPrev()
        {
            this.$refs.main.prev()
                .catch(() => {})
        },
        sliderNext()
        {
            this.$refs.main.next()
                .catch(() => {})
        },
        hide_house_number(string, house_number)
        {
          let newStr = string.replace(house_number, '')
          newStr = newStr.replace("  ", " ")
          newStr = newStr.replace("  ", " ")

          return newStr.trim()
        }
    },
}
</script>

<style scoped>
.catalog__price-month {
  content: "Month/";
  position: absolute;
  top: -12px;
  right: 0;
  font-size: 10px;
  line-height: 12px;
  opacity: 0.41;
  color: #0d253e;
  font-weight: 400;
}
</style>
