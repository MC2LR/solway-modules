<template>
    <div class="wrap clearfix">
        <div class="water-con pull-left">
            <div class="circle-bg" :class="{'circle-bg1': rangeType === 0, 'circle-bg2': rangeType === 1, 'circle-bg3': rangeType === 2, 'circle-bg4': rangeType === 3}">
                <ve-liquidfill
                    :data="chartData"
                    ref="waterChart"
                    width='100%'
                    height='100%'
                    :settings="chartSettings">
                </ve-liquidfill>
            </div>
            <div class="label-name">{{liquidName}}</div>
        </div>
        <div class="data-con pull-left">
            <div class="top">
                <div class="name">
                    {{bigDataName}}
                    <slot name="time"></slot>
                </div>
                <div class="value"><span>{{bigDataValue ? bigDataValue : bigDataValue === 0 ? 0 : '-'}}</span><span style="font-size: 12px">{{bigDataUnit}}</span></div>
            </div>
            <div class="bottom">
                <div class="left">
                    <div class="name">{{smallDataName}}</div>
                    <div class="value">{{smallDataValue ? smallDataValue : smallDataValue === 0 ? 0 : '-'}}{{smallDataUnit}}</div>
                </div>
                <div class="right pull-right">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Liquidfill from 'v-charts/lib/liquidfill.common'
import theme from '../../theme/theme'

export default {
    mixins: [theme],
    props: {
        liquidValue: {
            type: Number
        },
        liquidName: {
            type: String
        },
        bigDataName: {
            type: String
        },
        bigDataValue: {
            type: Number
        },
        bigDataUnit: {
            type: String
        },
        smallDataName: {
            type: String
        },
        smallDataValue: {
            type: Number
        },
        smallDataUnit: {
            type: String
        }
    },
    data () {
        return {
            colorMapArr: ['rgba(255, 115, 129, 0.4)', 'rgba(255, 168, 92, 0.4)', 'rgba(70, 203, 215, 0.4)', 'rgba(72, 205, 129, 0.4)'],
            outlineColorMapArr: ['rgba(255, 115, 129, 0.2)', 'rgba(255, 168, 92,0.2)', 'rgba(70, 203, 215,0.2)', 'rgba(72, 205, 129,0.2)'],
            rangeType: 0,
            chartSettings: {},
            chartData: {},
            pageTheme: ''
        }
    },
    components: {
        VeLiquidfill: Liquidfill
    },
    mounted () {
        this.pageTheme = this.theme.$a
        this.$bus.on('dataComplete', this.drawGraph)
        this.$bus.on('switch_theme', this.themeChange)
        setTimeout(() => {
            this.$refs.waterChart && this.$refs.waterChart.resize()
        }, 0)
    },
    methods: {
        judgeRange (rate) {
            if (!rate) {
                this.rangeType = 0
            } else if (rate >= 0 && rate < 0.25) {
                this.rangeType = 0
            } else if (rate >= 0.25 && rate < 0.5) {
                this.rangeType = 1
            } else if (rate >= 0.5 && rate < 0.75) {
                this.rangeType = 2
            } else if (rate >= 0.75) {
                this.rangeType = 3
            }
        },
        setGraphSettings (value) {
            this.judgeRange(value / 100)
            this.chartSettings = {
                wave: [value / 100],
                seriesMap: [
                    {
                        period: 1500,
                        waveLength: '100%',
                        amplitude: '3%',
                        color: [this.colorMapArr[this.rangeType]],
                        backgroundStyle: {
                            color: this.outlineColorMapArr[this.rangeType]
                        },
                        center: ['50%', '50%'],
                        radius: '71%',
                        label: {
                            color: this.theme.$sectionWaterColor,
                            insideColor: this.theme.$sectionWaterColor,
                            fontSize: 13,
                            formatter (options) {
                                if (value !== 0 && !value) return '-%'
                                return `${parseFloat((options.value * 100).toFixed(2))}%`
                                // return `${parseInt(options.value * 100)}%`
                            }
                        },
                        outline: {
                            borderDistance: '0',
                            itemStyle: {
                                borderColor: 'transparent',
                                borderWidth: '0'
                            }
                        },
                        tooltip: {
                            confine: true
                        }
                    }
                ]
            }
        },
        async drawGraph () {
            await this.$timeout(0)
            this.setGraphSettings(this.liquidValue)
            this.chartData = {
                columns: ['name', 'percent'],
                rows: [{
                    name: this.liquidName,
                    percent: this.liquidValue / 100
                }]
            }
        },
        async themeChange (theme) {
            await this.$timeout(0)
            this.pageTheme = this.theme.$a
            this.setGraphSettings(this.liquidValue)
            this.chartData = {
                columns: ['name', 'percent'],
                rows: [{
                    name: this.liquidName,
                    percent: this.liquidValue / 100
                }]
            }
        }
    },
    beforeDestroy () {
        this.$bus.off('dataComplete', this.drawGraph)
        this.$bus.on('switch_theme', this.themeChange)
    }
}
</script>

<style lang="scss" scoped>
@import '../../theme/theme.scss';
.wrap {
    height: 100%;
    position: relative;
    padding: 0px 10px 17px 0;
    cursor: pointer;
    .water-con {
        width: .96rem;
        height: 100%;
        padding-top: .1rem;
        position: relative;
        .circle-bg {
            width: 100%;
            height: .82rem;
            margin: 0 auto;
            &.circle-bg1 {
                background: url('../../img/circle1.png') no-repeat;
                background-size: 70%;
                background-position: center;
            }
            &.circle-bg2 {
                background: url('../../img/circle2.png') no-repeat;
                background-size: 70%;
                background-position: center;
            }
            &.circle-bg3 {
                background: url('../../img/circle3.png') no-repeat;
                background-size: 70%;
                background-position: center;
            }
            &.circle-bg4 {
                background: url('../../img/circle4.png') no-repeat;
                background-size: 70%;
                background-position: center;
            }
        }
        .label-name {
            width: 100%;
            // color: #73757C;
            @include page_c(color, $pageSectionlabelNameColor);
            text-align: center;
            font-size: 12px;
            position: absolute;
            bottom: 0;
        }
    }
    .data-con {
        width: calc(100% - 0.96rem);
        height: 100%;
        padding-top: .15rem;
        position: relative;
        .top {
            .name {
                font-size: 12px;
                // color: #606369;
                @include page_c(color, $pageSectionDataNameColor);
            }
            .value {
                padding-top: .05rem;
                @include page_c(color, $pageSectionDataNameColor);
                span {
                    font-size: 25px;
                    @include page_c(color, $pageSectionBigDataColor);
                }
            }
        }
        .bottom {
            width: 100%;
            position: absolute;
            bottom: 0px;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            .left {
                // width: .95rem;
                float: left;
                font-size: 12px;
                // color: #606369;
                @include page_c(color, $pageSectionDataNameColor);
                // padding-right: .1rem;
                .name {
                    padding-bottom: 5px;
                }
            }
        }
    }
}
</style>
