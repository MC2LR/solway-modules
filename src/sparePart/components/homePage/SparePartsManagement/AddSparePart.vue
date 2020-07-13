<template>
    <el-dialog
        class="add-spare-part"
        title="添加备件"
        :visible.sync="show"
        width="1050px"
        @close="$refs[opFittingsDictUpdate.formRef].resetFields();$emit('close');"
        center>
        <el-form
            :ref="opFittingsDictUpdate.formRef"
            :inline="true"
            label-width="110px"
            :model="opFittingsDictUpdate.formData">

            <el-form-item
                prop="categoryId"
                label="分类"
                :rules="{ required: true, message: '分类不能为空'}">
                <el-select
                    v-model="opFittingsDictUpdate.formData.categoryId"
                    placeholder="请选择分类">
                    <el-option v-for="item in opFittingsCategorySelectByCondition.res.body" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item
                prop="ctg1"
                label="大类"
                :rules="{ required: true, message: '大类不能为空'}">
                <el-autocomplete
                    class="inline-input"
                    v-model="opFittingsDictUpdate.formData.ctg1"
                    :fetch-suggestions="(str, cb) => cb(opFittingsDictSelectCtg1.res.body.filter(v => v.includes(str)).map(v => ({value: v})))"
                    placeholder="请输入大类"
                    ></el-autocomplete>
            </el-form-item>

            <el-form-item
                prop="ctg2"
                label="小类">
                <el-autocomplete
                    class="inline-input"
                    v-model="opFittingsDictUpdate.formData.ctg2"
                    :fetch-suggestions="(str, cb) => cb(opFittingsDictSelectCtg2.res.body.filter(v => v.includes(str)).map(v => ({value: v})))"
                    placeholder="请输入小类"
                    ></el-autocomplete>
            </el-form-item>

            <el-form-item
                prop="code"
                label="备件类型编号"
                :rules="{ required: true, message: '备件编号不能为空', trigger: 'blur'}">
                <el-input v-model="opFittingsDictUpdate.formData.code" placeholder="备件编号"></el-input>
            </el-form-item>

            <el-form-item
                prop="name"
                label="备件名称"
                :rules="{ required: true, message: '备件名称不能为空', trigger: 'blur'}">
                <el-input v-model="opFittingsDictUpdate.formData.name" placeholder="备件名称"></el-input>
            </el-form-item>

            <el-form-item
                prop="pt"
                label="录入备件编号">
                <el-radio v-model="opFittingsDictUpdate.formData.pt" :label="0">否</el-radio>
                <el-radio v-model="opFittingsDictUpdate.formData.pt" :label="1">是</el-radio>
            </el-form-item>

            <el-form-item
                prop="manuf"
                label="厂商">
                <el-autocomplete
                    class="inline-input"
                    v-model="opFittingsDictUpdate.formData.manuf"
                    :fetch-suggestions="(str, cb) => cb(opFittingsSelectManuf.res.body.filter(v => v.includes(str)).map(v => ({value: v})))"
                    placeholder="厂商"
                    ></el-autocomplete>
            </el-form-item>

            <el-form-item
                prop="ft"
                label="型号及规格">
                <el-input v-model="opFittingsDictUpdate.formData.ft" placeholder="型号及规格"></el-input>
            </el-form-item>

            <el-form-item
                prop="fu"
                label="单位">
                <el-input v-model="opFittingsDictUpdate.formData.fu" placeholder="单位"></el-input>
            </el-form-item>

            <el-form-item
                prop="numMin"
                label="下限报警数量">
                <el-input-number
                    v-model="opFittingsDictUpdate.formData.numMin"
                    controls-position="right"
                    :min="0">
                </el-input-number>
            </el-form-item>

            <el-form-item label="备注" style="width: 66%;">
                <el-input type="textarea" v-model="opFittingsDictUpdate.formData.remark" style="width:523px;"></el-input>
            </el-form-item>

            <el-form-item
                prop="attachments"
                style="width: 100%;"
                label="附件">
                <el-upload
                    ref="upload"
                    :action="fileUploadUploadFile.url"
                    :headers="{'X-Requested-With': 'XMLHttpRequest'}"
                    :data="{targetType: 'FITTING_FILE'}"
                    :on-success="uploadSuccess"
                    :on-preview="downloadFile"
                    :on-remove="removeFile"
                    :file-list="fileUploadUploadFile.fileList"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="b1">选取文件</el-button>
                </el-upload>
            </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button type="b2" @click="show = false" >取消</el-button>
            <el-button
                type="b1"
                :loading="opFittingsDictUpdate.loading"
                @click="$refs[opFittingsDictUpdate.formRef].validate(valid => valid && submit())"
                >确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import {
    api＿opFittingsDictUpdate,
    api＿opFittingsDictSelectCtg1,
    api＿opFittingsDictSelectCtg2,
    api＿fileUploadSelectFiles,
    api＿opFittingsSelectManuf,
    api＿opFittingsCategorySelectByCondition,
    api＿fileUploadUploadFile } from '@sparePart/request/api'
