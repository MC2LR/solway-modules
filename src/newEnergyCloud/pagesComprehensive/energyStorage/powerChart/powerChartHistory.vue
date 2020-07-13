<template>
    <div class="power-chart" v-loading="acpline.loading"></div>
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
                    type: 23,
                    date: new Date(this.$store.state.userActionRecord.comprehensive_date).Format('yyyy-MM-dd')
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
        this.acpline.subscribe(this.setOption)
        this.$bus.on('dateChange', this.getData)
        this.$bus.on('stationChange', this.getData)
    },
    mounted () {
        this.myChart = this.$echarts.init(this.$el)
        window.addEventListener('resize', this.myChart.resize)
    },
    methods: {
        // stationChange () {
        //     this.myChart && this.myChart.clear()
        //     this.acpline.getData({date: this.dateStr})
        // },
        getData () {
            if (this.isToday) return
            this.myChart && this.myChart.clear()
            this.acpline.getData({date: this.dateStr})
        },
        setOption (res = {}) {
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
                        // yAxisIndex: 1,
                        symbol: 'none',
                        data: res.data.store_tmp_curve || [],
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
                        symbol: 'none',
                        data: res.data.store_remain_curve || [],
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
                    top: '45',
                    left: '27',
                    right: '18',
                    bottom: '10',
                    containLabel: true
                }
            })
        }
    },
    computed: {
        isToday () {
            return this.dateStr === new Date().Format('yyyy-MM-dd')
        },
        dateStr () {
            return new Date(this.$store.state.userActionRecord.comprehensive_date).Format('yyyy-MM-dd')
        }
    },
    beforeDestroy () {
        clearInterval(this.time)
        this.$bus.off('dateChange', this.getData)
        this.$bus.off('stationChange', this.getData)
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
