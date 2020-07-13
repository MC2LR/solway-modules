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
                :value='!ceDeviceMonitorRtSingleType.res.data[27].HRunCount && ceDeviceMonitorRtSingleType.res.data[27].HRunCount != 0 ? "--" : ceDeviceMonitorRtSingleType.res.data[27].HRunCount'
                backgroundColor='#5DB66C'
                backgroundColorOpacity='rgba(93, 182, 108, .2)'
                >
                </block>
            </div>
            <div class="block-con">
                <block
                status='预警'
                :value='!ceDeviceMonitorRtSingleType.res.data[27].HWarnCount && ceDeviceMonitorRtSingleType.res.data[27].HWarnCount != 0 ? "--" : ceDeviceMonitorRtSingleType.res.data[27].HWarnCount'
                backgroundColor='#D69D65'
                backgroundColorOpacity='rgba(214, 157, 101, .2)'
                >
                </block>
            </div>
            <div class="block-con">
                <block
                status='报警'
                :value='!ceDeviceMonitorRtSingleType.res.data[27].HAlarmCount && ceDeviceMonitorRtSingleType.res.data[27].HAlarmCount != 0 ? "--" : ceDeviceMonitorRtSingleType.res.data[27].HAlarmCount'
                backgroundColor='#C95B5B'
                backgroundColorOpacity='rgba(201, 91, 91, .2)'
                >
                </block>
            </div>
            <div class="block-con">
                <block
                status='离线'
                :value='!ceDeviceMonitorRtSingleType.res.data[27].HOfflineCount && ceDeviceMonitorRtSingleType.res.data[27].HOfflineCount != 0 ? "--" : ceDeviceMonitorRtSingleType.res.data[27].HOfflineCount'
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
    created () {
        this.$bus.on('stationChange', this.getStatusData)
    },
    mounted () {
        this.getStatusData()
        this.time = setInterval(() => {
            this.getStatusData()
        }, this.$route.meta.refresh_interval)
    },
    methods: {
        getStatusData () {
            this.ceDeviceMonitorRtSingleType.getData({type: 27})
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.getStatusData)
        clearInterval(this.time)
    }
}
</script>

<style lang="scss" scoped>
.child-section {
    height: 177px;
    @include c(background-color, #0E3D77);
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
