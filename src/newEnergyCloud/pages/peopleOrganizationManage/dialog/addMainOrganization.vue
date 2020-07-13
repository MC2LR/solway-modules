<template>
    <div class="new-main-organization">
        <el-form label-width="100px" :model="formData" :rules="rules" ref="formData">
            <el-form-item label="机构名称" prop="name">
                <el-input v-model="formData.name" class="input-edit"></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input v-model="formData.weight" class="input-edit"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="formData.memo" class="input-edit"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {api＿organizationUpdate} from '@/request/api'
import {Message} from 'element-ui'
export default {
    props: {
        visible: {
            type: Boolean
        }
    },
    data () {
        return {
            formData: {},
            rules: {
                name: [
                    {required: true, message: '请输入名称', trigger: 'blur'}
                ]
            },
            organizationUpdate: api＿organizationUpdate({
                later: true,
                sameTimeOnce: true
            })
        }
    },
    mounted () {
        this.$bus.on('saveMainOrganization', this.save)
        this.$bus.on('openAddMainOrganization', this.openModal)
    },
    methods: {
        openModal () {
            this.resetForm()
        },
        save () {
            this.$refs.formData.validate((valid, a) => { // 校验
                if (!valid) return false
                let formData = this.formData
                formData['orgType'] = 1
                this.organizationUpdate.getData(formData).then(res => {
                    if (res.code !== 200) return Message.error(res.msg || '保存失败')
                    this.$emit('updateSuccess')
                    Message.success(res.msg || '保存成功')
                })
            })
        },
        resetForm () {
            this.formData = {}
        }
    }
}
</script>

<style lang="scss" scoped>
.new-main-organization{
    .input-edit{
        width:350px;
    }
}
</style>
