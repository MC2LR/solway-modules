<template>
    <div class="device-alarm">
        <div class="head clearfix">
            <div class="pull-left">
                <switch-station></switch-station>
            </div>
            <div class="filter pull-left">
                <el-form ref="Form" :inline='true' size="small">
                    <el-form-item>
                        <el-input
                        v-model="deviceLogListByPageAndThroughTimeNew.params.eventKeyword"
                        placeholder="请输入事件描述"
                        @keydown.enter.native="query()"
                        >
                            <i class="iconfont icon-iconfontsousuokuangsousuo" slot="suffix" @click="query()"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item v-if="baseSearchConditionGetStByRoleAndComIds.res.body.length" label="电站">
                          <el-select
                          v-model="stids"
                          filterable
                          clearable
                          multiple
                          collapse-tags
                          placeholder="全部"
                          @change="changeStations"
                          @clear="getDeviceByStIdsAndDeviceType.res.body = []"
                          >
                            <el-option
                            v-for="item in baseSearchConditionGetStByRoleAndComIds.res.body"
                            :key="item.busiId"
                            :label="item.name"
                            :value="item.busiId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备类型">
                          <el-select
                          v-model="deviceLogListByPageAndThroughTimeNew.params.deviceTypes"
                          filterable
                          clearable
                          placeholder="全部"
                          @change="changeDeviceType"
                          @clear="getDeviceByStIdsAndDeviceType.res.body = []"
                          >
                            <el-option
                            v-for="item in getDeviceTypeByStIds.res.body"
                            :key="item.devid"
                            :label="item.devtype"
                            :value="item.devid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备">
                          <el-select
                          v-model="deviceLogListByPageAndThroughTimeNew.params.st_eqids"
                          filterable
                          clearable
                          multiple
                          collapse-tags
                          placeholder="全部"
                          @change="query()"
                          style="width: 220px">
                            <el-option
                            v-for="item in this.getDeviceByStIdsAndDeviceType.res.body"
                            :key="item.st_eqid"
                            :label="item.deviceName"
                            :value="item.st_eqid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item
                        class="pull-right"
                        style="margin-right: 0;">
                        <el-button class="query" @click="query()">查询</el-button>
                    </el-form-item> -->
                </el-form>
            </div>
        </div>
        <div class="page-body">
            <el-table
                :data="deviceLogListByPageAndThroughTimeNew.res.body.data"
                v-loading="deviceLogListByPageAndThroughTimeNew.loading"
                style="width: 100%"
                empty-text="无告警"
                :max-height="vh - 150"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style">
                <el-table-column
                    v-if="baseSearchConditionGetStByRoleAndComIds.res.body.length"
                    prop="stName"
                    label="电站名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="deviceTypeStr"
                    label="设备类型"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="deviceName"
                    label="设备名称">
                </el-table-column>
                <el-table-column
                    prop="sStartTime"
                    label="开始时间"
                    :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd hh:mm:ss') : ''">
                </el-table-column>
                <el-table-column
                    prop="sEndTime"
                    label="结束时间"
                    :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd hh:mm:ss') : ''">
                </el-table-column>
                <el-table-column
                    prop="eventDesc"
                    label="事件类型">
                </el-table-column>
                <el-table-column
                    prop="faultDesc"
                    label="事件描述">
                </el-table-column>
            </el-table>
        </div>

        <el-pagination
            background
            class="pagination"
            :page-sizes="[5, 10, 20, 50, 100]"
            :page-size="deviceLogListByPageAndThroughTimeNew.params.pageSize"
            :current-page="deviceLogListByPageAndThroughTimeNew.params.pageIndex"
            :total="deviceLogListByPageAndThroughTimeNew.res.body.total"
            layout="total, sizes, prev, pager, next"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange">
        </el-pagination>
    </div>
</template>

<script>
import { api＿getDeviceTypeByStIds, api＿getDeviceByStIdsAndDeviceType, api＿deviceLogListByPageAndThroughTimeNew, api＿userAuthHandleQueryStWithList } from '@newEnergyCloud/request/api'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import SwitchStation from '@/components/station/switchStation/switchStation'

