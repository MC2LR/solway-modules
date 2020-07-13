<template>
    <div class='ash-block-c'>
        <div style="text-indent:10px;margin-bottom: 10px;">清洗计算器</div>
        <div class="clearfix" style="margin: 0 10px 20px 10px;height: calc(100% - 260px);">
            <div class='pull-left chart-con'>
                <div class="lengend-con">
                    <span class="lengend"><span class="square square1"></span>最近一周发电量</span>
                    <span class="lengend"><span class="square square2"></span>未来一周参考发电量</span>
                    <span class="lengend"><span class="square square3"></span>预计洗后未来一周发电量</span>
                </div>
                <ve-line v-if="chartData.rows" :data='chartData' :settings='chartSettings' :after-config='afterConfig' height='100%'></ve-line>
            </div>
            <div class="pull-right weather-con">
                <div class="text-center">
                    <span>今日</span>
                    <svg class="weather-icon" aria-hidden="true" style="vertical-align:middle;">
                        <use :xlink:href="iconMap[this.day0]"></use>
                    </svg>
                </div>
                <div class="clearfix">
                    <div class="pull-left width2-1">
                        <p>明日</p>
                        <div>
                            <svg class="weather-icon" aria-hidden="true">
                                <use :xlink:href="iconMap[this.day1]"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="pull-left width2-1">
                        <p>后日</p>
                        <div>
                            <svg class="weather-icon" aria-hidden="true">
                                <use :xlink:href="iconMap[this.day2]"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix" style="margin: 20px 10px 0 10px;">
            <div class="pull-left width-left">
                <div>
                    <p class="light-height">参考最近一周的发电量与电站积灰速度:</p>
                    <p class="light-height">预计清洗后一周内可提升发电量<span class="promote-money">{{pro}}</span>kWh</p>
                    <p class="light-height">产生效益<input type="text" class="result-money" v-model="resultMoney">元</p>
                    <p class="light-height" v-if="day0 == '3' || day1 == '3' || day2 == '3'">
                        <span style="color:red;">提醒：未来3日降雨概率{{rainRate}}%,</span>
                        建议雨后安排清洗工作
                    </p>
                </div>
            </div>
            <div class="pull-left width-right">
                <p>清洗总成本（元）</p>
                <div><input type="text" v-model="cleanMoney" class="input-class" /></div>
                <p>电价（元）</p>
                <div><input type="text" v-model="onlineMoney" class="input-class" /></div>
                <div><a class="cal-btn" @click="computer()">计算</a></div>
            </div>
        </div>
    </div>
</template>

