<template>
    <div class="form-list">
        <div class="content">
            <!-- 查询区域 -->
            <div class="filter clearfix" ref="filter">
                <el-form ref="queryForm" :model="dynamicFormPage.params" :inline='true' size="small">
                    <el-form-item style="margin-left: 15px">
                          <el-input v-model="dynamicFormPage.params['search.fmName_eq']" clearable placeholder="请输入表单名称" style="width: 200px" @keyup.enter.native="dynamicFormPage.getData()">
                          </el-input>
                    </el-form-item>
                    <el-form-item
                        class="pull-right"
                        style="margin-right: 0;">
                        <el-button type="b1" @click="dynamicFormPage.getData()" :disabled="dynamicFormPage.loading">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 新增按钮 分页区域 -->
            <div class="toolbox clearfix">
                <el-button type="text" @click="formDetail.show = true;delete formDetail.detail;">
                    <span class="add-con"><i class="iconfont iconxinzeng"></i></span>
                    新增
                </el-button>

                <my-paging
                    class="pull-right"
                    v-if="dynamicFormPage.res && dynamicFormPage.res.data"
                    :pageSizeArr="[10, 20, 30, 50, 100]"
                    @change="({pageIndex, pageSize}) => dynamicFormPage.getData({'page.pn': pageIndex, 'page.size': pageSize})"
                    :pageIndex='dynamicFormPage.res.data.pageNum'
                    :firstIndex='1'
                    v-bind="dynamicFormPage.res.data"/>
            </div>
            <!-- 表格区域 -->
            <div class="tableCon">
                <el-table
                    v-if="dynamicFormPage.res && dynamicFormPage.res.data"
                    :data="dynamicFormPage.res.data.list"
                    v-loading="dynamicFormPage.loading"
                    style="width: 100%"
                    :max-height="vh - 192"
                    border
                    :row-style="{'cursor': 'pointer'}"
                    row-class-name="row-style"
                    cell-class-name="cell-style"
                    header-row-class-name="header-row-style"
                    header-cell-class-name="header-cell-style"
                    >
                    <el-table-column prop="fmCode" label="表单code" />
                    <el-table-column prop="fmName" label="表单名称" />
                    <el-table-column prop="fmDesc" label="描述" />
                    <el-table-column prop="fmPrefix" label="前缀" />
                    <el-table-column prop="fmConfig" label="扩展配置" />
                    <el-table-column
                        fixed="right"
                        width="240px"
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <span
                                title="配置表单"
                                @click.stop="configFormDetail.show = true;formDetail.detail = scope.row"
                                class="look">
                                <i class="iconfont iconpeizhi" style="font-size: 20px"></i>
                                <span class="" style="vertical-align: middle">配置表单</span>
                            </span>
                            <span
                                title="编辑"
                                class="edit"
                                @click.stop="formDetail.show = true;formDetail.detail = scope.row">
                                <i class="iconfont iconbianji-copy"></i>
                                <span>编辑</span>
                            </span>
                            <span
                                title="删除"
                                @click.stop="deleteForm(scope.row)"
                                class="delete">
                                <i class="iconfont iconshanchu1"></i>
                                <span>删除</span>
                            </span>
                        </template>
                    </el-table-column>
                    <template slot="empty">
                        <span>暂无数据</span>
                    </template>
                </el-table>
            </div>
        </div>

        <!-- 新增/编辑 弹框 -->
        <el-dialog
        width="1250px"
        :title="formDetail.detail ? '编辑' : '新增'"
        center
        :visible.sync="formDetail.show"
        top='10vh'
        @opened="$bus.emit('openNewForm')"
        @close="delete formDetail.detail"
        >
            <new-form @updateSuccess="updateSuccess" :detail="formDetail.detail"></new-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="formDetail.show = false">取 消</el-button>
                <el-button type="primary" @click="$bus.emit('saveform')">提 交</el-button>
            </div>
        </el-dialog>

        <!-- 配置表单 弹框 -->
        <el-dialog
        width="1300px"
        height="500px"
        title="配置表单"
        center
        :visible.sync="configFormDetail.show"
        top='10vh'
        @opened="$bus.emit('openConfigForm')"
        @close="fieldDetail.show = false"
        >
            <el-button type="text" @click="delete fieldDetail.detail; fieldDetail.show = true;$forceUpdate();$bus.emit('openNewField')">
                <span class="add-con"><i class="iconfont iconxinzeng"></i></span>
                新增
            </el-button>

            <new-field :detail="fieldDetail.detail" :formDetail='formDetail.detail' v-show="fieldDetail.show"></new-field>

            <config-form :detail="formDetail.detail"></config-form>
        </el-dialog>
    </div>
