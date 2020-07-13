<template>
    <div class="station-list">
        <!-- 按钮、分页区域 -->
        <div class="toolbox clearfix">
            <el-button type="text" @click="stationDetail.show = true;delete stationDetail.detail">
                <span class="add-con"><i class="iconfont iconxinzeng"></i></span>
                新增
            </el-button>
            <el-input v-model="powerStationList.params.keyWords" clearable placeholder="关键字(电站编号、电站名称)"  style="margin-left:15px;width: 230px" @keydown.enter.native="powerStationList.getData()">
                <i slot="suffix" class="iconfont iconiconfontsousuokuangsousuo" @click="powerStationList.getData()"></i>
            </el-input>
            <!-- <el-button>
                分布式批量模板下载
            </el-button>
            <el-button>
                分布式批量上传
            </el-button>
            <el-button>
                逆变器台账模版下载
            </el-button>
            <el-button>
                逆变器台账批量导入
            </el-button> -->
            <my-paging
                class="pull-right"
                style="margin-top: 5px"
                v-if="powerStationList.res && powerStationList.res.data"
                :pageSizeArr="[6, 9, 10, 20, 30, 50, 100, 500, 1000]"
                @change="data => powerStationList.getData(data)"
                v-bind="powerStationList.res"/>
        </div>
        <!-- 表格区域 -->
        <div class="tableCon">
            <el-table
                :data="powerStationList.res.data"
                v-loading="powerStationList.loading"
                style="width: 100%"
                :max-height="vh - 150"
                border
                :row-style="{'cursor': 'pointer'}"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style">
                <el-table-column prop="stationcode" label="电站编号" width="200" align="center" sortable></el-table-column>
                <el-table-column prop="stationname" label="电站名称" width="350" sortable></el-table-column>
                <el-table-column prop="companyname" label="所属企业" width="350" sortable></el-table-column>
                <el-table-column prop="managername" label="负责人" width="150" sortable></el-table-column>
                <el-table-column prop="stationtel" label="联系电话" width="200" align="center" sortable></el-table-column>
                <el-table-column prop="province" label="所属省份" width="130" sortable></el-table-column>
                <el-table-column
                    fixed="right"
                    width="240"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <span
                            title="维护设备台账"
                            @click.stop=""
                            class="look">
                            <i class="iconfont iconpeizhi" style="font-size: 20px"></i>
                        </span>
                        <span
                            title="编辑电站信息"
                            class="edit"
                            @click.stop="stationDetail.show = true;stationDetail.id = scope.row.id;stationDetail.stationInfo = scope.row">
                            <i class="iconfont iconbianji-copy"></i>
                        </span>
                        <span
                            title="下载"
                            class="download">
                            <a :href="baseApi + '/PowerStation/exportExcelData.htm?stationid=' + scope.row.id" target="blank"><i class="iconfont iconGroup-"></i></a>
                        </span>
                        <span
                            title="删除"
                            @click.stop="powerStationDelete.getData({id: scope.row.id})"
                            class="delete">
                            <i class="iconfont iconshanchu1"></i>
                        </span>
                    </template>
                </el-table-column>
                <template slot="empty">
                    <span>暂无数据</span>
                </template>
            </el-table>
        </div>

        <new-station
            v-if="stationDetail.show"
            :stid="stationDetail.id"
            :stationInfo="stationDetail.stationInfo"
            @close="hideForm">
        </new-station>
    </div>
</template>

<script>
import { api＿powerStationList, api＿powerStationDelete } from '@stationManage/request/api'
import { Table, TableColumn, Input, Button, Message } from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import MyPaging from '@comm/components/paging'
import newStation from './newStation/newStation'
import {baseApi} from '@comm/request/api'

export default {
    mixins: [mixinWidthHeight],
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElInput: Input,
        ElButton: Button,
        MyPaging,
        newStation
    },
    data () {
        return {
            baseApi: baseApi,
            stationDetail: {
                show: false,
                id: null,
                stationInfo: null
            },
            powerStationList: api＿powerStationList({
                params: {
                    parentIsNull: 1,
                    keyWords: ''
                },
                res: {
                    data: []
                }
            }),
            powerStationDelete: api＿powerStationDelete({
                later: true
            })
        }
    },
    created () {
        this.powerStationDelete.subscribe(res => {
            this.powerStationList.getData()
            if (res.type === 'success') {
                Message.success(res.message)
            } else {
                Message.error(res.message)
            }
        })
    },
    methods: {
        hideForm () {
            this.stationDetail.show = false
            this.stationDetail.id = null
            this.stationDetail.stationInfo = null
            this.powerStationList.getData()
        }
    }
}
</script>

<style lang="scss">
.station-list {
    @import '@comm/assets/themes/table/t1.scss';

    .toolbox {
        padding: 0px 30px 0px 30px;
        // .el-form-item {
            .el-input input {
                // width: calc(100vw - 930px);
                // max-width: 500px;
            }

            .el-form-item__label {
                @include c(color, $text_c2);
            }

            .el-input__inner, .el-textarea__inner {
                @include c(background-color, $bg_input_c1);
                @include c(border-color, $line_c1);
                @include c(color, $text_c2);

                &:focus, &:hover {
                    @include c(border-color, $line_c1);
                }
            }

            .el-input__suffix {
                right: 10px;
            }

            .el-input--suffix .el-input__inner {
                padding-right: 10px;
            }

            .el-select__input {
                color: rgba(255, 255, 255, 0.8);
            }

            .el-select.s1 .el-tag.el-tag--info {
                background-color: #396faa;
                border-color: #396faa;
                color: #fff;
                .el-select__tags-text {
                    display: inline-block;
                    max-width: 100px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                .el-tag__close.el-icon-close {
                    vertical-align: super;
                }
            }
        // }
    }
}
</style>

<style lang="scss" scoped>
.station-list {
    .toolbox {
        padding: 10px 30px 10px 30px;
        .iconfont.iconiconfontsousuokuangsousuo {
            display: inline-block;
            width: 20px;
            height: 100%;
            text-align: center;
            line-height: 34px;
        }
    }
    .tableCon {
        position: relative;
        padding: 0 30px 0px 30px;
        .look {
            font-size: 12px;
            margin-right: 10px;
            & i {
                margin-right: 5px;
                @include c(color, $text_c4);
            }
        }
        .edit {
            font-size: 12px;
            margin-right: 10px;
            & i {
                margin-right: 5px;
                @include c(color, $text_c1);
            }
        }
        .download {
            margin-right: 10px;
            & i {
                font-size: 22px;
                margin-right: 5px;
                @include c(color, $text_c1);
            }
        }
        .delete {
            font-size: 12px;
            & i {
                margin-right: 5px;
                @include c(color, $text_c3);
            }
        }
        .table-summary {
            padding: 10px 0 0 0;
            font-size: 15px;
        }
    }
}
</style>
