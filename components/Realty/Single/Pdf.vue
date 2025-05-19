<template>
    <div class="print__wrap">
        <div class="print show_animate" @click="generateReport">
            <IconPrinter v-if="hide_preload"/>
            <IconPreloadCircle v-else/>
        </div>

        <client-only>
            <vue-html2pdf
                :show-layout="false"
                :float-layout="true"
                :enable-download="true"
                :preview-modal="true"
                :filename="`${model.h1[$route.params.deal_type]} ID${model.id}`"
                pdf-format="a4"
                pdf-orientation="portrait"
                pdf-content-width="800px"
                :paginate-elements-by-height="1400"
                ref="pdf"
                @progress="onProgress($event)"
                @beforeDownload="beforeDownload"
                :html-to-pdf-options="htmlToPdfOptions"
            >
                <section slot="pdf-content" class="view-pdf-wrapper">
                    <div class="view-pdf">
                        <div class="view-pdf__header">
                            <div class="top">
                                <IconLogo></IconLogo>
                                <div class="simple__person" v-if="admin">
                                    <figure class="simple__avatar">
                                        <picture class="contact__image">
                                            <div class="el-image">
                                                <img :src="`${BASE}/${admin.image}`" alt="Дана Кошиль"
                                                     class="el-image__inner">
                                            </div>
                                        </picture>
                                    </figure>
                                    <div class="simple__info">
                                        <div class="simple__info-title">{{ admin.name }}</div>
                                        <div class="simple__info-subtitle">
                                            <span v-for="lang in admin.speakable_langs">{{ lang.value }} </span>
                                        </div>
                                        <div class="contact__phone">
                                            <template v-if="model.user_id">
                                                <span v-if="model.phones && model.phones[0]">{{ model.phones[0] }}</span>
                                            </template>
                                            <template v-else-if="defaultPhone">
                                                <span>{{ defaultPhone.value }}</span>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="view-pdf__title">
                                 {{ model.h1[$route.params.deal_type] }}
                            </div>
                        </div>
                        <div class="first-page">
                            <div class="view-pdf__content-wrap">
                                <div class="view-pdf__img view-pdf__img-f" v-for="(item,index) in model.front_images" v-if="index < 2" :key="`obj-${index}`">
                                    <div class="img">
                                        <img :src="item.full" :alt="`${model.name} sub ${(index)}`">
                                    </div>
                                </div>
                                <div class="view-pdf__description">
                                    <div class="content content_first" ref="content">
                                        <div class="item-id"> {{ $t('realty.id', {id: model.id}) }}
                                        </div>
                                        <div class="price-wrapper">
                                            <div v-if="model.is_sale" class="price-wrap">
                                                <div class="price-text">
                                                    {{ $t('realty.sale') }}
                                                </div>
                                                <div class="price" :class="{'main': $route.params.deal_type === 'sale'}">
                                                    {{ model.front_sale_price }}
                                                </div>
                                                <div class="price-text mini">
                                                    {{ $t('realty.perSqm', {price: model.front_price_per_area_sale}) }}
                                                </div>
                                            </div>
                                            <div v-if="model.is_rent" class="price-wrap">
                                                <div class="price-text">
                                                    {{ $t('realty.month_rent') }}
                                                </div>
                                                <div class="price" :class="{'main': $route.params.deal_type === 'rent'}">
                                                    {{ model.front_rent_price }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="left">
                                            <ul class="list" v-if="model.front_attribute_table.length">
                                                <li class="item" v-for="attribute in model.front_attribute_table">
                                                    {{ attribute.title }}
                                                    <template v-if="attribute.type_back === 'text'">
                                                      <span>
                                                          <b>{{ attribute.pivot.text }}</b>
                                                      </span>
                                                    </template>
                                                    <template v-else>
                                                    <span v-for="value in attribute.relation_values">
                                                        <b>{{ value.title }}</b>
                                                    </span>
                                                    </template>

                                                </li>
                                            </ul>
                                          <template v-if="!model.is_closed">
                                            <ul
                                              v-if="
                                              (model.broker_rent_fee && model.broker_rent_fee) ||
                                              (model.broker_sale_fee && model.broker_sale_fee > 0) ||
                                              (model.utilities_fee && model.utilities_fee > 0) ||
                                              (model.parking_fee && model.parking_fee > 0)
                                              "
                                              class="list"
                                              style="margin-top: 10px"
                                            >
                                              <li class="item" v-if="broker_rent_fee && model.is_rent">
                                                {{ $t('pages.broker_each_fee_one_time_for_rent') }}
                                                <span>
                                                    <b>${{ broker_rent_fee.toLocaleString('ru-RU') }}</b>
                                                </span>
                                              </li>
                                              <li class="item" v-if="broker_sale_fee && model.is_sale">
                                                {{ $t('pages.broker_each_fee_one_time_for_sale') }}
                                                <span>
                                                    <b>${{broker_sale_fee.toLocaleString('ru-RU') }}</b>
                                                </span>
                                              </li>
                                              <li class="item" v-if="model.utilities_fee && model.utilities_fee > 0">
                                                {{ $t('pages.utilities_per_month') }}
                                                <span>
                                                    <b>${{ model.utilities_fee.toLocaleString('ru-RU') }}</b>
                                                </span>
                                              </li>
                                              
                                              <li class="item" v-if="broker_sale_fee && model.is_sale">
                                                {{ $t('pages.broker_each_fee_one_time_for_sale') }}
                                                <span>
                                                    <b>${{broker_sale_fee.toLocaleString('ru-RU') }}</b>
                                                </span>
                                              </li>
                                              <li class="item" v-if="model.is_rent">
                                                {{ $t('pages.security_deposit') }}
                                                <span>
                                                    <b>${{ sec_deposit.toLocaleString('ru-RU') }}</b>
                                                </span>
                                              </li>
                                            </ul>
                                          </template>
                                        </div>
                                        <div class="right">
                                            <ul class="tags" v-if="model.front_attribute_features.length">
                                                <li class="tag" v-for="attribute in model.front_attribute_features">
                                                    {{ attribute.title }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="content content_second">
                                        <div class="title" style="height: 25px; display: block;">
                                            {{ $t('pages.description_title') }} <br> <a :href="mapUrl" class="pdf-link" ref="mapLink"> <svg style="transform: translate(-1px, 4px);" width="18" height="18" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Капля (верхняя часть булавки) -->
    <path d="M9 1.5C6.1 1.5 3.75 4.1 3.75 7.5c0 3.94 5.25 9.75 5.25 9.75s5.25-5.81 5.25-9.75c0-3.4-2.65-6-5.25-6z" fill="#000000"/>
    <!-- Внутренний круг -->
    <circle cx="9" cy="7.5" r="1.875" fill="#000000"/>
    <!-- Тонкий штырь (нижняя часть) -->
    <path d="M9 16.5V23" stroke="#000000" stroke-width="1.5"/>
</svg>{{ $t('realty.location') }}</a>
                                        </div>
                                        <div class="text" style="margin-top: 20px;" v-html="(this.$route.params.deal_type === 'rent') ? model.content['rent'] : model.content['sale']"></div>

                                    </div>
                                </div>

                                <div class="view-pdf__img-wrapper view-pdf__img-wrapper_first">
                                    <div class="view-pdf__img" v-for="(item,index) in allImages" v-if="index < end" :key="`doc-${index}`">
                                        <div class="img">
                                            <img :src="item" :alt="`${model.name} sub ${(index)}`">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="view-pdf__img-wrapper next-page view-pdf__img-wrapper_first" v-for="col in Math.ceil(leftImages.length / 10)"
                             :key="`item-${col}`">
                            <div class="view-pdf__img" v-for="(item, index) in leftImages.slice(((col - 1) * 10), ((col - 1) * 10) + 10)">
                                <div class="img" :key="`img-${index}`">
                                    <img :src="item" :alt="`${model.name} sub ${(index)}`">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </vue-html2pdf>
        </client-only>
    </div>
</template>

<script>
import Admin from '@/models/Admin'
import Setting from '@/models/Setting'
import variables from '@/mixins/variables'

export default {
    name: 'Pdf',
    mixins: [variables],
    props: {
        model: Object,
    },
    data()
    {
        return {
            start: 1,
            end: 4,
            hide_preload: true,
        }
    },
    computed: {
        mapUrl() {
           return `https://www.google.com/maps?q=г.Киев ${encodeURIComponent(this.model.name)}&entry=gps&g_st=com.google.maps.preview.copy`;
        },
        htmlToPdfOptions() {
      return {
        filename: `${this.model.h1[this.$route.params.deal_type]} ID${this.model.id}.pdf`,
        image: {
            type: 'jpeg',
            quality: 1
        },
        enableLinks: true,
        html2canvas: {
            scale: 4, // Компромисс между качеством и стабильностью
            useCORS: true,
            logging: false,
            windowWidth: 794,
            windowHeight: 1123
        },
        jsPDF: {
            unit: 'in',
            format: 'a4',
            orientation: 'portrait',
            margin: [0.5, 0.5, 0.5, 0.5]
        }
    };
    },
        broker_rent_fee()
        {
          if (this.model.broker_rent_fee < 0) {
            return this.model.rent_price
          } else if (this.model.broker_rent_fee == 0) {
            return 0
          }

          let num = Math.round((this.model.broker_rent_fee / 100) * this.model.rent_price)

          return num > 500 ? num : 500
        },
        broker_sale_fee()
        {
          if (this.model.broker_sale_fee < 0) {
            return this.model.sale_price
          } else if (this.model.broker_sale_fee == 0) {
            return 0
          }

          let num = Math.round((this.model.broker_sale_fee / 100) * this.model.sale_price)

          return num > 4000 ? num : 4000
        },
        sec_deposit()
        {
          

          let num = Math.round((this.model.rent_price / 100) * this.model.security_deposit)

          return num
        },
        admin()
        {
            return Admin.query()
                        .first()
        },
        defaultPhone()
        {
            return Setting.query()
                          .where('key', 'contactFormPhone')
                          .first()
        },
        otherImages()
        {
            let array = []
            this.model.front_documents.forEach((image, index) => {
                if(index > 1){
                    array.push(image)
                }
            })
            this.model.front_images.forEach((image, index) => {
                if(this.model.front_documents.length){
                    if(index > 4){
                        array.push(image)
                    }
                } else {
                    if(index > 4){
                        array.push(image)
                    }
                }
            })
            return array
        },
        allImages()
        {
            let array = []
            this.model.front_documents.forEach((image, index) => {
                array.push(image.pdf)
            })
            this.model.front_images.forEach((image, index) => {
                if(index > 1){
                    array.push(image.full)
                }
            })
            return array
        },
        leftImages()
        {
            let array = []
            this.allImages.forEach((image, index) => {
                if(index >= this.end){
                    array.push(image)
                }
            })
            return array

        }
    },
    methods: {
        generateReport()
        {
            this.hide_preload = false
            console.log(this.$refs.content.clientHeight)
            const docText = document.querySelector('.content.content_second')
            if(docText.clientHeight < 330){
                this.end = 2
            } else if(docText.clientHeight < 554){
                this.end = 0
            } else {
                this.end = 0
            }
            this.$nextTick(()=>{
                this.$refs.pdf.generatePdf()
            })
        },
        async onProgress($event)
        {
            if($event === 100){
                this.hide_preload = true
            }
        },
        beforeDownload({ html2pdf, options, pdfContent }) {
  html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
    const links = this.$refs.mapLink; // Предполагаем массив ссылок
    links.forEach((link) => {
      const rect = link.getBoundingClientRect();
      const x = (rect.left / window.innerWidth) * 800;
      const y = (rect.top / window.innerHeight) * 1122;
      const width = (rect.width / window.innerWidth) * 800;
      const height = (rect.height / window.innerHeight) * 1122;
      pdf.link(x, y, width, height, link.href);
    });
    pdf.save();
  });
}
    },
}
</script>

