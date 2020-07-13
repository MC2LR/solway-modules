<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="white-bg">
                    <gauge-chart
                        :rate="ucp[0]"
                        :value="data.acu"
                        unit="V"
                        name="电压"
                        fullName="AC电压(V)">
                    </gauge-chart>
                    <el-row class="chart-bottom" v-if="data.acc_kw">
                        <el-col class="text-left" :span="8">ACU1：{{data.acua.toFixed(2)}}</el-col>
                        <el-col class="text-center" :span="8">ACU2：{{data.acub.toFixed(2)}}</el-col>
                        <el-col class="text-right" :span="8">ACU3：{{data.acuc.toFixed(2)}}</el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="white-bg">
                    <gauge-chart
                        :rate="ucp[1]"
                        :value="data.acc"
                        unit="A"
                        name="电流"
                        fullName="AC电流(A)">
                    </gauge-chart>
                    <el-row class="chart-bottom" v-if="data.acc_kw">
                        <el-col class="text-left" :span="8">ACI1：{{data.acca.toFixed(2)}}</el-col>
                        <el-col class="text-center" :span="8">ACI2：{{data.accb.toFixed(2)}}</el-col>
                        <el-col class="text-right" :span="8">ACI3：{{data.accc.toFixed(2)}}</el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="white-bg">
                    <gauge-chart
                        :rate="ucp[2]"
                        :value="data.acp"
                        unit="kW"
                        name="功率"
                        fullName="AC功率(kW)">
                    </gauge-chart>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="margin-top">
            <el-col :span="8">
                <div class="white-bg">
                    <div class="chart-top" v-if="data.acc_kw">
                        <span>DC电压：</span>
                        <span>{{data.dcu.toFixed(2)}}(V)</span>
                    </div>
                    <el-row class="chart-bottom" v-if="data.acc_kw">
                        <el-col class="text-left" :span="8">DCU1：{{data.dcu1.toFixed(2)}}</el-col>
                        <el-col class="text-center" :span="8">DCU2：{{data.dcu2.toFixed(2)}}</el-col>
                        <el-col class="text-right" :span="8">DCU3：{{data.dcu3.toFixed(2)}}</el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="white-bg">
                    <div class="chart-top" v-if="data.acc_kw">
                        <span>DC电流：</span>
                        <span>{{data.dcc.toFixed(2)}}(A)</span>
                    </div>
                    <el-row class="chart-bottom" v-if="data.acc_kw">
                        <el-col class="text-left" :span="8">DCI1：{{data.dcc1.toFixed(2)}}</el-col>
                        <el-col class="text-center" :span="8">DCI2：{{data.dcc2.toFixed(2)}}</el-col>
                        <el-col class="text-right" :span="8">DCI3：{{data.dcc3.toFixed(2)}}</el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="white-bg" v-if="data.acc_kw">
                    <div class="chart-top">
                        <span>DC功率：</span>
                        <span>{{data.dcp.toFixed(2)}}(kW)</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import gaugeChart from '../inverter/chart'
export default {
    components: {
        gaugeChart
    },
    props: {
        data: {
            type: Object
        },
        ucp: {
            type: Array
        }
    }
}
</script>

<style lang="scss" scoped>
.margin-top {
    margin-top: 10px;
}
.white-bg {
    background-color: #fff;
    position: relative;
    min-height: 60px;

    .chart-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        line-height: 2.5;
        padding: 0 1em;
    }

    .chart-top {
        padding: 0 1em;
        line-height: 2.5;
        text-align: center;
    }

    .text-left {
        text-align: left;
    }

    .text-center {
        text-align: center;
    }

    .text-right {
        text-align: right;
    }
}
</style>
