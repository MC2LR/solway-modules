<template>
    <div class="charging-pile-list" v-loading="(ceDeviceMonitorRtDeviceList.resNumber === 0) && ceDeviceMonitorRtDeviceList.loading">
        <div class="charging-box">
            <charging-pile
                v-for="item in ceDeviceMonitorRtDeviceList.res.data"
                :key="item.name"
                :name="item.name"
                :useStatus="item.useStatus">
            </charging-pile>
        </div>
        <div class="status-box">
            <div class="state">
                <span>充电中</span><br>
                <span>{{statusNumber.s01}}</span>
            </div>
            <div class="state">
                <span>未使用</span><br>
                <span>{{statusNumber.s02}}</span>
            </div>
            <div class="state">
                <span>故障</span><br>
                <span>{{statusNumber.s03}}</span>
            </div>
            <div class="state">
                <span>离线</span><br>
                <span>{{statusNumber.s04}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import ChargingPile from './chargingPile'
import {api＿ceDeviceMonitorRtDeviceList} from '@comprehensiveEnergy/request/api'
export default {
    data () {
        return {
            ceDeviceMonitorRtDeviceList: api＿ceDeviceMonitorRtDeviceList({
                data: {
                    type: 26
                },
                res: {
                    data: []
                }
            })
        }
    },
    created () {
        this.timer = setInterval(() => this.ceDeviceMonitorRtDeviceList.getData(), this.$store.state.stationMonitoring.dataInterval)
    },
    computed: {
        statusNumber () {
            const o = {s01: 0, s02: 0, s03: 0, s04: 0}
            this.ceDeviceMonitorRtDeviceList.res.data.forEach(v => {
                if (v.useStatus === '01') return o.s01++
                if (v.useStatus === '02') return o.s02++
                if (v.useStatus === '03') return o.s03++
                if (v.useStatus === '04') return o.s04++
            })
            return o
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
    },
    components: {
        ChargingPile
    }
}
</script>

<style lang="scss" scoped>
@import '@comm/assets/themes/scrollbar/s1.scss';
.charging-pile-list {
    padding: 17px 16px;
    position: relative;

    .charging-box {
        height: calc(100% - 60px);
        overflow-y: scroll;

        .charging-pile {
            margin: 7px;
        }
    }

    .status-box {
        .state {
            float: left;
            width: 25%;
            padding: 1em;
            line-height: 1.5em;
            font-size: 14px;

            &:nth-child(1) {
                color: #50CD5B;
            }
            &:nth-child(2) {
                color: #3FBCE3;
            }
            &:nth-child(3) {
                color: #FF6767;
            }
            &:nth-child(4) {
                color: #829AAD;
            }
        }
    }

}
</style>
