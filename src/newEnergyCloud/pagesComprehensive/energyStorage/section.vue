<template>
    <div class="child-section">
        <div class="block-outer">
            <child-block
                v-if="isToday"
                :value="ceDeviceMonitorRtOverviewTypeDay.res.data.day.data.profit"
                :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.day.units.profit"
                borderColor="#2FBFCC"
                color="#2FBFCC"
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
                borderColor="#2FBFCC"
                color="#2FBFCC"
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
                borderColor="#5676E8"
                color="#5676E8"
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
                borderColor="#9F76DD"
                color="#9F76DD"
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
                borderColor="#FF7381"
                color="#FF7381"
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
import ChildBlock from '../section/block'
import BlockItem from '../section/BlockItem'
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
        this.$bus.on('stationChange', this.getData)
        this.timer = setInterval(this.dataInterval, this.$route.meta.refresh_interval)
    },
    methods: {
        dataInterval () {
            this.isToday && this.getData()
        },
        getData () {
            // const dateStr = this.$store.getters['stationMonitoring/dateStr']
            this.ceDeviceMonitorRtOverviewTypeDay.getData({date: this.dateStr})
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
    beforeDestroy () {
        clearInterval(this.timer)
        this.$bus.off('dateChange', this.getData)
        this.$bus.off('stationChange', this.getData)
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
    // @include c(background-color, $bg_c7);
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
