<template>
    <div class="shadowAnalysis-charts" @click.stop>
        <ve-histogram
            :data="chartData"
            :after-config="afterConfig"
            :data-zoom="dataZoom"
            height='100%'
            ref='chart'
            :events="chartEvents"
            v-loading='queryPvDeviceInvShadowWeSeLine.loading'
        ></ve-histogram>
        <el-select
            v-model="IndexValue"
            class="legendChange"
            placeholder="请选择"
            @change="changeIndex()"
            >
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
        </el-select>
        <i v-show="sort === 'eqid,asc'" class="iconfont icon-paixu sorticon" title='默认排序' @click="sortChange()"></i>
        <i v-show="sort === ',desc'" class="iconfont icon-xiangxiajiantou- sorticon" title='降序' @click="sortChange()"></i>
        <i v-show="sort === ''" class="iconfont icon-xiangshangjiantou- sorticon" title='升序' @click="sortChange()"></i>
        <i class="export el-icon-folder-opened" style="color: #59ccd6;font-size: 20px" title="导出" @click="exportCsv"></i>
    </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/markLine'
import { api＿queryPvDeviceInvShadowWeSeLine } from '@newEnergyCloud/request/api'
import { downloadBlob, jsonToCsv } from '@comm/tools'
import theme from './theme/theme'

export default {
    mixins: [theme],
    data () {
        return {
            chartEvents: {},
            stId: null,
            sort: 'eqid,asc',
            sortArr: ['eqid,asc', ',desc', ''],
            date: [new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd'), new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd')],
            queryPvDeviceInvShadowWeSeLine: api＿queryPvDeviceInvShadowWeSeLine({
                later: true,
                res: {
                    body: {
                        data: {},
                        names: {},
                        units: {}
                    }
                }
            }),
            chartData: { columns: [], rows: [] },
            options: [
                {
                    value: 'shade_we',
                    label: '阴影损失电量'
                },
                {
                    value: 'shade_we_hours',
                    label: '阴影损失小时'
                },
                {
                    value: 'real_kwh_chk',
                    label: '实发电量'
                },
                {
                    value: 'real_hours',
                    label: '发电小时'
                }
            ],
            IndexValue: 'shade_we',
            yAxisName: '',
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 50
                },
                {
                    type: 'slider',
                    start: 0,
                    end: 50,
                    show: true,
                    handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '110%',
                    height: 10,
                    bottom: 10,
                    borderColor: 'rgba(0, 0, 0, .3)',
                    fillerColor: '#59ccd6',
                    borderRadius: 5,
                    backgroundColor: 'rgba(51, 56, 75, .0)', // 两边未选中的滑动条区域的颜色
                    showDataShadow: false,
                    showDetail: false
                }
            ]
        }
    },
    created () {
        this.getLineData()
        this.$bus.on('stationChange', this.stationChange)
        this.$bus.on('dateChange', this.dateChange)
        this.stId = this.$store.getters.station_id
        const self = this
        this.chartEvents = {
            click: function (e) {
                const { eq_name: eqName, eqid } = self.queryPvDeviceInvShadowWeSeLine.res.body.data
                let ii = 0
                eqName.forEach((v, i) => {
                    if (v === e.name) ii = i
                })
                self.$bus.emit('clickBarId', eqid[ii])
            }
        }
    },
    methods: {
        stationChange (data) {
            this.stId = data.id
            this.getLineData()
        },
        dateChange (date) {
            this.date = date
            this.getLineData()
        },
        changeIndex () {
            const { data } = this.queryPvDeviceInvShadowWeSeLine.res.body
            let arr1 = []
            let arr2 = []
            this.chartData.rows = []
            data.eq_name.forEach(v => {
                arr1.push({'设备': v})
            })

            let IndexName = ''
            this.options.forEach(v => {
                if (v.value === this.IndexValue) IndexName = v.label
            })
            data[this.IndexValue].forEach(v => {
                arr2.push({[IndexName]: v})
            })
            this.chartData.columns = ['设备', IndexName]

            data.eq_name.forEach((v, i) => {
                this.chartData.rows.push({...arr1[i], ...arr2[i]})
            })
            // let end = (this.$el.clientWidth / 13) / data.eq_name.length
            // if (data.eq_name.length <= this.$el.clientWidth / 13) end = 1
            let end = 60 / data.eq_name.length
            if (data.eq_name.length <= 60) end = 1
            this.dataZoom[0].end = end * 100
            this.dataZoom[1].end = end * 100
        },
        sortChange () {
            const index = this.sortArr.indexOf(this.sort) === 2 ? 0 : this.sortArr.indexOf(this.sort) + 1
            this.sort = this.sortArr[index]
            this.getLineData()
        },
        getLineData () {
            this.queryPvDeviceInvShadowWeSeLine.getData({
                startDate: this.date[0],
                endDate: this.date[1],
                sort: this.sort === `eqid,asc` ? `eqid,asc` : `${this.IndexValue}${this.sort}`
            }).then(res => {
                if (!res.body || Object.keys(res.body).length === 0) return
                this.changeIndex()
            })
        },
        afterConfig (options) {
            options.color = ['#5676E8']
            options.xAxis[0].axisLabel = {
                textStyle: {
                    color: this.theme.$axisTextColor
                }
            }
            options.xAxis[0].axisLine = {
                show: true,
                lineStyle: {
                    color: 'rgba(197,201,206, 0.4)',
                    width: 1
                }
            }
            options.xAxis[0].nameTextStyle = {
                color: this.theme.$textColor,
                fontSize: 13
            }
            options.xAxis[0].nameGap = 10
            options.xAxis[0].nameLocation = 'end'
            options.xAxis[0].name = '设备'

            options.yAxis[0].axisLine = {
                show: true,
                lineStyle: {
                    color: 'rgba(197,201,206, 0.4)',
                    width: 1
                }
            }
            options.yAxis[0].splitLine = {
                show: false
            }
            options.yAxis[0].axisLabel = {
                textStyle: {
                    color: this.theme.$axisTextColor
                }
            }
            options.yAxis[0].nameTextStyle = {
                color: this.theme.$textColor,
                fontSize: 13
            }
            options.yAxis[0].nameGap = 10
            options.yAxis[0].nameLocation = 'end'
            if (!this.queryPvDeviceInvShadowWeSeLine.loading) {
                this.options.forEach(v => {
                    if (v.value === this.IndexValue) {
                        options.yAxis[0].name = v.label
                        if (this.IndexValue === 'shade_we') {
                            options.yAxis[0].name = v.label + '\xa0' + (this.queryPvDeviceInvShadowWeSeLine.res.body.units.shade_we || 'kWh')
                        } else if (this.IndexValue === 'shade_we_hours') {
                            options.yAxis[0].name = v.label + '\xa0' + 'h'
                        } else if (this.IndexValue === 'real_kwh_chk') {
                            options.yAxis[0].name = v.label + '\xa0' + (this.queryPvDeviceInvShadowWeSeLine.res.body.units.real_kwh_chk || 'kWh')
                        } else if (this.IndexValue === 'real_hours') {
                            options.yAxis[0].name = v.label + '\xa0' + 'h'
                        }
                    }
                })
            }
            this.yAxisName = options.yAxis[0].name
            options.legend = {
                show: false
            }
            options.grid = {
                top: '63',
                bottom: '25',
                left: '43',
                right: '70'
            }

            if (options.series && options.series.length) {
                options.series[0].type = 'bar'
                options.series[0].barWidth = 13
                options.series[0].markLine = {
                    symbol: ['none', 'none'],
                    data: [
                        {
                            type: 'average',
                            name: '平均值',
                            lineStyle: {
                                color: '#FD6473',
                                type: 'solid'
                            },
                            symbolSize: 0,
                            label: {
                                normal: {
                                    position: 'middle',
                                    formatter: function (params) {
                                        return '\xa0\xa0\xa0\xa0\xa0\xa0' + params.name + ': ' + params.value
                                    }
                                }
                            }
                        }
                    ]
                }
                options.series[0].itemStyle = {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: 'rgba(86, 118, 232, 1)'},
                                {offset: 0.5, color: 'rgba(86, 118, 232, .8)'},
                                {offset: 1, color: 'rgba(86, 118, 232, .1)'}
                            ]
                        )
                    }
                }
            }
            return options
        },
        exportCsv () {
            let result = JSON.parse(JSON.stringify(this.queryPvDeviceInvShadowWeSeLine.res.body))
            let resultNew = []
            let resultNew2 = []
            this.yAxisName = this.yAxisName.trim().split(/\s+/)
            resultNew.push({'eq_name': '设备', [this.IndexValue]: this.yAxisName[0] + '(' + this.yAxisName[1] + ')'})
            resultNew2 = result.data.eq_name.map((v, i) => {
                let item = {'eq_name': v, [this.IndexValue]: result.data[this.IndexValue][i]}
                return item
            })
            resultNew = [...resultNew, ...resultNew2]
            const blob = jsonToCsv(resultNew)
            return downloadBlob(blob, '阴影分析-' + this.yAxisName[0] + '.csv')
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.stationChange)
        this.$bus.off('dateChange', this.dateChange)
    }
}
</script>

