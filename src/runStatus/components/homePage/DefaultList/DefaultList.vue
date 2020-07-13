<template>
    <div class="default-list">
        <div class="content">
            <div style="height: 10px;"></div>

            <div class="clearfix filter">
                <el-form
                    ref="queryForm"
                    :inline="true"
                    :model="stateAdjustGetStateAdjustListByPage.params"
                    size="small">

                    <el-form-item
                        label="设备">
                        <el-popover
                            @hide="$bus.emit('popoverHide')"
                            style="display:block"
                            trigger="click"
                            placement="bottom-start"
                            width="1000">
                            <popover-content @change="deviceChange"></popover-content>
                            <el-input
                                @input="popover_text = popoverText" v-model="popover_text"
                                slot="reference"
                                class="input-i1">
                            </el-input>
                        </el-popover>
                    </el-form-item>

                    <el-form-item
                        label="实际状态">
                        <el-select
                            class="input-i1"
                            placeholder="全部"
                            clearable
                            v-model="stateAdjustGetStateAdjustListByPage.params.realStatus">
                            <el-option label="正常运行" value="00"></el-option>
                            <el-option label="故障停机" value="01"></el-option>
                            <el-option label="限电停机" value="02"></el-option>
                            <el-option label="检修停机" value="03"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item
                        label="开始时间">
                        <el-date-picker
                            unlink-panels
                            v-model="stateAdjustGetStateAdjustListByPage.params.date"
                            :pickerOptions="{
                                disabledDate (time) {
                                    return time.getTime() > Date.now();
                                }
                            }"
                            class="input-i1"
                            format="yyyy-MM-dd HH:mm"
                            type="datetimerange"
                            align="center"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item
                        class="pull-right"
                        style="margin-right: 0;">
                        <el-button type="b1" @click="stateAdjustGetStateAdjustListByPage.getData()">查询</el-button>
                        <el-button type="b3" @click="formReset">重置</el-button>
                        <el-button type="b2" @click="exportList" v-loading="exportLoading">导出</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div style="margin-bottom: 10px;height: 34px;line-height:34px;" class="clearfix">
                <el-button @click="recordDetail.visible = true" type="text">
                    <i class="iconfont iconxinjian"></i>
                    <span>新增</span>
                </el-button>
                <el-button @click="$router.push('/DeviceLog')" type="text" style="margin-left: 20px;">
                    <i class="iconfont iconrizhi"></i>
                    <span>从设备日志生成</span>
                </el-button>
                <el-button @click="deleteRecord()" type="text" style="margin-left: 20px;">
                    <i class="iconfont iconshanchu1"></i>
                    <span>删除选中</span>
                </el-button>
                <my-paging
                    :pageSizeArr="[5, 10, 20, 50, 100, 1000]"
                    @change="data => stateAdjustGetStateAdjustListByPage.getData(data)"
                    v-bind="stateAdjustGetStateAdjustListByPage.res.body"/>
            </div>

            <el-table
                @selection-change="v => multipleSelection = v"
                @row-click="(row, column, cell, event) => {
                    recordDetail.disabled = true
                    recordDetail.visible = true
                    recordDetail.detail = row
                }"
                border
                v-loading="stateAdjustGetStateAdjustListByPage.loading"
                :row-style="{'cursor': 'pointer'}"
                :max-height="vh - 180"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                :data="stateAdjustGetStateAdjustListByPage.res.body.data">
                <el-table-column
                    fixed
                    type="expand">
                    <template slot-scope="props">
                        <my-detail :row="props.row"></my-detail>
                    </template>
                </el-table-column>
                <el-table-column
                    type="selection"
                    align="center"
                    fixed>
                </el-table-column>
                <el-table-column
                    prop="stName"
                    sortable
                    fixed
                    show-overflow-tooltip
                    width="200px"
                    label="电站">
                </el-table-column>
                <el-table-column
                    prop="deviceTypeStr"
                    sortable
                    width="120px"
                    label="设备类型">
                </el-table-column>
                <el-table-column
                    prop="deviceName"
                    sortable
                    fixed
                    show-overflow-tooltip
                    width="120px"
                    label="设备">
                </el-table-column>
                <el-table-column
                    prop="startDate"
                    sortable
                    width="155px"
                    :formatter="(row, column, cellValue, index) => new Date(cellValue).Format('yyyy-MM-dd hh:mm')"
                    align="center"
                    label="开始时间">
                </el-table-column>
                <el-table-column
                    prop="endDate"
                    sortable
                    width="155px"
                    :formatter="(row, column, cellValue, index) => new Date(cellValue).Format('yyyy-MM-dd hh:mm')"
                    align="center"
                    label="结束时间">
                </el-table-column>
                <el-table-column
                    prop="realStatusStr"
                    sortable
                    width="120"
                    label="实际状态">
                </el-table-column>
                <el-table-column
                    prop="lostElecSystem"
                    width="180px"
                    align="right"
                    label="系统计算损失电量(kWh)">
                </el-table-column>
                <el-table-column
                    prop="lostElecUser"
                    width="180px"
                    align="right"
                    label="人工统计损失电量(kWh)">
                </el-table-column>
                <el-table-column
                    prop="eventExplain"
                    min-width="230px"
                    label="事件说明">
                </el-table-column>
                <el-table-column
                    prop="referenceDeviceName"
                    width="150px"
                    label="电量计算参考设备">
                </el-table-column>
                <el-table-column
                    prop="dayRate"
                    width="150px"
                    label="电量每日折算比例">
                </el-table-column>
                <el-table-column
                    prop="updateDate"
                    sortable
                    width="155px"
                    :formatter="(row, column, cellValue, index) => new Date(cellValue).Format('yyyy-MM-dd hh:mm')"
                    align="center"
                    label="录入日期">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    width="150px"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <span
                            title="编辑"
                            class="iconfont iconbianji-copy edit"
                            @click.stop="recordDetail.visible = true; recordDetail.detail = scope.row">
                        </span>
                        <span
                            title="删除"
                            @click.stop="deleteRecord(scope.row.id)"
                            class="iconfont iconshanchu1 delete">
                        </span>
                        <span
                            title="查看关联日志"
                            :class="{isNone: !scope.row.deviceLogId}"
                            @click.stop="deviceLog.id = scope.row.deviceLogId; deviceLog.show = true;"
                            class="iconfont iconziyuan look">
                        </span>
                    </template>
                </el-table-column>
            </el-table>

            <!-- <div>
                <el-button @click="deleteRecord()" type="b4" class="pull-left" style="margin-top: 10px;">删除选中</el-button>

                <my-paging
                    :pageSizeArr="[5, 10, 20]"
                    @change="data => stateAdjustGetStateAdjustListByPage.getData(data)"
                    v-bind="stateAdjustGetStateAdjustListByPage.res.body"/>
            </div> -->
        </div>

        <el-dialog
            width="1200px"
            center
            @opened="$bus.emit('openNewRecord')"
            @close="recordDetail.disabled = false; delete recordDetail.detail;"
            :title="recordDetail.disabled ? '查看' : (recordDetail.detail ? '编辑' : '新增')"
            :visible.sync="recordDetail.visible">
            <new-record @updateSuccess="updateSuccess" v-bind="recordDetail"></new-record>
            <div slot="footer" class="dialog-footer">
                <el-button type="b2" @click="recordDetail.visible = false">取 消</el-button>
                <el-button v-if="!recordDetail.disabled" type="b1" @click="$bus.emit('saveRecord')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog
            width="700px"
            center
            :destroy-on-close="true"
            title="关联日志"
            :visible.sync="deviceLog.show">
            <associated-logs :id="deviceLog.id"></associated-logs>
        </el-dialog>
    </div>
