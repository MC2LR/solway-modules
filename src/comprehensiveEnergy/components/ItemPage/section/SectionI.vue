<template>
    <div class="section section-i">
        <div class="date">
            <i class="iconfont" :class="weatherIcon[pvMonitorGetRunResList.res.body[0].weatherTag]"></i>
            <div class="con">
                <span>{{new Date().Format('yyyy-MM-dd')}}</span>
                <span class="week">周{{"日一二三四五六".charAt(new Date().getDay())}}</span>
            </div>
        </div>
        <div class="num-con clearfix" v-loading="pvMonitorGetRunResList.resNumber === 0 && pvMonitorGetRunResList.loading">
            <div class="temp">
                {{pvMonitorGetRunResList.res.body && pvMonitorGetRunResList.res.body[0].tempReal && pvMonitorGetRunResList.res.body[0].tempReal.length ? pvMonitorGetRunResList.res.body[0].tempReal[0] : '-'}}
            </div>
            <div class="s-item-con">
                <div class="s-item">
                    <span class="name">湿度</span>
                    <span class="num">{{pvMonitorGetRunResList.res.body && pvMonitorGetRunResList.res.body[0].h2o && pvMonitorGetRunResList.res.body[0].h2o.length ? pvMonitorGetRunResList.res.body[0].h2o[0] : '-'}}<span>%</span></span>
                </div>
                <div class="s-item">
                    <span class="name">风速</span>
                    <span class="num">{{pvMonitorGetRunResList.res.body && pvMonitorGetRunResList.res.body[0].ws && pvMonitorGetRunResList.res.body[0].ws.length ? pvMonitorGetRunResList.res.body[0].ws[0] : '-'}}<span>m/s</span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api＿pvMonitorGetRunResList, api＿stationMonitorWeather } from '@comprehensiveEnergy/request/api'

export default {
    data () {
        return {
            timer: null,
            weatherIcon: {
                A: 'iconqingtian1',
                B: 'iconyin',
                C: 'iconyu1',
                D: 'iconweather_snow',
                E: 'iconmai',
                X: 'iconother'
            },
            stationMonitorWeather: api＿stationMonitorWeather({
                res: {
                    data: {}
                }
            }),
            pvMonitorGetRunResList: api＿pvMonitorGetRunResList({
                data: {
                    dateType: 3,
                    queryType: 3,
                    date: (new Date()).Format('yyyy-MM-dd')
                },
                res: {
                    body: [{
                        tempReal: [],
                        h2o: [],
                        ws: []
                    }]
                }
            })
        }
    },
    mounted () {
        this.timer = setInterval(() => {
            this.getList()
        }, this.$store.state.second.dataInterval)
    },
    methods: {
        getList () {
            this.stationMonitorWeather.getData()
            this.pvMonitorGetRunResList.getData({
                dateType: 3,
                queryType: 3,
                date: (new Date()).Format('yyyy-MM-dd')
            })
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.section-i {
    padding: 0 .17rem;
    font-size: .12rem;
    .date {
        padding-top: 2vh;
        i.iconqingtian1 {
            display: inline-block;
            width: 0.24rem;
            height: 0.24rem;
            font-size: 0.22rem;
            text-align: center;
            color: #FFA530;
            // margin-left: .1rem;
        }
        .con {
            // display: inline-block;
            // vertical-align: super;
            // padding-left: .4rem;
            float: right;
            line-height: .2rem;
            .week {
                padding-left: .15rem;
            }
        }
    }
    .num-con {
        padding-top: 3vh;
        // overflow: hidden;
        .temp {
            float: left;
            font-size: .34rem;
            position: relative;
            // margin-right: .33rem;
            // width: 0.44rem;
            height: 100%;
            padding-top: .06rem;
            text-align: center;
            &::before {
                content: '℃';
                display: inline-block;
                font-size: .14rem;
                position: absolute;
                right: -.13rem;
                top: -.02rem;
            }
        }
        .s-item-con {
            width: 1.02rem;
            float: right;
            .s-item {
                &:last-child {
                    padding-top: .07rem;
                }
                .name {
                    color: rgba(255, 255, 255, .5);
                    padding-right: .08rem;
                }
                .num {
                    font-size: .18rem;
                    span {
                        font-size: .13rem;
                    }
                }
            }
        }
    }
}
</style>
