<template>
    <header class="header">
        <div class="mask left">
            <i class="iconfont icon-back-copy"></i>
        </div>
        <div class="mask right"></div>
        <div class="mask top"></div>
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
            position: relative;

            i.iconfont {
                color: #fff;
                line-height: 74px;
                cursor: pointer;
            }

            &::after {
                content: '';
                background: linear-gradient(to left, transparent, rgba(13, 44, 76, 1));
                position: absolute;
                width: 100px;
                right: -101px;
                top: 0;
                height: 100%;
            }
        }

        &.right {
            width: 300px;
            height: 74px;
            float: right;
            background-color: rgba(13, 44, 76, 1);
            position: relative;

            &::before {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: -30px;
                width: 30px;
                height: 100%;
                background: linear-gradient(to right, transparent, rgba(13, 44, 76, 1));
            }
        }

        &.top {
            height: 20px;
            background-color: transparent;
        }
    }

}
</style>
