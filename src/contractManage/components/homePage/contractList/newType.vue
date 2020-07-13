<template>
    <div class="new-type" @click.stop>
        <el-form :model="newTypeForm" ref="newTypeForm" label-width="100px" class="demo-dynamic">
            <el-form-item>
                <el-button type="text" style="color: #2487E2;" @click="addDomain">
                    <span class="add-con"><i class="iconfont icontag27fuben"></i></span>
                    新增
                </el-button>
            </el-form-item>
            <el-form-item
                v-for="(item, index) in newTypeForm.list"
                :key="item.id"
                :prop="'list.' + index + '.name'"
                :rules="[
                    { required: true, message: '不能为空', trigger: 'blur' }
                ]"
            >
                <el-input v-show="item.edit" v-model="item.name"></el-input>
                <span v-show="!item.edit" style="display: inline-block;width: 147px;padding-left: 15px;color: #606266;">{{item.name}}</span>
                <i class="iconfont iconshanchu1 delete" style="font-size: 15px" title="删除" v-show="!item.edit" @click.prevent="removeDomain(item)"></i>
                <i class="iconfont iconbianji-copy add" style="font-size: 15px;vertical-align: baseline;" title="编辑" v-show="!item.edit" @click="editBut(item)"></i>
                <i class="iconfont iconguanbi2 delete" title="删除" v-show="item.edit" @click.prevent="removeDomain(item)"></i>
                <i class="iconfont iconxuanzhong add" title="确定" v-show="item.edit" @click.prevent="submitForm(item, index)"></i>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {api＿getBaseContract, api＿saveStandardPoint, api＿deleteBaseContract} from '@contractManage/request/api'
import {Select, Option, Form, FormItem, Input, Button, MessageBox, Message} from 'element-ui'

export default {
    components: {
        ElSelect: Select,
        ElOption: Option,
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElButton: Button
    },
    props: {
        newType: {
            type: Object
        }
    },
    data () {
        return {
            getBaseContract: api＿getBaseContract({
                later: true
            }),
            saveStandardPoint: api＿saveStandardPoint({
                later: true
            }),
            deleteBaseContract: api＿deleteBaseContract({
                later: true
            }),
            newTypeForm: {
                list: [
                    {
                        name: ''
                    }
                ]
            },
            typeList: [],
            errorMsg0: null
        }
    },
    mounted () {
        this.$bus.on('openNewType', this.openNewType)
    },
    methods: {
        // 打开 弹框
        openNewType (data) {
            this.newTypeForm.list = data.list.filter(v => v.id)
            this.typeList = data.list.map(v => v.name)

            this.$forceUpdate()
        },
        // 编辑按钮
        editBut (item) {
            var editFlag = this.newTypeForm.list.some(v => v.edit)
            if (editFlag) return Message.error('每次仅限编辑一条')
            item.edit = true
            this.$forceUpdate()
        },
        // 提交
        submitForm (item, index) {
            this.$refs['newTypeForm'].validate((valid) => {
                if (!valid) return false
                item.edit = false
                this.$forceUpdate()
                this.saveStandardPoint.getData({
                    id: item.id || null,
                    name: item.name,
                    status: this.newType.status
                }).then(res => {
                    if (res.code === 0) {
                        this.getBaseContract.getData({status: this.newType.status}).then(res => {
                            this.newTypeForm.list = res.body
                            if (this.newType.status === 0) {
                                this.$bus.emit('updateSort', {data: this.newTypeForm.list})
                            } else if (this.newType.status === 1) {
                                this.$bus.emit('updatePtSort', {data: this.newTypeForm.list})
                            } else {
                                this.$bus.emit('updateSmallSort', {data: this.newTypeForm.list})
                            }
                            this.$forceUpdate()
                        })
                        Message.success(res.msg)
                    } else {
                        if (res.code === 1) {
                            this.errorMsg = null
                            this.$nextTick(() => {
                                this.errorMsg = res.msg
                            })
                            if (!item.id) this.newTypeForm.list.shift()
                        }
                        Message.error(res.msg)
                    }
                })
            })
        },
        // 删除
        async removeDomain (item) {
            await this.$timeout(100)
            var index = this.newTypeForm.list.indexOf(item)
            if (index !== -1) {
                MessageBox.confirm('确认删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        if (!item.id) {
                            this.newTypeForm.list.splice(index, 1)
                        } else {
                            this.deleteBaseContract.getData({
                                id: item.id
                                }).then(res => {
                                    if (res.code === 0) {
                                        this.newTypeForm.list.splice(index, 1)
                                        this.getBaseContract.getData({status: this.newType.status}).then(res => {
                                            this.newTypeForm.list = res.body
                                        })
                                        if (this.newType.status === 0) {
                                            this.$bus.emit('updateSort', {data: this.newTypeForm.list})
                                        } else if (this.newType.status === 1) {
                                            this.$bus.emit('updatePtSort', {data: this.newTypeForm.list})
                                        } else {
                                            this.$bus.emit('updateSmallSort', {data: this.newTypeForm.list})
                                        }
                                        Message.success(res.msg)
                                    } else {
                                        Message.error(res.msg)
                                    }
                            })
                        }
                        this.$emit('newTypeShow')
                    }).catch(() => {
                        this.$emit('newTypeShow')
                })
            }
        },
        // 新增
        addDomain () {
            this.newTypeForm.list.unshift({
                name: '',
                edit: true
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('openNewType', this.openNewType)
    }
}
</script>

<style lang="scss">
.new-type {
    .el-form-item__content {
        margin-left: 10px !important;
        .el-input {
            width: 60%;
            margin-right: 10px;
        }
    }
}
.el-message-box__wrapper {
    z-index: 11112 !important;
}
</style>

<style lang="scss" scoped>
.new-type {
    width: 260px;
    height: 350px;
    overflow: auto;
    position: absolute;
    top: 0;
    z-index: 11111;
    left: 225px;
    background: #fff;
    padding: 10px;
    box-shadow: 0px 0px 10px 0px rgba(36,135,226,0.44);
    .delete {
        font-size: 12px;
        cursor: pointer;
        @include c(color, $text_c3);
    }
    .add {
        font-size: 24px;
        cursor: pointer;
        @include c(color, $text_c1);
        vertical-align: sub;
        margin-left: 15px;
    }
}
</style>
