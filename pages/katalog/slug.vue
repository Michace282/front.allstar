<template>
    <main class="help_row">
        <div class="container">
            <div class="product-page">
                <LayoutsBreadcrumbs :breadcrumbs="breadcrumbs"></LayoutsBreadcrumbs>
                <RealtySinglePdf v-if="!model.is_closed" :model="model"/>
                <div v-if="model.is_closed" style="margin-left: auto"></div>
                <BlockSearch blank></BlockSearch>
            </div>
        </div>
        <div class="simple">
            <div class="container">
                <div class="simple__wrap">
                    <div class="simple__product">
                        <div class="simple__title">{{ model.is_closed ? hide_house_number(model.h1[$route.params.deal_type], model.house_number) : model.h1[$route.params.deal_type] }}</div>
                        <div class="simple__row">
                          <div v-if="model.is_closed" class="simple__slider">
                            <div class="simple__slider-main simple__slider-main_slug">
                              <img :src="'/image/' + $route.params.deal_type + '_' + $i18n.locale + '.png'" class="default-image"/>
                            </div>
                          </div>
                          <RealtySingleSlider v-else :model="model"/>

                          <div class="simple__desc">
                                <div class="simple__top-wrap">
                                    <div class="simple__id">{{ $t('realty.id', {id: model.id}) }}</div>
                                    <template v-if="!model.is_closed">
                                      <div class="simple__partners" v-if="model.without_fees === 1"> {{$t('realty.our')}}</div>
                                      <div class="simple__partners" v-else> {{$t('realty.no_our')}} </div>
                                    </template>
                                </div>
                                <div class="simple__address">{{ model.is_closed ? hide_house_number(model.name, model.house_number) : model.name }}</div>
                                <template v-if="!model.is_closed">
                                  <div class="simple__distr" v-if="model.front_complex_name.length || model.front_business_name.length || model.front_district_name.length">
                                      <span v-if="model.front_complex_name.length">{{ model.front_complex_name }}</span>
                                      <span v-if="model.front_business_name.length">{{ model.front_business_name }}</span>
                                      <span v-if="model.front_district_name.length">{{ $t('realty.district', {district: model.front_district_name}) }}</span>
                                  </div>
                                </template>
                                <div class="simple__subway" v-if="model.front_subways.length && !model.is_closed">
                                  <IconMetro></IconMetro>
                                  <span>{{ model.front_subways.join(', ') }}</span>
                                </div>
                                  <a :href="mapUrl" class="pdf-link" ref="mapLink"> <svg style="transform: translate(-2px, 3px);" width="18" height="18" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Капля (верхняя часть булавки) -->
    <path d="M9 1.5C6.1 1.5 3.75 4.1 3.75 7.5c0 3.94 5.25 9.75 5.25 9.75s5.25-5.81 5.25-9.75c0-3.4-2.65-6-5.25-6z" fill="#000000"/>
    <!-- Внутренний круг -->
    <circle cx="9" cy="7.5" r="1.875" fill="#000000"/>
    <!-- Тонкий штырь (нижняя часть) -->
    <path d="M9 16.5V23" stroke="#000000" stroke-width="1.5"/>
