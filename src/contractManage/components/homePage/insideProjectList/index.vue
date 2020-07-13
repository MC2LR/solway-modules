<template>
    <div class="inside-project-list">
        <div class="content">
            <!-- 查询区域 -->
            <div class="filter" ref="filter">
                <el-form ref="queryFormProject" :model="filter" :inline='true' size="small">
                    <el-form-item>
                          <el-input v-model="getContract.params.keyword" clearable placeholder="请输入项目编号或项目名称" @keydown.enter.native="getContract.getData({insideProject: 1})">
                          </el-input>
                    </el-form-item>
                    <el-form-item
                        class="pull-right"
                        style="margin-right: 0;">
                        <!-- <el-button type="b1" @click="getContractProject.getData()" :disabled="1!==1">查询</el-button> -->
                        <el-button type="b3" @click="getContract.params.keyword = '';getContract.getData({insideProject: 1})">重置</el-button>
                        <el-button type="b5" @click="exportTable()">导出</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 新增按钮 分页区域 -->
            <div class="toolbox clearfix">
                <el-button type="text" @click="addDetail.show = true;addDetail.detail = {};boxName = '新增'">
                    <span class="add-con"><i class="iconfont iconxinzeng"></i></span>
                    新增
                </el-button>
                <el-button type="text" style='color: #FF6262;margin-left: 20px' @click.stop="deleteCt()">
                    <span class="add-con"><i class="iconfont iconshanchu1"></i></span>
                    删除
                </el-button>

                <my-paging
                    class="pull-right"
                    v-if="getContract.res && getContract.res.body"
                    :pageSizeArr="[10, 20, 30, 50, 100]"
                    @change="data => getContract.getData(data)"
                    v-bind="getContract.res.body"
                    :total='getContract.res.body.total > 10000 ? 10000 : getContract.res.body.total'/>
            </div>
            <!-- 表格区域 -->
            <div class="tableCon">
                <el-table
                v-if="getContract.res && getContract.res.body"
                :data="getContract.res.body.data"
                v-loading="getContract.loading"
                style="width: 100%"
                border
                :max-height="vh - 260"
                :row-style="{'cursor': 'pointer'}"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                @sort-change='sortChange'
                 @selection-change='changeSelection'
                >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column
                    fixed
                    label="序列号"
                    width="90"
                    :formatter="serialNumber"
                ></el-table-column>
                <el-table-column prop="code" label="项目编号" sortable="custom"></el-table-column>
                <el-table-column prop="name" label="项目名称" sortable="custom"></el-table-column>
                <el-table-column
                    prop="estimateStartDate"
                    label="开始时间"
                    width="135"
                    sortable="custom"
                    align="center"
                    :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd') : ''">
                </el-table-column>
                <el-table-column
                    prop="estimateEndDate"
                    label="结束时间"
                    width="135"
                    sortable="custom"
                    align="center"
                    :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd') : ''">
                </el-table-column>
                <!-- <el-table-column
                    prop="examine" label="状态" sortable="custom" align="center" width="100"
                    :formatter="(row, column, cellValue, index) => cellValue === '1' ? '审核中' : cellValue === '2' ? '审核未通过' : '正常'">
                </el-table-column> -->
                <el-table-column
                    prop="examine" label="状态" sortable="custom" align="center" width="100"
                    :formatter="(row, column, cellValue, index) => status[cellValue]">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    width="180"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <span
                            class="edit"
                            @click.stop="addDetail.detail = scope.row;addDetail.show = true;boxName = scope.row.examine === '1' && UserAuthHandleGetBusinessManageAuth07.res.body.enable ? '审核' : (scope.row.examine === '0' || scope.row.examine === '2') && getLoginUser.res.userId === scope.row.projectManagerId ? '编辑' : '查看'">
                            <i class="iconfont" :class="[scope.row.examine === '1' && UserAuthHandleGetBusinessManageAuth07.res.body.enable ? 'iconshenhe' : (scope.row.examine === '0' || scope.row.examine === '2') && getLoginUser.res.userId === scope.row.projectManagerId ? 'iconbianji-copy' : 'iconchakan']"></i>
                            <span>{{scope.row.examine === '1' && UserAuthHandleGetBusinessManageAuth07.res.body.enable ? '审核' : (scope.row.examine === '0' || scope.row.examine === '2') && getLoginUser.res.userId === scope.row.projectManagerId ? '编辑' : '查看'}}</span>
                        </span>
                    </template>
                </el-table-column>
                <template slot="empty">
                    <span style="color: #000">暂无数据</span>
                </template>
            </el-table>
            </div>
        </div>
        <!-- 新增/审核 弹框 -->
        <el-dialog
        width="1250px"
        :title="boxName"
        center
        :visible.sync="addDetail.show"
        top='2vh'
        @opened="$bus.emit('openeAdd')"
        >
            <new-inside-project
                v-if="addDetail.show && (((addDetail.detail.examine === '0' || addDetail.detail.examine === '2') && getLoginUser.res.userId === addDetail.detail.projectManagerId) || JSON.stringify(addDetail.detail) === '{}')"
                :detail='addDetail.detail'
                :userId='getLoginUser.res.userId'
                @saveAddSuccess='saveAddSuccess'></new-inside-project>
            <new-inside-project-disabled
                v-if="addDetail.show && (!((addDetail.detail.examine === '0' || addDetail.detail.examine === '2') && getLoginUser.res.userId === addDetail.detail.projectManagerId) && JSON.stringify(addDetail.detail) !== '{}')"
                :detail='addDetail.detail'
                :userId='getLoginUser.res.userId'
                @saveAddSuccess='saveAddSuccess'
                >
                </new-inside-project-disabled>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDetail.show = false">取 消</el-button>
                <!-- 可修改按钮 -->
                <el-button style="background: #38A0FF;color: #fff" @click="$bus.emit('saveAdd', 1)" v-if="addDetail.show && (((addDetail.detail.examine === '0' || addDetail.detail.examine === '2') && getLoginUser.res.userId === addDetail.detail.projectManagerId) || JSON.stringify(addDetail.detail) === '{}')">暂 存</el-button>
                <el-button type="success" @click="$bus.emit('saveAdd', 2)" v-if="addDetail.show && (((addDetail.detail.examine === '0' || addDetail.detail.examine === '2') && getLoginUser.res.userId === addDetail.detail.projectManagerId) || JSON.stringify(addDetail.detail) === '{}')">提 交</el-button>
                <!-- 审核按钮 -->
                <el-button @click="$bus.emit('saveExamine', 0)" v-if="addDetail.show && addDetail.detail.examine === '1' && UserAuthHandleGetBusinessManageAuth07.res.body.enable">退 回</el-button>
                <el-button style="background: #38A0FF;color: #fff" @click="$bus.emit('saveExamine', 1)" v-if="addDetail.show && addDetail.detail.examine === '1' && UserAuthHandleGetBusinessManageAuth07.res.body.enable">同 意</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { api＿getContract, api＿exportInsideProject, api＿getLoginUser, api＿UserAuthHandleGetBusinessManageAuth07, api＿deleteContract } from '@contractManage/request/api'
