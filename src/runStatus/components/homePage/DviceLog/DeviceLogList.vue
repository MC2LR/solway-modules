<template>
    <div class="device-log">
        <div class="content">
            <div class="header">
                <el-page-header @back="$router.go(-1)" content="设备日志"></el-page-header>
            </div>

            <div class="clearfix filter">
                <el-form
                    ref="queryForm"
                    :inline="true"
                    :model="deviceLogNewDeviceLogListByPageAndStartTime.params"
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
                                @input="popover_text = popoverText"
                                v-model="popover_text"
                                class="input-i1"
                                slot="reference">
                            </el-input>
                        </el-popover>
                    </el-form-item>

                    <el-form-item
                        label="事件类型">
                        <el-select
                            class="s1 input-i1"
                            placeholder="全部"
                            clearable
                            multiple
                            collapse-tags
                            v-model="deviceLogNewDeviceLogListByPageAndStartTime.params.eventTypes">
                            <el-option
                                v-for="item in BasedictionarySelectAll.res"
                                :key="item.id"
                                :label="item.dictName"
                                :value="item.dictValue">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item
                        label="开始时间">
                        <el-date-picker
                            ref="datePicker"
                            class="input-i1"
                            unlink-panels
                            :clearable="false"
                            v-model="deviceLogNewDeviceLogListByPageAndStartTime.params.date"
                            :pickerOptions="{
                                shortcuts: shortcuts,
                                disabledDate: disabledDate.bind(this)
                            }"
                            format="yyyy-MM-dd HH:mm"
                            @focus="(vm) => changeDatePicker(deviceLogNewDeviceLogListByPageAndStartTime.isToday, vm)"
                            type="datetimerange"
                            popper-class="device-log-daterange"
                            align="right"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item
                        class="pull-right"
                        style="margin-right: 0;">
                        <el-button type="b1" @click="deviceLogNewDeviceLogListByPageAndStartTime.getData()">查询</el-button>
                        <el-button type="b3" @click="formReset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div style="margin-bottom: 10px;line-height: 34px;padding: 0 10px;" class="clearfix">
                <el-button @click="batchEdit" type="text">
                    <i class="iconfont icontiaozheng"></i>
                    <span>批量调整设备运行状态</span>
                </el-button>
                <my-paging
                    style="float: right;color:#fff;"
                    :pageSizeArr="[10, 20, 50, 100, 1000, 2000]"
                    @change="data => deviceLogNewDeviceLogListByPageAndStartTime.getData(data)"
                    v-bind="deviceLogNewDeviceLogListByPageAndStartTime.res.body"
                    :total="deviceLogNewDeviceLogListByPageAndStartTime.res.body.total > 10000 ? 10000 : deviceLogNewDeviceLogListByPageAndStartTime.res.body.total"/>
            </div>

            <el-table
                @selection-change="v => multipleSelection = v"
                border
                v-loading="deviceLogNewDeviceLogListByPageAndStartTime.loading"
                :row-style="{'cursor': 'pointer'}"
                :max-height="vh - 242"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                :data="deviceLogNewDeviceLogListByPageAndStartTime.res.body.data">
                <el-table-column
                    type="index"
                    fixed
                    align="center"
                    :index="deviceLogNewDeviceLogListByPageAndStartTime.res.body.pageIndex * deviceLogNewDeviceLogListByPageAndStartTime.res.body.pageSize + 1">
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
                    min-width="120px"
                    label="设备类型">
                </el-table-column>
                <el-table-column
                    prop="deviceName"
                    sortable
                    fixed
                    width="200px"
                    label="设备">
                </el-table-column>
                <el-table-column
                    prop="sStartTime"
                    sortable
                    min-width="155px"
                    :formatter="(row, column, cellValue, index) => cellValue && new Date(cellValue).Format('yyyy-MM-dd hh:mm')"
                    align="center"
                    label="开始时间">
                </el-table-column>
                <el-table-column
                    prop="sEndTime"
                    sortable
                    min-width="155px"
                    :formatter="(row, column, cellValue, index) => cellValue && new Date(cellValue).Format('yyyy-MM-dd hh:mm')"
                    align="center"
                    label="结束时间">
                </el-table-column>
                <el-table-column
                    prop="eventDesc"
                    sortable
                    min-width="120"
                    label="事件类型">
                </el-table-column>
                <el-table-column
                    prop="handStatusStr"
                    min-width="120px"
                    label="状态">
                </el-table-column>
                <el-table-column
                    prop="sureTime"
                    min-width="155px"
                    :formatter="(row, column, cellValue, index) => cellValue && new Date(cellValue).Format('yyyy-MM-dd hh:mm')"
                    label="确认时间">
                </el-table-column>
                <el-table-column
                    prop="sureUserRealName"
                    width="120px"
                    label="确认人">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    width="120px"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <span
                            v-if="!scope.row.operatorStatus"
                            title="调整运行状态"
                            class="iconfont icontiaozheng edit"
                            @click.stop="() => singleEdit(scope.row)">
                        </span>
                    </template>
                </el-table-column>
            </el-table>

            <!-- <div class="footer">
                <my-paging
                    :pageSizeArr="[10, 20, 50, 100, 1000, 2000]"
                    @change="data => deviceLogNewDeviceLogListByPageAndStartTime.getData(data)"
                    v-bind="deviceLogNewDeviceLogListByPageAndStartTime.res.body"/>
            </div> -->

        </div>

        <el-dialog
            width="1200px"
            center
            @open="$bus.emit('openNewRecord')"
            @close="recordDetail.disabled = false; delete recordDetail.detail;"
            title="调整运行状态"
            :visible.sync="recordDetail.visible">
            <new-record @updateSuccess="updateSuccess" v-bind="recordDetail"></new-record>
            <div slot="footer" class="dialog-footer">
                <el-button type="b2" @click="recordDetail.visible = false">取 消</el-button>
                <el-button v-if="!recordDetail.disabled" type="b1" @click="$bus.emit('saveRecord')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    api＿deviceLogNewDeviceLogListByPageAndStartTime,
    api＿getSTClassLIst,
    api＿baseSearchConditionGetAllComByRole,
    api＿stateAdjustDeleteStateAdjust,
    api＿BasedictionarySelectAll
} from '@runStatus/request/api'
import {Table, TableColumn, Select, Option, Form, FormItem, Input, Button, DatePicker, Popover, Dialog, Message, PageHeader} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import MyPaging from '@comm/components/paging'

