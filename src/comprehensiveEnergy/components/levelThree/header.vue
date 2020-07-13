<template>
    <div class="three-header clearfix">
        <!-- <i @click="$router.push({name: $store.getters.isEnergyStation() ? 'Item' : 'Home'})" title="返回" class="iconfont iconfanhui"></i> -->
        <i @click="$router.push({name: 'Home'})" title="首页" class="iconfont iconshouye"></i>
        <switch-station></switch-station>
        <personal-center></personal-center>
        <full-screen></full-screen>
        <weather-resource></weather-resource>
        <h1>{{$store.state.currentStationInfo.currentDataName}}</h1>
    </div>
</template>

<script>
import SwitchStation from '@comprehensiveEnergy/components/common/SwitchStation'
import personalCenter from '@comm/components/personalCenter/index'
import fullScreen from '@comm/components/fullScreen/index'
import WeatherResource from '@comprehensiveEnergy/components/ItemPage/realTimeBlock/WeatherResource'

export default {
    components: {
        SwitchStation,
        personalCenter,
        fullScreen,
        WeatherResource
    }
}
</script>

<style lang="scss">
.three-header {
    .personal-center {
        ul.dropdown-menu {
            top: 100%;
        }
    }
}
</style>

<style lang="scss" scoped>
.three-header {
    height:67px;
    line-height: 67px;
    padding: 0 30px 0 18px;
    background:rgba(5,48,84,.7);
    box-shadow:0px 3px 3px 0px rgba(0,1,1,0.23);

    .iconfont {
        &.iconfanhui, &.iconshouye {
            float: left;
            margin-right: 50px;
            cursor: pointer;
            font-size: 23px;
        }
    }

    .switch-station {
        font-size: 23px;
        float: left;
    }

    .personal-center {
        float: right;
    }

    .full-screen {
        float: right;
        margin-right: 50px;
    }

    .weather-resource {
        float: right;
        margin-right: 100px;
        font-size: 100px;
    }

    h1 {
        text-align: center;
        font-size: 24px;
        width: max-content;
        margin: 0 auto;
    }
}
</style>
