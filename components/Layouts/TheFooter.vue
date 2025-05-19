<template>
    <div class="footer">
        <div class="container">
            <div class="footer__wrap">
                <div class="footer__top" v-if="menu">
                    <div class="footer__item" v-for="(item, index) in menu.items">
                        <div class="footer__item-title">{{ item.title }}</div>
                        <ul class="footer__item-links" v-for="(link, idx) in item.data">
                            <li>
                                <nuxt-link :to="link.url" class="footer__item-link" :title="link.title">
                                    {{ link.name }}
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="footer__bottom">
                    <div class="footer__logo">
                        <nuxt-link to="/">
                            <IconLogoWhite></IconLogoWhite>
                        </nuxt-link>
                    </div>
                    <div class="footer__text">
                        {{ $t('pages.agent') }}
                    </div>
                    <div class="footer__social" v-if="social">
                        <a :href="item.link" target="_blank" v-for="(item,index) in social.value" :key="`element-${index}`">
                            <img :src="`${BASE}/${item.icon}`" :alt="item.alt">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <client-only>
            <BlockGoTo></BlockGoTo>
        </client-only>
    </div>
</template>

<script>
import Setting from '~/models/Setting'
import variables from '~/mixins/variables'
import Menu from '@/models/Menu'

export default {
    name: 'TheFooter',
    mixins: [variables],
    computed: {
        menu()
        {
            return Menu.query()
                       .where('position', `footer_menu_${this.$i18n.locale}`)
                       .first()
        },
        social()
        {
            return Setting.query()
                          .where('key', 'social')
                          .first()
        },

    },
}

</script>


