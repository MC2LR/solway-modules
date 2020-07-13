<template>
    <ve-histogram v-loading="queryCompanyMonthElecDetailTimelistHis.loading" :data="chartData" :extend="chartExtend" height="100%"></ve-histogram>
</template>

<script>
import {api＿queryCompanyMonthElecDetailTimelistHis} from '@/request/henanApi'
export default {
    data () {
        return {
            queryCompanyMonthElecDetailTimelistHis: api＿queryCompanyMonthElecDetailTimelistHis({
                later: true,
                data: {
                    queryType: 1
                }
            }).subscribe(res => this.queryCompanyMonthElecDetailTimelistHisResult(res)),
            chartData: {
                columns: ['日期', '发电量（千瓦时）'],
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
                    name: '　　　　　发电量（千瓦时）',
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
                        color: 'rgba(60,199,219,0.1)',
                        borderColor: 'rgba(60,199,219,1)',
                        borderWidth: 1
                    }
                }
            }
        }
    },
    created () {
        this.$nextTick(() => this.getData())
        this.$bus.on(this.$route.name + 'StationChange', this.getData)
    },
    computed: {
        stid () {
            return this.$store.state.userActionRecord[this.$route.name + '_selectedStid']
        }
    },
    methods: {
        getData () {
            this.queryCompanyMonthElecDetailTimelistHis.getData({
                queryType: this.stid ? 3 : 1,
                stid: this.stid || void 0
            })
        },
        queryCompanyMonthElecDetailTimelistHisResult (res) {
            this.chartData.rows = res.body.data?.map((v, i) => ({
                '日期': v.dtime,
                '发电量（千瓦时）': Math.floor(v.real_kwh_chk)
            })) || []
        }
    },
    beforeDestroy () {
        this.$bus.off(this.$route.name + 'StationChange', this.getData)
    }
}
</script>
