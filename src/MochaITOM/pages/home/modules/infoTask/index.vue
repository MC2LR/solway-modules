<template>
    <div class="info-task-mochal">
        <span class="module-name">任务信息</span>
        <div class="container-info">
            <el-row class="condition-con">
                <el-col :span="14">
                    <span class="tab-btn" :class="{'tab-active': bizType === '01'}" @click="changeTab('01')">未处理</span><span class="tab-btn" :class="{'tab-active': bizType === '02'}" @click="changeTab('02')">进行中</span><span class="tab-btn" :class="{'tab-active': bizType === '03'}" @click="changeTab('03')">计划中</span><span class="tab-btn" :class="{'tab-active': bizType === '04'}" @click="changeTab('04')">已完成</span>
                </el-col>
                <el-col :span="10">
                    <el-input placeholder="请输入名称" style="width:180px;" v-model="keywords" @keydown.enter.native="v => getTaskList({pageNo: 1})" class="input-with-select pull-right">
                        <el-button slot="append" class="iconfont iconsousuo" @click="getTaskList({pageNo: 1})"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <div class="table-line">
                <div class="drawer" :class="{'open': showDrawer}">
                    <p class="text-right"><i class="iconfont iconcuowu" style="font-size:30px;cursor:pointer;" @click="showDrawer = false"></i></p>
                    <div style="margin: 20px;height:100%;overflow:auto;">
                        <!-- 待发布 -->
                        <div v-if="currentClickLineData.status === '01' && currentClickLineData.initiatorId === currentUserId">
                            <el-button type="primary" style="margin-bottom:15px;" @click="republishTask(currentClickLineData.id)">重新发布</el-button>
                            <el-button type="primary" @click="toInvalidTask(currentClickLineData.id)">作废</el-button>
                        </div>
                        <!-- 已发布 发布人可撤回-->
                        <div v-if="currentClickLineData.status === '02' && currentClickLineData.initiatorId === currentUserId"><el-button type="primary" @click="recall(currentClickLineData.id)">撤回</el-button></div>
                        <!-- 已发布 执行人可受理 -->
                        <div v-if="currentClickLineData.status === '02' && currentClickLineData.handlerId === currentUserId">
                            <el-button type="primary" @click="acceptTask(currentClickLineData.id, '01')" style="margin-bottom:15px;">受理</el-button>
                            <el-button type="primary" @click="acceptTask(currentClickLineData.id, '00')">拒绝受理</el-button>
                        </div>
                        <!-- 已撤回 -->
                        <div v-if="currentClickLineData.status === '10' && currentClickLineData.initiatorId === currentUserId">
                            <el-button type="primary" style="margin-bottom:15px;" @click="republishTask(currentClickLineData.id)">重新发布</el-button>
                            <el-button type="primary" @click="toInvalidTask(currentClickLineData.id)">作废</el-button>
                        </div>
                        <!-- 已拒绝受理 -->
                        <div v-if="currentClickLineData.status === '04' && currentClickLineData.initiatorId === currentUserId">
                            <el-button type="primary" style="margin-bottom:15px;" @click="republishTask(currentClickLineData.id)">重新发布</el-button>
                            <el-button type="primary" @click="toInvalidTask(currentClickLineData.id)">作废</el-button>
                        </div>
                        <!-- 待验收 条件待增加TODO？？？-->
                        <div v-if="currentClickLineData.status === '06' && currentClickLineData.checkId === currentUserId"><el-button type="primary" @click="showCheckResultDialog()">验收</el-button></div>
                        <!-- 验收不通过 -->
                        <!-- 验收已通过 -->
                        <!-- 待发红包 条件待增加TODO？？？-->
                        <div v-if="currentClickLineData.status === '07' && currentClickLineData.initiatorId === currentUserId"><el-button type="primary" @click="showSendMoneyDialog()">发红包</el-button></div>
                        <!-- 已完成 -->
                    </div>
                </div>
                <el-table
                    ref="tableRef"
                    highlight-current-row
                    v-loading="taskListData.loading"
                    v-if="taskListData.res.data"
                    :data="taskListData.res.data.list"
                    @row-click="(row, column, cell, event) => rowClick(row, column, cell, event)"
                    border
                    :row-style="{'cursor': 'pointer'}"
                    height="100%"
                    row-class-name="row-style"
                    cell-class-name="cell-style"
                    header-row-class-name="header-row-style"
                    header-cell-class-name="header-cell-style"
                    empty-text="暂无任务"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        min-width="120px"
                        label="任务名称">
                        <template slot-scope="scope">
                            <span :title="scope.row.name">{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="publishTime"
                        width="110px"
                        label="发布时间">
                    </el-table-column>
                    <el-table-column
                        prop="workeHour"
                        width="55"
                        align="center"
                        label="工时">
                    </el-table-column>
                     <!-- <el-table-column
                        prop="redEnvAmount"
                        align="center"
                        width="60px"
                        label="红包">
                    </el-table-column> -->
                    <el-table-column
                        prop="handlerName"
                        align="left"
                        width="100px"
                        label="执行人">
                        <template slot-scope="scope">
                            <img src="./images/p-professor.png" style="width: 10px;vertical-align: middle;" v-if="scope.row.mode === '02'">
                            <img src="./images/p-share.png"  style="width: 11px;vertical-align: middle;" v-if="scope.row.mode === '01'">
                            {{scope.row.handlerName}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        width="80px"
                        align="center"
                        label="任务类型">
                        <template slot-scope="scope">
                            {{taskTypeMap[scope.row.type]}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        align="center"
                        label="状态">
                        <template slot-scope="scope">
                            {{statusMap[scope.row.status]}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        width="55px"
                        label="详细">
                        <template slot-scope="scope">
                            <span class="detail-circle" @click="showDetail(scope.row.id);$event.stopPropagation();">···</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page-footer">
                <solway-pagination
                    v-if="taskListData.res.data"
                    :page-index="taskListData.res.data.pageNum"
                    :page-size="taskListData.res.data.pageSize"
                    :firstPageIndex="1"
                    :total="taskListData.res.data.total"
                    @change="getTaskList">
                </solway-pagination>
            </div>
        </div>
        <!-- 拒绝受理任务 -->
        <el-dialog
            width="600px"
            center
            :visible.sync="refuseReasonModal.visible"
            :title="'拒绝受理任务'">
            <textarea v-model="refuseReasonModal.reason"  placeholder="请输入拒绝理由" style="border:1px solid #ccc6c6;color:#303133;text-indent: 1em;line-height: 2em;width:100%;"></textarea>
            <!-- <el-input v-model="refuseReasonModal.reason" :rows="2" placeholder="请输入拒绝理由"></el-input> -->
            <div slot="footer" class="dialog-footer">
                <el-button type="b2" @click="refuseReasonModal.visible = false">取 消</el-button>
                <el-button type="b1" @click="getAcceptTaskData('00', refuseReasonModal.id, refuseReasonModal.reason)">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 验收任务 -->
        <el-dialog
            width="600px"
            center
            :visible.sync="examineTaskModal.visible"
            :title="'验收任务'">
            <el-form :model="examineTaskModal" label-width="120px">
                <el-form-item label="验收意见">
                    <el-input v-model="examineTaskModal.checkDesc" type="textarea" :rows="2" placeholder="请输入验收意见" style="width:90%;"></el-input>
                </el-form-item>
                <el-form-item label="合理工时(h)">
                    <el-input v-model="examineTaskModal.workHours" type="number" placeholder="请输入实际工时" style="width:150px;height:34px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="b2" @click="checkResult('00', currentClickLineData.id, examineTaskModal.checkDesc, examineTaskModal.workHours)">驳 回</el-button>
                <el-button type="b1" @click="checkResult('01', currentClickLineData.id, examineTaskModal.checkDesc, examineTaskModal.workHours)">通 过</el-button>
            </div>
        </el-dialog>
        <!-- 任务评价 -->
        <el-dialog
            width="600px"
            center
            :visible.sync="evaluateModal.visible"
            :title="'任务评价'">
            <el-form :model="evaluateModal" label-width="120px">
                <p style="margin: 0 0 15px 46px;">请对任务执行人进行评价</p>
                <el-form-item label="质量">
                    <el-rate
                        style="line-height:50px;"
                        allow-half
                        v-model="evaluateModal.qualityScore">
                    </el-rate>
                </el-form-item>
                <el-form-item label="效率">
                    <el-rate
                        style="line-height:50px;"
                        allow-half
                        v-model="evaluateModal.efficacyScore">
                    </el-rate>
                </el-form-item>
                <el-form-item label="评价内容">
                    <el-input v-model="evaluateModal.assess" type="textarea" :rows="2" placeholder="请输入评价内容" style="width:90%;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="b2" @click="evaluateModal.visible = false">取 消</el-button>
                <el-button type="b1" @click="evaluateTask()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 发红包 -->
        <!-- <el-dialog
            width="600px"
            center
            :visible="sendMoneyModal.visible"
            :title="'发红包'">
            <el-input v-model="sendMoneyModal.money" placeholder="请输入红包金额"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button type="b2" @click="sendMoneyModal.visible = false">取 消</el-button>
                <el-button type="b1" @click="sendMoney()">确 定</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>

<script>
import {getTaskByBiz, undoTask, acceptTask, checkTask, assessTask, sendRedEnv, invalidTask} from '@/request/api'
import {Input, Button, Table, TableColumn, MessageBox, Message, Form, FormItem, Rate} from 'element-ui'
import solwayPagination from '@/components/pagination'
export default {
    data () {
        return {
            bizType: '01',
            keywords: null,
            taskTypeMap: {'01': '通用', '02': '检修', '03': '清洗', '04': '抄表'},
            statusMap: {'00': '作废', '01': '待发布', '02': '待受理', '03': '已受理', '04': '拒绝受理', '05': '处理中', '06': '待验收', '07': '待发红包', '08': '验收不通过', '09': '验收通过', '10': '撤单'},
            showDrawer: false,
            selectedLineId: '',
            currentClickLineData: {},
            currentUserId: '',
            refuseReasonModal: { // 拒绝受理
                visible: false
            },
            examineTaskModal: { // 验收任务
                visible: false
            },
            evaluateModal: { // 任务评价
                visible: false
            },
            repairParamsObj: {
                isRepair: false
            },
            // sendMoneyModal: { // 发红包
            //     visible: false
            // },
            taskListData: getTaskByBiz({
                later: true
            }),
            undoTaskData: undoTask({
                later: true
            }),
            acceptTaskData: acceptTask({
                later: true
            }),
            checkTaskData: checkTask({
                later: true
            }),
            assessTaskData: assessTask({
                later: true
            }),
            sendRedEnvData: sendRedEnv({
                later: true
            }),
            invalidTaskData: invalidTask({
                later: true
            })
        }
    },
    methods: {
        changeTab (v) {
            this.bizType = v
            this.showDrawer = false
            this.getTaskList({pageNo: 1})
        },
        getTaskList (data = {}) {
            this.taskListData.getData({bizType: this.bizType, condition: this.keywords, ...data, pageNo: data.pageIndex})
        },
        // 显示按钮弹框
        rowClick (row, column, cell, event) {
            this.showDrawer = false
            let status = row.status
            let initiatorId = row.initiatorId
            let handlerId = row.handlerId
            let checkId = row.checkId
            let currentUserId = this.currentUserId
            if (!(status === '01' && initiatorId === currentUserId) &&
                !(status === '02' && initiatorId === currentUserId) &&
                !(status === '02' && handlerId === currentUserId) &&
                !(status === '04' && initiatorId === currentUserId) &&
                !(status === '06' && checkId === currentUserId) &&
                !(status === '07' && initiatorId === currentUserId) &&
                !(status === '10' && initiatorId === currentUserId)) {
                return false
            }
            this.currentClickLineData = row
            if (this.selectedLineId === row.id) {
                this.selectedLineId = ''
                this.$refs.tableRef.setCurrentRow()
                return
            }
            setTimeout(() => {
                this.selectedLineId = row.id
                this.showDrawer = true
            }, 100)
        },
        // 详情
        showDetail (taskId) {
            this.$bus.$emit('detaile', {id: taskId})
        },
        // 撤回
        recall (id) {
            MessageBox.confirm('确定撤回此派工任务吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.undoTaskData.getData({id}).then(res => {
                    if (res.code !== 200) return Message.error(res.msg || '撤回失败')
                    Message.success(res.msg || '撤回成功')
                    this.changeTab(this.bizType)
                })
            }).catch(() => {})
        },
        // 作废
        toInvalidTask (id) {
            MessageBox.confirm('确定作废此派工任务吗?', '提示', {
                type: 'warning'
            }).then(() => {
               this.invalidTaskData.getData({id}).then(res => {
                    if (res.code !== 200) return Message.error(res.msg || '作废失败')
                    Message.success(res.msg || '已作废')
                    this.changeTab(this.bizType)
                })
            }).catch(() => {})
        },
        // 重新发布
        republishTask (id) {
            this.repairParamsObj = {taskId: id, isRepair: false}
            this.$bus.$emit('showPublishTaskDialog', this.repairParamsObj)
        },
        getAcceptTaskData (option, id, remark) {
            this.acceptTaskData.getData({option, id, remark}).then(res => {
                if (res.code !== 200) return Message.error(res.msg || '操作失败')
                Message.success(res.msg || '操作成功')
                this.refuseReasonModal = {}
                this.changeTab(this.bizType)
                setTimeout(() => {
                    Message.success('去小程序上处理任务吧！')
                }, 1000)
            })
        },
        // 受理/拒绝受理
        acceptTask (id, type) {
            if (type === '01') { // 受理
                this.getAcceptTaskData('01', id, null)
            } else { // 拒绝受理
                this.refuseReasonModal.visible = true
                this.refuseReasonModal.id = id
                this.refuseReasonModal.reason = null
            }
        },
        // 验收、驳回
        showCheckResultDialog () {
            this.examineTaskModal = {
                checkDesc: null,
                hour: null,
                visible: true
            }
        },
        // 评价任务
        evaluateTask () {
            let {assess, efficacyScore, qualityScore} = this.evaluateModal
            this.assessTaskData.getData({id: this.currentClickLineData.id, assess, efficacyScore, qualityScore}).then(res => {
                if (res.code !== 200) return Message.error(res.msg || '评价失败')
                Message.success(res.msg || '评价成功')
                this.evaluateModal = {}
            })
        },
        checkResult (option, id, checkDesc, workHours) {
            this.checkTaskData.getData({id, checkDesc, option, workHours}).then(res => {
                if (res.code !== 200) return Message.error(res.msg || '操作失败')
                Message.success(res.msg || '操作成功')
                this.examineTaskModal = {}
                this.changeTab(this.bizType)
                if (option === '01') {
                    this.evaluateModal = {
                        visible: true
                    }
                }
            })
        },
        // 发红包
        showSendMoneyDialog () {
            // this.sendMoneyModal = {
            //     visible: true
            // }
            MessageBox.confirm('确定已发送红包吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.sendMoney()
            }).catch(() => {})
        },
        sendMoney () {
            this.sendRedEnvData.getData({id: this.currentClickLineData.id}).then(res => {
                if (res.code !== 200) return Message.error(res.msg || '操作失败')
                Message.success(res.msg || '操作成功')
                // this.examineTaskModal = {}
                this.changeTab(this.bizType)
            })
        },
        // 发布成功后回调
        successSave () {
            this.changeTab(this.bizType)
        }
    },
    components: {
        ElInput: Input,
        ElButton: Button,
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElForm: Form,
        ElFormItem: FormItem,
        ElRate: Rate,
        solwayPagination
    },
    created () {
        this.currentUserId = this.$store.getters.user_id
        this.getTaskList()
        this.$bus.on('stationChange', this.successSave)
        this.$bus.on('publishTaskSuccessEmit', this.successSave)
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.successSave)
        this.$bus.off('publishTaskSuccessEmit', this.successSave)
    }
}
</script>

