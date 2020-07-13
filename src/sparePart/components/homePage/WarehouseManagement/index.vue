<template>
    <div class="WarehouseManagement">
        <div class="content">
            <div class="clearfix">
                <span @click="addWarehouse = true"><i class="iconfont iconxinjian"></i>添加库房</span>
            </div>
            <el-table
                v-loading="opFittingsRoomSelectByCondition.loading"
                border
                :max-height="vh - 180"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                :data="opFittingsRoomSelectByCondition.res.body">

                <el-table-column
                    type="index"
                    :index="1">
                </el-table-column>

                <el-table-column
                    prop="name"
                    sortable
                    label="库房名称">
                </el-table-column>

                <el-table-column
                    prop="remark"
                    sortable
                    label="备注">
                </el-table-column>

                <el-table-column
                    prop="id"
                    label="操作"
                    class-name="handel"
                    width="120">
                    <template slot-scope="scope">
                        <span class="edit" @click="editWarehouseObj = scope.row; addWarehouse = true;">编辑</span>
                        <span class="delete" @click="opFittingsRoomDelete.beforGetdata(scope.row)">删除</span>
                    </template>
                </el-table-column>

            </el-table>
            <add-warehouse
                v-bind="editWarehouseObj"
                @close="addWarehouse = false;editWarehouseObj = {};opFittingsRoomSelectByCondition.getData()"
                v-if="addWarehouse"/>
        </div>
    </div>
</template>

<script>
import {api＿opFittingsRoomSelectByCondition, api＿opFittingsRoomDelete} from '@sparePart/request/api'
import {Table, TableColumn, MessageBox} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import AddWarehouse from './AddWarehouse'

export default {
    name: 'WarehouseManagement',
    mixins: [mixinWidthHeight],
    data () {
        return {
            opFittingsRoomSelectByCondition: api＿opFittingsRoomSelectByCondition({
                onlyLatest: true,
                cacheParams: true,
                data: { isMe: 1 },
                res: { body: [] }
            }),
            opFittingsRoomDelete: api＿opFittingsRoomDelete({
                later: true
            }),
            addWarehouse: false,
            editWarehouseObj: {}
        }
    },
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        AddWarehouse
    },
    created () {
        const _this = this
        this.opFittingsRoomDelete.subscribe(res => {
            _this.opFittingsRoomSelectByCondition.getData()
        }).beforGetdata = row => {
            MessageBox.confirm(`确定删除库房${row.name}吗？`, '提示', {
                type: 'warning'
            }).then(() => {
                _this.opFittingsRoomDelete.getData({id: row.id})
            }).catch(() => {})
        }
    }
}
</script>

<style lang="scss">
.WarehouseManagement {
    @import '@comm/assets/themes/table/t1.scss';
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .WarehouseManagement {
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

                i {
                    margin-right: .5em;
                }

                span {
                    float: right;
                    margin: 0 .5em;
                    cursor: pointer;
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
        }
    }
</style>
