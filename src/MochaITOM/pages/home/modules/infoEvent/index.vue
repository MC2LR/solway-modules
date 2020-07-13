<template>
    <div class="info-event-mochal">
       <span class="module-name">事件信息</span>
       <div class="container-info">
            <el-row class="condition-con">
                <el-col :span="9">
                    <span class="tab-btn" :class="{'tab-active': handleStatus === '00'}" @click="changeTab('00')">未处理</span><span class="tab-btn" :class="{'tab-active': handleStatus === '01'}" @click="changeTab('01')">无需处理</span><span class="tab-btn" :class="{'tab-active': handleStatus === '02'}" @click="changeTab('02')">已派工</span>
                </el-col>
                <el-col :span="8">
                    <span class="lable-small">语音播报</span>
                    <el-switch
                        v-model="voiceFlag"
                        @change="v => changeVoice(v)"
                        inactive-color="grey">
                    </el-switch>
                    <span class="lable-small" style="margin-left:16px;">铃声播报</span>
                    <el-switch
                        v-model="bellFlag"
                        @change="v => changeBell(v)"
                        inactive-color="grey">
                    </el-switch>
                </el-col>
                <el-col :span="7">
                    <span style="display:inline-block;width:80px;height:30px; vertical-align: middle;">
                        <el-button size="mini" class="red" v-if="handleStatus === '00'" @click="noNeedHandle()">无需处理</el-button>
                    </span>
                    <el-button size="mini" class="green" @click="showDispatchDialog()">派工</el-button>
                </el-col>
            </el-row>
            <div class="status-con">
                <!-- <span class="filter-btn-con"><span class="cancel-btn">已过滤<i class="iconfont iconcuowu"></i></span></span> -->
                <span class="status-line">
                    <span class="status total" @click="setStatus('1,-9,2')" :class="{'status-active': currentStatusTab === '1,-9,2'}"><i class="iconfont iconjilu"></i> <span class="status-name">总记录</span> <span>{{alarmTotalInfo.unCloseTotal}}</span></span><!--
                    --><span class="status fault" @click="setStatus('1')" :class="{'status-active': currentStatusTab === '1'}"><i class="iconfont iconguzhang"></i> <span class="status-name">故障</span> <span>{{alarmTotalInfo.faultTotal}}</span></span><!--
                    --><span class="status alarm" @click="setStatus('2')" :class="{'status-active': currentStatusTab === '2'}"><i class="iconfont iconbaojing"></i> <span class="status-name">报警</span> <span>{{alarmTotalInfo.warnTotal}}</span></span><!--
                    --><span class="status interrupt" @click="setStatus('-9')" :class="{'status-active': currentStatusTab === '-9'}"><i class="iconfont icontongxunzhongduan"></i> <span class="status-name">通讯中断</span> <span>{{alarmTotalInfo.blockTotal}}</span></span>
                </span>
            </div>
       </div>
        <div class="table-line">
            <div class="drawer" :class="{'open': showDrawer}">
                <div style="margin-top:10px;cursor:pointer" @click="toShowDetaile"><i class="iconfont iconxiaozhushou"></i> 故障小助手</div>
                <div style="margin-top:10px;cursor:pointer" @click="openDevicePop(selectedTableLineData.pstationid, selectedTableLineData.deviceSerialNnumber)"><i class="iconfont iconchakan" style="font-size:19px;vertical-align:middle;"></i> 查看设备运行数据</div>
            </div>
            <el-table
                ref="tableRef"
                highlight-current-row
                v-if="runAlarmListData.res.data"
                @row-click="(row, column, cell, event) => rowClick(row, column, cell, event)"
                v-loading="runAlarmListData.loading"
                :data="runAlarmListData.res.data.alarmList"
                border
                :row-style="{'cursor': 'pointer'}"
                row-class-name="row-style"
                height="100%"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                @selection-change="handleSelectionChange"
                empty-text="暂无事件"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    :selectable='selectable'
                    text-align="center"
                    width="45">
                </el-table-column>
                <el-table-column
                    prop="pstationname"
                    label="电站名称">
                    <template slot-scope="scope">
                        <span :title="scope.row.pstationname">{{scope.row.pstationname}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="devicename"
                    label="设备名称">
                    <template slot-scope="scope">
                        <span :title="scope.row.devicename">{{scope.row.devicename}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="sstartTime"
                    width="90"
                    :formatter="(row, column, cellValue) => cellValue && new Date(cellValue).Format('MM.dd hh:mm')"
                    label="发生时间">
                </el-table-column>
                <el-table-column
                    prop="faultclassStr"
                    min-width="80"
                    label="事件类型">
                    <template slot-scope="scope">
                        <span :title="scope.row.faultclassStr" :class="{fault: scope.row.eventType === 1, alarm: scope.row.eventType === 2, interrupt: scope.row.eventType === -9}">{{scope.row.faultclassStr}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="eventDesc"
                    min-width="80"
                    label="事件描述">
                    <template slot-scope="scope">
                        <span :title="scope.row.eventDesc">{{scope.row.eventDesc}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="handleRealname"
                    min-width="80"
                    label="处理人">
                </el-table-column>
                <el-table-column
                    prop="handleStatus"
                    min-width="75"
                    label="状态">
                    <template slot-scope="scope">
                        {{handleStatusMap[scope.row.handleStatus]}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <assistant class="assit"></assistant>
    </div>
</template>

<script>
import {Row, Col, Switch, Button, Table, TableColumn, Message, MessageBox} from 'element-ui'
import {getRunAlarmList, withoutHandle} from '@/request/api'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import devicePopUp from '@newEnergyCloud/components/devicePopUp'
import assistant from '../assistant/index'
export default {
    mixins: [mixinWidthHeight],
    data () {
        return {
            currentStatusTab: '1,-9,2',
            handleStatus: '00',
            handleStatusMap: {'00': '未处理', '01': '无需处理', '02': '已派工', '03': '处理完成'},
            voiceFlag: true,
            bellFlag: true,
            showDrawer: false,
            checkedRows: [],
            selectedLineId: '',
            selectedTableLineData: {}, // table选中行的数据对象
            alarmTotalInfo: {}, // 报警信息（状态数量）
            repairParamsObj: {
                isRepair: false
            },
            runAlarmListData: getRunAlarmList({
                later: true
            }),
            withoutHandleData: withoutHandle({
                later: true
            })
        }
    },
    methods: {
        // 故障小助手弹窗
        toShowDetaile () {
            this.$bus.emit('showAssistant', 'haha')
        },
        // 设备运行弹框
        openDevicePop (stid, eqid) {
            devicePopUp({stid, eqid})
        },
        changeTab (tab) {
            this.handleStatus = tab
            this.showDrawer = false
            this.initListData()
        },
        setStatus (tab) {
            this.currentStatusTab = tab
            this.showDrawer = false
            this.initListData()
        },
        changeVoice () {},
        changeBell () {},
        selectable (row, index) {
            return !row.hasChildren
        },
        handleSelectionChange (val) {
            this.checkedRows = val
        },
        initListData () {
            let params = {eventTypes: this.currentStatusTab, handleStatus: this.handleStatus, maxUpdateTime: 0, notShowFinish: 1, voiceTime: 1590039179}
            this.runAlarmListData.getData(params)
        },
        rowClick (row, column, cell, event) {
            this.showDrawer = false
            if (this.selectedLineId === row.id) {
                this.selectedLineId = ''
                this.selectedTableLineData = {}
                this.$refs.tableRef.setCurrentRow()
                return
            }
            setTimeout(() => {
                this.selectedLineId = row.id
                this.selectedTableLineData = row
                this.showDrawer = true
            }, 100)
        },
        // 无需处理
        noNeedHandle () {
            if (!this.checkedRows.length) return Message.error('请至少勾选一个事件')
            MessageBox.confirm('确定无需处理这些事件吗?', '提示', {
                type: 'warning'
            }).then(() => {
                let ids = this.checkedRows.map(v => v.id).join(',')
                this.withoutHandleData.getData({ids}).then(res => {
                    if (res.code !== 200) return Message.error(res.msg || '操作失败')
                    Message.success(res.msg || '操作成功')
                    this.initListData()
                })
            }).catch(() => {})
        },
        // 显示派工弹框
        showDispatchDialog () {
            if (this.checkedRows.length) { // 勾选了事件，则默认为检修事件
                let firstStationid = this.checkedRows[0].pstationid
                let flag = false
                this.checkedRows.map(v => {
                    if (v.pstationid !== firstStationid) flag = true
                })
                if (flag) return Message.error('请选择同一个电站的事件')
                this.repairParamsObj = {
                    isRepair: true,
                    checkedEvents: this.checkedRows,
                    repairData: {stid: firstStationid, type: '02'},
                    taskId: null
                }
            } else {
                this.repairParamsObj = {isRepair: false, taskId: null}
            }
            this.$bus.$emit('showPublishTaskDialog', this.repairParamsObj)
        }
    },
    created () {
        this.initListData()
        this.runAlarmListData.subscribe(res => {
            if (this.currentStatusTab === '1,-9,2') this.alarmTotalInfo = res.data.alarmTotalInfo
        })
        this.$bus.on('stationChange', this.initListData)
        this.$bus.on('publishTaskSuccessEmit', this.initListData)
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.initListData)
        this.$bus.off('publishTaskSuccessEmit', this.initListData)
    },
    components: {
        ElSwitch: Switch,
        ElButton: Button,
        ElRow: Row,
        ElCol: Col,
        ElTable: Table,
        ElTableColumn: TableColumn,
        assistant
    }
}
</script>
<style lang="scss">
.info-event-mochal{
    @import '@comm/assets/themes/table/tableMiniLine/t1.scss';
    .el-button--mini{
        &.red{
            background: transparent;
            color: rgba(215, 109, 117, 1);
            border: 1px solid rgba(215, 109, 117, 1);
        }
        &.green{
            background: transparent;
            color: rgba(55, 235, 136, 1);
            border: 1px solid rgba(55, 235, 136, 1);
        }
    }
    .el-table .cell {
        font-size:12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        text-align: center;
        padding-left: 0px;
        padding-right: 0px;
    }
    .el-dialog {
        &.el-dialog--center{
            .el-dialog__body {
                padding: 0px 10px 10px;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.info-event-mochal {
    color: white;
    height: 100%;
    &.v-fullpage{
        background: #041e5a;
        .module-name{
            display: inline-block;
            padding: 20px;
        }
        .table-line{
            height: calc(100% - 160px);
        }
    }
    .container-info{
        padding:10px 18px 0;
        font-size:12px;
        .condition-con{
            .tab-btn{
                display: inline-block;
                height: 28px;
                line-height: 26px;
                font-size:14px;
                text-align: center;
                border: 1px solid rgba(88,231,255,1);
                background: transparent;
                color: rgba(88, 231, 255, 1);
                font-size: 14px;
                width: 68px;
                cursor: pointer;
                &.tab-active{
                    color:#fff;
                    border: 1px solid #2dbed6;
                    background:linear-gradient(0deg,rgba(109,213,237,1),rgba(33,147,176,1));
                }
            }
            .lable-small{
                display: inline-block;
                font-size: 12px;
                margin-left: 7px;
                width:2em;
                height: 2em;
                vertical-align: middle;
            }
        }
        .status-con{
            margin: 12px 0;
            .filter-btn-con{
                display: inline-block;
                width:70px;
                position: relative;
                .cancel-btn{
                    display: inline-block;
                    width: 100%;
                    height: 28px;
                    line-height: 26px;
                    font-size:14px;
                    text-align: center;
                    border:1px solid rgba(88, 231, 255, 1);
                    color:rgba(88, 231, 255, 1);
                    border-radius: 2px;
                }
                .iconcuowu{
                    position:absolute;
                    right: 0px;
                    top: -5px;
                    font-size: 14px;
                    cursor: pointer;
                }
            }
            .status-line{
                margin-left: 12px;
                .status{
                    display: inline-block;
                    cursor: pointer;
                    width:125px;
                    height:31px;
                    line-height: 27px;
                    text-align: center;
                    border:1px dashed rgba(88, 231, 255, 0.3);
                    font-size:14px;
                    &.total{
                        color: rgb(48,121,235);
                    }
                    &.fault{
                        color: rgba(250, 38, 54, 1);
                    }
                    &.alarm{
                        color: rgba(248, 182, 45, 1);
                    }
                    &.interrupt{
                        color: rgba(75, 236, 250, 1);
                    }
                    .status-name{
                        color:#fff;
                        margin: 0 5px;
                        font-size:12px;
                    }
                    &.status-active{
                        background: rgba(18, 113, 242, 0.4);
                        &.total{
                            color: #fff;
                        }
                        &.fault{
                            color: #fff;
                        }
                        &.alarm{
                            color: #fff;
                        }
                        &.interrupt{
                            color: #fff;
                        }
                    }
                }
            }
        }
        .fault{
            color:#FA2636;
        }
        .alarm{
            color:#F8B62D;
        }
        .interrupt{
            color:grey;
        }
    }
    .table-line{
        padding:0px 18px;
        font-size:12px;
        height: calc(100% - 120px);
        position: relative;
        .drawer{
            width:0px;
            height: 100%;
            position: absolute;
            z-index: 2;
            right:0;
            background: rgba(27,71,152,0.9);
            overflow: hidden;
            color: #58E7FF;
            // padding:20px;
            font-size: 14px;
            line-height: 2.5em;
            cursor: pointer;
            &.open{
                width:200px;
                animation: widthOpen 0.2s linear 0s;
            }
            .iconfont{
                font-size:14px;
                width:50px;
                margin-left: 20px;
            }
        }
    }
    @keyframes widthOpen {
        0% {
            width: 0;
        }
        100% {
            width: 200px;
        }
    }
    .assit{
        width: 100%;
        height: 100%;
    }
}
</style>
