<template>
    <div class="wp-device-matrix-list clearfix" v-loading="!getRunRealDataWindTurbine.resNumber && getRunRealDataWindTurbine.loading">
        <div
            class="device"
            @click="devicePopUp({stid: item.sid, eqid: item.did})"
            :title="{'0': item.statusDesc, 1: '通讯中断', 2: '初始化'}[item.comm]"
            :class="{
                statusColor0: item.comm === 0 && item.status >= 90 && item.status <=99,
                statusColor1: item.comm === 0 && (item.status === 1 || item.status === 13 || (item.status > 20 && item.status < 30)),
                statusColor2: item.comm === 0 && item.status === 2,
                statusColor3: item.comm === 1 || item.comm === 2,
                statusColor4: item.comm === 0 && (item.status === 11 || item.status === 14 || item.status === 15 || item.status === 16),
                statusColor5: item.comm === 0 && item.status === 17,
                statusColor6: item.comm === 0 && item.status === -99
            }"
            v-for="item in getRunRealDataWindTurbine.res.data" :key="item.sid + '_' + item.did">
            <span class="device-name">{{item.name}}</span>
            <img class="fan" v-if="item.comm === 0 && item.status >= 90 && item.status <=99" src="./images/fan.gif" alt="风机">
            <i v-else class="iconfont icon-fengji- fan"></i>
            <span class="attr">{{item.daykwh}} kWh</span><br>
            <span class="attr">{{item.w}} kW</span><br>
            <span class="attr">{{item.wdspd}} m/s</span>
        </div>
    </div>
</template>

<script>
import theme from './theme/theme'
import {api＿getRunRealDataWindTurbine} from '@/request/api'
import devicePopUp from '@/components/devicePopUp'
export default {
    mixins: [theme],
    data () {
        return {
            getRunRealDataWindTurbine: api＿getRunRealDataWindTurbine({
                data: {
                    pageIndex: 0,
                    pageSize: 999,
                    search: '',
                    status: '00'
                }
            })
        }
    },
    created () {
        this.$bus.on(this.$route.name + 'StatusChange', this.getData)
        this.$bus.on('stationChange', this.stationChange)
        this.timer = setInterval(() => this.getRunRealDataWindTurbine.getData(), this.$route.meta.refresh_interval)
    },
    methods: {
        stationChange () {
            this.getData()
        },
        getData (status) {
            this.getRunRealDataWindTurbine.getData(status ? {status: status.join()} : {})
        },
        devicePopUp (data) {
            devicePopUp(data)
        }
    },
    beforeDestroy () {
        this.$bus.off(this.$route.name + 'StatusChange', this.getData)
        this.$bus.off('stationChange', this.stationChange)
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
@import './theme/theme.scss';
.wp-device-matrix-list {
    // @include page_c(color, $fontColor);
    color: #{nth($fontColor, 2)};
    padding: 10px;
    height: calc(100% - 60px);
    overflow: auto;

    .device {
        width: 170px;
        height: 90px;
        // background-color: rgba(40,135,123,.5);
        border-radius: 4px;
        float: left;
        margin-right: 13px;
        margin-top: 40px;
        position: relative;
        padding: 10px 0;
        cursor: pointer;

        &.statusColor0 {
            $statusColor: nth($statusColor0, 2);
            background-color: rgba($statusColor, .25);
            i {
                color: $statusColor;
            }
        }
        &.statusColor1 {
            $statusColor: nth($statusColor1, 2);
            background-color: rgba($statusColor, .25);
            i {
                color: $statusColor;
            }
        }
        &.statusColor2 {
            $statusColor: nth($statusColor2, 2);
            background-color: rgba($statusColor, .25);
            i {
                color: $statusColor;
            }
        }
        &.statusColor3 {
            $statusColor: nth($statusColor3, 2);
            background-color: rgba($statusColor, .25);
            i {
                color: $statusColor;
            }
        }
        &.statusColor4 {
            $statusColor: nth($statusColor4, 2);
            background-color: rgba($statusColor, .25);
            i {
                color: $statusColor;
            }
        }
        &.statusColor5 {
            $statusColor: nth($statusColor5, 2);
            background-color: rgba($statusColor, .25);
            i {
                color: $statusColor;
            }
        }
        &.statusColor6 {
            $statusColor: nth($statusColor6, 2);
            background-color: rgba($statusColor, .25);
            i {
                color: $statusColor;
            }
        }

        .device-name {
            position: absolute;
            left: 0;
            top: -25px;
            font-size: 12px;
            line-height: 18px;
            padding: 0 5px;
            width:51px;
            height:20px;
            background:rgba(74,185,126,1);
            border:1px solid rgba(74,185,126,1);
            border-radius:4px;
        }

        i.icon-fengji- {
            font-size: 60px;
            margin-top: 5px;
        }

        .fan {
            float: left;
        }

        .attr {
            line-height: 2em;
            padding-left: 1em;
            font-size: 12px;
        }
    }
}
</style>
