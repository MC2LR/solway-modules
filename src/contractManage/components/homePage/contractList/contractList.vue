<template>
    <div class="contract-list">
        <div class="content">
            <!-- 查询区域 -->
            <div class="filter clearfix" ref="filter" v-show="!detailFullPage">
                <el-form ref="queryForm" :model="getContract.params" :inline='true' size="small">
                    <el-form-item label="合同大类">
                        <el-select v-model="getContract.params.classId" filterable multiple clearable collapse-tags placeholder="全部" style="max-width: 150px" class='s1' @change='calFilterH()'>
                            <el-option
                                v-for="item in getBaseContract.res.body"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="市场负责人">
                        <el-select v-model="getContract.params.managerId" filterable multiple clearable collapse-tags placeholder="全部" style="width: 150px" class='s1' @change='calFilterH()'>
                            <el-option
                                v-for="item in getMarketManager.res.body"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="对接公司" style="margin-right: 0">
                        <el-select v-model="getContract.params.comId" filterable multiple clearable collapse-tags placeholder="全部" style="width: 170px" class='s1' @change='calFilterH()'>
                            <el-option
                                v-for="item in selectAllCompany.res.body"
                                :key="item.comId"
                                :label="item.comName"
                                :value="item.comId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="margin-left: 10px" label="是否归档">
                          <el-select v-model="getContract.params.status" placeholder="全部" style="width: 65px" @change="$forceUpdate()" clearable>
                            <el-option label="是" value="0"></el-option>
                            <el-option label="否" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="margin-left: 10px" label="是否提醒">
                          <el-select v-model="getContract.params.remind" placeholder="全部" style="width: 75px" @change="$forceUpdate()" clearable>
                            <el-option label="是" value="0"></el-option>
                            <el-option label="否" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="margin-left: 15px">
                          <el-input v-model="getContract.params.keyword" clearable placeholder="请输入合同编号、合同摘要等" style="width: 185px" @keydown.enter.native="getContract.getData()">
                          </el-input>
                    </el-form-item>
                    <el-form-item
                        class="pull-right"
                        style="margin-right: 0;">
                        <el-button type="b1" @click="getContract.getData()" :disabled="getContract.loading">查询</el-button>
                        <el-button type="b3" @click="reset()">重置</el-button>
                        <el-button type="b5" @click="exportTable()">导出</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 新增按钮 分页区域 -->
            <div class="toolbox clearfix">
                <el-button
                type="text"
                @click="contractDetail.show = true;delete contractDetail.detail"
                v-if="UserAuthHandleGetBusinessManageAuth09.res.body.enable"
                >
                    <span class="add-con"><i class="iconfont iconxinzeng"></i></span>
                    新增
                </el-button>
                <my-paging
                    class="pull-right"
                    v-if="getContract.res && getContract.res.body"
                    :pageSizeArr="[10, 20, 30, 50, 100]"
                    @change="data => getContract.getData(data)"
                    v-bind="getContract.res.body"
                    :total='getContract.res.body.total > 10000 ? 10000 : getContract.res.body.total'/>
            </div>
            <!-- 表格区域 -->
            <div class="tableCon">
                <el-table
                    v-if="getContract.res && getContract.res.body"
                    :data="getContract.res.body.data"
                    v-loading="getContract.loading"
                    style="width: 100%"
                    :max-height="detailFullPage ? vh - 221 : vh - 221 - filterHeight"
                    border
                    :row-style="{'cursor': 'pointer'}"
                    row-class-name="row-style"
                    cell-class-name="cell-style"
                    header-row-class-name="header-row-style"
                    header-cell-class-name="header-cell-style"
                    @sort-change='sortChange'
                    >
                    <el-table-column
                    fixed
                    label="序号"
                    width="55"
                    :formatter="serialNumber"
                    ></el-table-column>
                    <el-table-column prop="classify" label="合同大类" width="105" sortable="custom"></el-table-column>
                    <el-table-column prop="smallClassify" label="合同小类" width="105" sortable="custom"></el-table-column>
                    <el-table-column prop="code" label="合同编号" sortable="custom"></el-table-column>
                    <el-table-column prop="name" label="合同摘要" sortable="custom"></el-table-column>
                    <el-table-column prop="marketUser" label="市场负责人" width="120" sortable="custom"></el-table-column>
                    <el-table-column prop="partyA" label="合同甲方" width="130" sortable="custom"></el-table-column>
                    <!-- <el-table-column prop="partyB" label="合同乙方" width="130" sortable="custom"></el-table-column> -->
                    <el-table-column
                        prop="signDate"
                        label="签订日期"
                        width="125"
                        sortable="custom"
                        align="center"
                        :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd') : ''">
                    </el-table-column>
                    <el-table-column
                    prop="examine"
                    label="状态"
                    width="65"
                    :formatter="(row, column, cellValue, index) => status[cellValue]"
                    ></el-table-column>

                    <!-- <el-table-column prop="contractAmount" label="合同金额" width="110" sortable="custom"></el-table-column>
                    <el-table-column prop="projectManager" label="项目经理" width="110" sortable="custom"></el-table-column>
                    <el-table-column
                        prop="startDate"
                        label="开始时间"
                        width="125"
                        sortable="custom"
                        align="center"
                        :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd') : ''">
                    </el-table-column>
                    <el-table-column
                        prop="endDate"
                        label="结束时间"
                        width="125"
                        sortable="custom"
                        align="center"
                        :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd') : ''">
                    </el-table-column>
                    <el-table-column prop="docComName" label="对接公司" width="200"></el-table-column>
                    <el-table-column prop="docUserName" label="对接人" width="150"></el-table-column>
                    <el-table-column
                        prop="status"
                        label="是否归档"
                        sortable="custom"
                        width="110"
                        :formatter="(row, column, cellValue, index) => cellValue == '1' ? '未归档' : '归档'"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="remind"
                        label="是否提醒"
                        sortable="custom"
                        width="110"
                        :formatter="(row, column, cellValue, index) => cellValue == '1' ? '未提醒' : '提醒'"
                    >
                    </el-table-column>
                    <el-table-column prop="note" label="备注" width="200"></el-table-column> -->
                    <el-table-column
                        fixed="right"
                        width="300px"
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <div
                                title="详细情况"
                                class="btn edit"
                                @click.stop="contractDetail.show = true;contractDetail.detail = scope.row">
                                <i class="iconfont iconxiangxiqingkuang"></i>
                                <span style="vertical-align: middle;display:block">详细情况</span>
                            </div>
                            <div
                                title="维护项目"
                                @click.stop="maintProjectDetail.show = true;contractDetail.detail = scope.row"
                                class="btn look">
                                <i class="iconfont iconpeizhi" style="font-size: 20px"></i>
                                <span style="vertical-align: middle;display:block">维护项目</span>
                            </div>
                            <div
                                title="执行计划"
                                @click.stop="exePlanDetail.detail = scope.row;exePlanDetail.show = true"
                                class="btn look">
                                <i class="iconfont iconzhihangjihua" style="font-size: 20px"></i>
                                <span style="vertical-align: middle;display:block">执行计划</span>
                            </div>
                            <div
                                title="回款"
                                @click.stop="fundsRepaymentDetail.show = true;fundsRepaymentDetail.detail = scope.row"
                                class="btn look">
                                <i class="iconfont iconhuikuan" style="font-size: 20px"></i>
                                <span style="vertical-align: middle;display:block">回款</span>
                            </div>
                            <div
                                title="财务"
                                @click.stop="financialAccountDetail.show = true;financialAccountDetail.detail = scope.row"
                                class="btn look">
                                <i class="iconfont iconcaiwu" style="font-size: 20px"></i>
                                <span style="vertical-align: middle;display:block">财务</span>
                            </div>
                            <div
                                v-if="UserAuthHandleGetBusinessManageAuth09.res.body.enable"
                                title="删除"
                                @click.stop="deleteCt(scope.row)"
                                class="btn delete">
                                <i class="iconfont iconshanchu1"></i>
                                <span style="vertical-align: middle;display:block">删除</span>
                            </div>
                        </template>
                    </el-table-column>
                    <template slot="empty">
                        <span>暂无数据</span>
                    </template>
                </el-table>
                <i
                :class="{iconfont: true, iconshousuoshang: !detailFullPage, iconshousuoxia: detailFullPage}"
                @click="switchDetailFullPage()"
                :title="detailFullPage ? '缩小': '放大'"
                style="position: absolute;
                        right: 0;top: 0px;
                        cursor: pointer;
                        font-size: 15px;
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        color: rgba(255,255,255,.5);
                        background: #18344c;"></i>
                <div class="table-summary" v-if="getContract.res && getContract.res.body">
                    <span>合同总数：{{getContract.res.body.total}}</span>
                </div>
            </div>

            <!-- 新增类型 弹框 -->
            <new-type v-show="newType.show" :newType='newType' @newTypeShow='newTypeShow' ref="newTypeEle"></new-type>
        </div>
         <!-- 回款 -->
        <el-dialog
            width="1250px"
            :title="'回款'"
            center
            :visible.sync="fundsRepaymentDetail.show"
            top='10vh'
            @opened="$bus.emit('openFunds')">
            <funds-repayment v-if="fundsRepaymentDetail.show" @fundsSuccessEmit="fundsSuccess" :detail="fundsRepaymentDetail.detail"></funds-repayment>
            <div slot="footer" class="dialog-footer">
                <el-button @click="fundsRepaymentDetail.show = false">取 消</el-button>
                <el-button v-if="this.getContractCost.res.body.contractManageAuthType" type="primary" @click="$bus.emit('saveFundsRepay')">提 交</el-button>
            </div>
        </el-dialog>
        <!-- 财务 -->
        <el-dialog
            width="1250px"
            :title="'财务核算'"
            center
            :visible.sync="financialAccountDetail.show"
            top='10vh'
            @opened="$bus.emit('openFinancial')">
            <financial-account v-if="financialAccountDetail.show" @financialSuccessEmit="financialSuccess" :detail="financialAccountDetail.detail"></financial-account>
            <div slot="footer" class="dialog-footer">
                <el-button @click="financialAccountDetail.show = false">取 消</el-button>
                <el-button v-if="this.getContractCost.res.body.contractManageAuthType" type="primary" @click="$bus.emit('savefinancialAccount')">提 交</el-button>
            </div>
        </el-dialog>

        <!-- 新增/编辑 弹框 -->
        <el-dialog
        width="1250px"
        custom-class='new-contract-dialog'
        :title="contractDetail.detail ? '编辑' : '新增'"
        center
        append-to-body
        :visible.sync="contractDetail.show"
        top='10vh'
        @opened="$bus.emit('openNewContract')"
        @close="delete contractDetail.detail"
        >
            <div style="height: 460px">
                <div style="height: calc(100% - 34px);overflow-y: auto;overflow-x: hidden">
                    <new-contract
                        v-if="contractDetail.show && UserAuthHandleGetBusinessManageAuth09.res.body.enable"
                        @updateSuccess="updateSuccess"
                        :detail="contractDetail.detail"
                        ></new-contract>
                    <new-contract-disabled
                        v-if="contractDetail.show && !UserAuthHandleGetBusinessManageAuth09.res.body.enable"
                        :detail="contractDetail.detail"></new-contract-disabled>
                </div>

                <div slot="footer" class="dialog-footer" style="width: max-content;margin: auto">
                    <el-button @click="contractDetail.show = false">取 消</el-button>
                    <el-button
                    type="primary"
                    v-if="UserAuthHandleGetBusinessManageAuth09.res.body.enable"
                    @click="$bus.emit('saveContract')">提 交</el-button>
                </div>
            </div>
        </el-dialog>

        <!-- 维护项目 弹框 -->
        <el-dialog
        width="1300px"
        height="500px"
        title="维护项目"
        class="mtDialog"
        center
        :visible.sync="maintProjectDetail.show"
        top='10vh'
        @opened="$bus.emit('updateProject')"
        @close="projectDetail.show = false"
        >
            <el-button
            type="text"
            v-if="UserAuthHandleGetBusinessManageAuth09.res.body.enable"
            @click="delete projectDetail.detail; projectDetail.show = true;$forceUpdate();$bus.emit('openProject')">
                <span class="add-con"><i class="iconfont iconxinzeng"></i></span>
                新增
            </el-button>

            <new-project :detail="projectDetail.detail" :ctDetail='contractDetail.detail' v-show="projectDetail.show"></new-project>

            <el-button
                type="primary"
                v-if="UserAuthHandleGetBusinessManageAuth09.res.body.enable"
                :style="{marginLeft: projectDetail.show ? 0 : '10px'}"
                @click="tempDown()">模板下载</el-button>
            <div class="newFile" v-if="UserAuthHandleGetBusinessManageAuth09.res.body.enable">
                导入项目
                <input
                type="file"
                @change="importProject()"
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ref="fileBtn"
                style="opacity: 0"
                />
            </div>

            <maintain-project :detail="contractDetail.detail"></maintain-project>
        </el-dialog>

        <!-- 执行计划 弹框 -->
        <el-dialog
        width="1250px"
        title="执行计划"
        center
        :visible.sync="exePlanDetail.show"
        top='2vh'
        @opened="$bus.emit('openExePlan')"
        >
            <execution-plan
                v-if="exePlanDetail.show && exePlanDetail.detail.examine !== '1' && getLoginUser.res.userId === exePlanDetail.detail.projectManagerId"
                :detail='exePlanDetail.detail'
                :userId='getLoginUser.res.userId'
                @saveExecutionSuccess='saveExecutionSuccess'></execution-plan>
            <execution-plan-disabled
                v-if="exePlanDetail.show && ((exePlanDetail.detail.examine !== '1' && getLoginUser.res.userId !== exePlanDetail.detail.projectManagerId) || exePlanDetail.detail.examine === '1')"
                :detail='exePlanDetail.detail'
                :userId='getLoginUser.res.userId'
                @saveExecutionSuccess='saveExecutionSuccess'
                ></execution-plan-disabled>

            <div slot="footer" class="dialog-footer">
                <el-button @click="exePlanDetail.show = false">取 消</el-button>
                <!-- 可修改按钮 -->
                <el-button style="background: #38A0FF;color: #fff" v-if="exePlanDetail.show && exePlanDetail.detail.examine !== '1' && getLoginUser.res.userId === exePlanDetail.detail.projectManagerId" @click="$bus.emit('saveExePlan', 1)">暂 存</el-button>
                <el-button type="success" v-if="exePlanDetail.show && exePlanDetail.detail.examine !== '1' && getLoginUser.res.userId === exePlanDetail.detail.projectManagerId" @click="$bus.emit('saveExePlan', 2)">提 交</el-button>
                <!-- 审核按钮 -->
                <el-button v-if="exePlanDetail.show && exePlanDetail.detail.examine === '1' && UserAuthHandleGetBusinessManageAuth07.res.body.enable" @click="$bus.emit('saveExamine', 0)">退 回</el-button>
                <el-button style="background: #38A0FF;color: #fff" v-if="exePlanDetail.show && exePlanDetail.detail.examine === '1' && UserAuthHandleGetBusinessManageAuth07.res.body.enable" @click="$bus.emit('saveExamine', 1)">同 意</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { api＿getBaseContract, api＿getMarketManager, api＿getContract, api＿deleteContract, api＿exportContract, api＿selectAllCompany, api＿exportContractProjectFormwork, api＿importContractProject, api＿getLoginUser, api＿UserAuthHandleGetBusinessManageAuth07, api＿UserAuthHandleGetBusinessManageAuth09, api＿getContractCost } from '@contractManage/request/api'
