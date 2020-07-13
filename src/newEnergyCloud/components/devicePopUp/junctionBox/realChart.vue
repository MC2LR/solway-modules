<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="white-bg">
                    <gauge-chart
                        :rate="{A1: 0.2, A2: 0.8, A3: 1000}"
                        :value="data.u"
                        unit="V"
                        name="电压"
                        fullName="电压(V)">
                    </gauge-chart>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="white-bg">
                    <gauge-chart
                        :rate="{A1: 0.2, A2: 0.8, A3: 200}"
                        :value="data.c"
                        unit="A"
                        name="电流"
                        fullName="电流(A)">
                    </gauge-chart>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="white-bg">
                    <gauge-chart
                        :rate="{A1: 0.2, A2: 0.8, A3: 200}"
                        :value="data.p"
                        unit="kW"
                        name="功率"
                        fullName="功率(kW)">
                    </gauge-chart>
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
