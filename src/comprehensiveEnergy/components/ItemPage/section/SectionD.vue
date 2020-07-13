<template>
    <div class="section section-d">
        <div class="section-d-main" ref="sectiond" v-loading="query.loading">

        </div>
    </div>
</template>

<script>
// 引入饼图
import 'echarts/lib/chart/pie'
// 引入提示框和标题组件、legend
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import { api＿queryStationUseKwhRateMonth } from '@comprehensiveEnergy/request/api'

export default {
    data () {
        return {
            query: api＿queryStationUseKwhRateMonth({
                later: true
             }),
            myChart: null
        }
    },
    mounted () {
        this.myChart = this.$echarts.init(this.$refs.sectiond)
        const chartResize = this.myChart.resize
        this.myChart.resize = () => setTimeout(chartResize, 1000)
        window.addEventListener('resize', this.myChart.resize)
        setTimeout(this.myChart.resize, 300)

        this.query.getData({
                // queryCode: 'query_ce_station_use_kwh_rate_month',
                // queryType: 3,
                date: new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1))})
        .then(res => {
            var arr = []
            delete res.body.data.dtime
            delete res.body.names.dtime
            Object.keys(res.body.data).forEach(v => {
                if (v !== 'other_kwh_r') {
                    arr.push({
                        name: res.body.names[v].substr(0, 2),
                        value: res.body.data[v]
                    })
                }
            })
            arr.push({
                name: '其他',
                value: res.body.data['other_kwh_r'] || '-'
            })
            if (Object.keys(res.body.data).length === 0) arr = []

            this.myChart.setOption({
                title: {
                    text: '本月用电量构成',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: '12',
                        color: '#fff'
                    },
                    top: 5,
                    left: 10
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    icon: 'circle',
                    orient: 'vertical',
                    right: '25',
                    y: 'center',
                    data: arr.map(v => v.name),
                    textStyle: {
                        color: '#fff',
                        fontSize: 12
                    },
                    formatter: function (name) {
                        var total = 0
                        var tarValue = 0
                        arr.forEach((v, i) => {
                            total += v.value
                            if (arr[i].name === name) {
                                tarValue = arr[i].value
                            }
                        })
                        var p = parseFloat((tarValue / total * 100).toFixed(2))
                        return name + ' ' + ' ' + p + '%'
                    }
                },
                series: [
                    {
                        name: '本月用电量构成',
                        type: 'pie',
                        radius: ['30%', '65%'],
                        center: ['25%', '60%'],
                        avoidLabelOverlap: false,
                        roseType: 'radius',
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '12',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: arr,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                            normal: {
                                color: function (params) {
                                    var colorList = [
                                        '#1B9CF6', 'rgb(255, 182, 66)', 'rgb(131, 98, 234)', 'rgb(255, 103, 101)'
                                    ]
                                    return colorList[params.dataIndex]
                                    }
                            }
                        }
                    }
                ]
            })
        })
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
.section-d {
 .section-d-main {
     height: 100%;
 }
}
</style>
