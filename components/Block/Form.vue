<template>
    <div class="form-wrapper">
        <div v-if="successForm" class="success-form">
            {{ $t('form.success_form') }}
        </div>
        <form v-else class="block-contact__form">
            <div class="simple__input-line">
                <input v-model="form.name" :placeholder="$t('placeholder.name')" name="name" type="text" class="text-input" :class="{errored: hasError('name')}">
                <p v-if="hasError('name')" class="error-message">{{ errorText('name') }}</p>
            </div>
            <div class="simple__input-line">
                <input v-model="form.surname" :placeholder="$t('placeholder.surname')" name="surname" type="text" class="text-input" :class="{errored: hasError('surname')}">
                <p v-if="hasError('surname')" class="error-message">{{ errorText('surname') }}</p>
            </div>
            <div class="simple__input-line simple__input-line_full">
                <el-select v-model="form.prefix" :placeholder="$t('placeholder.prefix')" class="type" popper-class="number-select" filterable>
                    <el-option
                        v-for="item in countryCodes"
                        :key="item.code"
                        :label="item.dial_code"
                        :value="item.dial_code">
                    </el-option>
                </el-select>
                <input v-model="form.phone" :placeholder="$t('placeholder.phone')" name="phone" type="text" class="text-input" :class="{errored: hasError('phone')}">
            </div>
            <div class="simple__input-line block-contact__input-line_mt">
                <p v-if="hasError('prefix')" class="error-message">{{ errorText('prefix') }}</p>
                <p v-if="hasError('phone')" class="error-message">{{ errorText('phone') }}</p>
            </div>
            <div class="simple__input-line">
                <input v-model="form.email" placeholder="E-mail" name="e-mail" type="text" class="text-input" :class="{errored: hasError('email')}">
                <p v-if="hasError('email')" class="error-message">{{ errorText('email') }}</p>
            </div>
            <div class="block-contact__input-block">
                <textarea v-model="form.message" :placeholder="$t('placeholder.message')" class="textarea-input" :class="{errored: hasError('message')}"></textarea>
                <p v-if="hasError('message')" class="error-message">{{ errorText('message') }}</p>
            </div>
            <button class="simple__submit" :disabled="disableBtn" @click.prevent="submitForm()">
                <div v-if="!disableBtn" class="text-btn">{{ $t('form.send') }}</div>
                <div v-else class="text-preload"><img src="/image/preload.svg" alt="preload"></div>
            </button>
        </form>
    </div>

</template>

<script>
import variables from '@/mixins/variables'
import countryCodes from '@/mixins/countryCode'

export default {
    name: 'Form',
    mixins: [
        variables,
        countryCodes,
    ],
    props: {
        model: Object
    },
    data()
    {
        return {
            errorForm: {},
            successForm: false,
            disableBtn: false,
            form: {
                name: '',
                surname: '',
                prefix: '',
                phone: '',
                email: '',
                message: (this.model) ? this.$t('form.message_form', {name: this.model.name, code: this.model.id}) : '',
                source: 'https://allstar.com.ua',
                locale: this.$i18n.locale,
            },
        }
    },
    mounted()
    {
        if(process.client && localStorage.getItem('formSendData') !== null){
            let getFormStorage = JSON.parse(localStorage.getItem('formSendData'))
            this.form.name = getFormStorage.name
            this.form.surname = getFormStorage.surname
            this.form.prefix = getFormStorage.prefix
            this.form.phone = getFormStorage.phone
            this.form.email = getFormStorage.email
        }

      if(this.$i18n.locale === 'ru'){
        this.form.source = 'allstar.com.ua' + this.$route.path
      } else if(this.$i18n.locale === 'en') {
        this.form.source = 'allstarkievrealty.com' + this.$route.path
      } else if(this.$i18n.locale === 'uk'){
        this.form.source = 'allstar.in.ua' + this.$route.path
      }
    },
    methods: {
        hideSuccess(interval)
        {
            this.successForm = true
            this.$nextTick(() => {
                setTimeout(() => {
                    this.successForm = false
                }, interval)
            })
        },
        submitForm()
        {
            this.errorForm = {}
            this.disableBtn = true
            this.$axios.$post(`${this.BASE}/api/form/contact`, this.form)
                .then((response) => {
                    this.hideSuccess(3000)
                    localStorage.setItem('formSendData', JSON.stringify(this.form))
                })
                .catch((error) => {
                    if(error.response && error.response.status === 422){
                        this.errorForm = error.response.data.errors
                    }
                })
                .finally(()=>{
                    this.disableBtn = false
                })
        },
        hasError(error)
        {
            return (this.errorForm[error] && this.errorForm[error].length)
        },
        errorText(error)
        {
            return this.errorForm[error].join('<br>')
        }
    }
}
</script>

<style scoped>

</style>
