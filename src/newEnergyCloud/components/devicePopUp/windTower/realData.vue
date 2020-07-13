<template>
    <div class="wind-tower-real-data clearfix">
        <div class="dtime">{{getSingleRealtimeWindTower.res.body.dtime ? new Date(getSingleRealtimeWindTower.res.body.dtime * 1000).Format('yyyy-MM-dd hh:mm:ss') : '-'}}</div>
        <div class="top">
            <div class="item">
                <i class="iconfont icon-daqiyali"></i>
                <span class="label">大气压力：</span>
                <span class="value">
                    {{
                        getSingleRealtimeWindTower.res.body.p1 ||
                        getSingleRealtimeWindTower.res.body.p2 ||
                        getSingleRealtimeWindTower.res.body.p3 ||
                        getSingleRealtimeWindTower.res.body.p4 ||
                        getSingleRealtimeWindTower.res.body.p5 ||
                        getSingleRealtimeWindTower.res.body.p6
                    }}
                </span>
            </div>
            <div class="item">
                <i class="iconfont icon-shidu"></i>
                <span class="label">相对湿度：</span>
                <span class="value">
                    {{
                        getSingleRealtimeWindTower.res.body.h2o1 ||
                        getSingleRealtimeWindTower.res.body.h2o2 ||
                        getSingleRealtimeWindTower.res.body.h2o3 ||
                        getSingleRealtimeWindTower.res.body.h2o4 ||
                        getSingleRealtimeWindTower.res.body.h2o5 ||
                        getSingleRealtimeWindTower.res.body.h2o6
                    }}
                </span>
            </div>
            <div class="item">
                <i class="iconfont icon-wendu1"></i>
                <span class="label">大气温度：</span>
                <span class="value">
                    {{
                        getSingleRealtimeWindTower.res.body.ta1 ||
                        getSingleRealtimeWindTower.res.body.ta2 ||
                        getSingleRealtimeWindTower.res.body.ta3 ||
                        getSingleRealtimeWindTower.res.body.ta4 ||
                        getSingleRealtimeWindTower.res.body.ta5 ||
                        getSingleRealtimeWindTower.res.body.ta6
                    }}
                </span>
            </div>
        </div>
        <div class="bottom">
            <table class="tower-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>平均风速</th>
                        <th>平均风向</th>
                        <th>风功率密度</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in 6" :key="item.did" v-show="getSingleRealtimeWindTower.res.body['sh' + item]">
                        <td>{{getSingleRealtimeWindTower.res.body['sh' + item]}}米</td>
                        <td>{{getSingleRealtimeWindTower.res.body['ws' + item]}}m/s</td>
                        <td>{{getSingleRealtimeWindTower.res.body['wd' + item]}}度</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { api＿getSingleRealtimeWindTower } from '@newEnergyCloud/request/api'
export default {
    props: {
        device: {
            type: Object
        }
    },
    data () {
        const {stid, eqid, sn} = this.device
        return {
            getSingleRealtimeWindTower: api＿getSingleRealtimeWindTower({
                data: {
                    serialnumber: sn,
                    id: eqid,
                    pstationid: stid
                },
                res: {
                    body: {}
                }
            })
        }
    },
    created () {
        this.timer = setInterval(() => {
            this.getSingleRealtimeWindTower.getData()
        }, 30 * 1000)
        this.getSingleRealtimeWindTower.subscribe(res => {
            this.$bus.emit('devicePopupTowerMoreInfo', res.body)
        })
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.wind-tower-real-data {
    padding: 0 40px 30px;

    .dtime {
        line-height: 2em;
        text-align: right;
    }

    .top {
        height: 80px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        line-height: 80px;

        .item {
            width: 330px;
            height: 100%;
            background-color: #fff;
            padding-left: 30px;

            &:nth-child(1) {
                i.iconfont {
                    background-color: #A67FFF;
                }
                span.value {
                    color: #A67FFF;
                }
            }

            &:nth-child(2) {
                i.iconfont {
                    background-color: #F4BA4A;
                }
                span.value {
                    color: #F4BA4A;
                }
            }

            &:nth-child(3) {
                i.iconfont {
                    background-color: #45E3A2;
                }
                span.value {
                    color: #45E3A2;
                }
            }

            i.iconfont {
                display: inline-block;
                width: 55px;
                height: 55px;
                border-radius: 50%;
                font-size: 30px;
                vertical-align: middle;
                text-align: center;
                line-height: 55px;
                color: #fff;
                margin-right: 30px;
            }

            span.label {
                font-size: 16px;
            }

            span.value {
                font-size: 30px;
                vertical-align: sub;
            }
        }
    }

    .bottom {
        margin-top: 30px;
        position: relative;
        overflow: hidden;
        padding-bottom: 20px;

        &::before {
            content: '';
            width: 70px;
            height: 100%;
            border: 3px solid #333;
            position: absolute;
            left: 70px;
            top: 0;
            transform: perspective(180) rotateX(18deg) scaleY(1) translateY(-.1em);
        }

        .tower-table {
            width: 100%;

            tr {

                th,
                td {
                    height: 50px;
                    line-height: 50px;
                    font-size: 16px;
                    text-align: center;

                    &:nth-child(1) {
                        text-align: left;
                        padding-left: 0.5em;
                    }
                }
            }

            thead tr th {
                opacity: 0.6;
                font-weight: normal;
            }

            tbody tr {
                border-bottom: 3px solid #333333;
            }
        }
    }
}
</style>
