<template>
    <div class="section section-h">
        <div class="title">实时报警消息</div>
        <div class="item-con" v-loading="getRunAlarmList.resNumber === 0 && getRunAlarmList.loading">
            <div class="item-wrap" :style="{'animation-duration': scrollTime +'s'}">
                <div class="item" v-for="(item, index) in dataList" :key="index">
                    <p class="time">{{item.sStartTime ? new Date(item.sStartTime).Format('yyyy-MM-dd hh:mm') : '-'}}</p>
                    <p class="message">{{item.devicename+'&nbsp;&nbsp;'+item.eventDesc}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api＿getRunAlarmList } from '@comprehensiveEnergy/request/api'

export default {
    data () {
        return {
            timer: null,
            dataList: [],
            scrollTime: 0,
            getRunAlarmList: api＿getRunAlarmList({
                later: true,
                res: {
                    body: {
                        alarmList: []
                    }
                }
            })
        }
    },
    mounted () {
        this.getRunAlarmList.getData({
            maxUpdateTime: 0,
            voiceTime: 0,
            eventTypes: '1,-9,2',
            notShowFinish: 1
        }).then(res => {
            if (res.code === 0) {
                if (res.body.alarmList.length) {
                    this.dataList = res.body.alarmList
                    this.scrollTime = res.body.alarmList.length * 1
                }
            }
        })
        this.timer = setInterval(() => {
            this.getRunAlarmList.getData({
                maxUpdateTime: this.getRunAlarmList.res.body && this.getRunAlarmList.res.body.alarmTotalInfo.maxUpdateTime ? this.getRunAlarmList.res.body.alarmTotalInfo.maxUpdateTime : 0,
                voiceTime: 0,
                eventTypes: '1,-9,2',
                notShowFinish: 1
            }).then(res => {
                if (res.code === 0) {
                    if (res.body.alarmList.length) {
                        this.dataList = res.body.alarmList
                        this.scrollTime = res.body.alarmList.length * 1
                    }
                }
            })
        }, this.$store.state.second.dataInterval)
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.section-h {
    padding: 0 .17rem .1rem .17rem;
    font-size: 12px;
    overflow: hidden;
    .title {
        padding-top: 2.4vh;
        height: 3.8vh;
    }
    .item-con {
        overflow: hidden;
        height: calc(100% - 6.2vh);
        margin-top: .1rem;
        .item-wrap {
            animation: infinitScroll infinite linear;
            &:hover {
                animation-play-state: paused;
            }
            @keyframes infinitScroll
            {
                0%   { transform: translateY(0) }
                100% { transform: translateY(calc((100% - 11vh) * -1)) }
            }
            .item {
                &:first-child {
                    .time {
                        padding-top: 0;
                    }
                }
                p {
                    font-size: 14px;
                }
                .time {
                    padding: 2.2vh 0 .7vh 0;
                    color: rgba(255, 255, 255, .5);
                }
                .message {
                    color: #FF5F5D;
                }
            }
        }
    }
}
</style>