export default {
    mixins: [mixinWidthHeight],
    components: {
        SwitchStation
    },
    data () {
        return {
            stids: [],
            baseSearchConditionGetStByRoleAndComIds: api＿userAuthHandleQueryStWithList({
                later: true,
                res: {
                    body: []
                }
            }),
            getDeviceTypeByStIds: api＿getDeviceTypeByStIds({
                later: true,
                res: {
                    body: []
                }
            }),
            getDeviceByStIdsAndDeviceType: api＿getDeviceByStIdsAndDeviceType({
                later: true,
                res: {
                    body: []
                }
            }),
            deviceLogListByPageAndThroughTimeNew: api＿deviceLogListByPageAndThroughTimeNew({
                later: true,
                res: {
                    body: []
                },
                beforeSend (params) {
                    // if (params.stIds && params.stIds.length) params.stIds = params.stIds.join()
                    if (params.st_eqids && params.st_eqids.length) params.st_eqids = params.st_eqids.join()
                    return params
                }
            })
        }
    },
    computed: {
        stId () {
            return this.$store.getters.station_id
        },
        allStids () {
            return this.$store.getters.current_company_stids || this.$store.getters.station_id
        }
    },
    created () {
        this.$bus.on('stationChange', this.stationChange)
        this.getStationList()
        this.getDeviceType()
        this.query()
    },
    methods: {
        stationChange (data) {
            this.stids = []
            this.deviceLogListByPageAndThroughTimeNew.params.deviceTypes = ''
            this.deviceLogListByPageAndThroughTimeNew.params.st_eqids = ''
            this.getDeviceByStIdsAndDeviceType.res.body = []
            this.getStationList()
            this.getDeviceType()
            this.query()
        },
        getStationList () {
            this.baseSearchConditionGetStByRoleAndComIds.getData({
                // stClass: this.$store.getters.station_class,
                companyId: this.stId === 0 ? '' : this.stId
            })
        },
        getDeviceType () {
            this.getDeviceTypeByStIds.getData({
                stClass: this.$store.getters.station_class,
                stIds: this.stids.join() || this.allStids
            })
        },
        changeStations () {
            this.deviceLogListByPageAndThroughTimeNew.params.deviceTypes = ''
            this.deviceLogListByPageAndThroughTimeNew.params.st_eqids = ''
            this.getDeviceByStIdsAndDeviceType.res.body = []
            this.getDeviceType()
            this.query()
        },
        changeDeviceType () {
            this.deviceLogListByPageAndThroughTimeNew.params.st_eqids = ''
            this.getDeviceByStIdsAndDeviceType.res.body = []
            this.query()
            if (!this.deviceLogListByPageAndThroughTimeNew.params.deviceTypes) return
            this.getDeviceByStIdsAndDeviceType.getData({
                stClass: this.$store.getters.station_class,
                stIds: this.stids.join() || this.allStids,
                deviceTypes: this.deviceLogListByPageAndThroughTimeNew.params.deviceTypes
            })
        },
        handleCurrentChange (val) {
            this.deviceLogListByPageAndThroughTimeNew.params.pageIndex = val - 1
            this.query()
        },
        handleSizeChange (val) {
            this.deviceLogListByPageAndThroughTimeNew.params.pageSize = val
            this.query()
        },
        query () {
            this.deviceLogListByPageAndThroughTimeNew.getData({
                stClass: this.$store.getters.station_class,
                stIds: this.stids.join() || this.allStids,
                isToday: 1,
                eventTypes: 1
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.stationChange)
    }
}
</script>

<style lang="scss">
@import './theme/theme.scss';
[data-pagetheme="darkBlue"] {
   .device-alarm{
        @import '@comm/assets/themes/table/pageTheme/table_dark_blue1.scss';
        @import '@comm/assets/themes/input/pageTheme/input_dark_blue1.scss';
        @import '@comm/assets/themes/pagination/pageTheme/pagination_dark_blue1.scss';
    }
}
[data-pagetheme="light"] {
    .device-alarm{
        @import '@comm/assets/themes/table/pageTheme/table_light1.scss';
        @import '@comm/assets/themes/input/pageTheme/input_light1.scss';
    }
}
[data-pagetheme="dark"] {
   .device-alarm{
        @import '@comm/assets/themes/table/pageTheme/table_dark1.scss';
        @import '@comm/assets/themes/input/pageTheme/input_dark1.scss';
        @import '@comm/assets/themes/pagination/pageTheme/pagination_dark1.scss';
    }
}

.device-alarm {
    @import './theme/theme.scss';
    .filter {
        .el-form-item {

            .el-form-item__label {
                @include page_c(color, $fontColor);
            }

            .el-input__inner {
                // border: none;
            }

            .el-input__suffix {
                right: 10px;
            }

            .el-input--suffix .el-input__inner {
                padding-right: 10px;
            }

            // .el-form-item__label {
            //     @include page_c(color, $pageHeadWordColor);
            // }
        }
    }
    // @import '@comm/assets/themes/table/t5.scss';
    // .el-table  {
    //     thead {
    //         color: #5D5D5D;
    //     }
    //     .row-style {
    //         &:hover {
    //             background: #2FBFCC;
    //             box-shadow: 0px 10px 13px 0px rgba(12,61,65,0.28);
    //             color: #fff;
    //             td {
    //                 background: transparent;
    //             }
    //         }
    //     }
    // }
    .el-pagination.is-background .el-pager li {
        background: #fff;
    }
    .el-table__body tr:hover td {
        color: #fff;
    }
}
</style>

<style lang="scss" scoped>
@import './theme/theme.scss';
.device-alarm {
    height: 100%;
    padding: 20px 10px;
    .head {
        @include page_c(color, $pageHeaderLine);
        .switch-station {
            line-height: 37px;
        }

        .el-select, .el-input {
            width: 160px;
        }
    }
    .filter {
        width: calc(100% - 160px);
        padding-left: 30px;
        .iconfont.icon-iconfontsousuokuangsousuo {
            height: 34px;
            line-height: 34px;
            color: #73767C;
            font-size: 20px;
        }
        // .query {
        //     background: #2FBFCB;
        //     border: 1px solid #2FBFCB;
        //     color: #fff;
        // }
    }
    .page-body {
        height: calc(100vh - 150px);
    }
    .pagination {
        text-align: center;
        padding-top: 10px;
    }
}
</style>
