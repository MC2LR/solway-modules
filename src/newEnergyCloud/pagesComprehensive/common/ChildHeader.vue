<template>
    <div class="child-header">
        <div class="left clearfix">
            <slot name="left"></slot>
        </div>
        <div class="right clearfix">
            <slot name="right"></slot>
        </div>
        <div class="center">
            <slot name="center"></slot>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.child-header {
    // @include c(background-color, $bg_c7);
    height:61px;
    line-height: 61px;

    .left {
        float: left;
    }

    .right {
        float: right;
    }

    .center {
        width: max-content;
        margin: 0 auto;
        height: 100%;
        line-height: 61px;
    }
}
</style>
