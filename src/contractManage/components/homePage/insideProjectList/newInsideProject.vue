<template>
    <div class="new-inside-project">
        <div class="project-con">
            <el-form ref="Form1" :model="detail2" :inline='true' size="small">
                <el-form-item label="项目编号" prop="code"
                    :rules="{ required: true, message: '请输入项目编号' }" style="margin-right: 30px">
                    <el-input v-model="detail2.code" placeholder="请输入项目编号"></el-input>
                </el-form-item>
                <el-form-item label="项目名称" prop="name"
                    :rules="{ required: true, message: '请输入项目名称' }" style="margin-right: 30px">
                    <el-input v-model="detail2.name" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="项目经理" prop="projectManagerId"
                    :rules="{ required: true, message: '请选择项目经理' }">
                    <el-select v-model="detail2.projectManagerId" placeholder="请选择" style="width: 202px" filterable clearable @change="$forceUpdate()">
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
                            style="width: 180px"
                            v-model="detail2.estimateStartDate"
                            type="date"
                            format="yyyy-MM-dd"
                            :picker-options="starttime"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="预计完成时间" style="margin-right: 30px">
                        <el-date-picker
                            style="width: 180px"
                            v-model="detail2.estimateEndDate"
                            type="date"
                            format="yyyy-MM-dd"
                            :picker-options="endtime"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="预计验收时间">
                        <el-date-picker
                            style="width: 180px"
                            v-model="detail2.estimateCheckoutDate"
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
            <div class="file-list">
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
import { api＿saveExecutionPlan, api＿getMarketManager, api＿getExecutionPlanList, api＿BasedictionarySelectAll, api＿minioFileInfos, api＿minioUploader, api＿minioDownload, api＿getContractAuditList, api＿getLoginUser } from '@contractManage/request/api'
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
            getLoginUser: api＿getLoginUser({
                later: true
            }),
            detail2: {
                // input: '',
                // estimateStartDate: '',
                // estimateEndDate: '',
                // estimateCheckoutDate: ''
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
                    if (this.detail2.estimateEndDate) {
                        return (
                            time.getTime() > new Date(this.detail2.estimateEndDate).getTime()
                        )
                    }
                }
            },
            endtime: {
                disabledDate: time => {
                    if (this.detail2.estimateStartDate) {
                        return (
                            time.getTime() < new Date(this.detail2.estimateStartDate).getTime()
                        )
                    }
                }
            },
            fileIds: []
        }
    },
    created () {
        this.$bus.on('openeAdd', this.openeAdd)
        this.$bus.on('saveAdd', this.saveAdd)
    },
    methods: {
        // 打开页面
        openeAdd () {
            this.detail2 = JSON.parse(JSON.stringify(this.detail))
            if (Object.keys(this.detail2).length) {
                this.getExecutionPlanList.getData({
                    contractId: this.detail2.id,
                    projectManagerId: this.detail2.projectManagerId
                })
                // 获取附件列表
                this.getFileList()
                // 获取审核日志列表
                this.getContractAuditList.getData({ contractId: this.detail2.id })
            } else {
                delete this.detail2.id
                this.getExecutionPlanList.res.body = {
                    scheduleList: [],
                    costList: [],
                    personList: []
                }
                this.getLoginUser.getData().then(res => {
                    this.detail2.projectManagerId = res.userId
                })
            }
            // 项目内容下拉框
            this.BasedictionarySelectAll.getData()
            // // 获取市场负责人
            this.getMarketManager.getData({comId: 135})
        },
        addScheduleList (index) {
            this.getExecutionPlanList.res.body.scheduleList.splice(index + 1, 0, {
                    sid: null,
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
                    pchargeUser: null,
                    pworkHour: null,
                    pnote: null,
                    pstatus: null
                })
        },
        // 获取附件列表
        getFileList () {
            if (this.userId !== this.detail2.projectManagerId) {
                this.fileIds = this.detail2.fileIds
            } else {
                if (this.detail2.storage === '1') this.fileIds = this.detail2.storageFileIds
                else this.fileIds = this.detail2.fileIds
            }
            this.fileIds = this.fileIds ? this.fileIds.split(',') : []
            this.fileIds.length && this.minioFileInfos.getData({
                ids: this.fileIds.join()
            })
        },
        // 提交/暂存
        saveAdd (temporary) {
            if (this.saveExecutionPlan.loading) return Message.error('正在提交中')
            this.getExecutionPlanList.res.body.scheduleList.forEach((v, i) => { v.sserNum = i + 1 })
            this.getExecutionPlanList.res.body.costList.forEach((v, i) => { v.cserNum = i + 1 })
            this.getExecutionPlanList.res.body.personList.forEach((v, i) => { v.pserNum = i + 1 })
            this.getExecutionPlanList.res.body.scheduleList.forEach(v => {
                v.sstartDate = v.sstartDate ? new Date(v.sstartDate).Format('yyyy-MM-dd') : ''
                v.sendDate = v.sendDate ? new Date(v.sendDate).Format('yyyy-MM-dd') : ''
            })
            let params = {
                isInside: 1,
                insideProject: 1,
                id: this.detail2.id,
                code: this.detail2.code,
                name: this.detail2.name,
                projectManagerId: this.detail2.projectManagerId,
                estimateStartDate: this.detail2.estimateStartDate ? new Date(this.detail2.estimateStartDate).Format('yyyy-MM-dd') : '',
                estimateEndDate: this.detail2.estimateEndDate ? new Date(this.detail2.estimateEndDate).Format('yyyy-MM-dd') : '',
                estimateCheckoutDate: this.detail2.estimateStartDate ? new Date(this.detail2.estimateStartDate).Format('yyyy-MM-dd') : '',
                temporary: temporary,
                scheduleList: JSON.stringify(this.getExecutionPlanList.res.body.scheduleList),
                costList: JSON.stringify(this.getExecutionPlanList.res.body.costList),
                personList: JSON.stringify(this.getExecutionPlanList.res.body.personList)
            }
            if (temporary === 1) params.storageFileIds = this.minioFileInfos.res.data.map(v => v.id).join()
            else params.fileIds = this.minioFileInfos.res.data.map(v => v.id).join()
            this.$refs.Form1.validate(valid => {
                if (!valid) return false
                this.saveExecutionPlan.getData(params).then(res => {
                    if (res.code !== 0) return Message.error(res.msg)
                    Message.success(res.msg)
                    this.$emit('saveAddSuccess')
                })
            })
        },
        // 上传附件
        uploadAppendix () {
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
        this.$bus.off('openeAdd', this.openeAdd)
        this.$bus.off('saveAdd', this.saveAdd)
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
