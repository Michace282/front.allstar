<template>
    <div class="gotop show_animate ">
        <a class="gotop__link" @click="goTopInit()" >
            <IconArrowLeftWhite></IconArrowLeftWhite>
        </a>
    </div>
</template>

<style scoped>
.gotop {
    /*top: 90% !important;*/
}
</style>
<script>
export default {
name: "GoTo",
    methods: {
        goTopInit()
        {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        },
    },
}
</script>

