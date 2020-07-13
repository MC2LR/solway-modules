<template>
    <div class="smallInverter">
        <device-header :data="deviceInfo" :tab="component">
            <template>
                <el-button @click="component = 'realData'" :type="component === 'realData' ? 'primary' : 'default'">实时数据</el-button>
                <el-button @click="component = 'historyData'" :type="component === 'historyData' ? 'primary' : 'default'">历史数据</el-button>
                <el-button @click="component = 'faultInfo'" :type="component === 'faultInfo' ? 'primary' : 'default'">故障信息</el-button>
            </template>
            <template slot="moreInfo">
                <more-info :device="deviceInfo"></more-info>
            </template>
        </device-header>
        <keep-alive>
            <component :device="deviceInfo" :is="component"></component>
        </keep-alive>
    </div>
</template>

<script>
import DeviceHeader from '../header/header'
import MoreInfo from '../inverter/moreInfo'
export default {
    props: {
        deviceInfo: {
            type: Object
        },
        defaultTab: {
            type: String
        }
    },
    components: {
        DeviceHeader,
        MoreInfo,
        realData: () => import('./realData'),
        historyData: () => import('../inverter/historyData'),
        faultInfo: () => import('../comm/faultInfo')
    },
    data () {
        return {
            component: this.defaultTab || 'realData'
        }
    }
}
</script>

<style lang="scss" scoped>
.smallInverter {
    background-color: #EDEFF9;
}
</style>
