<template>
    <div class="execution-plan">
        <div class="schedule">
            <div class="title">进度安排</div>
            <div class="time-con">
                <el-form ref="Form" :inline='true' size="small">
                    <el-form-item label="预计开始时间" style="margin-right: 30px">
                        <el-date-picker
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
                            <el-input size="small" v-model="scope.row.sprojectContent" placeholder="请输入项目内容"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="开始时间" width="180">
                        <template slot-scope="scope">
                            <el-date-picker
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
                            <el-select v-model="scope.row.schargeUser" placeholder="请选择">
                                <el-option
                                v-for="item in getMarketManager.res.body"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                            <!-- <el-input size="small" v-model="scope.row.schargeUser" placeholder="请输入负责人"></el-input> -->
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" width="180">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.snote" placeholder="请输入备注"></el-input>
                        </template>
                    </el-table-column>
                <el-table-column
                    fixed="right"
                    width="100"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <span title="新增" class="add" @click="addScheduleList(scope.$index)">
                            <i class="iconfont iconjia"></i>
                        </span>
                        <span title="删除" class="delete">
                            <i class="iconfont iconjianshao" @click="getExecutionPlanList.res.body.scheduleList.splice(scope.$index, 1)"></i>
                        </span>
                    </template>
                </el-table-column>
                <template slot="empty">
                    <span style="color: #000">暂无数据</span>
                    <span title="新增" class="add" @click="getExecutionPlanList.res.body.scheduleList.push({
                        sid: null,
                        scontractId: detail.id,
                        sprojectContent: null,
                        sstartDate: new Date().getTime(),
                        sendDate: new Date().getTime(),
                        schargeUser: null,
                        snote: null,
                        sstatus: null
                    })">
                        <i class="iconfont iconjia"></i>
                    </span>
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
                    <el-table-column label="序号" width="50">
                        <template slot-scope="scope">
                            <span>{{scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="项目内容" width="200">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.cprojectContentId" placeholder="请选择" style="width: 100%">
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
                            <el-input size="small" type="number" v-model="scope.row.ccostSituation" placeholder="请输入费用情况" title=""></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.cnote" placeholder="请输入备注"></el-input>
                        </template>
                    </el-table-column>
                <el-table-column
                    fixed="right"
                    width="100"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <span title="新增" class="add" @click="addCostList(scope.$index)">
                            <i class="iconfont iconjia"></i>
                        </span>
                        <span title="删除" class="delete">
                            <i class="iconfont iconjianshao" @click="getExecutionPlanList.res.body.costList.splice(scope.$index, 1)"></i>
                        </span>
                    </template>
                </el-table-column>
                <template slot="empty">
                    <span style="color: #000">暂无数据</span>
                    <span title="新增" class="add" @click="getExecutionPlanList.res.body.costList.push({
                        cid: null,
                        ccontractId: detail.id,
                        cprojectContentId: null,
                        cprojectContent: null,
                        ccostSituation: null,
                        cnote: null,
                        cstatus: null
                    })">
                        <i class="iconfont iconjia"></i>
                    </span>
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
                    <el-table-column label="序号" width="50">
                        <template slot-scope="scope">
                            <span>{{scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="负责人" width="200">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.pchargeUser" placeholder="请选择" style="width: 100%">
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
                            <el-input size="small" type="number" v-model="scope.row.pworkHour" placeholder="请输入工时" title=""></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.pnote" placeholder="请输入备注"></el-input>
                        </template>
                    </el-table-column>
                <el-table-column
                    fixed="right"
                    width="100"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <span title="新增" class="add" @click="addPersonList(scope.$index)">
                            <i class="iconfont iconjia"></i>
                        </span>
                        <span title="删除" class="delete">
                            <i class="iconfont iconjianshao" @click="getExecutionPlanList.res.body.personList.splice(scope.$index, 1)"></i>
                        </span>
                    </template>
                </el-table-column>
                <template slot="empty">
                    <span style="color: #000">暂无数据</span>
                    <span title="新增" class="add" @click="getExecutionPlanList.res.body.personList.push({
                        pid: null,
                        pcontractId: detail.id,
                        pchargeUser: null,
                        pworkHour: null,
                        pnote: null,
                        pstatus: null
                    })">
                        <i class="iconfont iconjia"></i>
                    </span>
                </template>
            </el-table>
        </div>
        <div class="upload-file">
            <div class="title">上传附件</div>
            <div class="file-list" v-loading='minioUploader.loading'>
                <div class="item" v-for="(item, index) in minioFileInfos.res.data" :key="index">
                    <span @click="downFile(item.id)">{{index + 1}}. {{item.realName}}</span>
                    <i class="iconfont iconshanchu1" title="删除" @click="deleteFile(item.id, index)"></i>
                </div>
            </div>
            <div class="upload-btn">
                <i class="iconfont iconfujian"></i>
                <span>增加附件</span>
                <input
                type="file"
                @change="uploadAppendix()"
                ref="uploadFile"
                style="opacity: 0"
                />
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
import { api＿getExecutionPlanList, api＿BasedictionarySelectAll, api＿getMarketManager, api＿getContractAuditList, api＿saveExecutionPlan, api＿minioUploader, api＿minioFileInfos, api＿minioDownload } from '@contractManage/request/api'
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
            saveExecutionPlan: api＿saveExecutionPlan({
                later: true,
                sameTimeOnce: true
            }),
            minioUploader: api＿minioUploader({
                later: true
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
        this.$bus.on('saveExePlan', this.saveExePlan)
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
            // 获取附件列表
            this.getFileList()
        },
        addScheduleList (index) {
            this.getExecutionPlanList.res.body.scheduleList.splice(index + 1, 0, {
                    sid: null,
                    scontractId: this.detail.id,
                    sprojectContent: null,
                    sstartDate: new Date().getTime(),
                    sendDate: new Date().getTime(),
                    schargeUser: null,
                    snote: null,
                    sstatus: null
                })
        },
        addCostList (index) {
            this.getExecutionPlanList.res.body.costList.splice(index + 1, 0, {
                    cid: null,
                    ccontractId: this.detail.id,
                    cprojectContentId: null,
                    cprojectContent: null,
                    ccostSituation: null,
                    cnote: null,
                    cstatus: null
                })
        },
        addPersonList (index) {
            this.getExecutionPlanList.res.body.personList.splice(index + 1, 0, {
                    pid: null,
                    pcontractId: this.detail.id,
                    pchargeUser: null,
                    pworkHour: null,
                    pnote: null,
                    pstatus: null
                })
        },
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
        // 提交/暂存
        saveExePlan (temporary) {
            if (this.saveExecutionPlan.loading) return Message.error('正在提交中')
            this.getExecutionPlanList.res.body.scheduleList.forEach((v, i) => { v.sserNum = i + 1 })
            this.getExecutionPlanList.res.body.costList.forEach((v, i) => { v.cserNum = i + 1 })
            this.getExecutionPlanList.res.body.personList.forEach((v, i) => { v.pserNum = i + 1 })
            this.getExecutionPlanList.res.body.scheduleList.forEach(v => {
                v.sstartDate = v.sstartDate ? new Date(v.sstartDate).Format('yyyy-MM-dd') : ''
                v.sendDate = v.sendDate ? new Date(v.sendDate).Format('yyyy-MM-dd') : ''
            })
            let params = {
                id: this.detail.id,
                estimateStartDate: this.detail.estimateStartDate ? new Date(this.detail.estimateStartDate).Format('yyyy-MM-dd') : '',
                estimateEndDate: this.detail.estimateEndDate ? new Date(this.detail.estimateEndDate).Format('yyyy-MM-dd') : '',
                estimateCheckoutDate: this.detail.estimateStartDate ? new Date(this.detail.estimateStartDate).Format('yyyy-MM-dd') : '',
                temporary: temporary,
                scheduleList: JSON.stringify(this.getExecutionPlanList.res.body.scheduleList),
                costList: JSON.stringify(this.getExecutionPlanList.res.body.costList),
                personList: JSON.stringify(this.getExecutionPlanList.res.body.personList)
            }
            if (temporary === 1) params.storageFileIds = this.minioFileInfos.res.data.map(v => v.id).join()
            else params.fileIds = this.minioFileInfos.res.data.map(v => v.id).join()
            this.saveExecutionPlan.getData(params).then(res => {
                if (res.code !== 0) return Message.error(res.msg)
                Message.success(res.msg)
                this.$emit('saveExecutionSuccess')
            })
        },
        // 上传附件
        uploadAppendix () {
            console.log(this.$refs.uploadFile.files[0])
            this.minioUploader.getData({
                file: this.$refs.uploadFile.files[0],
                dir: 'contract-task'
            }).then(res => {
                this.$refs.uploadFile.value = null
                if (res.code === 200) {
                    this.fileIds.push(res.data.id)
                    this.minioFileInfos.getData({
                        ids: this.fileIds.join()
                    })
                }
            })
        },
        // 删除附件
        deleteFile (id, index) {
            this.minioFileInfos.res.data.splice(index, 1)
            this.fileIds.splice(this.fileIds.indexOf(id), 1)
        },
        // 下载附件
        downFile (id) {
            download({
                url: api＿minioDownload + '?' + 'id=' + id
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('openExePlan', this.openExePlan)
        this.$bus.off('saveExePlan', this.saveExePlan)
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
                & i {
                    margin-left: 5px;
                    @include c(color, $text_c3);
                }
            }
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
