<template>
    <div class="section section-b">
        <div class="section-b-main" ref="sectionb" v-loading="query.loading"></div>
    </div>
</template>

<script>
// 引入柱状图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import { api＿queryStationDeviceType25Days } from '@comprehensiveEnergy/request/api'

export default {
    data () {
        return {
            perDayStr: 86400000,
            query: api＿queryStationDeviceType25Days({
                later: true
             }),
             myChart: null
        }
    },
    mounted () {
        this.myChart = this.$echarts.init(this.$refs.sectionb)
        const chartResize = this.myChart.resize
        this.myChart.resize = () => setTimeout(chartResize, 600)
        window.addEventListener('resize', this.myChart.resize)
        setTimeout(this.myChart.resize, 300)

        let today = new Date()
        let lastDay = this.formatDate(new Date(today.getTime() - this.perDayStr))
        let lastWeek = this.formatDate(new Date(new Date(lastDay).getTime() - this.perDayStr * 6))

        this.query.getData({
                // queryCode: 'query_ce_station_device_type_25_load_days_timeline',
                // queryType: 3,
                end_date: lastDay,
                start_date: lastWeek
                })
        .then(res => {
            this.myChart.setOption({
                title: {
                    text: '最近7天变压器负载',
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
                    name: '日期',
                    data: res.body.data.dtime ? res.body.data.dtime.map(v => v.split('-')[2]) : [],
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
                    name: '%',
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
                        }
                    }
                },
                series: [{
                    name: '负载',
                    type: 'bar',
                    barWidth: 7,
                    data: res.body.data.load || [],
                    itemStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(255,141,28,1)'
                            }, {
                            offset: 1,
                            color: 'rgba(255,141,28, .3)'
                            }])
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
    methods: {
        formatDate (strTime) {
            let date = new Date(strTime)
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        }
    },
    beforeDestroy () {
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
.section-b {
 .section-b-main {
     height: 100%;
 }
}
</style>
