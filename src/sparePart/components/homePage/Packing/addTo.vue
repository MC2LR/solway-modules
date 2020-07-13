<template>
    <div class="put-in-storage-add">
        <div class="content">
            <el-page-header v-if="!$route.query.menu" @back="$router.go(-1)" content="备件入库"></el-page-header>

             <el-form ref="form" :inline="true" :model="formData" label-width="80px">

                <el-form-item
                    prop="sn"
                    :rules="{ required: true, message: '入库单号不能为空'}"
                    label="入库单号">
                    <el-input v-model="formData.sn" placeholder="请输入入库单号"></el-input>
                </el-form-item>

                <el-form-item
                    prop="sn"
                    :rules="{ required: true, message: '库房不能为空'}"
                    label="库房">
                    <el-select
                        v-model="formData.stationId"
                        filterable
                        clearable
                        placeholder="请选择库房">
                        <el-option v-for="item in opFittingsRoomSelectByCondition.res.body" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input v-model="formData.summary" type="textarea" placeholder="请填写备注"></el-input>
                </el-form-item>
            </el-form>

            <div class="sparePartEditList">
                <el-form :inline="true" v-for="(item, index) in formData.goods" :key="index" :ref="'spareParts' + index" :model="item" label-width="80px" class="sparePart">
                    <el-form-item label="备件分类">
                        <el-cascader :disabled="!item.edit" placeholder="备件分类"
                            @change="v => {
                                opFittingsDictSelectCurrData.getData({categoryId: v[0], ctg1: v[1], ctg2: v[2]}).then(res => {
                                    item.spareParts = res.body
                                    if ((item.fdId && !item.spareParts.some(v => v.id === item.fdId)) || !item.fdId) {
                                        item.fdPt_fdId = ''
                                    }
                                })
                            }"
                            :props="{ lazy: true, lazyLoad: lazyLoad }"
                            :clearable="true"
                            :options="opFittingsCategorySelectByCondition.res.body">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item>
                        <el-select
                            :disabled="!item.edit"
                            v-model="item.fdPt_fdId"
                            filterable
                            clearable
                            @change="(v) => fdChange(v, item)"
                            placeholder="分类编号">
                            <el-option v-for="xitem in item.spareParts" :key="xitem.id" :label="xitem.code" :value="xitem.pt + '_' + xitem.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        prop="fdId"
                        :rules="{ required: true, message: '请选择备件'}">
                        <el-select
                            v-model="item.fdPt_fdId"
                            :disabled="!item.edit"
                            filterable
                            clearable
                            @change="(v) => fdChange(v, item)"
                            placeholder="名称">
                            <el-option v-for="xitem in item.spareParts" :key="xitem.id" :label="xitem.name" :value="xitem.pt + '_' + xitem.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select
                            v-model="item.fdPt_fdId"
                            :disabled="!item.edit"
                            filterable
                            clearable
                            @change="(v) => fdChange(v, item)"
                            placeholder="型号及规格">
                            <el-option v-for="xitem in item.spareParts" :key="xitem.id" :label="xitem.ft" :value="xitem.pt + '_' + xitem.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        prop="fsn"
                        :rules="{ required: true, message: '编号不能为空'}"
                        v-if="item.fdPt === 1">
                        <el-input :disabled="!item.edit" v-model.trim="item.fsn" placeholder="备件编号"></el-input>
                    </el-form-item>
                    <el-form-item
                        prop="num"
                        :rules="{ required: true, message: '数量不能为空'}"
                        v-if="item.fdPt === 0">
                        <el-input :disabled="!item.edit" v-model.number="item.num" type="number" placeholder="数量"></el-input>
                    </el-form-item>
                    <el-form-item
                        prop="position"
                        :rules="{ required: true, message: '库位不能为空'}">
                        <el-input :disabled="!item.edit" placeholder="库位" v-model.trim="item.position"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="() => {formData.goods[1] && formData.goods.splice(index, 1)}" class="delete" type="text">
                            <i title="删除" class="iconfont iconshanchu1"></i>
                        </el-button>
                        <el-button @click="item.edit = true" class="edit" v-if="!item.edit" type="text">
                            <i title="编辑" class="iconfont iconbianji-copy"></i>
                        </el-button>
                        <el-button @click="$refs['spareParts' + index][0].validate(ok => itemValidate(ok, item, index))" class="confirm" v-if="item.edit" type="text">
                            <i title="确定" class="iconfont iconqueding"></i>
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>

            <el-button v-if="formData.goods[0].spareParts" @click="formData.goods.push({...formData.goods[formData.goods.length - 1], edit: true, fsn: '', num: void 0, position: ''})" type="b2" style="margin-left: 80px;">添加备件</el-button>
            <el-button @click="$refs['form'].validate(ok => allValidate(ok, formData))" type="b1" style="margin-left: 20px;">提交</el-button>
        </div>
    </div>
