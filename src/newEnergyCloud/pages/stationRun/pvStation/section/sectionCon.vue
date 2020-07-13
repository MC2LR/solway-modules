<template>
    <div class="child-section clearfix">
        <div class="section" :class="{'stShadow': sectionShadow === 0}" @click="changeChart(0)">
            <child-section
            v-if="isToday"
            :liquidValue='pvwpStationRtOverviewDay.res.body.day.data.kw_r'
            liquidName='出力比'
            bigDataName='实时功率'
            :bigDataValue='pvwpStationRtOverviewDay.res.body.day.data.acp'
            :bigDataUnit='pvwpStationRtOverviewDay.res.body.day.units.acp || "-"'
            smallDataName='实时光照强度'
            :smallDataValue='pvwpStationRtOverviewDay.res.body.day.data.l'
            :smallDataUnit='pvwpStationRtOverviewDay.res.body.day.units.l || "-"'>
                <template v-slot:default>
                    <div class="right1">
                        <div class="temp-con">
                            <div class="num">{{pvwpStationRtOverviewDay.res.body.day.data.ta || '-'}}</div>
                            <div class="unit">℃</div>
                        </div>
                        <div class="wea-con">
                            <svg class="icon" aria-hidden="true">
                                <use v-if="pvwpStationRtOverviewDay.res.body.day.data.weatherTag === 'A'" xlink:href="#icon-taiyang-"></use>
                                <use v-if="pvwpStationRtOverviewDay.res.body.day.data.weatherTag === 'B'" xlink:href="#icon-yintian-1"></use>
                                <use v-if="pvwpStationRtOverviewDay.res.body.day.data.weatherTag === 'C'" xlink:href="#icon-xiayu-"></use>
                                <use v-if="pvwpStationRtOverviewDay.res.body.day.data.weatherTag === 'D'" xlink:href="#icon-weather_snow"></use>
                                <use v-if="pvwpStationRtOverviewDay.res.body.day.data.weatherTag === 'E'" xlink:href="#icon-mai"></use>
                                <use v-if="pvwpStationRtOverviewDay.res.body.day.data.weatherTag === 'X'" xlink:href="#icon-other"></use>
                            </svg>
                            <div class="value" v-if="pvwpStationRtOverviewDay.res.body.day.data.weatherTag === 'A'">晴</div>
                            <div class="value" v-if="pvwpStationRtOverviewDay.res.body.day.data.weatherTag === 'B'">阴</div>
                            <div class="value" v-if="pvwpStationRtOverviewDay.res.body.day.data.weatherTag === 'C'">雨</div>
                            <div class="value" v-if="pvwpStationRtOverviewDay.res.body.day.data.weatherTag === 'D'">雪</div>
                            <div class="value" v-if="pvwpStationRtOverviewDay.res.body.day.data.weatherTag === 'E'">霾</div>
                            <div class="value" v-if="pvwpStationRtOverviewDay.res.body.day.data.weatherTag === 'X'">其他</div>
                        </div>
                    </div>
                </template>
                <template v-slot:time>
                    <i class="iconfont icon-shijian" :title="'最近更新时间: ' + upDateTime"></i>
                </template>
            </child-section>
            <child-section-history
            v-if="!isToday"
            :liquidValue='pvwpStationRtOverviewDay.res.body.day.data.inst_kw_o ? (pvwpStationRtOverviewDay.res.body.day.data.max_p_o / pvwpStationRtOverviewDay.res.body.day.data.inst_kw_o) * 100 : null'
            liquidName='最大出力比'
            bigDataName='最大功率'
            :bigDataValue='pvwpStationRtOverviewDay.res.body.day.data.max_p'
            :bigDataUnit='pvwpStationRtOverviewDay.res.body.day.units.max_p || "-"'
            smallDataName='日辐射量'
            :smallDataValue='pvwpStationRtOverviewDay.res.body.day.data.rad_chk'
            :smallDataUnit='pvwpStationRtOverviewDay.res.body.day.units.rad_chk || "-"'>
                <template v-slot:default>
                    <div class="right1">
                        <div class="temp-con">
                            <div class="num">{{pvwpStationRtOverviewDay.res.body.day.data.ta || '-'}}</div>
                            <div class="unit">℃</div>
                        </div>
                        <div class="wea-con">
                            <svg class="icon" aria-hidden="true">
                                <use v-if="pvwpStationRtOverviewDay.res.body.day.data.weather_code === 1" xlink:href="#icon-taiyang-"></use>
                                <use v-if="pvwpStationRtOverviewDay.res.body.day.data.weather_code === 2" xlink:href="#icon-yintian-1"></use>
                                <use v-if="pvwpStationRtOverviewDay.res.body.day.data.weather_code === 3" xlink:href="#icon-xiayu-"></use>
                                <use v-if="pvwpStationRtOverviewDay.res.body.day.data.weather_code === 4" xlink:href="#icon-weather_snow"></use>
                                <use v-if="pvwpStationRtOverviewDay.res.body.day.data.weather_code === 5" xlink:href="#icon-mai"></use>
                                <use v-if="pvwpStationRtOverviewDay.res.body.day.data.weather_code === 6 || !pvwpStationRtOverviewDay.res.body.day.data.weather_code" xlink:href="#icon-other"></use>
                            </svg>
                            <div class="value" v-if="pvwpStationRtOverviewDay.res.body.day.data.weather_code === 1">晴</div>
                            <div class="value" v-if="pvwpStationRtOverviewDay.res.body.day.data.weather_code === 2">阴</div>
                            <div class="value" v-if="pvwpStationRtOverviewDay.res.body.day.data.weather_code === 3">雨</div>
                            <div class="value" v-if="pvwpStationRtOverviewDay.res.body.day.data.weather_code === 4">雪</div>
                            <div class="value" v-if="pvwpStationRtOverviewDay.res.body.day.data.weather_code === 5">霾</div>
                            <div class="value" v-if="pvwpStationRtOverviewDay.res.body.day.data.weather_code === 6 || !pvwpStationRtOverviewDay.res.body.day.data.weather_code">其他</div>
                        </div>
                    </div>
                </template>
                <template v-slot:time>
                    <i class="iconfont icon-shijian" :title="'最近更新时间: ' + upDateTime"></i>
                </template>
            </child-section-history>
        </div>
        <div class="section" :class="{'stShadow': sectionShadow === 1}" @click="changeChart(1)">
            <child-section
            v-if="isToday"
            :liquidValue='pvwpStationRtOverviewDay.res.body.day.data.finish_r'
            liquidName='计划完成'
            bigDataName='日发电量'
            :bigDataValue='pvwpStationRtOverviewDay.res.body.day.data.dw'
            :bigDataUnit='pvwpStationRtOverviewDay.res.body.day.units.dw || "-"'
            smallDataName='日发电小时数'
            :smallDataValue='pvwpStationRtOverviewDay.res.body.day.data.real_hours'
            :smallDataUnit='pvwpStationRtOverviewDay.res.body.day.units.real_hours || "-"'>
                <template v-slot:default>
                    <div class="right2">
                        <div class="num-con">
                            <div>同比</div>
                            <div class="value">{{pvwpStationRtOverviewDay.res.body.day.data.real_kwh_chk_tb || '-'}}%</div>
                        </div>
                        <img :src="pvwpStationRtOverviewDay.res.body.day.data.real_kwh_chk_tb > 0 ? require('../../img/arrow-ascend.png') : require('../../img/arrow-descend.png')">
                    </div>
                </template>
            </child-section>
            <child-section-history
            v-if="!isToday"
            :liquidValue='pvwpStationRtOverviewDay.res.body.day.data.finish_r'
            liquidName='计划完成'
            bigDataName='日发电量'
            :bigDataValue='pvwpStationRtOverviewDay.res.body.day.data.real_kwh_chk'
            :bigDataUnit='pvwpStationRtOverviewDay.res.body.day.units.real_kwh_chk || "-"'
            smallDataName='日发电小时数'
            :smallDataValue='pvwpStationRtOverviewDay.res.body.day.data.real_hours'
            :smallDataUnit='pvwpStationRtOverviewDay.res.body.day.units.real_hours || "-"'>
                <template v-slot:default>
                    <div class="right2">
                        <div class="num-con">
                            <div>同比</div>
                            <div class="value">{{pvwpStationRtOverviewDay.res.body.day.data.real_kwh_chk_tb_rate || '-'}}%</div>
                        </div>
                        <img :src="pvwpStationRtOverviewDay.res.body.day.data.real_kwh_chk_tb_rate > 0 ? require('../../img/arrow-ascend.png') : require('../../img/arrow-descend.png')">
                    </div>
                </template>
            </child-section-history>
        </div>
        <div class="section" :class="{'stShadow': sectionShadow === 2}" @click="changeChart(2)">
            <child-section
            :liquidValue='pvwpStationRtOverviewDay.res.body.month.data.finish_r'
            liquidName='计划完成'
            bigDataName='月累计发电量'
            :bigDataValue='pvwpStationRtOverviewDay.res.body.month.data.real_kwh_chk'
            :bigDataUnit='pvwpStationRtOverviewDay.res.body.month.units.real_kwh_chk || "-"'
            smallDataName='月发电小时数'
            :smallDataValue='pvwpStationRtOverviewDay.res.body.month.data.real_hours'
            :smallDataUnit='pvwpStationRtOverviewDay.res.body.month.units.real_hours || "-"'>
                <template v-slot:default>
                    <div class="right2">
                        <div class="num-con">
                            <div>同比</div>
                            <div class="value">{{pvwpStationRtOverviewDay.res.body.month.data.real_kwh_chk_tb_rate || '-'}}%</div>
                        </div>
                        <img :src="pvwpStationRtOverviewDay.res.body.month.data.real_kwh_chk_tb_rate > 0 ? require('../../img/arrow-ascend.png') : require('../../img/arrow-descend.png')">
                    </div>
                </template>
            </child-section>
        </div>
        <div class="section" :class="{'stShadow': sectionShadow === 3}" @click="changeChart(3)">
            <child-section
            :liquidValue='pvwpStationRtOverviewDay.res.body.year.data.finish_r'
            liquidName='计划完成'
            bigDataName='年累计发电量'
            :bigDataValue='pvwpStationRtOverviewDay.res.body.year.data.real_kwh_chk'
            :bigDataUnit='pvwpStationRtOverviewDay.res.body.year.units.real_kwh_chk || "-"'
            smallDataName='年发电小时数'
            :smallDataValue='pvwpStationRtOverviewDay.res.body.year.data.real_hours'
            :smallDataUnit='pvwpStationRtOverviewDay.res.body.year.units.real_hours || "-"'>
                <template v-slot:default>
                    <div class="right2">
                        <div class="num-con">
                            <div>同比</div>
                            <div class="value">{{pvwpStationRtOverviewDay.res.body.year.data.real_kwh_chk_hb_rate || '-'}}%</div>
                        </div>
                        <img :src="pvwpStationRtOverviewDay.res.body.year.data.real_kwh_chk_hb_rate > 0 ? require('../../img/arrow-ascend.png') : require('../../img/arrow-descend.png')">
                    </div>
                </template>
            </child-section>
        </div>
    </div>
