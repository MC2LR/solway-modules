<template>
    <div class="stationMonitoringList">
        <div class="header-con">
            <el-input v-model="keyWord" placeholder="请输入设备编号／名称" class="key-input">
                <el-button slot="append" class="el-icon-search" @click="search"></el-button>
            </el-input>
            <el-select
                v-model="deviceType"
                @change="search"
                placeholder="型号及规格">
                <el-option v-for="dType in getDeviceTypeList.res.data" :key="dType.devid" :label="dType.devtype" :value="dType.devid"></el-option>
            </el-select>
            <el-select v-if="deviceType !== '5'" v-model="status" clearable multiple placeholder="全部" collapse-tags @change="search">
                <el-option v-for="item in statusArr" :key="item.val" :label="item.name" :value="item.val"></el-option>
            </el-select>
            <my-paging
                size="small"
                v-if="pageInterfaceObj"
                style="float: right;color:#fff;"
                :pageSizeArr="[10, 20, 50, 100, 1000, 2000]"
                @change="data => pageInterfaceObj.getData(data)"
                v-bind="pageInterfaceObj.res"/>
        </div>
        <div style="margin-top:10px;">
            <el-table
                v-if="getRunRealDataBInverter.res.data && deviceType === '2'"
                border
                v-loading="getRunRealDataBInverter.loading"
                :data="getRunRealDataBInverter.res.data"
                :max-height="vh - 150"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column prop="statusDesc" label="状态" align="center" width="120" fixed>
                    <template slot-scope="scope">
                        <span v-if="scope.row.comm == '1'" class="data-grey">通讯中断</span>
                        <span v-else-if="scope.row.comm == '2'" class="data-grey">{{scope.row.statusDesc || '初始化'}}</span>
                        <span v-else-if="scope.row.comm == '0' && scope.row.status == '1'" class="data-red">{{scope.row.statusDesc}}</span>
                        <span v-else-if="scope.row.comm == '0' && scope.row.status == '2'" class="data-yellow">{{scope.row.statusDesc}}</span>
                        <span v-else>{{scope.row.statusDesc}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名称" align="center" width="120" fixed></el-table-column>
                <el-table-column prop="dtime" label="时间" align="center" width="160" fixed :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue*1000).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
                <el-table-column prop="dcu" label="DC电压(V)" align="center" width="120"></el-table-column>
                <el-table-column prop="dcc" label="DC电流(A)" align="center" width="120"></el-table-column>
                <el-table-column prop="dcp" label="DC功率(kW)" align="center" width="120"></el-table-column>
                <el-table-column prop="acu" label="AC电压(V)" align="center" width="120"></el-table-column>
                <el-table-column prop="acc" label="AC电流(A)" align="center" width="120"></el-table-column>
                <el-table-column prop="acp" label="AC功率(kW)" align="center" width="120"></el-table-column>
                <el-table-column prop="t" label="温度(℃)" align="center" width="120"></el-table-column>
                <el-table-column prop="ef" label="效率(%)" align="center" width="120"></el-table-column>
                <el-table-column prop="f" label="频率(Hz)" align="center" width="120"></el-table-column>
                <el-table-column prop="pf" label="功率因数" align="center" width="120"></el-table-column>
                <el-table-column prop="dw" label="日发电量(度)" align="center" width="120"></el-table-column>
                <el-table-column prop="tw" label="总发电量(度)" align="center" width="120"></el-table-column>
                <el-table-column v-for="(v, index) in (new Array(32).fill('c'))" :key="index" width="60"
                    :prop="v + (index + 1)" :label="(index + 1).toString()" align="center">
                </el-table-column>
            </el-table>
            <el-table
                v-if="getRunRealDataWeather.res.data && deviceType === '5'"
                border
                v-loading="getRunRealDataWeather.loading"
                :data="getRunRealDataWeather.res.data"
                :max-height="vh - 150"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column prop="statusDesc" label="状态" align="center" width="120" fixed>
                    <template slot-scope="scope">
                        <span v-if="scope.row.comm == '1'" class="data-grey">通讯中断</span>
                        <span v-else-if="scope.row.comm == '2'" class="data-grey">{{scope.row.statusDesc || '初始化'}}</span>
                        <span v-else-if="scope.row.comm == '0' && scope.row.status == '1'" class="data-red">{{scope.row.statusDesc}}</span>
                        <span v-else-if="scope.row.comm == '0' && scope.row.status == '2'" class="data-yellow">{{scope.row.statusDesc}}</span>
                        <span v-else>{{scope.row.statusDesc}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名称" align="center" width="120" fixed></el-table-column>
                <el-table-column prop="dtime" label="时间" align="center" width="160" fixed :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue*1000).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
                <el-table-column prop="lh" label="水平面光照强度瞬时值(W/㎡)" align="center" width="220"></el-table-column>
                <el-table-column prop="ls" label="散射光照强度瞬时值(W/㎡)" align="center" width="200"></el-table-column>
                <el-table-column prop="la" label="斜面光照强度瞬时值(W/㎡)" align="center" width="200"></el-table-column>
                <el-table-column prop="lhd" label="水平面光照日累计(kWh)" align="center" width="180"></el-table-column>
                <el-table-column prop="lsd" label="散射光照日累计(kWh)" align="center" width="160"></el-table-column>
                <el-table-column prop="lad" label="斜面光照日累计(kWh)" align="center" width="160"></el-table-column>
                <el-table-column prop="tm" label="组件温度(℃)" align="center" width="120"></el-table-column>
                <el-table-column prop="ta" label="环境温度(℃)" align="center" width="120"></el-table-column>
                <el-table-column prop="ws" label="风速(m/s)" align="center" width="120"></el-table-column>
                <el-table-column prop="wd" label="风向(°)" align="center" width="120"></el-table-column>
                <el-table-column prop="h2o" label="湿度(%)" align="center" width="120"></el-table-column>
                <el-table-column prop="p" label="气压(kPa)" align="center" width="120"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {api＿getDeviceTypeList, api＿getRunRealDataBBoxChange, api＿getRunRealDataBInverter, api＿getRunRealDataBJunction, api＿getRunRealDataWeather, api＿getRunRealDataMeter} from '@comprehensiveEnergy/request/api'
