<template>
    <div class="common-header">
        <i class="iconcomm commartboard43 hover-header-con-click linkBtn" @click="showLinkPage()"></i>
        <span class="modelName">{{modelName}}</span>
        <span class="routerName">{{pageName}}</span>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'CommonHeader',
    props: ['modelName'],
    data () {
        return {
            pageName: ''
        }
    },
    created () {
        this.$bus.on('pageName', (v) => { this.pageName = v })
    },
    methods: {
        showLinkPage () {
            this.$bus.$emit('toSlideDown')
        }
    }
}
</script>

<style lang="scss" scoped>
.common-header {
    height: 75px;
    padding: 0 30px;
    border-bottom: 1px solid;
    @include c(border-bottom-color, #335781);
    @include c(background-color, rgba(13, 44, 76, 0.7));
    @include c(color, $text_c0);
    position: relative;

    .linkBtn {
        font-size: 22px;
        line-height: 77px;
        cursor: pointer;
    }

    .modelName {
        display: inline-block;
        font-size: 18px;
        min-width: 140px;
        text-align: center;
        line-height: 75px;
        vertical-align: top;
        border-right: 1px solid;
        @include c(border-right-color, rgba($text_c0, 0.1));
    }

    .routerName {
        font-size: 18px;
        line-height: 75px;
        width: 150px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: block;
        margin: auto;
    }
}
</style>
