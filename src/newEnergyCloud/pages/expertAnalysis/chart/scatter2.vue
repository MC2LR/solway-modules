<template>
    <div class="scatter-chart">
        <ve-scatter
            :key="pageKey"
            ref="chart"
            height="100%"
            :data="chartData"
            :events="chartEvents"
            :colors="colors"
            :extend="extend"
            :grid="{left: 30, right: 100}"
            :before-config="beforeConfig"
            :after-config="afterConfig"
            :settings="chartSettings">
        </ve-scatter>
        <scatter-config
            :dialogKey="dialogKey"
            :dialogTitle="dialogTitle"
            :dialogColor="dialogColor"
            :chartConfig="scatterChartConfig[dialogKey]"
            :configVisible="centerDialogVisible"
            @close="centerDialogVisible = false">
        </scatter-config>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import {moduleName} from '../store'
import scatterConfig from './scatterConfig'
import {randomColor} from '@comm/tools'
import theme from '../theme/theme'

require('echarts/lib/component/legendScroll')

export default {
    mixins: [theme],
    components: {
        scatterConfig
    },
    data () {
        const _this = this
        this.chartEvents = {
            legendselectchanged: function (event) {
                _this.centerDialogVisible = true
                _this.dialogTitle = event.name
                const index = _this.names.findIndex(v => v === event.name)
                _this.dialogKey = _this.ids[index]
                _this.dialogColor = _this.colors[index]
                _this.$refs.chart.echarts.dispatchAction({
                    type: 'legendSelect',
                    name: event.name
                })
            }
        }
        return {
            pageKey: 0,
            centerDialogVisible: false,
            dialogKey: '',
            dialogTitle: '',
            dialogColor: '',
            colors: [],
            chartData: {
                columns: [],
                rows: {'北京': []}
            },
            chartSettings: {
                xAxisType: 'value',
                xAxisName: '',
                yAxisName: ''
            },
            extend: {
                yAxis: {
                    axisLine: { show: true },
                    splitLine: { show: false }
                },
                xAxis: {
                    axisLine: { show: true },
                    splitLine: { show: false }
                },
                legend: {
                    type: 'scroll',
                    left: 30,
                    right: 30,
                    textStyle: {}
                },
                textStyle: {}
            }
        }
    },
    created () {
        this.extend.textStyle = {color: this.theme.$chartTextColor}
        this.extend.legend.textStyle = {color: this.theme.$chartTextColor}
        this.$nextTick(() => this.setChart())
    },
    methods: {
        setChart () {
            const apiData = this.apiData
            apiData.xAxisName = this.currentChartState.xAxis[0].fd_tn
            const yAxisNames = this.yAxisNames
            this.chartData.columns = [apiData.names[apiData.xAxisName] + (apiData.units[apiData.xAxisName] ? `(${apiData.units[apiData.xAxisName]})` : ''), apiData.names[yAxisNames[0]] + (apiData.units[yAxisNames[0]] ? `(${apiData.units[yAxisNames[0]]})` : ''), '时间']
            this.chartSettings.xAxisName = this.chartData.columns[0]
            this.chartSettings.yAxisName = this.chartData.columns[1]
            this.chartData.rows = {
                ...this.ids.reduce((a, b, i) => {
                    this.colors[i] = this.scatterChartConfig[b]?.color || randomColor()
                    // this.extend[`series.${i}.symbol`] = 'rect'
                    this.extend[`series.${i}.symbolSize`] = (+this.scatterChartConfig[b]?.size || 10)
                    a[apiData.nm[b]] = apiData.data[yAxisNames[0]][b].map(v => {
                        return {
                            [this.chartData.columns[0]]: v[0],
                            [this.chartData.columns[1]]: v[1],
                            '时间': v[2]
                        }
                    })
                    return a
                }, {})
            }
        },
        beforeConfig (data) {
            return data
        },
        afterConfig (options) {
            return {
                ...options,
                series: options.series.map(serie => ({
                    ...serie,
                    data: serie.data.map(v => ({...v, symbolSize: null}))
                }))
            }
        }
    },
    computed: {
        ...mapState(moduleName, [
            'apiData',
            'scatterChartConfig',
            'currentChartState'
        ]),
        ids () {
            return Object.keys(this.apiData.nm)
        },
        names () {
            return this.ids.map(v => this.apiData.nm[v])
        },
        yAxisNames () {
            return this.currentChartState.yAxis.map(v => v.fd_tn)
        }
    },
    watch: {
        apiData: {
            async handler (newValue, oldValue) {
                await this.$timeout(0)
                this.pageKey++
                this.setChart()
            },
            deep: true
        },
        scatterChartConfig: {
            async handler (newValue, oldValue) {
                await this.$timeout(0)
                this.pageKey++
                this.setChart()
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.scatter-chart {
    width: 100%;
    height: 100%;
}
</style>
