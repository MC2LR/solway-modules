<template>
    <history-data :device="device">
        <el-table-column prop="dtime" label="时间" align="center" width="160" fixed :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue*1000).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
        <el-table-column prop="lh" label="水平面光照强度瞬时值(W/㎡)" align="center" width="220"></el-table-column>
        <el-table-column prop="ls" label="散射光照强度瞬时值(W/㎡)" align="center" width="200"></el-table-column>
        <el-table-column prop="la" label="斜面光照强度瞬时值(W/㎡)" align="center" width="200"></el-table-column>
        <el-table-column prop="lhd" label="水平面光照日累计(kWh)" align="center" width="180"></el-table-column>
        <el-table-column prop="lsd" label="散射光照日累计(kWh)" align="center" width="160"></el-table-column>
        <el-table-column prop="lad" label="斜面光照日累计(kWh)" align="center" width="160"></el-table-column>
        <el-table-column prop="tm" label="组件温度(℃)" align="center" width="120"></el-table-column>
        <el-table-column prop="ta" label="环境温度(℃)" align="center" width="120"></el-table-column>
        <el-table-column prop="ws" label="风速(m/s)" align="center" width="120"></el-table-column>
        <el-table-column prop="wd" label="风向(°)" align="center" width="120"></el-table-column>
        <el-table-column prop="h2o" label="湿度(%)" align="center" width="120"></el-table-column>
        <el-table-column prop="p" label="气压(kPa)" align="center" width="120"></el-table-column>
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
