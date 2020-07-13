<template>
    <div class="clean-result">
        <div class="text-right" v-if="getDustCleanLine.res.body">洗后一周累计提升发电量<span>{{getDustCleanLine.res.body.promote_power}}kWh</span></div>
        <div class="chart-con" v-if="chartData.rows">
            <ve-line :data="chartData" :settings="chartSettings" :after-config="afterConfig" height="100%"></ve-line>
        </div>
    </div>
</template>

<script>
import {api＿getDustCleanLine} from '@newEnergyCloud/request/api'
export default {
    props: {
        detail: {
            type: Object
        }
    },
    data () {
        return {
            chartSettings: {
                area: true
            },
            chartData: {},
            getDustCleanLine: api＿getDustCleanLine({
                later: true
            })
        }
    },
    methods: {
        getData () {
            this.getDustCleanLine.getData({startDate: this.detail.start_date, endDate: this.detail.end_date}).then(res => {
                this.data = res.body.result.data
                this.drawGraph()
            })
        },
        drawGraph () {
            let rows = []
            this.data.dtime.map((v, i) => {
                rows.push({
                    '日期': v,
                    '清洁指数': this.data['clean_mark'][i]
                })
            })
            this.chartData = {
                columns: ['日期', '清洁指数'],
                rows
            }
        },
        afterConfig (options) {
            let startDate = this.detail.start_date
            let endDate = this.detail.end_date
            let indexStart = this.data.dtime.indexOf(startDate)
            let indexEnd = this.data.dtime.indexOf(endDate)
            // 开始清洗时，清洁指数值
            let startCleanmark = this.data.clean_mark[indexStart]
            let endCleanmark = this.data.clean_mark[indexEnd]
            options.xAxis[0].axisLine = {
                show: true,
                lineStyle: {
                    color: 'rgba(110, 110,110,0.5)',
                    width: 1
                }
            }
            options.yAxis[0].splitLine = {
                show: false
            }
            options.yAxis[0].axisLine = {
                show: true,
                lineStyle: {
                    color: 'rgba(110, 110,110,0.5)',
                    width: 1
                }
            }
            if (startDate === endDate) {
                options.series[0].markLine = {
                    lineStyle: {
                        color: 'orange',
                        type: 'solid'
                    },
                    data: [
                        [{
                            yAxis: startCleanmark,
                            xAxis: startDate
                        }, {
                            yAxis: startCleanmark,
                            xAxis: this.data.dtime[this.data.dtime.length - 1]
                        }],
                        [{
                            symbol: 'line',
                            lineStyle: {
                                color: 'rgba(169,169,169,1)'
                            },
                            label: {
                                formatter: '清洗开始--结束',
                                position: 'end'
                            },
                            coord: [startDate, 0]
                        }, {
                            symbol: 'line',
                            coord: [startDate, startCleanmark]
                        }]
                    ]
                }
            } else {
                options.series[0].markLine = {
                    lineStyle: {
                        color: 'orange',
                        type: 'solid'
                    },
                    data: [
                        [{
                            yAxis: startCleanmark,
                            xAxis: startDate
                        }, {
                            yAxis: startCleanmark,
                            xAxis: this.data.dtime[this.data.dtime.length - 1]
                        }],
                        [{
                            symbol: 'line',
                            lineStyle: {
                                color: 'rgba(169,169,169,1)'
                            },
                            label: {
                                formatter: '清洗开始',
                                position: 'end'
                            },
                            coord: [startDate, 0]
                        }, {
                            symbol: 'line',
                            coord: [startDate, startCleanmark]
                        }],
                        [{
                            symbol: 'line',
                            lineStyle: {
                                color: 'rgba(169,169,169,1)'
                            },
                            label: {
                                formatter: '清洗结束',
                                position: 'end'
                            },
                            coord: [endDate, 0]
                        }, {
                            symbol: 'line',
                            coord: [endDate, endCleanmark]
                        }]
                    ]
                }
            }
            return options
        }
    },
    created () {
        this.$bus.on('cleanResultEmit', this.getData)
    },
    beforeDestroy () {
        this.$bus.off('cleanResultEmit', this.getData)
    }
}
</script>

<style lang="scss" scoped>
.clean-result {
    .chart-con{
        height: 400px;
    }
}
</style>