</svg>{{ $t('realty.location') }}</a>
                                <div class="simple__price-wrapper">
                                    <div v-if="model.is_sale" class="simple__price-wrap">
                                        <div class="simple__price-text">
                                            {{ $t('realty.sale') }}
                                        </div>
                                        <div class="simple__price" :class="{'main': $route.params.deal_type === 'sale'}">
                                            {{ model.front_sale_price }}
                                        </div>
                                        <div class="simple__price-text mini">
                                            {{ $t('realty.perSqm', {price: model.front_price_per_area_sale}) }}
                                        </div>
                                    </div>
                                    <div v-if="model.is_rent" class="simple__price-wrap">
                                        <div class="simple__price-text">
                                            {{ $t('realty.month_rent') }}
                                        </div>
                                        <div class="simple__price" :class="{'main': $route.params.deal_type === 'rent'}">
                                            {{ model.front_rent_price }}
                                        </div>
                                        <div v-if="model.type == 'business' || model.type == 'building'" class="simple__price-text mini">
                                          {{ $t('realty.perSqm', {price: model.front_price_per_area_rent}) }}
                                        </div>
                                    </div>
                                </div>

                                <template v-if="model.is_closed">
                                  <ul class="simple__list" v-if="model.front_attribute_table.length">
                                    <li class="simple__list-item">
                                      {{ $t('realty.size_sqm') }}
                                            <span>
                                                <b>{{ model.area * 1 }}</b>
                                            </span>
                                    </li>
                                  </ul>
                                </template>
                                <template v-else>
                                  <ul class="simple__list" v-if="model.front_attribute_table.length">
                                    <li class="simple__list-item" v-for="attribute in model.front_attribute_table">
                                      {{ attribute.title }}
                                      <template v-if="attribute.type_back === 'text'">
                                            <span>
                                                <b>{{ attribute.pivot.text }}</b>
                                            </span>
                                      </template>
                                      <template v-else>
                                            <span v-for="value in attribute.relation_values">
                                                <b>{{ value.title }}</b>
                                            </span>
                                      </template>

                                    </li>
                                  </ul>
                                </template>


                                <ul class="simple__tags" v-if="model.front_attribute_features.length && !model.is_closed">
                                    <li class="tag" v-for="attribute in model.front_attribute_features">
                                        {{ attribute.title }}
                                    </li>
                                </ul>
                              <template v-if="!model.is_closed">
                                <ul
                                  v-if="
                                  (model.broker_rent_fee && model.broker_rent_fee) ||
                                  (model.broker_sale_fee && model.broker_sale_fee > 0) ||
                                  (model.utilities_fee && model.utilities_fee > 0) ||
                                  (model.parking_fee && model.parking_fee > 0)
                                  "
                                  class="simple__list"
                                  style="margin-top: 10px"
                                >
                                  <li class="simple__list-item" v-if="broker_rent_fee && model.is_rent">
                                    <span class="simple__price-text c-black">{{ $t('pages.broker_each_fee_one_time_for_rent') }}</span>
                                    <span>
                                        <b>${{ broker_rent_fee.toLocaleString('ru-RU') }}</b>
                                    </span>
                                  </li>
                                  <li class="simple__list-item" v-if="broker_sale_fee && model.is_sale">
                                    <span class="simple__price-text c-black">{{ $t('pages.broker_each_fee_one_time_for_sale') }}</span>
                                    <span>
                                        <b>${{broker_sale_fee.toLocaleString('ru-RU') }}</b>
                                    </span>
                                  </li>
                                  <li class="simple__list-item" v-if="model.utilities_fee && model.utilities_fee > 0">
                                    <span class="simple__price-text c-black">{{ $t('pages.utilities_per_month') }}</span>
                                    <span>
                                        <b>${{ model.utilities_fee.toLocaleString('ru-RU') }}</b>
                                    </span>
                                  </li>
                                  <li class="simple__list-item" v-if="model.parking_fee && model.parking_fee > 0">
                                    <span class="simple__price-text c-black">{{ $t('pages.parking_per_month') }}</span>
                                    <span>
                                        <b>${{ model.parking_fee.toLocaleString('ru-RU') }}</b>
                                    </span>
                                  </li>
                                  <li class="simple__list-item" v-if="model.is_rent">
                                            <span class="simple__price-text c-black"> {{ $t('pages.security_deposit') }}</span>
                                            <span>
                                                <b>${{ sec_deposit.toLocaleString('ru-RU') }}</b>
                                            </span>
                                   </li>
                                </ul>
                              </template>
                            </div>
                        </div>
                        <div class="simple__project">
                            <div class="simple__project-title">{{ $t('pages.description_title') }}</div>
                            <div class="simple__project-desc" :class="{hidden: shows}">
                                <div class="desc" ref="text">
                                    <div v-if="model.is_closed">{{ $t('pages.description_close_text') }}</div>
                                    <div v-else v-html="model.content[$route.params.deal_type]"></div>
                                </div>
                            </div>
                            <button v-if="$refs.text && $refs.text.clientHeight >= 152" class="review__btn-show ">
                                <span class="show-content" v-if="shows" @click="showText">
                                    <p>{{ $t('realty.more') }}</p>
                                    <IconArrowLeftBlue></IconArrowLeftBlue>
                                </span>
                                <span class="hide" v-else @click="showText">
                                    <IconArrowLeftBlue></IconArrowLeftBlue>
                                    <p>{{ $t('pages.hide_text') }}</p>
                                </span>
                            </button>
                            <div class="simple__project-notes" v-if="false">
                                <b>В квартире идет ремонт. Готовность квартиры 01.01.2022</b>
                            </div>
                        </div>
                    </div>
                    <FormRealty v-if="model" :model="model"/>
                </div>
            </div>
        </div>
        <div class="simple__map">
        <div class="container">
          <div class="simple__map__button" @click="map = true" v-show="!map">
            <span class="simple__map__link">{{ $t('realty.show_on_map') }}</span>
          </div>
          <div class="simple__map-wrapper loading" v-if="map">
            <button class="close-btn" @click="map = false">
              <img
                width="10"
                height="10"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNiIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgNiA2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMyAyTDEgMEwwIDFMMiAzTDAgNUwxIDZMMyA0TDUgNkw2IDVMNCAzTDYgMUw1IDBMMyAyWiIgZmlsbD0iI0ZGRkYiLz4KPC9zdmc+Cg==" alt="Loading...">
            </button>
            <div id="map" class="simple__map__map">
              <client-only v-if="!loading">
                <gmap-map ref="mapRef"
                          :center="model.position"
                          :zoom="18"
                >
                  <gmap-custom-marker
                    ref="mark"
                    :clickable="true"
                    :marker="model.position"
                  >
                    <img src="https://admin.allstar.com.ua/uploads/icon/marker.png" alt="Map">
                  </gmap-custom-marker>
                </gmap-map>
              </client-only>
            </div>
          </div>
        </div>
      </div>
        <div class="simple-form_mobile">
          <FormRealty v-if="model" :model="model"/>
        </div>

        <BlockSimilarSliders :block-title="$t(`realty.same_offers_${$route.params.deal_type}`)" :type="$route.params.deal_type"/>
        <BlockMainHelp/>
    </main>
