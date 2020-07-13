<template>
    <div class="packing-list">
        <div class="content">

            <div class="clearfix filter">
                <el-form :inline="true" :model="opWorkFittingsReqPage.params" class="pull-left">

                    <el-form-item label="申请时间">
                        <el-date-picker
                            v-model="opWorkFittingsReqPage.params.date"
                            type="daterange"
                            align="center"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="关键字">
                        <el-input v-model="opWorkFittingsReqPage.params.keywords" placeholder="请输入关键字"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="b1" @click="opWorkFittingsReqPage.getData()">查询</el-button>
                    </el-form-item>
                </el-form>
                <router-link class="router-link pull-right" :to="{name: 'PackingAdd'}">
                    <i class="iconfont iconxinjian"></i>
                    <span>领料申请</span>
                </router-link>
            </div>

            <el-table
                border
                v-loading="opWorkFittingsReqPage.loading"
                :max-height="vh - 220"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                :data="opWorkFittingsReqPage.res.body.data">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <my-detail :row="props.row"></my-detail>
                    </template>
                </el-table-column>
                <el-table-column
                    type="index"
                    :index="1">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    sortable
                    :formatter="(row, column, cellValue, index) => new Date(cellValue).Format('yyyy-MM-dd')"
                    align="center"
                    label="申请日期">
                </el-table-column>
                <el-table-column
                    prop="createUname"
                    sortable
                    label="申请人">
                </el-table-column>
                <el-table-column
                    prop="summary"
                    label="领料原因">
                </el-table-column>
                <el-table-column
                    prop="state"
                    sortable
                    :formatter="(row, column, cellValue, index) => ({
                        '00': '完成',
                        '01': '待处理',
                        '02': '正在处理',
                        '03': '作废',
                        '04': '不合格',
                        '05': '退回',
                        '06': '',
                    }[cellValue] || '')"
                    label="状态">
                </el-table-column>
            </el-table>

            <my-paging
                :pageSizeArr="[5, 10, 20]"
                @change="data => opWorkFittingsReqPage.getData(data)"
                v-bind="opWorkFittingsReqPage.res.body"/>
        </div>
    </div>
</template>

<script>
import {api＿opWorkFittingsReqPage, api＿opFittingsRoomSelectByCondition} from '@sparePart/request/api'
import {Table, TableColumn, Select, Option, Form, FormItem, Input, Button, DatePicker} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import MyPaging from '@comm/components/paging'
import { getThemeColors } from '@comm/assets/themes'
import MyDetail from './detail'

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
            opWorkFittingsReqPage: api＿opWorkFittingsReqPage({
                onlyLatest: true,
                beforeSend (params) {
                    if (params.date) {
                        params.startDate = params.date[0].Format('yyyy-MM-dd')
                        params.endDate = params.date[1].Format('yyyy-MM-dd')
                        delete params.date
                    }
                    return params
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
        ElDatePicker: DatePicker,
        MyPaging,
        MyDetail
    }
}
</script>

<style lang="scss">
.packing-list {
    @import '@comm/assets/themes/table/t1.scss';

    .el-form-item__label {
        @include c(color, $text_c2);
    }

    .el-date-editor {
        width: 280px;

        .el-range-separator, .el-range__icon, .el-range__close-icon {
            line-height: 26px;
        }

        .el-range-separator {
            width: 10%;
        }
    }
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .packing-list {
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

                    .el-form-item {
                        margin-bottom: 10px;
                    }
                }

                .router-link {
                    float: right;
                    margin: 0 .5em;
                    cursor: pointer;
                    line-height: 35px;

                    i {
                        margin-right: .5em;
                    }
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