</template>

<script>
import {
    api＿stateAdjustGetStateAdjustListByPage,
    api＿getSTClassLIst,
    api＿baseSearchConditionGetAllComByRole,
    api＿stateAdjustexportStateAdjustList,
    api＿stateAdjustDeleteStateAdjust
} from '@runStatus/request/api'
import {Table, TableColumn, Select, Option, Form, FormItem, Input, Button, DatePicker, Popover, Dialog, MessageBox, Message} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import MyPaging from '@comm/components/paging'
import {download} from '@comm/request/http'

export default {
    mixins: [mixinWidthHeight],
    data () {
        return {
            deviceLog: {
                show: false
            },
            recordDetail: {
                visible: false,
                disabled: false
            },
            multipleSelection: [],
            popoverVisible: false,
            popoverText: '',
            popover_text: '',
            getSTClassLIst: api＿getSTClassLIst({
                onlyLatest: true,
                res: { data: [] }
            }),
            baseSearchConditionGetAllComByRole: api＿baseSearchConditionGetAllComByRole({
                later: true
            }),
            stateAdjustDeleteStateAdjust: api＿stateAdjustDeleteStateAdjust({
                later: true
            }),
            stateAdjustGetStateAdjustListByPage: api＿stateAdjustGetStateAdjustListByPage({
                later: true,
                onlyLatest: true,
                cache: true,
                beforeSend (params) {
                    if (params.date) {
                        params.startDate = params.date[0].Format('yyyy-MM-dd hh:mm')
                        params.endDate = params.date[1].Format('yyyy-MM-dd hh:mm')
                        delete params.date
                    }
                    const {stClass, comId, stId, deviceType, st_eqid: stEqid} = this
                    return {...params, stClass, comId, stId, deviceType, st_eqid: stEqid}
                },
                comId: '',
                stId: '',
                deviceType: '',
                stClass: '01',
                res: {
                    body: {
                        data: []
                    }
                }
            }),
            exportLoading: false
        }
    },
    created () {
        this.stateAdjustDeleteStateAdjust.subscribe(res => {
            Message({
                message: res.msg,
                type: res.code === 0 ? 'success' : 'error'
            })
            this.stateAdjustGetStateAdjustListByPage.getData({s: Date.now()})
        })
    },
    methods: {
        deviceChange (text, data) {
            this.popover_text = this.popoverText = text
            const {stClass, comIds, stIds, deviceType, st_eqid: stEqid} = data
            this.stateAdjustGetStateAdjustListByPage.comId = comIds.join()
            this.stateAdjustGetStateAdjustListByPage.stClass = stClass
            this.stateAdjustGetStateAdjustListByPage.stId = stIds.join()
            this.stateAdjustGetStateAdjustListByPage.deviceType = deviceType.join()
            this.stateAdjustGetStateAdjustListByPage.st_eqid = stEqid
            if (!this.stateAdjustGetStateAdjustListByPage.reqNumber) {
                this.stateAdjustGetStateAdjustListByPage.getData({stClass})
            }
            if (this.isReset) {
                this.stateAdjustGetStateAdjustListByPage.getData({stClass})
                this.isReset = false
            }
        },
        formReset () {
            this.$refs.queryForm.resetFields()
            this.stateAdjustGetStateAdjustListByPage.params.realStatus = ''
            this.stateAdjustGetStateAdjustListByPage.params.date = null
            this.stateAdjustGetStateAdjustListByPage.res.body.data = []
            this.isReset = true
            this.$bus.emit('reset')
        },
        async exportList () {
            if (this.exportLoading) return
            await this.stateAdjustGetStateAdjustListByPage.getData()
            const {params, stClass, comId, stId, deviceType} = this.stateAdjustGetStateAdjustListByPage
            this.exportLoading = true
            const _this = this
            download({
                url: api＿stateAdjustexportStateAdjustList,
                params: {
                    ...params,
                    stClass,
                    comId,
                    stId,
                    deviceType
                },
                callback () {
                    _this.exportLoading = false
                }
            })
        },
        deleteRecord (id) {
            if (!id && !this.multipleSelection[0]) return Message.info('请勾选要删除的记录！')
            MessageBox.confirm('此操作不可恢复，确定删除吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.stateAdjustDeleteStateAdjust.getData({ids: id || this.multipleSelection.map(v => v.id).join()})
            }).catch(() => {})
        },
        updateSuccess () {
            this.recordDetail.visible = false
            this.stateAdjustGetStateAdjustListByPage.getData({s: Date.now()})
        }
    },
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElSelect: Select,
        ElOption: Option,
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElButton: Button,
        ElDatePicker: DatePicker,
        ElPopover: Popover,
        ElDialog: Dialog,
        MyPaging,
        PopoverContent: () => import('./PopvoerContent'),
        NewRecord: () => import('./NewRecord'),
        MyDetail: () => import('./detail'),
        AssociatedLogs: () => import('./AssociatedLogs')
    }
}
</script>

