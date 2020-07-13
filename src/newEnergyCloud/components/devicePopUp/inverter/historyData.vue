<template>
    <history-data :device="device">
        <el-table-column prop="dtime" label="时间" align="center" width="160" fixed :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue*1000).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
        <el-table-column prop="dcu" label="DC电压(V)" align="center" width="120"></el-table-column>
        <el-table-column prop="dcu1" label="DC电压1(V)" align="center" width="120"></el-table-column>
        <el-table-column prop="dcu2" label="DC电压2(V)" align="center" width="120"></el-table-column>
        <el-table-column prop="dcu3" label="DC电压3(V)" align="center" width="120"></el-table-column>
        <el-table-column prop="dcc" label="DC电流(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="dcc1" label="DC电流1(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="dcc2" label="DC电流2(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="dcc3" label="DC电流3(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="dcp" label="DC功率(kW)" align="center" width="120"></el-table-column>
        <el-table-column prop="acu" label="AC电压(V)" align="center" width="120"></el-table-column>
        <el-table-column prop="acua" label="A相电压(V)" align="center" width="120"></el-table-column>
        <el-table-column prop="acub" label="B相电压(V)" align="center" width="120"></el-table-column>
        <el-table-column prop="acuc" label="C相电压(V)" align="center" width="120"></el-table-column>
        <el-table-column prop="acc" label="AC电流(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="acca" label="A相电流(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="accb" label="B相电流(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="accc" label="C相电流(A)" align="center" width="120"></el-table-column>
        <el-table-column prop="acp" label="AC功率(kW)" align="center" width="120"></el-table-column>
        <el-table-column prop="t" label="温度(℃)" align="center" width="120"></el-table-column>
        <el-table-column prop="ef" label="效率(%)" align="center" width="120"></el-table-column>
        <el-table-column prop="f" label="频率(Hz)" align="center" width="120"></el-table-column>
        <el-table-column prop="pf" label="功率因数" align="center" width="120"></el-table-column>
        <el-table-column prop="dw" label="日发电量(度)" align="center" width="120"></el-table-column>
        <el-table-column prop="tw" label="总发电量(度)" align="center" width="120"></el-table-column>
        <el-table-column v-for="(v, index) in (new Array(32).fill('c'))" :key="index" width="60"
            :prop="v + (index + 1)" :label="(index + 1).toString()" align="center">
        </el-table-column>
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
