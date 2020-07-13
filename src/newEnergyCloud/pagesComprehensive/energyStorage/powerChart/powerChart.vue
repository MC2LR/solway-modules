<template>
    <div class="power-chart" v-loading="(acpline.resNumber === 0) && acpline.loading"></div>
</template>

<script>
// 引入曲线图
import 'echarts/lib/chart/line'
// 引入提示框和标题组件、legend
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'

import { api＿ceDeviceMonitorRtTypeLine } from '@comprehensiveEnergy/request/api'

export default {
    data () {
        return {
            acpline: api＿ceDeviceMonitorRtTypeLine({
                data: {
                    type: 23
                },
                res: {
                    data: {}
                }
            }),
            myChart: null,
            time: null,
            stationDataNull: true
        }
    },
    created () {
        this.$bus.on('stationChange', this.stationChange)
        this.time = setInterval(() => this.acpline.getData(), this.$route.meta.refresh_interval)
        this.acpline.subscribe(this.setOption)
    },
    mounted () {
        this.myChart = this.$echarts.init(this.$el)
        window.addEventListener('resize', this.myChart.resize)
    },
    methods: {
        stationChange () {
            this.stationDataNull = true
            this.acpline.getData()
        },
        setOption (res = {}) {
            this.stationDataNull = false
            this.myChart.setOption({
                tooltip: {trigger: 'axis'},
                legend: {
                    data: ['温度(℃)', 'SOC(%)'],
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
                    data: res.data.time || [],
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
                yAxis: [{
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
                }
                // , {
                //     type: 'value',
                //     axisLine: {
                //         lineStyle: {
                //             color: 'rgba(78, 105, 128, 0.8)',
                //             width: 1
                //         }
                //     },
                //     nameTextStyle: {
                //         color: 'rgba(255, 255, 255, 1)',
                //         fontSize: 16
                //     },
                //     nameGap: 10,
                //     splitLine: {
                //         show: false
                //     },
                //     axisTick: {
                //         show: false
                //     },
                //     axisLabel: {
                //         textStyle: {
                //             color: '#fff'
                //         }
                //     }
                // }
                ],
                series: [
                    {
                        name: '温度(℃)',
                        type: 'line',
                        smooth: true,
                        barWidth: 7,
                        symbol: 'none',
                        data: res.data.store_battery_temp || [],
                        itemStyle: {
                            color: '#DFC551'
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
                                        offset: 0, color: 'rgba(223,197,81, 1)' // 0% 处的颜色
                                    }, {
                                        offset: 0.5, color: 'rgba(223,197,81, 0.36)'
                                    }, {
                                        offset: 1, color: 'rgba(223,197,81, 0)'
                                    }],
                                    globalCoord: false
                                }
                            }
                        }
                    },
                    {
                        name: 'SOC(%)',
                        type: 'line',
                        smooth: true,
                        barWidth: 7,
                        // yAxisIndex: 1,
                        symbol: 'none',
                        data: res.data.store_remain || [],
                        itemStyle: {
                            color: '#DD7F58'
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
                                        offset: 0, color: 'rgba(221,127,88, 1)' // 0% 处的颜色
                                    }, {
                                        offset: 0.5, color: 'rgba(221,127,88, 0.36)'
                                    }, {
                                        offset: 1, color: 'rgba(221,127,88, 0)'
                                    }],
                                    globalCoord: false
                                }
                            }
                        }
                    }
                ],
                grid: {
                    top: '40',
                    left: '18',
                    right: '18',
                    bottom: '10',
                    containLabel: true
                }
            })
        }
    },
    beforeDestroy () {
        this.$bus.on('stationChange', this.stationChange)
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

</style>
