<template>
    <main>
        <template v-if="model">
            <LayoutsBreadcrumbs :breadcrumbs="model.breadcrumbs"></LayoutsBreadcrumbs>
            <BlockAbout :model="model"></BlockAbout>
        </template>
    </main>
</template>

<script>
import Page from '~/models/Page'
import Block from '~/models/Block'
import Menu from '~/models/Menu'
import Setting from '~/models/Setting'
import exception from '@/function/exception'

export default {
    name: 'Pages',
    layout: 'pages',
    async asyncData({
        error,
        $axios,
        route,
        i18n
    })
    {
        await Promise.all([
            $axios.$get(`${process.env.API}/page/${route.params.slug}`, {params: {locale: i18n.locale}})
                  .then(data => {
                      if(data.id){
                          Page.create({data})
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
    computed: {
        model()
        {
            return Page.query()
                       .first()
        },
    },
    head()
    {
        let meta = (this.model) ? this.model.meta : null
        return {
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
                },
            ],
        }
    },
}
</script>

<style scoped>

</style>
