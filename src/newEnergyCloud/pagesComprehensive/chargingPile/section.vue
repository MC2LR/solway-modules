<template>
    <div class="child-section">
        <div class="block-outer">
            <child-block
                v-if="isToday"
                :value="ceDeviceMonitorRtOverviewTypeDay.res.data.day.data.acp"
                :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.day.units.acp"
                borderColor="#2FBFCC"
                color="#2FBFCC"
                icon="icongongshuaiyinshu"
                label="当前功率">
                <block-item
                    :value="ceDeviceMonitorRtOverviewTypeDay.res.data.day.data.useNumber"
                    :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.day.units.useNumber"
                    label="使用台次">
                </block-item>
            </child-block>
            <child-block
                v-if="!isToday"
                :value="ceDeviceMonitorRtOverviewTypeDay.res.data.day.data.car_max_p"
                :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.day.units.car_max_p"
                borderColor="#2FBFCC"
                color="#2FBFCC"
                icon="icongongshuaiyinshu"
                label="最大功率">
                <block-item
                    :value="ceDeviceMonitorRtOverviewTypeDay.res.data.day.data.car_use_number"
                    :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.day.units.car_use_number"
                    label="使用台次">
                </block-item>
            </child-block>
        </div>
        <div class="block-outer">
            <child-block
                v-if="isToday"
                :value="ceDeviceMonitorRtOverviewTypeDay.res.data.day.data.dw"
                :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.day.units.dw"
                borderColor="#2FBFCC"
                color="#2FBFCC"
                icon="iconyongdian"
                label="日用电量">
                <block-item
                    :value="ceDeviceMonitorRtOverviewTypeDay.res.data.day.data.fee"
                    :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.day.units.fee"
                    label="日用电费">
                </block-item>
            </child-block>
            <child-block
                v-if="!isToday"
                :value="ceDeviceMonitorRtOverviewTypeDay.res.data.day.data.car_kwh"
                :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.day.units.car_kwh"
                borderColor="#2FBFCC"
                color="#2FBFCC"
                icon="iconyongdian"
                label="日用电量">
                <block-item
                    :value="ceDeviceMonitorRtOverviewTypeDay.res.data.day.data.car_fee"
                    :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.day.units.car_fee"
                    label="日用电费">
                </block-item>
            </child-block>
        </div>
        <div class="block-outer">
            <child-block
                :value="ceDeviceMonitorRtOverviewTypeDay.res.data.month.data.car_kwh"
                :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.month.units.car_kwh"
                borderColor="#5676E8"
                color="#5676E8"
                icon="iconyongdianliang-"
                label="月用电量">
                <block-item
                    :value="ceDeviceMonitorRtOverviewTypeDay.res.data.month.data.car_fee"
                    :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.month.units.car_fee"
                    label="月用电费">
                </block-item>
            </child-block>
        </div>
        <div class="block-outer">
            <child-block
                :value="ceDeviceMonitorRtOverviewTypeDay.res.data.year.data.car_kwh"
                :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.year.units.car_kwh"
                borderColor="#8F6AD4"
                color="#8F6AD4"
                icon="iconnianyongdianliang-"
                label="年用电量">
                <block-item
                    :value="ceDeviceMonitorRtOverviewTypeDay.res.data.year.data.car_fee"
                    :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.year.units.car_fee"
                    label="年用电费">
                </block-item>
            </child-block>
        </div>
        <div class="block-outer">
            <child-block
                :value="ceDeviceMonitorRtOverviewTypeDay.res.data.accum.data.car_kwh"
                :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.accum.units.car_kwh"
                borderColor="#E5747B"
                color="#E5747B"
                icon="iconyongdianliang"
                label="总用电量">
                <block-item
                    :value="ceDeviceMonitorRtOverviewTypeDay.res.data.accum.data.car_fee"
                    :unit="ceDeviceMonitorRtOverviewTypeDay.res.data.accum.units.car_fee"
                    label="总用电费">
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
                    type: 26
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
        this.$bus.on('stationChange', this.getData)
        this.$bus.on('dateChange', this.getData)
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
        dateStr () {
            return new Date(this.$store.state.userActionRecord.comprehensive_date).Format('yyyy-MM-dd')
        },
        isToday () {
            return this.dateStr === new Date().Format('yyyy-MM-dd')
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
        this.$bus.off('stationChange', this.getData)
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
    // @include c(background-color, $bg_c7);
    padding: 15px 5px;

    .block-outer {
        float: left;
        width: 20%;
        height: 100%;
        padding: 0 13px;

        .child-block {
            width: 100%;
            height: 100%;
            padding-left: 24px;

            .block-item {
                float: left;
                margin-top: 10px;
                min-width: 50%;
            }

        }
    }
}
</style>
