<template>
    <child-header class="child-header">
        <template v-slot:left>
            <!-- <div class="left" :class="{noToday: !isToday}">
                <p v-if="isToday" class="update-time">最后更新于：{{ceDeviceMonitorRtUpdatetimeType.res.data.dtime && new Date(ceDeviceMonitorRtUpdatetimeType.res.data.dtime * 1000).Format('yyyy-MM-dd hh:mm:ss')}}</p>
            </div> -->
            <switch-station class="switch-station"></switch-station>
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
import ChildHeader from '../common/ChildHeader'
import DatePickerArrow from '../common/DatePickerArrow'
import SwitchStation from '@/components/station/switchStation/switchStation'
// import {
//     api＿pvwpStationPosition
//     , api＿ceDeviceMonitorRtUpdatetimeType
// } from '@comprehensiveEnergy/request/api'

export default {
    data () {
        return {
            date: new Date()
            // pvwpStationPosition: api＿pvwpStationPosition({
            //     res: {
            //         body: {}
            //     }
            // }),
            // ceDeviceMonitorRtUpdatetimeType: api＿ceDeviceMonitorRtUpdatetimeType({
            //     data: {
            //         stid: this.$store.getters.station_id,
            //         type: 26
            //     },
            //     res: {
            //         data: {}
            //     }
            // })
        }
    },
    methods: {
        // getData () {
        //     if (this.isToday) {
        //         this.ceDeviceMonitorRtUpdatetimeType.getData()
        //     }
        // },
        dateChange (date) {
            this.$store.dispatch('userActionRecord/setState', {key: 'comprehensive_date', value: date})
            this.$bus.emit('dateChange', new Date(date))
            // this.getData()
        }
    },
    // computed: {
    //     isToday () {
    //         return new Date(this.$store.state.userActionRecord.comprehensive_date).Format('yyyy-MM-dd') === new Date().Format('yyyy-MM-dd')
    //     }
    // },
    // beforeDestroy () {
    //     clearInterval(this.timer)
    // },
    components: {
        DatePickerArrow,
        ChildHeader,
        SwitchStation
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
