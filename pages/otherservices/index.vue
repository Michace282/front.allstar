<template>
    <div></div>
</template>

<script>
export default {
    name: 'index',
    asyncData({redirect})
    {
        redirect(301, '/')
    },
}
</script>

<style scoped>

</style>
