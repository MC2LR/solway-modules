<template>
    <el-form label-width="150px" :model="formData" :rules="rules"  class="edit-module-sale" ref="formData">
        <el-form-item label="公司名称">
            <span>{{mcComName}}</span>
        </el-form-item>
        <el-form-item label="服务协议">
            <el-radio-group v-model="formData.mcssServiceStatus">
                <el-radio label="00">购买</el-radio>
                <el-radio label="01">未购买</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="开始时间" prop="mcssStartDate" v-if="formData.mcssServiceStatus === '00'">
            <el-date-picker
                v-model="formData.mcssStartDate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="mcssEndDate" v-if="formData.mcssServiceStatus === '00'">
            <el-date-picker
                v-model="formData.mcssEndDate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
    </el-form>
</template>

<script>
import {api＿updateCompanyBuyModule, api＿updateCompanyBuyModules} from '@comm/request/api'
import {FormItem, Form, Radio, RadioGroup, Message, DatePicker} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
    props: {
        detail: {},
        detailBatch: {},
        visible: {
            type: Boolean
        },
        versionId: {}
    },
    data () {
        return {
            rules: {
                mcssStartDate: [
                    {required: true, message: '请选择开始时间', trigger: 'blur'}
                ],
                mcssEndDate: [
                    {required: true, message: '请选择结束时间', trigger: 'blur'}
                ]
            },
            formData: {},
            mcComName: null,
            updateCompanyBuyModule: api＿updateCompanyBuyModule({
                later: true,
                sameTimeOnce: true
            }),
            updateCompanyBuyModules: api＿updateCompanyBuyModules({
                later: true,
                sameTimeOnce: true
            })
        }
    },
    mounted () {
        this.$bus.on('saveModuleSale', this.save)
        this.$bus.on('openEditModuleSale', this.openModal)
    },
    methods: {
        clearDateTime () {
            this.formData.mcssStartDate = null
            this.formData.mcssEndDate = null
        },
        openModal () {
            let detail = null
            if (this.detailBatch.length) { // 批量
                detail = this.detailBatch[0]
            } else { // 单个
                detail = this.detail
            }
            this.formData = {
                appId: detail.appId,
                appPid: detail.appPid,
                mcComId: detail.mcComId,
                mcId: detail.mcId,
                mcssId: detail.mcssId,
                mcssServiceStatus: detail.mcssServiceStatus ? detail.mcssServiceStatus : '01',
                mcssStartDate: detail.mcssStartDate ? new Date(detail.mcssStartDate) : new Date(new Date().getTime()),
                mcssEndDate: detail.mcssEndDate ? new Date(detail.mcssEndDate) : new Date(new Date().getTime() + 86400000 * 7)
            }
            this.mcComName = detail.mcComName
        },
        save () { // 保存
            this.$refs.formData.validate((valid, a) => { // 校验
                if (!valid) return false
                let formData = {...this.formData}
                if (formData.mcssServiceStatus === '01') {
                    this.clearDateTime()
                }
                formData['mcssEndDate'] = this.formData.mcssEndDate ? this.formData.mcssEndDate.Format('yyyy-MM-dd') : ''
                formData['mcssStartDate'] = this.formData.mcssStartDate ? this.formData.mcssStartDate.Format('yyyy-MM-dd') : ''
                formData['version'] = this.versionId
                if (this.detailBatch.length) { // 批量保存
                    let formDataBatch = []
                    this.detailBatch.map(v => {
                        formDataBatch.push({
                            ...formData,
                            appId: v.appId,
                            appPid: v.appPid,
                            mcId: v.mcId,
                            mcssId: v.mcssId
                        })
                    })
                    this.updateCompanyBuyModules.getData(formDataBatch).then(res => {
                        if (res.code !== 0) return Message.error(res.msg || res.body || '保存失败')
                        this.$emit('updateSuccess')
                        Message.success(res.msg || res.body || '保存成功')
                    })
                } else { // 保存
                    this.updateCompanyBuyModule.getData(formData).then(res => {
                        if (res.code !== 0) return Message.error(res.msg || res.body || '保存失败')
                        this.$emit('updateSuccess')
                        Message.success(res.msg || res.body || '保存成功')
                    })
                }
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('saveModule', this.saveModule)
        this.$bus.off('openEditModule', this.openModal)
    },
    components: {
        ElForm: Form,
        ElFormItem: FormItem,
        ElRadio: Radio,
        ElRadioGroup: RadioGroup,
        ElDatePicker: DatePicker
    }
}
</script>

<style lang="scss" scoped>
.edit-module-sale {
    max-height: calc(100vh - 280px);
    overflow:auto;
}
</style>
