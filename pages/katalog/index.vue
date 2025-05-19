<template>
    <main>
        <RealtyFilters/>
        <RealtyCatalog :meta="meta"/>
    </main>
</template>

<script>
import Block from '~/models/Block'
import Menu from '~/models/Menu'
import Setting from '~/models/Setting'
import Request from '@/models/Request'
import Filter from '@/models/Filter'
import exception from '@/function/exception'

function makeRequest({
    route,
    i18n,
}){
    let request = Request.query().first()
    if(
        !request ||
        request && (
            ['filters-empty', 'filters-empty___ru', 'filters-empty___en'].indexOf(route.name) === -1 ||
            request.deal_type !== route.params.deal_type ||
            request.realty_type !== route.params.realty_type
        )
    ){
        Request.create({
            data: {
                locale: i18n.locale,
                deal_type: route.params.deal_type,
                realty_type: route.params.realty_type,
            }
        })
        return;
    }
    Request.update({
        where: _=> true,
        data: {
            deal_type: route.params.deal_type,
            realty_type: route.params.realty_type,
        }
    })
}

export default {
    name: 'catalog',
    layout: 'pages',
    async asyncData({
        $axios,
        route,
        error,
        i18n,
    })
    {
        await Promise.all([
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
            makeRequest({
                $axios,
                route,
                error,
                i18n,
            }),
            $axios.$get(`${process.env.API}/v3/filter`, {
                      params: {
                          locale: i18n.locale,
                          deal_type: [route.params.deal_type],
                          realty_type: [route.params.realty_type],
                          lang: [i18n.locale],
                      },
                  })
                  .then(data => {
                      Filter.create({data})
                  }),
        ])
    },
    computed: {
        request()
        {
            return Request.query()
                          .first()
        },
        metas()
        {
            return Setting.query()
                          .where('key', 'metas')
                          .first()
        },
        meta()
        {
            return (this.metas && this.metas.value.length) ? this.metas.value.find(value => {
                return value.type === `/${this.$route.params.realty_type}-${this.$route.params.deal_type}-kiev`
            }) : null
        },
    },
    head()
    {
        return {
            title: (this.meta) ? this.meta.title : 'All Star',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: (this.meta) ? this.meta.description : 'All Star',
                },
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: (this.meta) ? this.meta.title : 'All Star',
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    content: (this.meta) ? this.meta.description : 'All Star',
                }
            ],
        }
    }
}
</script>

<style scoped>

</style>