</template>

<script>
import {
    api＿opFittingsRoomSelectByCondition,
    api＿opFittingsCategorySelectByCondition,
    api＿opFittingsDictSelectCtg1,
    api＿opFittingsDictSelectCtg2,
    api＿opFittingsDictSelectCurrData,
    api＿opFittingsDictRoomValidFsn,
    api＿opWorkFittingsInCreate
    } from '@sparePart/request/api'
import {Form, FormItem, Input, Button, Cascader, PageHeader, Select, Option, Message} from 'element-ui'

export default {
    data () {
        return {
            opFittingsRoomSelectByCondition: api＿opFittingsRoomSelectByCondition({
                onlyLatest: true,
                cacheParams: true,
                res: { body: [] }
            }),
            opFittingsCategorySelectByCondition: api＿opFittingsCategorySelectByCondition({
                res: {
                    body: []
                },
                mountedRes (res) {
                    res.body = res.body.map(v => ({label: v.name, value: v.id}))
                    res.body.unshift({label: '全部', value: ''})
                    return res
                }
            }),
            opFittingsDictSelectCtg1: api＿opFittingsDictSelectCtg1({
                later: true
            }),
            opFittingsDictSelectCtg2: api＿opFittingsDictSelectCtg2({
                later: true
            }),
            opFittingsDictSelectCurrData: api＿opFittingsDictSelectCurrData({
                res: {
                    body: []
                },
                mountedRes (res, oldRes, thisApi) {
                    if (!thisApi.firstData) thisApi.firstData = {...res}
                    return res
                }
            }),
            opFittingsDictRoomValidFsn: api＿opFittingsDictRoomValidFsn({later: true}),
            opWorkFittingsInCreate: api＿opWorkFittingsInCreate({
                later: true,
                sameTimeOnce: true,
                beforeSend (params) {
                    const goods = params.goods
                    return {
                        ...params,
                        goods: goods.map(v => ({
                            fdId: v.fdId,
                            fdPt: v.fdPt,
                            fsn: v.fsn,
                            num: v.num,
                            position: v.position
                        }))
                    }
                }
            }),
            formData: {
                sn: '',
                stationId: '',
                summary: '',
                goods: [ { fdId: void 0, fdPt: 0, fsn: '', num: void 0, position: '', edit: true, spareParts: [] } ]
            }
        }
    },
    created () {
        const _this = this
        this.opFittingsDictSelectCurrData.subscribe(res => {
            if (!_this.formData.goods[0].spareParts[0]) {
                _this.formData.goods[0].spareParts = [...res.body]
            }
        })
        this.opWorkFittingsInCreate.subscribe(res => {
            if (res.code !== 0) return Message.error(res.msg)
            Message.success(res.msg)
            if (_this.$route.query.menu) {
                _this.formData.sn = ''
                _this.formData.stationId = ''
                _this.formData.summary = ''
                _this.formData.goods = [_this.formData.goods[0]]
                _this.formData.goods[0].fsn = ''
                _this.formData.goods[0].position = ''
                _this.formData.goods[0].edit = true
                _this.$refs['form'].resetFields()
                _this.$refs['spareParts0'][0].resetFields()
            } else {
                _this.$router.go(-1)
            }
        })
    },
    methods: {
        lazyLoad (node, resolve) {
            if (node.level === 1) {
                this.opFittingsDictSelectCtg1.getData({categoryId: node.value}).then(res => {
                    resolve([{value: '', label: '全部', leaf: false}, ...res.body.map(v => ({value: v, label: v, leaf: false}))])
                })
            } else if (node.level === 2) {
                this.opFittingsDictSelectCtg2.getData({categoryId: node.path[0], ctg1: node.value}).then(res => {
                    resolve([{value: '', label: '全部', leaf: true}, ...res.body.map(v => ({value: v, label: v, leaf: true}))])
                })
            }
        },
        itemValidate (ok, item, index) {
            if (!ok) return
            if (!item.fdPt) return (item.edit = false)
            const goods = this.formData.goods
            for (let i = 0; i < goods.length; i++) {
                const v = goods[i]
                if (v.fsn && v.fsn === item.fsn && i !== index && item.fdId === v.fdId) {
                    Message.error('备件编号已存在, 与第' + (i + 1) + '行备件编号重复，请检查')
                    return
                }
            }
            this.opFittingsDictRoomValidFsn.getData({fsn: item.fsn}).then(res => {
                if (!res.body.flag) return Message.error('备件编号已存在,请检查！')
                item.edit = false
            })
        },
        allValidate (ok, formData) {
            if (!ok) return
            if (formData.goods.some(v => v.edit)) return Message.info('请确认结束编辑状态！')
            this.opWorkFittingsInCreate.getData(formData)
        },
        fdChange (v, item) {
            if (v) {
                item.fdPt = +v.split('_')[0]
                item.fdId = +v.split('_')[1]
                item.num = item.fdPt ? 1 : void 0
            } else {
                item.fdPt = 0
                item.fdId = ''
                item.num = void 0
            }
        }
    },
    components: {
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElButton: Button,
        ElCascader: Cascader,
        ElSelect: Select,
        ElOption: Option,
        ElPageHeader: PageHeader
    }
}
</script>

