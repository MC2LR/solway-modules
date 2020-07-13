<template>
    <div class="fault-generation">
        <div class="title"><span class="title-bg">故障情况</span></div>
        <div class="items clearfix">
            <div class="item">
                <span class="name">总损失电量</span>
                <span class="value">{{queryPvCompanyAnalysisWeSe.res.body.data.we ? queryPvCompanyAnalysisWeSe.res.body.data.we : queryPvCompanyAnalysisWeSe.res.body.data.we === 0 ? 0 : '-'}}{{queryPvCompanyAnalysisWeSe.res.body.units.we || '-'}}</span>
            </div>
            <div class="item">
                <span class="name">故障电站数量</span>
                <span class="value">{{queryPvCompanyAnalysisWeSe.res.body.data.station_count ? queryPvCompanyAnalysisWeSe.res.body.data.station_count : queryPvCompanyAnalysisWeSe.res.body.data.station_count === 0 ? 0 : '-'}}个</span>
            </div>
        </div>
        <div class="chart" @click.stop>
            <ve-histogram
                :data="chartData"
                :after-config="afterConfig"
                :data-zoom="dataZoom"
                :events="chartEvents"
                height='100%'
                ref='chart'
                v-loading='queryPvCompanyAnalysisWeSeLine.loading'
            ></ve-histogram>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/dataZoom'
import {rem} from '@comm/mixin'
import { api＿queryPvCompanyAnalysisWeSe, api＿queryPvCompanyAnalysisWeSeLine } from '@newEnergyCloud/request/api'

export default {
    mixins: [rem],
    data () {
        return {
            chartEvents: {},
            date: [new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd'), new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd')],
            queryPvCompanyAnalysisWeSe: api＿queryPvCompanyAnalysisWeSe({
                later: true,
                res: {
                    body: {
                        data: {},
                        names: {},
                        units: {}
                    }
                }
            }),
            queryPvCompanyAnalysisWeSeLine: api＿queryPvCompanyAnalysisWeSeLine({
                later: true,
                res: {
                    body: {
                        data: {},
                        names: {},
                        units: {}
                    }
                }
            }),
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 20
                },
                {
                    type: 'slider',
                    start: 0,
                    end: 20,
                    show: true,
                    handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '110%',
                    height: 10,
                    bottom: 0,
                    borderColor: 'rgba(0, 0, 0, .6)',
                    fillerColor: '#269cdb',
                    borderRadius: 5,
                    backgroundColor: 'rgba(51, 56, 75, .4)', // 两边未选中的滑动条区域的颜色
                    showDataShadow: false,
                    showDetail: false,
                    zoomLock: false
                }
            ],
            chartData: {
                columns: ['电站', '损失电量'],
                rows: []
            }
        }
    },
    created () {
        this.getSectionData(this.date)
        // this.getLineData(this.date)
        this.$bus.on('dateChange', this.dateChange)
        const self = this
        this.chartEvents = {
            click: function (e) {
                self.barName = e.name
                const { st_name: stName, stid } = self.queryPvCompanyAnalysisWeSeLine.res.body.data
                const index = stName.indexOf(e.name)
                const stId = stid[index]
                let data = {
                    id: stId,
                    stClass: '01',
                    dataType: 0
                }
                self.$store.dispatch('station/changeStation', data).then(res => {
                    self.$router.push({name: 'deviceFault'})
                })
            }
        }
    },
    methods: {
        dateChange (date) {
            this.getSectionData(date)
            this.getLineData(date)
        },
        getSectionData (date) {
            this.queryPvCompanyAnalysisWeSe.getData({
                startDate: date[0],
                endDate: date[1]
            })
        },
        getLineData (date) {
            this.queryPvCompanyAnalysisWeSeLine.getData({
                startDate: date[0],
                endDate: date[1]
            }).then(res => {
                if (!res.body || Object.keys(res.body).length === 0) return
                const { st_name: stName, we } = res.body.data
                let arr1 = []
                let arr2 = []
                this.chartData.rows = []
                stName.forEach(v => {
                    arr1.push({'电站': v})
                })
                we.forEach(v => {
                    arr2.push({'损失电量': v})
                })
                stName.forEach((v, i) => {
                    this.chartData.rows.push({...arr1[i], ...arr2[i]})
                })
                // let end = ((this.$el.clientWidth - 20) / 13) / stName.length
                // if (stName.length <= (this.$el.clientWidth - 20) / 13) end = 1
                let end = 20 / stName.length
                if (stName.length <= 20) end = 1
                this.dataZoom[0].end = end * 100
                this.dataZoom[1].end = end * 100
            })
        },
        afterConfig (options) {
            options.color = ['#2FBFCC']

            options.xAxis[0].axisLabel = {
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.7)'
                }
            }
            options.xAxis[0].axisLine = {
                show: true,
                lineStyle: {
                    color: 'rgba(16, 70, 140, 0.8)',
                    width: 1
                }
            }
            options.xAxis[0].nameTextStyle = {
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: 13
            }
            options.xAxis[0].nameGap = 10
            options.xAxis[0].nameLocation = 'end'
            options.xAxis[0].name = '电站'

            options.yAxis[0].axisLine = {
                show: true,
                lineStyle: {
                    color: 'rgba(16, 70, 140, 0.8)',
                    width: 1
                }
            }
            options.yAxis[0].splitLine = {
                show: false
            }
            options.yAxis[0].axisLabel = {
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.7)'
                }
            }
            options.yAxis[0].nameTextStyle = {
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: 13
            }
            options.yAxis[0].nameGap = 10
            options.yAxis[0].name = 'kWh'

            options.legend = {
                show: false
            }

            options.grid = {
                top: '40',
                bottom: '15',
                left: '15',
                right: '50'
            }

            options.series[0].type = 'bar'
            options.series[0].barWidth = 13

            options.series[0].itemStyle = {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'rgba(255, 115, 129, 1)'},
                            {offset: 0.5, color: 'rgba(255, 115, 129, .8)'},
                            {offset: 1, color: 'rgba(255, 115, 129, .1)'}
                        ]
                    )
                }
            }

            return options
        }
    },
    beforeDestroy () {
        this.$bus.off('dateChange', this.dateChange)
    }
}
</script>

<style lang="scss" scoped>
.fault-generation {
    padding: 10px 10px;
    padding-bottom: 6px;
    .title {
        color: #30C6F9;
        font-size: 14px;
        padding-bottom: 12px;
        .title-bg{
            display: inline-block;
            height: 19px;
            line-height: 19px;
            width:206px;
        }
    }
    .items {
        padding-bottom: 0px;
        .item {
            float: left;
            padding-right: 1rem;
            .name {
                color: rgba(255, 255, 255, .8);
                font-size: 12px;
                padding-right: .1rem;
            }
            .value {
                color: rgba(255, 255, 255, 1);
                font-size: 18px;
            }
        }
    }
    .chart {
        height: calc(100% - 47px);
    }
}
</style>
