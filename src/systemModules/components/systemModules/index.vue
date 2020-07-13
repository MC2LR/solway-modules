<template>
    <div class="system-module-home">
        <page-slide-down-admin v-if="!independent"></page-slide-down-admin>
        <common-header :modelName="modelName">
            <span class="btn-con">
                <public-notice></public-notice>
                <full-screen style="margin: 0 30px;"></full-screen>
                <personal-center></personal-center>
            </span>
        </common-header>
        <div class="page-header">
            <div class="themeTabs clearfix">
                <div v-for="(item, index) in versionList" :key="item.id" style="float: left;margin-right:2%;" v-bind:style="{'width': (100-(versionList.length-1)*2)/versionList.length+'%','margin-right': index == versionList.length-1 ? 0 : '2%'}">
                    <div class="theme" @click="changeVersion(item.id,item.name)" :class="{'active': versionId === item.id}">
                        <div class="theme-title">{{item.name}}</div>
                    </div>
                </div>
            </div>
            <div>
                <el-select v-model="category" placeholder="请选择" style="width:120px;" @change="getModuleListData()">
                    <el-option
                        v-for="item in roleOptions"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-input placeholder="请输入名称" style="width:180px;" v-model="keywords" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="getModuleListData()"></el-button>
                </el-input>
                <el-button size="small" type="primary" style="margin-left: 12px;" @click="addModuleClick()">新增</el-button>
            </div>
        </div>
        <div class="table-content">
            <el-table
                :data="tableData"
                v-loading="moduleList.loading"
                border
                :row-style="{'cursor': 'pointer'}"
                :max-height="vh - 230"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column
                    prop="level"
                    label="菜单名称"
                    width="180">
                    <template slot-scope="scope">
                        <span :style="{'padding-left': scope.row.level + 'em'}">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="uiState"
                    label="路由名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="图标">
                </el-table-column>
                <el-table-column
                    prop="code"
                    label="唯一编码">
                </el-table-column>
                <el-table-column
                    prop="serviceMode"
                    label="服务模式"
                    width="180">
                     <template slot-scope="scope">
                        <span>{{serviceModeMap[scope.row.serviceMode]}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="weight"
                    label="顺序号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="btns"
                    :formatter="btnsFormatter"
                    label="按钮配置">
                </el-table-column>
                <el-table-column
                    prop=""
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <span
                            title="按钮配置"
                            class="el-icon-setting peizhi"
                            @click="configureBtn(scope.row)">
                        </span>
                        <span
                            title="编辑"
                            class="el-icon-edit-outline edit"
                            @click.stop="editRow(scope.row)">
                        </span>
                        <span
                            title="删除"
                            @click.stop="deleteRow(scope.row.id)"
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
            @opened="$bus.emit('openEditModule')"
            @close="delete systemModuleModal.detail;"
            :visible.sync="systemModuleModal.visible"
            :title="'系统模块编辑'">
            <new-system-module @updateSuccess="updateSuccess" v-bind="systemModuleModal"></new-system-module>
            <div slot="footer" class="dialog-footer">
                <el-button type="b2" @click="systemModuleModal.visible = false">取 消</el-button>
                <el-button type="b1" @click="$bus.emit('saveModule')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 按钮配置 -->
        <el-dialog
            width="600px"
            center
            @opened="$bus.emit('openEditButton')"
            @close="delete buttonModal.detail;"
            :visible.sync="buttonModal.visible"
            :title="'按钮配置-' + selectedModule">
            <new-button @updateSuccess="updateSuccess" v-bind="buttonModal"></new-button>
            <div slot="footer" class="dialog-footer">
                <el-button type="b2" @click="buttonModal.visible = false">取 消</el-button>
                <el-button type="b1" @click="$bus.emit('saveButton')">添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {api＿moduleList, api＿moduleDelete} from '@/request/api'
import { independent } from '@comm/tools/env'
import CommonHeader from '@comm/components/CommonHeader'
import personalCenter from '@comm/components/personalCenter/index'
import publicNotice from '@comm/components/publicNotice/publicNotice'
import fullScreen from '@comm/components/fullScreen/index'
import pageSlideDownAdmin from '@comm/components/pageSlideDownAdmin/pageSlideDownAdmin'
import {Table, TableColumn, Select, Option, Input, Button, Dialog, MessageBox, Message} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
    data () {
        return {
            independent: independent,
            modelName: '系统模块',
            serviceModeMap: { '00': '免费服务', '01': '收费服务', '02': '子模块收费', '09': '推广试用' },
            versionList: [{id: 2, name: '版本2.0'}, {id: 3, name: '版本3.0'}],
            versionId: null,
            roleOptions: [{name: '普通用户', value: '1'}, {name: '集团管理员', value: '2'}, {name: '系统管理员', value: '-9'}],
            category: null,
            keywords: null,
            tableData: [],
            result: [],
            selectedModule: null,
            systemModuleModal: { // 新增编辑弹框
                visible: false
            },
            buttonModal: { // 按钮配置
                visible: false
            },
            moduleList: api＿moduleList({
                later: true,
                onlyLatest: true
            }),
            moduleDelete: api＿moduleDelete({
                sameTimeOnce: true,
                later: true
            })
        }
    },
    methods: {
        changeVersion (id, name) {
            this.tableData = []
            this.versionId = id
            this.getModuleListData()
        },
        forRoll (item, data) {
            item['children'] = []
            data.map(v => {
                if (item.id === v.pid) {
                    item['children'].push(v)
                    if (v.hasChildren === true) {
                        this.forRoll(v, data)
                    }
                }
            })
        },
        flatArray (arr = [], level = 0) {
            arr.map(item => {
                item['level'] = level
                this.result.push(item)
                if (item.hasChildren === true) {
                    this.flatArray(item.children, level + 1)
                }
            })
        },
        resetTableData (data) {
            this.result = []
            let ids = data.map(v => v.id)
            let level1Data = []
            data.map(v => {
                if (!ids.includes(v.pid)) {
                    v['level'] = 1
                    level1Data.push(v)
                }
            })
            level1Data.map(v => {
                if (v.hasChildren === true) {
                    this.forRoll(v, data)
                }
            })
            this.flatArray(level1Data)
            this.tableData = this.result
        },
        btnsFormatter (row, column) {
            if (row.btns && row.btns.length) {
                return row.btns.map(v => v.name + '　')
            }
            return ''
        },
        getModuleListData () {
            this.moduleList.getData({'category': this.category || 1, 'version': this.versionId, 'keywords': this.keywords}).then(res => {
                if (res.code === 0) {
                    this.resetTableData(res.body)
                } else {
                    this.tableData = []
                }
            })
        },
        configureBtn (row) {
            this.selectedModule = row.name
            this.buttonModal = {
                visible: true,
                versionId: this.versionId,
                detail: row
            }
        },
        addModuleClick () {
            this.systemModuleModal = {
                visible: true,
                category: this.category,
                versionId: this.versionId,
                detail: null
            }
        },
        editRow (row) {
            this.systemModuleModal = {
                visible: true,
                category: this.category,
                versionId: this.versionId,
                detail: row
            }
        },
        deleteRow (id) {
            MessageBox.confirm('确定删除此模块吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.moduleDelete.getData({id}).then(res => {
                    if (res.code !== 0) return Message.error(res.msg || res.body || '删除失败')
                    Message.success(res.msg || res.body || '删除成功')
                    this.getModuleListData()
                })
            }).catch(() => {})
        },
        // 统一保存成功回调
        updateSuccess () {
            this.systemModuleModal.visible = false
            this.buttonModal.visible = false
            this.getModuleListData()
        }
    },
    created () {
        this.versionId = this.versionList[0].id
        this.category = this.roleOptions[0].value
        this.getModuleListData()
    },
    components: {
        CommonHeader,
        personalCenter,
        publicNotice,
        fullScreen,
        pageSlideDownAdmin,
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElDialog: Dialog,
        ElSelect: Select,
        ElOption: Option,
        ElInput: Input,
        ElButton: Button,
        newSystemModule: () => import('./newSystemModule'),
        newButton: () => import('./newButton')
    }
}
</script>
<style lang="scss">
.system-module-home {
    @import '@comm/assets/themes/table/t1.scss';
    .el-table td span{
        padding: 0.5em;
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
.system-module-home {
    position:relative;
    font-size:12px;
    color: white;
    .btn-con {
        position: absolute;
        right: 30px;
        top: 19px;
    }
    .page-header{
        padding: 20px;
        .themeTabs {
            margin-bottom: 20px;
            .theme {
                cursor: pointer;
                overflow: hidden;
                &.active {
                    box-shadow: 0px 0px 6px rgb(255, 255, 255);
                    .theme-title {
                        background: rgba(70, 118, 167, .4);
                    }
                }
                .theme-title {
                    line-height: 25px;
                    height: 25px;
                    font-size: 14px;
                    text-align: center;
                    background: -webkit-linear-gradient(left, #305c8a, #52678f);
                    background: -o-linear-gradient(right, #305c8a, #52678f);
                    background: -moz-linear-gradient(right, #305c8a, #52678f);
                    background: linear-gradient(to right, #305c8a, #52678f);
                    &.disabled {
                        cursor: no-drop;
                        color: rgba(255, 255, 255, 0.6);
                        background: #3d5165;
                    }
                }
            }
        }
    }
    .table-content{
        padding:20px;
    }
}
</style>