import {
    Form,
    FormItem,
    Input,
    Button,
    Dialog,
    Autocomplete,
    Upload,
    Select,
    Option,
    Radio,
    Message,
    InputNumber} from 'element-ui'
import {download} from '@comm/request/http'

export default {
    name: 'AddSparePart',
    props: {
        id: {
            type: Number
        },
        name: {
            type: String,
            default: ''
        },
        remark: {
            type: String,
            default: ''
        },
        categoryId: {
            type: Number
        },
        ctg1: {
            type: String,
            default: ''
        },
        ctg2: {
            type: String,
            default: ''
        },
        code: {
            type: String,
            default: ''
        },
        manuf: {
            type: String,
            default: ''
        },
        ft: {
            type: String,
            default: ''
        },
        fu: {
            type: String,
            default: ''
        },
        numMin: {
            type: Number,
            default: 0
        },
        attachments: {
            type: String,
            default: ''
        },
        pt: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            opFittingsDictUpdate: api＿opFittingsDictUpdate({
                later: true,
                sameTimeOnce: true,
                formData: {
                    name: this.name,
                    remark: this.remark,
                    id: this.id,
                    attachments: this.attachments,
                    numMin: this.numMin,
                    fu: this.fu,
                    ft: this.ft,
                    manuf: this.manuf,
                    code: this.code,
                    ctg2: this.ctg2,
                    ctg1: this.ctg1,
                    categoryId: this.categoryId,
                    pt: this.pt
                },
                formRef: 'opFittingsDictUpdateForm'
            }),
            opFittingsCategorySelectByCondition: api＿opFittingsCategorySelectByCondition({
                res: {
                    body: []
                }
            }),
            opFittingsDictSelectCtg1: api＿opFittingsDictSelectCtg1({
                res: {
                    body: []
                }
            }),
            opFittingsDictSelectCtg2: api＿opFittingsDictSelectCtg2({
                cacheParams: true,
                res: {
                    body: []
                }
            }),
            opFittingsSelectManuf: api＿opFittingsSelectManuf({
                res: {
                    body: []
                }
            }),
            fileUploadSelectFiles: api＿fileUploadSelectFiles({
                later: !this.attachments,
                data: {
                    targetType: 'FITTING_FILE',
                    ids: this.attachments
                },
                res: {
                    body: []
                }
            }),
            fileUploadUploadFile: api＿fileUploadUploadFile({
                later: true,
                fileList: []
            }),
            show: true
        }
    },
    components: {
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElButton: Button,
        ElAutocomplete: Autocomplete,
        ElDialog: Dialog,
        ElUpload: Upload,
        ElSelect: Select,
        ElOption: Option,
        ElRadio: Radio,
        ElInputNumber: InputNumber
    },
    created () {
        const _this = this
        this.fileUploadSelectFiles.subscribe(res => {
            _this.fileUploadUploadFile.fileList = res.body.map(v => ({name: v.originalFileName, url: v.filePath, id: v.id}))
        })
        this.opFittingsDictUpdate.subscribe(res => {
            Message({
                message: res.msg,
                type: res.code === 0 ? 'success' : 'error'
            })
            if (res.code === 0) _this.$emit('close')
        })
    },
    methods: {
        submit () {
            if (this.$refs.upload.uploadFiles.length !== this.attachmentsList().length) return this.$refs.upload.submit()
            this.opFittingsDictUpdate.getData(this.opFittingsDictUpdate.formData)
        },
        uploadSuccess (data, file, fileList) {
            this.opFittingsDictUpdate.formData.attachments += ((this.opFittingsDictUpdate.formData.attachments ? ',' : '') + data.body.id)
            if (fileList.length !== this.attachmentsList().length) return
            this.opFittingsDictUpdate.getData(this.opFittingsDictUpdate.formData)
        },
        removeFile (file, fileList) {
            if (file.status !== 'success') return
            this.opFittingsDictUpdate.formData.attachments = this.attachmentsList().filter(v => +v !== file.id).join(',')
        },
        downloadFile (file) {
            if (file.status !== 'success') return
            download({url: file.url, filename: file.name})
        },
        attachmentsList () {
            return this.opFittingsDictUpdate.formData.attachments.split(',').filter(v => v)
        }
    }
}
</script>

<style lang="scss">
.add-spare-part {
    .el-form-item__label {
        @include c(color, $text_d1_c3);
    }
    .el-form-item__content {
        width: 200px;
    }
}
</style>
