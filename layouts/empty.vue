<template>
  <div  class="main-layout" :class="'locale-' + $i18n.locale">
        <LayoutsTheHeader class="header_static"></LayoutsTheHeader>
        <Nuxt/>
    </div>
</template>

<script>
export default {
name: "empty"
}
</script>

<style scoped>

</style>
