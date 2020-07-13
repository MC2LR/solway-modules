<template>
    <div class="header clearfix">
        <router-link title="返回首页" :to="{name: 'Home'}"><i class="iconfont iconshouye"></i></router-link>
        <switch-station></switch-station>
        <personal-center></personal-center>
        <full-screen></full-screen>
        <!-- <weather-resource></weather-resource> -->
        <h1>{{title}}</h1>
    </div>
</template>

<script>
import personalCenter from '@comm/components/personalCenter/index'
import fullScreen from '@comm/components/fullScreen/index'
import WeatherResource from './realTimeBlock/WeatherResource'
import SwitchStation from '@comprehensiveEnergy/components/common/SwitchStation'

export default {
    props: ['title'],
    components: {
        personalCenter,
        fullScreen,
        WeatherResource,
        SwitchStation
    }
}
</script>

<style lang="scss">
.header {
    .full-screen .iconcomm.commgerenzhongxin {
        font-size: 0.18rem !important;
    }

    .personal-center {
        .iconcomm.commicon-- {
            font-size: 0.16rem !important;
        }

        .dropdown-menu {
            top: 75% !important;
        }
    }
}
</style>

<style lang="scss" scoped>
.header {
    padding: 0 0.4rem;
    height: 0.6rem;
    line-height: 0.6rem;
    background: rgba(16, 49, 84, 1);

    .iconshouye {
        font-size: 0.18rem;
        float: left;
    }

    .switch-station {
        float: left;
        font-size: 0.2rem;
        margin-left: 0.3rem;
    }

    h1 {
        text-align: center;
        font-size: 0.218rem;
        position: relative;
        width: 5rem;
        margin: 0 auto;
    }

    .full-screen {
        float: right;
        margin-right: 0.3rem;
    }

    .personal-center {
        float: right;
    }

    .weather-resource {
        float: right;
        margin-right: 1.8rem;
        font-size: 1rem;
    }
}
</style>
