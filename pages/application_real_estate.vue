<template>
    <main class="main">
        <div class="container form-find-object">
            <div class="wrap">
              <div class="left">
                <div class="wrap-1">
                  <div class="wrap-2">
                    <img :src="src" alt="">
                  </div>
                </div>
              </div>
              <div class="right">
                <LayoutsBreadcrumbs></LayoutsBreadcrumbs>
                <h1 class="text-header">{{ $t('form.selection') }}</h1>

                <div class="group">
                  <label for="">{{ $t('form.would') }}*</label>

                  <div class="level-1">
                    <div
                      @click="form.want = typeArrItem.type"
                      v-for="typeArrItem in typeArr"
                      class="button"
                      :class="form.want == typeArrItem.type ? 'active' : ''"
                    >
                      {{ $t('filters_new.' + typeArrItem.type) }}
                    </div>
                  </div>
                </div>

                <div class="group">
                  <label for="">{{ $t('form.property') }}*</label>

                  <div class="level-2">
                    <div
                      @click="form.type = typeObjectItem.type"
                      v-for="typeObjectItem in typeObject"
                      class="button"
                      :class="form.type == typeObjectItem.type ? 'active' : ''"
                    >
                      {{ $t('filters.' + typeObjectItem.type) }}
                    </div>
                  </div>
                </div>

                <div class="group">
                  <label for="">{{ $t('form.describe_what_you_are_looking_for') }}</label>
                  <textarea v-model="form.description" name=""></textarea>
                  <p v-if="hasError('description')" class="error-message">{{ errorText('description') }}</p>
                </div>

                <h3 class="text-header">{{ $t('pages.contact_title') }}</h3>

                <div class="group group-level-3">
                  <div class="level-3">
                    <div>
                      <input type="text" name="name" v-model="form.name" :placeholder="$t('placeholder.name') + '*'" :class="{errored: hasError('name')}">
                      <p v-if="hasError('name')" class="error-message">{{ errorText('name') }}</p>
                    </div>
                    <div>
                      <input type="text" name="surname" v-model="form.surname" :placeholder="$t('placeholder.surname') + '*'" :class="{errored: hasError('surname')}">
                      <p v-if="hasError('surname')" class="error-message">{{ errorText('surname') }}</p>
                    </div>
                  </div>
                </div>

                <div class="group group-level-3">
                  <div class="level-3">
                    <div>
                      <input v-model="form.email" placeholder="E-mail*" name="email" type="text" value="" class="form-section__block-input" :class="{errored: hasError('email')}">
                      <p v-if="hasError('email')" class="error-message">{{ errorText('email') }}</p>
                    </div>
                    <div>
                      <div class="simple__input-line simple__input-line_full">
                        <el-select v-model="form.prefix" :placeholder="$t('placeholder.prefix')" class="type" :class="{errored: hasError('prefix')}" popper-class="number-select" filterable>
                          <el-option
                            v-for="item in countryCodes"
                            :key="item.code"
                            :label="item.dial_code"
                            :value="item.dial_code">
                          </el-option>
                        </el-select>
                        <input v-model="form.phone" :placeholder="$t('placeholder.phone')" name="phone" type="text" class="text-input" :class="{errored: hasError('phone')}">
                      </div>
                      <p v-if="hasError('prefix')" class="error-message">{{ errorText('prefix') }}</p>
                      <p v-if="hasError('phone')" class="error-message">{{ errorText('phone') }}</p>
                    </div>
                  </div>
                </div>
                <button class="submit" :class="showSendMessage ? 'message' : ''" @click.prevent="submitForm()">
                  {{ showSendMessage ? $t('filters_new.application_sent') : $t('form.send') }}
                </button>
              </div>
            </div>
        </div>
    </main>
</template>

<script>

import Block from '@/models/Block'
import Menu from '@/models/Menu'
import Setting from '@/models/Setting'
import variables from '@/mixins/variables'
import countryCodes from '@/mixins/countryCode'

export default {
    name: 'catalog',
    layout: 'pages',
    mixins: [
        variables,
        countryCodes,
    ],
    async asyncData({
        $axios,
        i18n,
        route,
        error,
    })
    {
        await Promise.all([
            (!Block.exists()) ? $axios.$get(`${process.env.API}/block`, {params: {locale: i18n.locale}})
                                      .then(data => {
                                          Block.create({data})
                                      }) : 1,
            (!Menu.exists()) ? $axios.$get(`${process.env.API}/menu`, {params: {locale: i18n.locale}})
                                     .then(data => {
                                         Menu.create({data})
                                     }) : 1,
            (!Setting.exists()) ? $axios.$get(`${process.env.API}/settings`, {params: {locale: i18n.locale}})
                                        .then(data => {
                                            Setting.create({data})
                                        }) : 1,
        ])
    },
    data() {
        return {
            showSendMessage: false,
            typeArr: [
                {
                    type: 'buy',
                },
                {
                    type: 'rent',
                },
            ],
            typeObject: [
                {
                    type: 'house',
                },
                {
                    type: 'apartment',
                },
                {
                    type: 'office',
                },
                {
                    type: 'building',
                },
            ],
            types: {
                house: 'Дом',
                apartment: 'Квартира',
                office: 'Офис',
                building: 'Здание',
            },
            deals: {
                buy: 'Купить',
                rent: 'Арендовать'
            },
            src: '',
            errorForm: {},
            form: {
                form: 'Заявка на подбор недвижимости',
                want: 'buy',
                type: 'house',
                prop: this.$t('filters.app_house'),
                description: '',
                price: '',
                name: '',
                surname: '',
                email: '',
                prefix: '',
                phone: '',
                files: [],
                locale: this.$i18n.locale,
            },
        }
    },
  created() {
    let num =  Math.floor(Math.random() * (6 - 1 + 1) + 1)

    this.src = "/image/application_real_estate_" + num + ".png"
  },
  methods: {
        changeFileInput(files)
        {
            this.form.files = Array.isArray(files) ? files : Array.from(files)
        },
        deleteFile(fileToDel)
        {
            this.form.files = this.form.files.filter((file) => file !== fileToDel)
        },
        submitForm()
        {
            let form = new FormData()

            form.append('form', this.$i18n.t('form.selection'))
            form.append('want', this.deals[this.form.want])
            form.append('type', this.types[this.form.type])
            form.append('description', this.form.description)
            form.append('price', this.form.price)
            form.append('name', this.form.name)
            form.append('surname', this.form.surname)
            form.append('email', this.form.email)
            form.append('prefix', this.form.prefix)
            form.append('phone', this.form.phone)
            form.append('locale', this.form.locale)

            this.$axios
                .$post(`${this.BASE}/api/form/app`, form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {
                  this.form = {
                      want: 'buy',
                      type: 'house',
                      prop: this.$t('filters.app_house'),
                      description: '',
                      price: '',
                      name: '',
                      surname: '',
                      email: '',
                      prefix: '',
                      phone: '',
                      files: [],
                      locale: this.$i18n.locale,
                  }
                  this.errorForm = {}
                  this.showSendMessage = true
                  const tt = this
                  setTimeout(() => tt.showSendMessage = false, 3000);
                })
                .catch((error) => {
                    this.errorForm = error.response.data.errors
                })
        },
        hasError(error)
        {
            return (this.errorForm[error] && this.errorForm[error].length)
        },
        errorText(error)
        {
            return this.errorForm[error].join('<br>')
        },
    },
    head(){
        return {
            title: this.$t('form.selection')
        }
    }
}
</script>

