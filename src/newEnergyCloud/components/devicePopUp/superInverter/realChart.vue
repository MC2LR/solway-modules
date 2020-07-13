<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="white-bg m90">
                    <div class="chart-top" v-if="data.acc_kw">
                        <span>AC电压：</span>
                        <span>{{data.acu.toFixed(2)}}(V)</span>
                    </div>
                    <com-pointer
                        v-if="data.acc_kw"
                        :width="[ucp[0].A1 * 100 + '%', (ucp[0].A2 - ucp[0].A1) * 100 + '%', (1 - ucp[0].A2) * 100 + '%']"
                        :max="ucp[0].A3"
                        :value="data.acu / ucp[0].A3 * 100">
                    </com-pointer>
                    <el-row class="chart-bottom" v-if="data.acc_kw">
                        <el-col class="text-left" :span="8">ACU1：{{data.acua.toFixed(2)}}</el-col>
                        <el-col class="text-center" :span="8">ACU2：{{data.acub.toFixed(2)}}</el-col>
                        <el-col class="text-right" :span="8">ACU3：{{data.acuc.toFixed(2)}}</el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="white-bg m90">
                    <div class="chart-top" v-if="data.acc_kw">
                        <span>AC电流：</span>
                        <span>{{data.acc.toFixed(2)}}(A)</span>
                    </div>
                    <com-pointer
                        v-if="data.acc_kw"
                        :width="[ucp[1].A1 * 100 + '%', (ucp[1].A2 - ucp[1].A1) * 100 + '%', (1 - ucp[1].A2) * 100 + '%']"
                        :max="ucp[1].A3"
                        :value="data.acc / ucp[1].A3 * 100">
                    </com-pointer>
                    <el-row class="chart-bottom" v-if="data.acc_kw">
                        <el-col class="text-left" :span="8">ACI1：{{data.acca.toFixed(2)}}</el-col>
                        <el-col class="text-center" :span="8">ACI2：{{data.accb.toFixed(2)}}</el-col>
                        <el-col class="text-right" :span="8">ACI3：{{data.accc.toFixed(2)}}</el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="white-bg m90">
                    <div class="chart-top" v-if="data.acc_kw">
                        <span>AC功率：</span>
                        <span>{{data.acp.toFixed(2)}}(kW)</span>
                    </div>
                    <com-pointer
                        v-if="data.acc_kw"
                        :width="[ucp[2].A1 * 100 + '%', (ucp[2].A2 - ucp[2].A1) * 100 + '%', (1 - ucp[2].A2) * 100 + '%']"
                        :max="ucp[2].A3"
                        :value="data.acp / ucp[2].A3 * 100">
                    </com-pointer>
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
                    <com-pointer
                        v-if="data.acc_kw"
                        :width="[ucp[3].A1 * 100 + '%', (ucp[3].A2 - ucp[3].A1) * 100 + '%', (1 - ucp[3].A2) * 100 + '%']"
                        :max="ucp[3].A3"
                        :value="data.dcu / ucp[3].A3 * 100">
                    </com-pointer>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="white-bg">
                    <div class="chart-top" v-if="data.acc_kw">
                        <span>DC电流：</span>
                        <span>{{data.dcc.toFixed(2)}}(A)</span>
                    </div>
                    <com-pointer
                        v-if="data.acc_kw"
                        :width="[ucp[4].A1 * 100 + '%', (ucp[4].A2 - ucp[4].A1) * 100 + '%', (1 - ucp[4].A2) * 100 + '%']"
                        :max="ucp[4].A3"
                        :value="data.dcc / ucp[4].A3 * 100">
                    </com-pointer>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="white-bg" v-if="data.acc_kw">
                    <div class="chart-top">
                        <span>DC功率：</span>
                        <span>{{data.dcp.toFixed(2)}}(kW)</span>
                    </div>
                    <com-pointer
                        v-if="data.acc_kw"
                        :width="[ucp[5].A1 * 100 + '%', (ucp[5].A2 - ucp[5].A1) * 100 + '%', (1 - ucp[5].A2) * 100 + '%']"
                        :max="ucp[5].A3"
                        :value="data.dcp / ucp[5].A3 * 100">
                    </com-pointer>
                </div>
            </el-col>
        </el-row>
        <el-row class="margin-top" v-if="data.acc_kw">
            <el-col :span="3">DC电压(1-16)：</el-col>
            <el-col v-for="(item, index) in 16" :key="item" :span="1" :style="{width: '5.4%'}">{{data['dcu' + (index + 1)].toFixed(2)}}</el-col>
        </el-row>
        <el-row class="margin-top" v-if="data.acc_kw">
            <el-col :span="3">DC电流(1-16)：</el-col>
            <el-col v-for="(item, index) in 16" :key="item" :span="1" :style="{width: '5.4%'}">{{data['dcc' + (index + 1)].toFixed(2)}}</el-col>
        </el-row>
    </div>
</template>

<script>
import gaugeChart from '../inverter/chart'
import ComPointer from './pointer'
export default {
    components: {
        gaugeChart,
        ComPointer
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
    min-height: 70px;
    padding: 0 1em;

    &.m90 {
        min-height: 90px;
    }

    .chart-bottom {
        position: absolute;
        bottom: 0;
        left: 1em;
        right: 1em;
        line-height: 2.5;
    }

    .chart-top {
        line-height: 2.5;
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