import { Table, TableColumn, Form, FormItem, Input, Button, Dialog, Message, MessageBox } from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import MyPaging from '@comm/components/paging'
import newInsideProject from './newInsideProject'
import newInsideProjectDisabled from './newInsideProjectDisabled'
import {download} from '@comm/request/http'

export default {
    mixins: [mixinWidthHeight],
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElButton: Button,
        ElDialog: Dialog,
        MyPaging,
        newInsideProject,
        newInsideProjectDisabled
    },
    data () {
        return {
            filter: {
                keyword: ''
            },
            boxName: '',
            addDetail: {
                show: false,
                detail: {}
            },
            status: {
                0: '正常',
                1: '审核中',
                2: '审核未通过',
                3: '审核通过'
            },
            tableList: [
                {
                    a: 1,
                    b: 1,
                    c: 1,
                    d: 1,
                    e: 1,
                    f: 1,
                    g: 1,
                    h: 1,
                    i: 1,
                    j: 1
                },
                {
                    a: 1,
                    b: 1,
                    c: 1,
                    d: 1,
                    e: 1,
                    f: 1,
                    g: 1,
                    h: 1,
                    i: 1,
                    j: 1
                }
            ],
            multipleSelection: [],
            multiplesProjectManagerId: [],
            getContract: api＿getContract({
                later: true,
                onlyLatest: true
            }),
            getLoginUser: api＿getLoginUser({
                later: true
            }),
            UserAuthHandleGetBusinessManageAuth07: api＿UserAuthHandleGetBusinessManageAuth07({
                later: true,
                res: { body: {} }
            }),
            deleteContract: api＿deleteContract({
                later: true
            })
        }
    },
    mounted () {
        this.getContract.getData({insideProject: 1})
        this.getLoginUser.getData()
        // 判断合同审核人权限
        this.UserAuthHandleGetBusinessManageAuth07.getData()
    },
    methods: {
        // 表格多选
        changeSelection (val) {
            // this.multipleSelection = val
            this.multipleSelection = val.map(v => {
                return v.id
            })
            this.multiplesProjectManagerId = val.map(v => {
                return v.projectManagerId
            })
        },
        sortChange ({ column, prop, order }) {
            this.getContract.params.sort = prop + '_' + (order === 'ascending' ? 1 : 2)
            this.getContract.getData({insideProject: 1})
        },
        serialNumber (row, column, cellValue, index) {
            return this.getContract.res.body.pageSize * this.getContract.res.body.pageIndex + index + 1
        },
        // 删除
        deleteCt () {
            let checkProjectId = this.multiplesProjectManagerId.some(v => {
                return this.getLoginUser.res.userId !== v
            })
            if (checkProjectId) return Message.error('不是项目经理，不允许删除')
            MessageBox.confirm('确定删除吗?', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
                }).then(() => {
                    this.deleteContract.getData({id: this.multipleSelection.join()}).then(res => {
                        if (res.code !== 0) return Message.error(res.msg)
                        Message.success(res.msg)
                        this.getContract.getData({insideProject: 1})
                    })
            })
        },
        // 导出
        exportTable () {
            if (this.getContract.res.body.total >= 10000) {
                return Message.error('导出数据超过10000条,请重新选择条件')
            }
            let params = ''
            for (const key in this.getContract['params']) {
                if (this.getContract['params'].hasOwnProperty(key)) {
                    if (this.getContract['params'][key]) {
                        params += (key + '=' + this.getContract['params'][key] + '&')
                    } else {
                        params += (key + '=' + '&')
                    }
                }
            }
            download({
                url: api＿exportInsideProject + '?' + params + 'fileName=' + '内部项目'
            })
        },
        // 新增/编辑/审核 保存成功
        saveAddSuccess () {
            this.addDetail.show = false
            this.getContract.getData({insideProject: 1})
        }
    }
}
</script>

<style lang="scss">
.inside-project-list {
    .el-table {
        .el-table__body-wrapper {
            transition: max-height .3s;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner {
            background-color: #49bfae;
        }
    }

    .el-table ::-webkit-scrollbar:horizontal {
        width: 5px;
        height: 7px;
    }

    @import '@comm/assets/themes/table/t1.scss';

    .el-table--border td:first-child .cell {
        text-align: center !important;
    }

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
.inside-project-list {
    .toolbox {
        padding: 0px 30px 0px 30px;
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
