<template>
    <div class="block">
        <div class="one" :style="{backgroundColor: backgroundColor}">{{status}}</div>
        <div class="two" :style="{backgroundColor: backgroundColorOpacity, borderColor: backgroundColor}">{{value}}</div>
    </div>
</template>

<script>
export default {
    props: {
        status: {
            type: String
        },
        value: {
            default: '-'
        },
        backgroundColor: {
            type: String
        },
        backgroundColorOpacity: {
            type: String
        }
    },
    data () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.block {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 46px;
    font-size: 24px;
    .one {
        width: 100%;
        height: 50%;
    }
    .two {
        width: 100%;
        height: 50%;
        border: 2px solid;
        border-top: 0;
    }
}
</style>
