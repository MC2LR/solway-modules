<template>
    <div
        @click.stop="() => {}"
        :style="{left: left() + 'px', top: top() + 'px'}"
        v-loading="pvwpStationRtOverviewDay.loading"
        class="home-pop-up">
        <header class="header">
            <span class="stName">{{sName}}</span>
            <span @click="goStation" class="router-link">进入电站></span>
            <i @click="$emit('close')" class="iconfont iconguanbi pull-right"></i>
        </header>
        <div class="img-content">

        </div>
        <div class="section section1">
            <pop-item
                class="p1"
                :class="'s' + pvwpStationRtOverviewDay.res.statusClass"
                label="运行状态"
                :value="pvwpStationRtOverviewDay.res.statusText || '-'">
            </pop-item>
            <pop-item
                class="p2"
                label="实时功率"
                :value="pvwpStationRtOverviewDay.res.body.day.data.acp"
                :unit="pvwpStationRtOverviewDay.res.body.day.units.acp">
            </pop-item>
        </div>
        <div class="section section2">
            <pop-item
                class="p3"
                label="日发电量"
                :value="pvwpStationRtOverviewDay.res.body.day.data.dw"
                :unit="pvwpStationRtOverviewDay.res.body.day.units.dw">
            </pop-item>
            <pop-item
                class="p4"
                label="月发电量"
                :value="pvwpStationRtOverviewDay.res.body.month.data.real_kwh_chk"
                :unit="pvwpStationRtOverviewDay.res.body.month.units.real_kwh_chk">
            </pop-item>
            <pop-item
                class="p5"
                label="年发电量"
                :value="pvwpStationRtOverviewDay.res.body.year.data.real_kwh_chk"
                :unit="pvwpStationRtOverviewDay.res.body.year.units.real_kwh_chk">
            </pop-item>
        </div>
    </div>
</template>

<script>
import PopItem from './popItem'
import {
    api＿UserAuthHandleChangeDataType
    , api＿pvwpStationRtOverviewDay
} from '@comprehensiveEnergy/request/api'
// import {independent, isProduction} from '@comm/tools'

const win = window
export default {
    props: {
        x: {
            type: Number,
            required: true
        },
        y: {
            type: Number,
            required: true
        },
        sid: {
            type: Number,
            required: true
        },
        sName: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            visible: true,
            left () {
                const width = 375
                if (this.x < width) return this.x
                if ((this.x + width) > win.innerWidth) return this.x - width
                return this.x - width / 2
            },
            top () {
                const height = 263
                if (this.y < height) return this.y + 4
                if ((this.y + height) > win.innerWidth) return this.y - height + 6
                return this.y - height - 4
            },
            UserAuthHandleChangeDataType: api＿UserAuthHandleChangeDataType({
                later: true,
                sameTimeOnce: true,
                onlyLatest: true
            }),
            pvwpStationRtOverviewDay: api＿pvwpStationRtOverviewDay({
                data: {
                    stid: this.sid,
                    stcls: '01'
                },
                res: {
                    body: {
                        day: {
                            data: {},
                            units: {}
                        },
                        month: {
                            data: {},
                            units: {}
                        },
                        year: {
                            data: {},
                            units: {}
                        },
                        accum: {
                            data: {},
                            units: {}
                        }
                    }
                }
            }).subscribe(this.getStatusText)
        }
    },
    methods: {
        close () {
            this.$emit('close')
        },
        async goStation () {
            const o = {dataType: 0, id: this.sid, isGroup: 0, stClass: '01'}
            const res = await this.UserAuthHandleChangeDataType.getData(o)
            if (res.result) {
                await this.$store.dispatch('stationInfo')
                this.$router.push({name: 'StationMonitoring'})
            }
        },
        getStatusText (res) {
            let statusText = '-'
            if (res.body.day.data.comm === 1) {
                statusText = `通讯中断`
            } else if (res.body.day.data.comm === 2) {
                statusText = `初始化`
            } else {
                if (res.body.day.data.status === 1) {
                    statusText = `故障`
                } else if (res.body.day.data.status === 2) {
                    statusText = `报警`
                } else {
                    statusText = `正常运行`
                }
            }
            this.pvwpStationRtOverviewDay.res.statusText = statusText
            this.pvwpStationRtOverviewDay.res.statusClass = ['通讯中断', '初始化', '故障', '报警', '正常运行'].indexOf(statusText)
        }
    },
    mounted () {
        setTimeout(() => {
            document.addEventListener('click', this.close)
        }, 0)
        this.timer = setInterval(() => {
            this.pvwpStationRtOverviewDay.getData()
        }, 5 * 1000)
    },
    beforeDestroy () {
        document.removeEventListener('click', this.close)
        clearInterval(this.timer)
    },
    components: {
        PopItem
    }
}
</script>

<style lang="scss" scoped>
.home-pop-up {
    position: absolute;
    z-index: 2;
    width: 0;
    height: 0;
    width:375px;
    height:263px;
    @include c(background-color, rgba($line_c3, 0.8));
    border:2px solid;
    @include c(border-color, $line_c4);

    .header {
        height:38px;
        @include c(background-color, $bg_c5);
        line-height: 38px;
        font-size: 16px;
        padding-left: 20px;

        .stName {
            opacity: .6;
            display: inline-block;
            max-width: 200px;
            height: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .router-link {
            line-height: 38px;
            font-size: 16px;
            vertical-align: top;
            @include c(color, $text_c1);
            margin-left: 2em;
            cursor: pointer;
        }

        .iconguanbi {
            font-size: 12px;
            margin-right: 8px;
            cursor: pointer;
        }
    }

    .img-content {
        height: 100px;
    }

    .section {
        height: 59px;
        @include c(background-color, $bg_c5);
        padding: 10px 20px;

        .pop-item {
            width: 106px;
        }

        .p1 {
            @include c(color, $status_c1);

            &.s0 {
                @include c(color, $status_c4);
            }

            &.s1 {
                @include c(color, $status_c5);
            }

            &.s2 {
                @include c(color, $status_c2);
            }

            &.s3 {
                @include c(color, $status_c3);
            }

            &.s4 {
                @include c(color, $status_c1);
            }
        }

        .p2, .p3 {
            @include c(color, $text_c1);
        }

        .p4 {
            @include c(color, #FFDA2F);
        }

        .p5 {
            @include c(color, #FF822F);
        }
    }

    .section1 {
        margin-bottom: 2px;
    }
}
</style>