import {Table, TableColumn, Select, Option, Form, FormItem, Input, Button, Dialog, MessageBox, Message, Upload} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import MyPaging from '@comm/components/paging'
import fundsRepayment from './fundsRepayment'
import financialAccount from './financialAccount'
import newContract from './newContract/newContract'
import newContractDisabled from './newContract/newContractDisabled'
import maintainProject from './maintainProject'
import newProject from './newProject'
import newType from './newType'
import executionPlan from './executionPlan/executionPlan'
import executionPlanDisabled from './executionPlan/executionPlanDisabled'
import {download} from '@comm/request/http'

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
        ElDialog: Dialog,
        ElUpload: Upload,
        MyPaging,
        fundsRepayment,
        financialAccount,
        newContract,
        newContractDisabled,
        maintainProject,
        newProject,
        newType,
        executionPlan,
        executionPlanDisabled
    },
    data () {
        return {
            status: {
                0: '正常',
                1: '审核中',
                2: '审核未通过',
                3: '审核通过'
            },
            executionPlanDisabled: true,
            importContractProjectLoading: false,
            filterHeight: 0,
            detailFullPage: false,
            fundsRepaymentDetail: {
                show: false
            },
            financialAccountDetail: {
                show: false
            },
            contractDetail: {
                show: false
            },
            maintProjectDetail: {
                show: false
            },
            projectDetail: {
                show: false
            },
            newType: {
                show: false
            },
            exePlanDetail: {
                show: false
            },
            getContractCost: api＿getContractCost({
                res: {
                    body: {contractManageAuthType: 0}
                }
            }),
            getLoginUser: api＿getLoginUser({
                later: true
            }),
            importContractProject: api＿importContractProject({
                later: true,
                sameTimeOnce: true
            }),
            getBaseContract: api＿getBaseContract({
                later: true
            }),
            getMarketManager: api＿getMarketManager({
                later: true
            }),
            getContract: api＿getContract({
                later: true,
                onlyLatest: true,
                beforeSend (params) {
                    if (params.classId) {
                        params.classId = params.classId.join()
                    }
                    if (params.managerId) {
                        params.managerId = params.managerId.join()
                    }
                    if (params.comId) {
                        params.comId = params.comId.join()
                    }
                    return params
                }
            }),
            deleteContract: api＿deleteContract({
                later: true
            }),
            selectAllCompany: api＿selectAllCompany({
                later: true,
                res: {body: []}
            }),
            UserAuthHandleGetBusinessManageAuth07: api＿UserAuthHandleGetBusinessManageAuth07({
                later: true,
                res: { body: {} }
            }),
            UserAuthHandleGetBusinessManageAuth09: api＿UserAuthHandleGetBusinessManageAuth09({
                later: true,
                res: { body: {} }
            })
        }
    },
    mounted () {
        document.getElementById('gloablLoading') && document.body.removeChild(document.getElementById('gloablLoading'))
        this.$bus.on('openNewProject', this.openNewProject)
        this.$bus.on('hideNewProject', this.hideNewProject)
        this.$bus.on('openNewType', this.openNewType)
        // this.$bus.on('hideNewType', this.hideNewType)
        document.addEventListener('click', this.hideType)

        this.getLoginUser.getData()

        this.getBaseContract.getData({status: 0})
        this.getMarketManager.getData({comId: 135})

        // 对接公司
        this.selectAllCompany.getData()

        this.getContract.params.status = '1'
        this.$nextTick(res => {
            this.filterHeight = this.$refs.filter.clientHeight
            this.getContract.params.keyword = this.$route.params.contractName || ''
            this.getContract.getData()
        })

        // 判断合同审核人权限
        this.UserAuthHandleGetBusinessManageAuth07.getData()
        // 判断合同管理员权限
        this.UserAuthHandleGetBusinessManageAuth09.getData()
    },
    methods: {
        // 放大显示详情操作
        switchDetailFullPage () {
            this.detailFullPage = !this.detailFullPage
        },
        sortChange ({ column, prop, order }) {
            this.getContract.params.sort = prop + '_' + (order === 'ascending' ? 1 : 2)
            this.getContract.getData()
        },
        async calFilterH () {
            await this.$timeout(0)
            this.filterHeight = this.$refs.filter.clientHeight
        },
        // sortCode (a, b) {
        //     return parseInt(a.code.split('-')[2]) - parseInt(b.code.split('-')[2])
        // },
        serialNumber (row, column, cellValue, index) {
            return this.getContract.res.body.pageSize * this.getContract.res.body.pageIndex + index + 1
        },
        hideType () {
            this.newType.show = false
        },
        // 打开编辑项目 弹框
        openNewProject (row) {
            this.projectDetail.show = true
            this.projectDetail.detail = row
            this.$forceUpdate()
        },
        // 回款信息保存成功
        fundsSuccess () {
            this.fundsRepaymentDetail.show = false
            this.getContract.getData()
        },
        // 财务信息保存成功
        financialSuccess () {
            this.financialAccountDetail.show = false
            this.getContract.getData()
        },
        // 执行计划保存成功 审核/编辑
        saveExecutionSuccess () {
            this.exePlanDetail.show = false
            this.getContract.getData()
        },
        // 隐藏编辑项目 弹框
        hideNewProject () {
            this.projectDetail.show = false
            this.$forceUpdate()
        },
        // 打开新增类型 弹框
        openNewType (data) {
            this.newType.show = !this.newType.show
            this.newType.status = data.status
            this.$refs.newTypeEle.$el.style.top = data.event.clientY - 130 + 'px'
            this.$refs.newTypeEle.$el.style.left = data.event.clientX - 130 + 'px'
        },
        // 隐藏新增类型 弹框
        // hideNewType () {
        //     this.newType.show = false
        // },
        // 删除按钮
        deleteCt (row) {
            MessageBox.confirm('此操作将项目会一并删除, 是否继续?', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
                }).then(() => {
                    this.deleteContract.getData({id: row.id}).then(res => {
                        if (res.code !== 0) return Message.error(res.msg)
                        Message.success(res.msg)
                        this.getContract.getData()
                    })
            })
        },
        // 删除 成功后处理
        newTypeShow () {
            this.newType.show = true
        },
        // 新增/编辑 合同 成功后处理
        updateSuccess () {
            this.contractDetail.show = false
            this.contractDetail.detail = {}
            this.getContract.getData()
        },
        // 导出
        exportTable () {
            if (this.getContract.res.body.total >= 10000) {
                return Message.error('导出数据超过10000条,请重新选择条件')
            }
            let params = ''
            for (const key in this.getContract['params']) {
                if (this.getContract['params'].hasOwnProperty(key)) {
                    if (this.getContract['params'][key]) {
                        params += (key + '=' + this.getContract['params'][key] + '&')
                    } else {
                        params += (key + '=' + '&')
                    }
                }
            }
            download({
                url: api＿exportContract + '?' + params + 'fileName=' + '合同列表'
            })
        },
        // 重置
        async reset () {
            await this.$timeout(0)
            this.$refs.queryForm.resetFields()
            this.getContract.params.classId = []
            this.getContract.params.managerId = []
            this.getContract.params.status = '1'
            this.getContract.params.remind = ''
            this.getContract.params.keyword = ''
            this.getContract.getData()
        },
        // 模板下载
        tempDown () {
            download({
                url: api＿exportContractProjectFormwork + '?' + 'contractId=' + this.contractDetail.detail.id + '&fileName=' + '模板'
            })
        },
        // 导入项目
        importProject (e) {
            this.importContractProject.getData({file: this.$refs.fileBtn.files[0]}).then(res => {
                this.$refs.fileBtn.value = null
                if (res.code !== 0) return Message.error(res.msg)
                Message.success(res.msg)
                this.$bus.emit('updateProject')
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('openNewProject', this.openNewProject)
        this.$bus.off('hideNewProject', this.hideNewProject)
        this.$bus.off('openNewType', this.openNewType)
        // this.$bus.off('hideNewType', this.hideNewType)
        document.removeEventListener('click', this.hideType)
    }
}
</script>

<style lang="scss">
.contract-list {
    .el-dialog__header{
        border-bottom: 1px solid rgba(210,210,210,0.5);
    }
    .mtDialog {
        .el-dialog__body {
            overflow: auto;
        }
    }
    .el-table {
        .el-table__body-wrapper {
            transition: max-height .3s;
        }
    }

    .el-table ::-webkit-scrollbar:horizontal {
        width: 5px;
        height: 7px;
    }

    @import '@comm/assets/themes/table/t1.scss';

    @media screen and (-webkit-min-device-pixel-ratio:0) {
        .el-table__fixed,
        .el-table__fixed-right {
            bottom: 7px !important;
        }
    }

    .filter {
        padding: 0px 30px 0px 30px;
        .el-form-item {
            .el-input input {
                // width: calc(100vw - 930px);
                // max-width: 500px;
            }

            .el-form-item__label {
                @include c(color, $text_c2);
            }

            .el-input__inner, .el-textarea__inner {
                @include c(background-color, $bg_input_c1);
                @include c(border-color, $line_c1);
                @include c(color, $text_c2);

                &:focus, &:hover {
                    @include c(border-color, $line_c1);
                }
            }

            .el-input__suffix {
                right: 10px;
            }

            .el-input--suffix .el-input__inner {
                padding-right: 10px;
            }

            .el-select__input {
                color: rgba(255, 255, 255, 0.8);
            }

            .el-select.s1 .el-tag.el-tag--info {
                background-color: #396faa;
                border-color: #396faa;
                color: #fff;
                .el-select__tags-text {
                    display: inline-block;
                    max-width: 100px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                .el-tag__close.el-icon-close {
                    vertical-align: super;
                }
            }
        }
    }
}
</style>

<style lang="scss" scoped>
@import '@comm/assets/themes/scrollbar/s1.scss';

.contract-list {
    .content {
        position: relative;

        .toolbox {
            padding: 0 30px 0 30px;
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
                        color: #000;
                    }
                }
            }
        }
        .tableCon {
            position: relative;
            padding: 0 30px 0px 30px;
            .btn {
                font-size: 12px;
                display: inline-block;
            }
            .look {
                margin-right: 8px;
                & i {
                    margin-right: 5px;
                    @include c(color, $text_c4);
                }
            }
            .edit {
                margin-right: 8px;
                & i {
                    margin-right: 5px;
                    @include c(color, $text_c1);
                }
            }
            .delete {
                & i {
                    margin-right: 5px;
                    @include c(color, $text_c3);
                }
            }
            .table-summary {
                padding: 10px 0 0 0;
                font-size: 15px;
            }
        }
    }

    .newFile {
        display: inline-block;
        position: relative;
        background: #1caf9a;
        color: #fff;
        padding: 9px 20px;
        font-size: 14px;
        border-radius: 2px;
        border: 1px solid #1caf9a;
        transition: opacity .1s;
        margin-left: 10px;
        &:hover {
            opacity: .8;
        }
        input {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
    }
}
</style>
