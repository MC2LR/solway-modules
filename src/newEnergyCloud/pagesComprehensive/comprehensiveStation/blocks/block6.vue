<template>
    <div class="chargingPile-page">
        <div class="title">充电桩</div>
        <div class="chargingPile-list">
            <div v-for="item in ceDeviceMonitorRtDeviceList.res.data" :key="item.name" class="item">
                <div class="name">{{item.name}}</div>
                <div class="chargingPile">
                    <i v-show="item.useStatus === '01'" class="comprehensive iconzhuanquan-"></i>
                    <i class="comprehensive iconchongdianzhuang2-copy-copy-copy-copy-copy" :class="'s' + item.useStatus"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
        this.$bus.on('stationChange', this.stationChange)
        this.timer = setInterval(() => this.ceDeviceMonitorRtDeviceList.getData(), this.$route.meta.refresh_interval)
    },
    methods: {
        stationChange () {
            this.ceDeviceMonitorRtDeviceList.getData()
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.stationChange)
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.chargingPile-page {
    padding: 15px 20px;
    font-size: 0.14rem;

    .chargingPile-list {
        height: calc(100% - 0.2rem);
        overflow: auto;
        // margin-top: 15%;

        .item {
            width: 20%;
            height: 0.8rem;
            float: left;
            margin: 0.05rem (20% / 8);

            .name {
                text-align: center;
                font-size: 0.12rem;
                line-height: 2;
            }

            .chargingPile {
                width: 0.56rem;
                height: 0.56rem;
                margin: 0 auto;
                border-radius: 50%;
                border: 0.04rem solid #043A65;
                position: relative;
                text-align: center;
                line-height: 0.56rem;

                i.iconzhuanquan- {
                    font-size: 0.58rem;
                    position: absolute;
                    left: -0.05rem;
                    top: -0.05rem;
                    color: #21D749;
                    animation: rotate360 3s linear 0s infinite;
                }

                i.iconchongdianzhuang2-copy-copy-copy-copy-copy {
                    font-size: 0.3rem;
                    position: relative;
                    top: -0.05rem;
                    color: #3FBCE3;

                    &.s01 {
                        color: #21D749;
                    }

                    &.s03 {
                        color: #F45252;
                    }
                }
            }
        }
    }
}

@keyframes rotate360 {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
