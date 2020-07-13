<template>
    <div class="center-con">
        <div class="clearfix" style="height: 85%;">
            <div class="chart-con">
                <ve-gauge
                    :data="chartData1"
                    height='100%'
                    :settings="chartSettings1"
                ></ve-gauge>
            </div>
            <div class="chart-con">
                <ve-gauge
                    :data="chartData2"
                    height='100%'
                    :settings="chartSettings2"
                ></ve-gauge>
            </div>
        </div>
        <div class="bottom clearfix" v-if="acpStatusInfo && acpInfo">
            <div class="item item1" v-if="$store.getters.station_type !== 0">
                <span>电站数量</span>
                <span class="num">{{acpInfo.st_count}} <span class="unit-small">个</span></span>
            </div>
            <div class="item item1" v-if="$store.getters.station_type === 0">
                <span>逆变器数量</span>
                <span class="num">{{acpStatusInfo.status_count}} <span class="unit-small">个</span></span>
            </div>
            <div class="item item2" v-if="acpInfo.inst_kw">
                <span>装机容量</span>
                <span class="num">{{acpInfo.inst_kw[0]}} <span class="unit-small">{{acpInfo.inst_kw[1]}}</span></span>
            </div>
            <div class="item item3" v-if="acpInfo.real_kwh_chk">
                <span>今日发电量</span>
                <span class="num">{{acpInfo.real_kwh_chk[0]}} <span class="unit-small">{{acpInfo.real_kwh_chk[1]}}</span></span>
            </div>
        </div>
    </div>
</template>

<script>
import { api＿getRunAcpStatus } from '@/request/henanApi'

export default {
    data () {
        return {
            getRunAcpStatus: api＿getRunAcpStatus({
                later: true,
                onlyLatest: true
            }),
            acpStatusInfo: {},
            acpInfo: {},
            chartData1: {
                columns: ['type', 'value'],
                rows: []
            },
            chartData2: {
                columns: ['type', 'value'],
                rows: []
            },
            intervalMonitorCenter: null,
            chartSettings1: {
                dataName: {
                    '出力系数': '%'
                },
                seriesMap: {
                    '出力系数': {
                        min: 0,
                        max: 100,
                        radius: '85%',
                        axisLine: {
                            lineStyle: {
                                color: [[1, 'rgb(99, 188, 213)']],
                                width: 15
                            }
                        },
                        axisLabel: {
                            margin: 100,
                            textStyle: {
                                color: 'rgba(255, 255, 255, .8)',
                                fontSize: 12
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            length: 15,
                            lineStyle: {
                                width: 1,
                                color: '#fff'
                            }
                        },
                        pointer: {
                            width: 3
                        },
                        itemStyle: {
                            color: '#FFB83E'
                        },
                        detail: {
                            fontSize: 12,
                            lineHeight: 18,
                            offsetCenter: [-2, '78%'],
                            formatter: function (value) {
                                return (value || value === 0) ? ('出力系数' + '\n' + value + '%') : '-%'
                            }
                        }
                    }
                }
            },
            chartSettings2: {
                dataName: {
                    '系统效率': '%'
                },
                seriesMap: {
                    '系统效率': {
                        min: 0,
                        max: 100,
                        radius: '85%',
                        axisLine: {
                            lineStyle: {
                                color: [[1, 'rgb(99, 188, 213)']],
                                width: 15
                            }
                        },
                        axisLabel: {
                            margin: 100,
                            textStyle: {
                                color: 'rgba(255, 255, 255, .8)',
                                fontSize: 12
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            length: 15,
                            lineStyle: {
                                width: 1,
                                color: '#fff'
                            }
                        },
                        pointer: {
                            width: 3
                        },
                        itemStyle: {
                            color: '#FFB83E'
                        },
                        detail: {
                            fontSize: 12,
                            lineHeight: 18,
                            offsetCenter: [-2, '78%'],
                            formatter: function (value) {
                                return (value || value === 0) ? ('系统效率' + '\n' + value + '%') : '-%'
                            }
                        }
                    }
                }
            }
        }
    },
    // filters: {
    //     dataTofixedFilter: function (value) {
    //         if (!value) return '-'
    //         return Math.round(value)
    //     }
    // },
    methods: {
        getInfoData () {
            this.getRunAcpStatus.getData({queryType: this.$store.getters.station_type === 0 ? 3 : 1})
        }
    },
    created () {
        this.$bus.on('stationChange', this.getInfoData)
        this.getInfoData()
        this.intervalMonitorCenter = setInterval(() => {
            this.getInfoData()
        }, this.$store.getters.refresh_interval())
        this.getRunAcpStatus.subscribe(res => {
            this.acpInfo = res?.body?.acpInfo
            this.acpStatusInfo = res?.body?.acpStatusInfo
            this.chartData1 = {
                columns: ['type', 'value'],
                rows: [
                    {type: '出力系数', value: (this.acpInfo.kw_r && (this.acpInfo.kw_r[0] || this.acpInfo.kw_r[0] === 0)) ? Math.round(this.acpInfo.kw_r[0]) : '-'}
                ]
            }
            this.chartData2 = {
                columns: ['type', 'value'],
                rows: [
                    {type: '系统效率', value: (this.acpInfo?.pr && (this.acpInfo?.pr[0] || this.acpInfo?.pr[0] === 0)) ? Math.round(this.acpInfo?.pr[0]) : '-'}
                ]
            }
        })
    },
    beforeDestroy () {
        this.intervalMonitorCenter && clearInterval(this.intervalMonitorCenter)
        this.$bus.off('stationChange', this.getInfoData)
    }
}
</script>

<style lang="scss" scoped>
.center-con {
    height: 100%;
    .chart-con {
        width: 50%;
        float: left;
        height: 100%;
    }
    .bottom {
        .item {
            font-size: 12px;
            float: left;
            text-align: center;
            &.item1 {
                width: 28%;
            }
            &.item2 {
                width: 35%;
            }
            &.item3 {
                width: 37%;
            }
            .num {
                color: #3CCDD9;
                font-size: 16px;
                padding-left: 10px;
            }
        }
    }
    .unit-small{
        font-size:12px;
    }
}
</style>
