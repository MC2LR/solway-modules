<template>
    <div class="SparePartsManagement">
        <div class="content">
            <div class="clearfix">
                <el-form :inline="true" :model="opFittingsDictPage.params" class="demo-form-inline pull-left">

                    <el-form-item
                        v-if="opFittingsCategorySelectByCondition.res.body[1]"
                        label="分类">
                        <el-cascader
                            v-model="opFittingsDictPage.params.ctg"
                            @change="v => {
                                opFittingsDictPage.params.categoryId = v[0] || ''
                                opFittingsDictPage.params.ctg1 = v[1] || ''
                                opFittingsDictPage.params.ctg2 = v[2] || ''
                            }"
                            :props="{
                                lazy: true,
                                lazyLoad: lazyLoad,
                                label: 'name',
                                value: 'id'
                            }"
                            :clearable="true"
                            :options="opFittingsCategorySelectByCondition.res.body">
                        </el-cascader>
                    </el-form-item>

                    <el-form-item label="关键字">
                        <el-input v-model="opFittingsDictPage.params.keywords" placeholder="请输入关键字"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="b1" @click="opFittingsDictPage.getData()">查询</el-button>
                    </el-form-item>

                </el-form>
                <span @click="addSparePart = true"><i class="iconfont iconxinjian"></i>添加备件</span>
            </div>
            <el-table
                v-loading="opFittingsDictPage.loading"
                border
                :max-height="vh - 220"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                :data="opFittingsDictPage.res.body.data">

                <template slot="empty">
                    没有加载到数据
                </template>

                <el-table-column
                    type="index"
                    fixed
                    :index="1">
                </el-table-column>

                <el-table-column
                    prop="name"
                    sortable
                    fixed
                    width="120"
                    label="备件名称">
                </el-table-column>

                <el-table-column
                    prop="categoryName"
                    sortable
                    width="120"
                    label="分类">
                </el-table-column>

                <el-table-column
                    prop="ctg1"
                    sortable
                    width="120"
                    label="大类">
                </el-table-column>

                <el-table-column
                    prop="ctg2"
                    sortable
                    width="120"
                    label="小类">
                </el-table-column>

                <el-table-column
                    prop="code"
                    sortable
                    width="120"
                    label="备件编号">
                </el-table-column>

                <el-table-column
                    prop="manuf"
                    sortable
                    width="220"
                    label="厂商">
                </el-table-column>

                <el-table-column
                    prop="ft"
                    sortable
                    width="120"
                    label="型号及规格">
                </el-table-column>

                <el-table-column
                    prop="fu"
                    sortable
                    width="120"
                    label="单位">
                </el-table-column>

                <el-table-column
                    prop="numMin"
                    sortable
                    width="150"
                    label="下限报警数量">
                </el-table-column>

                <el-table-column
                    prop="remark"
                    sortable
                    min-width="220"
                    label="备注">
                </el-table-column>

                <el-table-column
                    prop="id"
                    label="操作"
                    fixed="right"
                    class-name="handel"
                    width="120">
                    <template slot-scope="scope">
                        <span class="edit" @click="editSparePartObj = scope.row; addSparePart = true;">编辑</span>
                        <span class="delete" @click="opFittingsDictDelete.beforGetdata(scope.row)">删除</span>
                    </template>
                </el-table-column>

            </el-table>

            <my-paging
                :pageSizeArr="[5, 10, 20]"
                @change="data => opFittingsDictPage.getData(data)"
                v-bind="opFittingsDictPage.res.body"/>

            <add-spare-part
                v-bind="editSparePartObj"
                @close="addSparePart = false;editSparePartObj={};opFittingsDictPage.getData()"
                v-if="addSparePart"/>
        </div>
    </div>
</template>

<script>
import {
    api＿opFittingsDictPage,
    api＿opFittingsDictDelete,
    api＿opFittingsCategorySelectByCondition,
    api＿opFittingsDictSelectCtg1,
    api＿opFittingsDictSelectCtg2
    } from '@sparePart/request/api'
