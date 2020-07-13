<template>
    <div class="ash-block-e">
        <i class="el-icon-folder-opened" @click="exportCsv"></i>
        <div class="select-con">
            <el-select v-model="optionKey" placeholder="请选择" @change="getData">
                <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="chart-con" v-if="chartData.rows">
            <ve-line :data="chartData" :settings="chartSettings" :after-config="afterConfig" :data-zoom="dataZoom" height="100%"></ve-line>
        </div>
    </div>
</template>

<script>
import {api＿deviceDustALine} from '@newEnergyCloud/request/api'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/legendScroll'
import { downloadBlob, jsonToCsv } from '@comm/tools'
import theme from '../theme/theme'
export default {
    mixins: [theme],
    data () {
        return {
            optionKey: 'clean_mark',
            yName: '',
            chartData: {},
            chartSettings: {
                // area: true
            },
            options: [
                {'name': '清洁指数 %', 'value': 'clean_mark'},
                {'name': '发电小时数 h', 'value': 'real_hours'},
                {'name': '发电量 ' + (this.$store.getters.global_theme === 'dark' ? '千瓦时' : 'kWh'), 'value': 'real_kwh_chk'},
                {'name': '积灰损失电量 ' + (this.$store.getters.global_theme === 'dark' ? '千瓦时' : 'kWh'), 'value': 'dust_we'},
                {'name': '积灰损失小时 h', 'value': 'dust_we_hours'}
            ],
            maxDays: 10,
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
                }, {
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
            deviceDustALine: api＿deviceDustALine({
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
            this.deviceDustALine.getData({startDate: this.startDate, endDate: this.endDate, field: this.optionKey}).then(res => {
                this.data = res.body
                // let units = res?.body?.units
                // this.options = [
                //     {'name': '清洁指数 ' + (units.clean_mark || '%'), 'value': 'clean_mark'},
                //     {'name': '发电小时数 ' + (units.real_hours || 'h'), 'value': 'real_hours'},
                //     {'name': '发电量 ' + (units.real_kwh_chk || 'kWh'), 'value': 'real_kwh_chk'},
                //     {'name': '积灰损失电量 ' + (units.dust_we || 'kWh'), 'value': 'dust_we'},
                //     {'name': '积灰损失小时 ' + (units.dust_we_hours || 'h'), 'value': 'dust_we_hours'}
                // ]
                this.drawGraph()
            })
        },
        drawGraph () {
            let rows = []
            this.data.dtime.map((v, i) => {
                let obj = {}
                Object.keys(this.data.deviceList).map(inside => {
                    obj[inside] = this.data.deviceList[inside][i]
                })
                rows.push(Object.assign({'日期': v}, obj))
            })
            this.chartData = {
                columns: ['日期', ...Object.keys(this.data.deviceList)],
                rows
            }
        },
        afterConfig (options) {
            let {startDate, endDate} = this
            let betweenDays = (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000 + 1
            new Array(2).fill(0).forEach((v, i) => {
                if (betweenDays <= this.maxDays) {
                    this.dataZoom[i].start = 0
                } else {
                    this.dataZoom[i].start = 100 - Math.floor(this.maxDays / betweenDays * 100)
                }
            })
            options.tooltip = {
                show: true,
                trigger: 'item',
                confine: true,
                formatter: (v) => {
                    return v.name + '<br/>' + v.seriesName + '：' + v.data[1]
                }
            }
            options.grid = {
                top: '70',
                bottom: '10',
                left: '10',
                right: '140'
            }
            options.legend = {
                type: 'scroll',
                icon: 'rect',
                itemWidth: 8,
                itemHeight: 8,
                orient: 'vertical',
                right: 0,
                top: 10,
                bottom: 0,
                textStyle: {
                    color: this.theme.$textColor
                }
            }
            options.yAxis[0].nameTextStyle = {
                align: 'left'
            }
            // options.yAxis[1].nameTextStyle = {
            //     align: 'right'
            // }
            // options.yAxis[1].name = '降雨量mm'
            options.series = options.series.map(v => {
                return {
                    ...v
                    // showSymbol: false
                }
            })
            this.options.map(v => {
                if (v.value === this.optionKey) {
                    options.yAxis[0].name = v.name
                    this.yName = v.name
                }
            })
            options.xAxis[0].axisLine = {
                show: true,
                lineStyle: {
                    color: this.theme.$axisTextColor,
                    width: 1
                }
            }
            options.yAxis[0].splitLine = {
                show: false
            }
            options.yAxis[0].axisLine = {
                show: true,
                lineStyle: {
                    color: this.theme.$axisTextColor,
                    width: 1
                }
            }
            return options
        },
         exportCsv () {
            let result = []
            result.push({'dtime': '日期', 'device': '设备', [this.optionKey]: this.yName})
            this.data.dtime.map((v, index) => {
                 Object.keys(this.data.deviceList).map(item => {
                    result.push({'dtime': v, 'device': item, [this.optionKey]: this.data.deviceList[item][index]})
                })
            })
            const blob = jsonToCsv(result)
            return downloadBlob(blob, '积灰分析-时间-设备-' + this.yName + '.csv')
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
.ash-block-e {
    height: 100%;
    padding:10px;
    @include page_c(color, $pageHeadSectionWordColor);
    position: relative;
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
    }
    .chart-con{
        height: 100%;
    }
}
</style>
