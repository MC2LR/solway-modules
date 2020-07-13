<template>
    <div class="new-child-organization">
        <el-form label-width="100px" :model="formData" :rules="rules" ref="formData">
            <el-form-item label="上级机构">
                <div>{{detail.name}}</div>
            </el-form-item>
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
        detail: {
            type: Object
        },
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
        this.$bus.on('saveChildOrganization', this.save)
        this.$bus.on('openAddChildOrganization', this.openModal)
    },
    methods: {
        openModal () {
            this.resetForm()
            console.log(this.detail)
        },
        save () {
            this.$refs.formData.validate((valid, a) => { // 校验
                if (!valid) return false
                let formData = this.formData
                formData['parentId'] = this.detail.id
                formData['orgType'] = 2
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
.new-child-organization{
    .input-edit{
        width:350px;
    }
}
</style>
