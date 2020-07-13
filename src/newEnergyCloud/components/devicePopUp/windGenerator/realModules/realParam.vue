<template>
    <div class="real-param">
        <div class="base-info">
            <div>
                <span>设备名称：</span>
                <span>{{device.name}}</span>
            </div>
            <div>
                <span>设备厂商：</span>
                <span>{{device.manufName}}</span>
            </div>
            <div>
                <span>产品型号：</span>
                <span>{{device.productName}}</span>
            </div>
            <div>
                <span>状态：</span>
                <span>{{statusDesc}}</span>
            </div>
        </div>
        <div class="real-data" v-loading="selectWindTurbineSubSystemRunData.loading && selectWindTurbineSubSystemRunData.resNumber === 0">
            <div class="data-item" v-for="item in realData" :key="item.code">{{item.name_cn}}: {{item.v + item.unit}}</div>
        </div>
    </div>
</template>

<script>
import {api＿selectWindTurbineSubSystemRunData} from '@newEnergyCloud/request/api'
export default {
    props: {
        statusDesc: {
            type: String
        },
        device: {
            type: Object
        }
    },
    data () {
        return {
            selectWindTurbineSubSystemRunData: api＿selectWindTurbineSubSystemRunData({
                data: {
                    deviceId: this.device.id,
                    level: 2,
                    stid: this.device.stid
                }
            })
        }
    },
    computed: {
        realData () {
            return this.selectWindTurbineSubSystemRunData.res?.body || []
        }
    },
    created () {
        this.timer = setInterval(() => this.selectWindTurbineSubSystemRunData.getData(), 30 * 1000)
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.real-param {
    .base-info {
        width: 200px;
        height: 100%;
        float: left;
        padding: 1em;
        line-height: 2;
    }

    .real-data {
        width: calc(100% - 200px);
        float: right;
        height: 100%;
        overflow: auto;

        .data-item {
            margin: 0.5em 0;
            width: 33%;
            float: left;
            border-left: 1px solid #ccc;
            padding-left: 1em;
        }
    }
}
</style>
