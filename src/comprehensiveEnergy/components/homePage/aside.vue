<template>
    <div class="aside-view">
        <div class="left">
            <home-item
                icon="iconkehu c1"
                label="接入客户数"
                :value="ceStationCount.res.data"
                unit="家"
            ></home-item>
            <home-item
                icon="iconbianyaqi c2"
                label="变压器容量"
                :value="ceDeviceCapacityTypeMult.res.data[25]"
                unit="kVA"
            ></home-item>
            <home-item
                icon="icondianbiao-copy1 c3"
                label="智能电表数"
                :value="ceDeviceCountTypeMult.res.data[4]"
                unit="块"
            ></home-item>
            <home-item
                icon="iconchongdianzhuang c4"
                label="充电桩数量"
                :value="ceDeviceCountTypeMult.res.data[26]"
                unit="个"
            ></home-item>
        </div>

        <div class="right">
            <home-item
                icon="iconleng c2"
                label="蓄冷容量"
                :value="ceDeviceCapacityTypeMult.res.data[21]"
                unit="kWh"
            ></home-item>
            <home-item
                icon="iconre c1"
                label="储热容量"
                :value="ceDeviceCapacityTypeMult.res.data[22]"
                unit="kWh"
            ></home-item>
            <home-item
                icon="iconchunengguanli c4"
                label="储能容量"
                :value="ceDeviceCapacityTypeMult.res.data[23]"
                unit="kWh"
            ></home-item>
            <home-item
                icon="iconguangfu c3"
                label="光伏接入容量"
                :value="ceStationMonitorPvCapacity.res.data[0]"
                :unit="ceStationMonitorPvCapacity.res.data[1]"
            ></home-item>
        </div>

        <div class="bottom">
            <home-item
                icon="iconwenduchuanganqi c3"
                label="温度传感器"
                :value="ceDeviceCountTypeMult.res.data[31]"
                unit="个"
            ></home-item>
            <home-item
                icon="iconyangan c1"
                label="烟感传感器"
                :value="ceDeviceCountTypeMult.res.data[32]"
                unit="个"
            ></home-item>
            <home-item
                icon="iconshexiangtou- c4"
                label="摄像头"
                :value="ceDeviceCountTypeMult.res.data[41]"
                unit="个"
            ></home-item>
            <home-item
                icon="iconshuiwei c2"
                label="水位传感器"
                :value="ceDeviceCountTypeMult.res.data[33]"
                unit="个"
            ></home-item>
        </div>
    </div>
</template>

<script>
import HomeItem from './item'
import {
    api＿ceDeviceCountTypeMult
    , api＿ceDeviceCapacityTypeMult
    , api＿ceStationCount
    , api＿ceStationMonitorPvCapacity
} from '@comprehensiveEnergy/request/api'

export default {
    data () {
        return {
            ceDeviceCountTypeMult: api＿ceDeviceCountTypeMult({
                data: {
                    types: '4,26,31,32,33,41'
                },
                res: {
                    data: {
                        4: '',
                        26: '',
                        31: '',
                        32: '',
                        33: '',
                        41: ''
                    }
                }
            }),
            ceDeviceCapacityTypeMult: api＿ceDeviceCapacityTypeMult({
                data: {
                    types: '21,22,23,25'
                },
                res: {
                    data: {
                        21: '',
                        22: '',
                        23: '',
                        25: ''
                    }
                }
            }),
            ceStationCount: api＿ceStationCount(),
            ceStationMonitorPvCapacity: api＿ceStationMonitorPvCapacity({
                res: {
                    data: []
                }
            })
        }
    },
    methods: {

    },
    components: {
        HomeItem
    }
}
</script>

<style lang="scss" scoped>
.aside-view {
    .left, .right {
        position: absolute;
        top: calc((100vh - 5.4rem) / 2);
        width: 2.08rem;
        @include c(background-color, $bg_c4);
        border:2px solid;
        @include c(border-color, $line_c4);
        padding: 0.1rem 0;
    }

    .left {
        left: 0.4rem;
    }

    .right {
        right: 0.4rem;
    }

    .bottom {
        position: fixed;
        left: 0.4rem;
        right: 0.4rem;
        bottom: 0.2rem;
        height: 0;

        .home-item {
            position: absolute;
            bottom: 0;
            width: 2.08rem;

            &:nth-child(1) {
                left: 0;
            }

            &:nth-child(2) {
                left: 2.5rem;
            }

            &:nth-child(3) {
                right: 2.5rem;
            }

            &:nth-child(4) {
                right: 0;
            }
        }
    }
}
</style>