<style scoped>

li.block-text__text {
    width: 180px;
    display: flex;
    justify-content: space-between;
}

.view-pdf__header,
.first-page {
    page-break-inside: avoid; /* Для браузеров */
    break-inside: avoid; /* Для современных стандартов */
}

.view-pdf__header {
    page-break-after: avoid;
    break-after: avoid;
}

/* Гарантируем, что первая страница не будет разрываться */
.first-page {
    page-break-before: avoid;
    break-before: avoid;
}

.view-pdf {
    page-break-inside: avoid;
    break-inside: avoid;
}

.flex-container, .grid-container {
    display: block !important; /* Принудительно убираем flex/grid */
}

li.block-text__text {
    width: 170px;
    display: flex;
    justify-content: space-between;
}
.tag {
    display:block!important;
    background: none!important;
    color: #000!important;
 font-family: Arial, sans-serif!important;
    word-spacing: 2px!important;/* Раздвигает слова */
    white-space: normal!important; /* Исправляет переносы */
}

/* Ваши стили */
.view-pdf__img-f {
    width: 20px;
    height: 210px;
    overflow: hidden;
    position: relative;
    margin-right: 10px;
    flex: 0 0 78%;
    max-width: 48%;
}

.view-pdf__img-f img {
  border-radius: 4px;
  width: 100%;
  height: auto;
  min-height: 210px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

span.block-text__text.block-text__text_dim.block-text__text_strange.block-text__text_tall {
    color: #9f9d9d;
    padding-right: 7px;
}

.block-text__text span:nth-child(2) {
    text-align: right;
}
</style>
