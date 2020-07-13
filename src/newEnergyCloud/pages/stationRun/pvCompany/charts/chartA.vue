<template>
    <div class="wrap">
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
import 'echarts/lib/component/title'
import { api＿pvMonitorDataGetPvRunAcpTimeList } from '@newEnergyCloud/request/api'
import theme from '../../theme/theme'

export default {
    mixins: [theme],
    data () {
        return {
            timer: null,
            isToday: true,
            stime: 0,
            pageTheme: '',
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
                columns: ['时间', '实发功率(kW)', '光照强度(W/㎡)'],
                rows: []
            }
        }
    },
    created () {
        this.pageTheme = this.theme.$a
        this.getChartData()
        this.timer = setInterval(() => {
            if (this.isToday) this.getChartData()
        }, 20000)
        // this.$store.getters.refresh_interval()
        this.$bus.on('dateChange', this.getTime)
        this.$bus.on('stationChange', this.stationChange)
        this.$bus.on('switch_theme', this.themeChange)
    },
    methods: {
        getTime (date) {
            this.isToday = new Date(date).toDateString() === new Date().toDateString()
            setTimeout(() => {
                this.$refs.chart && this.$refs.chart.resize()
            }, 0)
            if (this.isToday) this.getChartData()
        },
        stationChange (data) {
            this.setDataNull()
            this.getChartData()
        },
        themeChange (theme) {
            this.pageTheme = this.theme.$a
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
                    queryType: 1,
                    stime: this.stime
                    }).then(res => {
                        if (!res?.body) return this.setDataNull()
                        if (res.body.echarts_xaTime[0] === this.stationDayTodayTimeLineData.xdata[0]) return
                        const { xdata, line1, line2 } = this.stationDayTodayTimeLineData
                        const length = xdata.length

                        this.stationDayTodayTimeLineData.xdata = xdata.slice(0, length - 1).concat(res.body.echarts_xaTime)
                        this.stationDayTodayTimeLineData.line1 = line1.slice(0, length - 1).concat(res.body.echarts_p)
                        this.stationDayTodayTimeLineData.line2 = line2.slice(0, length - 1).concat(res.body.echarts_sun)
                        let arr1 = []
                        let arr2 = []
                        let arr3 = []
                        this.chartData.rows = []
                        this.stationDayTodayTimeLineData.xdata.forEach(v => {
                            arr1.push({'时间': v})
                        })
                        this.stationDayTodayTimeLineData.line1.forEach(v => {
                            arr2.push({'实发功率(kW)': v})
                        })
                        this.stationDayTodayTimeLineData.line2.forEach(v => {
                            arr3.push({'光照强度(W/㎡)': v})
                        })
                        this.stationDayTodayTimeLineData.xdata.forEach((v, i) => {
                            this.chartData.rows.push({...arr1[i], ...arr2[i], ...arr3[i]})
                        })
                })
            } catch (e) {

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
            options.title = {
                text: '功率曲线图',
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: '16',
                    color: this.theme.$sectionWaterColor
                },
                top: 10,
                left: 18
            }
            options.color = ['#71cf53', '#d8b454']
            options.xAxis[0].axisLabel = {
                textStyle: {
                    color: this.theme.$axisTextColor
                }
            }
            options.xAxis[0].axisLine = {
                show: true,
                lineStyle: {
                    color: 'rgba(197,201,206, 0.4)',
                    width: 1
                }
            }
            new Array(2).fill(0).forEach((v, i) => {
                options.yAxis[i].axisLine = {
                    show: true,
                    lineStyle: {
                        color: 'rgba(197,201,206, 0.4)',
                        width: 1
                    }
                }
                options.yAxis[i].splitLine = {
                    show: false
                }
                options.yAxis[i].axisLabel = {
                    textStyle: {
                        color: this.theme.$axisTextColor
                    }
                }
            })

            options.legend = {
                data: ['实发功率(kW)', '光照强度(W/㎡)'],
                textStyle: {
                    fontSize: 12,
                    color: this.theme.$sectionWaterColor
                },
                icon: 'rect',
                itemWidth: 20,
                itemHeight: 4,
                itemGap: 30,
                top: 10,
                left: 300
            }
            options.grid = {
                top: '70',
                bottom: '15',
                left: '3%',
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
        this.$bus.off('dateChange', this.getTime)
        this.$bus.off('stationChange', this.stationChange)
        this.$bus.off('switch_theme', this.themeChange)
    }
}
</script>

<style lang="scss" scoped>
@import '../../theme/theme.scss';

.wrap {
    width: 100%;
    height: 100%;
    // background: #fff;
    @include page_c(background-color, $pageSectionBgColor);
}
</style>