<style lang="scss">
.info-task-mochal {
    @import '@comm/assets/themes/table/tableMiniLine/t1.scss';
    @import '@comm/assets/themes/pagination/pageTheme/pagination_dark_blue1.scss';
    .el-input__inner {
        background-color: transparent;
        border: 1px solid rgba(177, 204, 244, 0.7);
        height: 28px;
    }
    .el-input-group__append, .el-input-group__prepend {
        background-color: transparent;
        color: #fff;
        border: 1px solid rgba(177, 204, 244, 0.7);
        border-left: none;
        font-size:16px;
    }
    .el-table .cell {
        font-size:12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        text-align: center;
    }
}
</style>
<style lang="scss" scoped>
.info-task-mochal {
    color: white;
    height: 100%;
    &.v-fullpage{
        background: #041e5a;
        .module-name{
            display: inline-block;
            padding: 20px;
        }
        .container-info{
            height: calc(100% - 60px);
        }
    }
    .container-info{
        padding:10px 18px;
        font-size:12px;
        height: calc(100% - 17px);
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
        }
        .table-line{
            height: calc(100% - 71px);
            position: relative;
            margin-top:12px;
            .detail-circle{
                display: inline-block;
                width: 16px;
                height:16px;
                line-height: 14px;
                color: #29DFA6;
                border:1px solid #29DFA6;
                border-radius: 50%;
                text-align: center;
            }
            .drawer{
                width:0px;
                height: 100%;
                position: absolute;
                z-index: 2;
                right:0;
                background: rgba(27,71,152,0.9);
                overflow: hidden;
                color: #58E7FF;
                line-height: 2.5em;
                text-align: center;
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
        .page-footer{
            text-align: center;
            margin-top: 5px;
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
}
</style>
