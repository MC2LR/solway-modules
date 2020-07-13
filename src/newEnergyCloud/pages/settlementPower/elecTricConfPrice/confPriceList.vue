<template>
    <div class="price-list">
         <!-- 表格区域 -->
        <div class="tableCon">
            <el-table
                v-if="custStElecPriceGetElecPriceList.res && custStElecPriceGetElecPriceList.res.data"
                :data="custStElecPriceGetElecPriceList.res.data"
                v-loading="custStElecPriceGetElecPriceList.loading"
                style="width: 100%"
                border
                :max-height="vh - 280"
                :row-style="{'cursor': 'pointer'}"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                @sort-change='sortChange'
                >
                <el-table-column
                    fixed
                    label="序列号"
                    width="90"
                    :formatter="serialNumber"
                ></el-table-column>
                <el-table-column prop="sharpPrice" label="尖原电价(元)" sortable="custom" min-width="125"></el-table-column>
                <el-table-column prop="peakPrice" label="峰原电价(元)" sortable="custom" min-width="125"></el-table-column>
                <el-table-column prop="flatPrice" label="平原电价(元)" sortable="custom" min-width="125"></el-table-column>
                <el-table-column prop="valleyPrice" label="谷原电价(元)" sortable="custom" min-width="125"></el-table-column>
                <el-table-column prop="sharpPrice" label="尖折扣电价(元)" sortable="custom" width="140"></el-table-column>
                <el-table-column prop="peakPrice" label="峰折扣电价(元)" sortable="custom" width="140"></el-table-column>
                <el-table-column prop="flatPrice" label="平折扣电价(元)" sortable="custom" width="140"></el-table-column>
                <el-table-column prop="valleyPrice" label="谷折扣电价(元)" sortable="custom" width="140"></el-table-column>
                <el-table-column
                    prop="startDate"
                    label="生效日期"
                    width="125"
                    sortable="custom"
                    align="center"
                    :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd') : ''">
                </el-table-column>
                <el-table-column
                    prop="endDate"
                    label="结束日期"
                    width="125"
                    sortable="custom"
                    align="center"
                    :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd') : ''">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    width="180"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <span
                            title="编辑"
                            class="edit"
                            @click.stop="$bus.emit('openNewPrice', scope.row);$bus.emit('openPrice')">
                            <i class="iconfont icon-bianji-copy"></i>
                            <span>编辑</span>
                        </span>
                        <span
                            title="删除"
                            @click.stop="deletePrice(scope.row)"
                            class="delete">
                            <i class="iconfont icon-shanchu1"></i>
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
import { api＿custStElecPriceGetElecPriceList, api＿custStElecPriceDeleteElecPrice } from '@newEnergyCloud/request/api'
import mixinWidthHeight from '@comm/mixin/widthHeight'

export default {
    mixins: [mixinWidthHeight],
    props: {
        detail: {
            type: Object
        }
    },
    data () {
        return {
            stid: null,
            custStElecPriceGetElecPriceList: api＿custStElecPriceGetElecPriceList({
                later: true,
                res: { data: [] }
            }),
            custStElecPriceDeleteElecPrice: api＿custStElecPriceDeleteElecPrice({
                later: true,
                res: { body: [] }
            })
        }
    },
    mounted () {
        this.$bus.on('updateElecPriceList', this.getList)
        this.$bus.on('clearElecPriceConfList', this.clearElecPriceConfList)
    },
    methods: {
        sortChange ({ column, prop, order }) {
            // this.getContractProject.params.sort = prop + '_' + (order === 'ascending' ? 1 : 2)
            // this.getContractProject.getData()
        },
        serialNumber (row, column, cellValue, index) {
            // return this.custStElecPriceGetElecPriceList.res.body.pageSize * this.custStElecPriceGetElecPriceList.res.body.pageIndex + index + 1
            return index + 1
        },
        getList (stid) {
            this.stid = stid
            this.stid && this.custStElecPriceGetElecPriceList.getData({stId: this.stid})
        },
        clearElecPriceConfList () {
            this.stid = null
            this.custStElecPriceGetElecPriceList.res.data = []
        },
        // 删除电价
        deletePrice (row) {
            this.$MessageBox.confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.custStElecPriceDeleteElecPrice.getData({id: row.id})
                        .then(res => {
                            if (res.code !== 200) return this.$message({message: res.msg, type: 'error'})
                            this.$message({message: res.msg, type: 'success'})
                            this.getList(this.stid)
                        })
                })
        }
    },
    beforeDestroy () {
        this.$bus.off('updateElecPriceList', this.getList)
        this.$bus.off('clearElecPriceConfList', this.clearElecPriceConfList)
    }
}
</script>

<style lang="scss">
.price-list {
    @import '@comm/assets/themes/table/t3.scss';
}
</style>

<style lang="scss" scoped>
.price-list {
    .tableCon {
        margin-top: 20px;
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
