<template>
    <div class="overview">
        <div class="header-overview">
            <span class="header-label">总装机容量：<span class="header-value" v-if="data.inst_kw_chk">{{data.inst_kw_chk[0]}} {{data.inst_kw_chk[1]}}</span></span>
            <span class="header-label">实时功率：<span class="header-value" v-if="data.p_chk">{{data.p_chk[0]}} {{data.p_chk[1]}}</span></span>
            <span class="header-label">实发电量：<span class="header-value" v-if="data.real_kwh_chk">{{data.real_kwh_chk[0]}} {{data.real_kwh_chk[1]}}</span></span>
            <span class="header-label">上网电量：<span class="header-value" v-if="data.send_kwh_chk">{{data.send_kwh_chk[0]}} {{data.send_kwh_chk[1]}}</span></span>
            <span class="header-label">平均发电小时数：<span class="header-value" v-if="data.real_hours_chk">{{data.real_hours_chk[0]}} {{data.real_hours_chk[1]}}</span></span>
        </div>
        <div class="search-conditions">
            <i class="iconfont henanlist" :class="{'active': showModel === 'table'}" @click="changeModel('table')"></i>
            <i class="iconfont henanzhuzhuangtu1" :class="{'active': showModel === 'graph'}" @click="changeModel('graph')"></i>
            <label class="label-name">投资方</label>
            <el-select v-model="investor" class="custom_dark1" filterable placeholder="请选择" @change="changeModel(showModel, 'search')">
                <el-option
                    v-for="item in queryStWithTree.res.body"
                    :key="item.id"
                    :label="item.name"
                    :value="item.stids">
                </el-option>
            </el-select>
            <el-input placeholder="投资方、电站名" v-model="keywords"  @keydown.enter.native="changeModel(showModel, 'search')" class="input-with-selectc custom_dark1" style="width:212px;margin: 0 25px 0 25px;">
                <i slot="append" class="el-icon-search" style="cursor:pointer;" @click="changeModel(showModel, 'search')"></i>
            </el-input>
            <label class="label-name">投产时间</label>
            <el-date-picker
                class="custom_dark1"
                v-model="productionDate1"
                type="date"
                @change="changeModel(showModel)"
                placeholder="开始日期">
            </el-date-picker>
            至
            <el-date-picker
                class="custom_dark1"
                v-model="productionDate2"
                type="date"
                @change="changeModel(showModel)"
                placeholder="结束日期">
            </el-date-picker>
        </div>
        <div v-if="showModel === 'table'">
            <div class="table-model" v-loading="getRunKWPowerList.loading">
                <el-table
                    v-if="getRunKWPowerList.res.body.data"
                    @sort-change="(data) => sortRange(data)"
                    :data="getRunKWPowerList.res.body.data"
                    :max-height="vh - 180"
                    border
                    :row-style="{'cursor': 'pointer'}"
                    row-class-name="row-style"
                    cell-class-name="cell-style"
                    header-row-class-name="header-row-style"
                    header-cell-class-name="header-cell-style"
                    style="width: 100%">
                    <el-table-column
                        prop="st_name"
                        sortable="custom"
                        fixed
                        width="220"
                        :formatter="(row, column, cellValue) => cellValue ? cellValue : '-'"
                        label="电站名称">
                    </el-table-column>
                    <el-table-column
                        width="139"
                        prop="inst_kw"
                        fixed
                        align="right"
                        sortable="custom"
                        :formatter="(row, column, cellValue) => cellValue ? cellValue : '-'"
                        label="装机容量(千瓦)">
                    </el-table-column>
                    <el-table-column
                        prop="company_name"
                        sortable="custom"
                        width="220"
                        :formatter="(row, column, cellValue) => cellValue ? cellValue : '-'"
                        label="投资方">
                    </el-table-column>
                    <el-table-column
                        prop="city_name"
                        width="220"
                        :formatter="(row, column, cellValue) => (row.city_name && row.county_name) ? (row.city_name + row.county_name) : '-'"
                        sortable="custom"
                        label="地址">
                    </el-table-column>
                    <el-table-column
                        prop="productionDate"
                        align="center"
                        width="110"
                        sortable="custom"
                        :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue).Format('yyyy-MM-dd')) : '-'"
                        label="投产时间">
                    </el-table-column>
                    <el-table-column
                        width="139"
                        prop="p"
                        sortable="custom"
                        :formatter="(row, column, cellValue) => cellValue ? cellValue : '-'"
                        align="right"
                        label="实时功率(千瓦)">
                    </el-table-column>
                    <el-table-column
                        width="123"
                        prop="pr"
                        sortable="custom"
                        :formatter="(row, column, cellValue) => cellValue ? cellValue : '-'"
                        align="right"
                        label="发电效率(%)">
                    </el-table-column>
                    <el-table-column
                        width="153"
                        prop="real_kwh"
                        sortable="custom"
                        :formatter="(row, column, cellValue) => cellValue ? cellValue : '-'"
                        align="right"
                        label="实发电量(千瓦时)">
                    </el-table-column>
                    <el-table-column
                        width="153"
                        prop="send_kwh"
                        align="right"
                        sortable="custom"
                        :formatter="(row, column, cellValue) => cellValue ? cellValue : '-'"
                        label="上网电量(千瓦时)">
                    </el-table-column>
                    <el-table-column
                        width="133"
                        prop="real_hours_h"
                        align="right"
                        sortable="custom"
                        :formatter="(row, column, cellValue) => cellValue ? cellValue : '-'"
                        label="发电小时数(h)">
                    </el-table-column>
                </el-table>
                <div v-if="!getRunKWPowerList.loading && (!getRunKWPowerList.res.body.data || getRunKWPowerList.res.body.data.length === 0)">暂无数据</div>
            </div>
            <div style="margin-top:15px;text-align:center;">
                <solway-pagination
                    class="custom_dark1"
                    :page-index="getRunKWPowerList.res.body.pageIndex"
                    :page-size="getRunKWPowerList.res.body.pageSize"
                    :total="getRunKWPowerList.res.body.total"
                    @change="data => getRunKWPowerList.getData(data)">
                </solway-pagination>
            </div>
        </div>
        <div v-if="showModel === 'graph'" class="graph-model">
            <div>
                <el-select v-model="optionKey" class="custom_dark1" filterable placeholder="请选择" @change="drawGraph()">
                    <el-option
                        v-for="item in yAxisList"
                        :key="item.v"
                        :label="item.name"
                        :value="item.v">
                    </el-option>
                </el-select>
                <div class="sort" @click="sortBy({normal: 'desc', desc: 'asc', asc: 'normal'}[sortType])">
                    <i v-show="sortType === 'normal'" class="iconfont icon-paixu"></i>
                    <i v-show="sortType === 'desc'" class="iconfont icon-xiangxiajiantou-"></i>
                    <i v-show="sortType === 'asc'" class="iconfont icon-xiangshangjiantou-"></i>
                </div>
            </div>
            <div class="chart-con" v-loading="getRunKWPowerLine.loading">
                <ve-histogram
                    v-if="chartData.rows"
                    v-loading="getRunKWPowerLine.loading"
                    :data="chartData"
                    :after-config="afterConfig"
                    :data-zoom="dataZoom"
                    height='100%'
                ></ve-histogram>
            </div>
        </div>
    </div>
