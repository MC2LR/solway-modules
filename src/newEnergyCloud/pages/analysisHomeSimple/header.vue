<template>
    <div class="header-analysis-home">
        <div class="header-bg-con">
            <span class="header-title">新能云分析首页</span>
            <div class="fullpage" :class="{isFull: isFull}">
                <i @click="toggleFullscreen" class="iconfont icon-quanping1" title="全屏/退出全屏"></i>
            </div>
        </div>
    </div>
</template>

<script>
import {requestFullScreen, exitFull, isFullscreen} from '@comm/tools'
import {widthHeight} from '@comm/mixin'
export default {
  mixins: [widthHeight],
  computed: {
    isFull () {
        return this.vh === window.screen.height
    }
  },
    methods: {
        toggleFullscreen () {
            isFullscreen() ? exitFull() : requestFullScreen()
        }
    }
}
</script>

<style lang="scss" scoped>
[data-pagetheme="darkBlue"] {
    .header-analysis-home{
        background:rgba(6,43,90,.7);
        box-shadow:0px 3px 3px 0px rgba(0,1,1,0.23);
    }
}
[data-pagetheme="dark"] {
    .header-analysis-home{
        background: #132935;
        padding-top: 34px;
        .header-bg-con{
            width:1135px;
            height: 30px;
            margin:0px auto;
            background: url('./images/header-bg.png') no-repeat;
            background-size: 100% 100%;
            .header-title{
                position: relative;
                top: -34px;
            }
        }
    }
}
.header-analysis-home {
    height:67px;
    text-align: center;
    color: #fff;
    line-height: 67px;
    font-size: 22px;
    position: relative;

    &:hover {
        .fullpage.isFull {
            visibility: visible;
        }
    }

    .fullpage {
        float: right;
        width: 25px;
        height: 100%;
        position: absolute;
        z-index: 9;
        right: 20px;
        top: 0;

        &.isFull {
            visibility: hidden;
        }

        i.iconfont {
            cursor: pointer;
            font-size: 25px;
        }
    }
}
</style>
