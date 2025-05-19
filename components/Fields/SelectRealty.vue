<template>
    <div class="select filters-arrow" v-click-outside="close">
        <div @click="show = !show" class="select__top">
            <div style="width: 100% ; padding: 6px 25px 6px 18px;">
                <span class="select__label">{{ $t(`filters.${request.realty_type}`) }}</span>
            </div>
        </div>
        <div v-show="show" :class="{show}" class="select__dropdown-menu">
            <ul>
                <li v-for="value in values" :class="{active: request.realty_type === value.value}" @click="select(value.value)">
                    <span>{{ $t(`filters.${value.value}`) }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import Request from '@/models/Request'

export default {
    name: 'SelectRealty',
    directives: {
        ClickOutside,
    },
    props: {
        isCatalog: Boolean,
        isMain: Boolean,
    },
    data: () => ({
        show: false,
        values: [
            {
                value: 'apartment',
            },
            {
                value: 'house',
            },
            {
                value: 'business',
            },
            {
                value: 'building',
            },
        ],
    }),
    methods: {
        close()
        {
            this.show = false
        },
        select(realty_type)
        {
            if(this.isMain){
                this.request.realty_type = realty_type
                this.request.$save()
            }
            this.close()
            if(this.isCatalog){
                this.$router.push({
                    params: {
                        realty_type,
                    },
                })
            }
        },
    },
    computed: {
        request()
        {
            return Request.query()
                          .first()
        },
    },
}
</script>

<style scoped>

</style>
