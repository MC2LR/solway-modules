<template>
    <div class="left-con">
        <ve-histogram
            :data="chartData"
            :after-config="afterConfig"
            height='100%'
            ref='chart'
            v-loading='(pvMonitorDataGetPvRunAcpTimeList.resNumber === 0) && pvMonitorDataGetPvRunAcpTimeList.loading'
        ></ve-histogram>
    </div>
</template>

<script>
import { api＿pvMonitorDataGetPvRunAcpTimeList } from '@newEnergyCloud/request/api'

export default {
    data () {
        return {
            timer: null,
            stime: 0,
            pvMonitorDataGetPvRunAcpTimeList: api＿pvMonitorDataGetPvRunAcpTimeList({
                later: true,
                sameTimeOnce: true
            }),
            stationDayTodayTimeLineData: {
                xdata: [],
                line1: [],
                line2: []
            },
            chartData: {
                columns: ['时间', '实时功率', '理论功率'],
                rows: []
            }
        }
    },
    created () {
        this.getChartData()
        this.timer = setInterval(() => {
            if (this.isToday) this.getChartData()
        }, 20000)
        // this.$store.getters.refresh_interval()
        this.$bus.on('stationChange', this.stationChange)
    },
    methods: {
        stationChange (data) {
            this.setDataNull()
            this.getChartData()
        },
        getChartData () {
            this.stime = this.pvMonitorDataGetPvRunAcpTimeList.res.body
                    ? this.pvMonitorDataGetPvRunAcpTimeList.res.body.echarts_xaTime[this.pvMonitorDataGetPvRunAcpTimeList.res.body.echarts_xaTime.length - 1].split(':').join('')
                    : 0
            try {
                this.pvMonitorDataGetPvRunAcpTimeList.getData({
                    date: new Date().Format('yyyy-MM-dd'),
                    dataType: 2,
                    dateType: 3,
                    queryType: 3,
                    stime: this.stime
                    }).then(res => {
                        if (!res?.body) return this.setDataNull()
                        if (res.body.echarts_xaTime[0] === this.stationDayTodayTimeLineData.xdata[0]) return
                        const { xdata, line1, line2 } = this.stationDayTodayTimeLineData
                        const length = xdata.length

                        this.stationDayTodayTimeLineData.xdata = xdata.slice(0, length - 1).concat(res.body.echarts_xaTime)
                        this.stationDayTodayTimeLineData.line1 = line1.slice(0, length - 1).concat(res.body.echarts_p)
                        this.stationDayTodayTimeLineData.line2 = line2.slice(0, length - 1).concat(res.body.echarts_shd_p)
                        let arr1 = []
                        let arr2 = []
                        let arr3 = []
                        this.chartData.rows = []
                        this.stationDayTodayTimeLineData.xdata.forEach(v => {
                            arr1.push({'时间': v})
                        })
                        this.stationDayTodayTimeLineData.line1.forEach(v => {
                            arr2.push({'实时功率': v})
                        })
                        this.stationDayTodayTimeLineData.line2.forEach(v => {
                            arr3.push({'理论功率': v})
                        })
                        this.stationDayTodayTimeLineData.xdata.forEach((v, i) => {
                            this.chartData.rows.push({...arr1[i], ...arr2[i], ...arr3[i]})
                        })
                })
            } catch (error) {

            }
        },
        setDataNull () {
            this.pvMonitorDataGetPvRunAcpTimeList.res.body = null
            this.stationDayTodayTimeLineData.xdata = []
            this.stationDayTodayTimeLineData.line1 = []
            this.stationDayTodayTimeLineData.line2 = []
            this.chartData.rows = []
        },
        afterConfig (options) {
            options.color = ['#2EBBC8', '#F4C36F']
            options.xAxis[0].axisLabel = {
                textStyle: {
                    color: '#2FBFCB'
                }
            }
            options.xAxis[0].axisLine = {
                show: true,
                lineStyle: {
                    color: 'rgba(39, 79, 133, 1)',
                    width: 1
                }
            }
            new Array(1).fill(0).forEach((v, i) => {
                options.yAxis[i].name = 'kw'
                options.yAxis[i].nameTextStyle = {
                    color: '#2FBFCB'
                }
                options.yAxis[i].axisLine = {
                    show: true,
                    lineStyle: {
                        color: 'rgba(39, 79, 133, 1)',
                        width: 1
                    }
                }
                options.yAxis[i].splitLine = {
                    show: false
                }
                options.yAxis[i].axisLabel = {
                    textStyle: {
                        color: '#2FBFCB'
                    }
                }
            })

            options.legend = {
                data: ['实时功率', '理论功率'],
                textStyle: {
                    fontSize: 12,
                    color: '#2FBFCB'
                },
                icon: 'rect',
                itemWidth: 20,
                itemHeight: 4,
                itemGap: 40,
                top: 10,
                right: 20
            }

            options.grid = {
                top: '40',
                bottom: '12',
                left: '3%',
                right: '3%'
            }
            new Array(2).fill(0).forEach((v, i) => {
                options.series[i].symbol = 'none'
                options.series[i].type = 'line'
                // options.series[i].areaStyle = {}
            })

            return options
        }
    }
}
</script>

<style lang="scss" scoped>
.left-con {
    height: 100%;
}
</style>
