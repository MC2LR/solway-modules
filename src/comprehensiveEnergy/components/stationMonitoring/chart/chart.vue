<template>
    <div class="power-chart">
        <div class="power-chart-main" ref="powerChart" v-loading="((getRunAcpTimeListToday.resNumber === 0) && getRunAcpTimeListToday.loading) || getPowerStationDayAgoTimeLine.loading">

        </div>
    </div>
</template>

<script>
// 引入曲线图
import 'echarts/lib/chart/line'
// 引入提示框和标题组件、legend
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

import { api＿getRunAcpTimeListToday, api＿getPowerStationDayAgoTimeLine } from '@comprehensiveEnergy/request/api'

export default {
    data () {
        return {
            getRunAcpTimeListToday: api＿getRunAcpTimeListToday({
                later: true
            }),
            getPowerStationDayAgoTimeLine: api＿getPowerStationDayAgoTimeLine({
                later: true
            }),
            myChart: null,
            time: null,
            stationDayTodayTimeLineData: {
                xdata: [],
                line1: [],
                line2: [],
                line3: []
            },
            showTime: new Date().Format('yyyy-MM-dd'),
            flag: true
        }
    },
    mounted () {
        this.myChart = this.$echarts.init(this.$refs.powerChart)
        window.addEventListener('resize', this.myChart.resize)

        this.$bus.on('dateChange', this.getTime)

        this.getChartData()
        this.time = setInterval(() => {
            if (this.flag) {
                this.getChartData()
            }
        }, this.$store.state.stationMonitoring.dataInterval)

        // 实时接口
        this.getRunAcpTimeListToday.subscribe(res => {
            if (!res.body) return
            if (this.getRunAcpTimeListToday.resNumber !== 1 && this.getRunAcpTimeListToday.params.stime === 0) {
                this.stationDayTodayTimeLineData = {
                    xdata: [],
                    line1: [],
                    line2: [],
                    line3: []
                }
            }

            const { xdata, line1, line2, line3 } = this.stationDayTodayTimeLineData
            const length = xdata.length
            let ydatas = []
            let seriesData = []
            let series = []
            let colors = ['#71cf53', '#35c4ee', '#d8b454']
            let ynames = ['实发功率(kW)', '理论功率(kW)', '光照强度(W/㎡)']
            for (var i = 0; i < 2; i++) {
                ydatas.push(
                    {
                        name: '',
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(78, 105, 128, 0.8)',
                                width: 1
                            }
                        },
                        nameTextStyle: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: 12
                        },
                        nameGap: 5,
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                )
            }

            this.stationDayTodayTimeLineData.xdata = xdata.slice(0, length - 1).concat(res.body.echarts_xaTime)

            this.stationDayTodayTimeLineData.line1 = line1.slice(0, length - 1).concat(res.body.echarts_p)
            this.stationDayTodayTimeLineData.line2 = line2.slice(0, length - 1).concat(res.body.echarts_shd_p)
            this.stationDayTodayTimeLineData.line3 = line3.slice(0, length - 1).concat(res.body.echarts_sun)

            seriesData.push(this.stationDayTodayTimeLineData.line1, this.stationDayTodayTimeLineData.line2, this.stationDayTodayTimeLineData.line3)

            seriesData.forEach((v, i) => {
                series.push(
                        {
                        name: ynames[i],
                        type: 'line',
                        smooth: true,
                        barWidth: 7,
                        symbol: 'none',
                        yAxisIndex: i === 2 ? 1 : 0,
                        data: v,
                        itemStyle: {
                            color: colors[i]
                        },
                        lineStyle: {
                            width: 1
                        }
                    }
                )
            })

            this.myChart.setOption({
                title: {
                    text: '功率趋势图',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: '16',
                        color: '#fff'
                    },
                    top: 10,
                    left: 18
                },
                tooltip: {trigger: 'axis'},
                legend: {
                    data: ynames,
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
                },
                xAxis: {
                    name: '',
                    data: this.stationDayTodayTimeLineData.xdata,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(78, 105, 128, 0.8)',
                            width: 1
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    },
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: 12
                    },
                    nameGap: 5,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: ydatas,
                series: series,
                grid: {
                    top: '65',
                    left: '18',
                    right: '18',
                    bottom: '7',
                    containLabel: true
                }
            }, true)
        })
        // 历史接口
        this.getPowerStationDayAgoTimeLine.subscribe(res => {
            let xdata = res.body.x
            let ydatas = []
            let seriesData = []
            let series = []
            let colors = ['#71cf53', '#35c4ee', '#d8b454']
            let ynames = ['实发功率(kW)', '理论功率(kW)', '光照强度(W/㎡)']

            for (var i = 0; i < 2; i++) {
                ydatas.push(
                    {
                        name: '',
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(78, 105, 128, 0.8)',
                                width: 1
                            }
                        },
                        nameTextStyle: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: 12
                        },
                        nameGap: 5,
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                )
            }

            seriesData.push(res.body.real_curve, res.body.shd_curve, res.body.sun_curve)
            seriesData.forEach((v, i) => {
                series.push(
                        {
                        name: ynames[i],
                        type: 'line',
                        smooth: true,
                        barWidth: 7,
                        symbol: 'none',
                        yAxisIndex: i === 2 ? 1 : 0,
                        data: v,
                        itemStyle: {
                            color: colors[i]
                        },
                        lineStyle: {
                            width: 1
                        }
                    }
                )
            })

            this.myChart.setOption({
                title: {
                    text: '功率趋势图',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: '16',
                        color: '#fff'
                    },
                    top: 10,
                    left: 18
                },
                tooltip: {trigger: 'axis'},
                legend: {
                    data: ynames,
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
                },
                xAxis: {
                    name: '',
                    data: xdata,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(78, 105, 128, 0.8)',
                            width: 1
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    },
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: 12
                    },
                    nameGap: 5,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: ydatas,
                series: series,
                grid: {
                    top: '65',
                    left: '18',
                    right: '18',
                    bottom: '7',
                    containLabel: true
                }
            }, true)
        })
    },
    methods: {
        // 切换时间
        getTime (res) {
            this.myChart && this.myChart.clear()
            this.flag = this.$store.getters['stationMonitoring/isToday']
            this.showTime = this.$store.getters['stationMonitoring/dateStr']
            this.getChartData()
        },
        // 获取折线数据
        async getChartData () {
            await this.$timeout(0)
            if (this.flag) {
                this.getRunAcpTimeListToday.getData({
                    queryType: 3,
                    dateType: 3,
                    date: this.showTime,
                    dataType: 2,
                    stime: this.getRunAcpTimeListToday.res.body
                        ? this.getRunAcpTimeListToday.res.body.echarts_xaTime[this.getRunAcpTimeListToday.res.body.echarts_xaTime.length - 1].split(':').join('')
                        : 0
                })
            } else {
                this.getPowerStationDayAgoTimeLine.getData({
                    queryType: 3,
                    dateType: 3,
                    date: this.showTime
                })
            }
        }
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.myChart.resize)
        clearInterval(this.time)
        this.$bus.off('dateChange', this.getTime)
        if (this.myChart && !this.myChart.isDisposed()) {
            this.myChart.clear()
            this.myChart.dispose()
            this.myChart = null
        }
    }
}
</script>

<style lang="scss" scoped>
.power-chart {
    height: calc(100% - 217px);
    @include c(background-color, $bg_c7);
    .power-chart-main {
        height: 100%;
    }
}
</style>