export default {
    mixins: [mixinWidthHeight],
    data () {
        return {
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
            BasedictionarySelectAll: api＿BasedictionarySelectAll({
                later: true
            }),
            deviceLogNewDeviceLogListByPageAndStartTime: api＿deviceLogNewDeviceLogListByPageAndStartTime({
                later: true,
                cache: true,
                onlyLatest: true,
                beforeSend (params) {
                    if (params.date) {
                        params.startDate = params.date[0].Format('yyyy-MM-dd hh:mm')
                        params.endDate = params.date[1].Format('yyyy-MM-dd hh:mm')
                        delete params.date
                    }
                    const {stClass, comIds, stIds, deviceType, isToday, st_eqid: stEqid} = this
                    if (params.eventTypes) params.eventTypes = params.eventTypes.join()
                    return {...params, stClass, comIds, stIds, deviceType, isToday, st_eqids: stEqid}
                },
                comIds: '',
                stIds: '',
                deviceType: '',
                stClass: '01',
                isToday: 0,
                res: {
                    body: {
                        data: []
                    }
                },
                params: {
                    date: [new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), new Date(Date.now() - (Date.now() % 86400000) - 28800000 - 1000)]
                }
            }),
            exportLoading: false,
            disabledDate (time) {
                if (this.deviceLogNewDeviceLogListByPageAndStartTime.isToday === 1) {
                    return (time.getTime() > Date.now()) || (time.getTime() < (Date.now() - (Date.now() % 86400000) - 28800000))
                } else {
                    return time.getTime() > (Date.now() - (Date.now() % 86400000) - 28800000 - 1)
                }
            },
            shortcuts: [
                {
                    text: '今日以前',
                    onClick (picker) {
                        picker.$bus.emit('changeDatePicker', 0)
                        picker.$emit('pick', [new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), new Date(Date.now() - (Date.now() % 86400000) - 28800000 - 1000)])
                    }
                },
                {
                    text: '今日',
                    onClick (picker) {
                        picker.$bus.emit('changeDatePicker', 1)
                        picker.$emit('pick', [new Date(Date.now() - (Date.now() % 86400000) - 28800000), new Date()])
                    }
                }
            ]
        }
    },
    created () {
        this.$bus.on('changeDatePicker', this.changeDatePicker)
        this.stateAdjustDeleteStateAdjust.subscribe(res => {
            Message({
                message: res.msg,
                type: res.code === 0 ? 'success' : 'error'
            })
            this.deviceLogNewDeviceLogListByPageAndStartTime.getData()
        })

        this.BasedictionarySelectAll.subscribe(res => {
            this.deviceLogNewDeviceLogListByPageAndStartTime.params.eventTypes = []
        })
    },
    beforeDestroy () {
        this.$bus.off('changeDatePicker', this.changeDatePicker)
    },
    mounted () {

    },
    methods: {
        async changeDatePicker (type, vm) {
            if (vm) await this.$timeout(200)
            this.deviceLogNewDeviceLogListByPageAndStartTime.isToday = type
            const eles = document.querySelectorAll('.device-log-daterange .el-picker-panel__shortcut')
            eles[0].className = 'el-picker-panel__shortcut'
            eles[1].className = 'el-picker-panel__shortcut'
            eles[type].className = 'el-picker-panel__shortcut active'
            if (!vm) {
                await this.$timeout(200)
                this.$refs.datePicker.focus()
            }
        },
        deviceChange (text, data) {
            this.popover_text = this.popoverText = text
            const {stClass, comIds, stIds, deviceType, st_eqid: stEqid} = data
            this.deviceLogNewDeviceLogListByPageAndStartTime.comIds = comIds.join()
            this.deviceLogNewDeviceLogListByPageAndStartTime.stClass = stClass
            this.deviceLogNewDeviceLogListByPageAndStartTime.stIds = stIds.join()
            this.deviceLogNewDeviceLogListByPageAndStartTime.deviceType = deviceType.join()
            this.deviceLogNewDeviceLogListByPageAndStartTime.st_eqid = stEqid
            if ((stClass === '01' && this.BasedictionarySelectAll.params.dictType !== 'EVENT_TYPE') || (stClass === '02' && this.BasedictionarySelectAll.params.dictType !== 'EVENT_TYPE_WP')) {
                this.BasedictionarySelectAll.getData({
                    dictType: stClass === '01' ? 'EVENT_TYPE' : 'EVENT_TYPE_WP'
                })
            }
            if (!this.deviceLogNewDeviceLogListByPageAndStartTime.reqNumber) {
                this.deviceLogNewDeviceLogListByPageAndStartTime.getData({stClass})
            }
            if (this.isReset) {
                this.deviceLogNewDeviceLogListByPageAndStartTime.getData({stClass})
                this.isReset = false
            }
        },
        updateSuccess () {
            this.recordDetail.visible = false
            this.deviceLogNewDeviceLogListByPageAndStartTime.getData({s: Date.now()})
        },
        formReset () {
            this.$refs.queryForm.resetFields()
            this.deviceLogNewDeviceLogListByPageAndStartTime.params.eventTypes = []
            this.deviceLogNewDeviceLogListByPageAndStartTime.isToday = 0
            this.deviceLogNewDeviceLogListByPageAndStartTime.params.date = [new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), new Date(Date.now() - (Date.now() % 86400000) - 28800000 - 1000)]
            // this.deviceLogNewDeviceLogListByPageAndStartTime.params.date = [new Date(Date.now() - (Date.now() % 86400000) - 28800000), new Date()]
            this.deviceLogNewDeviceLogListByPageAndStartTime.res.body.data = []
            this.isReset = true
            this.$bus.emit('reset')
        },
        batchEdit (event) {
            if (!this.multipleSelection[0]) return Message.info('请勾选要调整的记录！')
            if (!this.multipleSelection.every((v, i, arr) => v.stId === arr[0].stId)) return Message.error('一次只能选择一个站的设备进行操作！')
            if (!this.multipleSelection.every((v, i, arr) => v.deviceType === arr[0].deviceType)) return Message.error('一次只能选择一种设备类型进行操作！')
            if (!this.multipleSelection.every((v, i, arr) => !v.operatorStatus)) return Message.error('选中日志中有日志已经导入，请到运行状态调整操作！')
            this.recordDetail.detail = {
                ...this.multipleSelection[0],
                deviceIds: this.multipleSelection.map(v => v.serialNumber).join(),
                log_deviceIds: this.multipleSelection.map(v => v.id).join(),
                startDate: this.multipleSelection[0].sStartTime,
                endDate: this.multipleSelection[0].sEndTime,
                eventExplain: this.multipleSelection[0].eventDesc
            }
            this.recordDetail.visible = true
        },
        singleEdit (row) {
            this.recordDetail.detail = {
                ...row,
                deviceId: row.serialNumber,
                log_deviceIds: row.id,
                startDate: row.sStartTime,
                endDate: row.sEndTime,
                eventExplain: row.eventDesc
            }
            this.recordDetail.visible = true
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
        ElPageHeader: PageHeader,
        MyPaging,
        PopoverContent: () => import('../DefaultList/PopvoerContent'),
        NewRecord: () => import('./../DefaultList/NewRecord')
    }
}
</script>

