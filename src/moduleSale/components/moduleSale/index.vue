<template>
    <div class="module-sale">
        <div class="module-header">
            <!-- <div class="themeTabs clearfix">
                <div v-for="(item, index) in versionList" :key="item.id" style="float: left;margin-right:2%;" v-bind:style="{'width': (100-(versionList.length-1)*2)/versionList.length+'%','margin-right': index == versionList.length-1 ? 0 : '2%'}">
                    <div class="theme" @click="changeVersion(item.id,item.name)" :class="{'active': versionId === item.id}">
                        <div class="theme-title">{{item.name}}</div>
                    </div>
                </div>
            </div> -->
            <!-- <div> -->
            <span class="be-back-icon" @click="$bus.emit('backFromModuleSale')"><i class="el-icon-back"></i></span>
            <el-select v-model="versionId" placeholder="请选择" style="width:150px;" @change="getModuleList()">
                <el-option
                    v-for="item in versionList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-select v-model="selectedCompanyId" placeholder="请选择" style="width:200px;" @change="getModuleList()">
                <el-option
                    v-for="item in companyList.res"
                    :key="item.comId"
                    :label="item.comName"
                    :value="item.comId">
                </el-option>
            </el-select>
            <el-button type="primary" @click="updateBatch()">批量操作</el-button>
        </div>
        <div class="sale-table">
            <el-table
                :data="tableData"
                @selection-change="handleSelectionChange"
                v-loading="selectCompanyModules.loading"
                border
                :row-style="{'cursor': 'pointer'}"
                :max-height="vh - 180"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    :selectable='selectable'
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="level"
                    label="模块名称"
                    width="260">
                    <template slot-scope="scope">
                        <span :style="{'padding-left': scope.row.level + 'em'}">{{scope.row.originalName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="mcUseStatus"
                    label="购买状态"
                    align="center"
                    width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.mcUseStatus && !scope.row.hasChildren">{{serviceTypeMap[scope.row.mcUseStatus]}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="mcssStartDate"
                    :formatter="(row, column, cellValue) => !row.hasChildren && cellValue && new Date(cellValue).Format('yyyy-MM-dd')"
                    label="开始时间">
                </el-table-column>
                <el-table-column
                    prop="mcssEndDate"
                    :formatter="(row, column, cellValue) => !row.hasChildren && cellValue && new Date(cellValue).Format('yyyy-MM-dd')"
                    label="结束时间">
                </el-table-column>
                <el-table-column
                    prop=""
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <span
                            v-if="!scope.row.hasChildren"
                            title="编辑"
                            class="iconfont iconbianji-copy edit"
                            @click.stop="editRow(scope.row)">
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 编辑 、批量编辑-->
        <el-dialog
            width="600px"
            center
            @opened="$bus.emit('openEditModuleSale')"
            @close="delete editModuleSaleModal.detail;"
            :visible.sync="editModuleSaleModal.visible"
            :title="'系统模块编辑'">
            <edit-module-sale @updateSuccess="updateSuccess" v-bind="editModuleSaleModal"></edit-module-sale>
            <div slot="footer" class="dialog-footer">
                <el-button type="b2" @click="editModuleSaleModal.visible = false">取 消</el-button>
                <el-button type="b1" @click="$bus.emit('saveModuleSale')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {api＿companyList, api＿selectCompanyModules} from '@comm/request/api'
import { independent } from '@comm/tools/env'
import {Table, TableColumn, Select, Option, Button, Dialog, Message} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
    props: {
        comId: {}
    },
    data () {
        return {
            versionList: [{id: 2, name: '版本2.0'}, {id: 3, name: '版本3.0'}],
            serviceTypeMap: {'00': '已购买', '01': '未购买'},
            versionId: null,
            independent: independent,
            selectedCompanyId: null,
            tableData: [],
            checkedRows: [],
            result: [],
            editModuleSaleModal: {
                visible: false
            },
            companyList: api＿companyList({
                later: true,
                onlyLatest: true
            }),
            selectCompanyModules: api＿selectCompanyModules({
                later: true,
                onlyLatest: true,
                res: {
                    body: {
                        data: []
                    }
                }
            })
        }
    },
    methods: {
        // changeVersion (id, name) {
        //     this.versionId = id
        //     this.getModuleList()
        // },
        handleSelectionChange (val) {
            this.checkedRows = val
        },
        selectable (row, index) {
            return !row.hasChildren
        },
        updateBatch () {
            if (this.checkedRows.length) {
                this.editModuleSaleModal = {
                    visible: true,
                    detailBatch: this.checkedRows,
                    versionId: this.versionId
                }
            } else {
                Message.warning('至少勾选一条信息')
            }
        },
        forRoll (item, data) {
            item['children'] = []
            data.map(v => {
                if (item.appId === v.appPid) {
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
            let ids = data.map(v => v.appId)
            let level1Data = []
            data.map(v => {
                if (!ids.includes(v.appPid)) {
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
        getModuleList () {
            this.selectCompanyModules.getData({comId: this.selectedCompanyId, version: this.versionId}).then(res => {
                if (res.code === 0) {
                    this.resetTableData(res.body)
                } else {
                    this.tableData = []
                }
            })
        },
        editRow (row) {
            this.editModuleSaleModal = {
                visible: true,
                detail: row,
                detailBatch: [],
                versionId: this.versionId
            }
        },
        // 统一保存成功回调
        updateSuccess () {
            this.editModuleSaleModal.visible = false
            this.getModuleList()
        }
    },
    created () {
        this.versionId = this.versionList[0].id
        this.companyList.getData({}).then(res => {
            this.selectedCompanyId = this.comId ? this.comId : res[0].comId
            this.getModuleList()
        })
    },
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElSelect: Select,
        ElOption: Option,
        ElButton: Button,
        ElDialog: Dialog,
        editModuleSale: () => import('./editModuleSale')
    }
}
</script>
<style lang="scss">
.module-sale {
    @import '@comm/assets/themes/table/t1.scss';
    .el-table {
        td span{
            padding: 0.5em;
            cursor: pointer;
            &.edit {
                @include c(color, $text_c1);
            }
        }
        .is-disabled .el-checkbox__inner{
            border-color: transparent;
        }
        // .is-checked .el-checkbox__inner{
        //     border-color: red;
        // }
    }
}
</style>
<style lang="scss" scoped>
.module-sale {
    position:relative;
    font-size:12px;
    color: white;
    .module-header{
        padding: 10px 20px;
        margin:20px 0 0;
        background: rgba(26, 64, 99, 0.3);
        .be-back-icon{
            display: inline-block;
            border: 1px solid white;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            line-height: 24px;
            text-align: center;
            margin: 0 20px 0 10px;
            cursor: pointer;
        }
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
    .sale-table{
        padding:20px;
    }
}
</style>
