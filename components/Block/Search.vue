<template>
    <div class="search">
        <input
            v-if="request"
            v-model="request.code"
            :placeholder="$t('filters.code')"
            class="search__search-input"
            type="text"
            @change="request.$save()"
            @keydown.13="searchByCode()"
        />
        <a
            class="search__search-button"
            href="javascript:void(0);"
            @click.prevent="searchByCode()"
        ></a>
        <div v-if="has_error" class="search__error">
            {{ $t('filters.code_error') }}
        </div>
    </div>
</template>

<script>
import Request from '@/models/Request'

export default {
    name: 'Search',
    data: () => ({
        has_error: false,
    }),
    fetch() {
        if(!this.request){
            Request.new()
        }
    },
    computed: {
        request(){
            return Request.query().first()
        }
    },
    props: {
        blank: Boolean,
    },
    methods: {
        searchByCode() {
    let code = this.request.code.replace(/[a-zA-Z]/gi, '')
    this.$axios
      .$get(`${process.env.API}/ealty/byCode/${code}`)
      .then((res) => {
        let type = this.request.code.toLowerCase().replace(/[0-9]/g, "")
        if (!res.id || (res.id && !res.state && type !== 'a')) {
          this.has_error = true
          return
        }

        let deal_type = 'rent'
        if (type === 's') {
          deal_type = 'sale'
        } else if (type === 'r') {
          deal_type = 'rent'
        } else if (res.is_sale) {
          deal_type = 'sale'
        }

        let href
        if (type === 'a') {
          href = `/search-${deal_type}/${res.slug}`
        } else {
          href = `/${res.type}-${deal_type}-kiev/${res.slug}`
        }

        if (this.blank) {
          window.open(href, '_blank')
        } else {
          this.$router.push(href)
        }
      })
      .catch((res) => {
        this.has_error = true
      })
    setTimeout(() => {
      this.has_error = false
    }, 10000)
  }
    },
}
</script>
