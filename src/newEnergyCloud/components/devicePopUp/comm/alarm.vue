<template>
    <div class="alarm-info">
        <div class="title">告警信息</div>
        <div class="row">
            <el-button v-for="item in faultList" :key="item.code" :type="item.fault ? 'danger' : 'primary'">{{item.name}}</el-button>
        </div>
    </div>
</template>

<script>
import {api＿deviceFaultCode, api＿protocolCodes} from '@newEnergyCloud/request/api'
export default {
    props: {
        data: {
            type: Object
        },
        stClass: {
            type: String
        }
    },
    data () {
        const {stid, sn, protocolId} = this.data
        return {
            deviceFaultCode: api＿deviceFaultCode({
                data: {
                    stid,
                    eqid: sn,
                    stcls: this.stClass
                },
                res: {
                    body: {
                        faultCodes: ''
                    }
                }
            }).subscribe(this.setData),
            protocolCodes: api＿protocolCodes({
                data: {
                    protocolId
                },
                res: {
                    body: []
                }
            }).subscribe(this.setData),
            faultList: [],
            timer: null
        }
    },
    created () {
        this.timer = setInterval(() => this.deviceFaultCode.getData(), 30000)
    },
    methods: {
        setData () {
            if (!this.deviceFaultCode.resNumber || !this.protocolCodes.resNumber) return
            this.faultList = this.protocolCodes.res.body.map(protocolCode => ({
                ...protocolCode,
                fault: ((this.deviceFaultCode.res.body || {}).faultCodes || '').split(',').some(faultCode => protocolCode.code.split(',').filter(v => v).includes(faultCode))
            }))
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.alarm-info {
    margin-top: 20px;

    .title {
        font-size: 16px;
    }

    .row {
        margin-top: 10px;

        .el-button {
            width: 370px;
            margin: 5px;
        }
    }

}
</style>
