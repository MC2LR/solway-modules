<template>
    <div class="message-manage" :class="{isHome: $route.name === 'home'}">
        <div class="themeTabs clearfix">
            <div v-for="(item, index) in settingMode.res.data" :key="item.id" style="float: left;margin-right:2%;" v-bind:style="{'width': (100-(settingMode.res.data.length-1)*2)/settingMode.res.data.length+'%','margin-right': index == settingMode.res.data.length-1 ? 0 : '2%'}">
                <div class="theme" @click="changeTheme(item.dictCode,item.dictValue)" :class="{'active': settingMode.theme === item.dictCode}">
                    <div class="theme-title">{{item.dictName}}</div>
                </div>
            </div>
        </div>
        <div class="search-line">
            <label class="label">策略类型</label>
            <el-select
                v-model="strategyType"
                placeholder="全部"
                clearable>
                <el-option label="事件日志策略" value="00"></el-option>
                <!-- <el-option label="自定义任务策略" value="01"></el-option>
                <el-option label="邀请策略" value="02"></el-option>
                <el-option label="其他种类的各类策略" value="03"></el-option> -->
            </el-select>
            <el-button type="b1" style="margin-left: 20px;" @click="tableListData">查询</el-button>
        </div>
        <div class="clearfix" style="margin: 10px 0;">
            <el-dropdown @command="newStrategyType">
                <el-button type="text">
                    <i class="iconfont iconxinjian"></i>
                    <span>新增</span>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="eventTypeModal">事件分类</el-dropdown-item>
                    <el-dropdown-item command="faultcodeModal" v-if="this.getRightListForPCNew.res.roleType === 3">故障码</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!-- <div class="pull-right">
                <my-paging
                    :pageSizeArr="[5, 10, 20, 50, 100, 1000]"
                    @change="data => sendMessageListSystem.getData(data)"
                    v-bind="sendMessageListSystem.res.body"/>
            </div> -->
        </div>
        <!-- 系统管理员-列表 -->
        <el-table
            v-if="this.getRightListForPCNew.res.roleType === 99"
            :data="sendMessageListSystem.res.data"
            v-loading="sendMessageListSystem.loading"
            border
            :row-style="{'cursor': 'pointer'}"
            :max-height="vh - 260"
            row-class-name="row-style"
            cell-class-name="cell-style"
            header-row-class-name="header-row-style"
            header-cell-class-name="header-cell-style"
            style="width: 100%">
            <el-table-column
                prop="ruleType"
                label="策略类型"
                align="center"
                width="90">
                <template slot-scope="scope">
                    <span>{{ruleTypeMap[scope.row.ruleType]}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="dateRuleItem.name"
                label="时间设置"
                align="center"
                width="100">
            </el-table-column>
            <el-table-column
                prop="tplItems"
                width="90"
                label="通知方式">
                <template slot-scope="scope">
                    <span v-for="tplItem in scope.row.tplItems" :key="tplItem.msgTplId" style="margin-right:5px;">{{tplItem.msgName}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="eventRuleItems"
                label="策略内容">
                 <template slot-scope="scope">
                    <div v-for="ruleItem in scope.row.eventRuleItems" :key="ruleItem.msgTplId" style="margin-bottom:5px;">
                        <el-row>
                            <el-col :span="3">{{ruleItem.name}}</el-col>
                            <el-col :span="21">
                                <div v-for="secondLevel in ruleItem.children" :key="secondLevel.val">
                                    <el-row>
                                        <el-col :span="6">{{secondLevel.name}}</el-col>
                                        <el-col :span="18">
                                            <div v-for="thirdLevel in secondLevel.children" :key="thirdLevel.val">
                                                {{thirdLevel.name}}
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="tplItems"
                label="通知人">
                <template slot-scope="scope">
                    <div v-if="scope.row.userRuleItems">
                        <span v-for="tplItem in scope.row.userRuleItems" :key="tplItem.msgTplId" style="margin-right:5px;">{{tplItem.realName}}</span>
                    </div>
                    <div v-if="!scope.row.userRuleItems">所有人</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                width="90"
                label="操作">
                <template slot-scope="scope">
                    <span
                        title="编辑"
                        class="iconfont iconbianji-copy edit"
                        @click.stop="editRow(scope.row)">
                    </span>
                    <span
                        title="删除"
                        @click.stop="deleteRow(scope.row.id)"
                        class="iconfont iconshanchu1 delete">
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <!-- 集团管理员-列表 -->
         <el-table
            v-if="this.getRightListForPCNew.res.roleType === 3"
            :data="concatCompanyData.data"
            v-loading="concatCompanyData.loading"
            border
            :row-style="{'cursor': 'pointer'}"
            :max-height="vh - 260"
            row-class-name="row-style"
            cell-class-name="cell-style"
            header-row-class-name="header-row-style"
            header-cell-class-name="header-cell-style"
            style="width: 100%">
            <el-table-column
                prop="ruleType"
                label="策略类型"
                align="center"
                width="90">
                <template slot-scope="scope">
                    <span>{{ruleTypeMap[scope.row.ruleType]}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="dateRuleItem.name"
                label="时间设置"
                align="center"
                width="100">
            </el-table-column>
            <el-table-column
                prop="tplItems"
                width="90"
                label="通知方式">
                <template slot-scope="scope">
                    <span v-for="tplItem in scope.row.tplItems" :key="tplItem.msgTplId" style="margin-right:5px;">{{tplItem.msgName}}<br/></span>
                </template>
            </el-table-column>
            <el-table-column
                prop="eventRuleItems"
                label="策略内容">
                 <template slot-scope="scope">
                    <div v-for="ruleItem in scope.row.eventRuleItems" :key="ruleItem.msgTplId" style="margin-bottom:5px;">
                        <el-row>
                            <el-col :span="3">{{ruleItem.name}}</el-col>
                            <el-col :span="21">
                                <div v-for="secondLevel in ruleItem.children" :key="secondLevel.val">
                                    <el-row>
                                        <el-col :span="6">{{secondLevel.name}}</el-col>
                                        <el-col :span="18">
                                            <div v-for="thirdLevel in secondLevel.children" :key="thirdLevel.val">
                                                {{thirdLevel.name}}
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="tplItems"
                label="通知人">
                <template slot-scope="scope">
                    <div v-if="scope.row.userRuleItems">
                        <span v-for="tplItem in scope.row.userRuleItems" :key="tplItem.msgTplId" style="margin-right:5px;">{{tplItem.realName}}</span>
                    </div>
                    <div v-if="!scope.row.userRuleItems">所有人</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                width="90"
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <span v-if="!scope.row.default">
                        <span
                            title="编辑"
                            class="iconfont iconbianji-copy edit"
                            @click.stop="editRow(scope.row)">
                        </span>
                        <span
                            title="删除"
                            @click.stop="deleteRow(scope.row.id)"
                            class="iconfont iconshanchu1 delete">
                        </span>
                    </span>
                    <span v-if="scope.row.default">
                        <el-switch
                            v-model="scope.row.enable"
                            @change="v => changeEnableStatus(scope.row.id, scope.row.enable)"
                            inactive-color="grey">
                        </el-switch>
                        <br />
                        <span>{{scope.row.enable ? '已启用' : '已禁用'}}</span>
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <!-- 事件日志-事件分类 -->
        <el-dialog
            width="1200px"
            center
            @opened="$bus.emit('openNewStrategy')"
            @close="delete eventTypeModal.detail;"
            :visible.sync="eventTypeModal.visible"
            :title="'设备日志事件-事件类别方式'">
            <new-event-log-event @updateSuccess="updateSuccess" v-bind="eventTypeModal"></new-event-log-event>
            <div slot="footer" class="dialog-footer">
                <el-button type="b2" @click="eventTypeModal.visible = false">取 消</el-button>
                <el-button type="b1" @click="$bus.emit('saveStrategy')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 事件日志-故障码 -->
        <el-dialog
            width="1200px"
            center
            @opened="$bus.emit('openNewStrategyFaultCode')"
            @close="delete faultcodeModal.detail;"
            :visible.sync="faultcodeModal.visible"
            :title="'设备日志事件-故障码类别方式'">
            <new-event-log-faultcode @updateSuccess="updateSuccess" v-bind="faultcodeModal"></new-event-log-faultcode>
            <div slot="footer" class="dialog-footer">
                <el-button type="b2" @click="faultcodeModal.visible = false">取 消</el-button>
                <el-button type="b1" @click="$bus.emit('saveStrategyFaultcode')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    api＿getRightListForPCNew,
    api＿settingMode,
    api＿sendMessageListSystem,
    api＿sendMessageListCompany,
    api＿sendMessageListCompanyDefault,
    api＿companyIfEnable,
    api＿deleteStrategySystem,
    api＿deleteStrategyCompany
} from '@messageManage/request/api'
import MyPaging from '@comm/components/paging'
import {Table, TableColumn, Select, Option, Button, Dropdown, DropdownMenu, DropdownItem, Dialog, Row, Col, Message, MessageBox, Switch} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
    data () {
        return {
            ruleTypeMap: {
                1: '事件分类',
                2: '故障码'
            },
            getRightListForPCNew: api＿getRightListForPCNew({ // 99 :系统管理员 , 3:集团管理员
                later: true
            }),
            settingMode: api＿settingMode({
                later: true,
                res: {
                    data: []
                },
                theme: '',
                appId: null
            }),
            sendMessageListSystem: api＿sendMessageListSystem({ // 列表-系统
                later: true,
                onlyLatest: true,
                res: {
                    data: []
                }
            }),
            concatCompanyData: {
                data: [],
                loading: false
            },
            sendMessageListCompany: api＿sendMessageListCompany({ // 列表-集团
                later: true,
                onlyLatest: true,
                res: {
                    data: []
                }
            }),
            sendMessageListCompanyDefault: api＿sendMessageListCompanyDefault({ // 列表-集团-默认
                later: true,
                onlyLatest: true,
                res: {
                    data: []
                }
            }),
            companyIfEnable: api＿companyIfEnable({ // 列表-集团-禁用启用
                later: true,
                sameTimeOnce: true
            }),
            deleteStrategySystem: api＿deleteStrategySystem({ // 删除-系统
                later: true,
                sameTimeOnce: true
            }),
            deleteStrategyCompany: api＿deleteStrategyCompany({ // 删除-集团
                sameTimeOnce: true,
                later: true
            }),
            strategyType: '00',
            eventTypeModal: { // 事件分类弹框
                visible: false,
                roleType: null,
                appId: ''
            },
            faultcodeModal: { // 故障码弹框
                visible: false,
                appId: ''
            }
        }
    },
    created () {
        this.settingMode.subscribe(res => {
            this.settingMode.theme = res.data[0].dictCode
            this.settingMode.appId = res.data[0].dictValue
        })
        this.initTableListData()
        this.deleteStrategySystem.subscribe(res => {
            if (res.code !== 200) return Message.error(res.msg || res.body || '删除失败')
            Message.success(res.msg || res.body || '删除成功')
            this.tableListData()
        })
        this.deleteStrategyCompany.subscribe(res => {
            if (res.code !== 200) return Message.error(res.msg || res.body || '删除失败')
            Message.success(res.msg || res.body || '删除成功')
            this.tableListData()
        })
    },
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElSelect: Select,
        ElButton: Button,
        ElOption: Option,
        ElDropdown: Dropdown,
        ElDropdownMenu: DropdownMenu,
        ElDropdownItem: DropdownItem,
        ElDialog: Dialog,
        ElRow: Row,
        ElCol: Col,
        ElSwitch: Switch,
        MyPaging,
        newEventLogEvent: () => import('./newEventLogEvent'),
        newEventLogFaultcode: () => import('./newEventLogFaultcode')
    },
    methods: {
        changeTheme (type, dictValue) {
            this.settingMode.theme = type
            this.settingMode.appId = dictValue
            this.tableListData()
        },
        newStrategyType (v) {
            this[v]['visible'] = true
            this[v]['roleType'] = this.getRightListForPCNew.res.roleType
            this[v]['appId'] = this.settingMode.appId
            this[v]['solarOrWind'] = this.settingMode.theme
            this[v]['detail'] = null
        },
        editRow (row) {
            if (row.ruleType === 1) { // 事件分类
                this.eventTypeModal = {
                    visible: true,
                    roleType: this.getRightListForPCNew.res.roleType,
                    appId: this.settingMode.appId,
                    solarOrWind: this.settingMode.theme,
                    detail: row
                }
            } else if (row.ruleType === 2) { // 故障码
                this.faultcodeModal = {
                    visible: true,
                    appId: this.settingMode.appId,
                    solarOrWind: this.settingMode.theme,
                    detail: row
                }
            }
        },
        deleteRow (id) {
            MessageBox.confirm('此操作不可恢复，确定删除吗?', '提示', {
                type: 'warning'
            }).then(() => {
                if (this.getRightListForPCNew.res.roleType === 99) { // 系统管理员
                    this.deleteStrategySystem.getData({id})
                } else if (this.getRightListForPCNew.res.roleType === 3) { // 集团管理员
                    this.deleteStrategyCompany.getData({id})
                }
            }).catch(() => {})
        },
        async initTableListData () {
            await this.getRightListForPCNew.getData()
            await this.settingMode.getData()
            this.tableListData()
        },
        async tableListData () {
            if (this.getRightListForPCNew.res.roleType === 99) { // 系统管理员
                this.sendMessageListSystem.getData({appId: this.settingMode.appId, 'sort.id': 'desc'})
            } else if (this.getRightListForPCNew.res.roleType === 3) { // 集团管理员
                this.concatCompanyData.loading = true
                let part1Result = await this.sendMessageListCompany.getData({appId: this.settingMode.appId, 'sort.id': 'desc'})
                let part2Result = await this.sendMessageListCompanyDefault.getData({appId: this.settingMode.appId, 'sort.id': 'desc'})
                this.concatCompanyData.loading = false
                if (part1Result.code === 200 && part2Result.code === 200) {
                    part1Result.data.map(v => (v.default = false))
                    part2Result.data.map(v => {
                        v.default = true
                        if (v.enable === 1) {
                            v.enable = true
                        } else {
                            v.enable = false
                        }
                    })
                    this.concatCompanyData.data = part1Result.data.concat(part2Result.data)
                } else {
                    this.concatCompanyData.data = []
                }
            }
        },
        changeEnableStatus (id, ifEnable) { // 启用或者禁用
            this.companyIfEnable.getData({ruleId: id, enable: (ifEnable ? 1 : 0)}).then(res => {
                if (res.code !== 200) return Message.error(res.msg || res.body || '操作失败')
                Message.success(res.msg || res.body || '操作成功')
                this.tableListData()
            })
        },
        updateSuccess () { // 统一保存成功回调
            this.eventTypeModal.visible = false // 编辑框消失-事件分类
            this.faultcodeModal.visible = false // 编辑框消失-故障码
            this.tableListData()
        }
    }
}
</script>

<style lang="scss">
.message-manage{
    &.isHome {
        @import '@comm/assets/themes/table/t1.scss';
        .search-line{
            .el-input__inner, .el-textarea__inner {
                @include c(background-color, $bg_input_c1);
                @include c(border-color, $line_c1);
                @include c(color, $text_c2);

                &:focus, &:hover {
                    @include c(border-color, $line_c1);
                }
            }
        }
    }
    color: white;
    padding:20px 30px;
    .el-table td span.iconfont {
        padding: 0.5em;
        cursor: pointer;
        &.edit {
            @include c(color, $text_c1);
        }
        &.delete {
            @include c(color, $text_c3);
        }
        &.look {
            @include c(color, $text_c1);
            &.isNone {
                pointer-events: none;
                opacity: 0;
            }
        }
    }
    .el-button--mini.is-round {
        background: transparent;
        color: #31d3c9;
        border: 1px solid #31d3c9;
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
    .label {
        @include c(color, $text_c2);
        font-size: 14px;
        margin-right:6px;
    }
}
</style>
