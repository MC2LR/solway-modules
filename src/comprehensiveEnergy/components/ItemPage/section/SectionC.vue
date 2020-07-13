<template>
    <div class="section section-c">
        <div class="section-c-main" ref="sectionc" v-loading="acpline.resNumber === 0 && acpline.loading">

        </div>
    </div>
</template>

<script>
// 引入柱状图
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import { api＿acpline } from '@comprehensiveEnergy/request/api'

export default {
    data () {
        return {
            acpline: api＿acpline({}),
            myChart: null,
            time: null
        }
    },
    mounted () {
        this.myChart = this.$echarts.init(this.$refs.sectionc)
        const chartResize = this.myChart.resize
        this.myChart.resize = () => setTimeout(chartResize, 800)
        window.addEventListener('resize', this.myChart.resize)
        setTimeout(this.myChart.resize, 300)

        this.time = setInterval(() => {
            this.acpline.getData()
        }, this.$store.state.second.dataInterval)

        this.acpline.subscribe(res => {
            res.data = res.data || {}
            this.myChart.setOption({
                title: {
                    text: '今日负荷曲线',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: '12',
                        color: '#fff'
                    },
                    top: 5,
                    left: 10
                },
                tooltip: {trigger: 'axis'},
                xAxis: {
                    name: '时间',
                    data: res.data.time || [],
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0, 130, 173, 0.5)',
                            width: 1
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    },
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: 12
                    },
                    nameGap: 5,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    name: 'kW',
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0, 130, 173, 0.5)',
                            width: 1
                        }
                    },
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: 12
                    },
                    nameGap: 5,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        formatter: function () {
                            return ''
                        },
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                series: [{
                    name: '负荷',
                    type: 'line',
                    smooth: true,
                    barWidth: 7,
                    symbol: 'none',
                    data: res.data.acp || [],
                    itemStyle: {
                        normal: {
                            color: '#21D749'
                        }
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
                                    offset: 0, color: 'rgba(33, 215, 73, 1)' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: 'rgba(33, 215, 73, 0.36)'
                                }, {
                                    offset: 1, color: 'rgba(33, 215, 73, 0)'
                                }],
                                globalCoord: false
                            }
                        }
                    }
                }],
                grid: {
                    top: '45',
                    left: '12',
                    right: '40',
                    bottom: '7',
                    containLabel: true
                }
            })
        })
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.myChart.resize)
        clearInterval(this.time)
        if (this.myChart && !this.myChart.isDisposed()) {
            this.myChart.clear()
            this.myChart.dispose()
            this.myChart = null
        }
    }
}
</script>

<style lang="scss" scoped>
.section-c {
 .section-c-main {
     height: 100%;
 }
}
</style>
