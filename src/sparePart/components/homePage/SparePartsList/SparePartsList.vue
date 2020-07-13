<template>
    <div class="SparePartsList">
        <div class="content">

            <div class="clearfix filter">
                <el-form :inline="true" :model="opFittingsDictFdnumPage.params">

                    <el-form-item label="库房">
                        <el-select
                            v-model="opFittingsDictFdnumPage.params.roomId"
                            filterable
                            clearable
                            placeholder="请选择库房">
                            <el-option v-for="item in opFittingsRoomSelectByCondition.res.body" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="关键字">
                        <el-input v-model="opFittingsDictFdnumPage.params.keywords" placeholder="请输入关键字"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="b1" @click="opFittingsDictFdnumPage.getData()">查询</el-button>
                    </el-form-item>

                    <el-form-item label="下限报警" class="pull-right">
                        <el-switch
                            @change="opFittingsDictFdnumPage.getData()"
                            v-model="opFittingsDictFdnumPage.params.isMin"
                            :active-color="themeColors.$button_c0"
                            inactive-color="#ddd">
                        </el-switch>
                    </el-form-item>

                </el-form>
            </div>

            <el-table
                border
                v-loading="opFittingsDictFdnumPage.loading"
                :max-height="vh - 220"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                :data="opFittingsDictFdnumPage.res.body.data">
                <el-table-column
                    type="index"
                    :index="1">
                </el-table-column>
                <el-table-column
                    prop="categoryName"
                    sortable
                    label="分类">
                </el-table-column>
                <el-table-column
                    prop="ctg1"
                    sortable
                    label="大类">
                </el-table-column>
                <el-table-column
                    prop="ctg2"
                    sortable
                    label="小类">
                </el-table-column>
                <el-table-column
                    prop="code"
                    sortable
                    label="备件类型编号">
                </el-table-column>
                <el-table-column
                    prop="name"
                    sortable
                    label="备件名称">
                </el-table-column>
                <el-table-column
                    prop="ft"
                    sortable
                    label="型号及规格">
                </el-table-column>
                <el-table-column
                    prop="num"
                    sortable
                    label="数量">
                </el-table-column>
                <el-table-column
                    prop="fu"
                    sortable
                    label="单位">
                </el-table-column>
            </el-table>

            <my-paging
                :pageSizeArr="[5, 10, 20]"
                @change="data => opFittingsDictFdnumPage.getData(data)"
                v-bind="opFittingsDictFdnumPage.res.body"/>
        </div>
    </div>
</template>

<script>
import {api＿opFittingsDictFdnumPage, api＿opFittingsRoomSelectByCondition} from '@sparePart/request/api'
import {Table, TableColumn, Select, Option, Form, FormItem, Input, Button, Switch} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import MyPaging from '@comm/components/paging'
import { getThemeColors } from '@comm/assets/themes'

export default {
    mixins: [mixinWidthHeight],
    data () {
        return {
            themeColors: getThemeColors(),
            opFittingsRoomSelectByCondition: api＿opFittingsRoomSelectByCondition({
                onlyLatest: true,
                cacheParams: true,
                res: { body: [] }
            }),
            opFittingsDictFdnumPage: api＿opFittingsDictFdnumPage({
                onlyLatest: true,
                beforeSend (params) {
                    params.isMin = params.isMin ? 1 : 0
                    return params
                },
                mountedRes (res) {
                    res.a = 'hello world'
                    return res
                },
                res: {
                    body: {
                        data: []
                    }
                }
            })
        }
    },
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElSelect: Select,
        ElOption: Option,
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElButton: Button,
        ElSwitch: Switch,
        MyPaging
    }
}
</script>

<style lang="scss">
.SparePartsList {
    @import '@comm/assets/themes/table/t1.scss';

    .el-form-item__label {
        @include c(color, $text_c2);
    }
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .SparePartsList {
        margin-top: 15px;
        padding: 0 15px;
        height: calc(100vh - 100px);

        .content {
            height: 100%;
            padding: 15px;
            @include c(background-color, $bg_c0);

            .filter {
                @include c(color, $text_c1);
                position: relative;
                height: 50px;

                .el-form {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                }

                .el-form-item {
                    margin-bottom: 10px;
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
