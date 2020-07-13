<template>
    <el-dialog
        class="add-warehouse"
        title="添加库房"
        :visible.sync="show"
        width="500px"
        @close="$emit('close')"
        center>
        <el-form
            :ref="opFittingsRoomUpdate.formRef"
            :inline="true"
            label-width="80px"
            :model="opFittingsRoomUpdate.formData">

            <el-form-item
                prop="name"
                label="库房名称"
                :rules="{ required: true, message: '库房名称不能为空', trigger: 'blur'}">
                <el-input v-model="opFittingsRoomUpdate.formData.name" placeholder="库房名称"></el-input>
            </el-form-item>

            <el-form-item label="备注">
                <el-input type="textarea" v-model="opFittingsRoomUpdate.formData.remark"></el-input>
            </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button type="b2" @click="show = false" >取消</el-button>
            <el-button
                type="b1"
                :loading="opFittingsRoomUpdate.loading"
                @click="$refs[opFittingsRoomUpdate.formRef].validate(valid => valid && opFittingsRoomUpdate.getData(opFittingsRoomUpdate.formData))"
                >确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import {api＿opFittingsRoomUpdate} from '@sparePart/request/api'
import {Form, FormItem, Input, Button, Dialog} from 'element-ui'

export default {
    name: 'AddWarehouse',
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
        }
    },
    data () {
        return {
            opFittingsRoomUpdate: api＿opFittingsRoomUpdate({
                later: true,
                sameTimeOnce: true,
                formData: { name: this.name, remark: this.remark, id: this.id },
                formRef: 'opFittingsRoomUpdateForm'
            }),
            show: true
        }
    },
    components: {
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElButton: Button,
        ElDialog: Dialog
    },
    created () {
        const _this = this
        this.opFittingsRoomUpdate.subscribe(res => {
            _this.$emit('close')
            _this.$refs[_this.opFittingsRoomUpdate.formRef].resetFields()
        })
    },
    methods: {
    }
}
</script>
