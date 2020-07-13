<template>
    <div class="maintain-project">
         <!-- 表格区域 -->
        <div class="tableCon">
            <el-table
                :data="getContractProject.res.body.data"
                v-loading="getContractProject.loading"
                style="width: 100%"
                border
                :max-height="vh - 280"
                :row-style="{'cursor': 'pointer'}"
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
                <el-table-column fixed prop="classify" label="项目分类" width="110" sortable="custom"></el-table-column>
                <el-table-column prop="code" label="项目编号" width="150" sortable="custom"></el-table-column>
                <el-table-column prop="name" label="项目名称" width="230" sortable="custom"></el-table-column>
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
                <el-table-column prop="docUserName" label="对接人" width="130"></el-table-column>
                <el-table-column prop="stName" label="电站名称" width="150"></el-table-column>
                <el-table-column prop="contract" label="所属合同" width="220"></el-table-column>
                <el-table-column prop="note" label="备注" width="170"></el-table-column>
                <el-table-column
                    prop="createDate"
                    label="创建时间"
                    width="155"
                    sortable="custom"
                    align="center"
                    :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd hh:mm:ss') : ''"
                ></el-table-column>
                <el-table-column
                    v-if="UserAuthHandleGetBusinessManageAuth09.res.body.enable"
                    fixed="right"
                    width="180"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <span
                            title="编辑"
                            class="edit"
                            @click.stop="$bus.emit('openNewProject', scope.row);$bus.emit('openProject')">
                            <i class="iconfont iconbianji-copy"></i>
                            <span>编辑</span>
                        </span>
                        <span
                            title="删除"
                            @click.stop="deleteProject(scope.row)"
                            class="delete">
                            <i class="iconfont iconshanchu1"></i>
                            <span>删除</span>
                        </span>
                    </template>
                </el-table-column>
                <template slot="empty">
                    <span style="color: #000">暂无数据</span>
                </template>
            </el-table>
            <div class="table-summary" v-if="getContractProject.res && getContractProject.res.body">
                <span>项目总数: {{getContractProject.res.body.total}}</span>
                <span style="padding-left: 20px;">项目容量总计(MW): {{getContractProject.res.body.allVolume}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { api＿getContractProject, api＿deleteContractProject, api＿UserAuthHandleGetBusinessManageAuth09 } from '@contractManage/request/api'
import {Table, TableColumn, Select, Option, Form, FormItem, Input, Button, Dialog, MessageBox, Message} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'

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
        ElDialog: Dialog
    },
    props: {
        detail: {
            type: Object
        }
    },
    data () {
        return {
            getContractProject: api＿getContractProject({
                later: true,
                res: {
                    body: {
                        data: []
                    }
                }
            }),
            deleteContractProject: api＿deleteContractProject({
                later: true
            }),
            UserAuthHandleGetBusinessManageAuth09: api＿UserAuthHandleGetBusinessManageAuth09({
                later: true,
                res: { body: {} }
            })
        }
    },
    mounted () {
        this.$bus.on('updateProject', this.getList)
        // 判断合同管理员权限
        this.UserAuthHandleGetBusinessManageAuth09.getData()
    },
    methods: {
        sortChange ({ column, prop, order }) {
            this.getContractProject.params.sort = prop + '_' + (order === 'ascending' ? 1 : 2)
            this.getContractProject.getData()
        },
        // sortCode (a, b) {
        //     return parseInt(a.code.split('-')[2]) - parseInt(b.code.split('-')[2])
        // },
        serialNumber (row, column, cellValue, index) {
            return this.getContractProject.res.body.pageSize * this.getContractProject.res.body.pageIndex + index + 1
        },
        getList () {
            this.getContractProject.getData({contractId: this.detail.id, pageSize: 200})
        },
        // 删除项目
        deleteProject (row) {
            MessageBox.confirm('确定删除该项目?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'

                    }).then(() => {
                        this.deleteContractProject.getData({id: row.id})
                        .then(res => {
                            if (res.code !== 0) return Message.error(res.msg)
                            Message.success(res.msg)
                            this.getContractProject.getData({contractId: this.detail.id, pageSize: 200})
                        })
                })
        }
    },
    beforeDestroy () {
        this.$bus.off('updateProject', this.getList)
    }
}
</script>

<style lang="scss">
.maintain-project {
    @import '@comm/assets/themes/table/t3.scss';
}
</style>

<style lang="scss" scoped>
.maintain-project {
    .add-wrap {
        font-size: 14px;
        cursor: pointer;
        vertical-align: -webkit-baseline-middle;
        .add-con {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 5px;
            border-radius: 50%;
            vertical-align: middle;
            line-height: 20px;
            text-align: center;
            font-size: 14px;
            background:#2487E2;
            i {
                font-size: 12px;
                color: #fff;
            }
        }
    }
    .tableCon {
        margin-top: 20px;
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
            padding: 15px 0 0 0;
            font-size: 15px;
            color: #414141;
        }
    }
}
</style>