import {Table, TableColumn, MessageBox, Form, FormItem, Input, Button, Cascader, Message} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import AddSparePart from './AddSparePart'
import MyPaging from '@comm/components/paging'

export default {
    name: 'SparePartsManagement',
    mixins: [mixinWidthHeight],
    data () {
        return {
            vh: window.innerHeight,
            opFittingsDictPage: api＿opFittingsDictPage({
                onlyLatest: true,
                cacheParams: true,
                data: {
                    categoryId: '',
                    ctg1: '',
                    ctg2: '',
                    keywords: ''
                },
                res: {
                    body: {}
                }
            }),
            opFittingsCategorySelectByCondition: api＿opFittingsCategorySelectByCondition({
                res: {
                    body: []
                }
            }),
            opFittingsDictSelectCtg1: api＿opFittingsDictSelectCtg1({
                later: true,
                res: {
                    body: []
                },
                options: [{
                    value: '',
                    label: '全部',
                    children: []
                }]
            }),
            opFittingsDictSelectCtg2: api＿opFittingsDictSelectCtg2({
                later: true,
                cacheParams: true,
                res: {
                    body: []
                }
            }),
            opFittingsDictDelete: api＿opFittingsDictDelete({
                later: true
            }),
            addSparePart: false,
            editSparePartObj: {}
        }
    },
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElButton: Button,
        ElCascader: Cascader,
        MyPaging,
        AddSparePart
    },
    created () {
        const _this = this

        this.opFittingsDictSelectCtg1.subscribe(res => {
            _this.opFittingsDictSelectCtg1.options.push(...res.body.map(v => ({value: v, label: v})))
        })

        this.opFittingsDictDelete.subscribe(res => {
            Message({
                message: res.msg,
                type: res.code === 0 ? 'success' : 'error'
            })
            _this.opFittingsDictPage.getData()
        }).beforGetdata = row => {
            MessageBox.confirm(`确定删除备件${row.name}吗？`, '提示', {
                type: 'warning'
            }).then(() => {
                return _this.opFittingsDictDelete.getData({id: row.id})
            }).catch(() => {})
        }
    },

    methods: {
        lazyLoad (node, resolve) {
            if (node.level === 1) {
                this.opFittingsDictSelectCtg1.getData({categoryId: node.value}).then(res => {
                    resolve([{id: '', name: '全部', leaf: true}, ...res.body.map(v => ({id: v, name: v, leaf: false}))])
                })
            } else if (node.level === 2) {
                this.opFittingsDictSelectCtg2.getData({categoryId: node.path[0], ctg1: node.value}).then(res => {
                    resolve([{id: '', name: '全部', leaf: true}, ...res.body.map(v => ({id: v, name: v, leaf: true}))])
                })
            }
        }
    }
}
</script>

<style lang="scss">
.SparePartsManagement {
    @import '@comm/assets/themes/table/t1.scss';

    .el-form-item__label {
        @include c(color, $text_c2);
    }
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .SparePartsManagement {
        margin-top: 15px;
        padding: 0 15px;
        height: calc(100vh - 100px);

        .content {
            height: 100%;
            padding: 15px;
            @include c(background-color, $bg_c0);

            .clearfix {
                line-height: 40px;
                @include c(color, $text_c1);

                .el-form-item {
                    margin-bottom: 10px;
                }

                span {
                    float: right;
                    margin: 0 .5em;
                    cursor: pointer;

                    i {
                        margin-right: .5em;
                    }
                }
            }

            .el-table {
                .edit {
                    @include c(color, $text_c1);
                    margin: 0 .5em;
                    cursor: pointer;
                }

                .delete {
                    @include c(color, $text_c3);
                    margin: 0 .5em;
                    cursor: pointer;
                }
            }

            .my-paging{
                color: #fff;
                height: 50px;
                line-height: 50px;
            }
        }
    }
</style>
