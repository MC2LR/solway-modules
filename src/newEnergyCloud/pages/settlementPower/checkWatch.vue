<template>
    <div class="check-watch">
        <div class="project-con">
            <el-form ref="Form" :model="detailObj" :inline='true' size="small">
                <el-form-item label="期数" prop="input" style="margin-right: 30px">
                        <el-date-picker
                            @change='calFilter()'
                            :disabled="Object.keys(detail).length !== 0"
                            style="width: 180px"
                            v-model="detailObj.acqumonth"
                            type="month"
                            format="yyyy-MM"
                            placeholder="选择期数">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="电站" prop="input" style="margin-right: 30px">
                        <el-select v-model="detailObj.stid" filterable clearable collapse-tags
                        placeholder="全部" style="max-width: 250px" :disabled="Object.keys(detail).length !== 0" @change='calFilter()'>
                            <el-option
                                v-for="item in getStByRoleAndComIds.res.body"
                                :key="item.stId"
                                :label="item.stName"
                                :value="item.stId">
                            </el-option>
                        </el-select>
                </el-form-item>
                <!-- <el-form-item label="抄表日期" prop="input">
                        <el-date-picker
                            style="width: 180px"
                            v-model="custDeviceMeterElecGetCustDeviceMeterElecList.res.data.acqudate"
                            type="date"
                            format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                </el-form-item> -->
            </el-form>
        </div>
        <div class="Tips" v-if="!custDeviceMeterElecGetCustDeviceMeterElecList.res.data.List.length && custDeviceMeterElecGetCustDeviceMeterElecList.res.data.status === 1">不支持抄表历史未抄表期数, 请重新选择期数</div>
        <div class="Tips" v-if="!custDeviceMeterElecGetCustDeviceMeterElecList.res.data.List.length && custDeviceMeterElecGetCustDeviceMeterElecList.res.data.status === 0">该电站下没有电表</div>
        <div class="schedule" v-for="(item, index) in custDeviceMeterElecGetCustDeviceMeterElecList.res.data.List" :key="index">
            <div class="title">
                <span>计量点名称: {{item.name}}</span>
                <span>表计编号: {{item.code}}</span>
                <span>倍率: {{item.multpw}}</span>
                <span>
                    抄表日期：
                    <el-date-picker
                        :disabled="item.acqudateDisabled"
                        style="width: 180px"
                        v-model="item.acqudate"
                        @change="$forceUpdate()"
                        type="date"
                        format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </span>
            </div>
            <el-table
                :data="item.tableList"
                @cell-click='cellClick'
                style="width: 100%"
                :row-style="{'cursor': 'pointer'}"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                >
                    <el-table-column prop="k" label="期数" width="110"></el-table-column>
                    <el-table-column label="尖" width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.k === '上期' || scope.row.k === '上期耗电示数'">{{scope.row.sharp}}</span>
                            <el-input size="small" v-model="scope.row.sharp" :placeholder="scope.row.k === '本期' ? '请输入尖示数' : '请输入尖'+scope.row.k" v-if="!(scope.row.k === '上期' || scope.row.k === '上期耗电示数')" @input="changeEnergy('sharp', scope.$index, index)" :disabled="scope.row.disabled"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="峰" width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.k === '上期' || scope.row.k === '上期耗电示数'">{{scope.row.peak}}</span>
                            <el-input size="small" v-model="scope.row.peak" :placeholder="scope.row.k === '本期' ? '请输入峰示数' : '请输入峰'+scope.row.k" v-if="!(scope.row.k === '上期' || scope.row.k === '上期耗电示数')" @input="changeEnergy('peak', scope.$index, index)" :disabled="scope.row.disabled"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="平" width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.k === '上期' || scope.row.k === '上期耗电示数'">{{scope.row.flat}}</span>
                            <el-input size="small" v-model="scope.row.flat" :placeholder="scope.row.k === '本期' ? '请输入平示数' : '请输入平'+scope.row.k" v-if="!(scope.row.k === '上期' || scope.row.k === '上期耗电示数')" @input="changeEnergy('flat', scope.$index, index)" :disabled="scope.row.disabled"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="谷" width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.k === '上期' || scope.row.k === '上期耗电示数'">{{scope.row.valley}}</span>
                            <el-input size="small" v-model="scope.row.valley" :placeholder="scope.row.k === '本期' ? '请输入谷示数' : '请输入谷'+scope.row.k" v-if="!(scope.row.k === '上期' || scope.row.k === '上期耗电示数')" @input="changeEnergy('valley', scope.$index, index)" :disabled="scope.row.disabled"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="合计" width="150">
                        <template slot-scope="scope">
                            <span>{{Number(scope.row.sharp) + Number(scope.row.peak) + Number(scope.row.flat) + Number(scope.row.valley)}}</span>
                            <!-- <el-input size="small" v-model="scope.row.e" placeholder="请输入上网电量" v-if="scope.row.k !== '上期'"></el-input> -->
                        </template>
                    </el-table-column>
                    <el-table-column label="附件" width="220">
                        <template slot-scope="scope">
                            <span v-if="scope.row.k === '本期'">
                                <img :src="scope.row.files" alt="点击下载附件" style="width: 60px;height: 60px" class="imgFile" v-if="scope.row.files">
                            </span>
                        </template>
                    </el-table-column>
                <el-table-column
                    fixed="right"
                    width="180"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <span title="编辑" class="edit" style="margin-left: 10px;" v-if="custDeviceMeterElecGetCustDeviceMeterElecList.res.data.status === 0 && (scope.row.k === '本期' && scope.row.disabled === true)" @click="edit(scope.$index, index)">
                            <i class="iconfont icon-bianji-copy" style="font-size: 16px"></i>
                            编辑
                        </span>
                        <span title="附件上传" class="upload" v-if="scope.row.k === '本期' && scope.row.disabled === false">
                            <i class="iconfont icon-anzhuangdianbiaogongdan" style="font-size: 20px"></i>
                            附件上传
                            <input
                                v-if="scope.row.k === '本期' && scope.row.disabled === false"
                                type="file"
                                @change="uploadAppendix(scope.$index, index)"
                                accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                                :ref="'uploadFile' + index"
                                style="opacity: 0"
                            />
                        </span>
                        <span title="确定" class="add" style="margin-left: 10px" v-if="scope.row.k === '本期' && scope.row.disabled === false" @click="define(scope.$index, index)">
                            <i class="iconfont icon-xuanzhong"></i>
                            确定
                        </span>
                    </template>
                </el-table-column>
                <template slot="empty">
                    <span style="color: #000">暂无数据</span>
                    <span title="新增" class="add">
                        <i class="iconfont iconjia"></i>
                    </span>
                </template>
            </el-table>
        </div>
    </div>
