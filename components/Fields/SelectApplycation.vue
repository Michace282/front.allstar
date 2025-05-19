<template>
    <div class="select filters-arrow" v-click-outside="closeOutside">
        <template v-if="filter">
            <div @click="show = !show" class="select__top">
                <span class="select__label">{{ $t(`filters.${defaultValue}`)}}</span>
            </div>
            <div v-show="show" :class="{show}" class="select__dropdown-menu">
                <ul>
                    <li v-for="field in filter" @click="selectedFeld(field)"><span>{{ $t(`filters.${field.type}`) }}</span></li>
                </ul>
            </div>
        </template>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
    name: 'SelectApplycation',
    directives: {
        ClickOutside,
    },
    props: {
        filter: Array,
        defaultValue:'',
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
        selectedFeld(item){
            this.show = false
            this.$emit("change-select",item.type);
        }
    },
}
</script>

<style scoped>

</style>
