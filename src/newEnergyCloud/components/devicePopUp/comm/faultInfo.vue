<template>
    <div class="fault-info">
        <el-table
            v-if="faultAlarmList.res.data"
            border
            v-loading="faultAlarmList.loading"
            :data="faultAlarmList.res.data"
            :max-height="vh - 180"
            row-class-name="row-style"
            cell-class-name="cell-style"
            header-row-class-name="header-row-style"
            header-cell-class-name="header-cell-style"
            style="width: 100%">
            <el-table-column type="index" width="50" :index="i => faultAlarmList.res.pageIndex * faultAlarmList.res.pageSize + i + 1"></el-table-column>
            <el-table-column prop="sStartTime" label="发生时间" align="center" width="200" :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
            <el-table-column prop="sEndTime" label="结束时间" align="center" width="200" :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
            <el-table-column prop="faultlevelStr" label="故障级别" align="center" width="120"></el-table-column>
            <el-table-column prop="eventDesc" label="故障描述" align="left" width="220"></el-table-column>
            <el-table-column prop="sEndTime" label="结果" align="center" width="120" :formatter="(row, column, cellValue, index) => cellValue ? '关闭' : '报告'"></el-table-column>
            <el-table-column prop="handstatusStr" label="人工处理状态" align="left" width="120"></el-table-column>
        </el-table>
        <div class="footer" v-if="faultAlarmList.res.totalPage">
            <solway-pagination
                :page-index="faultAlarmList.res.pageIndex"
                :page-size="faultAlarmList.res.pageSize"
                :total="faultAlarmList.res.total"
                @change="data => faultAlarmList.getData(data)">
            </solway-pagination>
        </div>
    </div>
</template>

<script>
import {api＿faultAlarmList} from '@newEnergyCloud/request/api'
import solwayPagination from '@newEnergyCloud/components/pagination'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
    components: {
        solwayPagination
    },
    props: {
        device: {
            type: Object
        }
    },
    data () {
        const {id, stid, type} = this.device
        return {
            faultAlarmList: api＿faultAlarmList({
                data: {
                    pageIndex: 0,
                    pageSize: 10,
                    deviceId: id,
                    deviceType: type,
                    pstationid: stid
                },
                res: {
                    data: []
                }
            })
        }
    }
}
</script>

<style lang="scss">
.fault-info {
    @import '@comm/assets/themes/table/t3.scss';

    .el-table {
        table {
            min-width: 100%;
        }
    }
}
</style>

<style lang="scss" scoped>
.fault-info {
    padding: 20px 42px;

    .footer {
        padding: 5px 0;
    }
}
</style>
