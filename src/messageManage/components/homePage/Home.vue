<template>
    <div class="home">
        <page-slide-down-admin v-if="!independent"></page-slide-down-admin>

        <common-header :modelName="modelName">
            <span class="btn-con">
                <public-notice></public-notice>
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
import { independent } from '@comm/tools/env'
import CommonHeader from '@comm/components/CommonHeader'
import personalCenter from '@comm/components/personalCenter/index'
import publicNotice from '@comm/components/publicNotice/publicNotice'
import fullScreen from '@comm/components/fullScreen/index'
import pageSlideDownAdmin from '@comm/components/pageSlideDownAdmin/pageSlideDownAdmin'

export default {
    data () {
        return {
            independent: independent,
            modelName: '消息推送管理'
        }
    },
  components: {
    CommonHeader,
    personalCenter,
    publicNotice,
    fullScreen,
    pageSlideDownAdmin
  }
}
</script>

<style lang="scss" scoped>
.home {
    position: relative;

    .btn-con {
        position: absolute;
        right: 30px;
        top: 19px;
    }

    .router-view {
        top: 75px;
        left: 0;
        width: 100%;
        transition: width,left 300ms cubic-bezier(0.5, 0.1, 0.5, 1);
    }
}
</style>
