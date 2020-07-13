<template>
    <div class="ash-block-a">
        <i class="el-icon-folder-opened" @click="exportCsv"></i>
        <div class="select-con">
            <el-select v-model="optionKey" placeholder="请选择" @change="drawGraph">
                <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
            </el-select>
            <span class="lengend"><span class="square square1"></span>电站</span>
            <span class="lengend"><span class="square square2"></span>周边</span>
        </div>
        <div class="chart-con" v-if="chartData.rows">
            <ve-histogram :data="chartData" :after-config="afterConfig" :settings="chartSettings" :data-zoom="dataZoom" height="100%"></ve-histogram>
        </div>
    </div>
</template>

<script>
import {api＿dustStationAnd50kmLine} from '@newEnergyCloud/request/api'
import { downloadBlob, jsonToCsv } from '@comm/tools'
import 'echarts/lib/component/dataZoom'
import theme from '../theme/theme'
export default {
    mixins: [theme],
    data () {
        return {
            optionKey: 'clean_mark',
            chartData: {},
            // chartSettings: {showLine: ['电站降雨量', '周边降雨量']},
            chartSettings: {showLine: ['电站积灰损失电量', '电站积灰损失小时', '电站清洁指数', '电站实发电量', '电站实发小时数']},
            optionMap: {'dust_we': '电站积灰损失电量',
                'dust_we_50km': '电站周边积灰损失电量',
                'dust_we_hours': '电站积灰损失小时',
                'dust_we_hours_50km': '电站周边积灰损失小时',
                'clean_mark': '电站清洁指数',
                'clean_mark_50km': '电站周边清洁指数',
                'real_kwh_chk': '电站实发电量',
                'real_kwh_chk_50km': '电站周边实发电量',
                'real_hours': '电站实发小时数',
                'real_hours_50km': '电站周边实发小时数'
            },
            options: [
                {'name': '电站积灰损失电量kWh', 'value': 'dust_we'},
                {'name': '电站积灰损失小时h', 'value': 'dust_we_hours'},
                {'name': '电站清洁指数%', 'value': 'clean_mark'},
                {'name': '电站实发电量kWh', 'value': 'real_kwh_chk'},
                {'name': '电站实发小时数h', 'value': 'real_hours'}
            ],
            maxDays: 30,
            data: {},
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
            dustStationAnd50kmLine: api＿dustStationAnd50kmLine({
                later: true,
                res: {
                    body: {data: {}}
                }
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
            let {startDate, endDate} = this
            this.dustStationAnd50kmLine.getData({startDate, endDate}).then(res => {
                this.data = res?.body?.data
                let units = res?.body?.units
                this.options = [
                    {'name': '电站积灰损失电量 ' + (units.dust_we || 'kWh'), 'value': 'dust_we'},
                    {'name': '电站积灰损失小时 ' + (units.dust_we_hours || 'h'), 'value': 'dust_we_hours'},
                    {'name': '电站清洁指数 ' + (units.clean_mark || '%'), 'value': 'clean_mark'},
                    {'name': '电站实发电量 ' + (units.real_kwh_chk || 'kWh'), 'value': 'real_kwh_chk'},
                    {'name': '电站实发小时数 ' + (units.real_hours || 'h'), 'value': 'real_hours'}
                ]
                this.drawGraph()
            })
        },
        drawGraph () {
            let {optionMap, optionKey, data} = this
            let rows = []
            if (this.optionKey === 'dust_we' || this.optionKey === 'real_kwh_chk') {
                this.data.dtime.map((v, i) => {
                    rows.push({
                        '日期': v,
                        [optionMap[optionKey]]: data[optionKey][i],
                        '电站降雨量': data['pcpn'][i],
                        '电站周边降雨量': data['pcpn_50km'][i]
                    })
                })
                this.chartData = {
                    columns: ['日期', optionMap[optionKey], '电站降雨量', '电站周边降雨量'],
                    rows
                }
            } else {
                this.data.dtime.map((v, i) => {
                    rows.push({
                        '日期': v,
                        [optionMap[optionKey]]: data[optionKey][i],
                        [optionMap[optionKey + '_50km']]: data[optionKey + '_50km'][i],
                        '电站降雨量': data['pcpn'][i],
                        '电站周边降雨量': data['pcpn_50km'][i]
                    })
                })
                this.chartData = {
                    columns: ['日期', optionMap[optionKey], optionMap[optionKey + '_50km'], '电站降雨量', '电站周边降雨量'],
                    rows
                }
            }
        },
        afterConfig (options) {
            let {startDate, endDate} = this
            let betweenDays = (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000 + 1
            options.grid = {
                top: '70',
                bottom: '10',
                left: '10',
                right: '20'
            }
            options.legend = {
                show: false
            }
            options.yAxis[0].nameTextStyle = {
                align: 'left'
            }
            options.yAxis[1].nameTextStyle = {
                align: 'right'
            }
            options.yAxis[1].name = '降雨量mm'
            options.yAxis[1].max = '100'
            if (this.optionKey === 'dust_we' || this.optionKey === 'real_kwh_chk') {
                options.color = ['#30C6F9', '#30C6F9', '#5676E8']
            } else {
                options.color = ['#30C6F9', '#5676E8', '#30C6F9', '#5676E8']
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
            if (this.optionKey === 'dust_we' || this.optionKey === 'real_kwh_chk') {
                new Array(1).fill(0).forEach((v, i) => {
                    options.series[i].type = 'line'
                    options.series[i + 2].barWidth = 6
                    options.series[i + 2].yAxisIndex = 1
                })
            } else {
                new Array(2).fill(0).forEach((v, i) => {
                    options.series[i].type = 'line'
                    options.series[i + 2].barWidth = 6
                    options.series[i + 2].yAxisIndex = 1
                })
            }
            new Array(2).fill(0).forEach((v, i) => {
                options.yAxis[i].splitLine = {
                    show: false
                }
                options.yAxis[i].axisLine = {
                    show: true,
                    lineStyle: {
                        color: this.theme.$axisTextColor,
                        width: 1
                    }
                }
                if (betweenDays <= this.maxDays) {
                    // this.dataZoom[i].end = 100
                    this.dataZoom[i].start = 0
                } else {
                    // this.dataZoom[i].end = Math.floor(this.maxDays / betweenDays * 100)
                    this.dataZoom[i].start = 100 - Math.floor(this.maxDays / betweenDays * 100)
                }
            })
            return options
        },
        exportCsv () {
            let result = []
            let columns = this.chartData.columns
            let firstObj = {}
            columns.map((v, i) => {
                Object.assign(firstObj, {[i]: v})
            })
            result.push(firstObj)
            let rows = this.chartData.rows
            rows.map(item => {
                let currentObj = {}
                columns.map((v, i) => {
                    Object.assign(currentObj, {[i]: item[v]})
                })
                result.push(currentObj)
            })
            const blob = jsonToCsv(result)
            return downloadBlob(blob, '积灰分析-电站-周边-' + this.optionMap[this.optionKey] + '.csv')
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
.ash-block-a {
    height: 100%;
    padding:10px;
    position: relative;
    background: transparent;
    @include page_c(color, $pageHeadSectionWordColor);
    .el-icon-folder-opened{
        position:absolute;
        z-index: 2;
        right: 10px;
        cursor: pointer;
        font-size:24px;
        color:#31d3c9;
    }
    .select-con{
        position: absolute;
        z-index: 1;
        .lengend{
            margin-left:40px;
            .square{
                display: inline-block;
                width:8px;
                height: 8px;
                margin-right:6px;
                &.square1{
                    background:rgba(48,198,249,1);
                }
                &.square2{
                    background:rgba(86,118,232,1);
                }
            }
        }
    }
    .chart-con{
        height: 100%;
    }
}
</style>