</template>

<script>
import variables from '@/mixins/variables'
import Block from '~/models/Block'
import Menu from '~/models/Menu'
import Setting from '~/models/Setting'
import SingleRealty from '~/models/SingleRealty'
import Page from '~/models/Page'
import RelatedRealty from '~/models/RelatedRealty'
import exception from '@/function/exception'

export default {
    name: 'Realty',
    layout: 'pages',
    mixins: [variables],
    data: () => ({
        map: false,
        shows: false,
    }),
    methods: {
        showText()
        {
            this.shows = !this.shows
        },
        hide_house_number(string, house_number)
        {
            let newStr = string.replace(house_number, '')
            newStr = newStr.replace("  ", " ")
            newStr = newStr.replace("  ", " ")

            return newStr.trim()
        },
    },
    async asyncData({
        $axios,
        route,
        error,
        i18n,
    })
    {
        await Promise.all([
            $axios.$get(`${process.env.API}/ealty/${route.params.slug}`, {params: {locale: i18n.locale}})
                  .then(data => {
                      if(data.id){
                          SingleRealty.create({data})
                      } else {
                          error({
                              statusCode: 404,
                              message: i18n.t('pages.page_not_found'),
                          })
                      }
                  })
                  .catch(e => exception(e, error, i18n)),
            (!Block.exists()) ? $axios.$get(`${process.env.API}/block`, {params: {locale: i18n.locale}})
                                      .then(data => {
                                          Block.create({data})
                                      })
                                      .catch(e => exception(e, error, i18n)) : 1,
            (!Menu.exists()) ? $axios.$get(`${process.env.API}/menu`, {params: {locale: i18n.locale}})
                                     .then(data => {
                                         Menu.create({data})
                                     })
                                     .catch(e => exception(e, error, i18n)) : 1,
            (!Setting.exists()) ? $axios.$get(`${process.env.API}/settings`, {params: {locale: i18n.locale}})
                                        .then(data => {
                                            Setting.create({data})
                                        })
                                        .catch(e => exception(e, error, i18n)) : 1,
        ])
    },
    async mounted()
    {
        await Promise.all([
            this.$axios.$get(`${process.env.API}/similar`, {params: this.params})
                .then((data) => {
                    RelatedRealty.create({data})
                })
                .catch((data) => {}),
        ])
        if(this.$refs.text && this.$refs.text.clientHeight >= 152){
            this.shows = true
        }
    },
    computed: {
        mapUrl() {
           return `https://www.google.com/maps?q=г.Киев ${encodeURIComponent(this.model.name)}&entry=gps&g_st=com.google.maps.preview.copy`;
        },
        broker_rent_fee()
        {
          if (this.model.broker_rent_fee < 0) {
            return this.model.rent_price
          } else if (this.model.broker_rent_fee == 0) {
            return 0
          }

          let num = Math.round((this.model.broker_rent_fee / 100) * this.model.rent_price)

          return num > 500 ? num : 500
        },
        broker_sale_fee()
        {
          if (this.model.broker_sale_fee < 0) {
            return this.model.sale_price
          } else if (this.model.broker_sale_fee == 0) {
            return 0
          }

          let num = Math.round((this.model.broker_sale_fee / 100) * this.model.sale_price)

          return num > 4000 ? num : 4000
        },
        sec_deposit()
        {
          

          let num = Math.round((this.model.rent_price / 100) * this.model.security_deposit)

          return num
        },
        model()
        {
            return SingleRealty.query()
                               .first()
        },
        params()
        {
            return {
                id: this.model.id,
                area: this.model.area,
                rent_price: this.model.rent_price,
                sale_price: this.model.sale_price,
                deal_type: this.$route.params.deal_type,
                realty_type: this.$route.params.realty_type,
                locale: this.$i18n.locale,
            }
        },
        breadcrumbs()
        {
            let url = `/${this.$route.params.realty_type}-${this.$route.params.deal_type}-kiev`
            return [
                {
                    title: this.$t(`catalog.${this.$route.params.realty_type}-${this.$route.params.deal_type}`),
                    url,
                },
                {
                    title: this.model.name,
                    url: `${url}/${this.model.slug}`,
                },
            ]
        },
    },
    head()
    {
        let meta = this.model.meta[this.$route.params.deal_type]
        let img = this.model.front_images.length ? this.model.front_images[0] : null
        let res = {
            title: (meta) ? meta.meta_title : 'All Star',
            meta: [
              {
                hid: 'description',
                name: 'description',
                content: (meta) ? meta.meta_description : 'All Star',
              },
              {
                hid: 'og:title',
                name: 'og:title',
                content: (meta) ? meta.meta_title : 'All Star',
              },
              {
                hid: 'og:description',
                name: 'og:description',
                content: (meta) ? meta.meta_description : 'All Star',
              },
              {
                hid: 'robots',
                name: 'robots',
                content: 'index,follow',
              }
            ]
        }

        if(this.model.is_closed){
          res = {
            title: this.hide_house_number(this.model.name, this.model.house_number),
            meta: [
              {
                hid: 'description',
                name: 'description',
                content: this.hide_house_number(this.model.name, this.model.house_number),
              },
              {
                hid: 'og:title',
                name: 'og:title',
                content: this.hide_house_number(this.model.name, this.model.house_number),
              },
              {
                hid: 'og:description',
                name: 'og:description',
                content: this.hide_house_number(this.model.name, this.model.house_number),
              },
              {
                hid: 'robots',
                name: 'robots',
                content: 'noindex,follow',
              }
            ]
          }
        }

        if(img){
            res.meta.push({
                hid: 'image',
                name: 'image',
                content: img.mediumFree,
            })
            res.meta.push({
                hid: 'og:image',
                name: 'og:image',
                content: img.mediumFree,
            })
        }
        return res
    },
}
</script>

