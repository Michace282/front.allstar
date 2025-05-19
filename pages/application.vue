<template>
    <main class="main">
        <div class="container form-find-object form-find-object-2">
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
                <h1 class="text-header">{{ $t('form.sale') }}</h1>

                <div class="group">
                  <label for="">{{ $t('form.would') }}*</label>

                  <div class="level-1">
                    <div @click="form.want = 'sale'" class="button" :class="form.want == 'sale' ? 'active' : ''">
                      <span class="icon"></span>{{ $t('filters_new.sale') }}
                    </div>
                    <div @click="form.want = 'pass'" class="button" :class="form.want == 'pass' ? 'active' : ''">
                      <span class="icon"></span>{{ $t('filters_new.pass') }}
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
                  <label for="">{{ $t('placeholder.address') }}*</label>
                  <input type="text" v-model="form.address" name="address">
                </div>

                <div class="group group-textarea">
                  <label for="">{{ $t('placeholder.description') }}</label>
                  <textarea v-model="form.description" name=""></textarea>
                  <p v-if="hasError('description')" class="error-message">{{ errorText('description') }}</p>
                </div>

                <div class="group">
                  <label for="">{{ $t('placeholder.price') }}*</label>
                  <input type="number" v-model="form.price">
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
                        <el-select v-model="form.prefix" :placeholder="$t('placeholder.prefix') + '*'" class="type" :class="{errored: hasError('prefix')}" popper-class="number-select" filterable>
                          <el-option
                            v-for="item in countryCodes"
                            :key="item.code"
                            :label="item.dial_code"
                            :value="item.dial_code">
                          </el-option>
                        </el-select>
                        <input v-model="form.phone" :placeholder="$t('placeholder.phone') + '*'" name="phone" type="text" class="text-input" :class="{errored: hasError('phone')}">
                      </div>
                      <p v-if="hasError('prefix')" class="error-message">{{ errorText('prefix') }}</p>
                      <p v-if="hasError('phone')" class="error-message">{{ errorText('phone') }}</p>
                    </div>
                  </div>
                </div>

                <div class="level-5">
                  <h3 class="">
                    {{ $t('form.photo') }}
                  </h3>

                  <dropzone
                    id="foo"
                    ref="el"
                    @vdropzone-max-files-exceeded="maxfilesexceeded"
                    :options="options"
                    :destroyDropzone="true"
                  >
                    <div class="dz-default dz-message">
                      <span>{{ $t('form.drop_photo') }}</span>
                      <div class="plus">
                        <i>+</i>
                      </div>
                    </div>
                  </dropzone>

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
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'

export default {
    name: 'catalog',
    layout: 'pages',
    components: {
      Dropzone
    },
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
    data()
    {
        return {
            instance: null,
            options: {
              url: "http://httpbin.org/anything",
              addRemoveLinks: true,
              maxFiles: 20,
              paramName: 'files[]',
              dictCancelUpload: "",
              dictCancelUploadConfirmation: "",
              dictRemoveFile: "×",
              uploadMultiple: true,
              parallelUploads: 100,
              dictDefaultMessage: this.$t('form.drop_photo'),
            },
            showSendMessage: false,
            typeArr: [
                {
                    type: 'sale',
                },
                {
                    type: 'pass',
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
              sale: 'Продать',
              pass: 'Сдать'
            },
            src: '',
            errorForm: {},
            form: {
                form: 'Заявка на подбор недвижимости',
                want: 'sale',
                type: 'house',
                prop: this.$t('filters.app_house'),
                address: '',
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

      this.src = "/image/application_" + num + ".png"
    },
    mounted() {
      this.instance = this.$refs.el.dropzone
    },
    methods: {
        maxfilesexceeded(file){
          this.instance.removeFile(file)
        },
        submitForm()
        {
            let form = new FormData()
            for (let i = 0; i < this.instance.files.length; i++) {
              form.append('files[' + i + ']', this.instance.files[i])
            }

            form.append('form', this.$i18n.t('form.sale'))
            form.append('want', this.deals[this.form.want])
            form.append('type', this.types[this.form.type])
            form.append('address', this.form.address)
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
                      want: 'sale',
                      type: 'house',
                      prop: this.$t('filters.app_house'),
                      address: '',
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

                  this.instance.removeAllFiles()
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
            title: this.$t('form.sale')
        }
    }
}
</script>

<style>

</style>
