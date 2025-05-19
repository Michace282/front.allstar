<template>
    <div class="information container">
        <div class="information__navigation">
            <nuxt-link v-if="pagesMenu" :title="link.title" :to="link.url" class="information__link" v-for="(link, index) in pagesMenu.items" :key="`information-${index}`">
                {{link.name}}
            </nuxt-link>
        </div>
        <div class="information__block-text">
            <h1 class="information__header information__header_2" v-if="model">
                {{ model.title }}
            </h1>
            <div v-if="model" v-for="item in model.content">
                <h2 class="information__title">{{ item.title }}</h2>
                <div class="information__text" v-html="item.content"></div>
            </div>
        </div>
    </div>
</template>

<script>

import Menu from '~/models/Menu'

export default {
    name: 'Information',
    props:{
      model:{
          type:Object
      },
        typeMenu:{
          type: String
        }
    },
    computed:{
        pagesMenu(){
            return Menu.query().where('position',`${this.typeMenu}_${this.$i18n.locale}`).first()
        }
    }
}
</script>

<style scoped>

</style>