</template>

<script>
import { api＿dynamicFormPage, api＿dynamicFormDelete } from '@dynamicFormConfig/request/api'
import {Table, TableColumn, Select, Option, Form, FormItem, Input, Button, Dialog, MessageBox, Message} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import MyPaging from '@comm/components/paging'
import newForm from './newForm'
import configForm from './configForm'
import newField from './newField'

export default {
    mixins: [mixinWidthHeight],
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElSelect: Select,
        ElOption: Option,
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElButton: Button,
        ElDialog: Dialog,
        MyPaging,
        configForm,
        newField,
        newForm
    },
    data () {
        return {
            formDetail: {
                show: false
            },
            configFormDetail: {
                show: false
            },
            fieldDetail: {
                show: false
            },
            dynamicFormPage: api＿dynamicFormPage({}),
            dynamicFormDelete: api＿dynamicFormDelete({
                sameTimeOnce: true
            })
        }
    },
    mounted () {
        this.$bus.on('hideNewField', this.hideNewField)
        this.$bus.on('editField', this.editField)
        this.dynamicFormPage.subscribe(res => { res.data.size = res.data.size.toString() })
    },
    methods: {
        // 新增/编辑 表单 成功后处理
        updateSuccess () {
            this.formDetail.show = false
            this.dynamicFormPage.getData()
        },
        // 隐藏 新增字段
        hideNewField () {
            this.fieldDetail.show = false
            this.$forceUpdate()
        },
        // 打开 编辑字段
        editField (row) {
            this.fieldDetail.show = true
            this.fieldDetail.detail = row
            this.$forceUpdate()
        },
        // 删除
        deleteForm (row) {
            MessageBox.confirm('确定删除?', '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                    }).then(() => {
                        this.dynamicFormDelete.getData({id: row.id})
                        .then(res => {
                            if (res.code === 200) {
                                Message({
                                    type: 'success',
                                    message: '删除成功'
                                })
                                this.dynamicFormPage.getData()
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
        this.$bus.off('hideNewField', this.hideNewField)
        this.$bus.off('editField', this.editField)
    }
}
</script>

<style lang="scss">
.form-list {
    .el-table {
        .el-table__body-wrapper {
            transition: max-height .3s;
        }
    }

    .el-table ::-webkit-scrollbar:horizontal {
        width: 5px;
        height: 7px;
    }

    @import '@comm/assets/themes/table/t1.scss';

    @media screen and (-webkit-min-device-pixel-ratio:0) {
        .el-table__fixed,
        .el-table__fixed-right {
            bottom: 7px !important;
        }
    }

    .filter {
        padding: 20px 30px 0px 30px;
        .el-form-item {
            .el-input input {
                // width: calc(100vw - 930px);
                // max-width: 500px;
            }

            .el-form-item__label {
                @include c(color, $text_c2);
            }

            .el-input__inner, .el-textarea__inner {
                @include c(background-color, $bg_input_c1);
                @include c(border-color, $line_c1);
                @include c(color, $text_c2);

                &:focus, &:hover {
                    @include c(border-color, $line_c1);
                }
            }

            .el-input__suffix {
                right: 10px;
            }

            .el-input--suffix .el-input__inner {
                padding-right: 10px;
            }

            .el-select__input {
                color: rgba(255, 255, 255, 0.8);
            }

            .el-select.s1 .el-tag.el-tag--info {
                background-color: #396faa;
                border-color: #396faa;
                color: #fff;
                .el-select__tags-text {
                    display: inline-block;
                    max-width: 100px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                .el-tag__close.el-icon-close {
                    vertical-align: super;
                }
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.form-list {
    .content {
        position: relative;
        .toolbox {
            padding: 0 30px 0 30px;
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
                        color: #000;
                    }
                }
            }
        }
        .tableCon {
            position: relative;
            padding: 0 30px 0px 30px;
            .look {
                font-size: 12px;
                margin-right: 10px;
                & i {
                    margin-right: 5px;
                    @include c(color, $text_c4);
                }
            }
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
            .table-summary {
                padding: 10px 0 0 0;
                font-size: 15px;
            }
        }
    }

}
</style>
