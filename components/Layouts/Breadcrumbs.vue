<template>
    <div class="breadcrumbs">
        <div class="container">
            <div class="breadcrumbs__wrap">
                <span class="breadcrumbs__arrow show_animate" @click="backPageBtn">
                    <IconArrowLeftBlue></IconArrowLeftBlue>
                </span>
                <ul v-if="breadcrumbs && breadcrumbs.length">
                    <li >
                        <nuxt-link to="/">{{ $t('pages.home') }}</nuxt-link>
                    </li>
                    <li v-for="(breadcrumb, index) in breadcrumbs">
                        <nuxt-link v-if="(index + 1) !== breadcrumbs.length" :to="breadcrumb.url">{{ breadcrumb.title }}</nuxt-link>
                        <span v-else>{{ breadcrumb.title }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Breadcrumbs',
    props: {
        breadcrumbs: {
            type: Array,
        },
    },
    methods:{
        backPageBtn()
        {
            window.history.back()
        },
    }
}
</script>

<style scoped>

</style>
