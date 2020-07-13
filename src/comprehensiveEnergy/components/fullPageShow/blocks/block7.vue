<template>
    <div class="energy-storage-page">
        <div class="title">储能</div>
        <div class="electric-quantity">
            <div class="clearfix">
                <span class="pull-left opa7">日放电量</span>
                <span class="pull-right"><b>{{ceDeviceMonitorRtOverviewTypeDay.res.data.day.data.dischargeKwh}}</b>{{ceDeviceMonitorRtOverviewTypeDay.res.data.day.units.dischargeKwh}}</span>
            </div>
            <div class="clearfix">
                <span class="pull-left opa7">累计放电量</span>
                <span class="pull-right"><b>{{ceDeviceMonitorRtOverviewTypeDay.res.data.accum.data.store_discharge_kwh}}</b>{{ceDeviceMonitorRtOverviewTypeDay.res.data.accum.units.store_discharge_kwh}}</span>
            </div>
        </div>

        <energy-flow class="clearfix"></energy-flow>

        <energy-saving :electricity="ceDeviceMonitorRtOverviewTypeDay.res.data.accum.data.store_discharge_kwh_o + ceDeviceMonitorRtOverviewTypeDay.res.data.day.data.dischargeKwhOrigin"></energy-saving>
    </div>
</template>

<script>
import { api＿ceDeviceMonitorRtOverviewTypeDay } from '@comprehensiveEnergy/request/api'
import EnergySaving from './EnergySaving'
import EnergyFlow from './energyFlow/EnergyFlow'
export default {
    components: {
        EnergySaving,
        EnergyFlow
    },
    data () {
        return {
            ceDeviceMonitorRtOverviewTypeDay: api＿ceDeviceMonitorRtOverviewTypeDay({
                onlyLatest: true,
                data: {
                    type: 23
                },
                res: {
                    data: {
                        day: {
                            data: {},
                            units: {}
                        },
                        accum: {
                            data: {},
                            units: {}
                        }
                    }
                }
            })
        }
    },
    created () {
        this.timer = setInterval(() => this.ceDeviceMonitorRtOverviewTypeDay.getData(), this.$store.state.second.dataInterval)
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.energy-storage-page{
    padding: 15px 20px;
    font-size: 0.14rem;
    position: relative;

    .title {
        float: left;
    }

    .electric-quantity {
        float: right;
        width: 1.6rem;
        line-height: 1.5em;
        margin-right: 1em;

        span b {
            font-weight: normal;
            font-size: 0.16rem;
        }

        .opa7 {
            color: rgba(255, 255, 255, .7);
        }
    }

    .energy-flow {
        width: 100%;
        height: calc(100% - 20px - 0.9rem);
        top: 0.45rem;
    }

    .energy-saving {
        position: absolute;
        bottom: 1em;
        left: 20px;
        right: 20px;
        height: 3em;
    }
}
</style>
