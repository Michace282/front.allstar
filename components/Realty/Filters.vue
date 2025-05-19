<template>
    <div class="filters">
        <div class="container" v-if="filters">
            <div class="filters__top">
                <FieldsSelectDeal is-catalog/>
                <FieldsSelectRealty is-catalog/>
                <component v-for="filter in filters" :is="filter.type" :key="`fields-${filter.id}`" :filter="filter"></component>
                <BlockSearch v-if="windowWidth > 991" ref="code"></BlockSearch>
                <a href="javascript:void(0);" v-if="['filters-empty', 'filters-empty___ru', 'filters-empty___en'].indexOf($route.name) !== -1" @click="clear"
                   class="delete show_animate"> {{ $t('filters.delete') }}
                </a>
                <a href="javascript:void(0);" v-if="['filters-empty', 'filters-empty___ru', 'filters-empty___en'].indexOf($route.name) !== -1" @click="clear"
                   class="delete-mobile show_animate">
<IconFilterClear></IconFilterClear>
                </a>
                <a href="javascript:void(0);" class="visible show_animate" @click="filter" v-if="windowWidth  > 991">{{ $t('filters.show') }}</a>
                <a href="javascript:void(0);" :class="{open: $store.getters['show_ui/getActiveMap']}" @click="toggleMap" class="show_map show-item">
                    <IconMap></IconMap>
                </a>
                <a
                    href="javascript:void(0);" :class="{
                   open: $store.getters['show_ui/getActiveFilters'],
                   active: ['filters-empty', 'filters-empty___ru', 'filters-empty___en'].indexOf($route.name) !== -1
                }" @click="toggleFilters" class="show_filters show-item">
                    <IconMore></IconMore>
                </a>
            </div>
        </div>
        <div class="filters__bottom" v-click-outside="() => {show = false}">
            <div v-if="windowWidth  > 991" class="container">
                <div class="filters__more" v-if="!show" @click="show = !show">
                    {{ $t('filters.show_option') }}
                </div>
                <div v-else class="filters__more grey" @click="show = !show">
                    {{ $t('filters.hide_option') }}
                </div>
            </div>
            <div class="filters__dropdown-wrap" v-show="show" :class="{'open': $store.getters['show_ui/getActiveFilters']}">
                <div class="container">
                    <div class="filters__dropdown-wrapper">
                        <div v-for="(column, name, index) in columns" :class="'filters__col index_' + index">
                            <BlockSearch v-if="windowWidth <= 991 && index === 0" :style="{'width': '100%'}" ref="code"/>
                            <component v-for="filter in column" :is="filter.type" :key="`fields-${filter.id}`" :filter="filter" :is-main="windowWidth <= 991"></component>
                        </div>
                    </div>
                    <div class="filters__btn">
                        <span class="hide" @click="show = false; $store.commit('show_ui/setActiveFilters', false)">{{ $t('filters.hide_option') }}</span>
                        <span class="show show_animate" @click="filter">{{ $t('filters.show') }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import variables from '@/mixins/variables'
import ClickOutside from 'vue-click-outside'
import Filter from '@/models/Filter'
import Request from '@/models/Request'
import RealtyPagination from '@/models/RealtyPaginate'

export default {
    mixins: [variables],
    name: 'Filters',
    directives: {
        ClickOutside,
    },
    mounted()
    {
        this.$nuxt.$on('search', this.filter)
    },
    data()
    {
        return {
            show: false,
        }
    },
    watch:{
        $route (to, from){
            // this.$store.commit('show_ui/setActiveMap', !this.$store.getters['show_ui/getActiveMap'])
        }
    },
    methods: {
        toggleMap()
        {
            this.$store.commit('show_ui/setActiveMap', !this.$store.getters['show_ui/getActiveMap'])
        },
        toggleFilters()
        {
            this.$store.commit('show_ui/setActiveFilters', !this.$store.getters['show_ui/getActiveFilters'])
        },
        clear()
        {
            this.$router.push({
                path: `/${this.request.realty_type}-${this.request.deal_type}-kiev`,
            })
        },
        filter()
        {
            if(this.request.code !== ''){
                this.$refs.code.searchByCode()
                return
            }
            this.$nuxt.$loading.start
            this.$router.push({
                path: `/${this.request.realty_type}-${this.request.deal_type}-kiev/filters`,
                query: {
                    page: this.request.page,
                    sort: this.request.sort,
                },
            })
            this.$axios.$post(`${process.env.API}/ealty`, this.request)
                .then((data) => {
                    RealtyPagination.create({data})
                                    .finally(() => {
                                        this.$nuxt.$loading.finish
                                    })
                })
            this.$store.commit('show_ui/setActiveFilters', false)
            this.show = false
        },
    },
    computed: {
        request()
        {
            return Request.query()
                          .first()
        },
        global()
        {
            return Filter.query()
                         .where('is_global', true)
                         .orderBy('sort_order', 'asc')
                         .get()
        },
        filters()
        {
            if(this.windowWidth > 991){
                return Filter.query()
                             .where('is_main', true)
                             .orderBy('sort_order', 'asc')
                             .get()
            }
            return []
        },
        addFilters()
        {
            let query = Filter.query()
                              .orderBy('sort_order', 'asc')
            if(this.windowWidth > 991){
                query.where('is_main', false)
            }
            return query.get()
        },
        columns()
        {
            let col = {}
            this.addFilters.forEach((filter) => {
                if(col[filter.position]){
                    col[filter.position].push(filter)
                } else {
                    col[filter.position] = []
                    col[filter.position].push(filter)
                }
            })
            return col
        },
    },
}
</script>

<style scoped>

</style>
