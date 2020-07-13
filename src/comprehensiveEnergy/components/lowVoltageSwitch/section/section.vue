<template>
    <div class="child-section">
        <div class="left-con">
            <sectionItem
            icon='iconwendu'
            name='环境温度'
            units='℃'
            :value='!ceDeviceMonitorRtSingleType.res.data[27].ata && ceDeviceMonitorRtSingleType.res.data[27].ata != 0 ? "--" : ceDeviceMonitorRtSingleType.res.data[27].ata'
            color='#52D6FF'
            ></sectionItem>
            <sectionItem
            icon='iconshidu'
            name='环境湿度'
            units='%'
            :value='!ceDeviceMonitorRtSingleType.res.data[27].hum && ceDeviceMonitorRtSingleType.res.data[27].hum != 0 ? "--" : ceDeviceMonitorRtSingleType.res.data[27].hum'
            color='#52D6FF'
            ></sectionItem>
        </div>
        <div class="right-con">
            <div class="block-con">
                <block
                status='正常'
                :value='!ceDeviceMonitorRtSingleType.res.data[27].LRunCount && ceDeviceMonitorRtSingleType.res.data[27].LRunCount != 0 ? "--" : ceDeviceMonitorRtSingleType.res.data[27].LRunCount'
                backgroundColor='#5DB66C'
                backgroundColorOpacity='rgba(93, 182, 108, .2)'
                >
                </block>
            </div>
            <div class="block-con">
                <block
                status='预警'
                :value='!ceDeviceMonitorRtSingleType.res.data[27].LWarnCount && ceDeviceMonitorRtSingleType.res.data[27].LWarnCount != 0 ? "--" : ceDeviceMonitorRtSingleType.res.data[27].LWarnCount'
                backgroundColor='#D69D65'
                backgroundColorOpacity='rgba(214, 157, 101, .2)'
                >
                </block>
            </div>
            <div class="block-con">
                <block
                status='报警'
                :value='!ceDeviceMonitorRtSingleType.res.data[27].LAlarmCount && ceDeviceMonitorRtSingleType.res.data[27].LAlarmCount != 0 ? "--" : ceDeviceMonitorRtSingleType.res.data[27].LAlarmCount'
                backgroundColor='#C95B5B'
                backgroundColorOpacity='rgba(201, 91, 91, .2)'
                >
                </block>
            </div>
            <div class="block-con">
                <block
                status='离线'
                :value='!ceDeviceMonitorRtSingleType.res.data[27].LOfflineCount && ceDeviceMonitorRtSingleType.res.data[27].LOfflineCount != 0 ? "--" : ceDeviceMonitorRtSingleType.res.data[27].LOfflineCount'
                backgroundColor='#B3B3B3'
                backgroundColorOpacity='rgba(179, 179, 179, .2)'
                >
                </block>
            </div>
        </div>
    </div>
</template>

<script>
import sectionItem from './sectionItem'
import block from './block'
import { api＿ceDeviceMonitorRtSingleType } from '@comprehensiveEnergy/request/api'

export default {
    components: {
        sectionItem,
        block
    },
    filters: {
        nullJudge: function (value) {
            if (!value) return '--'
        }
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
    height: 177px;
    @include c(background-color, $bg_c7);
    padding-left: 60px;
    display: flex;
    .left-con {
        float: left;
        padding-top: 22px;
        padding-right: 0px;
        flex: 0 0 252px;
    }
    .right-con {
        flex: auto;
        // float: right;
        display: flex;
        justify-content: space-around;
        padding: 42px 0;
        .block-con {
            // width: 25%;
            width: 128px;
            height: 92px;
            float: left;
            // margin: 0 22px;
        }
    }
}
</style>
