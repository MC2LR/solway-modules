<template>
    <div class="power-chart" v-loading="acpline.loading"></div>
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
            acpline: api＿ceDeviceMonitorRtTypeLine({
                data: {
                    type: 26,
                    date: this.$store.getters['stationMonitoring/dateStr']
                },
                res: {
                    data: {}
                }
            }),
            myChart: null,
            time: null
        }
    },
    created () {
        this.time = setInterval(() => this.acpline.getData(), this.$store.state.second.dataInterval)
        this.acpline.subscribe(this.setOption)
        this.$bus.on('dateChange', this.getData)
    },
    mounted () {
        this.myChart = this.$echarts.init(this.$el)
        window.addEventListener('resize', this.myChart.resize)
    },
    methods: {
        getData () {
            if (this.isToday) return
            this.myChart && this.myChart.clear()
            this.acpline.getData({date: this.dateStr})
        },
        setOption (res = {}) {
            this.myChart.setOption({
                tooltip: {trigger: 'axis'},
                xAxis: {
                    name: '时间',
                    data: res.data.x || [],
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
                    name: '功率kW',
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(78, 105, 128, 0.8)',
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
                            color: '#fff'
                        }
                    }
                },
                series: [{
                    name: '功率',
                    type: 'line',
                    smooth: true,
                    barWidth: 7,
                    symbol: 'none',
                    data: res.data.car_p_curve || [],
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
        }
    },
    computed: {
        isToday () {
            return this.$store.getters['stationMonitoring/isToday']
        },
        dateStr () {
            return this.$store.getters['stationMonitoring/dateStr']
        }
    },
    beforeDestroy () {
        clearInterval(this.time)
        this.$bus.off('dateChange', this.getData)
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

</style>
