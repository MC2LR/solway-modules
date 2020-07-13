<template>
    <ve-line
        v-loading="(pvMonitorSelectKWLine.loading && getRunAcpTimeList.loading) || isChanged"
        :after-set-option-once="getChart"
        :data="chartData"
        :extend="chartExtend"
        height="100%">
    </ve-line>
</template>

<script>
import {api＿pvMonitorSelectKWLine, api＿getRunAcpTimeList} from '@/request/henanApi'
let realDataXaxis = []
export default {
    data () {
        return {
            pvMonitorSelectKWLine: api＿pvMonitorSelectKWLine({
                later: true,
                data: {
                    queryType: 1,
                    date: [new Date(Date.now() - 86400000 * 10).Format('yyyy-MM-dd'), new Date().Format('yyyy-MM-dd')].join()
                }
            }).subscribe(res => this.pvMonitorSelectKWLineResult(res)),
            getRunAcpTimeList: api＿getRunAcpTimeList({
                later: true,
                onlyLatest: true,
                sameTimeOnce: true,
                cacheParams: false
            }).subscribe(res => this.realTimeLineResult(res)),
            chartData: {
                columns: ['时间'],
                rows: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
            },
            chartExtend: {
                legend: {
                    show: false
                },
                textStyle: {
                    color: '#28C2DD'
                },
                grid: {
                    top: 65,
                    bottom: 10
                },
                xAxis: {
                    show: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(39, 79, 133, 1)'
                        }
                    },
                    data: []
                },
                'yAxis.0': {
                    name: '　　功率（千瓦）',
                    show: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(39, 79, 133, 1)',
                            width: 1
                        }
                    },
                    splitLine: {
                        show: false
                    }
                }
            },
            xTime: [],
            historyLineData: [],
            realTimeLineData: [],
            stime: 0,
            isChanged: false
        }
    },
    created () {
        this.$bus.on(this.$route.name + 'StationChange', this.stationChange)
        this.timer = setInterval(() => this.getRealTimeLine(), this.$route.meta.refresh_interval)
    },
    computed: {
        stid () {
            return this.$store.state.userActionRecord[this.$route.name + '_selectedStid']
        }
    },
    methods: {
        getChart (chart) {
            this.myChart = chart
            this.getData()
        },
        stationChange () {
            this.dataClear()
            this.getData()
        },
        dataClear () {
            this.stime = 0
            this.xTime = []
            this.realTimeLineData = []
            this.isChanged = true
            this.chartData.rows = []
        },
        getData () {
            this.pvMonitorSelectKWLine.getData({
                id: this.stid || void 0,
                queryType: this.stid ? 3 : 1,
                date: [new Date(Date.now() - 86400000 * 10).Format('yyyy-MM-dd'), new Date(Date.now() - 86400000).Format('yyyy-MM-dd')].join()
            })
            this.getRealTimeLine()
        },
        getRealTimeLine () {
            this.getRunAcpTimeList.getData({
                queryType: this.stid ? 3 : 1,
                stime: this.stime,
                stid: this.stid || void 0
            })
        },
        onlyRealTimeLine (res) {
            // realDataRes = res
            const option = this.myChart.getOption()
            realDataXaxis = option.xAxis[0].data = this.xTime = res.body.echarts_xaTime
            this.realTimeLineData = this.realTimeLineData.slice(0, -1).concat(res.body.echarts_p)
            option.series[0] = {
                name: '今日',
                type: 'line',
                itemStyle: {
                    color: '#3CC7DB'
                },
                lineStyle: {
                    width: 2
                },
                data: this.realTimeLineData.map(v => {
                    if (isNaN(+v)) return v
                    if (typeof v !== 'number') return v
                    return Math.floor(v)
                })
            }
            this.stime = res.body.echarts_xaTime.slice(-1)[0].split(':').join('')
            this.myChart.setOption(option)
        },
        realTimeLineResult (res, reRender) {
            if (this.isChanged) {
                this.isChanged = false
                return this.getRealTimeLine()
            }
            if (!this.xTime.length) return this.onlyRealTimeLine(res)
            const option = this.myChart.getOption()
            if (!this.realTimeLineData.length) {
                this.realTimeLineData = this.xTime.filter(v => v <= res.body.echarts_xaTime[0]).fill('-')
            }
            if (reRender) {
                this.realTimeLineData = this.xTime.filter(v => v <= realDataXaxis[0]).fill('-')
            }
            this.realTimeLineData = this.realTimeLineData.slice(0, -1).concat(res.body.echarts_p)
            option.series[this.pvMonitorSelectKWLine.res.body.dates.length] = {
                name: '今日',
                type: 'line',
                itemStyle: {
                    color: '#3CC7DB'
                },
                lineStyle: {
                    width: 2
                },
                data: this.realTimeLineData.map(v => {
                    if (isNaN(+v)) return v
                    if (typeof v !== 'number') return v
                    return Math.floor(v)
                })
            }
            this.stime = res.body.echarts_xaTime.slice(-1)[0].split(':').join('')
            this.myChart.setOption(option)
        },
        pvMonitorSelectKWLineResult (res) {
            // this.dataClear()
            // this.realTimeLineData = []
            const option = this.myChart.getOption()
            option.xAxis[0].data = this.xTime = res.body.x
            res.body.dates.forEach((v, i) => {
                option.series[i] = {
                    name: v,
                    type: 'line',
                    lineStyle: {
                        width: 1,
                        opacity: 0.5
                    },
                    itemStyle: {
                        color: 'rgba(67, 111, 255, 1)',
                        opacity: 0.5
                    },
                    data: ((res.body[v] || {}).real_curve || []).map(v => {
                        if (isNaN(+v)) return v
                        if (typeof v !== 'number') return v
                        return Math.floor(v)
                    })
                }
            })
            this.myChart.setOption(option)
            this.getRunAcpTimeList.res?.body && this.realTimeLineResult(this.getRunAcpTimeList.res, true)
            // if (this.stime) {
            //     this.realTimeLineResult(this.getRunAcpTimeList.res)
            // }

            // this.$nextTick(() => {
            //     this.realTimeLineResult(realDataRes)
            // })
        }
    },
    beforeDestroy () {
        this.$bus.off(this.$route.name + 'StationChange', this.stationChange)
        clearInterval(this.timer)
    }
}
</script>

<style>

</style>
