<template>
    <div class="help"  v-if="block">
        <div class="container">
            <div class="main-title">
                {{ $t('pages.we_can_help') }}
            </div>
        </div>
        <div class="container-fluid">
            <div class="help__wrap">
                <div class="help__img">
                    <img src="/image/back-2.jpg" alt="">
                </div>
                <div class="help__list">
                    <div class="help__item" v-for="(item,index) in  block.data">
                        <div class="help__title">{{ item.name }}</div>
                        <p class="help__text">{{ item.content }}</p>
                        <a :href="item.link_href" class="help__button show_animate">{{ item.link_text }}
                        </a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Block from '~/models/Block'

export default {
    name: 'MainHelp',
    computed: {
        block()
        {
            return Block.query()
                        .where('template', 'WeeCan')
                        .first()
        },

    },
}
</script>

<style scoped>

</style>
