<template>
    <div class="simple__form">
        <div class="form-wrap">
            <el-skeleton
                :loading="loading"
                animated
                :count="1"
            >
                <template slot="template">
                    <div class="simple__person">
                        <figure class="simple__avatar">
                            <picture class="contact__image">
                                <el-skeleton-item
                                    variant="image"
                                    style="width: 84px; height: 84px;"
                                />
                            </picture>
                        </figure>
                        <div class="simple__info" style="width: 100%">
                            <el-skeleton-item variant="h3" class="simple__info-title"/>
                            <el-skeleton-item variant="text" class="simple__info-subtitle" style="width: 70%;"/>
                            <el-skeleton-item variant="h2"/>
                            <span class="contact__phone">
                            </span>
                        </div>
                    </div>
                </template>
                <template v-if="admin">
                    <div class="simple__person">
                        <figure class="simple__avatar">
                            <picture class="contact__image">
                                <LayoutsLImage :src="`${BASE}/${admin.image}`" :alt="admin.name" :width="84" :height="84"/>
                            </picture>
                        </figure>
                        <div class="simple__info">
                            <div class="simple__info-title">{{ admin.name }}</div>
                            <div class="simple__info-subtitle">
                                <span v-for="lang in admin.speakable_langs">{{ lang.value }} </span>
                            </div>
                            <template v-if="model.user_id">
                                <a :href="`tel:+${$helper('parseNumber', phone.value)}`" class="contact__phone" v-for="phone in admin.phones">
                                    <IconPhone></IconPhone>
                                    <span>{{ phone.value }}</span>
                                </a>
                            </template>
                            <template v-else-if="defaultPhone">
                                <a :href="`tel:+${$helper('parseNumber', defaultPhone.value)}`" class="contact__phone">
                                    <IconPhone></IconPhone>
                                    <span>{{ defaultPhone.value }}</span>
                                </a>
                            </template>
                        </div>
                    </div>
                </template>
            </el-skeleton>
            <div class="simple__form-title">
                {{ $t('form.send_message') }}
            </div>
            <BlockForm :model="model"></BlockForm>
        </div>
    </div>
</template>

<script>
import Admin from '@/models/Admin'
import Setting from '@/models/Setting'
import variables from '@/mixins/variables'

export default {
    name: 'Realty',
    data: () => ({
        loading: true
    }),
    mixins: [variables],
    props: {
        model: Object
    },
    computed: {
        admin(){
            return Admin.query().first()
        },
        defaultPhone(){
            return Setting.query().where('key', 'contactFormPhone').first()
        }
    },
    mounted() {
        let path = (this.model.user_id) ? `byId` : `default`
        Promise.all([
            this.$axios.$get(`${process.env.API}/admin/${path}`, {params: {
                    id: this.model.user_id,
                    locale: this.$i18n.locale
                }}).then((data)=>{
                    Admin.create({
                        data
                    })
                .finally(()=>{
                    this.loading = false
                })
            })
        ])
    }
}
</script>

<style scoped>

</style>
