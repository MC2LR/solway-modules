<template>
    <history-data :device="device">
        <el-table-column prop="dtime" label="时间" align="center" width="160" fixed :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue*1000).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
        <el-table-column prop="pa1" label="绕组1A相有功功率(kW)" align="center" width="120"></el-table-column>
        <el-table-column prop="pb1" label="绕组1B相有功功率(kW)" align="center" width="120"></el-table-column>
        <el-table-column prop="pc1" label="绕组1C相有功功率(kW)" align="center" width="120"></el-table-column>
        <el-table-column prop="qa1" label="绕组1A相无功功率(kVar)" align="center" width="120"></el-table-column>
        <el-table-column prop="qb1" label="绕组1B相无功功率(kVar)" align="center" width="120"></el-table-column>
        <el-table-column prop="qc1" label="绕组1C相无功功率(kVar)" align="center" width="120"></el-table-column>
        <el-table-column prop="ca1" label="绕组1A相电流(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="cb1" label="绕组1B相电流(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="cc1" label="绕组1C相电流(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="ua1" label="绕组1A相电压(V)" align="center" width="120"></el-table-column>
        <el-table-column prop="ub1" label="绕组1B相电压(V)" align="center" width="120"></el-table-column>
        <el-table-column prop="uc1" label="绕组1C相电压(V)" align="center" width="120"></el-table-column>
        <el-table-column prop="f1" label="绕组1频率(Hz)" align="center" width="120"></el-table-column>
        <el-table-column prop="pf1" label="绕组1功率因数" align="center" width="120"></el-table-column>
        <el-table-column prop="w1" label="绕组1电量(kWh)" align="center" width="120"></el-table-column>
        <el-table-column prop="pa2" label="绕组2A相有功功率(kW)" align="center" width="120"></el-table-column>
        <el-table-column prop="pb2" label="绕组2B相有功功率(kW)" align="center" width="120"></el-table-column>
        <el-table-column prop="pc2" label="绕组2C相有功功率(kW)" align="center" width="120"></el-table-column>
        <el-table-column prop="qa2" label="绕组2A相无功功率(kVar)" align="center" width="120"></el-table-column>
        <el-table-column prop="qb2" label="绕组2B相无功功率(kVar)" align="center" width="120"></el-table-column>
        <el-table-column prop="qc2" label="绕组2C相无功功率(kVar)" align="center" width="120"></el-table-column>
        <el-table-column prop="ca2" label="绕组2A相电流(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="cb2" label="绕组2B相电流(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="cc2" label="绕组2C相电流(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="ua2" label="绕组2A相电压(V)" align="center" width="120"></el-table-column>
        <el-table-column prop="ub2" label="绕组2B相电压(V)" align="center" width="120"></el-table-column>
        <el-table-column prop="uc2" label="绕组2C相电压(V)" align="center" width="120"></el-table-column>
        <el-table-column prop="f2" label="绕组2频率(Hz)" align="center" width="120"></el-table-column>
        <el-table-column prop="pf2" label="绕组2功率因数" align="center" width="120"></el-table-column>
        <el-table-column prop="w2" label="绕组2电量(kWh)" align="center" width="120"></el-table-column>
        <el-table-column prop="ta" label="A相温度(℃)" align="center" width="120"></el-table-column>
        <el-table-column prop="tb" label="B相温度(℃)" align="center" width="120"></el-table-column>
        <el-table-column prop="tc" label="C相温度(℃)" align="center" width="120"></el-table-column>
        <el-table-column prop="t" label="温度(℃)" align="center" width="120"></el-table-column>
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
