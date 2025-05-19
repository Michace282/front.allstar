<template>
    <div class="review__wrap">
        <div class="review__header">
            <div v-if="item.image.length" class="review__no-avatar"></div>
            <div v-else class="review__no-avatar"></div>
            <div class="review__info">
                <p class="review__name">{{ item.name }}</p>
                <p class="review__whois">{{ item.position }}</p>
            </div>
        </div>
        <div class="review__content" :class="{'cut-text': show}">{{ item.content }}</div>
        <button v-if="item.content.length > 190" class="review__btn-show show-animate" @click="show = !show">
            <span class="show-content"> {{ $t('pages.show_text') }}</span>
            <span class="hide"> {{ $t('pages.hide_text') }}</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'MainReviewItem',
    props: {
        item: Object,
    },
    data: () => ({
        show: true,
    }),
}
</script>
