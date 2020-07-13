<template>
    <div class="section section-a">
        <div style="padding:2px 0 0px 5px;">
            <span style="margin-left:10px;">最近7天用电情况</span>
            <select v-model="type1" @change="changeData" class="select" style="margin:0 3px;">
                <option value="1">电量</option>
                <option value="2">电费</option>
            </select>
            <select v-model="type2" @change="changeData" class="select">
                <option value="1">时段</option>
                <option value="2">类型</option>
            </select>
        </div>
        <div ref="graph" class="graph"></div>
    </div>
</template>

<script>
// 引入柱状图
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import {api＿latestDayGraph} from '@comprehensiveEnergy/request/api'
export default {
    data () {
        return {
            myChart: null,
            perDayStr: 86400000,
            type1: '1',
            type2: '1',
            colorArr: ['#00A5D9', '#7458D9', '#FF8D1C', '#FF5F5D'],
            dataMap: {
                // 电量-时段：尖峰电量、高峰电量、平段电量、低谷电量
                '11': [{flag: 'd_kwh', name: '低谷电量', unit: 'kwh'}, {flag: 'p_kwh', name: '平段电量', unit: 'kwh'}, {flag: 'g_kwh', name: '高峰电量', unit: 'kwh'}, {flag: 'j_kwh', name: '尖峰电量', unit: 'kwh'}],
                // 电量-类型：空调用电量、电梯用电量、照明用电量、其他用电量
                '12': [{flag: 'air_kwh', name: '空调用电量', unit: 'kwh'}, {flag: 'light_kwh', name: '照明用电量', unit: 'kwh'}, {flag: 'other_kwh', name: '其他用电量', unit: 'kwh'}],
                // 电费-时段：尖峰电费、高峰电费、平段电费、低谷电费
                '21': [{flag: 'd_fee', name: '低谷电费', unit: '元'}, {flag: 'p_fee', name: '平段电费', unit: '元'}, {flag: 'g_fee', name: '高峰电费', unit: '元'}, {flag: 'j_fee', name: '尖峰电费', unit: '元'}],
                // 电费-类型：空调电费、电梯电费、照明电费、其他电费
                '22': [{flag: 'air_fee', name: '空调电费', unit: '元'}, {flag: 'light_fee', name: '照明电费', unit: '元'}, {flag: 'other_fee', name: '其他电费', unit: '元'}]
            },
            latestDayGraph: api＿latestDayGraph({
                later: true,
                res: {
                    data: []
                }
            })
        }
    },
    created () {
    },
    mounted () {
        this.myChart = this.$echarts.init(this.$refs.graph)
        const chartResize = this.myChart.resize
        this.myChart.resize = () => setTimeout(chartResize, 400)
        window.addEventListener('resize', this.myChart.resize)
        setTimeout(this.myChart.resize, 300)
        let today = new Date()
        let lastDay = this.formatDate(new Date(today.getTime() - this.perDayStr))
        let lastWeek = this.formatDate(new Date(new Date(lastDay).getTime() - this.perDayStr * 6))
        this.latestDayGraph.getData({end_date: lastDay, start_date: lastWeek})
        this.latestDayGraph.subscribe(res => {
            this.drawGraph()
        })
    },
    methods: {
        changeData () {
            this.drawGraph()
        },
        drawGraph () {
            let data = this.latestDayGraph.res.body.data
            let seriesData = []
            let xAxisData = data.dtime.map(v => (v.substring(v.length - 2, v.length)))
            this.dataMap[this.type1 + this.type2].map((v, i) => {
                seriesData.push({
                    name: v.name,
                    type: 'bar',
                    stack: 'energy',
                    barWidth: 7,
                    itemStyle: {
                        normal: {
                            color: this.colorArr[i]
                        }
                    },
                    data: data[v.flag]
                })
            })
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params, ticket, callback) {
                        let res = ''
                        for (let i = params.length - 1; i >= 0; i--) {
                            res += '<span style="display:inline-block;border-radius:50%;margin-right:5px;width:8px;height:8px;background:' + params[i].color + '"></span>' + params[i].seriesName + '：' + params[i].value + '<br/>'
                        }
                        return res
                    }
                },
                grid: {
                    top: '23px',
                    left: '20px',
                    right: '40px',
                    bottom: '5px',
                    containLabel: true
                },
                xAxis: {
                    name: '日期',
                    type: 'category',
                    data: xAxisData,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0,130,173,0.5)'
                        }
                    },
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: 12
                    },
                    nameGap: 5,
                    splitNumber: 4,
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(144, 168, 252,1)',
                            width: 1
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '12'
                        }
                    }
                },
                yAxis: {
                    name: (this.type1 === '1') ? 'kWh' : '元',
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: 12
                    },
                    splitNumber: 4,
                    nameGap: 5,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0,130,173,0.5)'
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(144, 168, 252,0.1)',
                            width: 1
                        }
                    },
                    axisLabel: {
                        show: false,
                        textStyle: {
                            color: 'white',
                            fontSize: '12'
                        }
                    }
                },
                series: seriesData
            }
            this.myChart.setOption(option, true)
        },
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
.section-a{
    font-size:12px;
    .select{
        background: rgba(0,56,138,0.5);
        color: white;
    }
    .graph{
        width:100%;
        height: calc(100% - 21px);
    }
}
</style>
