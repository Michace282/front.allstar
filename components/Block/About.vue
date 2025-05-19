<template>
    <div class="about-us container" v-if="model">
        <div v-for="(item,index) in model.content" v-if="item.width === 'two_columns'" class="about-us__block about-us__block_1">
            <h1 class="about-us__title">{{ model.h1 }}</h1>
            <div class="about-us__text" v-html="item.content"></div>
        </div>
        <div v-for="(item,index) in model.content" v-if="item.width === 'image'" class="about-us__block about-us__block_2">
            <div v-html="item.content"></div>
        </div>
        <div v-for="(item,index) in model.content" v-if="item.width === 'full_width'" class="about-us__block about-us__block_3">
            <div class="about-us__text">
                <div class="about-us__text" v-html="item.content">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'About',
    props: {
        model: {
            type: Object,
        },
    },

}
</script>


<style>
.about-us__block h6 {
    padding-left: 21px;
    margin: 0;
    position: relative;
    font-size: 15px;
    line-height: 27px;
}

.about-us__block h6::after {
    background-image: url("/image/place-blue.svg");
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 10px;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left 0 top 5px;
}

.about-us__block a[href^="tel"] {
    position: relative;
    padding-left: 21px;
    font-weight: 700;
}

.about-us__block a[href^="tel"]:first-child::after {
    /* background-image: url("/phone-blue.svg"); */
    width: 11px;
    position: absolute;
    content: "";
    left: 0;
    top: 0px;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left 0 top 5px;
}

.about-us__block a[href^="mail"] {
    color: #f77100;
    position: relative;
    padding-left: 21px;
}

.about-us__block a[href^="mail"]::after {
    width: 13px;
    background-image: url("/image/email-icon-orange.svg");
    position: absolute;
    content: "";
    left: 0;
    top: 3px;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left 0 top 5px;
}
</style>
