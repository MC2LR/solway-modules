<template>
    <div :key="pageKey" class="line-bar">
        <ve-histogram
            ref="chart"
            height="100%"
            :data="chartData"
            :events="chartEvents"
            :data-zoom="dataZoom"
            :colors="colors"
            :extend="extend"
            :grid="{left: 30, right: 30}"
            :settings="chartSettings">
        </ve-histogram>
        <line-bar-config
            :dialogKey="dialogKey"
            :dialogTitle="dialogTitle"
            :dialogColor="dialogColor"
            :chartConfig="lineBarChartConfig[dialogKey]"
            :configVisible="centerDialogVisible"
            @close="centerDialogVisible = false">
        </line-bar-config>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import {moduleName} from '../store'
import 'echarts/lib/component/dataZoom'
import lineBarConfig from './lineBarConfig'
import {randomColor} from '@comm/tools'
import theme from '../theme/theme'

export default {
    mixins: [theme],
    components: {
        lineBarConfig
    },
    data () {
        const _this = this
        this.chartEvents = {
            legendselectchanged: function (event) {
                _this.centerDialogVisible = true
                _this.dialogTitle = event.name
                const index = _this.chartData.columns.findIndex(v => v === event.name)
                _this.dialogKey = _this.yAxiskeys[index - 1]
                _this.dialogColor = _this.colors[index - 1]
                _this.$refs.chart.echarts.dispatchAction({
                    type: 'legendSelect',
                    name: event.name
                })
            }
        }
        this.dataZoom = [
            {
                type: 'slider',
                start: 0,
                end: 100,
                show: true,
                handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '110%',
                height: 10,
                bottom: 10,
                borderColor: 'rgba(0, 0, 0, .6)',
                fillerColor: '#269cdb',
                borderRadius: 5,
                backgroundColor: 'rgba(51, 56, 75, .4)', // 两边未选中的滑动条区域的颜色
                showDataShadow: false,
                showDetail: false
            }
        ]
        this.isHenan = process.env.isHenan === 'true'
        return {
            pageKey: 0,
            centerDialogVisible: false,
            dialogKey: '',
            dialogTitle: '',
            dialogColor: '',
            chartData: {
                columns: [],
                rows: []
            },
            chartSettings: {
                axisSite: { right: [] }
            },
            extend: {
                yAxis: {
                    splitLine: {
                        show: false
                    }
                },
                legend: {
                    textStyle: {}
                },
                textStyle: {}
            },
            colors: [randomColor(), randomColor(), randomColor()]
        }
    },
    created () {
        this.extend.textStyle = {color: this.theme.$chartTextColor}
        this.extend.legend.textStyle = {color: this.theme.$chartTextColor}
        this.$nextTick(() => this.setChart())
    },
    computed: {
        ...mapState(moduleName, [
            'apiData',
            'lineBarChartConfig',
            'currentChartState'
        ]),
        xAxisKey () {
            return this.currentChartState.xAxis[0].fd_tn
            // if (this.apiData.names.dtime) return 'dtime'
            // if (this.apiData.names.stid) return 'st_name'
            // if (this.apiData.names.st_eqid) return 'eq_name'
        },
        yAxiskeys () {
            return this.currentChartState.yAxis.map(v => v.fd_tn)
            // return Object.keys(this.apiData.names).filter(key => {
            //     return key !== 'dtime' && key !== 'st_name' && key !== 'stid' && key !== 'st_eqid' && key !== 'eq_name'
            // })
        }
    },
    methods: {
        async setChart () {
            const apiData = this.apiData
            // debugger
            this.chartData.columns = [apiData.names[this.xAxisKey], ...this.yAxiskeys.map(key => apiData.names[key] + (apiData.units[key] ? `(${apiData.units[key]})` : ''))]
            this.chartSettings.xAxisName = this.currentChartState.xAxis[0].fd_name
            this.chartData.rows = apiData.data[this.xAxisKey].map((v, i) => {
                const _this = this
                return {
                    [apiData.names[_this.xAxisKey]]: v,
                    ..._this.chartData.columns.reduce((a, b, index) => {
                        if (index === 0) return {}
                        a[b] = apiData.data[_this.yAxiskeys[index - 1]][i]
                        return a
                    }, {})
                }
            })
            this.yAxiskeys.forEach((key, index) => {
                this.extend[`yAxis.${index}.name`] = this.chartData.columns[index + 1]
                if (!this.lineBarChartConfig[key]) return
                this.colors[index] = this.lineBarChartConfig[key]?.color || randomColor()
                this.extend[`series.${index}.type`] = ['bar', 'line'][this.lineBarChartConfig[key]?.chatrType || 0]
                this.extend[`series.${index}.barWidth`] = this.lineBarChartConfig[key]?.width || null
                this.extend[`series.${index}.lineStyle.width`] = this.lineBarChartConfig[key]?.width || null
            })
            if (this.yAxiskeys.length >= 2) {
                this.chartSettings.axisSite.right = [this.chartData.columns[2]]
            }
            // if (this.yAxiskeys.length === 3) {
            //     this.extend['yAxis.2'] = {
            //         show: true,
            //         position: 'left',
            //         offset: -130,
            //         type: 'value',
            //         axisLine: {
            //             show: true
            //         },
            //         splitLine: {
            //             show: false
            //         }
            //     }
            //     this.extend['series.2.yAxisIndex'] = 2
            // }
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
        lineBarChartConfig: {
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
.line-bar {
    width: 100%;
    height: 100%;
}
</style>
