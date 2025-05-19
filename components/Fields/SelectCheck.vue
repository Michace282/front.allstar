<template>
    <div class="multiple-check filters-arrow" :class="filter.slug" v-click-outside="closeOutside" >
        <template v-if="filter && request && request.filters[filter.slug]">
            <div @click="show = !show" style="width: 100% ; padding: 6px 25px 6px 18px;">
                <span class="multiple-check__title">
                    <span class="add">{{ filter.name }}</span>
                </span>
                <span v-if="request.filters[filter.slug].length" class="multiple-check__label">
                    {{ titles }}
                </span>
            </div>
            <div v-show="show" :class="{show}" class="multiple-check__dropdown-menu">
                <el-checkbox-group :value="request.filters[filter.slug]" @input="setValue">
                    <el-checkbox v-for="value in filter.fake_values" :label="value.id" :key="`${filter.id}-${value.id}`">{{ value.title || value.name }}</el-checkbox>
                </el-checkbox-group>
            </div>
        </template>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import filter from '@/mixins/filter'

export default {
    name: 'SelectCheck',
    mixins: [
        filter,
    ],
    props: {
        filter: Object,
        isMain: Boolean
    },
    directives: {
        ClickOutside,
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
            // if(!element.target.matches('.hamburger, .hamburger-box, .hamburger-inner')){
            this.close()
            // }
        },
    },
}
</script>
