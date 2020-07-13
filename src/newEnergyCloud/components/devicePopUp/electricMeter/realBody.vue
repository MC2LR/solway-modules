<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <div>A相电压：{{data.ua}}V</div>
        </el-col>
        <el-col :span="8">
            <div>B相电压：{{data.ub}}V</div>
        </el-col>
        <el-col :span="8">
            <div>C相电压：{{data.uc}}V</div>
        </el-col>
        <el-col :span="8">
            <div>A相功率：{{data.pa}}kW</div>
        </el-col>
        <el-col :span="8">
            <div>B相功率：{{data.pb}}kW</div>
        </el-col>
        <el-col :span="8">
            <div>C相功率：{{data.pc}}kW</div>
        </el-col>
        <el-col :span="8">
            <div>A相电流：{{data.ia}}A</div>
        </el-col>
        <el-col :span="8">
            <div>B相电流：{{data.ib}}A</div>
        </el-col>
        <el-col :span="8">
            <div>C相电流：{{data.ic}}A</div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default () {
                return {}
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.el-row {
    .el-col {
        margin-top: 20px;

        > div {
            background-color: #fff;
            height: 50px;
            line-height: 50px;
            padding-left: 1em;
        }
    }
}
</style>
