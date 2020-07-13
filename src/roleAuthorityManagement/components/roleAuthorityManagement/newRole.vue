<template>
    <div class="new-role-modal">
        <el-form label-width="100px" :model="formData" :rules="rules" ref="formData" style="width:80%;margin: 20px auto;">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="formData.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色编码" prop="roleCode">
                <el-input v-model="formData.roleCode"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="remark">
                <el-input v-model="formData.remark"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {api＿updateRole} from '@roleAuthorityManagement/request/api'
import {FormItem, Form, Input, Message} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
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
            formData: {
                appId: null
            },
            rules: {
                roleName: [
                    {required: true, message: '请输入名称', trigger: 'blur'}
                ],
                roleCode: [
                    {required: true, message: '请输入编码', trigger: 'blur'}
                ],
                remark: [
                    {required: true, message: '请输入描述', trigger: 'blur'}
                ]
            },
            updateRole: api＿updateRole({
                later: true,
                sameTimeOnce: true,
                onlyLatest: true
            })
        }
    },
    mounted () {
        this.$bus.on('saveRole', this.save)
        this.$bus.on('openEditRole', this.openModal)
    },
    methods: {
        openModal () {
            this.formData = {
                depid: 0,
                roleId: ''
            }
            if (this.detail) {
                let detail = this.detail
                this.formData = {
                    depid: 0,
                    roleId: detail.roleId,
                    roleName: detail.roleName,
                    roleCode: detail.roleCode,
                    remark: detail.remark
                }
            }
        },
        save () { // 保存
            this.$refs.formData.validate((valid, a) => { // 校验
                if (!valid) return false
                this.formData['roleType'] = '02'
                this.formData['authRoleRights'] = [
                    { 'rightId': 47, 'writeflag': 1 },
                    { 'rightId': 49, 'writeflag': 0 },
                    { 'rightId': 100, 'writeflag': 1 },
                    { 'rightId': 101, 'writeflag': 0 }
                ]
                let formData = {...this.formData}
                this.updateRole.getData({data: JSON.stringify(formData)}).then(res => {
                    if (res.key !== 3 && res.key !== 5) return Message.error(res.msg || res.body || '保存失败')
                    this.$emit('updateSuccess')
                    Message.success(res.msg || res.body || '保存成功')
                })
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('saveRole', this.save)
        this.$bus.off('openEditRole', this.openModal)
    },
    components: {
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input
    }
}
</script>
<style lang="scss" scoped>
.new-role-modal {
    height: calc(100vh - 300px);
    overflow:auto;
    .require{
        color: #F56C6C;
        position:absolute;
    }
}
</style>
