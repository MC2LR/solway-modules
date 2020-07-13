<template>
    <div class="authority-management">
        <div class="page-header">
            <el-button size="small" type="primary" style="margin-left: 12px;" @click="addRoleClick()">添加角色</el-button>
            <solway-pagination
                style="float:right;"
                :page-index="roleInformationList.res.pageIndex"
                :page-size="roleInformationList.res.pageSize"
                :total="roleInformationList.res.total">
            </solway-pagination>
        </div>
        <div class="table-content">
            <el-table
                :data="roleInformationList.res.data"
                v-loading="roleInformationList.loading"
                border
                :row-style="{'cursor': 'pointer'}"
                :max-height="vh - 100"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column
                    prop="roleCode"
                    label="角色编码"
                    align="center"
                    width="260">
                </el-table-column>
                <el-table-column
                    prop="roleName"
                    label="角色名称"
                    align="center"
                    width="260">
                </el-table-column>
                <el-table-column
                    prop="remark"
                    align="center"
                    label="角色描述">
                </el-table-column>
                <el-table-column
                    prop=""
                    align="center"
                    width="200"
                    label="操作">
                    <template slot-scope="scope">
                        <span
                            style="margin-right:0.5em;"
                            title="权限配置"
                            class="el-icon-setting peizhi"
                            @click="configureRole(scope.row)">
                        </span>
                        <span
                            style="margin-right:0.5em;"
                            title="编辑"
                            class="el-icon-edit-outline edit"
                            @click.stop="editRoleClick(scope.row)">
                        </span>
                        <span
                            title="删除"
                            @click.stop="deleteRow(scope.row.roleId)"
                            class="el-icon-delete delete">
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 新增、编辑 -->
        <el-dialog
            width="600px"
            center
            @opened="$bus.emit('openEditRole')"
            @close="delete editRoleModal.detail;"
            :visible.sync="editRoleModal.visible"
            :title="'角色编辑'">
            <new-role @updateSuccess="updateSuccess" v-bind="editRoleModal"></new-role>
            <div slot="footer" class="dialog-footer">
                <el-button type="b2" @click="editRoleModal.visible = false">取 消</el-button>
                <el-button type="b1" @click="$bus.emit('saveRole')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 角色配置模块 -->
        <el-dialog
            width="1000px"
            center
            @opened="$bus.emit('openConfigureRoleModule')"
            @close="delete configureRoleModuleModal.detail;"
            :visible.sync="configureRoleModuleModal.visible"
            :title="'配置角色模块'">
            <configure-role-module @updateSuccess="updateSuccess" v-bind="configureRoleModuleModal"></configure-role-module>
            <div slot="footer" class="dialog-footer">
                <el-button type="b2" @click="configureRoleModuleModal.visible = false">取 消</el-button>
                <el-button type="b1" @click="$bus.emit('saveConfigureRoleModule')"  v-if="!(fixedType === '01' || fixedType === '02')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {api＿roleInformationList, api＿deleteRole} from '@roleAuthorityManagement/request/api'
import { independent } from '@comm/tools/env'
import {Table, TableColumn, Button, Dialog, MessageBox, Message} from 'element-ui'
import solwayPagination from '@roleAuthorityManagement/components/pagination'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
    data () {
        return {
            independent: independent,
            tableData: [],
            editRoleModal: {
                visible: false
            },
            fixedType: null,
            configureRoleModuleModal: {
                visible: false
            },
            roleInformationList: api＿roleInformationList({
                later: true,
                onlyLatest: true
            }),
            deleteRole: api＿deleteRole({
                later: true,
                sameTimeOnce: true
            })
        }
    },
    methods: {
        getRoleListData () {
            this.roleInformationList.getData({roleType: '02', pageIndex: 0, pageSize: 10})
        },
        addRoleClick () {
            this.editRoleModal = {
                visible: true,
                detail: null
            }
        },
        editRoleClick (row) {
            this.editRoleModal = {
                visible: true,
                detail: row
            }
        },
        configureRole (row) {
            this.fixedType = row.fixedType
            this.configureRoleModuleModal = {
                visible: true,
                detail: row
            }
        },
        updateSuccess () {
            this.editRoleModal.visible = false
            this.configureRoleModuleModal.visible = false
            this.getRoleListData()
        },
        deleteRow (roleId) {
            MessageBox.confirm('确定删除此角色吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.deleteRole.getData({roleId}).then(res => {
                    if (res.key !== 3) return Message.error(res.msg || res.body || '删除失败')
                    Message.success(res.msg || res.body || '删除成功')
                    this.getRoleListData()
                })
            }).catch(() => {})
        }
    },
    created () {
        this.getRoleListData()
        this.roleInformationList.subscribe(res => {
            // test数据
            // this.tableData = [{roleId: 195, roleName: 'R12345', roleCode: '32323', remark: 'R12345'}]
        })
    },
     components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElDialog: Dialog,
        solwayPagination,
        newRole: () => import('./newRole'),
        configureRoleModule: () => import('./configureRoleModule'),
        ElButton: Button
    }
}
</script>
<style lang="scss">
.authority-management {
    .el-table td span{
        cursor: pointer;
        &.edit {
            @include c(color, $text_c1);
        }
        &.peizhi {
            @include c(color, $text_c1);
        }
        &.delete {
            @include c(color, $text_c3);
        }
    }
}
</style>
<style lang="scss" scoped>
.authority-management {
    background: white;
    height: 100vh;
    .page-header{
        padding: 20px 20px 0;
    }
    .table-content{
        padding:20px;
    }
}
</style>