<script>
import {api＿cleanCalculator, api＿stationMonitorWeather3day} from '@newEnergyCloud/request/api'
import echarts from 'echarts/lib/echarts'
import theme from '../theme/theme'
const $ = window.jQuery
export default {
    mixins: [theme],
    data () {
        return {
            day0: '',
            day1: '',
            day2: '',
            rainRate: null,
            iconMap: {
                '1': '#icon-taiyang-',
                '2': '#icon-yintian-1',
                '3': '#icon-xiayu-',
                '4': '#icon-weather_snow',
                '5f': '#icon-mai',
                '6': ''
            },
            pro: null,
            cleanMoney: '',
            onlineMoney: '',
            resultMoney: '',
            chartData: {},
            chartSettings: {
                yAxisName: ['发电量'],
                area: true
            },
            Xratio: null, // 今日占据整个横轴的百分比
            maxLength: null,
            averageData: null,
            cleanCalculator: api＿cleanCalculator({
                later: true,
                res: {}
            }),
            stationMonitorWeather3day: api＿stationMonitorWeather3day({
                later: true
            })
        }
    },
    methods: {
        getData () {
            this.cleanCalculator.getData({'stId': this.$store.getters.station_id}).then(res => {
                this.pro = res.body.pro
                this.data = res.body.Line.real_kwh_chk
                this.maxLength = Math.floor(Math.max.apply(null, this.data)).toString().length
                this.resizeWindow()
                // this.data = [23, 4, 34, 23, 24, 25, 21, null, 20, 89, 80, 79, 79, 70, 60] // test
                this.dtime = [1, 2, 3, 4, 5, 6, 7, '1', '2', '3', '4', '5', '6', '7']
                this.dataBefore = this.data.slice(0, 7)
                this.dataAfter = this.data.slice(8)
                this.averageData = Math.round((this.dataBefore.reduce((a, b) => (a + b))) / 7)
                this.drawGraph()
            })
            this.stationMonitorWeather3day.getData().then(res => {
                this.day0 = res.data.day0 ? (res.data.day0.cond_code2 ? res.data.day0.cond_code2 : '') : ''
                this.day1 = res.data.day1 ? (res.data.day1.cond_code2 ? res.data.day1.cond_code2 : '') : ''
                this.day2 = res.data.day2 ? (res.data.day2.cond_code2 ? res.data.day2.cond_code2 : '') : ''
                if ((res.data.day0 && res.data.day0.cond_code2) || (res.data.day1 && res.data.day1.cond_code2) || (res.data.day2 && res.data.day2.cond_code2)) {
                    this.rainRate = res.data.day0.cond_code2 === 3 ? res.data.day0.pop : (res.data.day1.cond_code2 === 3 ? res.data.day1.pop : (res.data.day2.cond_code2 === 3 ? res.data.day2.pop : ''))
                } else {
                    this.rainRate = '-'
                }
            })
        },
        drawGraph () {
            let rows = []
            this.dtime.map((v, i) => {
                rows.push({
                    '日期': v,
                    '发电量': this.data[i]
                })
            })
            this.chartData = {
                columns: ['日期', '发电量'],
                rows
            }
        },
        afterConfig (options) {
            let averageData = this.averageData
            let dataBefore = []
            let dataAfter = [['今日', this.dataAfter[0]]]
            new Array(7).fill(0).forEach((v, i) => {
                dataBefore.push(
                    [i, this.dataBefore[i]]
                )
            })
            new Array(7).fill(0).forEach((v, i) => {
                dataAfter.push(
                    [i + 1 + '', this.dataAfter[i]]
                )
            })
            options.grid = {
                top: '60',
                bottom: '5',
                left: '0',
                right: '10'
            }
            options.legend = {
                show: false
            }
            options.yAxis[0].name = '发电量 ' + (this.$store.getters.global_theme === 'dark' ? '千瓦时' : 'kWh')
            options.yAxis[0].nameTextStyle = {
                align: 'left'
            }
            options.yAxis[0].splitLine = {
                show: false
            }
            options.xAxis[0].boundaryGap = false
            options.xAxis[0].axisLine = {
                show: true,
                lineStyle: {
                    color: this.theme.$axisTextColor,
                    width: 1
                }
            }
            options.yAxis[0].axisLine = {
                show: true,
                lineStyle: {
                    color: this.theme.$axisTextColor,
                    width: 1
                }
            }
            options.series = [{
                name: '发电量',
                type: 'line',
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(72,205,129,1)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(72,205,129, 0.5)'
                    }])
                },
                itemStyle: {
                    color: 'rgba(72,205,129,1)'
                },
                markLine: {
                    symbol: ['none', 'none'],
                    lineStyle: {
                        color: '#FA6E6E',
                        type: 'solid'
                    },
                    data: [
                        [{
                            yAxis: averageData,
                            xAxis: 0,
                            label: {
                                formatter: '平均值：' + averageData,
                                position: 'middle'
                            }
                        }, {
                            yAxis: averageData,
                            xAxis: 6
                        }],
                        [{
                            label: {
                                formatter: '今日',
                                position: 'end'
                            },
                            lineStyle: {
                                color: this.theme.$axisTextColor,
                                type: 'solid'
                            },
                            yAxis: 0,
                            x: this.Xratio + '%'
                        }, {
                            yAxis: Math.floor(averageData / 3),
                            x: this.Xratio + '%'
                        }]
                    ]
                },
                data: dataBefore
            }, {
                name: '发电量',
                type: 'line',
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0,175,236,0.8)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(0,175,236,0.4)'
                    }])
                },
                itemStyle: {
                    color: 'rgba(0,175,236,0.8)'
                },
                markLine: {
                    symbol: ['none', 'none'],
                    lineStyle: {
                        color: 'rgba(255,196,18,1)',
                        type: 'solid'
                    },
                    data: [
                        [{
                            yAxis: averageData,
                            xAxis: '1'
                        }, {
                            yAxis: averageData,
                            xAxis: this.dtime[this.dtime.length - 1]
                        }]
                    ]
                },
                data: dataAfter
            }]
            return options
        },
        computer () {
            this.resultMoney = Math.round((this.pro * this.onlineMoney - this.cleanMoney) * 100) / 100
        },
        resizeWindow () {
            let parentW = $('.chart-con').width()
            let leftMaxNum = 5 * this.maxLength + 10
            let Xharf = (parentW - leftMaxNum) / 2
            this.Xratio = ((leftMaxNum + Xharf) / parentW * 100).toFixed(2)
        }
    },
    created () {
        this.$bus.on('stationChange', this.getData)
        this.getData()
    },
    mounted () {
        window.addEventListener('resize', this.resizeWindow)
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.getData)
        window.removeEventListener('resize', this.resizeWindow)
    }
}
</script>

<style lang='scss' scoped>
@import '../theme/theme.scss';
.ash-block-c {
    height: 100%;
    padding:10px;
    position:relative;
    @include page_c(color, $pageHeadSectionWordColor);
    .lengend-con{
        position:absolute;
        left: 0;
        width:calc(100% - 175px);
        font-size:12px;
        margin-top: 5px;
        .lengend{
            margin-left:25px;
            .square{
                display: inline-block;
                width:8px;
                height: 8px;
                margin-right:6px;
                font-size: 12px;
                color: #73767C;
                &.square1{
                    background:#48CD81;
                }
                &.square2{
                    background:#FFC412;
                }
                &.square3{
                    background: #00AFEC;
                }
            }
        }
    }
    .chart-con{
        height: 100%;
        width: 66%;
    }
    .weather-con{
        width:31%;
        border:1px solid rgba(189,192,197,0.3);
        text-align: center;
        margin-top: 27px;
        padding:6px 0;
        .width2-1{
            width:49%;
            text-align: center;
            padding-top: 10px;
        }
        .weather-icon{
            width:30px;
            height: 55px;
        }
    }
    .width-left{
        width:65%;
        margin-right:1%;
        .light-height{
            line-height: 46px;
        }
        .result-money{
            width:98px;
            height:24px;
            background:rgba(221,243,244,0.2);
            border:2px solid rgba(47,191,204,1);
            border-radius:4px;
            margin:0 10px;
            @include page_c(color, $pageHeadSectionWordColor);
        }
        .promote-money{
            border-bottom: 1px solid rgb(47, 191, 204);
            margin: 0 6px;
            font-size: 20px;
        }
    }
    .width-right{
        width:33%;
        padding-left: 3%;
        .input-class{
            width: 100%;
            height:41px;
            background:rgba(221,243,244,1);
            border-radius:4px;
            border:none;
            margin:4px 0 20px;
        }
        .cal-btn{
            display: block;
            font-size:17px;
            color: white;
            width:100%;
            height:36px;
            line-height: 36px;
            text-align: center;
            background:rgba(47,191,204,1);
            border-radius:4px;
            margin-top: 15px;
            cursor: pointer;
        }
    }
}
</style>
