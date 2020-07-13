<template>
    <div class="real-data clearfix">
        <el-alert
            v-if="deviceRunStatus.res.body.comm"
            :title="(deviceRunStatus.res.body.statusDesc || (deviceRunStatus.res.body.comm === 2 ? '初始化' : '')) + (deviceRunStatus.res.body.dtime ? ('。最后更新时间：' + new Date(deviceRunStatus.res.body.dtime * 1000).Format('yyyy-MM-dd hh:mm:ss')) : '')"
            type="error"
            effect="dark">
        </el-alert>
        <div class="dtime">{{deviceRunStatus.res.body.dtime ? new Date(deviceRunStatus.res.body.dtime * 1000).Format('yyyy-MM-dd hh:mm:ss') : '-'}}</div>
        <dir class="handle">
            <span @click="activeId = -9999" :class="{active: activeId === -9999}">风机监控</span>
            <span v-for="item in subSystemList" :key="item.id" @click="activeId = item.id;getSvgData();" :class="{active: activeId === item.id}">{{item.dictName}}</span>
        </dir>
        <iframe-svg class="iframe-svg" v-if="activeId !== -9999" :svgSrc="svgSrc" :svgData="getWindTurbineSubSystemRunData.res.body"></iframe-svg>
        <div v-else class="real-layout clearfix">
            <real-fault :device="device" class="fault-list"></real-fault>
            <real-line :device="device" class="real-line"></real-line>
            <real-param :device="device" :statusDesc="deviceRunStatus.res.body.statusDesc" class="real-param"></real-param>
        </div>
    </div>
</template>

<script>
import {api＿deviceRunStatus, api＿getWindTurbineSubSystem, api＿getWindTurbineSubSystemRunData} from '@newEnergyCloud/request/api'
import {Alert} from 'element-ui'
import RealFault from './realModules/realFault'
import RealLine from './realModules/realLine'
import RealParam from './realModules/realParam'
import IframeSvg from '@newEnergyCloud/pages/iframeSvg/iframe'
export default {
    components: {
        ElAlert: Alert,
        RealFault,
        RealLine,
        RealParam,
        IframeSvg
    },
    props: {
        device: {
            type: Object
        }
    },
    data () {
        const {type, sn, productId, stid} = this.device
        return {
            activeId: -9999,
            getWindTurbineSubSystem: api＿getWindTurbineSubSystem({
                data: {
                    level: 2,
                    productId: productId
                }
            }),
            getWindTurbineSubSystemRunData: api＿getWindTurbineSubSystemRunData({
                later: true
            }),
            deviceRunStatus: api＿deviceRunStatus({
                data: {
                    type,
                    eqid: sn,
                    stid
                },
                res: {
                    body: {}
                }
            })
        }
    },
    computed: {
        subSystemList () {
            return this.getWindTurbineSubSystem.res?.body || []
        },
        dictValue () {
            return this.subSystemList.find(v => v.id === this.activeId).dictValue
        },
        svgSrc () {
            return '/document/svg/wp_device/' + this.device.protocolId + '-' + this.dictValue + '.svg'
        }
    },
    methods: {
        getSvgData () {
            this.getWindTurbineSubSystemRunData.getData({
                deviceId: this.device.id,
                level: 2,
                subId: this.dictValue
            })
        }
    },
    created () {
        this.timer = setInterval(() => {
            if (this.activeId === -9999) this.deviceRunStatus.getData()
            else this.getSvgData()
        }, 30 * 1000)
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.real-data {
    padding: 0 30px;
    padding-bottom: 30px;

    .dtime {
        float: left;
        line-height: 50px;
        font-size: 12px;
    }

    .handle {
        float: right;

        span {
            cursor: pointer;
            margin-left: 2em;

            &.active {
                @include page_c(color, $text_c1);
            }
        }
    }

    .real-layout {
        .fault-list {
            width: 500px;
            height: 300px;
            float: left;
            background-color: #fff;
        }
        .real-line {
            float: right;
            width: calc(100% - 510px);
            height: 300px;
            background-color: #fff;
        }
        .real-param {
            float: left;
            width: 100%;
            height: 300px;
            background-color: #fff;
            margin-top: 10px;
        }
    }

    .iframe-svg {
        width: 100%;
        height: 400px;
        background-color: #fff;
    }
}
</style>
