<template>
    <div class="wrap">
        <div class="type">光伏功率曲线</div>
        <ve-histogram
            :data="chartData"
            :after-config="afterConfig"
            height='100%'
            v-loading='(pvMonitorDataGetPvRunAcpTimeList.resNumber === 0) && pvMonitorDataGetPvRunAcpTimeList.loading'
        ></ve-histogram>
    </div>
</template>

<script>
import 'echarts/lib/component/dataZoom'
import { api＿pvMonitorDataGetPvRunAcpTimeList } from '@newEnergyCloud/request/api'
export default {
    data () {
        return {
            timer: null,
            stime: 0,
            reqNumber: 0,
            pvMonitorDataGetPvRunAcpTimeList: api＿pvMonitorDataGetPvRunAcpTimeList({
                later: true,
                sameTimeOnce: true
                // onlyLatest: true
            }),
            stationDayTodayTimeLineData: {
                xdata: [],
                line1: [],
                line2: [],
                line3: []
            },
            chartData: {
                columns: ['时间', '实发功率(kW)', '理论功率(kW)', '光照强度(W/㎡)'],
                rows: []
            }
        }
    },
    created () {
        this.getChartData()
        this.timer = setInterval(() => {
            this.getChartData()
        }, 20000)
        // 2020-03-23 吧这里的两秒改成20秒
        // this.$store.getters.refresh_interval()
    },
    methods: {
        // 获取折线数据
        getChartData () {
            this.stime = this.pvMonitorDataGetPvRunAcpTimeList.res.body
                        ? this.pvMonitorDataGetPvRunAcpTimeList.res.body.echarts_xaTime[this.pvMonitorDataGetPvRunAcpTimeList.res.body.echarts_xaTime.length - 1].split(':').join('')
                        : 0
            try {
                this.pvMonitorDataGetPvRunAcpTimeList.getData({
                    date: new Date().Format('yyyy-MM-dd'),
                    dataType: 2,
                    dateType: 3,
                    queryType: 1,
                    stime: this.stime
                })
                .then(res => {
                    // 看着原来的判断有的难受，改了一下
                    if (!res?.body) return this.setDataNull()

                    // if (res.body.echarts_xaTime.length > 1 && res.body.echarts_xaTime[res.body.echarts_xaTime.length - 1] === this.stationDayTodayTimeLineData.xdata[this.stationDayTodayTimeLineData.xdata.length - 1]) {
                    //     return
                    // }
                    // let { xdata, line1, line2, line3 } = this.stationDayTodayTimeLineData
                    // 在这里加一行代码，解决曲线重复问题
                    if (res.body.echarts_xaTime[0] === this.stationDayTodayTimeLineData.xdata[0]) return
                    const length = this.stationDayTodayTimeLineData.xdata.length
                    this.stationDayTodayTimeLineData.xdata = this.stationDayTodayTimeLineData.xdata.slice(0, length - 1).concat(res.body.echarts_xaTime)
                    this.stationDayTodayTimeLineData.line1 = this.stationDayTodayTimeLineData.line1.slice(0, length - 1).concat(res.body.echarts_p)
                    this.stationDayTodayTimeLineData.line2 = this.stationDayTodayTimeLineData.line2.slice(0, length - 1).concat(res.body.echarts_shd_p)
                    this.stationDayTodayTimeLineData.line3 = this.stationDayTodayTimeLineData.line3.slice(0, length - 1).concat(res.body.echarts_sun)
                    let arr1 = []
                    let arr2 = []
                    let arr3 = []
                    let arr4 = []
                    this.chartData.rows = []
                    this.stationDayTodayTimeLineData.xdata.forEach(v => {
                        arr1.push({'时间': v})
                    })
                    this.stationDayTodayTimeLineData.line1.forEach(v => {
                        arr2.push({'实发功率(kW)': v})
                    })
                    this.stationDayTodayTimeLineData.line2.forEach(v => {
                        arr3.push({'理论功率(kW)': v})
                    })
                    this.stationDayTodayTimeLineData.line3.forEach(v => {
                        arr4.push({'光照强度(W/㎡)': v})
                    })
                    this.stationDayTodayTimeLineData.xdata.forEach((v, i) => {
                        this.chartData.rows.push({...arr1[i], ...arr2[i], ...arr3[i], ...arr4[i]})
                    })
                })
            } catch (err) {

            }
        },
        setDataNull () {
            this.pvMonitorDataGetPvRunAcpTimeList.res.body = null
            this.stationDayTodayTimeLineData.xdata = []
            this.stationDayTodayTimeLineData.line1 = []
            this.stationDayTodayTimeLineData.line2 = []
            this.stationDayTodayTimeLineData.line3 = []
            this.chartData.rows = []
        },
        afterConfig (options) {
            options.color = ['#71cf53', '#35c4ee', '#d8b454']
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
                data: ['实发功率(kW)', '理论功率(kW)', '光照强度(W/㎡)'],
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
            new Array(3).fill(0).forEach((v, i) => {
                options.series[i].symbol = 'none'
                options.series[i].type = 'line'
            })

            options.series[2].yAxisIndex = 1
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
