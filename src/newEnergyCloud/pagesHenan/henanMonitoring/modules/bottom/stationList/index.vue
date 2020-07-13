<template>
    <div class="henanMonitoring-stationList">
        <div class="page-top">
            <el-input
                class="custom_dark1"
                style="width:212px;margin-left: 180px"
                placeholder="请输入电站名称"
                @keydown.enter.native="v => search()"
                v-model="keyWord">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="search()"></i>
            </el-input>
            <station-status class="station-status"></station-status>
        </div>
        <div class="page-body">
            <el-table
                :class="[vw >= 1920 ? '' : 'smallPadding']"
                v-if="getRunStatusInfoList.res && getRunStatusInfoList.res.body"
                border
                v-loading="getRunStatusInfoList.loading"
                :data="getRunStatusInfoList.res.body.deviceStatusList"
                :max-height="detailFullPage ? vh - 360 + 214 : vh - 360"
                @cell-click='cellClick'
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column prop="stName" label="电站名称" align="center" width="280">
                    <template slot-scope="scope">
                        <span v-if="scope.row.st_comm == 1" style="display: inline-block;width: 100%;padding: 0 15px;">
                            <a href="javascript:;" style="cursor:pointer;float: left;">{{scope.row.stName}}</a>
                            <i title="通讯中断" class="iconfont henanicon-life-alarm-copy" style="color: #9d9d9d;cursor:pointer;font-size:32px;line-height: 20px;vertical-align: text-bottom;float: right;"></i>
                        </span>
                        <span v-else-if="scope.row.st_comm == 2" style="display: inline-block;width: 100%;padding: 0 15px;">
                            <a href="javascript:;" style="cursor:pointer;float: left;">{{scope.row.stName}}</a>
                            <i title="通讯初始化" class="iconfont henanicon-life-alarm-copy" style="color: #9d9d9d;cursor:pointer;font-size:32px;line-height: 20px;vertical-align: text-bottom;float: right;"></i>
                        </span>
                        <span v-else-if="scope.row.st_status == 99" style="display: inline-block;width: 100%;padding: 0 15px;">
                            <a href="javascript:;" style="cursor:pointer;float: left;">{{scope.row.stName}}</a>
                            <i title="正常" class="iconfont henanicon-life-alarm-copy" style="color: #52b876;cursor:pointer;font-size:32px;line-height: 20px;vertical-align: text-bottom;float: right;"></i>
                        </span>
                        <span v-else-if="scope.row.st_status == 1" style="display: inline-block;width: 100%;padding: 0 15px;">
                            <a href="javascript:;" style="cursor:pointer;float: left;">{{scope.row.stName}}</a>
                            <i title="故障" class="iconfont henanicon-life-alarm-copy" style="color: #ff6161;cursor:pointer;font-size:32px;line-height: 20px;vertical-align: text-bottom;float: right;"></i>
                        </span>
                        <span v-else-if="scope.row.st_status == 2" style="display: inline-block;width: 100%;padding: 0 15px;">
                            <a href="javascript:;" style="cursor:pointer;float: left;">{{scope.row.stName}}</a>
                            <i title="报警" class="iconfont henanicon-life-alarm-copy" style="color: #be9856;cursor:pointer;font-size:32px;line-height: 20px;vertical-align: text-bottom;float: right;"></i>
                        </span>
                        <span v-else-if="scope.row.st_status == 7" style="display: inline-block;width: 100%;padding: 0 15px;">
                            <a href="javascript:;" style="cursor:pointer;float: left;">{{scope.row.stName}}</a>
                            <i title="部分中断" class="iconfont henanyibanyiban-" style="color: #be9856;cursor:pointer;font-size:32px;line-height: 20px;vertical-align: text-bottom;float: right;"></i>
                        </span>
                        <span v-else style="display: inline-block;width: 100%;padding: 0 15px;">
                            <a href="javascript:;" style="cursor:pointer;float: left;">{{scope.row.stName}}</a>
                            <i title="正常" class="iconfont henanicon-life-alarm-copy" style="color: #52b876;cursor:pointer;font-size:32px;line-height: 20px;vertical-align: text-bottom;float: right;"></i>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="deviceCount" label="总台数" align="center" width="120">
                    <template slot-scope="scope">
                        <span class="pointer">{{Number(scope.row.comm) + Number(scope.row.fault) + Number(scope.row.maintain) + Number(scope.row.run) + Number(scope.row.wait)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="run" label="运行台数" align="center" width="120">
                    <template slot-scope="scope">
                        <span class="pointer">{{scope.row.st_comm == 1 ? '-' : scope.row.run + ''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="alarm" label="报警台数" align="center" width="120">
                    <template slot-scope="scope">
                        <span class="pointer">{{scope.row.st_comm == 1 ? '-' : scope.row.alarm + ''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="wait" label="待机" align="center" width="120">
                    <template slot-scope="scope">
                        <span class="pointer">{{scope.row.st_comm == 1 ? '-' : scope.row.wait + ''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="fault" label="故障" align="center" width="120">
                    <template slot-scope="scope">
                        <span class="pointer">{{scope.row.st_comm == 1 ? '-' : scope.row.fault + ''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="comm" label="离线" align="center" width="120">
                    <template slot-scope="scope">
                        <span class="pointer">{{scope.row.st_comm == 1 ? '-' : scope.row.comm + ''}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <img :src="detailFullPage ? require('./img/bottom.png') : require('./img/top.png')" alt="" class="scale-icon" :title="detailFullPage ? '缩小': '放大'" @click="detailFullPage = !detailFullPage;$bus.emit('detailFullPage',detailFullPage)">
    </div>
</template>

<script>
import stationStatus from './status'
import solwayPagination from '@/components/pagination'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import { api＿getRunStatusInfoList } from '@newEnergyCloud/request/api'

export default {
    mixins: [mixinWidthHeight],
    components: {
        stationStatus,
        solwayPagination
    },
    data () {
        return {
            detailFullPage: false,
            keyWord: '',
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
            getRunStatusInfoList: api＿getRunStatusInfoList({
                later: true,
                res: {
                    body: {
                        deviceStatusList: []
                    }
                }
            })
        }
    },
    created () {
        this.status = 99
        this.search()
        // 切换电站
        this.$bus.on('stationChange', this.search)
        // 监听改变状态
        this.$bus.on('stationListStatus', v => this.changeStatus(v))
    },
    mounted () {
        this.intervalBody = setInterval(() => {
            this.search()
        }, this.$store.getters.refresh_interval())
    },
    beforeDestroy () {
        this.intervalBody && clearInterval(this.intervalBody)
        this.$bus.off('stationChange', this.search)
        this.$bus.off('stationListStatus', this.changeStatus)
    },
    methods: {
        // 放大显示详情操作
        switchDetailFullPage () {
            this.detailFullPage = !this.detailFullPage
        },
        search () {
            if (this.getRunStatusInfoList.loading) return
            this.getRunStatusInfoList.getData({
                keyword: this.keyWord,
                queryType: 1,
                dateType: 3,
                date: new Date().Format('yyyy-MM-dd'),
                status: this.status
            }).then(res => {
                this.$bus.emit('stationList', res)
            })
        },
        changeStatus (v) {
            this.status = v
            this.search()
        },
        // 点击电站名字
        cellClick (row, column, cell, event) {
            if (column.property === 'stName') {
                let data = {
                    id: row.stid,
                    stClass: '01',
                    dataType: 0
                }
                this.$store.dispatch('station/changeStation', data)
             }
        }
    }
}
</script>

<style lang="scss">
.henanMonitoring-stationList {
    @import '@comm/assets/themes/table/table_custom_dark1.scss';
    @import '@comm/assets/themes/input/input_custom_dark1.scss';
    @import '@comm/assets/themes/datepicker/datepicker_custom_dark1.scss';
    @import '@comm/assets/themes/pagination/pagination_custom_dark1.scss';
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
.henanMonitoring-stationList {
    height: 100%;
    padding: 0px 30px 15px;
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
        .station-status{
            line-height: 30px;
            height: 34px;
            padding: 0px 18px;
            padding-right: 0;
            margin-left: 20px;
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