<style lang="scss">
@import '@comm/assets/themes/popover/p1.scss';
.default-list {
    @import '@comm/assets/themes/table/t1.scss';

    .content {
        .el-form-item {
            .el-select {
                width: 100px;

                .el-input input {
                    width: 100%;
                }
            }

            .el-input input {
                width: calc(100vw - 930px);
                max-width: 500px;
            }

            .el-form-item__label {
                @include c(color, $text_c2);
            }

            // .el-input__inner, .el-textarea__inner {
            //     @include c(background-color, $bg_input_c1);
            //     @include c(border-color, $line_c1);
            //     @include c(color, $text_c2);

            //     &:focus, &:hover {
            //         @include c(border-color, $line_c1);
            //     }
            // }
        }

        .el-date-editor {
            width: 340px;

            .el-range-separator, .el-range__icon, .el-range__close-icon {
                line-height: 26px;
            }

            .el-range-separator {
                width: 10%;
                @include c(color, $text_c2);
            }

            input {
                @include c(background-color, $bg_input_c1);
                @include c(color, $text_c2);
            }
        }
    }
}
</style>

<style lang="scss" scoped>

.default-list {

    .content {
        margin: 0 30px;

        .filter {
            line-height: 0;
        }

        .my-paging{
            float: right;
            color: #fff;
        }

        .router-link {
            @include c(color, $text_c1);
            margin: 0 .5em 10px;
            cursor: pointer;
        }

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
    }
}
</style>
