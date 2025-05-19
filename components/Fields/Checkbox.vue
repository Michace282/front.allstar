<template>
    <div class="checkbox-list__wrap">
        <template v-if="filter && request && request.filters[filter.slug]">
            <el-checkbox-group :value="request.filters[filter.slug]" @input="setValue">
                <el-checkbox v-for="value in filter.fake_values" :label="value.id" :key="`${filter.id}-${value.id}`">{{ value.title || value.name }}</el-checkbox>
            </el-checkbox-group>
        </template>
    </div>
</template>

<script>
import filter from '@/mixins/filter'
export default {
    name: 'Checkbox',
    mixins: [
        filter
    ],
    props: {
        filter: Object,
        isMain: Boolean,
    }
}
</script>
