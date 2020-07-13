<template>
    <div class="child-head">
        <div class="pull-left">
            <switch-station/>
        </div>
        <div class="right pull-right">
            <div class="item pull-left">
                <div class="value"><span>{{Data.accum.data.inst_kw || '-'}}</span>{{Data.accum.units.inst_kw || '-'}}</div>
                <div class="name">总装机量</div>
            </div>
            <div class="item pull-left">
                <div class="value"><span>{{Data.accum.data.real_kwh_chk || '-'}}</span>{{Data.accum.units.real_kwh_chk || '-'}}</div>
                <div class="name">累计发电量</div>
            </div>
            <div class="item pull-left" v-if="!isHenan">
                <div class="value"><span>{{Data.accum.data.co2 || '-'}}</span>{{Data.accum.units.co2 || '-'}}</div>
                <div class="name">二氧化碳减排</div>
            </div>
        </div>
        <div class="center">
            <date-picker-arrow
                :theme="themeName"
                @change="dateChange"
                :disabledDate="time => time.getTime() > Date.now()"
                :date="date">
            </date-picker-arrow>
        </div>
    </div>
</template>

<script>
import { } from '@newEnergyCloud/request/api'
import SwitchStation from '@/components/station/switchStation/switchStation'
import DatePickerArrow from '@newEnergyCloud/components/datePickerArrow/DatePickerArrow'
import theme from '../theme/theme'
export default {
    mixins: [theme],
    data () {
        return {
            isHenan: process.env.isHenan === 'true',
            date: new Date(),
            dateFormatter: new Date().Format('yyyy-MM-dd'),
            Data: {
                accum: {
                    data: {},
                    units: {}
                },
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
                }
            }
        }
    },
    components: {
        SwitchStation,
        DatePickerArrow
    },
    created () {
        this.$bus.on('stationChange', this.stationChange)
        this.$bus.on('headData', this.headData)
    },
    methods: {
        stationChange (data) {
        },
        dateChange (date) {
            this.dateFormatter = new Date(date).Format('yyyy-MM-dd')
            this.$bus.emit('dateChange', new Date(date).Format('yyyy-MM-dd'))
        },
        headData (data) {
            this.Data = data
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.stationChange)
        this.$bus.off('headData', this.headData)
    }
}
</script>

<style lang="scss" scoped>
@import '../theme/theme.scss';
.child-head {
    width: 85%;
    line-height: 60px;
    padding: 15px 10px;
    padding-top: 5px;
    overflow: hidden;
    @include page_c(color, $pageHeadSectionWordColor);
    .center {
        width: max-content;
        height: 60px;
        margin: 0 auto;
        .date-picker-arrow {
            margin-top: 13px;
        }
    }
    .right {
        padding-top: 3px;
        .item {
            line-height: 25px;
            padding-right: 30px;
            // @include page_c(color, $pageHeadSectionWordColor);
            &:last-child {
                padding-right: 0;
            }
            .name {
                font-size: 12px;
            }
            .value {
                font-size: 13px;
                span {
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
