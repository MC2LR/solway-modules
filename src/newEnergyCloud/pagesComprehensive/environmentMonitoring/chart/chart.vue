<template>
    <div class="temperature-chart">
        <div class="temperature-chart-main" ref="temperatureChart" v-loading="ceDeviceMonitorRtTypeLine.loading">

        </div>
    </div>
</template>

<script>
// 引入曲线图
import 'echarts/lib/chart/line'
// 引入提示框和标题组件、legend
import 'echarts/lib/component/tooltip'

import { api＿ceDeviceMonitorRtTypeLine } from '@comprehensiveEnergy/request/api'

export default {
    data () {
        return {
            ceDeviceMonitorRtTypeLine: api＿ceDeviceMonitorRtTypeLine({
                later: true
            }),
            myChart: null,
            time: null
        }
    },
    created () {
        this.$bus.on('stationChange', this.getStatusData)
    },
    mounted () {
        this.myChart = this.$echarts.init(this.$refs.temperatureChart)
        window.addEventListener('resize', this.myChart.resize)

        this.time = setInterval(() => {
            this.ceDeviceMonitorRtTypeLine.getData({type: 27})
        }, this.$route.meta.refresh_interval)

        this.ceDeviceMonitorRtTypeLine.getData({type: 27})
        this.ceDeviceMonitorRtTypeLine.subscribe(res => {
            res.data = res.data || {}
            this.myChart.setOption({
                tooltip: {trigger: 'axis'},
                xAxis: {
                    name: '时间',
                    data: res.data.time || [],
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(78, 105, 128, .8)',
                            width: 1
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, .5)'
                        }
                    },
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 1)',
                        fontSize: 16
                    },
                    nameGap: 10,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    name: '温度℃',
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(78, 105, 128, .8)',
                            width: 1
                        }
                    },
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 1)',
                        fontSize: 16
                    },
                    nameGap: 10,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, .5)'
                        }
                    }
                },
                series: [{
                    name: '温度',
                    type: 'line',
                    smooth: true,
                    barWidth: 7,
                    symbol: 'none',
                    data: res.data.droom_tmp || [],
                    itemStyle: {
                        color: '#43B8DC'
                    },
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: {
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(67, 184, 220, 1)' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: 'rgba(67, 184, 220, 0.36)'
                                }, {
                                    offset: 1, color: 'rgba(67, 184, 220, 0)'
                                }],
                                globalCoord: false
                            }
                        }
                    }
                }],
                grid: {
                    top: '45',
                    left: '27',
                    right: '60',
                    bottom: '10',
                    containLabel: true
                }
            })
        })
    },
    methods: {
        getStatusData () {
            this.ceDeviceMonitorRtTypeLine.getData({type: 27})
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.getStatusData)
        clearInterval(this.time)
        window.removeEventListener('resize', this.myChart.resize)
        if (this.myChart && !this.myChart.isDisposed()) {
            this.myChart.clear()
            this.myChart.dispose()
            this.myChart = null
        }
    }
}
</script>

<style lang="scss" scoped>
.temperature-chart {
    margin-top: 10px;
    height: calc(100% - 175px);
    @include c(background-color, #0E3D77);
    .temperature-chart-main {
        height: 100%;
    }
}
</style>
