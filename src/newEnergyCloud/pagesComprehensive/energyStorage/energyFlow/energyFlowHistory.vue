<template>
    <div class="energy-flow" v-loading="queryCeStationDevice23InfoDay.loading">
        <energy-flow-chart
            :historyRemain="queryCeStationDevice23InfoDay.res.body.data.store_remain"
            :useStatus="queryCeStationDevice23InfoDay.res.body.data.store_status">
        </energy-flow-chart>
        <div class="items">
            <div class="item">
                <span class="label">状态</span><br>
                <span class="value">{{{'01': '正常', '02': '异常'}[queryCeStationDevice23InfoDay.res.body.data.store_status]}}</span>
                <span class="unit"></span>
            </div>
            <div class="item">
                <span class="label">容量</span><br>
                <span class="value">{{queryCeStationDevice23InfoDay.res.body.data.store_capacity}}</span>
                <span class="unit">kWh</span>
            </div>
            <div class="item">
                <span class="label">电池温度</span><br>
                <span class="value">{{queryCeStationDevice23InfoDay.res.body.data.store_temp}}</span>
                <span class="unit">℃</span>
            </div>
            <div class="item">
                <span class="label">充电次数</span><br>
                <span class="value">{{queryCeStationDevice23InfoDay.res.body.data.store_charge_count}}</span>
                <span class="unit">次</span>
            </div>
            <div class="item">
                <span class="label">放电次数</span><br>
                <span class="value">{{queryCeStationDevice23InfoDay.res.body.data.store_discharge_count}}</span>
                <span class="unit">次</span>
            </div>
        </div>
    </div>
</template>

<script>
import {api＿queryCeStationDevice23InfoDay} from '@comprehensiveEnergy/request/api'
import EnergyFlowChart from './EnergyFlowChart'

export default {
    data () {
        return {
            queryCeStationDevice23InfoDay: api＿queryCeStationDevice23InfoDay({
                data: {
                    date: new Date(this.$store.state.userActionRecord.comprehensive_date).Format('yyyy-MM-dd')
                },
                res: {
                    body: {
                        data: {}
                    }
                }
            })
        }
    },
    created () {
        this.$bus.on('dateChange', this.getData)
        this.$bus.on('stationChange', this.getData)
    },
    beforeDestroy () {
        this.$bus.off('dateChange', this.getData)
        this.$bus.off('stationChange', this.getData)
    },
    methods: {
        getData () {
            if (!this.isToday) this.queryCeStationDevice23InfoDay.getData({date: this.dateStr})
        }
    },
    computed: {
        isToday () {
            return this.dateStr === new Date().Format('yyyy-MM-dd')
        },
        dateStr () {
            return new Date(this.$store.state.userActionRecord.comprehensive_date).Format('yyyy-MM-dd')
        }
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
