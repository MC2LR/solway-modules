<template>
    <div class="default-roles">
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
                <el-select v-model="roleType" placeholder="请选择" style="width:200px;" @change="getCurrentRoleModuleData()">
                    <el-option
                        v-for="item in roleOptions"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button size="small" type="primary" style="margin-left: 12px;" @click="addDefaultRoleModuleClick()">新增</el-button>
                <span v-if="roleType === '01' || roleType === '02'" style="margin-left: 50px;">
                    <span v-for="k in selectAll.res" :key="k.dictCode" style="margin-right:20px;">
                        <input type="checkbox" name="recmsgtypes" :value="k.dictCode" @click="setMsgTypes()" style="vertical-align: sub;margin-right:5px;"> {{k.dictName}}
                    </span>
                </span>
            </div>
        </div>
        <div class="table-content">
            <el-table
                :data="tableData"
                v-loading="selectConfigDefaultRoleModules.loading"
                border
                :row-style="{'cursor': 'pointer'}"
                :max-height="vh - 200"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column
                    prop="originalName"
                    label="名称"
                    width="300">
                    <template slot-scope="scope">
                        <span :style="{'padding-left': scope.row.level * 2 + 'em'}">{{scope.row.originalName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="code"
                    label="唯一编码"
                    align="center"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="serviceMode"
                    align="center"
                    width="150"
                    label="服务模式">
                    <template slot-scope="scope">
                        <span>{{serviceModeMap[scope.row.serviceMode]}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="btns"
                    align="right"
                    label="按钮配置">
                    <template slot-scope="scope">
                        <label>
                            <span v-for="v in scope.row.btns" :key="v.id">
                                <input @click="configureBtnCheckbox(scope.row.appId, $event)" :checked="(scope.row.btnIds || '').split(',').includes(v.id + '')" :value="v.id" name="btn" type="checkbox"/>
                                {{v.name}}
                            </span>
                        </label>
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    align="center"
                    width="100"
                    label="操作">
                    <template slot-scope="scope">
                        <span
                            title="删除"
                            v-if="scope.row.checked !== false"
                            @click.stop="deleteRow(scope.row.roleId)"
                            class="iconfont iconshanchu1 delete">
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 新增弹框 -->
        <el-dialog
            width="600px"
            center
            @opened="$bus.emit('openAddDefaultRoleModule')"
            @close="delete addDefaultRoleModule.detail;"
            :visible.sync="addDefaultRoleModule.visible"
            :title="'此角色添加模块'">
            <new-default-role-module @updateSuccess="updateSuccess" v-bind="addDefaultRoleModule"></new-default-role-module>
            <div slot="footer" class="dialog-footer">
                <el-button type="b2" @click="addDefaultRoleModule.visible = false">取 消</el-button>
                <el-button type="b1" @click="$bus.emit('saveAddDefaultRole')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {api＿selectConfigDefaultRoleModules, api＿updateConfigDefaultRoleModule, api＿selectAll, api＿getByRoleType, api＿roleMsgUpdate, api＿roleDeleteModule} from '@/request/api'
import { independent } from '@comm/tools/env'
import CommonHeader from '@comm/components/CommonHeader'
import personalCenter from '@comm/components/personalCenter/index'
import publicNotice from '@comm/components/publicNotice/publicNotice'
import fullScreen from '@comm/components/fullScreen/index'
import pageSlideDownAdmin from '@comm/components/pageSlideDownAdmin/pageSlideDownAdmin'
import {Table, TableColumn, Select, Option, Message, Button, Dialog, MessageBox} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
const $ = window.jQuery
export default {
    mixins: [mixinWidthHeight],
    data () {
        return {
            independent: independent,
            modelName: '默认角色',
            serviceModeMap: { '00': '免费服务', '01': '收费服务', '02': '子模块收费', '09': '推广试用' },
            versionList: [{id: 2, name: '版本2.0'}, {id: 3, name: '版本3.0'}],
            versionId: null,
            roleOptions: [{name: '系统管理员角色', value: '88'}, {name: '集团管理员角色', value: '00'}, {name: '管理角色', value: '01'}, {name: '运维角色', value: '02'}],
            roleType: '00',
            tableData: [],
            curRoleId: '',
            addDefaultRoleModule: { // 添加默认角色的模块弹框
                visible: false
            },
            selectConfigDefaultRoleModules: api＿selectConfigDefaultRoleModules({
                later: true,
                onlyLatest: true,
                res: {
                    body: []
                }
            }),
            updateConfigDefaultRoleModule: api＿updateConfigDefaultRoleModule({
                later: true,
                sameTimeOnce: true
            }),
            selectAll: api＿selectAll({
                onlyLatest: true
            }),
            getByRoleType: api＿getByRoleType({
                later: true,
                onlyLatest: true
            }),
            roleMsgUpdate: api＿roleMsgUpdate({
                later: true,
                sameTimeOnce: true
            }),
            roleDeleteModule: api＿roleDeleteModule({
                later: true,
                sameTimeOnce: true
            })
        }
    },
    methods: {
        changeVersion (id, name) {
            this.versionId = id
            this.getCurrentRoleModuleData()
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
        getCurrentRoleModuleData () {
            this.selectConfigDefaultRoleModules.getData({roleType: this.roleType, version: this.versionId})
            if (this.roleType === '01' || this.roleType === '02') {
                $("input[name='recmsgtypes']").prop('checked', false)
                this.getByRoleType.getData({roleType: this.roleType})
            }
        },
        configureBtnCheckbox (appId, e) {
            let checkIds = []
            $(e.target).parent().parent().find('input').each((i, item) => {
                if (item.checked) checkIds.push(item.value)
            })
            let btnIds = checkIds.length ? checkIds.join(',') : ''
            this.updateConfigDefaultRoleModule.getData({roleType: this.roleType, appId, btnIds}).then(res => {
                if (res.code !== 0) return Message.error(res.msg || res.body || '配置失败')
                Message.success(res.msg || res.body || '配置成功')
                this.getCurrentRoleModuleData()
            })
        },
        setMsgTypes () {
            const newsTypeArr = []
            $("input[name='recmsgtypes']:checked").map((index, v) => {
                newsTypeArr.push(v.value)
            })
            this.roleMsgUpdate.getData({
                id: this.curRoleId,
                roleType: this.roleType,
                recMsgTypes: newsTypeArr.join(',')
            }).then(res => {
                if (res.code !== 0) return Message.error(res.msg || res.body || '保存失败')
                Message.success(res.msg || res.body || '保存成功')
                this.getCurrentRoleModuleData()
            })
        },
        addDefaultRoleModuleClick () {
            this.addDefaultRoleModule = {
                visible: true,
                roleType: this.roleType,
                versionId: this.versionId
            }
        },
        deleteRow (id) {
            MessageBox.confirm('确定删除此模块配置吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.roleDeleteModule.getData({id, version: this.versionId}).then(res => {
                    if (res.code !== 0) return Message.error(res.msg || res.body || '删除失败')
                    Message.success(res.msg || res.body || '删除成功')
                    this.getCurrentRoleModuleData()
                })
            }).catch(() => {})
        },
        updateSuccess () {
            this.addDefaultRoleModule.visible = false
            this.getCurrentRoleModuleData()
        }
    },
    created () {
        this.versionId = this.versionList[0].id
        this.getCurrentRoleModuleData()
        this.selectConfigDefaultRoleModules.subscribe(res => {
            if (res.code === 0) {
                this.resetTableData(res.body)
            } else {
                this.tableData = []
            }
        })
        this.getByRoleType.subscribe(res => {
            const recMsgTypes = res.body ? res.body.recMsgTypes : ''
            this.curRoleId = res.body ? res.body.id : ''
            if (recMsgTypes) {
                $.each(recMsgTypes.split(','), (i, v) => {
                    $("input[name='recmsgtypes'][value='" + v + "']").prop('checked', true)
                })
            }
        })
    },
    mounted () {
        // 购买模块配置返回
        // this.$bus.on('backFromModuleSale', this.backFromModuleSale)
    },
    beforeDestroy () {
        // this.$bus.off('backFromModuleSale', this.backFromModuleSale)
    },
    components: {
        CommonHeader,
        personalCenter,
        publicNotice,
        fullScreen,
        ElDialog: Dialog,
        pageSlideDownAdmin,
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElSelect: Select,
        ElOption: Option,
        ElButton: Button,
        newDefaultRoleModule: () => import('./newDefaultRoleModule')
    }
}
</script>
<style lang="scss">
.default-roles {
    @import '@comm/assets/themes/table/t1.scss';
    .el-table td span{
        padding: 0.5em;
        cursor: pointer;
        &.delete {
            @include c(color, $text_c3);
        }
    }
}
</style>
<style lang="scss" scoped>
.default-roles {
    position:relative;
    font-size:12px;
    color: white;
    .btn-con {
        position: absolute;
        right: 30px;
        top: 19px;
    }
    .page-header{
        padding: 20px 20px 0;
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
    .table-content{
        padding:20px;
    }
}
</style>
