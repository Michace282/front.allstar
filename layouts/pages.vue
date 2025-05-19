<template>

    <div  class="main-layout" :class="'locale-' + $i18n.locale">
<!--        <client-only>-->
<!--            <BlockGoTo></BlockGoTo>-->
<!--        </client-only>-->
        <LayoutsTheHeader class="header_static"></LayoutsTheHeader>
        <Nuxt/>
        <LayoutsTheFooter></LayoutsTheFooter>
    </div>
</template>

<script>
export default {
    name: 'pages',
}
</script>

<style scoped>

</style>
