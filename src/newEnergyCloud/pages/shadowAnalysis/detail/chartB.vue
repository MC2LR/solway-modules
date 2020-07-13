<template>
    <div class="chart-con">
        <ve-histogram
            :data="chartData"
            :after-config="afterConfig"
            height='100%'
            ref='chart'
            v-loading='pvAnalyzeGetShadowStringLine.loading'
        ></ve-histogram>
    </div>
</template>

<script>
import { api＿pvAnalyzeGetShadowStringLine } from '@newEnergyCloud/request/api'

export default {
    data () {
        return {
            groupStringDetail: {},
            date: [new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd'), new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd')],
            pvAnalyzeGetShadowStringLine: api＿pvAnalyzeGetShadowStringLine({
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
                columns: ['时间', '阴影', '电流偏差率', '辅助'],
                rows: []
            }
        }
    },
    created () {
        this.$bus.on('openGroupDetail', this.opened)
        setTimeout(() => {
            this.$refs.chart.resize()
        }, 0)
    },
    methods: {
        opened (data) {
            this.groupStringDetail = data
            this.getList()
        },
        getList () {
            this.pvAnalyzeGetShadowStringLine.getData({
                startDate: '2017-01-01',
                // endDate: this.groupStringDetail.date[1],
                endDate: new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd'),
                eqId: this.groupStringDetail.eqid,
                stringId: this.groupStringDetail.stringid
                // startDate: '2019-08-06',
                // endDate: '2019-08-30',
                // eqId: 24,
                // stringId: 1
            }).then(res => {
                this.$bus.emit('chartbData', res.body.data)
                // const { dtime, shade_hours: shadeHours, shadowtime } = res.body.data
                const { dtime, streduce, shadowtime } = res.body.data
                let arr1 = []
                let arr2 = []
                let arr3 = []
                let arr4 = []
                this.chartData.rows = []
                dtime.forEach(v => {
                    arr1.push({'时间': v})
                })
                streduce.forEach(v => {
                    arr2.push({'电流偏差率': Number((v * 100).toFixed(2))})
                })
                shadowtime.forEach(v => {
                    let vv = v.split('-')
                    // arr3.push({'阴影': (v && v[1]) ? v[1] : ''})
                    // arr4.push({'辅助': (v && v[0]) ? v[0] : ''})
                    arr3.push({'阴影': Number(vv[1].split(':')[0]) + 1})
                    arr4.push({'辅助': vv[0].split(':')[0]})
                })

                dtime.forEach((v, i) => {
                    this.chartData.rows.push({...arr1[i], ...arr2[i], ...arr3[i], ...arr4[i]})
                })
            })
        },
        afterConfig (options) {
            options.color = ['#2FBFCC', '#5979E9', '#5979E9']

            options.legend = {
                data: ['阴影', '电流偏差率'],
                textStyle: {
                    fontSize: 12,
                    color: '#606369'
                },
                itemWidth: 20,
                itemHeight: 4,
                itemGap: 30,
                top: 10,
                left: 600
            }

            options.tooltip = {
                trigger: 'axis',
                formatter: function (params) {
                    let newParams = params.filter(v => v.seriesName !== '辅助')
                    let assist, str
                    params.forEach(v => {
                        if (v.seriesName === '辅助') assist = v
                    })
                    if (!params.length) return str
                    str = params[0].name + '<br>'
                    // var haveHour = newParams.some(v => v.seriesName === '电流偏差率')
                    newParams.forEach(v => {
                        if (v.seriesName === '阴影') {
                            str += v.seriesName + ' : ' + assist.value + ':00' + '-' + (v.value ? (Number(v.value) - 1) : '-') + ':59' + '<br>'
                        } else {
                            str += v.seriesName + '(%)' + ' : ' + (v.value || '-') + '<br>'
                        }
                    })
                    return str
                }
            }

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

                if (i === 0) {
                    options.yAxis[i].axisLabel = {
                        textStyle: {
                            color: '#5D5D5D'
                        },
                        formatter: (v) => {
                            var str = v + ':00'
                            return str
                        }
                    }
                } else {
                    options.yAxis[i].axisLabel = {
                        textStyle: {
                            color: '#5D5D5D'
                        }
                    }
                }

                options.yAxis[i].nameTextStyle = {
                    color: '#5D5D5D',
                    fontSize: 13
                }
                options.yAxis[i].nameGap = 15
            })
            options.yAxis[0].max = 24
            options.yAxis[0].min = 0
            options.yAxis[0].name = '时刻'
            options.yAxis[1].name = '%'

            options.grid = {
                top: '50',
                bottom: '15',
                left: '15',
                right: '10'
            }
            new Array(3).fill(0).forEach((v, i) => {
                options.series[i].symbol = 'circle'
                options.series[i].symbolSize = '12'
                options.series[i].barWidth = '12'
                options.series[i].type = 'bar'
            })
            options.series[1].type = 'line'
            options.series[1].step = true
            options.series[1].smooth = false
            options.series[1].yAxisIndex = 1

            options.series[2].barGap = '-100%'
            options.series[2].itemStyle = {
                barBorderColor: '#f5fafa',
                color: '#f5fafa'
            }

            return options
        }
    },
    beforeDestroy () {
        this.$bus.off('openGroupDetail', this.opened)
    }
}
</script>

<style lang="scss" scoped>
.chart-con {
    height: 100%;
}
</style>
