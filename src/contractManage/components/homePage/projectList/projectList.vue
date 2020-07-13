<template>
    <div class="project-list">
        <div class="content">
            <!-- 查询区域 -->
            <div class="filter" ref="filter" v-show="!detailFullPage">
                <el-form ref="queryFormProject" :model="getContractProject.params" :inline='true' size="small">
                    <el-form-item label="项目分类">
                        <el-select v-model="getContractProject.params.classId" filterable multiple clearable collapse-tags placeholder="全部" style="width: 200px" class='s1' @change='calFilterH()'>
                            <el-option
                                v-for="item in getBaseContract.res.body"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="合同摘要">
                        <el-select v-model="getContractProject.params.contractId" filterable multiple clearable collapse-tags placeholder="全部" style="width: 200px" class='s1' @change='calFilterH()'>
                            <el-option
                                v-for="item in getContract.res.body.data"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="margin-left: 15px">
                          <el-input v-model="getContractProject.params.keyword" clearable placeholder="请输入项目编号或项目名称" @keydown.enter.native="getContractProject.getData()">
                          </el-input>
                    </el-form-item>
                    <el-form-item
                        class="pull-right"
                        style="margin-right: 0;">
                        <el-button type="b1" @click="getContractProject.getData()" :disabled="getContractProject.loading">查询</el-button>
                        <el-button type="b3" @click="reset()">重置</el-button>
                        <el-button type="b5" @click="exportTable()">导出</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 新增按钮 分页区域 -->
            <div class="toolbox clearfix">
                <!-- <el-button type="text" @click="contractDetail.show = true;delete contractDetail.detail">
                    <span class="add-con"><i class="iconfont iconxinzeng"></i></span>
                    新增
                </el-button> -->

                <my-paging
                    class="pull-right"
                    v-if="getContractProject.res && getContractProject.res.body"
                    :pageSizeArr="[10, 20, 30, 50, 100]"
                    @change="data => getContractProject.getData(data)"
                    v-bind="getContractProject.res.body"
                    :total='getContractProject.res.body.total > 10000 ? 10000 : getContractProject.res.body.total'/>
            </div>
            <!-- 表格区域 -->
            <div class="tableCon">
                <el-table
                    v-if="getContractProject.res && getContractProject.res.body"
                    :data="getContractProject.res.body.data"
                    v-loading="getContractProject.loading"
                    style="width: 100%"
                    :max-height="detailFullPage ? vh - 221 : vh - 221 - filterHeight"
                    @cell-click='cellClick'
                    border
                    :row-style="{'cursor': 'pointer'}"
                    :cell-style="cellStyle"
                    row-class-name="row-style"
                    cell-class-name="cell-style"
                    header-row-class-name="header-row-style"
                    header-cell-class-name="header-cell-style"
                    @sort-change='sortChange'
                    >
                    <el-table-column
                    fixed
                    label="序列号"
                    width="90"
                    :formatter="serialNumber"
                    ></el-table-column>
                    <el-table-column prop="classify" label="项目分类" width="110" sortable="custom"></el-table-column>
                    <el-table-column prop="code" label="项目编号" width="150" sortable="custom"></el-table-column>
                    <el-table-column prop="name" label="项目名称" width="240" sortable="custom"></el-table-column>
                    <el-table-column prop="volume" label="项目容量(MW)" width="140" sortable="custom"></el-table-column>
                    <el-table-column prop="site" label="项目地点" width="220"></el-table-column>
                    <el-table-column
                        prop="startDate"
                        label="开始时间"
                        width="125"
                        sortable="custom"
                        align="center"
                        :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd') : ''"
                    ></el-table-column>
                    <el-table-column
                        prop="endDate"
                        label="结束时间"
                        width="125"
                        sortable="custom"
                        align="center"
                        :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd') : ''"
                    ></el-table-column>
                    <el-table-column prop="docUserName" label="对接人" width="150"></el-table-column>
                    <el-table-column prop="stName" label="电站名称" width="140"></el-table-column>
                    <el-table-column prop="contract" label="所属合同" width="200"></el-table-column>
                    <el-table-column prop="note" label="备注" width="180"></el-table-column>
                    <el-table-column
                        prop="createDate"
                        label="创建时间"
                        width="155"
                        sortable="custom"
                        align="center"
                        :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd hh:mm:ss') : ''"
                    ></el-table-column>
                    <el-table-column
                        fixed="right"
                        width="100"
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <span
                                title="编辑"
                                class="edit"
                                @click.stop="projectDetail.show = true; projectDetail.detail = scope.row">
                                <i class="iconfont iconbianji-copy"></i>
                                <span>编辑</span>
                            </span>
                        </template>
                    </el-table-column>
                    <template slot="empty">
                        <span>暂无数据</span>
                    </template>
                </el-table>
                <i
                :class="{iconfont: true, iconshousuoshang: !detailFullPage, iconshousuoxia: detailFullPage}"
                @click="switchDetailFullPage()"
                :title="detailFullPage ? '缩小': '放大'"
                style="position: absolute;
                        right: 0;top: 0px;
                        cursor: pointer;
                        font-size: 15px;
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        color: rgba(255,255,255,.5);
                        background: #18344c;"></i>
                <div class="table-summary" v-if="getContractProject.res && getContractProject.res.body">
                    <span>项目总数: {{getContractProject.res.body.total}}</span>
                    <span style="padding-left: 20px;">项目容量总计(MW): {{getContractProject.res.body.allVolume}}</span>
                </div>
            </div>
        </div>

        <!-- 编辑 弹框 -->
        <el-dialog
        width="1200px"
        title="编辑"
        center
        :visible.sync="projectDetail.show"
        top='10vh'
        @opened="$bus.emit('openEditProject')"
        @close="delete projectDetail.detail"
        >
            <edit-project @updateSuccess='updateSuccess' :detail="projectDetail.detail"></edit-project>
            <div slot="footer" class="dialog-footer">
                <el-button @click="projectDetail.show = false">取 消</el-button>
                <el-button type="primary" @click="$bus.emit('saveProject')" v-if="UserAuthHandleGetBusinessManageAuth09.res.body.enable">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { api＿getBaseContract, api＿getContractProject, api＿getContract, api＿exportContractProject, api＿UserAuthHandleGetBusinessManageAuth09 } from '@contractManage/request/api'
