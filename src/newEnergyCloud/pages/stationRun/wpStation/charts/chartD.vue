<template>
    <div class="wrap">
        <ve-histogram
            :data="chartData"
            :after-config="afterConfig"
            :data-zoom="dataZoom"
            :extend="chartExtend"
            height='100%'
            ref='chart'
            v-loading='queryWpAccumElecTimelistV201.loading'
        ></ve-histogram>
        <el-select
        v-model="legendIndex"
        class="legendChange"
        placeholder="请选择"
        @change="changeLegend"
        >
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/title'
import { api＿queryWpAccumElecTimelistV201 } from '@newEnergyCloud/request/api'
import theme from '../../theme/theme'

export default {
    mixins: [theme],
    data () {
        return {
            showTime: new Date().Format('yyyy-MM-dd'),
            tabIndex: 0,
            showChartIndex: 0,
            legendIndex: 0,
            pageTheme: '',
            options: [
                {
                    value: 0,
                    label: '风速'
                },
                {
                    value: 1,
                    label: '完成率'
                }
            ],
            chartExtend: {},
            queryWpAccumElecTimelistV201: api＿queryWpAccumElecTimelistV201({
                later: true,
                res: {
                    body: {
                        data: [],
                        names: {},
                        units: {}
                    }
                }
            }),
            dataZoom: [
                 {
                    type: 'slider',
                    start: 0,
                    end: 100,
                    show: true,
                    handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '110%',
                    height: 10,
                    bottom: 0,
                    borderColor: 'rgba(0, 0, 0, .6)',
                    fillerColor: '#269cdb',
                    borderRadius: 5,
                    backgroundColor: 'rgba(51, 56, 75, .1)', // 两边未选中的滑动条区域的颜色
                    showDataShadow: false,
                    showDetail: false
                }
            ],
            chartData: {
                columns: ['时间', '本期电量', '风速'],
                rows: []
            }
        }
    },
    created () {
        this.pageTheme = this.theme.$a
        this.$bus.on('dateChange', this.getTime)
        this.$bus.on('showChartIndex', this.resizeChart)
        this.$bus.on('tabsYear', this.getTabs)
        this.$bus.on('stationChange', this.stationChange)
        this.$bus.on('switch_theme', this.themeChange)
    },
    methods: {
        resizeChart (i) {
            this.showChartIndex = i
            if (this.showChartIndex !== 3 || this.tabIndex !== 0) return
            setTimeout(() => {
                this.getChartData()
                this.$refs.chart.resize()
            }, 0)
        },
        stationChange (data) {
            this.resizeChart(this.showChartIndex)
        },
        changeLegend () {
            this.chartData.rows = []
            const { data } = this.queryWpAccumElecTimelistV201.res.body
            if (this.legendIndex === 1) {
                data.forEach(v => {
                    this.chartData.rows.push({'时间': v.dtime, '本期电量': v.real_kwh, '完成率': v.finish_r})
                })
                this.chartData.columns = ['时间', '本期电量', '完成率']
                this.chartExtend = {
                    yAxis (v, i) {
                        v.forEach((vv, ii) => {
                            vv.axisLine = {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(197,201,206, 0.4)',
                                    width: 1
                                }
                            }
                            vv.splitLine = {
                                show: false
                            }
                            vv.axisLabel = {
                                textStyle: {
                                    color: 'rgba(96,99,105,0.8)'
                                }
                            }
                            vv.nameTextStyle = {
                                color: 'rgba(96,99,105,0.8)',
                                fontSize: 13
                            }
                            vv.nameGap = 25
                            if (ii === 0) vv.name = '电量'
                            else vv.name = '完成率(%)'
                        })
                        return v
                    }
                }
            } else {
                data.forEach(v => {
                    this.chartData.rows.push({'时间': v.dtime, '本期电量': v.real_kwh, '风速': v.ws_avg})
                })
                this.chartData.columns = ['时间', '本期电量', '风速']
                this.chartExtend = {
                    yAxis (v, i) {
                        v.forEach((vv, ii) => {
                            vv.axisLine = {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(197,201,206, 0.4)',
                                    width: 1
                                }
                            }
                            vv.splitLine = {
                                show: false
                            }
                            vv.axisLabel = {
                                textStyle: {
                                    color: 'rgba(96,99,105,0.8)'
                                }
                            }
                            vv.nameTextStyle = {
                                color: 'rgba(96,99,105,0.8)',
                                fontSize: 13
                            }
                            vv.nameGap = 25
                            if (ii === 0) vv.name = '电量'
                            else vv.name = '风速(m/s)'
                        })
                        return v
                    }
                }
            }
        },
        getTabs (i) {
            this.tabIndex = i
            this.resizeChart(this.showChartIndex)
        },
        getTime (date) {
            this.showTime = date
            this.resizeChart(this.showChartIndex)
        },
        themeChange (theme) {
            this.pageTheme = this.theme.$a
            this.resizeChart(this.showChartIndex)
        },
        getChartData () {
            if (this.$store.getters.station_data_type !== 'WP_STATION') return
            this.queryWpAccumElecTimelistV201.getData({
                    date: this.showTime
                }).then(res => {
                    this.chartData.rows = []
                    if (!res.body || Object.keys(res.body).length === 0) return
                    this.changeLegend()
            })
        },
        afterConfig (options) {
            options.title = {
                text: '年发电量',
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: '16',
                    color: this.theme.$sectionWaterColor
                },
                top: 10,
                left: 18
            }
            options.color = ['#2FBFCC', '#FC926E', '#2FBFCC']
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
                options.yAxis[i].nameTextStyle = {
                    color: this.theme.$axisTextColor,
                    fontSize: 13
                }
                options.yAxis[i].nameGap = 25
            })
            options.yAxis[0].name = '电量(度)'

            options.legend = {
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
                top: '95',
                bottom: '15',
                left: '3%',
                right: '3%'
            }
            new Array(2).fill(0).forEach((v, i) => {
                options.series[i].symbol = 'none'
                options.series[i].type = 'bar'
                options.series[i].barWidth = 13
            })

            options.series[1].type = 'line'
            options.series[1].yAxisIndex = 1
            return options
        }
    },
    beforeDestroy () {
        this.$bus.off('dateChange', this.getTime)
        this.$bus.off('showChartIndex', this.resizeChart)
        this.$bus.off('tabsYear', this.getTabs)
        this.$bus.off('stationChange', this.stationChange)
        this.$bus.off('switch_theme', this.themeChange)
    }
}
</script>

