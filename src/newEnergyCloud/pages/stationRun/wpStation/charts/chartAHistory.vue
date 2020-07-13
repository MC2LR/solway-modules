<template>
    <div class="wrap">
        <ve-histogram
            :data="chartData"
            :after-config="afterConfig"
            height='100%'
            v-loading='wpMonitorGetKWLine.loading'
            ref="chart"
        ></ve-histogram>
    </div>
</template>

<script>
import 'echarts/lib/component/title'
import { api＿wpMonitorGetKWLine } from '@newEnergyCloud/request/api'
import theme from '../../theme/theme'

export default {
    mixins: [theme],
    data () {
        return {
            isToday: true,
            showTime: null,
            showChartIndex: 0,
            pageTheme: '',
            wpMonitorGetKWLine: api＿wpMonitorGetKWLine({
                later: true
            }),
            chartData: {
                columns: ['时间', '实发功率(KW)', '风速(m/s)'],
                rows: []
            }
        }
    },
    created () {
        this.pageTheme = this.theme.$a
        this.$bus.on('dateChange', this.getTime)
        this.$bus.on('stationChange', this.stationChange)
        this.$bus.on('showChartIndex', this.resizeChart)
        this.$bus.on('switch_theme', this.themeChange)
    },
    methods: {
        resizeChart (i) {
            this.showChartIndex = i
            if (this.showChartIndex !== 0) return
            setTimeout(() => {
                this.$refs.chart && this.$refs.chart.resize()
                if (!this.isToday) this.getChartData()
            }, 0)
        },
        getTime (date) {
            this.showTime = date
            this.isToday = new Date(date).toDateString() === new Date().toDateString()
            this.resizeChart(this.showChartIndex)
        },
        stationChange (data) {
            this.resizeChart(this.showChartIndex)
        },
        themeChange (theme) {
            this.pageTheme = this.theme.$a
            this.resizeChart(this.showChartIndex)
        },
        getChartData () {
            if (this.$store.getters.station_data_type !== 'WP_STATION') return
            this.wpMonitorGetKWLine.getData({
                    queryType: 3,
                    dateType: 3,
                    date: this.showTime
                }).then(res => {
                    this.chartData.rows = []
                    if (!res.body || Object.keys(res.body).length === 0) return
                    let arr1 = []
                    let arr2 = []
                    let arr3 = []
                    res.body.x.forEach(v => {
                        arr1.push({'时间': v})
                    })
                    res.body.real_curve.forEach(v => {
                        arr2.push({'实发功率(KW)': v})
                    })
                    res.body.ws_curve.forEach(v => {
                        arr3.push({'风速(m/s)': v})
                    })
                    res.body.x.forEach((v, i) => {
                        this.chartData.rows.push({...arr1[i], ...arr2[i], ...arr3[i]})
                    })
            })
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
                data: ['实发功率(KW)', '风速(m/s)'],
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
        this.$bus.off('dateChange', this.getTime)
        this.$bus.off('stationChange', this.stationChange)
        this.$bus.off('showChartIndex', this.resizeChart)
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