<style lang="scss">
@import '@comm/assets/themes/popover/p1.scss';
.device-log {
    @import '@comm/assets/themes/table/t1.scss';

    .content {
        .el-page-header__title {
            font-size: 18px;
        }

        .el-page-header__content {
            @include c(color, $text_c0);
        }

        .el-form-item {
            margin-bottom: 10px;

            .el-select {
                width: 150px;

                .el-input input {
                    width: 100%;
                }
            }

            .el-input input {
                width: calc(100vw - 940px);
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

.device-log-daterange .el-button.el-picker-panel__link-btn.el-button--text.el-button--mini {
    display: none;
}
</style>

<style lang="scss" scoped>
.device-log {
    @include c(color, $text_c0);
    margin-top: 15px;
    padding: 0 30px;
    height: calc(100vh - 100px);

    .content {
        height: 100%;
        overflow: auto;
        @include c(background-color, $bg_c3);

        .header {
            padding: 10px;
            @include c(background-color, rgba(#fff, .022));
        }

        .filter {
            line-height: 0;
            padding: 10px 10px 0;
        }

        // .footer {
        //     padding: 0 10px;

        //     .my-paging{
        //         float: right;
        //         color: #fff;
        //         height: 50px;
        //         line-height: 50px;
        //     }
        // }

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
            }
        }

    }
}
</style>