<style lang="scss">
[data-pagetheme="light"] {
    .legendChange {
        .el-input__inner {
            border: 0px solid #fff;
            padding-right: 10px;
            padding-left: 0;
            font-size: 12px;
        }
        .el-input__suffix {
            right: 15px;
        }
    }
}

[data-pagetheme="darkBlue"] {
    .legendChange {
        .el-input__inner {
            border: 0px solid #fff;
            padding-right: 10px;
            padding-left: 0;
            font-size: 12px;
            background: #0E3D77;
            color: #fff;
        }
        .el-input__suffix {
            right: 15px;
        }
    }
}

[data-pagetheme="dark"] {
    .legendChange {
        .el-input__inner {
            border: 0px solid #fff;
            padding-right: 10px;
            padding-left: 0;
            font-size: 12px;
            background: rgb(20, 36, 62);
            color: #2CAFBD;
        }
        .el-input__suffix {
            right: 15px;
        }
    }
}
</style>

<style lang="scss" scoped>
@import '../../theme/theme.scss';

.wrap {
    width: 100%;
    height: 100%;
    // background: #fff;
    @include page_c(background-color, $pageSectionBgColor);
    position: relative;
    .legendChange {
        position: absolute;
        left: 408px;
        top: 3px;
        width: 80px;
    }
}
</style>
