<template>
    <div class="real-data clearfix" v-loading="!getSingleRealDataBJunction.resNumber && getSingleRealDataBJunction.loading">
        <div class="dtime">{{deviceRunStatus.res.body.dtime ? new Date(deviceRunStatus.res.body.dtime * 1000).Format('yyyy-MM-dd hh:mm:ss') : '-'}}</div>
        <el-alert
            v-if="deviceRunStatus.res.body.comm"
            :title="(deviceRunStatus.res.body.statusDesc || (deviceRunStatus.res.body.comm === 2 ? '初始化' : '')) + (deviceRunStatus.res.body.dtime ? ('。最后更新时间：' + new Date(deviceRunStatus.res.body.dtime * 1000).Format('yyyy-MM-dd hh:mm:ss')) : '')"
            type="error"
            effect="dark">
        </el-alert>
        <real-params :data="getSingleRealDataBJunction.res.body"></real-params>
        <real-chart :data="getSingleRealDataBJunction.res.body"></real-chart>
        <group-string :data="getSingleRealDataBJunction.res.body"></group-string>
        <alarm-info st-class="01" :data="device"></alarm-info>
    </div>
</template>

<script>
import {api＿deviceRunStatus, api＿getSingleRealDataBJunction} from '@newEnergyCloud/request/api'
import realParams from './realParams'
import realChart from './realChart'
import groupString from '../inverter/groupString'
import alarmInfo from '../comm/alarm'
import {Alert} from 'element-ui'
export default {
    components: {
        realParams,
        realChart,
        groupString,
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
            getSingleRealDataBJunction: api＿getSingleRealDataBJunction({
                data: {
                    id,
                    stid,
                    serialnumber: sn
                },
                res: {
                    body: {}
                }
            }).subscribe(this.setData),
            timer: null
        }
    },
    created () {
        this.timer = setInterval(() => {
            this.getSingleRealDataBJunction.getData()
            this.deviceRunStatus.getData()
        }, 30000)
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

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