import {Table, TableColumn, Select, Option, Form, FormItem, Input, Button, Dialog, Message} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import MyPaging from '@comm/components/paging'
import editProject from './editProject'
import {download} from '@comm/request/http'

export default {
    mixins: [mixinWidthHeight],
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElSelect: Select,
        ElOption: Option,
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElButton: Button,
        ElDialog: Dialog,
        MyPaging,
        editProject
    },
    data () {
        return {
            filterHeight: 0,
            detailFullPage: false,
            projectDetail: {
                show: false,
                detail: {}
            },
            getBaseContract: api＿getBaseContract({
                later: true
            }),
            getContract: api＿getContract({
                later: true,
                beforeSend (params) {
                    if (params.classId) {
                        params.classId = params.classId.join()
                    }
                    if (params.managerId) {
                        params.managerId = params.managerId.join()
                    }
                    return params
                },
                res: {
                    body: {
                        data: []
                    }
                }
            }),
            getContractProject: api＿getContractProject({
                later: true,
                beforeSend (params) {
                    if (params.classId) {
                        params.classId = params.classId.join()
                    }
                    if (params.contractId) {
                        params.contractId = params.contractId.join()
                    }
                    return params
                },
                res: {
                    body: {
                        data: []
                    }
                }
            }),
            UserAuthHandleGetBusinessManageAuth09: api＿UserAuthHandleGetBusinessManageAuth09({
                later: true,
                res: {
                    body: {}
                }
            })
        }
    },
    mounted () {
        this.filterHeight = this.$refs.filter.clientHeight
        this.getBaseContract.getData({status: 1})
        this.getContract.getData()
        this.getContractProject.getData()
    },
    methods: {
        // 放大显示详情操作
        switchDetailFullPage () {
            this.detailFullPage = !this.detailFullPage
        },
        sortChange ({ column, prop, order }) {
            this.getContractProject.params.sort = prop + '_' + (order === 'ascending' ? 1 : 2)
            this.getContractProject.getData()
        },
        async calFilterH () {
            await this.$timeout(0)
            this.filterHeight = this.$refs.filter.clientHeight
        },
        cellStyle ({ row, column, rowIndex, columnIndex }) {
            if (column.property === 'contract') return 'color: #24E5C9'
            return ''
        },
        cellClick (row, column, cell, event) {
            if (column.property === 'contract') {
                this.$router.push({
                    name: 'contractList',
                    params: {
                        contractName: row.contract
                    }
                })
            }
        },
        sortCode (a, b) {
            return parseInt(a.code.split('-')[2]) - parseInt(b.code.split('-')[2])
        },
        serialNumber (row, column, cellValue, index) {
            return this.getContractProject.res.body.pageSize * this.getContractProject.res.body.pageIndex + index + 1
        },
        // 编辑 项目 成功后处理
        updateSuccess () {
            this.projectDetail.show = false
            this.getContractProject.getData()
        },
        // 导出
        exportTable () {
            if (this.getContractProject.res.body.total >= 10000) {
                return Message.error('导出数据超过10000条,请重新选择条件')
            }
            let params = ''
            for (const key in this.getContractProject['params']) {
                if (this.getContractProject['params'].hasOwnProperty(key)) {
                    if (this.getContractProject['params'][key]) {
                        params += (key + '=' + this.getContractProject['params'][key] + '&')
                    } else {
                        params += (key + '=' + '&')
                    }
                }
            }
            download({
                url: api＿exportContractProject + '?' + params + 'fileName=' + '项目列表'
            })
        },
        // 重置
        async reset () {
            await this.$timeout(0)
            this.$refs.queryFormProject.resetFields()
            this.getContractProject.params.classId = []
            this.getContractProject.params.contractId = []
            this.getContractProject.params.keyword = ''
            this.getContractProject.getData()
        }
    }
}
</script>

<style lang="scss">
.project-list {
    .el-table {
        .el-table__body-wrapper {
            transition: max-height .3s;
        }
    }

    .el-table ::-webkit-scrollbar:horizontal {
        width: 5px;
        height: 7px;
    }

    @import '@comm/assets/themes/table/t1.scss';

    @media screen and (-webkit-min-device-pixel-ratio:0) {
        .el-table__fixed,
        .el-table__fixed-right {
            bottom: 9px !important;
        }
    }

    .filter {
        padding: 0px 30px 0px 30px;
        .el-form-item {

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
        }
    }
}
</style>

<style lang="scss" scoped>
.project-list {
    .toolbox {
        padding: 0px 30px 10px 30px;
    }
    .tableCon {
        position: relative;
        padding: 0 30px 20px 30px;
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
