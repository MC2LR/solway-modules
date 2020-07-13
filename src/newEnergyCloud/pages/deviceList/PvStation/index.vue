<template>
    <div class="deviceList">
        <page-header></page-header>
        <div class="page-top">
            <el-input
                style="width:212px"
                placeholder="请设备号、名称"
                @keydown.enter.native="v => search({pageIndex: 0})"
                v-model="keyWord">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="search({pageIndex: 0})"></i>
            </el-input>
            <el-select v-model="deviceType"  @change="v => search({pageIndex: 0})" style="margin: 0 30px;width:120px;">
                <el-option v-for="dType in getDeviceTypeList.res.data" :key="dType.devid" :label="dType.devtype" :value="dType.devid"></el-option>
            </el-select>
            <device-status class="device-status" v-show="deviceType != '5'" :style="{'border':'1px solid ' + theme.$pageDeviceStatusBorderColor}" v-bind="{deviceType: deviceType}"></device-status>
        </div>
        <div class="page-body" v-loading="!pageInterfaceObj.res.total && pageInterfaceObj.res.total !== 0">
            <!-- 汇流箱-1 -->
            <el-table
                v-if="getRunRealDataBJunction.res.data && deviceType === '1'"
                border
                v-loading="getRunRealDataBJunction.loading"
                :data="getRunRealDataBJunction.res.data"
                :max-height="vh - 190"
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
                <el-table-column prop="name" label="名称" align="center" width="120" fixed>
                    <template slot-scope="scope">
                        <span @click="openDevicePop(scope.row.sid, scope.row.did)" :style="{'background': scope.row.shadeFlag ? 'rgba(172, 180, 187, 0.8)' : ''}" style="color: #2FBFCC;" class="pointer">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="dtime" label="时间" align="center" width="160" fixed :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue*1000).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
                <!-- <el-table-column v-for="(v, index) in (new Array(32).fill('c'))" :key="index" width="60"
                    :prop="v + (index + 1)" :label="(index + 1).toString()" align="center">
                </el-table-column> -->
                <el-table-column v-for="(v, index) in (new Array(32).fill('c'))" :key="index" width="60" :label="(index + 1).toString()" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.hasJB === '0'"></span>
                        <span v-if="scope.row.hasJB != '0'" :style="{'background': (scope.row.shadowFlags && scope.row.shadowFlags[index]) ? 'rgba(172, 180, 187, 0.8)' : ''}">
                            <span :class="{'handle3': scope.row.statuFlags[index] === 0, 'data-red': (scope.row.statuFlags && scope.row.statuFlags[index] === 1), 'data-yellow': (scope.row.statuFlags && scope.row.statuFlags[index] === 2)}">
                                <span v-if="scope.row.statuFlags && scope.row.statuFlags[index]">{{scope.row[v + (index + 1)]}}</span>
                                <span v-if="!(scope.row.statuFlags && scope.row.statuFlags[index])">-</span>
                            </span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="k" label="开关" align="center" width="120" :formatter="(row, column, cellValue) => ['无效', '无效', '闭合', '开启'][cellValue]"></el-table-column>
                <el-table-column prop="arrester" label="防雷器" align="center" width="120" :formatter="(row, column, cellValue) => ['无效', '无效', '正常', '异常'][cellValue]"></el-table-column>
                <el-table-column prop="u" label="电压(V)" align="center" width="120"></el-table-column>
                <el-table-column prop="c" label="电流(A)" align="center" width="120"></el-table-column>
                <el-table-column prop="p" label="功率(kW)" align="center" width="120"></el-table-column>
                <el-table-column prop="t" label="温度(℃)" align="center" width="120"></el-table-column>
                <el-table-column prop="ef" label="效率(%)" align="center" width="120"></el-table-column>
            </el-table>
            <!-- 逆变器-2 -->
            <el-table
                v-if="getRunRealDataBInverter.res.data && deviceType === '2'"
                border
                v-loading="getRunRealDataBInverter.loading"
                :data="getRunRealDataBInverter.res.data"
                :max-height="vh - 190"
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
                <el-table-column prop="name" label="名称" align="center" width="140" fixed>
                    <template slot-scope="scope">
                        <span @click="openDevicePop(scope.row.sid, scope.row.did)" :style="{'background': scope.row.shadeFlag ? 'rgba(172, 180, 187, 0.8)' : ''}" style="color: #2FBFCC;" class="pointer">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
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
                <el-table-column v-for="(v, index) in (new Array(32).fill('c'))" :key="index" width="60" :label="(index + 1).toString()" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.hasJB === '0'"></span>
                        <span v-if="scope.row.hasJB != '0'" :style="{'background': (scope.row.shadowFlags && scope.row.shadowFlags[index]) ? 'rgba(172, 180, 187, 0.8)' : ''}">
                            <span :class="{'handle3': scope.row.statuFlags[index] === 0, 'data-red': (scope.row.statuFlags && scope.row.statuFlags[index] === 1), 'data-yellow': (scope.row.statuFlags && scope.row.statuFlags[index] === 2)}">
                                <span v-if="scope.row.statuFlags && scope.row.statuFlags[index]">{{scope.row[v + (index + 1)]}}</span>
                                <span v-if="!(scope.row.statuFlags && scope.row.statuFlags[index])">-</span>
                            </span>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 箱变-3 -->
            <el-table
                v-if="getRunRealDataBBoxChange.res.data && deviceType === '3'"
                border
                v-loading="getRunRealDataBBoxChange.loading"
                :data="getRunRealDataBBoxChange.res.data"
                :max-height="vh - 190"
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
                <el-table-column prop="name" label="名称" align="center" width="120" fixed>
                    <template slot-scope="scope">
                        <span @click="openDevicePop(scope.row.sid, scope.row.did)" class="pointer" style="color: #2FBFCC;">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="dtime" label="时间" align="center" width="160" fixed :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue*1000).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
                <el-table-column prop="pa1" label="绕组1A相有功功率(kW)" align="center" width="120"></el-table-column>
                <el-table-column prop="pb1" label="绕组1B相有功功率(kW)" align="center" width="120"></el-table-column>
                <el-table-column prop="pc1" label="绕组1C相有功功率(kW)" align="center" width="120"></el-table-column>
                <el-table-column prop="qa1" label="绕组1A相无功功率(kVar)" align="center" width="120"></el-table-column>
                <el-table-column prop="qb1" label="绕组1B相无功功率(kVar)" align="center" width="120"></el-table-column>
                <el-table-column prop="qc1" label="绕组1C相无功功率(kVar)" align="center" width="120"></el-table-column>
                <el-table-column prop="ca1" label="绕组1A相电流(A)" align="center" width="120"></el-table-column>
                <el-table-column prop="cb1" label="绕组1B相电流(A)" align="center" width="120"></el-table-column>
                <el-table-column prop="cc1" label="绕组1C相电流(A)" align="center" width="120"></el-table-column>
                <el-table-column prop="ua1" label="绕组1A相电压(V)" align="center" width="120"></el-table-column>
                <el-table-column prop="ub1" label="绕组1B相电压(V)" align="center" width="120"></el-table-column>
                <el-table-column prop="uc1" label="绕组1C相电压(V)" align="center" width="120"></el-table-column>
                <el-table-column prop="f1" label="绕组1频率(Hz)" align="center" width="120"></el-table-column>
                <el-table-column prop="pf1" label="绕组1功率因数" align="center" width="120"></el-table-column>
                <el-table-column prop="w1" label="绕组1电量(kWh)" align="center" width="120"></el-table-column>
                <el-table-column prop="pa2" label="绕组2A相有功功率(kW)" align="center" width="120"></el-table-column>
                <el-table-column prop="pb2" label="绕组2B相有功功率(kW)" align="center" width="120"></el-table-column>
                <el-table-column prop="pc2" label="绕组2C相有功功率(kW)" align="center" width="120"></el-table-column>
                <el-table-column prop="qa2" label="绕组2A相无功功率(kVar)" align="center" width="120"></el-table-column>
                <el-table-column prop="qb2" label="绕组2B相无功功率(kVar)" align="center" width="120"></el-table-column>
                <el-table-column prop="qc2" label="绕组2C相无功功率(kVar)" align="center" width="120"></el-table-column>
                <el-table-column prop="ca2" label="绕组2A相电流(A)" align="center" width="120"></el-table-column>
                <el-table-column prop="cb2" label="绕组2B相电流(A)" align="center" width="120"></el-table-column>
                <el-table-column prop="cc2" label="绕组2C相电流(A)" align="center" width="120"></el-table-column>
                <el-table-column prop="ua2" label="绕组2A相电压(V)" align="center" width="120"></el-table-column>
                <el-table-column prop="ub2" label="绕组2B相电压(V)" align="center" width="120"></el-table-column>
                <el-table-column prop="uc2" label="绕组2C相电压(V)" align="center" width="120"></el-table-column>
                <el-table-column prop="f2" label="绕组2频率(Hz)" align="center" width="120"></el-table-column>
                <el-table-column prop="pf2" label="绕组2功率因数" align="center" width="120"></el-table-column>
                <el-table-column prop="w2" label="绕组2电量(kWh)" align="center" width="120"></el-table-column>
                <el-table-column prop="ta" label="A相温度(℃)" align="center" width="120"></el-table-column>
                <el-table-column prop="tb" label="B相温度(℃)" align="center" width="120"></el-table-column>
                <el-table-column prop="tc" label="C相温度(℃)" align="center" width="120"></el-table-column>
                <el-table-column prop="t" label="温度(℃)" align="center" width="120"></el-table-column>
            </el-table>
            <!-- 电表-4 -->
            <el-table
                v-if="getRunRealDataMeter.res.data && deviceType === '4'"
                border
                v-loading="getRunRealDataMeter.loading"
                :data="getRunRealDataMeter.res.data"
                :max-height="vh - 190"
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
                <el-table-column prop="name" label="名称" align="center" width="150" fixed>
                    <template slot-scope="scope">
                        <span @click="openDevicePop(scope.row.sid, scope.row.did)" class="pointer" style="color: #2FBFCC;">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="dtime" label="时间" align="center" width="160" fixed :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue*1000).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
                <el-table-column prop="w" label="总电能(度)" align="center" width="220"></el-table-column>
                <el-table-column prop="wp" label="正向总电能(度)" align="center" width="200"></el-table-column>
                <el-table-column prop="wn" label="反向总电能(度)" align="center" width="200"></el-table-column>
                <el-table-column prop="ua" label="A相电压(V)" align="center" width="180"></el-table-column>
                <el-table-column prop="ub" label="B相电压(V)" align="center" width="160"></el-table-column>
                <el-table-column prop="uc" label="C相电压(V)" align="center" width="160"></el-table-column>
                <el-table-column prop="ia" label="A相电流(A)" align="center" width="120"></el-table-column>
                <el-table-column prop="ib" label="B相电流(A)" align="center" width="120"></el-table-column>
                <el-table-column prop="ic" label="C相电流(A)" align="center" width="120"></el-table-column>
                <el-table-column prop="pa" label="A相功率(kW)" align="center" width="120"></el-table-column>
                <el-table-column prop="pb" label="B相功率(kW)" align="center" width="120"></el-table-column>
                <el-table-column prop="pc" label="C相功率(kW)" align="center" width="120"></el-table-column>
                <el-table-column prop="p" label="总有功功率(kW)" align="center" width="150"></el-table-column>
            </el-table>
            <!-- 气象-5 -->
            <el-table
                v-if="getRunRealDataWeather.res.data && deviceType === '5'"
                border
                v-loading="getRunRealDataWeather.loading"
                :data="getRunRealDataWeather.res.data"
                :max-height="vh - 190"
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
                <el-table-column prop="name" label="名称" align="center" width="120" fixed>
                    <template slot-scope="scope">
                        <span @click="openDevicePop(scope.row.sid, scope.row.did)" class="pointer" style="color: #2FBFCC;">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
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
        <div class="page-footer">
            <solway-pagination
                :page-index="pageInterfaceObj.res.pageIndex"
                :page-size="pageInterfaceObj.res.pageSize"
                :total="pageInterfaceObj.res.total"
                @change="search">
            </solway-pagination>
        </div>
    </div>
