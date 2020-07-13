<template>
    <div class="station-popup" v-loading="stationOverviewDay.loading">
        <div class="header">
            <span>所在区域：</span>
            <span class="station-name">{{$oc(stationOverviewDay.res, 'body', 'day', 'data', 'stationName')}}</span>
            <i @click.stop="$emit('close')" class="close">×</i>
        </div>
        <div class="center flex">
            <div>
                <div class="label">装机容量</div>
                <div>
                    <span class="value">{{$oc(stationOverviewDay.res, 'body', 'day', 'data', 'inst_kw')}}</span>
                    <span class="unit">{{$oc(stationOverviewDay.res, 'body', 'day', 'units', 'inst_kw')}}</span>
                </div>
            </div>
            <div>
                <div class="label">并网时间</div>
                <div>
                    <span class="value">{{$oc(stationOverviewDay.res, 'body', 'day', 'data', 'gridconn_date')}}</span>
                    <!-- <span class="unit">MW</span> -->
                </div>
            </div>
        </div>
        <div class="footer flex">
            <div>
                <div class="label">并网电压等级</div>
                <div>
                    <span class="value">{{$oc(stationOverviewDay.res, 'body', 'day', 'data', 'gridconn_level')}}</span>
                    <span class="unit">{{$oc(stationOverviewDay.res, 'body', 'day', 'units', 'gridconn_level')}}</span>
                </div>
            </div>
            <div>
                <div class="label">本月发电量</div>
                <div>
                    <span class="value">{{$oc(stationOverviewDay.res, 'body', 'month', 'data', 'real_kwh_chk')}}</span>
                    <span class="unit">{{$oc(stationOverviewDay.res, 'body', 'month', 'units', 'real_kwh_chk')}}</span>
                </div>
            </div>
            <div>
                <div class="label">本月上网电量</div>
                <div>
                    <span class="value">{{$oc(stationOverviewDay.res, 'body', 'month', 'data', 'send_kwh_chk')}}</span>
                    <span class="unit">{{$oc(stationOverviewDay.res, 'body', 'month', 'units', 'send_kwh_chk')}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {api＿stationOverviewDay} from '@/request/henanApi'
export default {
    data () {
        return {
            stationOverviewDay: api＿stationOverviewDay({
                later: true
            })
        }
    },
    created () {
        this.$bus.on(this.$route.name + 'StationChange', this.getData)
    },
    computed: {
        stid () {
            return this.$store.state.userActionRecord[this.$route.name + '_selectedStid']
        }
    },
    methods: {
        getData () {
            this.stationOverviewDay.getData({
                stid: this.stid
            })
        }
    },
    beforeDestroy () {
        this.$bus.off(this.$route.name + 'StationChange', this.getData)
    }
}
</script>

<style lang="scss" scoped>
.station-popup {
    position: absolute;
    left: 0;
    top: 0;
    width:375px;
    height:164px;
    background:rgba(8,75,161,.9);
    border:2px solid rgba(51,115,189,1);

    .header {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid rgba(14,48,85,1);
        padding: 0 20px;
        font-size: 16px;
        position: relative;
        color: rgba(255, 255, 255, 0.7);

        .close {
            position: absolute;
            font-size: 30px;
            right: 0;
            top: 0;
            padding: 0 10px;
            cursor: pointer;
        }

        .station-name {
            @include c(color, $text_c1);
        }
    }

    .center {
        height: 60px;
        border-bottom: 1px solid rgba(14,48,85,1);
        padding: 0 20px;
    }

    .footer {
        padding: 0 20px;
    }

    .flex {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .label {
            margin-top: 12px;
            margin-bottom: 8px;
            font-size: 14px;
            line-height: 1;
            color: rgba(255, 255, 255, 0.7);
        }

        .value {
            font-size: 18px;
            @include c(color, $text_c1);
            line-height: 1;
        }

        .unit {
            font-size: 12px;
            @include c(color, $text_c1);
        }
    }
}
</style>
