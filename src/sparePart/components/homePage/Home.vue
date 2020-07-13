<template>
    <div class="home">
        <page-slide-down></page-slide-down>

        <common-header :modelName="modelName">
            <span class="btn-con">
                <personal-center></personal-center>
            </span>
        </common-header>

        <aside-menu @collapse="v => collapse = v" :class="{collapse: collapse}" class="asede-menu"></aside-menu>

        <transition name="slide-fade">
            <router-view :class="{collapse: collapse}" class="router-view"/>
        </transition>
    </div>
</template>

<script>
import CommonHeader from '@comm/components/CommonHeader'
import personalCenter from '@comm/components/personalCenter/index'
import pageSlideDown from '@comm/components/pageSlideDown/pageSlideDown'
import AsideMenu from './Aside'

export default {
    name: 'Home',
    data () {
        return {
            collapse: false,
            modelName: '备件管理'
        }
    },
  components: {
    CommonHeader,
    personalCenter,
    pageSlideDown,
    AsideMenu
  }
}
</script>

<style lang="scss">
.home .asede-menu .el-menu:not(.el-menu--collapse) {
    width: 200px;
}
</style>

<style lang="scss" scoped>
.home {
    position: relative;

    .btn-con {
        position: absolute;
        right: 30px;
        top: 25px;
    }

    .asede-menu {
        // height: calc(100vh - 100px);
        margin-top: 15px;
    }

    .router-view {
        top: 75px;
        left: 200px;
        width: calc(100% - 200px);
        transition: width,left 300ms cubic-bezier(0.5, 0.1, 0.5, 1);

        &.collapse {
            left: 64px;
            width: calc(100% - 64px);
        }
    }
}
</style>
