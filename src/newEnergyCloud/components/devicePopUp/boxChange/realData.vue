<template>
    <div class="real-data clearfix" v-loading="!getSingleRealDataBBoxChange.resNumber && getSingleRealDataBBoxChange.loading">
        <div class="dtime">{{deviceRunStatus.res.body.dtime ? new Date(deviceRunStatus.res.body.dtime * 1000).Format('yyyy-MM-dd hh:mm:ss') : '-'}}</div>
        <el-alert
            v-if="deviceRunStatus.res.body.comm"
            :title="(deviceRunStatus.res.body.statusDesc || (deviceRunStatus.res.body.comm === 2 ? '初始化' : '')) + (deviceRunStatus.res.body.dtime ? ('。最后更新时间：' + new Date(deviceRunStatus.res.body.dtime * 1000).Format('yyyy-MM-dd hh:mm:ss')) : '')"
            type="error"
            effect="dark">
        </el-alert>
        <real-params :data="getSingleRealDataBBoxChange.res.data"></real-params>
        <el-table
            v-if="tableList.length"
            border
            :data="tableList"
            row-class-name="row-style"
            cell-class-name="cell-style"
            header-row-class-name="header-row-style"
            header-cell-class-name="header-cell-style"
            style="width: 100%">
            <el-table-column prop="c1" label="" align="left" width="120"></el-table-column>
            <el-table-column prop="c2" label="有功功率（kW）" align="left" width="120"></el-table-column>
            <el-table-column prop="c3" label="无功功率（kVar）" align="left" width="120"></el-table-column>
            <el-table-column prop="c4" label="电流（A）" align="left" width="120"></el-table-column>
            <el-table-column prop="c5" label="电压（V）" align="left" width="120"></el-table-column>
        </el-table>
        <!-- <real-chart :data="getSingleRealDataBBoxChange.res.data"></real-chart> -->
        <alarm-info st-class="01" :data="device"></alarm-info>
    </div>
</template>

<script>
import {api＿deviceRunStatus, api＿getSingleRealDataBBoxChange} from '@newEnergyCloud/request/api'
import realParams from './realParams'
// import realChart from './realChart'
import alarmInfo from '../comm/alarm'
import {Alert} from 'element-ui'
export default {
    components: {
        realParams,
        // realChart,
        alarmInfo,
        ElAlert: Alert
    },
    props: {
        device: {
            type: Object
        }
    },
    data () {
        const {type, sn, id, stid} = this.device
        return {
            deviceRunStatus: api＿deviceRunStatus({
                data: {
                    type,
                    eqid: sn,
                    stid
                },
                res: {
                    body: {}
                }
            }),
            getSingleRealDataBBoxChange: api＿getSingleRealDataBBoxChange({
                data: {
                    id,
                    stid,
                    serialnumber: sn
                },
                res: {
                    data: {}
                }
            }).subscribe(this.setData),
            timer: null,
            tableList: []
        }
    },
    created () {
        this.timer = setInterval(() => {
            this.getSingleRealDataBBoxChange.getData()
            this.deviceRunStatus.getData()
        }, 30000)
    },
    methods: {
        setData (res) {
            this.tableList = [1, 2].map(v => ['a', 'b', 'c'].map(xv => ({
                c1: v + xv.toLocaleUpperCase(),
                c2: res.data['p' + xv + v],
                c3: res.data['q' + xv + v],
                c4: res.data['c' + xv + v],
                c5: res.data['u' + xv + v]
            }))).reduce((a, b) => a.concat(b), [])
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss">
.box-change .real-data {
    @import '@comm/assets/themes/table/t3.scss';
}
</style>

<style lang="scss" scoped>
.real-data {
    padding: 0 42px;
    position: relative;
    padding-bottom: 20px;

    .dtime {
        position: absolute;
        right: 42px;
        top: 0;
        line-height: 2;
    }

    .el-alert {
        margin-top: 5px;
    }
}
</style>
