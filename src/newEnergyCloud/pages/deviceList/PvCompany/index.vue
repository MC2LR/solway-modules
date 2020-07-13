<template>
    <div class="deviceListPvCompany">
        <div class="header-con">
            <switch-station/>
            <div class="devicelist-status" v-if="getRunStatusInfoList.res.body">
                <el-checkbox v-model="checkAll" @change="handleCheckAllChange" style="margin-right:30px;">
                    <span :style="{'color': theme.$pageStatusNameColor}">全选</span>
                    <span :style="{'color': theme.$pageStatusNameColor}">{{getRunStatusInfoList.res.body.stCount['99'] || 0}}</span>
                </el-checkbox>
                <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
                    <el-checkbox v-for="st in statusArr" :label="st.val" :key="st.val" style="margin-right:30px;">
                        <span :style="{'color': theme.$pageStatusNameColor}">{{st.name}}</span>
                        <span v-if="st.name === '中断'" :style="{'color': theme.$pageStatusNameColor}">{{((getRunStatusInfoList.res.body.stCount['3'] || 0) + (getRunStatusInfoList.res.body.stCount['7'] || 0)) || 0}}</span>
                        <span v-if="st.name !== '中断'" :style="{'color': theme.$pageStatusNameColor}">{{getRunStatusInfoList.res.body.stCount[st.val] || 0}}</span>
                    </el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
        <div class="page-body" v-loading="!getRunStatusInfoList.res.body">
            <el-table
                v-if="getRunStatusInfoList.res.body"
                border
                v-loading="getRunStatusInfoList.loading"
                :data="getRunStatusInfoList.res.body.deviceStatusList"
                :max-height="vh - 70"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column prop="stName" label="电站名称">
                    <template slot-scope="scope">
                        <div @click="toStationPage(scope.row)" style="cursor:pointer;color:#2FBFCC;">
                            <div v-if="scope.row.st_comm === 1"><span>{{scope.row.stName || '-'}}</span><i title="通讯中断" class="iconfont icon-icon-life-alarm-copy" style="color:#9d9d9d;"></i></div>
                            <div v-else-if="scope.row.st_comm === 2"><span>{{scope.row.stName || '-'}}</span><i title="通讯初始化" class="iconfont icon-icon-life-alarm-copy" style="color:#9d9d9d"></i></div>
                            <div v-else-if="scope.row.st_status === 99"><span>{{scope.row.stName || '-'}}</span><i title="正常" class="iconfont icon-icon-life-alarm-copy" style="color: #52b876;"></i></div>
                            <div v-else-if="scope.row.st_status === 1"><span>{{scope.row.stName || '-'}}</span><i title="故障" class="iconfont icon-icon-life-alarm-copy" style="color: #ff6161;"></i></div>
                            <div v-else-if="scope.row.st_status === 2"><span>{{scope.row.stName || '-'}}</span><i title="报警" class="iconfont icon-icon-life-alarm-copy" style="color: #be9856;"></i></div>
                            <div v-else-if="scope.row.st_status === 7"><span>{{scope.row.stName || '-'}}</span><img title="部分中断" src="./status-half-break.png" style="position: absolute;right: 20px;width: 27px;" /></div>
                            <div v-else><span>{{scope.row.stName || '-'}}</span><i title="正常" class="iconfont icon-icon-life-alarm-copy" style="color: #52b876;"></i></div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="deviceCount" label="总台数" align="center" width="120"></el-table-column>
                <el-table-column prop="run" label="运行台数" align="center" width="120" :formatter="(row, column, cellValue) => row.st_comm === 1 ? '-' : cellValue"></el-table-column>
                <el-table-column prop="alarm" label="报警台数" align="center" width="120" :formatter="(row, column, cellValue) => row.st_comm === 1 ? '-' : cellValue"></el-table-column>
                <el-table-column prop="wait" label="待机" align="center" width="120" :formatter="(row, column, cellValue) => row.st_comm === 1 ? '-' : cellValue"></el-table-column>
                <el-table-column prop="fault" label="故障" align="center" width="120" :formatter="(row, column, cellValue) => row.st_comm === 1 ? '-' : cellValue"></el-table-column>
                <el-table-column prop="comm" label="离线" align="center" width="120" :formatter="(row, column, cellValue) => row.st_comm === 1 ? '-' : cellValue"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {api＿getRunStatusInfoList} from '@newEnergyCloud/request/api'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import SwitchStation from '@/components/station/switchStation/switchStation'
import theme from '../theme/theme'
export default {
    mixins: [theme, mixinWidthHeight],
    data () {
        return {
            statusArr: [{name: '正常', val: '0'}, {name: '故障', val: '1'}, {name: '报警', val: '2'}, {name: '中断', val: '3,7'}, {name: '初始化', val: '4'}, {name: '未知', val: '5'}, {name: '未接入', val: '6'}],
            checkAll: false,
            checkedStatus: [],
            intervalPvCom: null,
            getRunStatusInfoList: api＿getRunStatusInfoList({
                later: true
            })
        }
    },
    methods: {
        initData () {
            let checkedArr = this.checkedStatus
            this.getRunStatusInfoList.getData({
                queryType: 1,
                dateType: 3,
                date: new Date().Format('yyyy-MM-dd'),
                status: (checkedArr.length === 7) ? '99' : (checkedArr.length ? checkedArr.map(v => v).join(',') : '-1')
            })
        },
        // 全选
        handleCheckAllChange (val) {
            this.checkedStatus = val ? this.statusArr.map(v => v.val) : []
            this.initData()
        },
        // 其他状态
        handleCheckedStatusChange (value) {
            this.checkAll = value.length === this.statusArr.length
            this.initData()
        },
        toStationPage (row) {
            let data = {
                id: row.stid,
                stClass: '01',
                dataType: 0
            }
            this.$store.dispatch('station/changeStation', data)
        }
    },
    created () {
        this.checkAll = true
        this.checkedStatus = this.statusArr.map(v => v.val)
        // 切换公司
        this.$bus.on('stationChange', this.initData)
        this.initData()
    },
    mounted () {
        this.intervalPvCom = setInterval(() => {
            this.initData()
        }, this.$store.getters.refresh_interval())
    },
    beforeDestroy () {
        this.intervalPvCom && clearInterval(this.intervalPvCom)
        this.$bus.off('stationChange', this.initData)
    },
    components: {
        SwitchStation
    }
}
</script>
<style lang="scss">
[data-pagetheme="darkBlue"] {
   .deviceListPvCompany{
        @import '@comm/assets/themes/table/pageTheme/table_dark_blue1.scss';
    }
}
[data-pagetheme="dark"] {
    .deviceListPvCompany{
        @import '@comm/assets/themes/table/pageTheme/table_dark1.scss';
    }
}
// [data-pagetheme="light"] {
//     .deviceListPvCompany{
//         @import '@comm/assets/themes/table/pageTheme/table_light1.scss';
//     }
// }
</style>
<style lang="scss" scoped>
@import '../theme/theme.scss';
.deviceListPvCompany{
    height: 100%;
    padding: 0px 10px 15px;
    .header-con{
        height: 60px;
        line-height: 60px;
        @include page_c(color, $pageHeaderLine);
    }
    .devicelist-status{
        display: inline-block;
        padding-left:28px;
        .el-checkbox-group {
            display: inline-block;
        }
        .alarm-num{
            margin-right:30px;
        }
    }
    .page-body{
        .icon-icon-life-alarm-copy{
            position: absolute;
            right: 20px;
            font-size: 26px;
        }
    }
}
</style>
