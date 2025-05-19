<template>

    <div  class="main-layout" :class="'locale-' + $i18n.locale">
        <LayoutsTheHeader></LayoutsTheHeader>
        <Nuxt/>
        <LayoutsTheFooter></LayoutsTheFooter>
    </div>

</template>

<script>
export default {
    name: 'default',
}
</script>

<style scoped>

</style>
