<template>
    <div class="event-list">
        <el-table
            :data="data"
            :max-height="300"
            border
            row-class-name="row-style"
            cell-class-name="cell-style"
            header-row-class-name="header-row-style"
            header-cell-class-name="header-cell-style"
            style="width: 100%">
            <el-table-column prop="sStartTime" label="发生时间" align="center" width="160" :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
            <el-table-column prop="sEndTime" label="结束时间" align="center" width="160" :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
            <el-table-column prop="faultDesc" label="故障事件" align="left" width="90"></el-table-column>
            <el-table-column prop="loss_power" label="损失电量(度)" align="right" width="120" :formatter="(row, column, cellValue, index) => cellValue ? cellValue.toFixed(2) : 0"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array
        }
    }
}
</script>

<style lang="scss">
.event-list {
    @import '@comm/assets/themes/table/t4.scss';
}
</style>
