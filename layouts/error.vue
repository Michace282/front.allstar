<template>
    <div>
        <section class="error container">
            <div class="error__description" >{{ $t('error.desc') }}</div>
            <nuxt-link class="error__button show-animate" to="/">{{ $t('error.link') }}
            </nuxt-link>
        </section>
        <div class="image-404">
            <div class="image-404__number"></div>
            <div class="image-404__sun"></div>
            <div class="image-404__back"></div>
            <div class="image-404__oval"></div>
            <div class="image-404__bottom"></div>
            <div class="image-404__subbottom"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'error',
    layout: 'empty',
}
</script>

<style scoped>

</style>
