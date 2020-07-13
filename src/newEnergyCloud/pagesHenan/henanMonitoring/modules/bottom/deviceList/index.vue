<template>
    <div class="henanMonitoring-deviceList">
        <div class="page-top">
            <el-input
                class="custom_dark1"
                style="width: 212px"
                :style="{'margin-left': !isStation ? '180px' : '110px'}"
                placeholder="请输入设备号、名称"
                @keydown.enter.native="v => search({pageIndex: 0})"
                v-model="keyWord">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="search()"></i>
            </el-input>
            <el-select class="custom_dark1" v-model="deviceType" @change="v => search({pageIndex: 0})" style="margin: 0 30px;width:120px;">
                <el-option v-for="dType in getDeviceTypeList.res.data" :key="dType.devid" :label="dType.devtype" :value="dType.devid"></el-option>
            </el-select>
            <device-status class="device-status" v-show="deviceType != '5'" v-bind="{deviceType: deviceType}"></device-status>
        </div>
        <div class="page-body">
            <!-- 汇流箱 -->
            <el-table
                :class="[vw >= 1920 ? '' : 'smallPadding']"
                v-show="getRunRealDataBJunction.res.data && deviceType === '1'"
                border
                v-loading="getRunRealDataBJunction.loading"
                :data="getRunRealDataBJunction.res.data"
                :max-height="detailFullPage ? vh - 405 + 214 : vh - 405"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column prop="stationName" label="电站名称" align="center" width="220" fixed></el-table-column>
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
                        <span @click="openDevicePop(scope.row.sid, scope.row.did)" :style="{'background': scope.row.shadeFlag ? 'rgba(172, 180, 187, 0.8);' : ''}" class="pointer">{{scope.row.name}}</span>
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
                <el-table-column prop="p" label="功率(千瓦)" align="center" width="120"></el-table-column>
                <el-table-column prop="t" label="温度(℃)" align="center" width="120"></el-table-column>
                <el-table-column prop="ef" label="效率(%)" align="center" width="120"></el-table-column>
            </el-table>
            <!-- 逆变器 -->
            <el-table
                :class="[vw >= 1920 ? '' : 'smallPadding']"
                v-show="getRunRealDataBInverter.res.data && deviceType === '2'"
                border
                v-loading="getRunRealDataBInverter.loading"
                :data="getRunRealDataBInverter.res.data"
                :max-height="detailFullPage ? vh - 405 + 214 : vh - 405"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">

                <el-table-column prop="stationName" label="电站名称" align="center" width="220" fixed></el-table-column>
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
                        <span @click="openDevicePop(scope.row.sid, scope.row.did)" :style="{'background': scope.row.shadeFlag ? 'rgba(172, 180, 187, 0.8);' : ''}" class="pointer">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="dtime" label="时间" align="center" width="160" fixed :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue*1000).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
                <el-table-column prop="dcu" label="DC电压(V)" align="center" width="120"></el-table-column>
                <el-table-column prop="dcc" label="DC电流(A)" align="center" width="120"></el-table-column>
                <el-table-column prop="dcp" label="DC功率(千瓦)" align="center" width="120"></el-table-column>
                <el-table-column prop="acu" label="AC电压(V)" align="center" width="120"></el-table-column>
                <el-table-column prop="acc" label="AC电流(A)" align="center" width="120"></el-table-column>
                <el-table-column prop="acp" label="AC功率(千瓦)" align="center" width="120"></el-table-column>
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
            <!-- 箱变 -->
            <el-table
                :class="[vw >= 1920 ? '' : 'smallPadding']"
                v-if="getRunRealDataBBoxChange.res.data && deviceType === '3'"
                border
                v-loading="getRunRealDataBBoxChange.loading"
                :data="getRunRealDataBBoxChange.res.data"
                :max-height="detailFullPage ? vh - 405 + 214 : vh - 405"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column prop="stationName" label="电站名称" align="center" width="220" fixed></el-table-column>
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
                        <span @click="openDevicePop(scope.row.sid, scope.row.did)" class="pointer">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="dtime" label="时间" align="center" width="160" fixed :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue*1000).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
                <el-table-column prop="pa1" label="绕组1A相有功功率(千瓦)" align="center" width="120"></el-table-column>
                <el-table-column prop="pb1" label="绕组1B相有功功率(千瓦)" align="center" width="120"></el-table-column>
                <el-table-column prop="pc1" label="绕组1C相有功功率(千瓦)" align="center" width="120"></el-table-column>
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
                <el-table-column prop="w1" label="绕组1电量(千瓦时)" align="center" width="120"></el-table-column>
                <el-table-column prop="pa2" label="绕组2A相有功功率(千瓦)" align="center" width="120"></el-table-column>
                <el-table-column prop="pb2" label="绕组2B相有功功率(千瓦)" align="center" width="120"></el-table-column>
                <el-table-column prop="pc2" label="绕组2C相有功功率(千瓦)" align="center" width="120"></el-table-column>
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
                <el-table-column prop="w2" label="绕组2电量(千瓦时)" align="center" width="120"></el-table-column>
                <el-table-column prop="ta" label="A相温度(℃)" align="center" width="120"></el-table-column>
                <el-table-column prop="tb" label="B相温度(℃)" align="center" width="120"></el-table-column>
                <el-table-column prop="tc" label="C相温度(℃)" align="center" width="120"></el-table-column>
                <el-table-column prop="t" label="温度(℃)" align="center" width="120"></el-table-column>
            </el-table>
            <!-- 电表 -->
            <el-table
                :class="[vw >= 1920 ? '' : 'smallPadding']"
                v-if="getRunRealDataMeter.res.data && deviceType === '4'"
                border
                v-loading="getRunRealDataMeter.loading"
                :data="getRunRealDataMeter.res.data"
                :max-height="detailFullPage ? vh - 405 + 214 : vh - 405"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column prop="stationName" label="电站名称" align="center" width="220" fixed></el-table-column>
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
                        <span @click="openDevicePop(scope.row.sid, scope.row.did)" class="pointer">{{scope.row.name}}</span>
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
                <el-table-column prop="pa" label="A相功率(千瓦)" align="center" width="120"></el-table-column>
                <el-table-column prop="pb" label="B相功率(千瓦)" align="center" width="120"></el-table-column>
                <el-table-column prop="pc" label="C相功率(千瓦)" align="center" width="120"></el-table-column>
                <el-table-column prop="p" label="总有功功率(千瓦)" align="center" width="150"></el-table-column>
            </el-table>
            <!-- 气象 -->
            <el-table
                :class="[vw >= 1920 ? '' : 'smallPadding']"
                v-if="getRunRealDataWeather.res.data && deviceType === '5'"
                border
                v-loading="getRunRealDataWeather.loading"
                :data="getRunRealDataWeather.res.data"
                :max-height="detailFullPage ? vh - 405 + 214 : vh - 405"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column prop="stationName" label="电站名称" align="center" width="220" fixed></el-table-column>
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
                        <span @click="openDevicePop(scope.row.sid, scope.row.did)" class="pointer">{{scope.row.name}}</span>
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
            <!-- 空数据 -->
            <el-table
                :class="[vw >= 1920 ? '' : 'smallPadding']"
                v-if="deviceType === ''"
                border
                :data="[]"
                :max-height="detailFullPage ? vh - 405 + 214 : vh - 405"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column prop="stationName" label="电站名称" align="center" width="350"></el-table-column>
                <el-table-column prop="statusDesc" label="状态" align="center"></el-table-column>
                <el-table-column prop="name" label="名称" align="center"></el-table-column>
                <el-table-column prop="dtime" label="时间" align="center" width="300"></el-table-column>
            </el-table>
        </div>
        <div class="page-footer">
            <solway-pagination
                class="custom_dark1"
                :page-index="pageInterfaceObj.res.pageIndex"
                :page-size="pageInterfaceObj.res.pageSize"
                :total="pageInterfaceObj.res.total"
                @change="search">
            </solway-pagination>
        </div>
        <img :src="detailFullPage ? require('./img/bottom.png') : require('./img/top.png')" alt="" class="scale-icon" :title="detailFullPage ? '缩小': '放大'" @click="detailFullPage = !detailFullPage;$bus.emit('detailFullPage',detailFullPage)">
    </div>
