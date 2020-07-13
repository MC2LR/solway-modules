<template>
    <div class="new-button-modal">
        <div>
            <el-table
                :data="buttonListData"
                style="width: 80%;margin: 0 auto;border: 1px solid #c7c7c7;background:#a9a9a9;">
                <el-table-column
                    prop="name"
                    label="名称">
                </el-table-column>
                <el-table-column
                    prop="code"
                    label="编码">
                </el-table-column>
                <el-table-column
                    prop="weight"
                    label="编号">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="操作">
                    <template slot-scope="scope">
                        <span
                            title="编辑"
                            class="iconfont iconbianji-copy edit"
                            @click.stop="editRow(scope.row)">
                        </span>
                        <span
                            title="删除"
                            @click.stop="deleteRow(scope.row.id)"
                            class="iconfont iconshanchu1 delete">
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-form label-width="70px" :model="formData" :rules="rules" ref="formData" style="width:80%;margin: 20px auto;">
            <el-form-item label="名称" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="编码" prop="code">
                <el-input v-model="formData.code"></el-input>
            </el-form-item>
            <el-form-item label="编号" prop="weight">
                <el-input v-model="formData.weight"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {api＿buttonUpdate, api＿buttonDelete} from '@/request/api'
import {Table, TableColumn, FormItem, Form, Input, Message, MessageBox} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
    props: {
        detail: {
            type: Object
        },
        visible: {
            type: Boolean
        },
        versionId: {}
    },
    data () {
        return {
            formData: {
                appId: null
            },
            buttonListData: [],
            rules: {
                name: [
                    {required: true, message: '请输入名称', trigger: 'blur'}
                ],
                code: [
                    {required: true, message: '请输入编码', trigger: 'blur'}
                ],
                weight: [
                    {required: true, message: '请输入编号', trigger: 'blur'}
                ]
            },
            saveLoading: false,
            buttonUpdate: api＿buttonUpdate({
                later: true,
                sameTimeOnce: true
            }),
            buttonDelete: api＿buttonDelete({
                later: true,
                sameTimeOnce: true
            })
        }
    },
    mounted () {
        this.$bus.on('saveButton', this.saveButton)
        this.$bus.on('openEditButton', this.openModal)
    },
    methods: {
        openModal () {
            this.resetForm()
            this.buttonListData = this.detail.btns
        },
        saveButton () { // 保存
            if (this.saveLoading) return false
            this.$refs.formData.validate((valid, a) => { // 校验
                if (!valid) return false
                this.formData['appId'] = this.detail.id
                this.formData['version'] = this.versionId
                this.formData['addBtnDisplay'] = true
                let formData = {...this.formData}
                this.saveLoading = true
                this.buttonUpdate.getData(formData).then(res => {
                    setTimeout(() => {
                        this.saveLoading = false
                    }, 3000)
                    if (res.code !== 0) return Message.error(res.msg || res.body || '保存失败')
                    this.$emit('updateSuccess')
                    Message.success(res.msg || res.body || '保存成功')
                })
            })
        },
        resetForm () { // 重置form
            // this.$refs.formData.resetFields()
            this.formData = {
                appId: null
            }
        },
        editRow (item) {
            this.formData = {...item}
        },
        deleteRow (id) {
            MessageBox.confirm('确定删除此按钮权限配置？', '提示', {
                type: 'warning'
            }).then(() => {
                this.buttonDelete.getData({id}).then(res => {
                    if (res.code !== 0) return Message.error(res.msg || res.body || '删除失败')
                    Message.success(res.msg || res.body || '删除成功')
                    this.$emit('updateSuccess')
                })
            }).catch(() => {})
        }
    },
    beforeDestroy () {
        this.$bus.off('saveButton', this.saveButton)
        this.$bus.off('openEditButton', this.openModal)
    },
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input
    }
}
</script>
<style lang="scss">
.new-button-modal{
    .el-table th, .el-table td {
        padding: 6px 0;
    }
    // .el-form-item {
    //     margin-bottom: 15px;
    // }
}
</style>
<style lang="scss" scoped>
.new-button-modal {
    max-height: calc(100vh - 280px);
    overflow:auto;
    .require{
        color: #F56C6C;
        position:absolute;
    }
}
</style>
