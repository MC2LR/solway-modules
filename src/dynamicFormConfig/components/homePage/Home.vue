<template>
    <div class="home">
        <page-slide-down></page-slide-down>

        <common-header :modelName="modelName">

            <span class="routerName">{{pageName}}</span>

            <span class="btn-con">
                <full-screen style="margin: 0 30px;"></full-screen>
                <personal-center></personal-center>
            </span>
        </common-header>

        <transition name="slide-fade">
            <router-view class="router-view"/>
        </transition>
    </div>
</template>

<script>
import CommonHeader from '@comm/components/CommonHeader'
import personalCenter from '@comm/components/personalCenter/index'
import fullScreen from '@comm/components/fullScreen/index'
import pageSlideDown from '@comm/components/pageSlideDown/pageSlideDown'

export default {
    name: 'Home',
    data () {
        return {
            modelName: '动态表单配置',
            pageName: ''
        }
    },
  components: {
    CommonHeader,
    personalCenter,
    fullScreen,
    pageSlideDown
  }
}
</script>

<style lang="scss" scoped>
.home {
    color: #fff;
    position: relative;

    .paging {
        margin-left: 200px;
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

    .btn-con {
        position: absolute;
        right: 30px;
        top: 25px;
    }

    .router-view {
        top: 75px;
    }
}
</style>
