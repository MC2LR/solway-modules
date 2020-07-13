<template>
    <div class="execution-plan">
        <div class="schedule">
            <div class="title">进度安排</div>
            <div class="time-con">
                <el-form ref="Form" :inline='true' size="small">
                    <el-form-item label="预计开始时间" style="margin-right: 30px">
                        <el-date-picker
                            disabled
                            style="width: 180px"
                            v-model="detail.estimateStartDate"
                            type="date"
                            format="yyyy-MM-dd"
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
                v-loading="getExecutionPlanList.loading"
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
                                style="width: 100%"
                                v-model="scope.row.sstartDate"
                                type="date"
                                format="yyyy-MM-dd"
                                placeholder="选择日期">
                            </el-date-picker>
                        </template>
                    </el-table-column>
                    <el-table-column label="结束时间" width="180">
                        <template slot-scope="scope">
                            <el-date-picker
                                disabled
                                style="width: 100%"
                                v-model="scope.row.sendDate"
                                type="date"
                                format="yyyy-MM-dd"
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
                v-loading="getExecutionPlanList.loading"
                style="width: 100%"
                :row-style="{'cursor': 'pointer'}"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                >
                    <el-table-column label="序号" width="43">
                        <template slot-scope="scope">
                            <span>{{scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="项目内容" width="180">
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
                    <el-table-column label="费用情况" width="180">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.ccostSituation" placeholder="请输入费用情况" disabled></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" width="180">
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
                v-loading="getExecutionPlanList.loading"
                style="width: 100%"
                :row-style="{'cursor': 'pointer'}"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                >
                    <el-table-column label="序号" width="43">
                        <template slot-scope="scope">
                            <span>{{scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="负责人" width="180">
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
                    <el-table-column label="工时" width="180">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.pworkHour" placeholder="请输入工时" disabled></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" width="180">
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
            <div class="title">附件列表</div>
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
        <div class="historical-audit-record">
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
import { api＿getExecutionPlanList, api＿BasedictionarySelectAll, api＿getMarketManager, api＿getContractAuditList, api＿UserAuthHandleGetBusinessManageAuth07, api＿applyAudit, api＿minioFileInfos, api＿minioDownload } from '@contractManage/request/api'
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
            textarea: '',
            fileIds: [],
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
            getMarketManager: api＿getMarketManager({
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
            minioFileInfos: api＿minioFileInfos({
                later: true,
                res: {
                    data: []
                }
            })
        }
    },
    created () {
        this.$bus.on('openExePlan', this.openExePlan)
        this.$bus.on('saveExamine', this.saveExamine)
    },
    methods: {
        // 打开页面
        openExePlan () {
            this.getExecutionPlanList.getData({
                contractId: this.detail.id,
                projectManagerId: this.detail.projectManagerId
            })
            this.BasedictionarySelectAll.getData()
            // 获取市场负责人
            this.getMarketManager.getData({comId: 135})
            // 获取审核日志列表
            this.getContractAuditList.getData({ contractId: this.detail.id })
            // 判断是否是 审核人
            this.UserAuthHandleGetBusinessManageAuth07.getData()
            // 获取附件
            this.getFileList()
        },
        // 获取附件
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
                this.$emit('saveExecutionSuccess')
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('openExePlan', this.openExePlan)
        this.$bus.off('saveExamine', this.saveExamine)
    }
}
</script>

<style lang="scss">
.execution-plan {
    @import '@comm/assets/themes/table/t6.scss';
    .el-table {
        .el-input__inner {
            color: #818181;
        }
        .el-table__empty-text {
            // width: 100%;
            .add {
                // width: 100px;
                // position: absolute;
                // right: 0;
                // z-index: 111;
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
.execution-plan {
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
