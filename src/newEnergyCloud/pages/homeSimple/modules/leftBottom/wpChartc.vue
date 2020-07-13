<template>
    <div class="wrap">
        <div class="type">风电功率曲线</div>
        <ve-histogram
            :data="chartData"
            :after-config="afterConfig"
            height='100%'
            v-loading='(pvwpGetrunAcpTimeListPvwp.resNumber === 0) && pvwpGetrunAcpTimeListPvwp.loading'
        ></ve-histogram>
    </div>
</template>

<script>
import 'echarts/lib/component/dataZoom'
import { api＿pvwpGetrunAcpTimeListPvwp } from '@newEnergyCloud/request/api'
export default {
    data () {
        return {
            timer: null,
            stime: 0,
            reqNumber: 0,
            pvwpGetrunAcpTimeListPvwp: api＿pvwpGetrunAcpTimeListPvwp({
                later: true,
                sameTimeOnce: true
            }),
            stationDayTodayTimeLineData: {
                xdata: [],
                line1: [],
                line2: [],
                line3: []
            },
            chartData: {
                columns: ['时间', '实发功率(kW)', '风速(m/s)'],
                rows: []
            }
        }
    },
    created () {
        this.getChartData()
        this.timer = setInterval(() => {
            this.getChartData()
        }, 20000)
    },
    methods: {
        // 获取折线数据
        getChartData () {
            this.stime = this.pvwpGetrunAcpTimeListPvwp.res.body
                        ? this.pvwpGetrunAcpTimeListPvwp.res.body.chart_wp.echarts_xaxisTime[this.pvwpGetrunAcpTimeListPvwp.res.body.chart_wp.echarts_xaxisTime.length - 1].split(':').join('')
                        : 0
            try {
                this.pvwpGetrunAcpTimeListPvwp.getData({
                    date: new Date().Format('yyyy-MM-dd'),
                    dataType: 2,
                    dateType: 3,
                    queryType: 1,
                    stime: this.stime
                })
                .then(res => {
                    // 看着原来的判断有的难受，改了一下
                    if (!res?.body) return this.setDataNull()
                    // 在这里加一行代码，解决曲线重复问题
                    if (res.body.chart_wp.echarts_xaxisTime[0] === this.stationDayTodayTimeLineData.xdata[0]) return
                    const length = this.stationDayTodayTimeLineData.xdata.length
                    this.stationDayTodayTimeLineData.xdata = this.stationDayTodayTimeLineData.xdata.slice(0, length - 1).concat(res.body.chart_wp.echarts_xaxisTime)
                    this.stationDayTodayTimeLineData.line1 = this.stationDayTodayTimeLineData.line1.slice(0, length - 1).concat(res.body.chart_wp.echarts_power)
                    // this.stationDayTodayTimeLineData.line2 = this.stationDayTodayTimeLineData.line2.slice(0, length - 1).concat(res.body.echarts_shd_p)
                    this.stationDayTodayTimeLineData.line3 = this.stationDayTodayTimeLineData.line3.slice(0, length - 1).concat(res.body.chart_wp.echarts_windSpeed)
                    let arr1 = []
                    let arr2 = []
                    // let arr3 = []
                    let arr4 = []
                    this.chartData.rows = []
                    this.stationDayTodayTimeLineData.xdata.forEach(v => {
                        arr1.push({'时间': v})
                    })
                    this.stationDayTodayTimeLineData.line1.forEach(v => {
                        arr2.push({'实发功率(kW)': v})
                    })
                    // this.stationDayTodayTimeLineData.line2.forEach(v => {
                    //     arr3.push({'理论功率(kW)': v})
                    // })
                    this.stationDayTodayTimeLineData.line3.forEach(v => {
                        arr4.push({'风速(m/s)': v})
                    })
                    this.stationDayTodayTimeLineData.xdata.forEach((v, i) => {
                        this.chartData.rows.push({...arr1[i], ...arr2[i], ...arr4[i]})
                    })
                })
            } catch (err) {

            }
        },
        setDataNull () {
            this.pvwpGetrunAcpTimeListPvwp.res.body = null
            this.stationDayTodayTimeLineData.xdata = []
            this.stationDayTodayTimeLineData.line1 = []
            this.stationDayTodayTimeLineData.line2 = []
            this.stationDayTodayTimeLineData.line3 = []
            this.chartData.rows = []
        },
        afterConfig (options) {
            options.color = ['#71cf53', '#d8b454']
            options.xAxis[0].axisLabel = {
                textStyle: {
                    color: '#fff'
                }
            }
            options.xAxis[0].axisLine = {
                show: true,
                lineStyle: {
                    color: 'rgba(39, 79, 133, 1)',
                    width: 1
                }
            }
            new Array(2).fill(0).forEach((v, i) => {
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
                        color: '#fff'
                    }
                }
            })

            options.legend = {
                data: ['实发功率(kW)', '风速(m/s)'],
                textStyle: {
                    fontSize: 12,
                    color: '#fff'
                },
                icon: 'rect',
                itemWidth: 20,
                itemHeight: 4,
                itemGap: 30,
                top: 10,
                right: 16
            }
            options.grid = {
                top: '20%',
                bottom: '5%',
                left: '5%',
                right: '3%'
            }
            new Array(2).fill(0).forEach((v, i) => {
                options.series[i].symbol = 'none'
                options.series[i].type = 'line'
            })

            options.series[1].yAxisIndex = 1
            return options
        }
    },
    beforeDestroy () {
        this.timer && clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: 100%;
    position: relative;
    .type {
        color: #fff;
        position: absolute;
        left: 120px;
        top: 14px;
        z-index: 11111;
        font-size: 12px;
    }
}
</style>