<style lang="scss" scoped>

.simple-form_mobile {
  display: none;
}

@media (max-width: 991px) {
  .simple {
    padding-bottom: 0;
  }
  .simple__wrap .simple__form {
    display: none;
  }
  .simple-form_mobile {
    display: flex;
    padding-bottom: 60px;
  }
}
.simple__map {
    margin-bottom: 35px;


    &__button {
        height: 50px;
        width: 100%;
        border-radius: 13px;
        box-sizing: border-box;
        border: 1px solid hsla(0, 0%, 59.2%, .09);
        cursor: pointer;
        background-image: url(/image/map_bg_slug.png);
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
    }

    &__link {
        line-height: 50px;
        margin-left: auto;
        margin-right: auto;
        font-size: 14px;
        font-weight: 700;
        box-sizing: border-box;
        padding-left: 34px;
        position: relative;
        width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content;
        display: block;

        &:after {
            content: "";
            position: absolute;
            top: 13px;
            left: 0;
            width: 18px;
            height: 24.21px;
            background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMjUiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxOCAyNSIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoICBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTkgMjQuMjEwN0M5IDI0LjIxMDcgMTggMTMuOTcwNiAxOCA5QzE4IDQuMDI5NDQgMTMuOTcwNiAwIDkgMEM0LjAyOTQ0IDAgMCA0LjAyOTQ0IDAgOUMwIDEzLjk3MDYgOSAyNC4yMTA3IDkgMjQuMjEwN1oiCiAgICAgICBmaWxsPSIjRjc3MTAwIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOSAxMC41QzEwLjY1NjkgMTAuNSAxMiA5LjE1Njg1IDEyIDcuNUMxMiA1Ljg0MzE1IDEwLjY1NjkgNC41IDkgNC41QzcuMzQzMTUgNC41IDYgNS44NDMxNSA2IDcuNUM2IDkuMTU2ODUgNy4zNDMxNSAxMC41IDkgMTAuNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=);
            background-repeat: no-repeat;
            background-size: 18px 24.21px;
        }
    }

    &-wrapper {
        border-radius: 10px;
        background-color: #eee;
        width: 100%;
        position: relative;
        height: 460px !important;

        .close-btn {
            cursor: pointer;
            outline: none;
            position: absolute;
            z-index: 15;
            right: 10px;
            top: 14px;
            width: 34px;
            height: 34px;
            border-radius: 4px;
            border: none;
            background: #f77100;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    &__map {
        width: 100%;
        height: 100%;
        border-radius: inherit;
    }
}
.c-black {
  color: #0d253e!important;
}
</style>
