<template>
    <div class="shadow-power-loss">
        <div class="title"><span class="title-bg">阴影损失电量 TOP10</span></div>
        <div class="chart-container">
            <ve-bar
                :data="chartData"
                :settings="chartSettings"
                :after-config="afterConfig"
                :events="chartEvents"
                height='100%'
                ref='chart'
                v-loading='queryPvCompanyAnalysisShadowSe.loading'
            ></ve-bar>
        </div>
    </div>
</template>

<script>
import 'echarts/lib/component/title'
import { api＿queryPvCompanyAnalysisShadowSe } from '@newEnergyCloud/request/api'

export default {
    data () {
        return {
            chartEvents: {},
            chartSettings: {},
            date: [new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd'), new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd')],
            queryPvCompanyAnalysisShadowSe: api＿queryPvCompanyAnalysisShadowSe({
                later: true,
                res: {
                    body: {
                        data: {},
                        names: {},
                        units: {}
                    }
                }
            }),
            chartData: {
                columns: ['电站', '阴影损失电量'],
                rows: []
            }
        }
    },
    created () {
        // this.getLineData(this.date)
        this.$bus.on('dateChange', this.dateChange)
        const self = this
        this.chartEvents = {
            click: function (e) {
                self.barName = e.name
                const index = self.queryPvCompanyAnalysisShadowSe.res.body.data.st_name.indexOf(e.name)
                const stId = self.queryPvCompanyAnalysisShadowSe.res.body.data.stid[index]
                let data = {
                    id: stId,
                    stClass: '01',
                    dataType: 0
                }
                self.$store.dispatch('station/changeStation', data).then(res => {
                    self.$router.push({name: 'shadowAnalysis'})
                })
            }
        }
    },
    methods: {
        dateChange (date) {
            this.getLineData(date)
        },
        getLineData (date) {
            this.queryPvCompanyAnalysisShadowSe.getData({
                startDate: date[0],
                endDate: date[1]
            }).then(res => {
                if (!res.body || Object.keys(res.body).length === 0) return
                const { st_name: stName, shade_we: shadeWe } = res.body.data
                let arr1 = []
                let arr2 = []
                this.chartData.rows = []
                stName.forEach(v => {
                    arr1.push({'电站': v || ''})
                })
                shadeWe.forEach(v => {
                    arr2.push({'阴影损失电量': v})
                })
                stName.forEach((v, i) => {
                    this.chartData.rows.push({...arr1[i], ...arr2[i]})
                })
                this.chartData.rows.reverse()
                this.chartSettings = {yAxisName: res.body.units.shade_we || 'kWh'}
            })
        },
        afterConfig (options) {
            options.color = ['#5E7EF0']

            // options.title = {
            //     text: '阴影损失电量  TOP10',
            //     textStyle: {
            //         fontWeight: 'normal',
            //         fontSize: '14',
            //         color: '#30C6F9'
            //     },
            //     top: 10,
            //     left: 5
            // }

            options.xAxis[0].show = false

            options.yAxis[0].axisLine = {
                show: true,
                lineStyle: {
                    color: 'rgba(16, 70, 140, 1)',
                    width: 1
                }
            }
            options.yAxis[0].splitLine = {
                show: false
            }
            options.yAxis[0].axisLabel = {
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.7)'
                },
                formatter: function (value) {
                    if (value.length >= 8) value = value.substr(0, 7) + '..'
                    return value
                }
            }
            options.yAxis[0].nameTextStyle = {
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: 13
            }
            options.yAxis[0].nameGap = 5
            // options.yAxis[0].name = 'kWh'
            options.yAxis[0].nameLocation = 'end'

            options.legend = {
                show: false
            }

            options.grid = {
                top: '25',
                bottom: '0',
                left: '10',
                right: '75'
            }

            options.series[0].type = 'bar'
            options.series[0].barWidth = 13
            options.series[0].label = {
                normal: {
                    show: true,
                    position: 'right',
                    color: '#fff',
                    offset: [5, 0]
                }
            }

            return options
        }
    },
    beforeDestroy () {
        this.$bus.off('dateChange', this.dateChange)
    }
}
</script>

<style lang="scss" scoped>
.shadow-power-loss{
    padding:10px;
    .title {
        color: #30C6F9;
        font-size: 14px;
        .title-bg{
            display: inline-block;
            height: 19px;
            line-height: 19px;
            width:206px;
        }
    }
    .chart-container{
        height:calc(100% - 10px);
    }
}
</style>
