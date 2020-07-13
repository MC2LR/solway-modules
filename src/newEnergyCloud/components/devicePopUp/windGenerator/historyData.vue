<template>
    <history-data :device="device">
        <el-table-column prop="dtime" label="时间" align="center" width="160" fixed :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue*1000).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
        <el-table-column prop="wdspd" label="机舱外风速(m/s)" align="center" width="150"></el-table-column>
        <el-table-column prop="extmp" label="机舱外温度(℃)" align="center" width="120"></el-table-column>
        <el-table-column prop="intltmp" label="机舱内温度(℃)" align="center" width="150"></el-table-column>
        <el-table-column prop="nacdirang" label="风向夹角(度)" align="center" width="120"></el-table-column>
        <el-table-column prop="rotspd" label="叶轮转速(rpm)" align="center" width="160"></el-table-column>
        <el-table-column prop="ptangvalbl1" label="叶片1桨距角" align="center" width="160"></el-table-column>
        <el-table-column prop="ptangvalbl2" label="叶片2桨距角" align="center" width="160"></el-table-column>
        <el-table-column prop="ptangvalbl3" label="叶片3桨距角" align="center" width="160"></el-table-column>
        <el-table-column prop="spd" label="发电机转速(rpm)" align="center" width="150"></el-table-column>
        <el-table-column prop="w" label="有功功率(kW)" align="center" width="120"></el-table-column>
        <el-table-column prop="var" label="无功功率(kW)" align="center" width="120"></el-table-column>
        <el-table-column prop="gntoptmpsta" label="发电机最高绕组温度(℃)" align="center" width="220"></el-table-column>
        <el-table-column prop="hz" label="频率值(Hz)" align="center" width="120"></el-table-column>
        <el-table-column prop="gripf" label="功率因数" align="center" width="120"></el-table-column>
        <el-table-column prop="trmtmpentgbxdrv" label="齿轮箱高速轴驱动端轴承温度(℃)" align="center" width="240"></el-table-column>
        <el-table-column prop="trmtmpentgbxnondrv" label="齿轮箱高速轴非驱动端轴承温度(℃)" align="center" width="260"></el-table-column>
        <el-table-column prop="trmtmpgbxoil" label="齿轮箱油温(℃)" align="center" width="120"></el-table-column>
        <el-table-column prop="ywdir" label="偏航角度(度)" align="center" width="120"></el-table-column>
        <el-table-column prop="daykwh" label="有功发电量日计(kWh)" align="center" width="160"></el-table-column>
        <el-table-column prop="totkwh" label="有功发电量总计(kWh)" align="center" width="160"></el-table-column>
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
