<template>
    <div class="put-in-storage-detail" v-loading="opWorkFittingsInGoods.loading">
        <div class="header clearfix">
            <span>入库单号：{{row.sn}}</span>
            <span>库房名称：{{row.stationName}}</span>
            <span class="pull-right">入库时间：{{new Date(row.createTime).Format('yyyy-MM-dd')}}</span>
        </div>

        <el-table
            class="list"
            border
            max-height="400"
            row-class-name="row-style"
            cell-class-name="cell-style"
            header-row-class-name="header-row-style"
            header-cell-class-name="header-cell-style"
            :data="opWorkFittingsInGoods.res.body.goods">
            <template slot="empty">
                加载中...
            </template>
            <el-table-column
                type="index"
                fixed
                :index="1">
            </el-table-column>
            <el-table-column
                prop="fd.categoryName"
                sortable
                width="100"
                label="分类">
            </el-table-column>
            <el-table-column
                prop="fd.ctg1"
                width="100"
                label="大类">
            </el-table-column>
            <el-table-column
                prop="fd.ctg2"
                width="100"
                label="小类">
            </el-table-column>
            <el-table-column
                prop="fd.code"
                width="120"
                label="备件类型编号">
            </el-table-column>
            <el-table-column
                prop="fd.name"
                width="120"
                fixed
                label="备件名称">
            </el-table-column>
            <el-table-column
                prop="fd.ft"
                width="100"
                label="型号及规格">
            </el-table-column>
            <el-table-column
                prop="fd.fu"
                width="100"
                label="单位">
            </el-table-column>
            <el-table-column
                prop="position"
                fixed="right"
                label="库位">
            </el-table-column>
            <el-table-column
                prop="num"
                sortable
                width="80"
                fixed="right"
                align="right"
                label="数量">
            </el-table-column>
            <el-table-column
                prop="fsn"
                sortable
                width="120"
                fixed="right"
                label="备件编号">
            </el-table-column>
        </el-table>

        <div>
            <span>备注：{{row.summary}}</span>
        </div>
    </div>
</template>

<script>
import {api＿opWorkFittingsInGoods} from '@sparePart/request/api'
import {Table, TableColumn} from 'element-ui'

export default {
    props: {
        row: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            opWorkFittingsInGoods: api＿opWorkFittingsInGoods({
                data: {
                    id: this.row.id
                },
                res: {
                    body: {
                        goods: []
                    }
                }
            })
        }
    },
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn
    }
}
</script>

<style lang="scss">
.put-in-storage-detail {
    @import '@comm/assets/themes/table/t2.scss';
}
</style>

<style lang="scss" scoped>
.put-in-storage-detail {
    @include c(color, $text_c2);

    .header {
        span {
            margin-right: 50px;

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .list {
        margin: 20px 0;
    }
}
</style>
