<template>
    <div class="home">
        <page-slide-down-admin></page-slide-down-admin>

        <common-header :modelName="modelName">
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
// import {getThemeColors} from '@comm/assets/themes'
import CommonHeader from '@comm/components/CommonHeader'
import personalCenter from '@comm/components/personalCenter/index'
import fullScreen from '@comm/components/fullScreen/index'
import pageSlideDownAdmin from '@comm/components/pageSlideDownAdmin/pageSlideDownAdmin'

export default {
    name: 'Home',
    data () {
        return {
            modelName: '电站管理'
        }
    },
    components: {
    CommonHeader,
    personalCenter,
    fullScreen,
    pageSlideDownAdmin
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

// .test {
//     height: 50vh;
//     padding: 30px;
//     font-size: 20px;

//     > .container {
//         width: 100%;
//         height: 100%;
//         padding: 10px;
//         // @include theme_bgc(.7);
//         // @include bgi('~./img/', '/a.jpg');

//         .text {
//             cursor: pointer;
//             @include c(color, $text_c0);
//             // @include theme_fc(1);

//             &:hover {
//                 // @include theme_fc_active(.7);
//             }
//         }

//         .linear {
//             width:1299px;
//             height:492px;
//             background: lighten(rgba(#124271, .2), 5%) linear-gradient(209deg,lighten(rgba(110,125,139,.2), 5%),lighten(rgba(100,140,183,.2),5%),lighten(rgba(255,0,114,.2),5%));
//         }
//     }
// }
</style>