</template>

<script>
import {rem} from '@comm/mixin'
import { api＿pvwpStationRtOverviewDay } from '@newEnergyCloud/request/api'
import childSection from './childSection'
import childSectionHistory from './childSectionHistory'

export default {
    mixins: [rem],
    data () {
        return {
            isToday: true,
            timer: null,
            upDateTime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
            showTime: new Date().Format('yyyy-MM-dd'),
            sectionShadow: 0,
            pvwpStationRtOverviewDay: api＿pvwpStationRtOverviewDay({
                later: true,
                sameTimeOnce: true,
                res: {
                    body: {
                        accum: {
                            data: {},
                            units: {}
                        },
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
                        }
                    }
                }
            })
        }
    },
    components: {
        childSection,
        childSectionHistory
    },
    mounted () {
        this.getData()
        this.timer = setInterval(() => {
            this.isToday && this.getData()
        }, this.$store.getters.refresh_interval())
        this.$bus.on('dateChange', this.getTime)
        this.$bus.on('scrollChart', this.changeChart)
        this.$bus.on('stationChange', this.stationChange)
    },
    methods: {
        changeChart (i) {
            this.sectionShadow = i
            this.$bus.emit('getChartIndex', i)
            this.$bus.emit('showChartIndex', i)
        },
        stationChange (data) {
            this.getData()
        },
        getTime (date) {
            this.showTime = date
            this.isToday = new Date(date).toDateString() === new Date().toDateString()
            this.getData()
        },
        getData () {
            if (this.$store.getters.station_data_type !== 'PV_STATION') return
            try {
                this.pvwpStationRtOverviewDay.getData({
                    stcls: '01',
                    date: this.showTime
                }).then(res => {
                    this.upDateTime = new Date().Format('yyyy-MM-dd hh:mm:ss')
                    if (!res.body) {
                        this.pvwpStationRtOverviewDay.res.body = {
                            accum: {
                                data: {},
                                units: {}
                            },
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
                            }
                        }
                    }
                    this.$bus.emit('headData', this.pvwpStationRtOverviewDay.res.body)
                    this.$bus.emit('dataComplete')
                })
            } catch (e) {}
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
        this.$bus.off('dateChange', this.getTime)
        this.$bus.off('scrollChart', this.changeChart)
        this.$bus.off('stationChange', this.stationChange)
    }
}
</script>