</template>

<script>
import DeviceStatus from './status'
import DeviceTabs from '../tab'
import solwayPagination from '@/components/pagination'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import devicePopUp from '@/components/devicePopUp'
import {api＿getDeviceTypeList, api＿getRunRealDataBBoxChange, api＿getRunRealDataBInverter, api＿getRunRealDataBJunction, api＿getRunRealDataWeather, api＿getRunRealDataMeter} from '@newEnergyCloud/request/api'

export default {
    mixins: [mixinWidthHeight],
    components: {
        DeviceStatus,
        DeviceTabs,
        solwayPagination
    },
    data () {
        return {
            isStation: true,
            detailFullPage: false,
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
    beforeDestroy () {
        this.deviceType = ''
        this.intervalBody && clearInterval(this.intervalBody)
        this.$bus.off('stationChange', this.initDeviceList)
        this.$bus.off('status', this.changeStatus)
    },
    methods: {
        // 放大显示详情操作
        switchDetailFullPage () {
            this.detailFullPage = !this.detailFullPage
        },
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
            this.isStation = this.$store.getters.station_type === 0
            this.getDeviceTypeList.getData().then(res => {
                if (this.$store.getters.station_id === 0) {
                    res.data = [{devid: '2', devtype: '逆变器'}]
                }
                this.deviceType = res.data[0] ? res.data[0].devid : ''
                // if (!this.deviceType) {
                //     this.deviceType = '1'
                //     this.getRunRealDataBJunction.res.data = []
                //     return
                // }
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
    }
}
</script>

<style lang="scss">
.henanMonitoring-deviceList {
    @import '@comm/assets/themes/table/table_custom_dark1.scss';
    @import '@comm/assets/themes/input/input_custom_dark1.scss';
    @import '@comm/assets/themes/datepicker/datepicker_custom_dark1.scss';
    @import '@comm/assets/themes/pagination/pagination_custom_dark1.scss';
    .el-checkbox {
        margin-right: 18px;
    }
    .el-table.smallPadding {
        th {
            padding: 6px 0;
        }
        td {
            padding: 5px 0;
        }
    }
}
</style>

<style lang="scss" scoped>
.henanMonitoring-deviceList {
    height: 100%;
    padding: 0px 30px 15px;
    padding-bottom: 0;
    position: relative;
    top: -39px;
    .pointer{
        cursor: pointer;
    }
    .el-icon-search{cursor: pointer;}
    .scale-icon {
        position: absolute;
        right: 0;
        top: 44px;
        cursor: pointer;
        display: inline-block;
        width: 30px;
        height: 30px;
    }
    .page-top{
        padding: 5px 0px;
        .device-status{
            line-height: 30px;
            height: 34px;
            padding: 0px 18px;
            padding-right: 0;
            // margin-left: 20px;
            border: 1px solid rgba(52, 210, 238, 0.5);
            color: rgba(52, 210, 238, 0.5);
        }
    }
    .page-body{
        height: calc(100% - 76px);
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
