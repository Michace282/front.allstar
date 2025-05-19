<template>
    <div class="checkbox-list__wrap">
        <template v-if="filter && request && request.filters[filter.slug]">
            <el-checkbox-group :value="request.filters[filter.slug]" @input="setValue">
                <el-checkbox :label="1" :key="`${filter.id}`">{{ filter.name }}</el-checkbox>
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
