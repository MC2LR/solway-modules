<template>
    <div class="deviceListWpStation">
        <div class="header-con">
            <switch-station/>
            <el-button v-if="!isHenan" class="button-tab active">列表视图</el-button>
            <el-button v-if="!isHenan" class="button-tab" @click="$router.push({name: 'deviceMatrix', params: { menuIndex: $route.name }})">矩阵视图</el-button>
            <el-button v-if="!isHenan" class="button-tab" @click="$router.push({name: 'deviceLayoutView'})">布局视图</el-button>
            <div v-if="isHenan" class="defined-button active">列表视图</div>
            <div v-if="isHenan" class="defined-button" @click="$router.push({name: 'deviceMatrix', params: { menuIndex: $route.name }})">矩阵视图</div>
            <div v-if="isHenan" class="defined-button" @click="$router.push({name: 'deviceLayoutView'})">布局视图</div>
        </div>
        <div class="page-top">
            <el-input
                style="width:212px"
                placeholder="请设备号、名称"
                @keydown.enter.native="v => search({pageIndex: 0})"
                v-model="keyWord">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="search({pageIndex: 0})"></i>
            </el-input>
            <el-select v-model="deviceType"  @change="v => search({pageIndex: 0})" style="margin: 0 15px;width:120px;">
                <el-option v-for="dType in deviceTypeList" :key="dType.devid" :label="dType.devtype" :value="dType.devid"></el-option>
            </el-select>
            <div class="devicelist-status" v-if="getWpRunStatusInfoList.res.body.deviceStatusList[0]">
                <el-checkbox v-model="checkAll" @change="handleCheckAllChange" style="margin-right:18px;">
                    <span :style="{'color': theme.$pageStatusNameColor}">全选</span>
                    <span class="alarm-num" v-if="deviceType === '2'">{{getWpRunStatusInfoList.res.body.deviceStatusList[0]['wtCount'] || 0}}</span>
                </el-checkbox>
                <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
                    <el-checkbox v-for="st in statusArr" :label="st.val" :key="st.val" style="margin-right:18px;">
                        <span :style="{'color': theme.$pageStatusNameColor}">{{st.name}}</span>
                        <span class="alarm-num" v-if="st.val !== '099' && deviceType === '2'">{{getWpRunStatusInfoList.res.body.deviceStatusList[0][st.field] || 0}}</span>
                    </el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
        <div class="page-body" v-loading="!pageInterfaceObj.res">
            <!-- 风机 -->
            <el-table
                v-if="getRunRealDataWindTurbine.res.data && deviceType === '2'"
                border
                v-loading="getRunRealDataWindTurbine.loading"
                :data="getRunRealDataWindTurbine.res.data"
                :max-height="vh - 190"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column prop="statusDesc" label="状态" align="center" width="120" fixed>
                    <template slot-scope="scope">
                        <span v-if="scope.row.comm == '1'" class="data-grey">通讯中断</span>
                        <span v-else-if="scope.row.comm == '2'" class="data-grey">初始化</span>
                        <span v-else-if="scope.row.comm == '0' && scope.row.status == '1'" class="data-red">{{scope.row.statusDesc}}</span>
                        <span v-else-if="scope.row.comm == '0' && scope.row.status == '2'" class="data-yellow">{{scope.row.statusDesc}}</span>
                        <span v-else>{{scope.row.statusDesc}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="did" label="编号" align="center" width="80" fixed></el-table-column>
                <el-table-column prop="name" label="名称" align="center" width="140" fixed>
                    <template slot-scope="scope">
                        <span @click="openDevicePop(scope.row.sid, scope.row.did)" class="pointer" style="color: #2FBFCC;">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="dtime" label="时间" align="center" width="160" fixed :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue*1000).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
                <el-table-column prop="wdspd" label="机舱外风速(m/s)" align="center" width="140"></el-table-column>
                <el-table-column prop="extmp" label="机舱外温度(℃)" align="center" width="120"></el-table-column>
                <el-table-column prop="intltmp" label="机舱内温度(℃)" align="center" width="120"></el-table-column>
                <el-table-column prop="nacdirang" label="风向夹角(度)" align="center" width="120"></el-table-column>
                <el-table-column prop="rotspd" label="叶轮转速(rpm)" align="center" width="120"></el-table-column>
                <el-table-column prop="ptangvalbl1" label="叶片1桨距角" align="center" width="120"></el-table-column>
                <el-table-column prop="ptangvalbl2" label="叶片2桨距角" align="center" width="120"></el-table-column>
                <el-table-column prop="ptangvalbl3" label="叶片3桨距角" align="center" width="120"></el-table-column>
                <el-table-column prop="spd" label="发电机转速(rpm)" align="center" width="140"></el-table-column>
                <el-table-column prop="w" label="有功功率(kW)" align="center" width="120"></el-table-column>
                <el-table-column prop="var" label="无功功率(kW)" align="center" width="120"></el-table-column>
                <el-table-column prop="gntoptmpsta" label="发电机最高绕组温度(℃)" align="center" width="180"></el-table-column>
                <el-table-column prop="hz" label="频率值(Hz)" align="center" width="120"></el-table-column>
                <el-table-column prop="gripf" label="功率因数" align="center" width="120"></el-table-column>
                <el-table-column prop="trmtmpentgbxdrv" label="齿轮箱高速轴驱动端轴承温度(℃)" align="center" width="240"></el-table-column>
                <el-table-column prop="trmtmpentgbxnondrv" label="齿轮箱高速轴非驱动端轴承温度(℃)" align="center" width="250"></el-table-column>
                <el-table-column prop="trmtmpgbxoil" label="齿轮箱油温(℃)" align="center" width="120"></el-table-column>
                <el-table-column prop="ywdir" label="偏航角度(度)" align="center" width="120"></el-table-column>
                <el-table-column prop="daykwh" label="有功发电量日计(kWh)" align="center" width="170"></el-table-column>
                <el-table-column prop="totkwh" label="有功发电量总计(kWh)" align="center" width="170"></el-table-column>
            </el-table>
            <!-- 测风塔 -->
            <el-table
                v-if="getRunRealDataWindTower.res.data && deviceType === '1'"
                border
                v-loading="getRunRealDataWindTower.loading"
                :data="getRunRealDataWindTower.res.data"
                :max-height="vh - 190"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column prop="statusDesc" label="状态" align="center" width="120" fixed>
                    <template slot-scope="scope">
                        <span v-if="scope.row.comm == '1'" class="data-grey">通讯中断</span>
                        <span v-else-if="scope.row.comm == '2'" class="data-grey">初始化</span>
                        <span v-else-if="scope.row.comm == '0' && scope.row.status == '1'" class="data-red">{{scope.row.statusDesc}}</span>
                        <span v-else-if="scope.row.comm == '0' && scope.row.status == '2'" class="data-yellow">{{scope.row.statusDesc}}</span>
                        <span v-else>{{scope.row.statusDesc}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="did" label="编号" align="center" width="80" fixed></el-table-column>
                <el-table-column prop="name" label="名称" align="center" width="140" fixed>
                    <template slot-scope="scope">
                        <span @click="openDevicePop(scope.row.sid, scope.row.did)" class="pointer" style="color: #2FBFCC;">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="dtime" label="时间" align="center" width="160" fixed :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue*1000).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
                <el-table-column prop="sh1" label="测点1高度" align="center" width="140"></el-table-column>
                <el-table-column prop="ta1" label="测点1环境温度(℃)" align="center" width="160"></el-table-column>
                <el-table-column prop="h2o1" label="测点1湿度(%)" align="center" width="120"></el-table-column>
                <el-table-column prop="p1" label="测点1压力" align="center" width="120"></el-table-column>
                <el-table-column prop="ws1" label="测点1风速(m/s)" align="center" width="160"></el-table-column>
                <el-table-column prop="wsa1" label="测点1风速均值(m/s)" align="center" width="180"></el-table-column>
                <el-table-column prop="wd1" label="测点1风向(度)" align="center" width="120"></el-table-column>
                <el-table-column prop="sh2" label="测点2高度" align="center" width="120"></el-table-column>
                <el-table-column prop="ta2" label="测点2环境温度(℃)" align="center" width="140"></el-table-column>
                <el-table-column prop="h2o2" label="测点2湿度(%)" align="center" width="120"></el-table-column>
                <el-table-column prop="p2" label="测点2压力" align="center" width="120"></el-table-column>
                <el-table-column prop="ws2" label="测点2风速(m/s)" align="center" width="160"></el-table-column>
                <el-table-column prop="wsa2" label="测点2风速均值(m/s)" align="center" width="180"></el-table-column>
                <el-table-column prop="wd2" label="测点2风向(度)" align="center" width="120"></el-table-column>
                <el-table-column prop="sh3" label="测点3测点高度" align="center" width="140"></el-table-column>
                <el-table-column prop="ta3" label="测点3环境温度(℃)" align="center" width="180"></el-table-column>
                <el-table-column prop="h2o3" label="测点3湿度(%)" align="center" width="120"></el-table-column>
                <el-table-column prop="p3" label="测点3压力" align="center" width="120"></el-table-column>
                <el-table-column prop="ws3" label="测点3风速(m/s)" align="center" width="160"></el-table-column>
                <el-table-column prop="wsa3" label="测点3风速均值(m/s)" align="center" width="170"></el-table-column>
                <el-table-column prop="wd3" label="测点3风向(度)" align="center" width="120"></el-table-column>
                <el-table-column prop="sh4" label="测点4高度" align="center" width="120"></el-table-column>
                <el-table-column prop="ta4" label="测点4环境温度(℃)" align="center" width="160"></el-table-column>
                <el-table-column prop="h2o4" label="测点4湿度(%)" align="center" width="140"></el-table-column>
                <el-table-column prop="p4" label="测点4压力" align="center" width="120"></el-table-column>
                <el-table-column prop="ws4" label="测点4风速(m/s)" align="center" width="140"></el-table-column>
                <el-table-column prop="wsa4" label="测点4风速均值(m/s)" align="center" width="180"></el-table-column>
                <el-table-column prop="wd4" label="测点4风向(度)" align="center" width="120"></el-table-column>
                <el-table-column prop="sh5" label="测点5测点高度" align="center" width="120"></el-table-column>
                <el-table-column prop="ta5" label="测点5环境温度(℃)" align="center" width="140"></el-table-column>
                <el-table-column prop="h2o5" label="测点5湿度(%)" align="center" width="120"></el-table-column>
                <el-table-column prop="p5" label="测点5压力" align="center" width="120"></el-table-column>
                <el-table-column prop="ws5" label="测点5风速(m/s)" align="center" width="140"></el-table-column>
                <el-table-column prop="wsa5" label="测点5风速均值(m/s)" align="center" width="160"></el-table-column>
                <el-table-column prop="wd5" label="测点5风向(度)" align="center" width="120"></el-table-column>
                <el-table-column prop="sh6" label="测点6测点高度" align="center" width="120"></el-table-column>
                <el-table-column prop="ta6" label="测点6环境温度(℃)" align="center" width="150"></el-table-column>
                <el-table-column prop="h2o6" label="测点6湿度(%)" align="center" width="120"></el-table-column>
                <el-table-column prop="p6" label="测点6压力" align="center" width="120"></el-table-column>
                <el-table-column prop="ws6" label="测点6风速(m/s)" align="center" width="140"></el-table-column>
                <el-table-column prop="wsa6" label="测点6风速均值(m/s)" align="center" width="160"></el-table-column>
                <el-table-column prop="wd6" label="测点6风向(度)" align="center" width="120"></el-table-column>
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
import {api＿getRunRealDataWindTurbine, api＿getWpRunStatusInfoList, api＿getRunRealDataWindTower} from '@newEnergyCloud/request/api'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import devicePopUp from '@/components/devicePopUp'
import solwayPagination from '@/components/pagination'
import SwitchStation from '@/components/station/switchStation/switchStation'
import theme from '../theme/theme'
export default {
    mixins: [theme, mixinWidthHeight],
    data () {
        return {
            isHenan: process.env.isHenan === 'true',
            keyWord: '',
            deviceType: '',
            deviceTypeList: [{devid: '1', devtype: '测风塔'}, {devid: '2', devtype: '风机'}],
            statusArr: [{name: '正常', val: '01', field: 'wtRunCount'}, {name: '故障', val: '02', field: 'wtFaultCount'}, {name: '报警', val: '03', field: 'wtAlarmCount'}, {name: '中断', val: '04', field: 'wtBreakOffCount'}, {name: '待机', val: '05', field: 'wtStandbyCount'}, {name: '维护', val: '06', field: 'wtOperCount'}, {name: '其他', val: '099'}],
            checkAll: false,
            checkedStatus: [],
            intervalWpStation: null,
            pageInterfaceObj: {
                data: {
                    pageIndex: 1,
                    pageSize: 10,
                    keyWord: ''
                },
                res: {}
            },
            getRunRealDataWindTurbine: api＿getRunRealDataWindTurbine({
                later: true
            }),
            getWpRunStatusInfoList: api＿getWpRunStatusInfoList({
                later: true,
                res: {body: {deviceStatusList: []}}
            }),
            getRunRealDataWindTower: api＿getRunRealDataWindTower({
                later: true
            })
        }
    },
    methods: {
        search (data = {}) {
            let checkedArr = this.checkedStatus
            switch (this.deviceType) {
                case '1': // 测风塔
                    if (this.getRunRealDataWindTower.loading) return
                    this.getRunRealDataWindTower.getData({
                        search: this.keyWord,
                        status: (checkedArr.length === 7) ? '00,01,02,03,04,05,06,099' : (checkedArr.length ? checkedArr.map(v => v).join(',') : ''),
                        ...data
                    })
                    this.pageInterfaceObj = this.getRunRealDataWindTower
                    break
                case '2': // 风机
                    if (this.getRunRealDataWindTurbine.loading) return
                    this.getRunRealDataWindTurbine.getData({
                        search: this.keyWord,
                        status: (checkedArr.length === 7) ? '00,01,02,03,04,05,06,099' : (checkedArr.length ? checkedArr.map(v => v).join(',') : ''),
                        ...data
                    })
                    this.pageInterfaceObj = this.getRunRealDataWindTurbine
                    break
                default:
                    break
            }
        },
        deviceStatusNum () {
            this.getWpRunStatusInfoList.getData({
                queryType: 3,
                dateType: 3,
                date: new Date().Format('yyyy-MM-dd')
            })
        },
        // 全选
        handleCheckAllChange (val) {
            this.checkedStatus = val ? this.statusArr.map(v => v.val) : []
            this.search({pageIndex: 0})
        },
        // 其他状态
        handleCheckedStatusChange (value) {
            this.checkAll = value.length === this.statusArr.length
            this.search({pageIndex: 0})
        },
        init () {
            this.search()
            // 获取设备不同状态的数量
            if (this.deviceType === '2') {
                this.deviceStatusNum()
            }
        },
        openDevicePop (stid, eqid) {
            devicePopUp({stid, eqid})
        }
    },
    created () {
        this.deviceType = '2'
        this.checkAll = true
        this.checkedStatus = this.statusArr.map(v => v.val)
        // 切换电站
        this.$bus.on('stationChange', this.init)
        this.init()
    },
    mounted () {
        this.intervalWpStation = setInterval(() => {
            this.init()
        }, this.$store.getters.refresh_interval())
    },
    beforeDestroy () {
        this.intervalWpStation && clearInterval(this.intervalWpStation)
        this.$bus.off('stationChange', this.init)
    },
    components: {
        solwayPagination,
        SwitchStation
    }
}
</script>
<style lang="scss">
[data-pagetheme="darkBlue"] {
   .deviceListWpStation{
        @import '@comm/assets/themes/table/pageTheme/table_dark_blue1.scss';
        @import '@comm/assets/themes/input/pageTheme/input_dark_blue1.scss';
        @import '@comm/assets/themes/pagination/pageTheme/pagination_dark_blue1.scss';
        @import '@comm/assets/themes/button/pageTheme/button_dark_blue1.scss';
    }
}
[data-pagetheme="dark"] {
    .deviceListWpStation{
        @import '@comm/assets/themes/table/pageTheme/table_dark1.scss';
        @import '@comm/assets/themes/pagination/pageTheme/pagination_dark1.scss';
        @import '@comm/assets/themes/input/pageTheme/input_dark1.scss';
        @import '@comm/assets/themes/checkbox/pageTheme/checkbox_dark1.scss';
    }
}
[data-pagetheme="light"] {
    .deviceListWpStation{
        @import '@comm/assets/themes/table/pageTheme/table_light1.scss';
        @import '@comm/assets/themes/input/pageTheme/input_light1.scss';
        @import '@comm/assets/themes/button/pageTheme/button_light1.scss';
    }
}
</style>
<style lang="scss" scoped>
@import '../theme/theme.scss';
.deviceListWpStation{
    height: 100%;
    padding: 0px 10px 15px;
    .header-con{
        height: 60px;
        line-height: 60px;
        @include page_c(color, $pageHeaderLine);
        .defined-button{
            position:relative;
            display: inline-block;
            background-color: transparent;
            box-shadow: 0px 0px 9px rgba(56, 185, 207, 1) inset;
            line-height: 30px;
            color: rgba(40, 194, 221, 1);
            padding:0 13px;
            margin-right:27px;
            cursor: pointer;
            &.active{
                color: #fff;
                box-shadow:none;
                background-color: rgba(69, 228, 247,0.7);
            }
            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background: linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) left top no-repeat,
                            linear-gradient(to bottom, rgba(40,194,221, .5), rgba(40,194,221, .5)) left top no-repeat,
                            linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) right top no-repeat,
                            linear-gradient(to bottom, rgba(40,194,221, .5), rgba(40,194,221, .5)) right top no-repeat,
                            linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) left bottom no-repeat,
                            linear-gradient(to bottom, rgba(40,194,221, .5), rgba(40,194,221, .5)) left bottom no-repeat,
                            linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) right bottom no-repeat,
                            linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) right bottom no-repeat;
                background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
            }
        }
    }
    .pointer{
        cursor: pointer;
    }
    .el-icon-search{cursor: pointer;}
    .page-top{
        padding: 5px 0px;
        .devicelist-status {
            display: inline-block;
            @include page_c(background-color, $pageDeviceStatusBg);
            line-height: 30px;
            height: 30px;
            padding: 0px 18px;
            .el-checkbox-group {
                display: inline-block;
            }
            .alarm-num{
                position: relative;
                top: -19px;
                right: 8px;
                background: #ff7171;
                color: white;
                padding: 3px;
                border-radius: 7px;
                font-size: 12px;
                min-width: 22px;
                display: inline-block;
                text-align: center;
            }
        }
    }
    .page-body{
        height: calc(100vh - 170px);
        margin: 10px 0 0px;
        .data-grey {
            color: #657282;
        }
        .data-yellow {
            color: #f1b900;
        }
        .data-red {
            color: #e74c3c;
        }
    }
    .page-footer{
        text-align: center;
    }
}
</style>