</template>

<script>
import PageHeader from './header'
import DeviceStatus from './status'
import solwayPagination from '@/components/pagination'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import devicePopUp from '@/components/devicePopUp'
import theme from '../theme/theme'
import {api＿getDeviceTypeList, api＿getRunRealDataBBoxChange, api＿getRunRealDataBInverter, api＿getRunRealDataBJunction, api＿getRunRealDataWeather, api＿getRunRealDataMeter} from '@newEnergyCloud/request/api'
export default {
    mixins: [mixinWidthHeight, theme],
    data () {
        return {
            keyWord: '',
            deviceType: '', // 设备类型
            status: '', // 设备状态码
            intervalBody: null,
            pageInterfaceObj: {
                data: {
                    pageIndex: 1,
                    pageSize: 10,
                    keyWord: ''
                },
                res: {}
            },
            getDeviceTypeList: api＿getDeviceTypeList({
                later: true,
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
        this.initDeviceList()
        // 切换电站
        this.$bus.on('stationChange', this.initDeviceList)
        // 监听改变状态
        this.$bus.on('status', v => this.changeStatus(v))
    },
    mounted () {
        this.intervalBody = setInterval(() => {
            this.search()
        }, this.$store.getters.refresh_interval())
    },
    methods: {
        search (data = {}) {
            let status = this.status
            switch (this.deviceType) {
                case '1': // 汇流箱
                    if (this.getRunRealDataBJunction.loading) return
                    this.getRunRealDataBJunction.getData({
                        search: this.keyWord,
                        status,
                        ...data
                    })
                    this.pageInterfaceObj = this.getRunRealDataBJunction
                    break
                case '2': // 逆变器
                    if (this.getRunRealDataBInverter.loading) return
                    this.getRunRealDataBInverter.getData({
                        search: this.keyWord,
                        status,
                        ...data
                    })
                    this.pageInterfaceObj = this.getRunRealDataBInverter
                    break
                case '3': // 箱变
                    if (this.getRunRealDataBBoxChange.loading) return
                    this.getRunRealDataBBoxChange.getData({
                        search: this.keyWord,
                        status,
                        ...data
                    })
                    this.pageInterfaceObj = this.getRunRealDataBBoxChange
                    break
                case '4': // 电表
                    if (this.getRunRealDataMeter.loading) return
                    this.getRunRealDataMeter.getData({
                        search: this.keyWord,
                        status,
                        ...data
                    })
                    this.pageInterfaceObj = this.getRunRealDataMeter
                    break
                case '5': // 气象
                    if (this.getRunRealDataWeather.loading) return
                    this.getRunRealDataWeather.getData({
                        search: this.keyWord,
                        status: '00',
                        ...data
                    })
                    this.pageInterfaceObj = this.getRunRealDataWeather
                    break
                default:
                    break
            }
        },
        initDeviceList () {
            this.getDeviceTypeList.getData().then(res => {
                this.deviceType = res.data[0].devid
                this.search()
            })
        },
        openDevicePop (stid, eqid) {
            devicePopUp({stid, eqid})
        },
        changeStatus (v) {
            this.status = v
            if (this.deviceType) {
                this.search({pageIndex: 0})
            }
        }
    },
    components: {
        PageHeader,
        DeviceStatus,
        solwayPagination
    },
    beforeDestroy () {
        this.deviceType = ''
        clearInterval(this.intervalBody)
        this.$bus.off('stationChange', this.initDeviceList)
        this.$bus.off('status', this.changeStatus)
    }
}
</script>
<style lang="scss">
[data-pagetheme="darkBlue"] {
   .deviceList{
        @import '@comm/assets/themes/table/pageTheme/table_dark_blue1.scss';
        @import '@comm/assets/themes/pagination/pageTheme/pagination_dark_blue1.scss';
        @import '@comm/assets/themes/input/pageTheme/input_dark_blue1.scss';
    }
}
[data-pagetheme="dark"] {
    .deviceList{
        @import '@comm/assets/themes/table/pageTheme/table_dark1.scss';
        @import '@comm/assets/themes/pagination/pageTheme/pagination_dark1.scss';
        @import '@comm/assets/themes/input/pageTheme/input_dark1.scss';
        @import '@comm/assets/themes/checkbox/pageTheme/checkbox_dark1.scss';
    }
}
[data-pagetheme="light"] {
    .deviceList{
        @import '@comm/assets/themes/table/pageTheme/table_light1.scss';
        @import '@comm/assets/themes/input/pageTheme/input_light1.scss';
    }
}
.deviceList{
    .el-checkbox {
        margin-right: 18px;
    }
    .el-table__body tr.hover-row > td {
        color: #fff;
    }
}
</style>
<style lang="scss" scoped>
@import '../theme/theme.scss';
.deviceList{
    height: 100%;
    padding: 0px 10px 15px;
    .pointer{
        cursor: pointer;
    }
    // .el-icon-search{cursor: pointer;}
    .page-top{
        padding: 5px 0px;
        .device-status{
            @include page_c(background-color, $pageDeviceStatusBg);
            line-height: 30px;
            height: 30px;
            padding: 0px 18px;
        }
    }
    .page-body{
        margin-top:10px;
        height: calc(100vh - 170px);
    }
    .page-footer{
        text-align: center;
    }
    .data-red {
        color: #e74c3c;
    }
    .data-yellow {
        color: #f1b900;
    }
    .handle3 {
        color: #cecece;
    }
}
</style>
