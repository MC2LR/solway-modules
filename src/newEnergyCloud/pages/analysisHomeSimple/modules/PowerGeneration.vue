<template>
    <div class="power-generation">
        <div class="title"><span class="title-bg">发电情况</span></div>
        <div class="items clearfix">
            <div class="item">
                <span class="name">总发电小时数</span>
                <span class="value">{{queryPvCompanyAnalysisElecSe.res.body.data.real_hours ? queryPvCompanyAnalysisElecSe.res.body.data.real_hours : queryPvCompanyAnalysisElecSe.res.body.data.real_hours === 0 ? 0 : '-'}}h</span>
            </div>
            <div class="item">
                <span class="name">电站数量</span>
                <span class="value">{{queryPvCompanyAnalysisElecSe.res.body.data.station_count ? queryPvCompanyAnalysisElecSe.res.body.data.station_count : queryPvCompanyAnalysisElecSe.res.body.data.station_count === 0 ? 0 : '-'}}个</span>
            </div>
            <div class="item">
                <span class="name">装机容量</span>
                <span class="value">{{queryPvCompanyAnalysisElecSe.res.body.data.inst_kw ? queryPvCompanyAnalysisElecSe.res.body.data.inst_kw : queryPvCompanyAnalysisElecSe.res.body.data.inst_kw === 0 ? 0 : '-'}}{{queryPvCompanyAnalysisElecSe.res.body.units.inst_kw || '-'}}</span>
            </div>
        </div>
        <div class="chart">
            <ve-histogram
                :after-config='afterConfig'
                :after-set-option='afterSetOption'
                :events="chartEvents"
                height='100%'
                ref='chart'
                v-loading='queryPvCompanyAnalysisElecSeLine.loading'
            ></ve-histogram>
        </div>
    </div>
</template>

<script>
import {rem} from '@comm/mixin'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/dataZoom'
import { api＿queryPvCompanyAnalysisElecSe, api＿queryPvCompanyAnalysisElecSeLine } from '@newEnergyCloud/request/api'

