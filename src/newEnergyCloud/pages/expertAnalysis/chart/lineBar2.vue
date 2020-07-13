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
            :defaultChartType="defaultChartType"
            @close="centerDialogVisible = false">
        </line-bar-config>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import {moduleName} from '../store'
import 'echarts/lib/component/dataZoom'
import lineBarConfig from './lineBarConfig'
import 'echarts/lib/component/legendScroll'
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
                _this.dialogKey = _this.configKeys[index - 1]
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
        return {
            pageKey: 0,
            centerDialogVisible: false,
            dialogKey: '',
            dialogTitle: '',
            dialogColor: '',
            configKeys: [],
            defaultChartType: 1,
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
                    type: 'scroll',
                    left: 30,
                    right: 30,
                    textStyle: {}
                },
                textStyle: {}
            },
            colors: []
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
        groupBy () {
            return this.currentChartState.group[0].fd_key
            // if (this.apiData.names.st_eqid) return 'eq_name'
            // if (this.apiData.names.stid) return 'st_name'
        },
        yAxiskeys () {
            return this.currentChartState.yAxis.map(v => v.fd_tn)
            // return Object.keys(this.apiData.names).filter(key => {
            //     return key !== 'dtime' && key !== 'st_name' && key !== 'stid' && key !== 'st_eqid' && key !== 'eq_name'
            // })
        },
        ids () {
            return Object.keys(this.apiData.data).filter(v => v !== this.currentChartState.xAxis[0].fd_key)
        },
        names () {
            // return this.ids.map(id => this.apiData.data[id][this.groupBy].filter(v => v)[0])
            return this.ids.map(id => this.apiData.nm[id])
        }
    },
    methods: {
        async setChart () {
            const apiData = this.apiData
            const [yAxis0, yAxis1] = this.currentChartState.yAxis
            const unit0 = apiData.units[yAxis0.fd_key]
            const unit1 = yAxis1 && apiData.units[yAxis1.fd_key]
            this.chartData.columns = [this.currentChartState.xAxis[0].fd_name, ...this.names.map(name => name + '-' + yAxis0.fd_name + `(${unit0})`)]
            this.chartSettings.xAxisName = this.chartData.columns[0]
            this.chartData.rows = apiData.data[this.currentChartState.xAxis[0].fd_key].map((v, i) => {
                const _this = this
                return {
                    [_this.currentChartState.xAxis[0].fd_name]: v,
                    ..._this.ids.reduce((a, b, index) => {
                        a[_this.names[index] + '-' + yAxis0.fd_name + `(${unit0})`] = apiData.data[b][yAxis0.fd_key][i]
                        if (yAxis1) {
                            a[_this.names[index] + '-' + yAxis1.fd_name + `(${unit1})`] = apiData.data[b][yAxis1.fd_key][i]
                        }
                        return a
                    }, {})
                }
            })
            if (yAxis1) {
                this.chartSettings.axisSite.right = this.ids.map(id => apiData.nm[id] + '-' + yAxis1.fd_name + `(${unit1})`)
                this.chartData.columns.push(...this.chartSettings.axisSite.right)
            }
            this.currentChartState.yAxis.forEach((item, index) => {
                this.extend[`yAxis.${index}.name`] = item.fd_name + (apiData.units[item.fd_key] ? `(${apiData.units[item.fd_key]})` : '')
            })
            this.chartData.columns.forEach((v, i) => {
                if (i === 0) return
                const configKey = this.ids[i - 1] + '_' + v.split('-')[1].split('(')[0]
                this.colors[i - 1] = this.lineBarChartConfig[configKey]?.color || randomColor()
                this.extend[`series.${i - 1}.type`] = ['bar', 'line'][this.lineBarChartConfig[configKey]?.chatrType == null ? this.defaultChartType : this.lineBarChartConfig[configKey]?.chatrType]
                this.extend[`series.${i - 1}.barWidth`] = this.lineBarChartConfig[configKey]?.width || null
                this.extend[`series.${i - 1}.lineStyle.width`] = this.lineBarChartConfig[configKey]?.width || null
                this.configKeys[i - 1] = configKey
            })
            // if (this.currentChartState.yAxis.length === 3) {
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
