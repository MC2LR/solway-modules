<template>
    <div class="energy-flow" v-loading="ceDeviceMonitorRtSingleType.loading">
        <energy-flow-chart
            :useStatus="ceDeviceMonitorRtSingleType.res.data[23].useStatus"
            :remain="ceDeviceMonitorRtSingleType.res.data[23].remain">
        </energy-flow-chart>
        <div class="items">
            <div class="item">
                <span class="label">状态</span><br>
                <span class="value">{{{'01': '充电中', '02': '放电中', '03': '未使用'}[ceDeviceMonitorRtSingleType.res.data[23].useStatus]}}</span>
                <span class="unit"></span>
            </div>
            <div class="item">
                <span class="label">容量</span><br>
                <span class="value">{{ceDeviceMonitorRtSingleType.res.data[23].capacity}}</span>
                <span class="unit">kWh</span>
            </div>
            <div class="item">
                <span class="label">电池温度</span><br>
                <span class="value">{{ceDeviceMonitorRtSingleType.res.data[23].batteryTemp}}</span>
                <span class="unit">℃</span>
            </div>
            <div class="item">
                <span class="label">充电次数</span><br>
                <span class="value">{{ceDeviceMonitorRtSingleType.res.data[23].chargeCount}}</span>
                <span class="unit">次</span>
            </div>
            <div class="item">
                <span class="label">放电次数</span><br>
                <span class="value">{{ceDeviceMonitorRtSingleType.res.data[23].dischargeCount}}</span>
                <span class="unit">次</span>
            </div>
        </div>
    </div>
</template>

<script>
import {api＿ceDeviceMonitorRtSingleType} from '@comprehensiveEnergy/request/api'
import EnergyFlowChart from './EnergyFlowChart'

export default {
    data () {
        return {
            ceDeviceMonitorRtSingleType: api＿ceDeviceMonitorRtSingleType({
                data: {
                    type: 23
                },
                res: {
                    data: {
                        23: {}
                    }
                }
            })
        }
    },
    created () {
        this.time = setInterval(() => this.ceDeviceMonitorRtSingleType.getData(), this.$store.state.second.dataInterval)
    },
    beforeDestroy () {
        clearInterval(this.time)
    },
    components: {
        EnergyFlowChart
    }
}
</script>

<style lang="scss" scoped>
.energy-flow {
    position: relative;
    padding-top: 50px;

    .energy-flow-chart {
        padding-left: 40px;
        padding-right: 65px;
    }

    .items {
        // position: absolute;
        // bottom: 33px;
        margin-top: 40px;
        width: 100%;
        padding-left: 65px;

        .item {
            width: 20%;
            float: left;
            text-align: left;
            line-height: 1.5em;

            .label {
                font-size: 12px;
            }

            .value {
                font-size: 16px;
            }

            .unit {
                font-size: 12px;
            }
        }
    }
}
</style>
