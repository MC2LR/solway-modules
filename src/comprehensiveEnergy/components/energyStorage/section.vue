<template>
    <div class="child-section">
        <div class="block-outer">
            <child-block
                v-if="isToday"
                :value="ceDeviceMonitorRtOverviewTypeDay.res.data.day.data.profit"
                :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.day.units.profit"
                borderColor="#DFC551"
                color="#DFC551"
                icon="iconshouyi1"
                label="日收益">
                <block-item
                    :break="true"
                    :value="ceDeviceMonitorRtOverviewTypeDay.res.data.day.data.chargeKwh"
                    :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.day.units.chargeKwh"
                    label="充电量">
                </block-item>
                <block-item
                    :break="true"
                    :value="ceDeviceMonitorRtOverviewTypeDay.res.data.day.data.dischargeKwh"
                    :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.day.units.dischargeKwh"
                    label="放电量">
                </block-item>
            </child-block>
            <child-block
                v-if="!isToday"
                :value="ceDeviceMonitorRtOverviewTypeDay.res.data.day.data.store_profit"
                :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.day.units.store_profit"
                borderColor="#DFC551"
                color="#DFC551"
                icon="iconshouyi1"
                label="日收益">
                <block-item
                    :break="true"
                    :value="ceDeviceMonitorRtOverviewTypeDay.res.data.day.data.store_charge_kwh"
                    :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.day.units.store_charge_kwh"
                    label="充电量">
                </block-item>
                <block-item
                    :break="true"
                    :value="ceDeviceMonitorRtOverviewTypeDay.res.data.day.data.store_discharge_kwh"
                    :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.day.units.store_discharge_kwh"
                    label="放电量">
                </block-item>
            </child-block>
        </div>
        <div class="block-outer">
            <child-block
                :value="ceDeviceMonitorRtOverviewTypeDay.res.data.month.data.store_profit"
                :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.month.units.store_profit"
                borderColor="#EFA96F"
                color="#EFA96F"
                icon="iconqianbi"
                label="月收益">
                <block-item
                    :break="true"
                    :value="ceDeviceMonitorRtOverviewTypeDay.res.data.month.data.store_charge_kwh"
                    :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.month.units.store_charge_kwh"
                    label="充电量">
                </block-item>
                <block-item
                    :break="true"
                    :value="ceDeviceMonitorRtOverviewTypeDay.res.data.month.data.store_discharge_kwh"
                    :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.month.units.store_discharge_kwh"
                    label="放电量">
                </block-item>
            </child-block>
        </div>
        <div class="block-outer">
            <child-block
                :value="ceDeviceMonitorRtOverviewTypeDay.res.data.year.data.store_profit"
                :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.year.units.store_profit"
                borderColor="#D45B5B"
                color="#D45B5B"
                icon="iconnianshouyi-"
                label="年收益">
                <block-item
                    :break="true"
                    :value="ceDeviceMonitorRtOverviewTypeDay.res.data.year.data.store_charge_kwh"
                    :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.year.units.store_charge_kwh"
                    label="充电量">
                </block-item>
                <block-item
                    :break="true"
                    :value="ceDeviceMonitorRtOverviewTypeDay.res.data.year.data.store_discharge_kwh"
                    :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.year.units.store_discharge_kwh"
                    label="放电量">
                </block-item>
            </child-block>
        </div>
        <div class="block-outer">
            <child-block
                :value="ceDeviceMonitorRtOverviewTypeDay.res.data.accum.data.store_profit"
                :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.accum.units.store_profit"
                borderColor="#9F76DD"
                color="#9F76DD"
                icon="iconleijishouyi"
                label="总收益">
                <block-item
                    :break="true"
                    :value="ceDeviceMonitorRtOverviewTypeDay.res.data.accum.data.store_charge_kwh"
                    :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.accum.units.store_charge_kwh"
                    label="充电量">
                </block-item>
                <block-item
                    :break="true"
                    :value="ceDeviceMonitorRtOverviewTypeDay.res.data.accum.data.store_discharge_kwh"
                    :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.accum.units.store_discharge_kwh"
                    label="放电量">
                </block-item>
            </child-block>
        </div>
    </div>
</template>

<script>
import ChildBlock from '../stationMonitoring/section/block'
import BlockItem from '../stationMonitoring/section/BlockItem'
import {
    api＿ceDeviceMonitorRtOverviewTypeDay
} from '@comprehensiveEnergy/request/api'

export default {
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
                        month: {
                            data: {},
                            units: {}
                        },
                        year: {
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
        this.$bus.on('dateChange', this.getData)
        this.timer = setInterval(this.dataInterval, this.$store.state.stationMonitoring.dataInterval)
    },
    methods: {
        dataInterval () {
            this.isToday && this.getData()
        },
        getData () {
            const dateStr = this.$store.getters['stationMonitoring/dateStr']
            this.ceDeviceMonitorRtOverviewTypeDay.getData({date: dateStr})
        }
    },
    computed: {
        isToday () {
            return this.$store.getters['stationMonitoring/isToday']
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
        this.$bus.off('dateChange', this.getData)
    },
    components: {
        ChildBlock,
        BlockItem
    }
}
</script>

<style lang="scss" scoped>
.child-section {
    height:136px;
    @include c(background-color, $bg_c7);
    padding: 15px 1px;

    .block-outer {
        float: left;
        width: 25%;
        height: 100%;
        padding: 0 17px;

        .child-block {
            width: 100%;
            height: 100%;
            padding-left: 24px;

            .block-item {
                float: left;
                margin-top: 3px;
                min-width: 50%;
            }

        }
    }
}
</style>
