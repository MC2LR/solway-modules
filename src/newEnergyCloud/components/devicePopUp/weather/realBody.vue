<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <div>水平面光照强度瞬时值：{{data.lh}}W/㎡</div>
        </el-col>
        <el-col :span="8">
            <div>散射光照强度瞬时值：{{data.ls}}W/㎡</div>
        </el-col>
        <el-col :span="8">
            <div>斜面光照强度瞬时值：{{data.la}}W/㎡</div>
        </el-col>
        <el-col :span="8">
            <div>水平面光照日累计：{{$useful(data.lhd, 0).toFixed(2)}}kWh</div>
        </el-col>
        <el-col :span="8">
            <div>散射光照日累计：{{data.lsd}}kWh</div>
        </el-col>
        <el-col :span="8">
            <div>斜面光照日累计：{{data.lad}}kWh</div>
        </el-col>
        <el-col :span="8">
            <div>组件温度：{{$useful(data.tm, 0).toFixed(2)}}℃</div>
        </el-col>
        <el-col :span="8">
            <div>环境温度：{{$useful(data.ta, 0).toFixed(2)}}℃</div>
        </el-col>
        <el-col :span="8">
            <div>风速：{{data.ws}}m/s</div>
        </el-col>
        <el-col :span="8">
            <div>风向：{{data.wd}}°</div>
        </el-col>
        <el-col :span="8">
            <div>湿度：{{$useful(data.h2o, 0).toFixed(2)}}%</div>
        </el-col>
        <el-col :span="8">
            <div>气压：{{data.p}}kPa</div>
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
