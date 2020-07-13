<template>
    <div class="child-section">
        <div class="block-con">
            <child-block
            icon='iconwendu'
            name='温度'
            units='℃'
            :value='!ceDeviceMonitorRtSingleType.res.data[27].ata && ceDeviceMonitorRtSingleType.res.data[27].ata != 0 ? "--" : ceDeviceMonitorRtSingleType.res.data[27].ata'
            background='linear-gradient(-48deg,rgba(134,95,239,1),rgba(217,186,251,1))'
            right='-20'
            top='-10'
            ></child-block>
        </div>
        <div class="block-con">
            <child-block
            icon='iconshidu'
            name='湿度'
            units='%'
            :value='!ceDeviceMonitorRtSingleType.res.data[27].hum && ceDeviceMonitorRtSingleType.res.data[27].hum != 0 ? "--" : ceDeviceMonitorRtSingleType.res.data[27].hum'
            background='linear-gradient(-48deg,rgba(33,140,252,1),rgba(49,209,254,1))'
            right='-40'
            top='-10'
            mLsIcon='10'
            ></child-block>
        </div>
        <div class="block-con">
            <child-block
            icon='iconicon-'
            name='浮漂'
            :value='floatStatus'
            background='linear-gradient(-48deg,rgba(253,121,235,1),rgba(254,194,246,1))'
            right='-48'
            top='-20'
            marginLeft='10'
            mLsIcon='20'
            ></child-block>
        </div>
        <div class="block-con">
            <child-block
            icon='iconyanwuchuanganqi1'
            name='烟雾'
            :value='smokeStatus'
            background='linear-gradient(-48deg,rgba(252,70,117,1),rgba(255,191,208,1))'
            right='-55'
            top='0'
            marginLeft='10'
            mLsIcon='20'
            ></child-block>
        </div>
    </div>
</template>

<script>
import childBlock from './block'
import { api＿ceDeviceMonitorRtSingleType } from '@comprehensiveEnergy/request/api'

export default {
    components: {
        childBlock
    },
    data () {
        return {
            ceDeviceMonitorRtSingleType: api＿ceDeviceMonitorRtSingleType({
                later: true,
                res: {
                    data: {
                        27: {}
                    }
                }
            }),
            time: null
        }
    },
    computed: {
        floatStatus: function () {
             return this.ceDeviceMonitorRtSingleType.res.data[27].floatStatus === '00' ? '正常' : !this.ceDeviceMonitorRtSingleType.res.data[27].floatStatus ? '--' : '异常'
        },
        smokeStatus: function () {
             return this.ceDeviceMonitorRtSingleType.res.data[27].smokeStatus === '00' ? '正常' : !this.ceDeviceMonitorRtSingleType.res.data[27].smokeStatus ? '--' : '异常'
        }
    },
    mounted () {
        this.getStatusData()
        this.time = setInterval(() => {
            this.getStatusData()
        }, this.$store.state.stationMonitoring.dataInterval)
    },
    methods: {
        getStatusData () {
            this.ceDeviceMonitorRtSingleType.getData({type: 27})
        }
    },
    beforeDestroy () {
        clearInterval(this.time)
    }
}
</script>

<style lang="scss" scoped>
.child-section {
    height: 165px;
    @include c(background-color, $bg_c7);
    padding: 23px 0;
    .block-con {
        float: left;
        width: 25%;
        height: 100%;
        padding: 0 21px;
    }
}
</style>
