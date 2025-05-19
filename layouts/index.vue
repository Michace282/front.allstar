<template>
    <div  class="main-layout home" :class="'locale-' + $i18n.locale">
<!--        <client-only>-->
<!--            <BlockGoTo></BlockGoTo>-->
<!--        </client-only>-->
        <LayoutsTheHeader></LayoutsTheHeader>
        <Nuxt/>
        <LayoutsTheFooter class="footer_extended"></LayoutsTheFooter>
    </div>
</template>

<script>
export default {
name: "index"
}
</script>

<style scoped>

</style>
