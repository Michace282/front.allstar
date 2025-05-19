<template>
    <div class="select filters-arrow" v-click-outside="closeOutside">
        <div @click="show = !show" class="select__top">
            <span class="select__label">{{ titles || filter.name }}</span>
        </div>
        <div v-show="show" :class="{show}" class="select__dropdown-menu">
            <ul>
                <li v-for="value in filter.fake_values" :class="{active: (request.filters[filter.slug] && request.filters[filter.slug].indexOf(value.id) !== -1)}"
                    @click="setSelect(value)">
                    <span>{{ value.title || value.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import Request from '@/models/Request'
import filter from '@/mixins/filter'

export default {
    name: 'SelectDeal',
    directives: {
        ClickOutside,
    },
    mixins: [
        filter,
    ],
    props: {
        filter: Object,
        isMain: Boolean
    },
    data()
    {
        return {
            show: false,
        }
    },
    methods: {
        close()
        {
            this.show = false
        },
        closeOutside(element)
        {
            this.close()
        },
        setSelect(value)
        {
            if(this.request.filters[this.filter.slug].indexOf(value.id) !== -1){
                this.setValue([])
            } else {
                this.setValue([value.id])
            }
            this.show = false
        }
    }
}
</script>

<style scoped>

</style>
