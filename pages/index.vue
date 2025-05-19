<template>
    <main>
        <BlockMainBlock></BlockMainBlock>
        <BlockSliderTop></BlockSliderTop>
        <BlockSliderCompany></BlockSliderCompany>
        <BlockSliderInLine></BlockSliderInLine>
        <BlockHotSliders v-if="rentLoaded" :block-title="$t('pages.hot_offers_rent')" key="pages.hot_offers_rent" type="rent"></BlockHotSliders>
        <BlockGreyLine></BlockGreyLine>
        <BlockHotSliders v-if="rentLoaded" :block-title="$t('pages.hot_offers_sale')" key="pages.hot_offers_sale" type="sale"></BlockHotSliders>
        <BlockMainReview></BlockMainReview>
        <BlockMainHelp></BlockMainHelp>
    </main>
</template>

<script>
import variables from '@/mixins/variables';
import Menu from '~/models/Menu';
import Setting from '~/models/Setting';
import Block from '~/models/Block';
import HotRealty from '~/models/HotRealty';
import Filter from '@/models/Filter';
import Request from '@/models/Request';
import exception from '@/function/exception';

export default {
  name: 'FrontPage',
  layout: 'index',
  mixins: [variables],
  data: () => ({
    rentLoaded: false,
    isLoading: true,
    menuLoadAttempts: 0,
    maxMenuRetries: 3,
  }),
  async asyncData({ $axios, error, i18n }) {
    try {
      Menu.deleteAll();
      Block.deleteAll();
      Setting.deleteAll();
      HotRealty.deleteAll();
      Filter.deleteAll();

      const requests = [
        $axios
          .$get(`${process.env.API}/ealty/hot`, { params: { locale: i18n.locale } }) // Fixed typo: /ealty -> /realty
          .then((data) => {
            console.log('HotRealty data:', data);
            HotRealty.create({ data: data || { items: [] } });
          })
          .catch((e) => {
            console.error('HotRealty error:', e);
            return null;
          }),
        $axios
          .$get(`${process.env.API}/block`, { params: { locale: i18n.locale } })
          .then((data) => {
            console.log('Block data:', data);
            Block.create({ data: data || { items: [] } });
          })
          .catch((e) => {
            console.error('Block error:', e);
            exception(e, error, i18n);
            return null;
          }),
        (async () => {
          let attempts = 0;
          while (attempts < 3) {
            try {
              const data = await $axios.$get(`${process.env.API}/menu`, { params: { locale: i18n.locale } });
              console.log('Menu API response:', data);
              Menu.create({ data: data || { items: [] } });
              return data;
            } catch (e) {
              console.error(`Menu error (attempt ${attempts + 1}):`, e);
              attempts++;
              if (attempts === 3) {
                console.error('Max retries reached for Menu');
                exception(e, error, i18n);
                return { items: [] };
              }
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }
          }
        })(),
        $axios
          .$get(`${process.env.API}/settings`, { params: { locale: i18n.locale } })
          .then((data) => {
            console.log('Setting data:', data);
            Setting.create({ data: data || {} });
          })
          .catch((e) => {
            console.error('Setting error:', e);
            exception(e, error, i18n);
            return null;
          }),
        Promise.resolve(Request.create({ data: { locale: i18n.locale } })),
        $axios
          .$get(`${process.env.API}/v3/filter`, {
            params: {
              locale: i18n.locale,
              deal_type: ['rent', 'sale'],
              realty_type: ['apartment', 'house', 'business'],
              lang: [i18n.locale],
            },
          })
          .then((data) => {
            console.log('Filter data:', data);
            Filter.create({ data: data || {} });
          })
          .catch((e) => {
            console.error('Filter error:', e);
            exception(e, error, i18n);
            return null;
          }),
      ];

      await Promise.allSettled(requests);

      console.log('asyncData loaded:', {
        menus: Menu.query().all(),
        blocks: Block.query().all(),
        settings: Setting.query().all(),
      });

      return { rentLoaded: true, isLoading: false, menuLoadAttempts: 0 };
    } catch (e) {
      console.error('asyncData global error:', e);
      exception(e, error, i18n);
      return { rentLoaded: false, isLoading: false, menuLoadAttempts: 0 };
    }
  },
  computed: {
    metas() {
      return Setting.query().where('key', 'metas').first();
    },
    meta() {
      return this.metas && this.metas.value?.length
        ? this.metas.value.find((value) => value.type === '/')
        : null;
    },
    menus() {
      const menus = Menu.query().all();
      console.log('Menus computed:', menus); // Debug log
      return menus.length
        ? menus.map((item) => ({
            ...item,
            data: item && item.data && Array.isArray(item.data.items)
              ? item.data
              : { items: [] }, // Ensure items is always an array
          }))
        : [{ id: 'fallback', name: 'Home', path: '/', data: { items: [] } }];
    },
    blocks() {
      const blocks = Block.query().all();
      return blocks.length
        ? blocks.map((item) => ({
            ...item,
            data: item && item.data && Array.isArray(item.data.items)
              ? item.data
              : { items: [] },
          }))
        : [];
    },
  },
  methods: {
    hasValidItems(menu) {
      // Helper to check if menu has valid items
      return menu && menu.data && Array.isArray(menu.data.items) && menu.data.items.length > 0;
    },
    async loadData() {
      this.isLoading = true;
      try {
        Menu.deleteAll();
        Block.deleteAll();
        Setting.deleteAll();
        HotRealty.deleteAll();
        Filter.deleteAll();

        const requests = [
          this.$axios
            .$get(`${process.env.API}/ealty/hot`, { params: { locale: this.$i18n.locale } })
            .then((data) => {
              console.log('HotRealty data (client):', data);
              HotRealty.create({ data: data || { items: [] } });
            })
            .catch((e) => {
              console.error('HotRealty error (client):', e);
              return null;
            }),
          this.$axios
            .$get(`${process.env.API}/block`, { params: { locale: this.$i18n.locale } })
            .then((data) => {
              console.log('Block data (client):', data);
              Block.create({ data: data || { items: [] } });
            })
            .catch((e) => {
              console.error('Block error (client):', e);
              exception(e, this.$error, this.$i18n);
              return null;
            }),
         (async () => {
          let attempts = 0;
          while (attempts < 3) {
            try {
              const data = await this.$axios.$get(`${process.env.API}/menu`, { params: { locale: this.$i18n.locale } });
              console.log('Menu API response:', data);
              Menu.create({ data: data || { items: [] } });
              return data;
            } catch (e) {
              console.error(`Menu error (attempt ${attempts + 1}):`, e);
              attempts++;
              if (attempts === 3) {
                console.error('Max retries reached for Menu');
                exception(e, this.$error, this.$i18n);
                return { items: [] };
              }
              await new Promise((resolve) => setTimeout(resolve, 600));
            }
          }
        })(),
          this.$axios
            .$get(`${process.env.API}/settings`, { params: { locale: this.$i18n.locale } })
            .then((data) => {
              console.log('Setting data (client):', data);
              Setting.create({ data: data || {} });
            })
            .catch((e) => {
              console.error('Setting error (client):', e);
              exception(e, this.$error, this.$i18n);
              return null;
            }),
          Promise.resolve(Request.create({ data: { locale: this.$i18n.locale } })),
          this.$axios
            .$get(`${process.env.API}/v3/filter`, {
              params: {
                locale: this.$i18n.locale,
                deal_type: ['rent', 'sale'],
                realty_type: ['apartment', 'house', 'business'],
                lang: [this.$i18n.locale],
              },
            })
            .then((data) => {
              console.log('Filter data (client):', data);
              Filter.create({ data: data || {} });
            })
            .catch((e) => {
              console.error('Filter error (client):', e);
              exception(e, this.$error, this.$i18n);
              return null;
            }),
        ];

        await Promise.allSettled(requests);

        console.log('loadData loaded:', {
          menus: Menu.query().all(),
          blocks: Block.query().all(),
          settings: Setting.query().all(),
        });

        this.rentLoaded = true;
        this.isLoading = false;
      } catch (e) {
        console.error('loadData error:', e);
        exception(e, this.$error, this.$i18n);
        this.isLoading = false;
      }
    },
  },
  mounted() {
    if (!this.rentLoaded || !Menu.query().all().length || !Block.query().all().length) {
      console.log('Mounted: Data missing, reloading...');
      this.loadData();
    } else {
      this.isLoading = false;
    }
  },
  watch: {
    '$route'(to) {
      if (to.path === '/' && (!this.rentLoaded || !Menu.query().all().length || !Block.query().all().length)) {
        console.log('Route changed to /, reloading data...');
        this.loadData();
      }
    },
  },
  head() {
    return {
      title: this.meta ? this.meta.title : 'All Star',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta ? this.meta.description : 'All Star',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.meta ? this.meta.title : 'All Star',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.meta ? this.meta.description : 'All Star',
        },
        {
          hid: 'robots',
          name: 'robots',
          content: 'index,follow',
        },
      ],
    };
  },
};
</script>
<style>
.home .header__submenu {
    top: 130px!important;
  }
</style>