</template>

<script>
import {api＿getRunKWPowerList, api＿getRunKWPowerLine, api＿getRunKWPower, api＿queryStWithTree} from '@/request/henanApi'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import solwayPagination from '@/components/pagination'
import 'echarts/lib/component/dataZoom'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/markLine'
import {Table, TableColumn, Select, Option, Input, Button} from 'element-ui'
export default {
    mixins: [mixinWidthHeight],
    data () {
        return {
            showModel: 'table',
            investDate: new Date(),
            intervalOverview: null,
            productionDate1: null,
            productionDate2: null,
            keywords: '',
            investor: null,
            data: {},
            tableData: [],
            sortColumn: '',
            sortType: 'normal',
            optionKey: 'inst_kw',
            yAxisList: [{'v': 'inst_kw', 'name': '装机容量'}, {'v': 'real_kwh_chk', 'name': '实发电量'}, {'v': 'send_kwh_chk', 'name': '上网电量'}, {'v': 'real_hours', 'name': '发电小时数'}, {'v': 'p', 'name': '实时功率'}, {'v': 'pr', 'name': '发电效率'}],
            optionMap: {'inst_kw': '装机容量', 'real_kwh_chk': '实发电量', 'send_kwh_chk': '上网电量', 'real_hours': '发电小时数', 'p': '实时功率', 'pr': '发电效率'},
            chartData: {},
            graphData: [],
            concatGraphData: [],
            maxLength: 6,
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
            getRunKWPower: api＿getRunKWPower({
                later: true
            }),
            getRunKWPowerList: api＿getRunKWPowerList({
                later: true,
                onlyLatest: true,
                res: {
                    body: {
                        pageIndex: 1,
                        pageSize: 10,
                        keyWord: ''
                    }
                }
            }),
            getRunKWPowerLine: api＿getRunKWPowerLine({
                later: true,
                onlyLatest: true
            }),
            queryStWithTree: api＿queryStWithTree({})
        }
    },
    methods: {
        sortRange (data) {
            if (!data.order) {
                this.sortColumn = ''
                this.getTableData()
                return false
            }
            this.sortColumn = data.prop + ',' + (data.order === 'ascending' ? 'asc' : 'desc')
            this.getTableData()
        },
        changeModel (model, type = 'comm') {
            this.showModel = model
            if (model === 'table') this.getTableData(type)
            if (model === 'graph') this.getGraphData()
        },
        getBasicInfoData () {
            this.getRunKWPower.getData({queryType: 1, dateType: 3, date: new Date().Format('yyyy-MM-dd')}).then(res => {
                this.data = res?.body
            })
        },
        sortBy (sortType) {
            this.sortType = sortType
            this.drawGraph()
        },
        drawGraph () {
            let {optionMap, optionKey, sortType} = this
            let rows = []
            this.concatGraphData.sort((a, b) => {
                if (sortType === 'desc') return b[this.optionKey] - a[this.optionKey]
                if (sortType === 'asc') return a[this.optionKey] - b[this.optionKey]
                if (sortType === 'normal') {
                    this.concatGraphData = [...this.graphData]
                }
            })
            this.concatGraphData.map((v, i) => {
                rows.push({
                    '电站': v.st_name,
                    [optionMap[optionKey]]: v[optionKey]
                })
            })
            this.chartData = {
                columns: ['电站', optionMap[optionKey]],
                rows
            }
        },
        getTableData (type, data = {}) {
            let productionDate1 = this.productionDate1 ? new Date(this.productionDate1).Format('yyyy-MM-dd') : ''
            let productionDate2 = this.productionDate2 ? new Date(this.productionDate2).Format('yyyy-MM-dd') : ''
            if (type === 'search') data = {pageIndex: 0}
            this.getRunKWPowerList.getData({
                queryType: 1, dateType: 3, date: new Date().Format('yyyy-MM-dd'), usePage: 1, ids: this.investor, keyword: this.keywords, productionDate1, productionDate2, sort: this.sortColumn, ...data
            }).then(res => {
                this.tableData = res?.body?.data
            })
        },
        getGraphData () {
            let productionDate1 = this.productionDate1 ? new Date(this.productionDate1).Format('yyyy-MM-dd') : ''
            let productionDate2 = this.productionDate2 ? new Date(this.productionDate2).Format('yyyy-MM-dd') : ''
            this.getRunKWPowerLine.getData({queryType: 1, dateType: 3, dataType: 2, date: new Date().Format('yyyy-MM-dd'), ids: this.investor, keyword: this.keywords, productionDate1, productionDate2}).then(res => {
                let data = res?.body
                this.concatGraphData = []
                data.st_name.map((v, index) => {
                    this.concatGraphData.push({
                        inst_kw: data.inst_kw[index],
                        st_name: data.st_name[index],
                        real_kwh_chk: data.real_kwh_chk[index],
                        send_kwh_chk: data.send_kwh_chk[index],
                        real_hours: data.real_hours[index],
                        p: data.p[index],
                        pr: data.pr[index]
                    })
                })
                this.graphData = [...this.concatGraphData]
                this.drawGraph()
            })
        },
        afterConfig (options) {
            let stationNum = options.xAxis[0].data.length
            options.yAxis[0].nameTextStyle = {
                align: 'left'
            }
            this.yAxisList.map(v => {
                if (v.v === this.optionKey) { options.yAxis[0].name = v.name }
            })
            options.xAxis[0].axisLine = {
                show: true,
                lineStyle: {
                    color: 'rgba(47,191,203,0.7)',
                    width: 1
                }
            }
            options.xAxis[0].nameGap = 10
            options.xAxis[0].nameLocation = 'end'
            options.xAxis[0].name = '电站'

            new Array(1).fill(0).forEach((v, i) => {
                options.yAxis[i].axisLine = {
                    show: true,
                    lineStyle: {
                        color: 'rgba(47,191,203,0.7)',
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
                top: '40',
                bottom: '10',
                left: '10',
                right: '40'
            }
            options.series[0].symbol = 'none'
            options.series[0].type = 'bar'
            options.series[0].barWidth = 13
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
            new Array(2).fill(0).forEach((v, i) => {
                if (stationNum <= this.maxLength) {
                    this.dataZoom[i].end = 0
                } else {
                    this.dataZoom[i].end = Math.floor(this.maxLength / stationNum * 100)
                }
            })
            return options
        }
    },
    created () {
        this.intervalOverview = setInterval(() => {
            this.getBasicInfoData()
            this.changeModel(this.showModel)
        }, 30000)
        this.getBasicInfoData()
        this.changeModel(this.showModel)
    },
    destroyed () {
        this.intervalOverview && clearInterval(this.intervalOverview)
    },
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElSelect: Select,
        ElOption: Option,
        ElInput: Input,
        ElButton: Button,
        solwayPagination
    }
}
</script>
<style lang="scss">
.overview {
    @import '@comm/assets/themes/table/table_custom_dark1.scss';
    @import '@comm/assets/themes/input/input_custom_dark1.scss';
    @import '@comm/assets/themes/datepicker/datepicker_custom_dark1.scss';
    @import '@comm/assets/themes/pagination/pagination_custom_dark1.scss';
}
</style>
<style lang="scss" scoped>
.overview{
    color: #2FBFCB;
    height: 100%;
    padding: 0px 13px 15px;
    .light-blue{
        color:rgba(47,191,203,0.7);
    }
    .header-overview{
        line-height: 60px;
        .header-label{
            font-size:12px;
            margin-right:60px;
            color:rgba(47,191,203,0.7);
            .header-value{
                margin-left:2px;
                font-size:16px;
                color: #2FBFCB;
            }
        }
    }
    .search-conditions{
        line-height: 34px;
        margin-bottom:20px;
        .iconfont{
            font-size:23px;
            margin-right:29px;
            color: rgba(255,255,255,0.5);
            cursor: pointer;
            &.active{
                color: #2FBFCB;
            }
        }
        .label-name{
            color:rgba(47,191,203,1);
            margin-right:5px;
        }
    }
    .table-model{
        height: calc(100vh - 180px);
    }
    .graph-model{
        background: rgba(24, 48, 91, 0.5);
        height: calc(100vh - 130px);
        padding:10px;
        .sort {
            display: inline-block;
            width: 32px;
            height: 32px;
            text-align: center;
            line-height: 32px;
            vertical-align: middle;
            border-radius: 2px;
            margin-left: 10px;
            cursor: pointer;
            border:1px solid rgba(47, 191, 203, 0.5);
            i {
                font-size: 14px;
                color:rgba(47, 191, 203, 1);
            }
        }
        .chart-con{
            height: calc(100% - 40px);
        }
    }
}
</style>
