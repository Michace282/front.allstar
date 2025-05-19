<template>
    <div class="contact">
        <div class="container">
            <div class="contact__wrap">
                <div class="contact__left">
                    <div class="contact__top">
                        <div class="contact__title" v-if="model"> {{ model.h1 }}</div>
                        <div class="contact__info-list">
                            <div class="contact__info-item" v-if="model">
                                <div class="img">
                                    <IconPlaceGold></IconPlaceGold>
                                </div>
                                <div class="text">
                                    {{ model.fields.address }}
                                </div>
                            </div>
                            <div class="contact__info-item">
                                <div class="img">
                                    <IconPhone></IconPhone>
                                </div>
                                <div class="text" v-if="model">
                                    <a :href="`tel:${model.fields.phone_1}`">{{ model.fields.phone_1 }}</a>
                                    <a :href="`tel:${model.fields.phone_2}`">{{ model.fields.phone_2 }}</a>
                                    <a :href="`tel:${model.fields.phone_3}`">{{ model.fields.phone_3 }}</a>
                                </div>
                            </div>
                            <div class="contact__info-item" v-if="model">
                                <div class="img">
                                    <IconEmail></IconEmail>
                                </div>
                                <div class="text">
                                    <a :href="`mailto:${model.fields.email}`" class="email">{{ model.fields.email }}</a>
                                </div>
                            </div>
                        </div>
                        <div class="contact__notes" v-if="model" v-html="model.content[0].content"></div>
                    </div>
                    <div class="contact__bottom">
                        <div class="contact__expert-list">
                            <div class="contact__expert-item" v-for="(item,index) in admin" :key="`admin-${index}`">
                                <div class="contact__expert-wrap">
                                    <div class="contact__avatar">
                                        <figure class="contact__image-wrapper">
                                            <picture class="contact__image">
                                                <img v-if="item.image" :alt="item.name" :src="`${BASE}/${item.image}`">
                                            </picture>
                                        </figure>
                                    </div>
                                    <div class="contact__personal-info">
                                        <div class="contact__name">
                                            {{ item.name }}
                                        </div>
                                        <div class="contact__job">
                                            {{ item.position }}
                                        </div>
                                        <div class="contact__lngs" v-if="item.speakable_langs">
                                            <div style="display: inline-block;" v-for="lang in item.speakable_langs">
                                                {{ lang.value }} 
                                            </div>
                                        </div>
                                        <a :href="`tel:+${$helper('parseNumber', phone.value)}`" class="contact__phone" v-for="phone in item.phones">
                                            <IconPhone></IconPhone>
                                            <span>{{ phone.value }}</span>
                                        </a>
                                        <a :href="`mailto:${item.email}`" class="contact__email">{{ item.email }}</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contact__form">
                    <div class="form-wrap">
                        <div class="simple__form-title">
                            {{ $t('form.write_to_us') }}
                        </div>
                        <BlockForm></BlockForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Setting from '~/models/Setting'
import Admin from '~/models/Admin'
import variables from '~/mixins/variables'

export default {
    name: 'Contact',
    mixins: [variables],
    props: {
        model: {
            type: Object,
        },
    },
    computed: {
        admin()
        {
            return Admin.query()
                        .orderBy('sort_order', 'asc')
                        .all()
        },
    },
}
</script>

