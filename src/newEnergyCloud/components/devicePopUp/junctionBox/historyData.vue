<template>
    <history-data :device="device">
        <el-table-column prop="dtime" label="时间" align="center" width="160" fixed :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue*1000).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
        <el-table-column v-for="(v, index) in (new Array(32).fill('c'))" :key="index" width="60" :prop="v + (index + 1)" :label="(index + 1).toString()" align="center"></el-table-column>
        <el-table-column prop="k" label="开关" align="center" width="120" :formatter="(row, column, cellValue) => ['无效', '无效', '闭合', '开启'][cellValue]"></el-table-column>
        <el-table-column prop="arrester" label="防雷器" align="center" width="120" :formatter="(row, column, cellValue) => ['无效', '无效', '正常', '异常'][cellValue]"></el-table-column>
        <el-table-column prop="u" label="电压(V)" align="center" width="120"></el-table-column>
        <el-table-column prop="c" label="电流(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="p" label="功率(kW)" align="center" width="120"></el-table-column>
        <el-table-column prop="t" label="温度(℃)" align="center" width="120"></el-table-column>
        <el-table-column prop="ef" label="效率(%)" align="center" width="120"></el-table-column>
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
