<template>
    <header class="header">
        <div class="mask left">
            <i class="iconfont icon-back-copy"></i>
        </div>
    </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

header.header {
    position: absolute;
    width: 100%;
    height: 0;
    left: 0;
    top: 0;
    z-index: 2;

    .mask {
        &.left {
            width: 55px;
            height: 74px;
            float: left;
            background-color: rgba(13, 44, 76, 1);
            border-right: 1px solid rgba(255,255,255,.1);

            i.iconfont {
                color: #fff;
                line-height: 74px;
                cursor: pointer;
            }
        }
    }

}
</style>
