<template>
    <el-image :src="src" :alt="alt" :scroll-container="scrollContainer">
        <template slot="placeholder">
            <el-skeleton-item
                variant="image"
                :style="{width: `${width}px`, height: `${height}px`}"
                style="width: 327px; height: 184px;"
            />
        </template>
        <template slot="error">
            <el-skeleton-item
                variant="image"
                :style="{width: `${width}px`, height: `${height}px`}"
                style="width: 327px; height: 184px;"
            />
        </template>
    </el-image>
</template>

<script>
export default {
name: "LImage",
    props: {
        src: String,
        alt: String,
        width: {
            type: String|Number,
            default: 242,
        },
        height: {
            type: String|Number,
            default: 142,
        },
        scrollContainer: {}
    }
}
</script>
