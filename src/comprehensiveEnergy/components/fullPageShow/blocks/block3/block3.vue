<template>
    <div class="block3">
        <div class="block-title">天气</div>
        <div class="content">
            <div class="weather-con" v-loading="stationMonitorWeather3day.resNumber === 0 && stationMonitorWeather3day.loading">
                <div class="wea-one clearfix">
                    <div class="clearfix">
                        <div class="one-temp">
                            <div class="num">
                                {{stationMonitorWeather3day.res.data.day0 && stationMonitorWeather3day.res.data.day0.tmp ? stationMonitorWeather3day.res.data.day0.tmp : '-'}}
                                </div>
                            <span class="unit">℃</span>
                        </div>
                        <div class="one-temp-img">
                            <svg class="icon" aria-hidden="true">
                                <!-- <use :href="weatherMap[stationMonitorWeather3day.res.data.day0.cond_code2]"></use> -->
                                <use xlink:href="#icontaiyang-" v-if="stationMonitorWeather3day.res.data.day0 && stationMonitorWeather3day.res.data.day0.cond_code2 == 1"></use>
                                <use xlink:href="#iconyintian-1" v-if="stationMonitorWeather3day.res.data.day0 && stationMonitorWeather3day.res.data.day0.cond_code2 == 2"></use>
                                <use xlink:href="#iconxiayu-" v-if="stationMonitorWeather3day.res.data.day0 && stationMonitorWeather3day.res.data.day0.cond_code2 == 3"></use>
                                <use xlink:href="#iconxuehua-" v-if="stationMonitorWeather3day.res.data.day0 && stationMonitorWeather3day.res.data.day0.cond_code2 == 4"></use>
                                <use xlink:href="#iconwumai-" v-if="stationMonitorWeather3day.res.data.day0 && stationMonitorWeather3day.res.data.day0.cond_code2 == '5f'"></use>
                                <use xlink:href="" v-if="stationMonitorWeather3day.res.data.day0 && stationMonitorWeather3day.res.data.day0.cond_code2 == 6"></use>
                            </svg>
                            <div style="padding-top: .03rem;text-align: center;">{{stationMonitorWeather3day.res.data.day0 && stationMonitorWeather3day.res.data.day0.cond_word ? stationMonitorWeather3day.res.data.day0.cond_word : '-'}}</div>
                        </div>
                    </div>
                    <div class="one-time">
                        <div class="week">周{{"日一二三四五六".charAt(new Date().getDay())}}</div>
                        <div class="date">{{(new Date().Format('yyyy-MM-dd')).split('-').join('/')}}</div>
                    </div>
                </div>
                <div class="line"></div>
                <div class="wea-two">
                    <div class="item clearfix" style="padding-bottom: .24rem">
                        <div class="img-con">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icontaiyang-" v-if="stationMonitorWeather3day.res.data.day1 && stationMonitorWeather3day.res.data.day1.cond_code2 == 1"></use>
                                <use xlink:href="#iconyintian-1" v-if="stationMonitorWeather3day.res.data.day1 && stationMonitorWeather3day.res.data.day1.cond_code2 == 2"></use>
                                <use xlink:href="#iconxiayu-" v-if="stationMonitorWeather3day.res.data.day1 && stationMonitorWeather3day.res.data.day1.cond_code2 == 3"></use>
                                <use xlink:href="#iconxuehua-" v-if="stationMonitorWeather3day.res.data.day1 && stationMonitorWeather3day.res.data.day1.cond_code2 == 4"></use>
                                <use xlink:href="#iconwumai-" v-if="stationMonitorWeather3day.res.data.day1 && stationMonitorWeather3day.res.data.day1.cond_code2 == '5f'"></use>
                                <use xlink:href="" v-if="stationMonitorWeather3day.res.data.day1 && stationMonitorWeather3day.res.data.day1.cond_code2 == 6"></use>
                            </svg>
                        </div>
                        <div class="num-con">
                            <div>{{stationMonitorWeather3day.res.data.day1 && stationMonitorWeather3day.res.data.day1.tmp_max ? stationMonitorWeather3day.res.data.day1.tmp_max : '-'}}/{{stationMonitorWeather3day.res.data.day1 && stationMonitorWeather3day.res.data.day1.tmp_min ? stationMonitorWeather3day.res.data.day1.tmp_min : '-'}}℃</div>
                            <div class="week">周{{"日一二三四五六".charAt(new Date().getDay() == 6 ? 0 : new Date().getDay() + 1)}}</div>
                        </div>
                    </div>
                    <div class="item clearfix">
                        <div class="img-con">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icontaiyang-" v-if="stationMonitorWeather3day.res.data.day2 && stationMonitorWeather3day.res.data.day2.cond_code2 == 1"></use>
                                <use xlink:href="#iconyintian-1" v-if="stationMonitorWeather3day.res.data.day2 && stationMonitorWeather3day.res.data.day2.cond_code2 == 2"></use>
                                <use xlink:href="#iconxiayu-" v-if="stationMonitorWeather3day.res.data.day2 && stationMonitorWeather3day.res.data.day2.cond_code2 == 3"></use>
                                <use xlink:href="#iconxuehua-" v-if="stationMonitorWeather3day.res.data.day2 && stationMonitorWeather3day.res.data.day2.cond_code2 == 4"></use>
                                <use xlink:href="#iconwumai-" v-if="stationMonitorWeather3day.res.data.day2 && stationMonitorWeather3day.res.data.day2.cond_code2 == '5f'"></use>
                                <use xlink:href="" v-if="stationMonitorWeather3day.res.data.day2 && stationMonitorWeather3day.res.data.day2.cond_code2 == 6"></use>
                            </svg>
                        </div>
                        <div class="num-con">
                            <div>{{stationMonitorWeather3day.res.data.day2 && stationMonitorWeather3day.res.data.day2.tmp_max ? stationMonitorWeather3day.res.data.day2.tmp_max : '-'}}/{{stationMonitorWeather3day.res.data.day2 && stationMonitorWeather3day.res.data.day2.tmp_min ? stationMonitorWeather3day.res.data.day2.tmp_min : '-'}}℃</div>
                            <div class="week">周{{"日一二三四五六".charAt(new Date().getDay() == 5 ? 0 : new Date().getDay() == 6 ? 1 : new Date().getDay() + 2)}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="time-con">
                <component :is="vw >= 1920 ? 'clockBig' : 'clockSmall'"></component>
                <div class="son-time clearfix" :style="{'margin-top': vw >= 1920 ? '.2rem' : '.05rem'}">
                    <div class="item" style="margin-left: .2rem">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconrila"></use>
                        </svg>
                        <span>{{stationMonitorWeather3day.res.data.day0 && stationMonitorWeather3day.res.data.day0.ss ? stationMonitorWeather3day.res.data.day0.ss : '-'}}</span>
                    </div>
                    <div class="item">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconrichu"></use>
                        </svg>
                        <span>{{stationMonitorWeather3day.res.data.day0 && stationMonitorWeather3day.res.data.day0.sr ? stationMonitorWeather3day.res.data.day0.sr : '-'}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixinWidthHeight from '@comm/mixin/widthHeight'
import { api＿stationMonitorWeather3day } from '@comprehensiveEnergy/request/api'

export default {
    mixins: [mixinWidthHeight],
    components: {
        'clockSmall': () => import('./clockSmall'),
        'clockBig': () => import('./clockBig')
    },
    data () {
        return {
            timer: null,
            stationMonitorWeather3day: api＿stationMonitorWeather3day({
                res: {
                    data: {
                        day0: {},
                        day1: {},
                        day2: {}
                    }
                }
            }),
            weatherMap: {
                1: 'icontaiyang-',
                2: 'iconyintian-1',
                3: 'iconxiayu-',
                4: 'iconxuehua-',
                '5f': 'iconwumai-',
                6: ''
            }
        }
    },
    created () {
        this.timer = setInterval(() => {
            this.stationMonitorWeather3day.getData()
        }, this.$store.state.second.dataInterval)
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.block3 {
    .icon {
       fill: currentColor;
       overflow: hidden;
    }
    .block-title {
        font-size: .14rem;
        padding: .14rem 0 0 .14rem;
    }
    .content {
        height: calc(100% - .29rem);
        padding: 0 .14rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .weather-con {
            display: flex;
            justify-content: center;
            align-items: center;
            .wea-one {
                float: left;
                width: .84rem;
                .one-temp {
                    float: left;
                    font-size: .3rem;
                    padding-top: .05rem;
                    .num {
                        float: left;
                        padding-top: .03rem;
                    }
                    .unit {
                        display: block;
                        float: right;
                        font-size: .14rem;
                    }
                }
                .one-temp-img {
                    float: right;
                    font-size: .12rem;
                    padding-left: .1rem;
                    .icon {
                        display: inline-block;
                        width: 0.24rem;
                        height: 0.24rem;
                        text-align: center;
                        font-size: 0.22rem;
                    }
                }
                .one-time {
                    font-size: .12rem;
                    padding-top: .2rem;
                    .week {
                        color: rgba(255, 255, 255, .6);
                        padding-bottom: .08rem;
                    }
                    .date {
                        color: rgba(255, 255, 255, .9);
                    }
                }
            }
            .wea-two {
                float: left;
                .item {
                    .img-con {
                        float: left;
                        margin-right: .1rem;
                        font-size: 0.12rem;
                        .icon {
                            display: inline-block;
                            width: 0.22rem;
                            height: 0.22rem;
                            text-align: center;
                            font-size: 0.2rem;
                        }
                    }
                    .num-con {
                        float: left;
                        font-size: .12rem;
                        .week {
                            color: rgba(255, 255, 255, .6);
                            padding-top: .08rem;
                        }
                    }
                }
            }
            .line {
                float: left;
                width: 1px;
                height: .7rem;
                margin: auto;
                margin: 0 .2rem;
                background: #153a64;
            }
        }
        .time-con {
            margin-top: -.1rem;
            .son-time {
                .item {
                    font-size: .12rem;
                    float: right;
                    display: flex;
                    align-items: center;
                    .icon {
                        display: inline-block;
                        width: 0.22rem;
                        height: 0.22rem;
                        line-height: 0.22rem;
                        text-align: center;
                        margin: auto;
                        margin-right: .05rem;
                    }
                }
            }
        }
    }
}
</style>
