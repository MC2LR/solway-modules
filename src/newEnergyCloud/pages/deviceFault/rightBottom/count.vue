<template>
    <div class="count" v-loading='pvAnalyzeDeviceFaultLogTrendChart.loading'>
        <div class="title">故障事件次数：{{chart.length}}次</div>
        <zoom-line height="50px">
            <div class="event-line">
                <el-popover
                    v-for="(item, index) in chart" :key="index"
                    placement="top"
                    width="200"
                    trigger="hover">
                    <div>
                        <p>{{item.deviceName}}</p>
                        <p>{{item.eventTypeStr}}</p>
                        <p>{{new Date(item.sStartTime).Format('yyyy-MM-dd hh:mm:ss')}}</p>
                    </div>
                    <div class="dot" slot="reference" :style="{left: item.left + '%'}"></div>
                </el-popover>
            </div>
        </zoom-line>
    </div>
</template>

<script>
import { api＿pvAnalyzeDeviceFaultLogTrendChart } from '@newEnergyCloud/request/api'
import ZoomLine from '@/components/lineZoom'
import theme from '../theme/theme'
export default {
    mixins: [theme],
    components: {
        ZoomLine
    },
    data () {
        return {
            tableVal: {},
            chart: [],
            date: [new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd'), new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd')],
            pvAnalyzeDeviceFaultLogTrendChart: api＿pvAnalyzeDeviceFaultLogTrendChart({
                later: true,
                res: {
                    body: {
                        chart: [],
                        device_fail_percent: 0,
                        fault_percent: 0
                    }
                }
            })
        }
    },
    created () {
        this.$bus.on('stationChange', this.stationChange)
        this.$bus.on('dateChange', this.dateChange)
        this.$bus.on('tableClickChange', this.tableClickChange)
        this.$bus.on('emptyData', this.emptyData)
        this.stId = this.$store.getters.station_id
        this.stationChange()
    },
    methods: {
        stationChange (data) {
            this.stId = data ? data.id : this.$store.getters.station_id
        },
        dateChange (date) {
            this.date = date
        },
        tableClickChange (val) {
            if (!val) return
            this.tableVal = val
            this.getData()
        },
        getData () {
            this.$bus.emit('piesLoading', true)
            this.pvAnalyzeDeviceFaultLogTrendChart.getData({
                startDate: this.date[0],
                endDate: this.date[1],
                stId: this.stId,
                faultDesc: this.tableVal.faultDesc,
                serialNumber: this.tableVal.serialNumber,
                deviceType: this.tableVal.deviceType
            }).then(res => {
                if (!res.body.chart.length) {
                    this.emptyData()
                    res.body = {
                        ...res.body,
                        deviceName: this.tableVal.deviceName,
                        faultDesc: this.tableVal.faultDesc
                    }
                    return this.$bus.emit('piesData', res.body)
                }
                let totalSecond = new Date(`${this.date[1]} 23:59:59`).getTime() - new Date(`${this.date[0]} 00:00:00`).getTime()
                if (res.body.chart[0].sStartTimeMillisecond < 0) {
                    totalSecond -= res.body.chart[0].sStartTimeMillisecond
                }
                res.body.chart.forEach(v => {
                    if (v.sStartTimeMillisecond < 0) v.sStartTimeMillisecond = v.sStartTimeMillisecond - res.body.chart[0].sStartTimeMillisecond
                    v.left = (v.sStartTimeMillisecond / totalSecond) * 100
                })
                res.body = {
                    ...res.body,
                    deviceName: this.tableVal.deviceName,
                    faultDesc: this.tableVal.faultDesc
                }
                this.chart = res.body.chart
                this.$bus.emit('piesData', res.body)
            })
        },
        emptyData () {
            this.chart = []
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.stationChange)
        this.$bus.off('dateChange', this.dateChange)
        this.$bus.off('tableClickChange', this.tableClickChange)
        this.$bus.off('emptyData', this.emptyData)
    }
}
</script>

<style lang="scss" scoped>
@import '../theme/theme.scss';
.count {
    .title {
        font-size: 16px;
        // color: #73767C;
        @include page_c(color, $pageHeadSectionWordColor);
    }

    .event-line {
        width: 100%;
        height: 1px;
        @include page_c(background-color, $pageHeadSectionWordLightColor);
        overflow: visible;
        position: relative;
        margin-top: 20px;

        .dot {
            position: absolute;
            left: -5px;
            top: -5px;
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background-color: #FD6869;
            cursor: pointer;
            transition: transform .5s ease;

            &:hover {
                transform: scale(2);
            }
        }
    }

}
</style>
