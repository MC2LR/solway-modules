<template>
    <div class="price-list">
         <!-- 表格区域 -->
        <div class="tableCon">
            <el-table
                v-if="custDeviceMeterGetCustDeviceMeterList.res && custDeviceMeterGetCustDeviceMeterList.res.data"
                :data="custDeviceMeterGetCustDeviceMeterList.res.data"
                v-loading="custDeviceMeterGetCustDeviceMeterList.loading"
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
                <el-table-column prop="name" label="计量点名称" sortable="custom"></el-table-column>
                <el-table-column prop="code" label="表计编号" sortable="custom"></el-table-column>
                <el-table-column prop="dt" label="电表类型" sortable="custom"
                :formatter="(row, column, cellValue, index) => cellValue === 1 ? '上网电表' : '发电电表' "></el-table-column>
                <el-table-column prop="multpw" label="倍率" sortable="custom"></el-table-column>
                <el-table-column
                    fixed="right"
                    width="180"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <span
                            title="编辑"
                            class="edit"
                            @click.stop="$bus.emit('openNewWatch', scope.row);$bus.emit('openWatch')">
                            <i class="iconfont icon-bianji-copy"></i>
                            <span>编辑</span>
                        </span>
                        <span
                            title="删除"
                            @click.stop="deleteWatch(scope.row)"
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
import { api＿custDeviceMeterGetCustDeviceMeterList, api＿custDeviceMeterDeleteDeviceMeter } from '@newEnergyCloud/request/api'
import mixinWidthHeight from '@comm/mixin/widthHeight'

export default {
    mixins: [mixinWidthHeight],
    props: {
    },
    data () {
        return {
            stid: null,
            custDeviceMeterGetCustDeviceMeterList: api＿custDeviceMeterGetCustDeviceMeterList({
                later: true,
                res: { data: [] }
            }),
            custDeviceMeterDeleteDeviceMeter: api＿custDeviceMeterDeleteDeviceMeter({
                later: true,
                res: { body: [] }
            })
        }
    },
    mounted () {
        this.$bus.on('updateElecWatchList', this.getList)
        this.$bus.on('clearElecWatchConfList', this.clearElecWatchConfList)
    },
    methods: {
        sortChange ({ column, prop, order }) {
            // this.getContractProject.params.sort = prop + '_' + (order === 'ascending' ? 1 : 2)
            // this.getContractProject.getData()
        },
        getList (stid) {
            this.stid = stid
            this.stid && this.custDeviceMeterGetCustDeviceMeterList.getData({stId: this.stid})
        },
        clearElecWatchConfList () {
            this.stid = null
            this.custDeviceMeterGetCustDeviceMeterList.res.data = []
        },
        // 删除电表
        deleteWatch (row) {
            this.$MessageBox.confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.custDeviceMeterDeleteDeviceMeter.getData({id: row.id, deviceId: row.deviceId})
                        .then(res => {
                            if (res.code !== 200) return this.$message({message: res.msg, type: 'error'})
                            this.$message({message: res.msg, type: 'success'})
                            this.getList(this.stid)
                        })
                })
        }
    },
    beforeDestroy () {
        this.$bus.off('updateElecWatchList', this.getList)
        this.$bus.off('clearElecWatchConfList', this.clearElecWatchConfList)
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
