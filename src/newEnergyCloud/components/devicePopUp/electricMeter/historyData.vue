<template>
    <history-data :device="device">
        <el-table-column prop="dtime" label="时间" align="center" width="160" fixed :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue*1000).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
        <el-table-column prop="w" label="总电能(度)" align="center" width="220"></el-table-column>
        <el-table-column prop="wp" label="正向总电能(度)" align="center" width="200"></el-table-column>
        <el-table-column prop="wn" label="反向总电能(度)" align="center" width="200"></el-table-column>
        <el-table-column prop="ua" label="A相电压(V)" align="center" width="180"></el-table-column>
        <el-table-column prop="ub" label="B相电压(V)" align="center" width="160"></el-table-column>
        <el-table-column prop="uc" label="C相电压(V)" align="center" width="160"></el-table-column>
        <el-table-column prop="ia" label="A相电流(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="ib" label="B相电流(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="ic" label="C相电流(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="pa" label="A相功率(kW)" align="center" width="120"></el-table-column>
        <el-table-column prop="pb" label="B相功率(kW)" align="center" width="120"></el-table-column>
        <el-table-column prop="pc" label="C相功率(kW)" align="center" width="120"></el-table-column>
        <el-table-column prop="p" label="总有功功率(kW)" align="center" width="150"></el-table-column>
    </history-data>
</template>

<script>
import historyData from '../comm/historyData'
export default {
    props: {
        device: {
            type: Object
        }
    },
    components: {
        historyData
    }
}
</script>
