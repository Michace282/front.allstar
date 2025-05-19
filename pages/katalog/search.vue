<template>
    <main>
        <div class="container">
            <div class="product-page">
                <LayoutsBreadcrumbs :breadcrumbs="breadcrumbs"></LayoutsBreadcrumbs>
                <RealtySinglePdf :model="model"/>
                <BlockSearch blank></BlockSearch>
            </div>
        </div>
        <div class="simple">
            <div class="container">
                <div class="simple__wrap">
                    <div class="simple__product">
                        <div class="simple__title">{{ model.h1[$route.params.deal_type] }}</div>
                        <div class="simple__row">
                            <RealtySingleSlider :model="model"/>
                            <div class="simple__desc">
                                <div class="simple__top-wrap">
                                    <div class="simple__id">{{ $t('realty.id', {id: model.id}) }}</div>
                                    <div class="simple__partners" v-if="model.without_fees === 1"> {{$t('realty.our')}}</div>
                                    <div class="simple__partners" v-else> {{$t('realty.no_our')}} </div>
                                </div>
                                <div class="simple__address">{{ model.name }}</div>
                                <div class="simple__distr" v-if="model.front_complex_name.length || model.front_business_name.length || model.front_district_name.length">
                                    <span v-if="model.front_complex_name.length">{{ model.front_complex_name }}</span>
                                    <span v-if="model.front_business_name.length">{{ model.front_business_name }}</span>
                                    <span v-if="model.front_district_name.length">{{ $t('realty.district', {district: model.front_district_name}) }}</span>
                                </div>
                                <div class="simple__subway" v-if="model.front_subways.length">
                                  <IconMetro></IconMetro>
                                  <span>{{ model.front_subways.join(', ') }}</span>
                                </div>
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
                                    </div>
                                </div>

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
                                <ul class="simple__tags" v-if="model.front_attribute_features.length">
                                    <li class="tag" v-for="attribute in model.front_attribute_features">
                                        {{ attribute.title }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="simple__project">
                            <div class="simple__project-title">{{ $t('pages.description_title') }}</div>
                            <div class="simple__project-desc" v-html="model.content[$route.params.deal_type]"></div>
                            <div class="simple__project-notes" v-if="false">
<!--                                TODO   вывести поле-->
                                <b>В квартире идет ремонт. Готовность квартиры 01.01.2022</b>
                            </div>
                        </div>
                    </div>
                    <FormRealty v-if="model" :model="model"/>
                </div>
            </div>
        </div>
        <BlockHotSliders :block-title="$t(`realty.same_offers_${$route.params.deal_type}`)" :type="$route.params.deal_type"></BlockHotSliders>
        <BlockMainHelp class="help_row" v-if="windowWidth > 991"></BlockMainHelp>
        <BlockMainHelp v-else></BlockMainHelp>
    </main>
</template>

<script>
import variables from '@/mixins/variables'
import Block from '~/models/Block'
import Menu from '~/models/Menu'
import Setting from '~/models/Setting'
import SingleRealty from '~/models/SingleRealty'
import HotRealty from '~/models/HotRealty'
import exception from '@/function/exception'

export default {
    name: 'Realty',
    layout: 'pages',
    mixins: [variables],
    async asyncData({
        $axios,
        route,
        error,
        i18n,
    })
    {
        await Promise.all([
            $axios.$get(`${process.env.API}/ealty-admin/${route.params.slug}`, {params: {locale: i18n.locale}})
                  .then(data => {
                      SingleRealty.create({data})
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
                    HotRealty.create({data})
                })
                .catch((data) => {

                }),
        ])
    },
    computed: {
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
                realty_type: this.model.type,
                locale: this.$i18n.locale
            }
        },
        breadcrumbs()
        {
            let url = `/${this.model.type}-${this.$route.params.deal_type}-kiev`
            return [
                {
                    title: this.$t(`catalog.${this.model.type}-${this.$route.params.deal_type}`),
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
        let meta = this.model.meta[this.$route.params.deal_type];
        let img = this.model.front_images.length ? this.model.front_images[0] : null;
        let res = {
            title: (meta) ? meta.meta_title : 'All Star',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: (meta) ? meta.meta_description : 'All Star',
                },{
                    hid: 'og:title',
                    name: 'og:title',
                    content: (meta) ? meta.meta_title : 'All Star',
                },{
                    hid: 'og:description',
                    name: 'og:description',
                    content: (meta) ? meta.meta_description : 'All Star',
                },{
                    hid: 'robots',
                    name: 'robots',
                    content: 'noindex,follow',
                },
            ]
        }
        if(img){
            res.meta.push({
                hid: 'image',
                name: 'image',
                content: img.full,
            })
            res.meta.push({
                hid: 'og:image',
                name: 'og:image',
                content: img.full,
            })
        }
        return res
    }
}
</script>

<style scoped>

</style>
