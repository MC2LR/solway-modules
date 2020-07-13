<template>
    <ve-histogram
        v-loading="getRunKWPowerRanking.loading && !getRunKWPowerRanking.resNumber"
        :events="chartEvents"
        :data="chartData"
        :extend="chartExtend"
        height="100%"></ve-histogram>
</template>

<script>
import {api＿getRunKWPowerRanking} from '@/request/henanApi'
export default {
    data () {
        this.chartEvents = {
            click: this.chartClick
        }
        return {
            getRunKWPowerRanking: api＿getRunKWPowerRanking({
                data: {
                    fd: 'real_kwh',
                    n: 10,
                    queryType: 1,
                    dateType: 3,
                    date: new Date().Format('yyyy-MM-dd')
                }
            }).subscribe(res => this.getRunKWPowerRankingResult(res)),
            chartData: {
                columns: ['电站', '发电量（千瓦时）'],
                rows: []
            },
            chartExtend: {
                legend: {
                    show: false
                },
                textStyle: {
                    color: '#28C2DD'
                },
                grid: {
                    top: 65,
                    bottom: 10
                },
                xAxis: {
                    show: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(39, 79, 133, 1)'
                        }
                    }
                },
                'yAxis.0': {
                    name: '　　发电量（千瓦时）',
                    show: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(39, 79, 133, 1)',
                            width: 1
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: {
                    barWidth: 7,
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(60,199,219,1)' },
                                { offset: 1, color: 'rgba(60,199,219,0)' }
                            ]
                        }
                    }
                }
            }
        }
    },
    created () {
        this.$bus.on('stationChange', this.getData)
        this.timer = setInterval(() => this.getData(), this.$route.meta.refresh_interval)
    },
    methods: {
        getData () {
            this.getRunKWPowerRanking.getData()
        },
        chartClick (e) {
            const stid = this.getRunKWPowerRanking.res.body.z[e.dataIndex]
            this.$store.dispatch('userActionRecord/setState', {key: this.$route.name + '_selectedStid', value: stid})
            this.$bus.emit(this.$route.name + 'StationChange')
        },
        getRunKWPowerRankingResult (res) {
            this.chartData.rows = res.body.x.map((v, i) => ({
                '电站': v,
                '发电量（千瓦时）': Math.floor(res.body.y[i])
            }))
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.getData)
        clearInterval(this.timer)
    }
}
</script>

<style>

</style>
