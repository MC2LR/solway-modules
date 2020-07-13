<template>
    <div class="ash-block-d">
        <i class="el-icon-folder-opened" @click="exportCsv"></i>
        <div class="select-con">
            <el-select v-model="optionKey" placeholder="请选择" @change="getData">
                <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
            </el-select>
            <div class="sort" @click="sortBy({normal: 'desc', desc: 'asc', asc: 'normal'}[sortType])">
                <i v-show="sortType === 'normal'" class="iconfont icon-paixu"></i>
                <i v-show="sortType === 'desc'" class="iconfont icon-xiangxiajiantou-"></i>
                <i v-show="sortType === 'asc'" class="iconfont icon-xiangshangjiantou-"></i>
            </div>
        </div>
        <div class="chart-con" v-if="chartData.rows">
            <ve-histogram
                :data="chartData"
                :after-config="afterConfig"
                :data-zoom="dataZoom"
                height='100%'
            ></ve-histogram>
        </div>
    </div>
</template>

<script>
import {api＿queryPvDeviceInvDustWeSeLine} from '@newEnergyCloud/request/api'
import 'echarts/lib/component/dataZoom'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/markLine'
import theme from '../theme/theme'
import { downloadBlob, jsonToCsv } from '@comm/tools'
export default {
    mixins: [theme],
    data () {
        return {
            optionKey: 'dust_we',
            chartData: {},
            chartSettings: {},
            sortType: 'normal',
            optionMap: {'dust_we': '积灰损失电量', 'dust_we_hours': '积灰损失小时', 'real_kwh_chk': '实发电量', 'real_hours': '实发小时数', 'clean_mark': '清洁指数'},
            options: [
                {'name': '积灰损失电量kWh', 'value': 'dust_we'},
                {'name': '积灰损失小时h', 'value': 'dust_we_hours'},
                {'name': '实发电量kWh', 'value': 'real_kwh_chk'},
                {'name': '实发小时数h', 'value': 'real_hours'},
                {'name': '清洁指数%', 'value': 'clean_mark'}
            ],
            maxNum: 20,
            dataZoom: [
                 {
                    type: 'slider',
                    start: 0,
                    end: 100,
                    show: true,
                    handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '110%',
                    height: 10,
                    bottom: 0,
                    borderColor: 'rgba(0, 0, 0, .6)',
                    fillerColor: '#269cdb',
                    borderRadius: 5,
                    backgroundColor: 'rgba(51, 56, 75, .1)',
                    showDataShadow: false,
                    showDetail: false
                },
                {
                    type: 'inside',
                    start: 0,
                    end: 100,
                    show: true,
                    handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '110%',
                    height: 10,
                    bottom: 0,
                    borderColor: 'rgba(0, 0, 0, .6)',
                    fillerColor: '#269cdb',
                    borderRadius: 5,
                    backgroundColor: 'rgba(51, 56, 75, .1)',
                    showDataShadow: false,
                    showDetail: false
                }
            ],
            queryPvDeviceInvDustWeSeLine: api＿queryPvDeviceInvDustWeSeLine({
                later: true
            })
        }
    },
    methods: {
        dateChange (data) {
            this.startDate = data.startDate
            this.endDate = data.endDate
            this.getData()
        },
        stationChange () {
            this.getData()
        },
        getData () {
            let params = {startDate: this.startDate, endDate: this.endDate, sort: this.sortType === 'normal' ? '' : this.optionKey + ',' + this.sortType}
            this.queryPvDeviceInvDustWeSeLine.getData(params).then(res => {
                this.data = res?.body?.data
                let units = res?.body?.units
                this.options = [
                    {'name': '积灰损失电量 ' + (units.dust_we || 'kWh'), 'value': 'dust_we'},
                    {'name': '积灰损失小时 ' + (units.dust_we_hours || 'h'), 'value': 'dust_we_hours'},
                    {'name': '实发电量 ' + (units.real_kwh_chk || 'kWh'), 'value': 'real_kwh_chk'},
                    {'name': '实发小时数 ' + (units.real_hours || 'h'), 'value': 'real_hours'},
                    {'name': '清洁指数 ' + (units.clean_mark || '%'), 'value': 'clean_mark'}
                ]
                this.drawGraph()
            })
        },
        drawGraph () {
            let {optionMap, optionKey, data} = this
            let rows = []
            this.data.eq_name.map((v, i) => {
                rows.push({
                    '设备': v,
                    [optionMap[optionKey]]: data[optionKey][i]
                })
            })
            this.chartData = {
                columns: ['设备', optionMap[optionKey]],
                rows
            }
        },
        sortBy (sortType) {
            this.sortType = sortType
            this.getData()
        },
        afterConfig (options) {
            let eqNum = this.data.eq_name.length
            new Array(2).fill(0).forEach((v, i) => {
                if (eqNum <= this.maxNum) {
                    this.dataZoom[i].end = 100
                } else {
                    this.dataZoom[i].end = Math.floor(this.maxNum / eqNum * 100)
                }
            })
            options.yAxis[0].nameTextStyle = {
                align: 'left'
            }
            this.options.map(v => {
                if (v.value === this.optionKey) { options.yAxis[0].name = v.name }
            })
            options.xAxis[0].axisLine = {
                show: true,
                lineStyle: {
                    color: this.theme.$axisTextColor,
                    width: 1
                }
            }
            options.xAxis[0].nameGap = 10
            options.xAxis[0].nameLocation = 'end'
            options.xAxis[0].name = '设备'

            new Array(1).fill(0).forEach((v, i) => {
                options.yAxis[i].axisLine = {
                    show: true,
                    lineStyle: {
                        color: this.theme.$axisTextColor,
                        width: 1
                    }
                }
                options.yAxis[i].splitLine = {
                    show: false
                }
                options.yAxis[i].nameLocation = 'end'
            })
            options.legend = {
                show: false
            }
            options.grid = {
                top: '70',
                bottom: '10',
                left: '10',
                right: '40'
            }
            options.series[0].symbol = 'none'
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
                                    return '　　　　　　　　' + params.name + ': ' + params.value
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
            return options
        },
        exportCsv () {
            let result = []
            result.push({'eq_name': '设备', [this.optionKey]: this.optionMap[this.optionKey]})
            let rows = this.chartData.rows
            rows.map(v => {
                result.push({'eq_name': v['设备'], [this.optionKey]: v[this.optionMap[this.optionKey]]})
            })
            const blob = jsonToCsv(result)
            return downloadBlob(blob, '积灰分析-设备-' + this.optionMap[this.optionKey] + '.csv')
        }
    },
    created () {
        this.$bus.on('changeDateAshEmit', this.dateChange)
        this.$bus.on('stationChange', this.stationChange)
    },
    beforeDestroy () {
        this.$bus.off('changeDateAshEmit', this.dateChange)
        this.$bus.off('stationChange', this.stationChange)
    }
}
</script>

<style lang="scss" scoped>
@import '../theme/theme.scss';
.ash-block-d {
    height: 100%;
    padding:10px;
    @include page_c(color, $pageHeadSectionWordColor);
    position: relative;
    .select-con{
        position: absolute;
        z-index: 1;
    }
    .chart-con{
        height: 100%;
    }
    .el-icon-folder-opened{
        position:absolute;
        z-index: 2;
        right: 10px;
        cursor: pointer;
        font-size:24px;
        color:#31d3c9;
    }
    .sort {
        display: inline-block;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        vertical-align: middle;
        border: 1px solid #efefef;
        @include page_c(background-color, $blockBgColor);
        @include page_c(border-color, $sortBorderColor);
        border-radius: 2px;
        margin-right: 20px;
        cursor: pointer;

        i {
            font-size: 16px;
            @include c(color, $text_c1);
        }
    }
}
</style>