<style lang="scss">

.put-in-storage-add {
    .el-page-header__content {
        @include c(color, $text_c0);
    }

    .el-form-item__label {
        @include c(color, $text_c2);
    }

    .el-form-item {
        .el-input__inner, .el-textarea__inner {
            @include c(background-color, $bg_input_c1);
            @include c(border-color, $line_c1);
            @include c(color, $text_c2);

            &:focus, &:hover {
                @include c(border-color, $line_c1);
            }

            &.el-textarea__inner {
                width: 300px;
                height: 40px;
            }
        }
    }

    .el-form.sparePart {
        .el-cascader {
            .el-input {
                width: 200px;
            }
        }

        .el-input {
            width: 127px;

            [type="number"] {
                padding-right: 0;
            }
        }
    }
}
</style>

<style lang="scss" scoped>
@import '@comm/assets/themes/scrollbar/s1.scss';
.put-in-storage-add {
    @include c(color, $text_c0);
    margin-top: 15px;
    padding: 0 15px;
    height: calc(100vh - 100px);

    .content {
        padding: 15px;
        height: 100%;
        overflow: auto;
        @include c(background-color, $bg_c0);

        .sparePartEditList {
            max-height: calc(100vh - 275px);
            overflow: auto;
        }

        .el-page-header {
            margin-bottom: 20px;
        }

        .el-button {
            &.delete {
                @include c(color, $text_c3);
            }
            &.edit {
                @include c(color, $text_c1);
            }
            &.confirm {
                @include c(color, $text_c1);
            }
        }
    }
}
</style>
