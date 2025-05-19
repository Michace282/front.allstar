<template>
    <div class="dropdown-filter filters-arrow" v-click-outside="closeOutside">
        <template v-if="filter && request && request.filters[filter.slug]">
            <div class="dropdown-filter__button"  @click="show = !show" >
                <span class="bird">{{ (isMain) ? filter.name_front : filter.name }}</span>
                <span class="add" v-if="request.filters[filter.slug].min || request.filters[filter.slug].max">
                    <span v-if="request.filters[filter.slug].min">
                        {{ $helper('rounder', request.filters[filter.slug].min) }}
                        -
                    </span>
                    <span v-if="request.filters[filter.slug].max">
                        {{ $helper('rounder', request.filters[filter.slug].max) }}
                    </span>
                </span>
            </div>
            <div v-show="show" :class="{show, 'expand': (isMain || filter.to.length === 0)}" class="dropdown-filter__dropdown-menu">
                <label class="dropdown-filter__input-label"> {{ (isMain) ? filter.name : filter.from }}
                    <span class="dropdown-filter__number">
                        <el-input
                            :value="request.filters[filter.slug].min"
                            @input="setMin"
                            @keyup.enter.native="search"
                        ></el-input>
                    </span>
                </label>
                <label class="dropdown-filter__input-label"> {{ (isMain) ? '' : filter.to }}
                    <span class="dropdown-filter__number">
                        <el-input
                            :value="request.filters[filter.slug].max"
                            @input="setMax"
                            @keyup.enter.native="search"
                        ></el-input>
                    </span>
                </label>
            </div>
        </template>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import Request from '@/models/Request'

export default {
    name: 'DropdownRange',
    directives: {
        ClickOutside,
    },
    props: {
        filter: Object,
        isMain: Boolean,
    },
    data()
    {
        return {
            show: false,
        }
    },
    computed: {
        request(){
            return Request.query().first()
        }
    },
    beforeMount() {
        if(this.request && !this.request.filters[this.filter.slug]){
            this.setValue({min: null, max: null})
        }
    },
    methods: {
        setMin(value){
            this.setValue({
                max: this.request.filters[this.filter.slug].max,
                min: value,
            })
        },
        setMax(value){
            this.setValue({
                max: value,
                min: this.request.filters[this.filter.slug].min,
            })
        },
        setValue(value)
        {
            let filters = JSON.parse(JSON.stringify(this.request.filters))
            filters[this.filter.slug] = value
            this.request.filters = filters
            this.request.$save()
        },
        close()
        {
            this.show = false
        },
        closeOutside(element)
        {
            this.close()
        },
        search(e)
        {
            this.$nuxt.$emit('search')
            this.close()
        }
    },
}

</script>
