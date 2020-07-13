<template>
    <history-data :device="device">
        <el-table-column prop="dtime" label="时间" align="center" width="160" fixed :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue*1000).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
        <el-table-column prop="sh1" label="测点1高度" align="center" width="140"></el-table-column>
        <el-table-column prop="ta1" label="测点1环境温度(℃)" align="center" width="160"></el-table-column>
        <el-table-column prop="h2o1" label="测点1湿度(%)" align="center" width="120"></el-table-column>
        <el-table-column prop="p1" label="测点1压力" align="center" width="120"></el-table-column>
        <el-table-column prop="ws1" label="测点1风速(m/s)" align="center" width="160"></el-table-column>
        <el-table-column prop="wsa1" label="测点1风速均值(m/s)" align="center" width="180"></el-table-column>
        <el-table-column prop="wd1" label="测点1风向(度)" align="center" width="120"></el-table-column>
        <el-table-column prop="sh2" label="测点2高度" align="center" width="120"></el-table-column>
        <el-table-column prop="ta2" label="测点2环境温度(℃)" align="center" width="140"></el-table-column>
        <el-table-column prop="h2o2" label="测点2湿度(%)" align="center" width="120"></el-table-column>
        <el-table-column prop="p2" label="测点2压力" align="center" width="120"></el-table-column>
        <el-table-column prop="ws2" label="测点2风速(m/s)" align="center" width="160"></el-table-column>
        <el-table-column prop="wsa2" label="测点2风速均值(m/s)" align="center" width="180"></el-table-column>
        <el-table-column prop="wd2" label="测点2风向(度)" align="center" width="120"></el-table-column>
        <el-table-column prop="sh3" label="测点3测点高度" align="center" width="140"></el-table-column>
        <el-table-column prop="ta3" label="测点3环境温度(℃)" align="center" width="180"></el-table-column>
        <el-table-column prop="h2o3" label="测点3湿度(%)" align="center" width="120"></el-table-column>
        <el-table-column prop="p3" label="测点3压力" align="center" width="120"></el-table-column>
        <el-table-column prop="ws3" label="测点3风速(m/s)" align="center" width="160"></el-table-column>
        <el-table-column prop="wsa3" label="测点3风速均值(m/s)" align="center" width="170"></el-table-column>
        <el-table-column prop="wd3" label="测点3风向(度)" align="center" width="120"></el-table-column>
        <el-table-column prop="sh4" label="测点4高度" align="center" width="120"></el-table-column>
        <el-table-column prop="ta4" label="测点4环境温度(℃)" align="center" width="160"></el-table-column>
        <el-table-column prop="h2o4" label="测点4湿度(%)" align="center" width="140"></el-table-column>
        <el-table-column prop="p4" label="测点4压力" align="center" width="120"></el-table-column>
        <el-table-column prop="ws4" label="测点4风速(m/s)" align="center" width="140"></el-table-column>
        <el-table-column prop="wsa4" label="测点4风速均值(m/s)" align="center" width="180"></el-table-column>
        <el-table-column prop="wd4" label="测点4风向(度)" align="center" width="120"></el-table-column>
        <el-table-column prop="sh5" label="测点5测点高度" align="center" width="120"></el-table-column>
        <el-table-column prop="ta5" label="测点5环境温度(℃)" align="center" width="140"></el-table-column>
        <el-table-column prop="h2o5" label="测点5湿度(%)" align="center" width="120"></el-table-column>
        <el-table-column prop="p5" label="测点5压力" align="center" width="120"></el-table-column>
        <el-table-column prop="ws5" label="测点5风速(m/s)" align="center" width="140"></el-table-column>
        <el-table-column prop="wsa5" label="测点5风速均值(m/s)" align="center" width="160"></el-table-column>
        <el-table-column prop="wd5" label="测点5风向(度)" align="center" width="120"></el-table-column>
        <el-table-column prop="sh6" label="测点6测点高度" align="center" width="120"></el-table-column>
        <el-table-column prop="ta6" label="测点6环境温度(℃)" align="center" width="150"></el-table-column>
        <el-table-column prop="h2o6" label="测点6湿度(%)" align="center" width="120"></el-table-column>
        <el-table-column prop="p6" label="测点6压力" align="center" width="120"></el-table-column>
        <el-table-column prop="ws6" label="测点6风速(m/s)" align="center" width="140"></el-table-column>
        <el-table-column prop="wsa6" label="测点6风速均值(m/s)" align="center" width="160"></el-table-column>
        <el-table-column prop="wd6" label="测点6风向(度)" align="center" width="120"></el-table-column>
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
