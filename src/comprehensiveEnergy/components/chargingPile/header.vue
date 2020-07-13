<template>
    <child-header class="child-header">
        <template v-slot:left>
            <div class="left" :class="{noToday: !isToday}">
                <map-location :options="{longitude: pvwpStationPosition.res.body.longitude, latitude: pvwpStationPosition.res.body.latitude}"></map-location>
                <real-scene :options="{longitude: 116.40, latitude: 39.90}"></real-scene>
                <p v-if="isToday" class="update-time">最后更新于：{{ceDeviceMonitorRtUpdatetimeType.res.data.dtime && new Date(ceDeviceMonitorRtUpdatetimeType.res.data.dtime * 1000).Format('yyyy-MM-dd hh:mm:ss')}}</p>
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
import {
    api＿pvwpStationPosition
    , api＿ceDeviceMonitorRtUpdatetimeType
} from '@comprehensiveEnergy/request/api'

export default {
    data () {
        return {
            date: new Date(),
            pvwpStationPosition: api＿pvwpStationPosition({
                res: {
                    body: {}
                }
            }),
            ceDeviceMonitorRtUpdatetimeType: api＿ceDeviceMonitorRtUpdatetimeType({
                data: {
                    stid: this.$store.state.currentStationInfo.currentSTID,
                    type: 26
                },
                res: {
                    data: {}
                }
            })
        }
    },
    methods: {
        getData () {
            if (this.isToday) {
                this.ceDeviceMonitorRtUpdatetimeType.getData()
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
        RealScene
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

        .real-scene {
            margin-left: 45px;
        }

        .update-time {
            @include c(color, $text_c2);
        }
    }

    .center {
        .date-picker-arrow {
            margin-top: 13px;
        }
    }
}
</style>
