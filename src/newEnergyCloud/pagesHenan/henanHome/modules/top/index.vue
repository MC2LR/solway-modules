<template>
    <div class="top-box">
        <div class="item" v-if="station_type === 'company'">
            <div class="grid"></div>
            <div class="content">
                <p class="title">已接入电站数量</p>
                <span v-show="!runBaseInfo.loading" class="value">{{$oc(runBaseInfo.res, 'body', 'powerStationNum')}}</span>
                <span class="unit">个</span>
            </div>
        </div>
        <div class="item">
            <div class="grid"></div>
            <div class="content">
                <p class="title">已接入电站容量</p>
                <span v-show="!runBaseInfo.loading" class="value">{{mathFloor($useful($oc(runBaseInfo.res, 'body', 'installedCapacity', '0'), ''))}}</span>
                <span class="unit">{{$useful($oc(runBaseInfo.res, 'body', 'installedCapacity', '1'), '')}}</span>
            </div>
        </div>
        <div class="item">
            <div class="grid"></div>
            <div class="content">
                <p class="title">实时功率</p>
                <span class="value">{{mathFloor($useful($oc(station_type === 'company' ? stationOverview.res : overviewSingle.res, 'body', 'uv', 'real_acp', '0'), '-'))}}</span>
                <span class="unit">{{$useful($oc(station_type === 'company' ? stationOverview.res : overviewSingle.res, 'body', 'uv', 'real_acp', '1'), '-')}}</span>
            </div>
        </div>
        <div class="item">
            <div class="grid"></div>
            <div class="content">
                <p class="title">当日累计发电量</p>
                <span class="value">{{mathFloor($useful($oc(station_type === 'company' ? stationOverview.res : overviewSingle.res, 'body', 'uv', 'real_kwh_chk', '0'), '-'))}}</span>
                <span class="unit">{{$useful($oc(station_type === 'company' ? stationOverview.res : overviewSingle.res, 'body', 'uv', 'real_kwh_chk', '1'), '-')}}</span>
            </div>
        </div>
        <div class="item">
            <div class="grid"></div>
            <div class="content">
                <p class="title">受益贫困户数</p>
                <span class="value">1</span>
                <span class="unit">户</span>
            </div>
        </div>
        <div class="item">
            <div class="grid"></div>
            <div class="content">
                <p class="title">共享运维派单数</p>
                <span class="value">{{$useful(getDispatchTaskCount.res.data, '-')}}</span>
                <span class="unit">单</span>
            </div>
        </div>
    </div>
</template>

<script>
import {
    api＿runBaseInfo,
    api＿stationOverview,
    api＿overviewSingle,
    api＿getDispatchTaskCount
} from '@/request/henanApi'
export default {
    data () {
        return {
            runBaseInfo: api＿runBaseInfo({later: true}),
            stationOverview: api＿stationOverview({later: true}),
            overviewSingle: api＿overviewSingle({later: true}),
            getDispatchTaskCount: api＿getDispatchTaskCount()
        }
    },
    created () {
        this.onStationChange()
        this.$bus.on('stationChange', this.onStationChange)
        this.timer = setInterval(() => this.getRealData(), this.$route.meta.refresh_interval)
    },
    methods: {
        mathFloor (number) {
            if (number > 0 && !isNaN(+number)) {
                return typeof +number === 'number' ? Math.floor(+number) : number
            }
            return number
        },
        onStationChange (data) {
            this.runBaseInfo.getData({queryType: this.station_type === 'station' ? 3 : 1})
            this.getRealData()
        },
        getRealData () {
            this.station_type === 'station' ? this.overviewSingle.getData() : this.stationOverview.getData()
        }
    },
    computed: {
        station_type () {
            // console.log(this.$store.getters.station_type)
            // return this.$store.getters.station_type === 0 ? 'station' : 'company'
            return 'company'
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.onStationChange)
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.top-box {
    margin-top: 15px;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 0 30px;

    .item {
        background-color: rgba(20,49,129,0.28);
        width: 11%;
        min-width: 150px;
        height: 60px;
        position: relative;
        padding: 13px;

        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) left top no-repeat,
                        linear-gradient(to bottom, rgba(40,194,221, .5), rgba(40,194,221, .5)) left top no-repeat,
                        linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) right top no-repeat,
                        linear-gradient(to bottom, rgba(40,194,221, .5), rgba(40,194,221, .5)) right top no-repeat,
                        linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) left bottom no-repeat,
                        linear-gradient(to bottom, rgba(40,194,221, .5), rgba(40,194,221, .5)) left bottom no-repeat,
                        linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) right bottom no-repeat,
                        linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) right bottom no-repeat;
            background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
        }

        .grid {
            width: 40%;
            height: 100%;
            background: linear-gradient(90deg,rgba(20,49,129,0.28) 10%,transparent 0),linear-gradient(rgba(20,49,129,0.28) 10%,transparent 0);
            background-size: 10px 10px;
            position: absolute;
            left: 0;
            top: 0;
        }

        .content {
            width: max-content;
            margin: auto;

            .title {
                width: max-content;
                font-size: 12px;
                line-height: 1;
                margin-bottom: 6px;
            }

            .value {
                font-size: 18px;
                color:#47ECFF;
            }

            .unit {
                font-size: 12px;
                color:#47ECFF;
            }
        }
    }
}
</style>