<style lang="scss" scoped>
@import '../../theme/theme.scss';
[data-pagetheme="light"] {
    .child-section {
        .section {
            &.stShadow {
                box-shadow: 0px 6px 10px 0px rgba(70,185,195,0.36);
            }
        }
    }
}

[data-pagetheme="darkBlue"] {
    .child-section {
        .section {
            &.stShadow {
                box-shadow: 0px 6px 10px 0px rgba(70,185,195,0.36);
            }
        }
    }
}

[data-pagetheme="dark"] {}

.child-section {
    width: 100%;
    height: 1.2rem;
    .section {
        width: calc(25% - 20px);
        height: 100%;
        float: left;
        margin: 0 10px;
        box-sizing: border-box;
        @include page_c(background-color, $pageSectionBgColor);
        border-width: 1px;
        border-style: solid;
        @include page_c(border-color, $pageSectionBorderColor);
        border-radius: 4px;
        &.stShadow {
            @include page_c(background-color, $pageSectionActiveBgColor);
        }

        .iconfont.icon-shijian {
            display: block;
            float: right;
            margin-right: .03rem;
        }

        .right1 {
            overflow: hidden;
            @include page_c(color, $pageSectionDataNameColor);
            .icon {
                width: .25rem;
                height: .25rem;
                fill: currentColor;
                overflow: hidden;
                text-align: center;
                line-height: .25rem;
            }
            .temp-con {
                float: left;
                overflow: hidden;
                margin-top: 0.117rem;
                // padding-right: .05rem;
                // padding-left: .1rem;
                .num {
                    float: left;
                    padding-top: 3px;
                    font-size: 0.25rem;
                }
                .unit {
                    float: left;
                }
            }
            .wea-con {
                display: inline-block;
                overflow: hidden;
                vertical-align: bottom;
                padding-left: 0.03rem;
                .value {
                    font-size: 12px;
                    text-align: center;
                    // color: #606369;
                }
            }
        }
        .right2 {
            @include page_c(color, $pageSectionDataNameColor);
            .num-con {
                display: inline-block;
                font-size: 12px;
                padding-right: 6px;
                // color: #606369;
                .value {
                    padding-top: 5px;
                }
            }
            img {
                width: 17px;
            }
        }
    }
}
</style>