export default {
    mixins: [rem],
    data () {
        return {
            chartEvents: {},
            $echarts: null,
            date: [new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd'), new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd')],
            queryPvCompanyAnalysisElecSe: api＿queryPvCompanyAnalysisElecSe({
                later: true,
                res: {
                    body: {
                        data: {},
                        names: {},
                        units: {}
                    }
                }
            }),
            queryPvCompanyAnalysisElecSeLine: api＿queryPvCompanyAnalysisElecSeLine({
                later: true,
                res: {
                    body: {
                        data: {},
                        names: {},
                        units: {}
                    }
                }
            }),
            option: {
                dataZoom: [
                    {
                        type: 'inside',
                        xAxisIndex: [0, 1],
                        start: 0,
                        end: 6
                    },
                    {
                        type: 'slider',
                        xAxisIndex: [0, 1],
                        start: 0,
                        end: 6,
                        show: true,
                        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '110%',
                        height: 10,
                        bottom: 0,
                        borderColor: 'rgba(0, 0, 0, .6)',
                        fillerColor: '#269cdb',
                        borderRadius: 5,
                        backgroundColor: 'rgba(51, 56, 75, .4)', // 两边未选中的滑动条区域的颜色
                        showDataShadow: false,
                        showDetail: false
                    }
                ],
                color: ['#3398DB', '#2FBFCC'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line'
                    }
                },
                grid: [
                    {
                        x: '30',
                        y: '6%',
                        width: '88%',
                        height: '36%'
                    },
                    {
                        x: '30',
                        y2: '12%',
                        width: '88%',
                        height: '46%'
                    }
                ],
                xAxis: [
                    {
                        gridIndex: 0,
                        data: [],
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(16, 70, 140, 1)'
                            }
                        }
                    },
                    {
                        gridIndex: 1,
                        data: [],
                        position: 'bottom',
                        offset: 8,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(16, 70, 140, 1)'
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                fontSize: 12,
                                color: 'rgba(255, 255, 255, 0.7)'
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        name: 'h',
                        nameRotate: 0,
                        nameLocation: 'end',
                        nameGap: 0,
                        nameTextStyle: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: 11
                        },
                        gridIndex: 0,
                        min: 0,
                        axisTick: { // 轴刻度线
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(16, 70, 140, 1)'
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 2,
                            formatter: '{value}',
                            color: '#fff',
                            fontSize: 10
                        }
                    },
                    {
                        name: 'kWh/m2',
                        nameRotate: 0,
                        nameLocation: 'end',
                        nameGap: 2,
                        nameTextStyle: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: 11
                        },
                        gridIndex: 1,
                        min: 0,
                        inverse: true,
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(16, 70, 140, 1)'
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 2,
                            formatter: '{value}',
                            color: '#fff',
                            fontSize: 10
                        }
                    }

                ],
                series: [
                    {
                        name: '',
                        type: 'bar',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        data: [],
                        markLine: {
                            symbol: ['none', 'none'],
                            data: [
                                {
                                    type: 'average',
                                    name: '平均值',
                                    symbol: 'none',
                                    symbolSize: 0,
                                    lineStyle: {
                                        color: '#FD6473',
                                        type: 'solid'
                                    }
                                }
                            ]
                        },
                        barWidth: 13,
                        label: {
                            normal: {
                                show: false,
                                position: 'top',
                                color: '#fff'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: 'rgba(47, 191, 204, 1)'},
                                        {offset: 1, color: 'rgba(47, 191, 204, .1)'}
                                    ]
                                )
                            }
                        }
                    },
                    {
                        name: '',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: [],
                        markLine: {
                            symbol: ['none', 'none'],
                            data: [
                                {
                                    type: 'average',
                                    name: '平均值',
                                    symbol: 'none',
                                    symbolSize: 0,
                                    lineStyle: {
                                        color: '#FD6473',
                                        type: 'solid'
                                    }
                                }
                            ]
                        },
                        barWidth: 13,
                        label: {
                            normal: {
                                show: false,
                                position: 'bottom',
                                color: '#fff'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: 'rgba(251, 157, 44, .1)'},
                                        {offset: 1, color: 'rgba(251, 157, 42, 1)'}
                                    ]
                                )
                            }
                        }
                    }
                ]
            }
        }
    },
    created () {
        this.getSectionData(this.date)
        // this.getLineData(this.date)
        this.$bus.on('dateChange', this.dateChange)
        const self = this
        this.chartEvents = {
            click: function (e) {
                self.barName = e.name
                const index = self.queryPvCompanyAnalysisElecSeLine.res.body.data.st_name.indexOf(e.name)
                const stId = self.queryPvCompanyAnalysisElecSeLine.res.body.data.stid[index]
                let data = {
                    id: stId,
                    stClass: '01',
                    dataType: 0
                }
                self.$store.dispatch('station/changeStation', data).then(res => {
                    self.$router.push({name: 'deviceMonitor'})
                })
            }
        }
    },
    methods: {
        dateChange (date) {
            this.getSectionData(date)
            this.getLineData(date)
        },
        getSectionData (date) {
            this.queryPvCompanyAnalysisElecSe.getData({
                startDate: date[0],
                endDate: date[1]
            })
        },
        getLineData (date) {
            this.queryPvCompanyAnalysisElecSeLine.getData({
                startDate: date[0],
                endDate: date[1]
            }).then(res => {
                if (!res.body || Object.keys(res.body).length === 0) return
                const { real_hours: realHours, rad_chk: radChk } = res.body.data
                // let end = ((this.$el.clientWidth - 20) / 13) / realHours.length
                // if (realHours.length <= (this.$el.clientWidth - 20) / 13) end = 1
                let dayLength = (new Date(date[1]).getTime() - new Date(date[0]).getTime()) / 86400000 + 1
                let yaxisMax = dayLength * 6
                let end = 30 / realHours.length
                if (realHours.length <= 30) end = 1
                Math.ceil(Math.max(...realHours))
                Math.ceil(Math.max(...radChk))
                // let yaxisMax = Math.ceil(Math.max(...realHours)) - Math.ceil(Math.max(...radChk)) > 0 ? Math.ceil(Math.max(...realHours)) : Math.ceil(Math.max(...radChk))
                this.$echarts.setOption({
                    dataZoom: [
                        {
                            type: 'inside',
                            xAxisIndex: [0, 1],
                            start: 0,
                            end: end * 100
                        },
                        {
                            type: 'slider',
                            xAxisIndex: [0, 1],
                            start: 0,
                            end: end * 100,
                            show: true,
                            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                            handleSize: '110%',
                            height: 10,
                            bottom: 0,
                            borderColor: 'rgba(0, 0, 0, .6)',
                            fillerColor: '#269cdb',
                            borderRadius: 5,
                            backgroundColor: 'rgba(51, 56, 75, .4)', // 两边未选中的滑动条区域的颜色
                            showDataShadow: false,
                            showDetail: false
                        }
                    ],
                    xAxis: [
                        {
                            gridIndex: 0,
                            data: res.body.data.st_name.map(v => {
                                v = v || ''
                                return v
                            }),
                            axisLabel: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(16, 70, 140, 1)'
                                }
                            }
                        },
                        {
                            gridIndex: 1,
                            data: res.body.data.st_name.map(v => {
                                v = v || ''
                                return v
                            }),
                            position: 'bottom',
                            offset: 8,
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(16, 70, 140, 1)'
                                }
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    fontSize: 12,
                                    color: 'rgba(255, 255, 255, 0.7)'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            name: 'h',
                            nameRotate: 0,
                            nameLocation: 'end',
                            nameGap: 0,
                            nameTextStyle: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: 11
                            },
                            gridIndex: 0,
                            min: 0,
                            max: yaxisMax,
                            axisTick: { // 轴刻度线
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(16, 70, 140, 1)'
                                }
                            },
                            splitNumber: 3,
                            axisLabel: {
                                show: true,
                                formatter: '{value}',
                                color: '#fff',
                                fontSize: 12,
                                textStyle: {
                                    color: 'rgba(255, 255, 255, 0.7)'
                                }
                            }
                        },
                        {
                            name: 'kWh/m2',
                            nameRotate: 0,
                            nameLocation: 'end',
                            nameGap: 4,
                            nameTextStyle: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: 11
                            },
                            gridIndex: 1,
                            min: 0,
                            max: yaxisMax,
                            inverse: true,
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(16, 70, 140, 1)'
                                }
                            },
                            splitNumber: 3,
                            axisLabel: {
                                show: true,
                                formatter: '{value}',
                                color: '#fff',
                                fontSize: 12,
                                textStyle: {
                                    color: 'rgba(255, 255, 255, 0.7)'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '发电小时数',
                            type: 'bar',
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            data: realHours || [],
                            markLine: {
                                data: [
                                    {
                                        type: 'average',
                                        name: '平均值',
                                        symbol: 'none',
                                        symbolSize: 0,
                                        lineStyle: {
                                            color: '#FD6473',
                                            type: 'solid'
                                        }
                                    }
                                ]
                            },
                            barWidth: 13,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'top',
                                    color: '#fff'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: 'rgba(47, 191, 204, 1)'},
                                            {offset: 1, color: 'rgba(47, 191, 204, .1)'}
                                        ]
                                    )
                                }
                            }
                        },
                        {
                            name: '辐射总量',
                            type: 'bar',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data: radChk || [],
                            markLine: {
                                data: [
                                    {
                                        type: 'average',
                                        name: '平均值',
                                        symbol: 'none',
                                        symbolSize: 0,
                                        lineStyle: {
                                            color: '#FD6473',
                                            type: 'solid'
                                        }
                                    }
                                ]
                            },
                            barWidth: 13,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'bottom',
                                    color: '#fff'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: 'rgba(251, 157, 42, .1)'},
                                            {offset: 1, color: 'rgba(251, 157, 42, 1)'}
                                        ]
                                    )
                                }
                            }
                        }
                    ]
                })
            })
        },
        afterConfig (option) {
            option = { ...this.option }
            return option
        },
        afterSetOption ($echarts) {
            this.$echarts = $echarts
        }
    },
    beforeDestroy () {
        this.$bus.off('dateChange', this.dateChange)
    }
}
</script>

<style lang="scss" scoped>
.power-generation {
    padding: 10px 10px;
    padding-bottom: 6px;
    .title {
        color: #30C6F9;
        font-size: 14px;
        padding-bottom: 12px;
        .title-bg{
            display: inline-block;
            height: 19px;
            line-height: 19px;
            width:206px;
        }
    }
    .items {
        padding-bottom: 5px;
        .item {
            float: left;
            padding-right: .5rem;
            .name {
                color: rgba(255, 255, 255, .8);
                font-size: 12px;
                padding-right: .1rem;
            }
            .value {
                color: rgba(255, 255, 255, 1);
                font-size: 18px;
            }
        }
    }
    .chart {
        height: calc(100% - 51px);
    }
}
</style>
