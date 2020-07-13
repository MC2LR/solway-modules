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
                const index = _this.chartData.columns.findIndex(v => v === event.name)
                _this.dialogKey = _this.currentChartState.group[0].fd_key
                _this.dialogColor = _this.colors[index - 1]
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
            colors: ['#ff0000', '#00ff00', '#0000ff'],
            chartData: {
                columns: [],
                rows: {'北京': []}
            },
            chartSettings: {
                xAxisType: 'value',
                symbolSize: 10,
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
            apiData.groupName = this.currentChartState.group[0].fd_name
            const yAxisNames = this.yAxisNames = Object.keys(apiData.data)
            apiData.xAxisName = this.currentChartState.xAxis[0].fd_tn
            this.chartData.columns = [apiData.names[apiData.xAxisName] + (apiData.units[apiData.xAxisName] ? `(${apiData.units[apiData.xAxisName]})` : ''), apiData.names[yAxisNames[0]] + (apiData.units[yAxisNames[0]] ? `(${apiData.units[yAxisNames[0]]})` : ''), apiData.groupName]
            this.chartSettings.xAxisName = this.chartData.columns[0]
            this.chartSettings.yAxisName = this.chartData.columns[1]
            this.chartData.rows = {
                [apiData.groupName]: Object.keys(apiData.data[yAxisNames[0]]).map(v => {
                    return {
                        [this.chartData.columns[0]]: apiData.data[yAxisNames[0]][v][0],
                        [this.chartData.columns[1]]: apiData.data[yAxisNames[0]][v][1],
                        [apiData.groupName]: apiData.nm ? apiData.nm[v] : v
                    }
                })
            }
            this.colors[0] = this.scatterChartConfig[this.currentChartState.group[0].fd_key]?.color || randomColor()
            this.chartSettings.symbolSize = this.scatterChartConfig[this.currentChartState.group[0].fd_key]?.size || 10
        }
    },
    computed: {
        ...mapState(moduleName, [
            'apiData',
            'scatterChartConfig',
            'currentChartState'
        ])
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