import {Table, TableColumn, Select, Option, Input, Button} from 'element-ui'
import MyPaging from '@comm/components/paging'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
    data () {
        return {
            keyWord: '', // 关键字
            deviceType: '', // 设备类型
            status: [],
            statusArr: [{name: '正常', val: '01'}, {name: '待机', val: '07'}, {name: '故障', val: '02'}, {name: '报警', val: '03'}, {name: '中断', val: '04'}],
            intervalTime: null,
            pageInterfaceObj: null,
            getDeviceTypeList: api＿getDeviceTypeList({
                res: {
                    data: []
                }
            }),
            getRunRealDataBBoxChange: api＿getRunRealDataBBoxChange({
                later: true,
                res: {
                    data: []
                }
            }),
            getRunRealDataBInverter: api＿getRunRealDataBInverter({
                later: true,
                res: {
                    data: []
                }
            }),
            getRunRealDataBJunction: api＿getRunRealDataBJunction({
                later: true,
                res: {
                    data: []
                }
            }),
            getRunRealDataWeather: api＿getRunRealDataWeather({
                later: true,
                res: {
                    data: []
                }
            }),
            getRunRealDataMeter: api＿getRunRealDataMeter({
                later: true,
                res: {
                    data: []
                }
            })
        }
    },
    created () {
        this.getDeviceTypeList.subscribe(res => {
            this.deviceType = res.data[0].devid
            this.search()
        })
        this.intervalTime = setInterval(this.search, this.$store.state.stationMonitoring.dataInterval)
    },
    methods: {
        search () {
            let statusArr = []
            this.statusArr.map(v => {
                if (this.status.includes(v.val)) statusArr.push(v.val)
            })
            let status = this.status.length ? (this.status.length === this.statusArr.length ? '00' : statusArr.join(',')) : '00'
            switch (this.deviceType) {
                case '1': // 汇流箱
                    if (this.getRunRealDataBJunction.loading) return
                    this.getRunRealDataBJunction.getData({
                        search: this.keyWord,
                        status
                    })
                    this.pageInterfaceObj = this.getRunRealDataBJunction
                    break
                case '2': // 逆变器
                    if (this.getRunRealDataBInverter.loading) return
                    this.getRunRealDataBInverter.getData({
                        search: this.keyWord,
                        status
                    })
                    this.pageInterfaceObj = this.getRunRealDataBInverter
                    break
                case '3': // 箱变
                    if (this.getRunRealDataBBoxChange.loading) return
                    this.getRunRealDataBBoxChange.getData({
                        search: this.keyWord,
                        status
                    })
                    this.pageInterfaceObj = this.getRunRealDataBBoxChange
                    break
                case '4': // 电表
                    if (this.getRunRealDataMeter.loading) return
                    this.getRunRealDataMeter.getData({
                        search: this.keyWord,
                        status
                    })
                    this.pageInterfaceObj = this.getRunRealDataMeter
                    break
                case '5': // 气象
                    if (this.getRunRealDataWeather.loading) return
                    this.getRunRealDataWeather.getData({
                        search: this.keyWord,
                        status: '00'
                    })
                    this.pageInterfaceObj = this.getRunRealDataWeather
                    break
                default:
                    break
            }
        }
    },
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElSelect: Select,
        ElOption: Option,
        ElButton: Button,
        ElInput: Input,
        MyPaging
    },
    beforeDestroy () {
        clearInterval(this.intervalTime)
    }
}
</script>

<style lang="scss" scoped>
.stationMonitoringList {
    padding: 10px 30px;
    height: calc(100vh - 67px);
    .data-grey {
        color: #657282;
    }
    .data-yellow {
        color: #f1b900;
    }
    .data-red {
        color: #e74c3c;
    }
    .header-con{
        // @include c(background-color, $bg_c7);
        // line-height: 60px;
        .key-input{
            width: 220px;
        }
    }
}
</style>
<style lang="scss">
@import '@comm/assets/themes/table/t1.scss';
.stationMonitoringList {
    .el-input__inner, .el-textarea__inner{
        font-size:12px;
        @include c(background-color, $bg_input_c1);
        @include c(border-color, $line_c1);
        @include c(color, $text_c2);
        &:focus, &:hover {
            @include c(border-color, $line_c1);
        }
    }
    .key-input .el-input__inner, .key-input .el-textarea__inner{
        border-right: none;
    }
    .el-input-group__append{
        cursor: pointer;
        font-size:12px;
        @include c(background-color, $bg_input_c1);
        @include c(border-color, $line_c1);
        @include c(color, $text_c2);
        border-left:none;
        .el-icon-search{
            font-size:16px;
        }
    }
    .el-table {
        border-color: transparent;
        .cell-style {
            border-color: transparent;
        }
        .header-cell-style {
            border-color: transparent;
        }
        .el-table__row:nth-child(2n+1){
            @include c(background-color, $bg_c8);
        }
        .el-table__row:nth-child(2n){
            @include c(background-color, $bg_c7);
        }
    }
}
</style>
