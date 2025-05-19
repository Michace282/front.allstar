<template>
    <div class="header">
        <div class="container">
            <div class="header__wrapper" :class="{ active: activeMenu }">
                <nuxt-link to="/" class="header__logo">
                    <IconLogo></IconLogo>
                </nuxt-link>
                <div class="header__wrap">
                    <div class="header__menu">
                        <ul v-if="menu">
                            <li class="header__menu-item" :class="{'header__menu-item-children': (item.data && item.data.length && item.data.items != undefined)}" v-for="(item, index) in menu.items"
                                :key="`menu-${index}`"
                                @mouseover="setImage(item.image)">
                                <nuxt-link :to="item.url" class="item" >{{ item.name }}</nuxt-link>
                                <div class="header__submenu" v-if="item.data && item.data.length">
                                    <ul>
                                        <li v-for="(subItem, subIndex) in item.data" :key="`menu-${index}-${subIndex}`" class="header__submenu-item">
                                            <nuxt-link :to="subItem.url"
                                                       class="header__submenu-item-link"
                                                       @mouseover="setImage(subItem.image)"
                                                    >
                                                {{ subItem.name }}
                                            </nuxt-link>
                                        </li>
                                    </ul>
                                    <div class="header__submenu-img" v-if="image && image.length">
                                        <img :src="`${BASE}${image}`" :alt="item.title">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="header__contact">
                        <div class="icon">
                            <IconPhone></IconPhone>
                        </div>
                        <div class="wrap">
                            <a v-if="phone" :href="`tel:${phone.value}`" class="phone">{{ phone.value }}</a>
                            <a v-if="mail" :href="`mailto:${mail.value}`" class="email">{{ mail.value }}</a>
                        </div>
                    </div>

                    <div class="header__lang" :class="activeLang ? 'active' : ''">
                        <div class="header__lang-wrap">
                          <template v-for="(langsNameItem, key) in langsName">
                            <span v-if="$i18n.locale == key" @click="activeLang = !activeLang">{{ langsNameItem }}</span>
                          </template>
                          <template v-for="(langsNameItem, key) in langsName">
                            <span v-if="activeLang && $i18n.locale != key" @click="selectLang(key)" class="mt-2">{{ langsNameItem }}</span>
                          </template>
                        </div>
                    </div>

                    <a href="" class="header__burger" :class="{ active: activeMenu }" @click.prevent="changeActiveMenu">
                        <span class="header__burger-element header__burger-element_1"></span>
                        <span class="header__burger-element header__burger-element_2"></span>
                        <span class="header__burger-element header__burger-element_3"></span>
                        <span class="header__burger-element header__burger-element_4"></span>
                    </a>
                </div>

                <div class="header__mobile-menu" :class="{ active: activeMenu }">
                    <ul v-if="menu">
                        <li class="header__mobile-menu-item" :class="{'header__mobile-menu-item-children': (item.data && item.data.length && item.data.items != undefined)}" v-for="(item, index) in menu.items"
                            :key="`menu-mobile-${index}`">
                            <nuxt-link :to="item.url" class="item" :title="item.title">{{ item.name }}</nuxt-link>
                            <template v-if="item.data && item.data.length">
                                <span class="btn-triangle" :class="{ open: (activeSubMenu[index] === true) }" @click="setActive(index)">
                                    <IconArrowLeftBlue></IconArrowLeftBlue>
                                </span>
                                <div class="header__mobile-submenu" :class="{ open: (activeSubMenu[index] === true) }">
                                    <ul>
                                        <li v-for="(subItem, subIndex) in item.data" :key="`menu-mobile-${index}-${subIndex}`" class="header__submenu-item">
                                            <nuxt-link :to="subItem.url"
                                                       :title="subItem.title"
                                                       class="header__submenu-item-link">
                                                {{ subItem.name }}
                                            </nuxt-link>
                                        </li>
                                    </ul>
                                </div>
                            </template>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Menu from '~/models/Menu'
import variables from '~/mixins/variables'

import Setting from '~/models/Setting'

export default {
    name: 'TheHeader',
    mixins: [variables],
    data()
    {
        return {
            image: '',
            activeLang: false,
            activeMenu: false,
            activeSubMenu: {},
            nowLang: this.$i18n.locale,
            langsName: {
                uk: 'Укр',
                ru: 'Рус',
                en: 'Eng',
            },
        }
    },
    methods: {
      changeActiveMenu()
        {
          console.log(1)
          console.log(this.activeMenu)
          this.activeMenu = !this.activeMenu
        },
        selectLang(lang)
        {
            this.activeLang = false
            window.location.href = this.switchLocalePath(lang)
        },
        setImage(image)
        {
            this.image = image
        },
        setActive(index)
        {
            let activeSubMenu = JSON.parse(JSON.stringify(this.activeSubMenu))
            activeSubMenu[index] = (activeSubMenu[index] !== true)
            this.activeSubMenu = activeSubMenu
        },
    },
    computed: {
        menu()
        {
            return Menu.query()
                       .where('position', `header_menu_${this.$i18n.locale}`)
                       .first()
        },
        phone()
        {
            return Setting.query()
                          .where('key', 'phoneNumber')
                          .first()
        },
        mail()
        {
            return Setting.query()
                          .where('key', 'contactEmail')
                          .first()
        },
    },
    watch: {
        '$route.fullPath'()
        {
            this.activeMenu = false
            this.activeSubMenu = {}
        },
    },
}
</script>

<style scoped>

</style>
