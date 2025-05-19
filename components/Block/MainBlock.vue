<template>
    <div class="main-block">
        <div class="container-fluid" v-if="block && request">
            <div class="main-block__wrap">
                <div class="main-block__filters">
                    <div class="main-block__filters-wrap">
                        <div class="main-block__form" v-click-outside="() => show = false">
                            <div class="main-block__form-visible">
                                <div class="main-block__title">
                                    <div class="title" @click="request.deal_type = 'rent'; request.$save()" :class="{active: (request.deal_type  === 'rent')}">
                                        <span>{{ $t('filters.rent') }}</span>
                                    </div>
                                    <div class="title" @click="request.deal_type = 'sale'; request.$save()" :class="{active: (request.deal_type  === 'sale')}">
                                        <span>{{ $t('filters.sale') }}</span>
                                    </div>
                                </div>
                                <div class="main-block__content">
                                    <div class="main-block__tab active">
                                        <FieldsSelectRealty is-main/>
                                        <component v-for="filter in filters" :is="filter.type" :key="`fields-${filter.id}`" :filter="filter" is-main></component>
                                        <BlockSearch ref="code"></BlockSearch>
                                        <span class="more" @click="show = !show" v-if="!show">{{ $t('filters.show_option') }}</span>
                                        <span class="more grey" @click="show = !show" v-else>{{ $t('filters.hide_option') }}</span>
                                        <a href="javascript:void(0);" @click="filter" class="visible show_animate">{{ $t('filters.show') }}</a>
                                    </div>
                                </div>
                            </div>
                            <div class="main-block__form-hidden active" v-show="show">
                                <div class="hide-wrap">
                                    <span class="hide show-animate" @click="show = !show">
                                        <IconArrowLeftBlue></IconArrowLeftBlue>
                                    </span>
                                </div>
                                <component v-for="filter in addFilters" :is="filter.type" :key="`fields-${filter.id}`" :filter="filter" is-main></component>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-block__desc" v-for="(item, index) in block.data">
                    <div class="img">
                        <div class="animation" :style="{'background-image': `url('${BASE}/${item.image}')`}"></div>
                    </div>
                    <div class="desc">
                        <h1 class="title" v-html="item.content"></h1>
                        <div class="text">
                            {{ item.sub_content }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import Block from '~/models/Block'
import variables from '~/mixins/variables'
import Filter from '@/models/Filter'
import Request from '@/models/Request'

export default {
    name: 'MainBlock',
    mixins: [
        variables,
    ],
    directives: {
        ClickOutside,
    },
    data()
    {
        return {
            show: false,
        }
    },
    computed: {
        request()
        {
            return Request.query()
                          .first()
        },
        block()
        {
            return Block.query()
                        .where('template', 'FirstScreenBlock')
                        .first()
        },
        filters()
        {
            let query = Filter.query()
                         .where('is_main', true)
                         .where(query => {
                             return (query.deal_type.indexOf(this.request.deal_type) !== -1)
                         })
                         .where(query => {
                             return (query.realty_type.indexOf(this.request.realty_type) !== -1)
                         })
                         .where(query => {
                             return (query.langs.indexOf(this.$i18n.locale) !== -1)
                         })

          if (this.request.deal_type == 'rent' && this.$i18n.locale == 'en') {
            query.orWhere(query => {
              return (query.id == 43)
            })
          }

          return query.orderBy('sort_order', 'asc').get()
        },
        addFilters()
        {
          let query = Filter.query()
                         .where('is_main', false)
                         .where(query => {
                             return (query.realty_type.indexOf(this.request.realty_type) !== -1)
                         })
                         .where(query => {
                             return (query.deal_type.indexOf(this.request.deal_type) !== -1)
                         })
                         .where(query => {
                             return (query.realty_type.indexOf(this.request.realty_type) !== -1)
                         })
                         .where(query => {
                             return (query.langs.indexOf(this.$i18n.locale) !== -1)
                         })

          if (this.request.deal_type == 'rent' && this.$i18n.locale == 'en') {
            query.where(query => {
              return (query.id != 43)
            })
          }

          return query.orderBy('sort_order', 'asc').get()
        },
    },
    methods: {
        filter(){
            if(this.request.code !== ''){
                this.$refs.code.searchByCode()
            } else {
                this.$router.push({
                    path: `/${this.request.realty_type}-${this.request.deal_type}-kiev/filters`,
                })
            }
        }
    }
}
</script>