<style lang="scss">
.shadowAnalysis-charts {
    .legendChange {
        .el-input__inner {
            border: 1px solid rgb(241, 245, 253);
            padding-right: 0px;
            padding-left: 10px;
            font-size: 14px;
            color: #606369;
            height: 32px;
            line-height: 32px;
        }
        .el-input__suffix {
            right: 5px;
        }
    }
}
</style>

<style lang="scss" scoped>
@import './theme/theme.scss';
.shadowAnalysis-charts {
    width: 100%;
    height: 37%;
    margin-bottom: 10px;
    border:1px solid transparent;
    border-radius: 4px;
    @include page_c(background-color, $blockBgColor);
    @include page_c(border-color, $blockBorderColor);
    position: relative;
    .legendChange {
        position: absolute;
        left: 10px;
        top: 5px;
        width: 150px;
    }
    .iconfont.sorticon {
        width: 30px;
        height: 30px;
        line-height: 30px;
        position: absolute;
        left: 170px;
        top: 5px;
        color: #2FBFCB;
        @include page_c(background-color, $blockBgColor);
        @include page_c(border-color, $sortBorderColor);
        border: 1px solid #efefef;
        border-radius:  4px;
        text-align: center;
        cursor: pointer;
    }
    .export {
        position: absolute;
        right: 20px;
        top: 10px;
        cursor: pointer;
    }
}
</style>
