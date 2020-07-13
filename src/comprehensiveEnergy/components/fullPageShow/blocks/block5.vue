<template>
    <div class="energy-storage-page">
        <div class="title">光伏发电</div>
        <div class="electric-quantity">
            <div class="clearfix">
                <span class="pull-left opa7">日发电量</span>
                <span class="pull-right"><b>{{pvwpStationRtOverviewDay.res.body.day.data.dw}}</b>{{pvwpStationRtOverviewDay.res.body.day.units.dw}}</span>
            </div>
            <div class="clearfix">
                <span class="pull-left opa7">累计发电量</span>
                <span class="pull-right"><b>{{pvwpStationRtOverviewDay.res.body.accum.data.real_kwh_chk}}</b>{{pvwpStationRtOverviewDay.res.body.accum.units.real_kwh_chk}}</span>
            </div>
        </div>

        <photovoltaic-chart class="clearfix"></photovoltaic-chart>

        <energy-saving :electricity="pvwpStationRtOverviewDay.res.body.accum.data.real_kwh_chk_o + pvwpStationRtOverviewDay.res.body.day.data.dwOrigin"></energy-saving>
    </div>
</template>

<script>
import { api＿pvwpStationRtOverviewDay } from '@comprehensiveEnergy/request/api'
import EnergySaving from './EnergySaving'
import PhotovoltaicChart from './photovoltaic/chart'
export default {
    components: {
        EnergySaving,
        PhotovoltaicChart
    },
    data () {
        return {
            pvwpStationRtOverviewDay: api＿pvwpStationRtOverviewDay({
                data: {
                    stcls: '01'
                },
                res: {
                    body: {
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
        this.timer = setInterval(() => this.pvwpStationRtOverviewDay.getData(), this.$store.state.second.dataInterval)
        this.pvwpStationRtOverviewDay.subscribe(res => {
            this.$bus.emit('monitoringData', res)
        })
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

    .photovoltaic-chart {
        width: 100%;
        height: calc(100% - 20px - 0.6rem);
        top: 0.15rem;
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
