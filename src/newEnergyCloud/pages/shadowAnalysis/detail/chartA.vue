<template>
    <div class="electric-chart">
        <ve-histogram
            :after-config="afterConfig"
            :after-set-option='afterSetOption'
            height='100%'
            ref='chart'
            v-loading='pvAnalyzeGetDeviceAMin.loading'
        ></ve-histogram>
    </div>
</template>

<script>
import { api＿pvAnalyzeGetDeviceAMin } from '@newEnergyCloud/request/api'

export default {
    data () {
        return {
            stId: null,
            date: new Date(Date.now() - 86400000).Format('yyyy-MM-dd'),
            $echarts: null,
            groupStringDetail: {},
            pvAnalyzeGetDeviceAMin: api＿pvAnalyzeGetDeviceAMin({
                later: true,
                res: {
                    body: {
                        data: {},
                        names: {},
                        units: {}
                    }
                }
            }),
            chartData: {
                // columns: ['时间', '本期', '同期', '辐射量'],
                // rows: [
                //     { '时间': '1/1', '本期': 1393, '同期': 1093, '辐射量': 0.32 },
                //     { '时间': '1/2', '本期': 3530, '同期': 3230, '辐射量': 0.26 },
                //     { '时间': '1/3', '本期': 2923, '同期': 2623, '辐射量': 0.76 },
                //     { '时间': '1/4', '本期': 1723, '同期': 1423, '辐射量': 0.49 },
                //     { '时间': '1/5', '本期': 3792, '同期': 3492, '辐射量': 0.323 },
                //     { '时间': '1/6', '本期': 4593, '同期': 4293, '辐射量': 0.78 }
                // ]
                columns: [],
                rows: []
            }
        }
    },
    created () {
        this.$bus.on('stationChange', this.stationChange)
        this.$bus.on('openGroupDetail', this.opened)
        this.$bus.on('singleDateChange', this.dateChange)
        setTimeout(() => {
            this.$refs.chart.resize()
        }, 0)
        this.stId = this.$store.getters.station_id
        this.stationChange()
    },
    methods: {
        stationChange (data) {
            this.stId = data ? data.id : this.$store.getters.station_id
        },
        dateChange (date) {
            this.date = date
            this.getList()
        },
        opened (data) {
            this.groupStringDetail = data
            this.getList()
        },
        getList () {
            this.pvAnalyzeGetDeviceAMin.getData({
                date: this.date,
                stId: this.stId,
                eqId: this.groupStringDetail.eqid,
                deviceType: this.groupStringDetail.devicetype
                // date: '2020-02-23',
                // stId: 3002,
                // eqId: 88
            }).then(res => {
                let seriesArr = []
                let numArr = []
                let color = []
                delete res.body.strm_curve
                Object.keys(res.body).forEach(v => {
                    if (v !== 'x') {
                        let num = v.split('_')[0].substr(1)
                        numArr.push(Number(num))
                    }
                })
                numArr.sort((a, b) => a - b)
                color = new Array(numArr.length).fill('#6CD8EF')
                const that = this
                let index = numArr.indexOf(that.groupStringDetail.stringid)
                color[index] = '#0072FF'

                numArr.forEach((v, i) => {
                    seriesArr.push({
                        z: i === index ? 3 : 2,
                        name: '组串' + v,
                        type: 'line',
                        symbolSize: 2,
                        data: res.body[`c${v}_curve`] || [],
                        label: {
                            normal: {
                                show: false
                            }
                        }
                    })
                })

                this.$echarts.setOption({
                    color: color,
                    // legend: {
                    //     show: true
                    // },
                    tooltip: {
                        show: true,
                        trigger: 'axis',
                        confine: true,
                        textStyle: {
                            align: 'left'
                        }
                    },
                    xAxis: [
                        {
                            data: res.body.x,
                            axisLabel: {
                                textStyle: {
                                    color: '#5D5D5D'
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(197,201,206, 0.4)',
                                    width: 1
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(197,201,206, 0.4)',
                                    width: 1
                                }
                            },
                            splitLine: {
                                show: false
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#5D5D5D'
                                }
                            },
                            name: '电流',
                            nameTextStyle: {
                                color: '#5D5D5D',
                                fontSize: 13
                            },
                            nameGap: 25
                        }

                    ],
                    series: seriesArr
                }, true)
            })
        },
        afterConfig (options) {
            options.legend.show = false

            options.xAxis[0].axisLabel = {
                textStyle: {
                    color: '#5D5D5D'
                }
            }
            options.xAxis[0].axisLine = {
                show: true,
                lineStyle: {
                    color: 'rgba(197,201,206, 0.4)',
                    width: 1
                }
            }

            new Array(1).fill(0).forEach((v, i) => {
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
                        color: '#5D5D5D'
                    }
                }
                options.yAxis[i].nameTextStyle = {
                    color: '#5D5D5D',
                    fontSize: 13
                }
                options.yAxis[i].nameGap = 25
            })
            options.yAxis[0].name = '电流'

            options.grid = {
                top: '40',
                bottom: '15',
                left: '10',
                right: '10'
            }
            options.tooltip.confine = true
            options.tooltip.textStyle = {
                align: 'left'
            }

            // if (options.series && options.series.length) {
            //     new Array(20).fill(0).forEach((v, i) => {
            //         options.series[i].symbol = 'none'
            //         options.series[i].type = 'line'
            //     })
            // }

            return options
        },
        afterSetOption ($echarts) {
            this.$echarts = $echarts
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.stationChange)
        this.$bus.off('openGroupDetail', this.opened)
        this.$bus.off('singleDateChange', this.dateChange)
    }
}
</script>

<style lang="scss" scoped>
.chart-con {
    height: 100%;
}
</style>
