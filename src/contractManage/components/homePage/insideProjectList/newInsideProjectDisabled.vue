<template>
    <div class="new-inside-project">
        <div class="project-con">
            <el-form ref="Form1" :model="detail" :inline='true' size="small">
                <el-form-item label="项目编号" prop="code"
                    :rules="{ required: true, message: '请输入项目编号' }" style="margin-right: 30px">
                    <el-input v-model="detail.code" placeholder="请输入项目编号" disabled></el-input>
                </el-form-item>
                <el-form-item label="项目名称" prop="name"
                    :rules="{ required: true, message: '请输入项目名称' }" style="margin-right: 30px">
                    <el-input v-model="detail.name" placeholder="请输入项目名称" disabled></el-input>
                </el-form-item>
                <el-form-item label="项目经理" prop="projectManagerId"
                    :rules="{ required: true, message: '请选择项目经理' }">
                    <el-select v-model="detail.projectManagerId" placeholder="请选择" style="width: 202px" filterable clearable disabled>
                        <el-option
                            v-for="item in getMarketManager.res.body"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="schedule">
            <div class="title">进度安排</div>
            <div class="time-con">
                <el-form ref="Form2" :inline='true' size="small">
                    <el-form-item label="预计开始时间" style="margin-right: 30px">
                        <el-date-picker
                            disabled
                            style="width: 180px"
                            v-model="detail.estimateStartDate"
                            type="date"
                            format="yyyy-MM-dd"
                            :picker-options="starttime"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="预计完成时间" style="margin-right: 30px">
                        <el-date-picker
                            disabled
                            style="width: 180px"
                            v-model="detail.estimateEndDate"
                            type="date"
                            format="yyyy-MM-dd"
                            :picker-options="endtime"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="预计验收时间">
                        <el-date-picker
                            disabled
                            style="width: 180px"
                            v-model="detail.estimateCheckoutDate"
                            type="date"
                            format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
            <el-table
                :data="getExecutionPlanList.res.body.scheduleList"
                style="width: 100%"
                :row-style="{'cursor': 'pointer'}"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                >
                    <el-table-column label="序号" width="70">
                        <template slot-scope="scope">
                            <span>{{scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="项目内容" width="180">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.sprojectContent" placeholder="请输入项目内容" disabled></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="开始时间" width="180">
                        <template slot-scope="scope">
                            <el-date-picker
                                disabled
                                :clearable='false'
                                style="width: 100%"
                                v-model="scope.row.sstartDate"
                                type="date"
                                format="yyyy-MM-dd"
                                :picker-options="{
                                    disabledDate: time => {
                                        if (scope.row.sendDate) {
                                            return (
                                                time.getTime() > new Date(scope.row.sendDate).getTime()
                                            )
                                        }
                                    }
                                }"
                                placeholder="选择日期">
                            </el-date-picker>
                        </template>
                    </el-table-column>
                    <el-table-column label="结束时间" width="180">
                        <template slot-scope="scope">
                            <el-date-picker
                                disabled
                                :clearable='false'
                                style="width: 100%"
                                v-model="scope.row.sendDate"
                                type="date"
                                format="yyyy-MM-dd"
                                :picker-options="{
                                    disabledDate: time => {
                                        if (scope.row.sstartDate) {
                                            return (
                                                time.getTime() < new Date(scope.row.sstartDate).getTime()
                                            )
                                        }
                                    }
                                }"
                                placeholder="选择日期">
                            </el-date-picker>
                        </template>
                    </el-table-column>
                    <el-table-column label="负责人" width="180">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.schargeUser" placeholder="请选择" disabled>
                                <el-option
                                v-for="item in getMarketManager.res.body"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" width="180">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.snote" placeholder="请输入备注" disabled></el-input>
                        </template>
                    </el-table-column>
                <template slot="empty">
                    <span style="color: #000">暂无数据</span>
                </template>
            </el-table>
        </div>
        <div class="expenses-cost">
            <div class="title">费用成本</div>
            <el-table
                :data="getExecutionPlanList.res.body.costList"
                style="width: 100%"
                :row-style="{'cursor': 'pointer'}"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                >
                    <el-table-column label="序号" width="50">
                        <template slot-scope="scope">
                            <span>{{scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="项目内容" width="200">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.cprojectContentId" placeholder="请选择" style="width: 100%" disabled>
                                <el-option
                                v-for="item in BasedictionarySelectAll.res"
                                :key="item.dictValue"
                                :label="item.dictName"
                                :value="item.dictValue">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="费用情况(元)" width="350">
                        <template slot-scope="scope">
                            <el-input size="small" type="number" v-model="scope.row.ccostSituation" placeholder="请输入费用情况" title="" disabled></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.cnote" placeholder="请输入备注" disabled></el-input>
                        </template>
                    </el-table-column>
                <template slot="empty">
                    <span style="color: #000">暂无数据</span>
                </template>
            </el-table>
        </div>
        <div class="personnel-cost">
            <div class="title">人员成本</div>
            <el-table
                :data="getExecutionPlanList.res.body.personList"
                style="width: 100%"
                :row-style="{'cursor': 'pointer'}"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                >
                    <el-table-column label="序号" width="50">
                        <template slot-scope="scope">
                            <span>{{scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="负责人" width="200">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.pchargeUser" placeholder="请选择" style="width: 100%" disabled>
                                <el-option
                                v-for="item in getMarketManager.res.body"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="工时(天)" width="350">
                        <template slot-scope="scope">
                            <el-input size="small" type="number" v-model="scope.row.pworkHour" placeholder="请输入工时" title="" disabled></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.pnote" placeholder="请输入备注" disabled></el-input>
                        </template>
                    </el-table-column>
                <template slot="empty">
                    <span style="color: #000">暂无数据</span>
                </template>
            </el-table>
        </div>
        <div class="upload-file">
            <div class="title">上传附件</div>
            <div class="file-list">
                <div class="item" v-for="(item, index) in minioFileInfos.res.data" :key="index">
                    <span @click="downFile(item.id)">{{index + 1}}. {{item.realName}}</span>
                </div>
            </div>
        </div>
        <div class="audit-opinion" v-if="UserAuthHandleGetBusinessManageAuth07.res.body.enable && detail.examine === '1'">
            <div class="title">审核意见</div>
            <div class="opinion-con">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 6}"
                    placeholder="请输入内容"
                    v-model="applyAudit.params.auditOpinion">
                </el-input>
            </div>
        </div>
        <div class="historical-audit-record" v-if="Object.keys(this.detail).length">
            <div class="title">历史审核记录</div>
            <div class="record-list">
                <div class="item" v-for="(item, index) in getContractAuditList.res.body" :key="index">
                    {{index + 1}}. {{item}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api＿saveExecutionPlan, api＿getMarketManager, api＿getExecutionPlanList, api＿BasedictionarySelectAll, api＿minioFileInfos, api＿minioUploader, api＿minioDownload, api＿getContractAuditList, api＿UserAuthHandleGetBusinessManageAuth07, api＿applyAudit } from '@contractManage/request/api'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import { Table, TableColumn, Select, Option, Form, FormItem, Input, DatePicker, Message } from 'element-ui'
import { download } from '@comm/request/http'
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
        ElDatePicker: DatePicker
    },
    props: {
        detail: {
            type: Object
        },
        userId: {
            type: Number
        }
    },
    data () {
        return {
            getMarketManager: api＿getMarketManager({
                later: true
            }),
            saveExecutionPlan: api＿saveExecutionPlan({
                later: true,
                sameTimeOnce: true
            }),
            getExecutionPlanList: api＿getExecutionPlanList({
                later: true,
                res: {
                    body: {
                        scheduleList: [],
                        costList: [],
                        personList: []
                    }
                }
            }),
            BasedictionarySelectAll: api＿BasedictionarySelectAll({
                later: true,
                res: {
                    body: []
                }
            }),
            minioFileInfos: api＿minioFileInfos({
                later: true,
                res: {
                    data: []
                }
            }),
            minioUploader: api＿minioUploader({
                later: true
            }),
            getContractAuditList: api＿getContractAuditList({
                later: true
            }),
            UserAuthHandleGetBusinessManageAuth07: api＿UserAuthHandleGetBusinessManageAuth07({
                later: true,
                res: { body: {} }
            }),
            applyAudit: api＿applyAudit({
                later: true,
                sameTimeOnce: true,
                params: {
                    auditOpinion: ''
                },
                res: { body: {} }
            }),
            detail2: {
                input: '',
                estimateStartDate: '',
                estimateEndDate: '',
                estimateCheckoutDate: ''
            },
            tableList: [
                {
                    a: 1,
                    b: 1,
                    c: 1,
                    d: 1,
                    e: 1,
                    f: 1,
                    g: 1,
                    h: 1,
                    i: 1,
                    j: 1
                },
                {
                    a: 1,
                    b: 1,
                    c: 1,
                    d: 1,
                    e: 1,
                    f: 1,
                    g: 1,
                    h: 1,
                    i: 1,
                    j: 1
                }
            ],
            starttime: {
                disabledDate: time => {
                    if (this.detail.estimateEndDate) {
                        return (
                            time.getTime() > new Date(this.detail.estimateEndDate).getTime()
                        )
                    }
                }
            },
            endtime: {
                disabledDate: time => {
                    if (this.detail.estimateStartDate) {
                        return (
                            time.getTime() < new Date(this.detail.estimateStartDate).getTime()
                        )
                    }
                }
            },
            fileIds: []
        }
    },
    created () {
        this.$bus.on('openeAdd', this.openeAdd)
        this.$bus.on('saveExamine', this.saveExamine)
    },
    methods: {
        // 打开页面
        openeAdd () {
            if (Object.keys(this.detail).length) {
                this.getExecutionPlanList.getData({
                    contractId: this.detail.id,
                    projectManagerId: this.detail.projectManagerId
                })
                // 获取附件列表
                this.getFileList()
                // 获取审核日志列表
                this.getContractAuditList.getData({ contractId: this.detail.id })
                // 判断是否是 审核人
                this.UserAuthHandleGetBusinessManageAuth07.getData()
            } else {
                delete this.detail.id
                this.getExecutionPlanList.res.body = {
                    scheduleList: [],
                    costList: [],
                    personList: []
                }
            }
            // 项目内容下拉框
            this.BasedictionarySelectAll.getData()
            // // 获取市场负责人
            this.getMarketManager.getData({comId: 135})
        },
        // 获取附件列表
        getFileList () {
            if (this.userId !== this.detail.projectManagerId) {
                this.fileIds = this.detail.fileIds
            } else {
                if (this.detail.storage === '1') this.fileIds = this.detail.storageFileIds
                else this.fileIds = this.detail.fileIds
            }
            this.fileIds = this.fileIds ? this.fileIds.split(',') : []
            this.fileIds.length && this.minioFileInfos.getData({
                ids: this.fileIds.join()
            })
        },
        // 下载附件
        downFile (id) {
            download({
                url: api＿minioDownload + '?' + 'id=' + id
            })
        },
        // 通过/退回
        saveExamine (auditStatus) {
            if (this.applyAudit.loading) return
            this.applyAudit.getData({
                contractId: this.detail.id,
                auditStatus: auditStatus
            }).then(res => {
                if (res.code !== 0) return Message.error(res.msg)
                Message.success(res.msg)
                this.$emit('saveAddSuccess')
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('openeAdd', this.openeAdd)
        this.$bus.off('saveExamine', this.saveExamine)
    }
}
</script>

<style lang="scss">
.new-inside-project {
    @import '@comm/assets/themes/table/t6.scss';
    .el-table {
        .el-input__inner {
            color: #818181;
        }
        .el-table__empty-text {
            // width: 100%;
            .add {
                margin-left: 5px;
                .iconfont.iconjia {
                    margin-right: 0;
                }
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.new-inside-project {
    padding: 0 20px;
    .title {
        color: #585858;
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 15px;
    }
    .el-table {
        .add {
            cursor: pointer;
            .iconfont {
                color: #4CCA85;
                margin-right: 15px;
            }
        }
        .delete {
            cursor: pointer;
            .iconfont {
                color: #EB6868;
            }
        }
    }
    .expenses-cost {
        margin-top: 20px;
    }
    .personnel-cost {
        margin-top: 20px;
    }
    .upload-file {
        margin-top: 20px;
        .upload-btn {
            display: inline-block;
            position: relative;
            color: #38A0FF;
            padding: 2px 0;
            font-size: 14px;
            cursor: pointer;
            .iconfont {
                color: #38A0FF;
            }
            input {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                font-size: 0;
                cursor: pointer;
            }
        }
        .file-list {
            width: max-content;
            .item {
                padding-bottom: 10px;
                cursor: pointer;
                & i {
                    margin-left: 5px;
                    @include c(color, $text_c3);
                }
            }
        }
    }
    .audit-opinion {
        display: flex;
        margin-top: 30px;
        .title {
            flex: 0 0 60px;
            margin-right: 20px;
        }
        .opinion-con {
            flex: 1 1 auto;
        }
    }
    .historical-audit-record {
        margin-top: 30px;
        .record-list {
            width: max-content;
            .item {
                padding-bottom: 10px;
            }
        }
    }

}
</style>
