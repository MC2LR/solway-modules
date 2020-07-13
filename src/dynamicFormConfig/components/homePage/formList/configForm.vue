<template>
    <div class="config-form">
        <!-- 查询区域 -->
        <div class="filter clearfix" ref="filter">
            <el-form ref="queryForm" :model="params" :inline='true' size="small">
                <el-form-item>
                        <el-input v-model="params['search.fdCode_eq']" clearable placeholder="请输入字段编码" style="width: 200px" @keyup.enter.native="dynamicFieldList.getData(params)">
                        </el-input>
                </el-form-item>
                <el-form-item
                    class="pull-right"
                    style="margin-right: 0;">
                    <el-button type="b1" @click="dynamicFieldList.getData(params)" :disabled="dynamicFieldList.loading">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
         <!-- 表格区域 -->
        <div class="tableCon">
            <el-table
                :data="dynamicFieldList.res.data"
                v-loading="dynamicFieldList.loading"
                style="width: 100%"
                border
                :max-height="vh - 330"
                :row-style="{'cursor': 'pointer'}"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                >
                <el-table-column fixed prop="fdCode" label="字段编码" width="110" sortable></el-table-column>
                <el-table-column prop="attrType" label="组件类型" width="130" sortable></el-table-column>
                <el-table-column prop="fdName" label="名称" width="150" sortable></el-table-column>
                <el-table-column prop="fdDesc" label="描述" width="150" sortable></el-table-column>
                <el-table-column prop="fdUnit" label="单位" width="110" sortable></el-table-column>
                <el-table-column prop="attrDataUrl" label="远程数据地址" width="230"></el-table-column>
                <el-table-column prop="attrPlaceholder" label="组件提示" width="150"></el-table-column>
                <el-table-column prop="attrDefVal" label="组件默认值" width="220"></el-table-column>
                <el-table-column
                prop="attrRequired"
                label="是否必填"
                width="170"
                :formatter="(row, column, cellValue, index) => cellValue == '0' ? '是' : '否'"
                ></el-table-column>
                <el-table-column
                prop="attrMultiple"
                label="是否多选"
                width="170"
                :formatter="(row, column, cellValue, index) => cellValue == '0' ? '是' : '否'"
                ></el-table-column>
                <el-table-column prop="attrValidator" label="校验" width="230"></el-table-column>
                <el-table-column prop="attrFormat" label="格式化" width="170"></el-table-column>
                <el-table-column prop="attrConfig" label="扩展配置" width="300"></el-table-column>
                <el-table-column
                    fixed="right"
                    width="180"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <span
                            title="编辑"
                            class="edit"
                            @click.stop="$bus.emit('editField', scope.row);$bus.emit('openNewField')">
                            <i class="iconfont iconbianji-copy"></i>
                            <span>编辑</span>
                        </span>
                        <span
                            title="删除"
                            @click.stop="delField(scope.row)"
                            class="delete">
                            <i class="iconfont iconshanchu1"></i>
                            <span>删除</span>
                        </span>
                    </template>
                </el-table-column>
                <template slot="empty">
                    <span style="color: #000">暂无数据</span>
                </template>
            </el-table>
        </div>
    </div>
</template>

<script>
import { api＿dynamicFieldList, api＿dynamicFieldDelete } from '@dynamicFormConfig/request/api'
import {Table, TableColumn, Form, FormItem, Input, Button, MessageBox, Message} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import MyPaging from '@comm/components/paging'

export default {
    mixins: [mixinWidthHeight],
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElButton: Button,
        MyPaging
    },
    props: {
        detail: {
            type: Object
        }
    },
    data () {
        return {
            params: {},
            dynamicFieldList: api＿dynamicFieldList({
                later: true
            }),
            dynamicFieldDelete: api＿dynamicFieldDelete({
                later: true
            })
        }
    },
    mounted () {
        this.$bus.on('openConfigForm', this.getList)
    },
    methods: {
        getList () {
            this.params['search.fmCode_eq'] = this.detail.fmCode
            this.dynamicFieldList.getData(this.params)
        },
        // 删除字段
        delField (row) {
            MessageBox.confirm('确定删除该字段?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.dynamicFieldDelete.getData({id: row.id})
                    .then(res => {
                        if (res.code === 200) {
                            Message({
                                type: 'success',
                                message: '删除成功'
                            })
                            this.dynamicFieldList.getData(this.params)
                        } else {
                            Message({
                                type: 'error',
                                message: '删除失败'
                            })
                        }
                    })
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('openConfigForm', this.getList)
    }
}
</script>

<style lang="scss">
.form-list {
    .config-form {
        @import '@comm/assets/themes/table/t3.scss';
        .filter {
            padding: 0;
            padding-top: 10px;
            .el-form-item {
                .el-input__inner, .el-textarea__inner {
                    background-color: #fff;
                    color: #414141;
                    border-color: #cee1fa;
                }
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.config-form {
    .add-wrap {
        font-size: 14px;
        cursor: pointer;
        vertical-align: -webkit-baseline-middle;
        .add-con {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 5px;
            border-radius: 50%;
            vertical-align: middle;
            line-height: 20px;
            text-align: center;
            font-size: 14px;
            background:#2487E2;
            i {
                font-size: 12px;
                color: #fff;
            }
        }
    }
    .tableCon {
        .edit {
            font-size: 12px;
            margin-right: 10px;
            & i {
                margin-right: 5px;
                @include c(color, $text_c1);
            }
        }
        .delete {
            font-size: 12px;
            & i {
                margin-right: 5px;
                @include c(color, $text_c3);
            }
        }
    }
}
</style>
