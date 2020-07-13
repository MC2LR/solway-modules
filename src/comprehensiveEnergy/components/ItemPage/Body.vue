<template>
    <div class="svg-block item-body">
        <component
            :is="'SvgImg' + $store.state.currentStationInfo.currentSTID"
            :data="ceDeviceMonitorRtSingleTypeMult.res.data[25]"
            @hasDevice="getHasDevice"
            @loadedAndRander="data => positions = {...positions, ...data}">
        </component>
        <real-block1 class="real-block" @click.native="$router.push({name: 'ChargingPile'})" :data="ceDeviceMonitorRtSingleTypeMult.res.data[26]" v-if="device.d1" :position="positions.p1"></real-block1><!-- 充电桩系统 -->
        <real-block2 class="real-block" @click.native="$router.push({name: 'EnergyStorage'})" :data="ceDeviceMonitorRtSingleTypeMult.res.data[23]" v-if="device.d2" :position="positions.p2"></real-block2><!-- 储能系统 -->
        <real-block3 class="real-block" @click.native="$router.push({name: 'EnvironmentMonitoring'})" :data="ceDeviceMonitorRtSingleTypeMult.res.data[27]" v-if="device.d3" :position="positions.p3"></real-block3><!-- 配电房 -->
        <real-block4 class="real-block" @click.native="$router.push({name: 'StationMonitoring'})" v-if="device.d4" :position="positions.p4"></real-block4><!-- 光伏系统 -->
        <real-block5 class="real-block" :data="ceDeviceMonitorRtSingleTypeMult.res.data[28]" v-if="device.d5" :position="positions.p5"></real-block5><!-- 空调系统 -->
        <real-block6 class="real-block" :data="ceDeviceMonitorRtSingleTypeMult.res.data[29]" v-if="device.d6" :position="positions.p6"></real-block6><!-- 照明系统 -->
        <real-block7 class="real-block" :data="ceDeviceMonitorRtSingleTypeMult.res.data[22]" v-if="device.d7" :position="positions.p7"></real-block7><!-- 蓄热 -->
        <real-block8 class="real-block" :data="ceDeviceMonitorRtSingleTypeMult.res.data[21]" v-if="device.d8" :position="positions.p8"></real-block8><!-- 蓄冷 -->
    </div>
</template>

<script>
import {api＿ceDeviceMonitorRtSingleTypeMult} from '@comprehensiveEnergy/request/api'

export default {
    data () {
        return {
            positions: {},
            device: {},
            deviceTypeMap: {
                d1: '26',
                d2: '23',
                d3: '27',
                d4: '',
                d5: '28',
                d6: '29',
                d7: '22',
                d8: '21'
            },
            ceDeviceMonitorRtSingleTypeMult: api＿ceDeviceMonitorRtSingleTypeMult({
                later: true,
                res: {
                    data: {}
                }
            })
        }
    },
    methods: {
        async getHasDevice (data) {
            this.device = {...data}
            await this.getData()
            this.interval()
        },
        async getData () {
            await this.ceDeviceMonitorRtSingleTypeMult.getData({
                types: Object.keys(this.device).map(v => this.deviceTypeMap[v]).join() + ',25'
            })
        },
        interval () {
            this.timer = setInterval(() => {
                this.ceDeviceMonitorRtSingleTypeMult.getData()
            }, this.$store.state.second.dataInterval)
        }
    },
    beforeDestroy () {
        if (typeof this.timer === 'number') {
            clearInterval(this.timer)
        }
    },
    components: {
        SvgImg4177: () => import('./svg/' + 4177),
        SvgImg4629: () => import('./svg/' + 4629),
        SvgImg4639: () => import('./svg/' + 4639),
        SvgImg4630: () => import('./svg/' + 4630),
        SvgImg4638: () => import('./svg/' + 4638),
        RealBlock1: () => import('./realTimeBlock/RealBlock1'),
        RealBlock2: () => import('./realTimeBlock/RealBlock2'),
        RealBlock3: () => import('./realTimeBlock/RealBlock3'),
        RealBlock4: () => import('./realTimeBlock/RealBlock4'),
        RealBlock5: () => import('./realTimeBlock/RealBlock5'),
        RealBlock6: () => import('./realTimeBlock/RealBlock6'),
        RealBlock7: () => import('./realTimeBlock/RealBlock7'),
        RealBlock8: () => import('./realTimeBlock/RealBlock8')
    }
}
</script>

<style lang="scss" scoped>
.real-block {
    cursor: pointer;

    &:hover {
        background-color: rgba(0,56,138,1);
    }
}
</style>