</template>

<script>
import { api＿baseSearchConditionGetStByRoleAndComIds, api＿custDeviceMeterElecGetCustDeviceMeterElecList, api＿minioUploader, api＿minioFiles, api＿custDeviceMeterElecSaveCustDeviceMeterElec } from '@newEnergyCloud/request/api'
import mixinWidthHeight from '@comm/mixin/widthHeight'
// import { download } from '@comm/request/http'
export default {
    mixins: [mixinWidthHeight],
    props: {
        detail: {
            type: Object
        }
    },
    data () {
        return {
            getStByRoleAndComIds: api＿baseSearchConditionGetStByRoleAndComIds({
                later: true,
                res: { body: [] }
            }),
            custDeviceMeterElecGetCustDeviceMeterElecList: api＿custDeviceMeterElecGetCustDeviceMeterElecList({
                later: true,
                res: {
                    data: {
                        List: [],
                        acqudate: '',
                        status: ''
                    }
                 }
            }),
            minioUploader: api＿minioUploader({
                later: true,
                res: { body: [] }
            }),
            minioFiles: api＿minioFiles({
                later: true,
                res: { body: [] }
            }),
            custDeviceMeterElecSaveCustDeviceMeterElec: api＿custDeviceMeterElecSaveCustDeviceMeterElec({
                later: true,
                res: { body: [] }
            }),
            detailObj: {},
            fileIds: []
        }
    },
    created () {
        this.$bus.on('openCheckWatch', this.openCheckWatch)
    },
    methods: {
        // 打开页面
        async openCheckWatch () {
            await this.$timeout(100)

            this.detailObj = JSON.parse(JSON.stringify(this.detail))
            // 电站列表
            this.getStByRoleAndComIds.getData({stClass: '01', comIds: []})
            this.getList()
        },
        calFilter () {
            this.getList()
        },
        getList () {
            const {stid: stId, acqumonth: date} = this.detailObj
            stId && date && this.custDeviceMeterElecGetCustDeviceMeterElecList.getData({
                stId,
                date: date ? new Date(date).Format('yyyy-MM') : ''
            }).then(res => {
                if (res.code !== 200) {
                    res.data.List = [{tableList: []}]
                    return
                }
                res.data.List = res.data.List.map((v, i) => {
                    v.tableList = []
                    v.SQ.k = '上期'
                    v.BQ.k = '本期'
                    v.SW.k = v.dt === 1 ? '上网电量' : '发电量'

                    v.SQ.disabled = true
                    v.BQ.disabled = true
                    v.SW.disabled = true
                    v.acqudateDisabled = true

                    if (v.dt !== 1) {
                        v.SqConsume = {}
                        v.BqConsume = {}
                        v.SwConsume = {}

                        v.SqConsume.k = '上期耗电示数'
                        v.BqConsume.k = '本期耗电示数'
                        v.SwConsume.k = '耗电量'

                        v.SqConsume.disabled = true
                        v.BqConsume.disabled = true
                        v.SwConsume.disabled = true

                        v.SqConsume.sharp = v.SQ.sharpConsKwh
                        v.SqConsume.peak = v.SQ.peakConsKwh
                        v.SqConsume.flat = v.SQ.flatConsKwh
                        v.SqConsume.valley = v.SQ.valleyConsKwh
                        v.SqConsume.consKwh = v.SQ.consKwh

                        v.BqConsume.sharp = v.BQ.sharpConsKwh
                        v.BqConsume.peak = v.BQ.peakConsKwh
                        v.BqConsume.flat = v.BQ.flatConsKwh
                        v.BqConsume.valley = v.BQ.valleyConsKwh
                        v.BqConsume.consKwh = v.BQ.consKwh

                        v.SwConsume.sharp = v.SW.sharpConsKwh
                        v.SwConsume.peak = v.SW.peakConsKwh
                        v.SwConsume.flat = v.SW.flatConsKwh
                        v.SwConsume.valley = v.SW.valleyConsKwh
                        v.SwConsume.consKwh = v.SW.consKwh
                    }

                    // v.SQ.total = Number(v.SQ.sharp) + Number(v.SQ.peak) + Number(v.SQ.flat) + Number(v.SQ.valley)
                    // v.BQ.total = Number(v.BQ.sharp) + Number(v.BQ.peak) + Number(v.BQ.flat) + Number(v.BQ.valley)
                    // v.SW.total = Number(v.SW.sharp) + Number(v.SW.peak) + Number(v.SW.flat) + Number(v.SW.valley)
                    // v.acqudate = v.acqudate ? v.acqudate : new Date(this.detailObj.acqumonth)
                    var date = new Date(this.detailObj.acqumonth)
                    var currentMonth = date.getMonth()
                    var nextMonth = ++currentMonth
                    var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
                    var oneDay = 1000 * 60 * 60 * 24
                    v.acqudate = v.acqudate ? v.acqudate : new Date(nextMonthFirstDay - oneDay)
                    if (v.dt !== 1) {
                        v.tableList.push(v.SQ, v.BQ, v.SW, v.SqConsume, v.BqConsume, v.SwConsume)
                    } else {
                        v.tableList.push(v.SQ, v.BQ, v.SW)
                    }
                    return v
                })
                // 获取附件
                this.getFileList()
            })
        },
        // 监测上网电量
        changeEnergy (prop, innerIndex, outIndex) {
            // this.tableList[index].e = Number(this.tableList[index].a) + Number(this.tableList[index].b) + Number(this.tableList[index].c) + Number(this.tableList[index].d)
            let tableList = this.custDeviceMeterElecGetCustDeviceMeterElecList.res.data.List
            if (innerIndex === 1 || (innerIndex === 4 && tableList[outIndex].dt !== 1)) {
                tableList[outIndex]['tableList'][innerIndex + 1][prop] = (tableList[outIndex]['tableList'][innerIndex][prop] - tableList[outIndex]['tableList'][innerIndex - 1][prop]) * tableList[outIndex].multpw
                this.$forceUpdate()
            }
        },
        // 编辑
        edit (innerIndex, outIndex) {
            let tableList = this.custDeviceMeterElecGetCustDeviceMeterElecList.res.data.List
            tableList[outIndex]['tableList'][innerIndex].disabled = false
            tableList[outIndex]['tableList'][innerIndex + 1].disabled = false
            if (tableList[outIndex].dt !== 1) {
                tableList[outIndex]['tableList'][innerIndex + 3].disabled = false
                tableList[outIndex]['tableList'][innerIndex + 4].disabled = false
            }
            tableList[outIndex].acqudateDisabled = false
            this.$forceUpdate()
        },
        // 确定
        define (innerIndex, outIndex) {
            let tableList = this.custDeviceMeterElecGetCustDeviceMeterElecList.res.data.List
            let one = tableList[outIndex]['tableList'][innerIndex]
            let two = tableList[outIndex]['tableList'][innerIndex + 1]
            let three, four
            if (tableList[outIndex].dt !== 1) {
                three = tableList[outIndex]['tableList'][innerIndex + 3]
                four = tableList[outIndex]['tableList'][innerIndex + 4]
                three.disabled = true
                four.disabled = true
            }
            one.disabled = true
            two.disabled = true
            tableList[outIndex].acqudateDisabled = true
            // let stAcquDate = this.custDeviceMeterElecGetCustDeviceMeterElecList.res.data.acqudate
            this.$forceUpdate()
            let params = {}
            if (tableList[outIndex].dt !== 1) {
                params = {
                    date: this.detailObj.acqumonth ? new Date(this.detailObj.acqumonth).Format('yyyy-MM-dd') : '',
                    stid: this.detailObj.stid,
                    stAcquDate: new Date(tableList[outIndex].acqudate).Format('yyyy-MM-dd'),
                    id: tableList[outIndex].id,
                    deviceId: tableList[outIndex].deviceId,
                    sharpKwh: one.sharp,
                    peakKwh: one.peak,
                    flatKwh: one.flat,
                    valleyKwh: one.valley,
                    sharpSendKwh: two.sharp,
                    peakSendKwh: two.peak,
                    flatSendKwh: two.flat,
                    valleySendKwh: two.valley,
                    sharpConsKwhDisp: three.sharp,
                    peakConsKwhDisp: three.peak,
                    flatConsKwhDisp: three.flat,
                    valleyConsKwhDisp: three.valley,
                    sharpConsKwh: four.sharp,
                    peakConsKwh: four.peak,
                    flatConsKwh: four.flat,
                    valleyConsKwh: four.valley,
                    consKwh: Number(four.sharp) + Number(four.peak) + Number(four.flat) + Number(four.valley),
                    sendKwh: Number(two.sharp) + Number(two.peak) + Number(two.flat) + Number(two.valley),
                    imgs: one.imgs
                }
            } else {
                params = {
                    date: this.detailObj.acqumonth ? new Date(this.detailObj.acqumonth).Format('yyyy-MM-dd') : '',
                    stid: this.detailObj.stid,
                    stAcquDate: new Date(tableList[outIndex].acqudate).Format('yyyy-MM-dd'),
                    id: tableList[outIndex].id,
                    deviceId: tableList[outIndex].deviceId,
                    sharpKwh: one.sharp,
                    peakKwh: one.peak,
                    flatKwh: one.flat,
                    valleyKwh: one.valley,
                    sharpSendKwh: two.sharp,
                    peakSendKwh: two.peak,
                    flatSendKwh: two.flat,
                    valleySendKwh: two.valley,
                    sendKwh: Number(two.sharp) + Number(two.peak) + Number(two.flat) + Number(two.valley),
                    imgs: one.imgs
                }
            }

            if (!tableList[outIndex].id) delete params.id
            this.custDeviceMeterElecSaveCustDeviceMeterElec.getData(params).then(res => {
                if (res.code !== 200) return this.$message({message: res.msg, type: 'error'})
                this.$message({message: res.msg, type: 'success'})
            })
        },
        // 获取附件
        getFileList () {
            this.custDeviceMeterElecGetCustDeviceMeterElecList.res.data.List.forEach((v, i) => {
                v.tableList.forEach((vv, ii) => {
                    vv.files = null
                    vv.imgs && this.minioFiles.getData({
                        ids: vv.imgs
                    }).then(res => {
                        vv.files = res.data.urls[0]
                        this.$forceUpdate()
                    })
                })
            })
        },
        // 上传附件
        uploadAppendix (innerIndex, outIndex) {
            let fileObj = ''
            this.$refs['uploadFile' + outIndex].forEach(v => {
                if (v.files.length) fileObj = v
            })
            this.minioUploader.getData({
                file: fileObj.files[0],
                dir: 'settlement-power-task'
            }).then(res => {
                this.$refs['uploadFile' + outIndex][0].value = null
                if (res.code === 200) {
                    let item = this.custDeviceMeterElecGetCustDeviceMeterElecList.res.data.List[outIndex]['tableList'][innerIndex]
                    item.imgs = res.data.id
                    this.$forceUpdate()
                    this.minioFiles.getData({
                        ids: res.data.id
                    }).then(res => {
                        item.files = res.data.urls[0]
                        this.$forceUpdate()
                    })
                }
            })
        },
        // 删除附件
        deleteFile (id, index) {
            // this.minioFileInfos.res.data.splice(index, 1)
            // this.fileIds.splice(this.fileIds.indexOf(id), 1)
        },
        // 下载附件
        cellClick (row, column, cell, event) {
            if (column.label === '附件') {
                // download({
                //     url: api＿minioDownload + '?' + 'id=' + row.imgs
                // })
            }
        }
    },
    beforeDestroy () {
        this.$bus.off('openCheckWatch', this.openCheckWatch)
    }
}
</script>

<style lang="scss">
.check-watch {
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
.check-watch {
    padding: 0 20px;
    .Tips {
        color: #EB6868;
        font-size: 15px;
    }
    .schedule {
        padding-bottom: 10px;
        &:last-child {
            padding-bottom: 0;
        }
    }
    .title {
        color: #585858;
        font-size: 15px;
        margin-bottom: 15px;
        padding-top: 6px;
        span {
            padding-right: 50px;
        }
    }
    .el-table {
        // .imgFile {
        //     transition: all 0.5s;
        // }
        // .imgFile:hover {
        //     position: absolute;
        //     transform: scale(1.4);
        // }
        .upload {
            cursor: pointer;
            position: relative;
            .iconfont {
                color: #4CCA85;
                margin-right: 5px;
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
        .add {
            cursor: pointer;
            .iconfont {
                color: #EB6868;
            }
        }
        .edit {
            cursor: pointer;
            .iconfont {
                color: #349EFF;
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
