<template>
    <div class="fault-info" v-loading="faultAlarmList.loading && faultAlarmList.resNumber === 0">
        <el-table
            border
            v-loading="faultAlarmList.loading"
            :data="faultList"
            :max-height="300"
            row-class-name="row-style"
            cell-class-name="cell-style"
            header-row-class-name="header-row-style"
            header-cell-class-name="header-cell-style"
            style="width: 100%">
            <!-- <el-table-column type="index" width="50" :index="i => faultAlarmList.res.pageIndex * faultAlarmList.res.pageSize + i + 1"></el-table-column> -->
            <el-table-column prop="sStartTime" label="发生时间" align="center" width="200" :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
            <!-- <el-table-column prop="sEndTime" label="结束时间" align="center" width="200" :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column> -->
            <el-table-column prop="faultlevelStr" label="故障级别" align="center" width="120"></el-table-column>
            <el-table-column prop="eventDesc" label="故障描述" align="left" width="220"></el-table-column>
            <!-- <el-table-column prop="sEndTime" label="结果" align="center" width="120" :formatter="(row, column, cellValue, index) => cellValue ? '关闭' : '报告'"></el-table-column> -->
            <!-- <el-table-column prop="handstatusStr" label="人工处理状态" align="left" width="120"></el-table-column> -->
        </el-table>
    </div>
</template>

<script>
import {api＿getRunFaultList} from '@newEnergyCloud/request/api'
export default {
    props: {
        device: {
            type: Object
        }
    },
    data () {
        const {sn} = this.device
        return {
            faultAlarmList: api＿getRunFaultList({
                data: {
                    dids: sn,
                    pageIndex: 0,
                    pageSize: 10
                },
                res: {
                    data: []
                }
            })
        }
    },
    computed: {
        faultList () {
            return this.faultAlarmList.res?.body?.page?.data || []
        }
    },
    created () {
        this.timer = setInterval(() => this.faultAlarmList.getData(), 30 * 1000)
    },
    beforeDestroy () {
        clearInterval(this.timer)
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
    .footer {
        padding: 5px 0;
    }
}
</style>
