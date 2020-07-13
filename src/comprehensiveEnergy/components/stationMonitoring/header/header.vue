<template>
    <child-header class="child-header">
        <template v-slot:left>
            <div class="left" :class="{noToday: !isToday}">
                <map-location :options="{longitude: pvwpStationPosition.res.body.longitude, latitude: pvwpStationPosition.res.body.latitude}"></map-location>
                <real-scene :options="{longitude: 116.40, latitude: 39.90}"></real-scene>
                <p v-if="isToday" class="update-time">最后更新于：{{mobileRtmStationStatusGetRtmSingleStationComm.res.utime && new Date(mobileRtmStationStatusGetRtmSingleStationComm.res.utime).Format('yyyy-MM-dd hh:mm:ss')}}</p>
            </div>
        </template>
        <template v-slot:right>
            <div class="right">
                <header-item
                    label="总装机量"
                    :value="realData.accum.data.inst_kw"
                    :unit="realData.accum.units.inst_kw">
                </header-item>
                <header-item
                    label="累计发电量"
                    :value="realData.accum.data.real_kwh_chk"
                    :unit="realData.accum.units.real_kwh_chk">
                </header-item>
                <header-item
                    label="二氧化碳减排"
                    :value="realData.accum.data.co2"
                    :unit="realData.accum.units.co2">
                </header-item>
            </div>
        </template>
        <template v-slot:center>
            <date-picker-arrow
                @change="dateChange"
                :disabledDate="time => time.getTime() > Date.now()"
                :date="date">
            </date-picker-arrow>
        </template>
    </child-header>
</template>

<script>
import ChildHeader from '@comprehensiveEnergy/components/common/ChildHeader'
import DatePickerArrow from '@comprehensiveEnergy/components/common/DatePickerArrow'
import MapLocation from '@comprehensiveEnergy/components/common/MapLocation/MapLocation'
import RealScene from '@comprehensiveEnergy/components/common/RealScene'
import HeaderItem from './HeaderItem'
import {
    api＿pvwpStationPosition
    , api＿mobileRtmStationStatusGetRtmSingleStationComm
} from '@comprehensiveEnergy/request/api'

export default {
    props: {
        realData: {
            type: Object,
            default () {
                return {
                    accum: {
                        data: {},
                        units: {}
                    }
                }
            }
        }
    },
    data () {
        return {
            date: new Date(),
            pvwpStationPosition: api＿pvwpStationPosition({
                res: {
                    body: {}
                }
            }),
            mobileRtmStationStatusGetRtmSingleStationComm: api＿mobileRtmStationStatusGetRtmSingleStationComm({
                data: {
                    stids: this.$store.state.currentStationInfo.currentSTID
                }
            })
        }
    },
    created () {
        this.timer = setInterval(() => {
            this.isToday && this.getData()
        }, this.$store.state.stationMonitoring.dataInterval)
    },
    methods: {
        getData () {
            if (this.isToday) {
                this.mobileRtmStationStatusGetRtmSingleStationComm.getData()
            }
        },
        dateChange (date) {
            this.$store.dispatch('stationMonitoring/dateChange', date)
            this.$bus.emit('dateChange', new Date(date))
            this.getData()
        }
    },
    computed: {
        isToday () {
            return this.$store.getters['stationMonitoring/isToday']
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
    },
    components: {
        DatePickerArrow,
        ChildHeader,
        MapLocation,
        RealScene,
        HeaderItem
    }
}
</script>

<style lang="scss" scoped>
.child-header {
    padding: 0 18px;

    .left {
        padding-top: 5px;
        line-height: 25px;

        &.noToday {
            padding-top: 0px;
            line-height: 61px;
        }

        .map-location {

        }

        .real-scene {
            margin-left: 45px;
        }

        .update-time {
            @include c(color, $text_c2);
        }
    }

    .right {
        .header-item {
            margin-left: 45px;
        }
    }

    .center {
        .date-picker-arrow {
            margin-top: 13px;
        }
    }
}
</style>
