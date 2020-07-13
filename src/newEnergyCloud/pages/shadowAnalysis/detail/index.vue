<template>
    <div class="shadow-detail" @click.stop>
        <div class="title">设备名: {{groupStringDetail.eq_name}}</div>
        <div class="title">阴影组串: {{groupStringDetail.stringid}}</div>
        <div class="title">阴影时段: {{groupStringDetail.property === 'SpecialFault' || groupStringDetail.property === 'AlwaysShadow' ? '持续' : shadowtime}}</div>
        <!-- <div class="text-center">
            <span class="date-picker-container">
                <date-picker-arrow
                    style="width:100%;"
                    @change="dateChange"
                    :disabledDate="time => time.getTime() > Date.now() - 86400000"
                    :date="date">
                </date-picker-arrow>
            </span>
        </div> -->
        <date-picker-arrow
            @change="dateChange"
            :disabledDate="time => time.getTime() > Date.now() - 86400000"
            :date="date">
        </date-picker-arrow>
        <chart-a></chart-a>
        <div class="shadow-chart">
            <chart-b></chart-b>
        </div>
    </div>
</template>

<script>
import DatePickerArrow from '@newEnergyCloud/components/datePickerArrow/DatePickerArrow'
import chartA from './chartA'
import chartB from './chartB'

export default {
    components: {
        DatePickerArrow,
        chartA,
        chartB
    },
    data () {
        return {
            groupStringDetail: {},
            date: new Date(Date.now() - 86400000),
            chartbData: {},
            shadowtime: ''
        }
    },
    created () {
        this.$bus.on('openGroupDetail', this.opened)
        this.$bus.on('chartbData', this.getChartbData)
    },
    methods: {
        dateChange (date) {
            this.$bus.emit('singleDateChange', new Date(date).Format('yyyy-MM-dd'))
            let index = this.chartbData.dtime.indexOf(new Date(date).Format('yyyy-MM-dd'))
            this.shadowtime = this.chartbData.shadowtime[index]
        },
        opened (data) {
            this.groupStringDetail = data
        },
        getChartbData (data) {
            this.chartbData = data
            let index = this.chartbData.dtime.indexOf(this.date.Format('yyyy-MM-dd'))
            this.shadowtime = this.chartbData.shadowtime[index]
        }
    },
    beforeDestroy () {
        this.$bus.off('openGroupDetail', this.opened)
        this.$bus.off('chartbData', this.getChartbData)
    }
}
</script>

<style lang="scss" scoped>
.GroupDetail {
    .shadow-detail {
        height: 100%;
        .title {
            float: left;
            height: 14px;
            text-align: left;
            padding-right: 20px;
        }
        .electric-chart {
            width: calc(100% - 90px);
            height: 40%;
            margin: auto;
            margin-bottom: 10px;
        }
        .shadow-chart {
            width: 100%;
            height: calc(60% - 62px);
            background:rgba(245,250,250, 1);
        }
        .date-picker-container{
            display: inline-block;
            border:1px solid grey;
            width: 500px;
        }
    }
}

</style>
