<template>
    <div class='lossAnalysis'>
        <page-header></page-header>
        <div>
            <date-btn-group @change="changeDate"/>
        </div>
        <div class="sankey-con">
            <ve-sankey :events="chartEvents" :data='chartData' :after-config="afterConfig" :settings='chartSettings' v-loading='getStationEnergy.loading' width="100%" height="100%"></ve-sankey>
        </div>
    </div>
</template>

<script>
import {rem} from '@comm/mixin'
import {api＿getStationEnergy} from '@newEnergyCloud/request/api'
import dateBtnGroup from '@/components/dateBtnGroup'
import Sankey from 'v-charts/lib/sankey.common'
import PageHeader from './header'
export default {
    mixins: [rem],
    components: {
        VeSankey: Sankey,
        dateBtnGroup,
        PageHeader
    },
    data () {
        return {
            themeMapCommon: {
                '理论电量': {
                    name: 'shd_kwh_chk',
                    borderColor: 'rgba(86, 118, 232, 0.1)',
                    color: 'rgba(237, 239, 249, 1)',
                    lineColor: 'rgba(86, 118, 232, 0.2)',
                    shadowColor: 'rgba(86, 118, 232, 0.5)'
                },
                '实发电量': {
                    name: 'real_kwh_chk',
                    borderColor: 'rgba(86, 118, 232, 0.1)',
                    color: 'rgba(237, 239, 249, 1)',
                    lineColor: 'rgba(86, 118, 232, 0.4)',
                    shadowColor: 'rgba(86, 118, 232, 0.5)'
                },
                '灰尘损失电量': {
                    name: 'dust_we_r',
                    color: 'rgba(114,234,165,0.4)',
                    borderColor: 'rgba(72, 205, 129, 0.5)'
                },
                '阴影损失电量': {
                    name: 'shade_we_r',
                    color: 'rgba(145, 107, 255, 0.4)',
                    borderColor: 'rgba(112, 64, 251, 0.5)'
                },
                '故障损失电量': {
                    name: 'fail_we_r',
                    color: 'rgba(103,216,255,0.4)',
                    borderColor: 'rgba(48,198,249,0.5)'
                },
                '限电损失电量': {
                    name: 'restrict_we_r',
                    color: 'rgba(249, 129, 5, 0.4)',
                    borderColor: 'rgba(245, 94, 6, 0.5)'
                },
                '检修损失电量': {
                    name: 'repair_we_r',
                    color: 'rgba(253, 204, 79, 0.4)',
                    borderColor: 'rgba(255, 174, 0, 0.5)'
                },
                '上网电量': {
                    name: 'send_kwh_chk',
                    borderColor: 'rgba(86, 118, 232, 0.1)',
                    color: 'rgba(237, 239, 249, 1)',
                    lineColor: 'rgba(86, 118, 232, 0.4)',
                    shadowColor: 'rgba(86, 118, 232, 0.5)'
                },
                '线损电量': {
                    name: 'line_we_r',
                    color: 'rgba(103, 216, 255, 0.4)',
                    borderColor: 'rgba(48, 198, 249, 0.5)'
                }
            },
            themeMapDark: {
                '理论电量': {
                    name: 'shd_kwh_chk',
                    borderColor: 'rgba(86,118,232,0.2)',
                    color: 'transparent',
                    lineColor: 'rgba(86, 118, 232, 0.4)',
                    shadowColor: 'rgba(86,118,232,0.5)'
                },
                '实发电量': {
                    name: 'real_kwh_chk',
                    borderColor: 'rgba(86,118,232,0.2)',
                    color: 'transparent',
                    lineColor: 'rgba(86, 118, 232, 0.4)',
                    shadowColor: 'rgba(86, 118, 232, 0.5)'
                },
                '灰尘损失电量': {
                    name: 'dust_we_r',
                    color: 'rgba(114,234,165,0.42)',
                    borderColor: 'rgba(72,205,129,0.8)',
                    shadowColor: 'rgba(20, 20, 20, 0.5)'
                },
                '阴影损失电量': {
                    name: 'shade_we_r',
                    color: 'rgba(145,107,255,0.42)',
                    borderColor: 'rgba(112, 64, 251, 0.8)',
                    shadowColor: 'rgba(20, 20, 20, 0.5)'
                },
                '故障损失电量': {
                    name: 'fail_we_r',
                    color: 'rgba(103,216,255,0.42)',
                    borderColor: 'rgba(48,198,249,0.8)',
                    shadowColor: 'rgba(20, 20, 20, 0.5)'
                },
                '限电损失电量': {
                    name: 'restrict_we_r',
                    color: 'rgba(249, 129, 5, 0.42)',
                    borderColor: 'rgba(245, 94, 6, 0.8)',
                    shadowColor: 'rgba(20, 20, 20, 0.5)'
                },
                '检修损失电量': {
                    name: 'repair_we_r',
                    color: 'rgba(253, 204, 79, 0.42)',
                    borderColor: 'rgba(255, 174, 0, 0.8)',
                    shadowColor: 'rgba(20, 20, 20, 0.5)'
                },
                '上网电量': {
                    name: 'send_kwh_chk',
                    borderColor: 'rgba(86,118,232,0.2)',
                    color: 'transparent',
                    lineColor: 'rgba(86, 118, 232, 0.4)',
                    shadowColor: 'rgba(86, 118, 232, 0.5)'
                },
                '线损电量': {
                    name: 'line_we_r',
                    color: 'rgba(103, 216, 255, 0.42)',
                    borderColor: 'rgba(48, 198, 249, 0.8)',
                    shadowColor: 'rgba(20, 20, 20, 0.5)'
                }
            },
            chartSettings: {},
            chartData: {},
            date: {},
            data: [],
            chartEvents: {},
            getStationEnergy: api＿getStationEnergy({
                later: true,
                onlyLatest: true
            })
        }
    },
    computed: {
        themeMap () {
            return this.$store.getters.global_theme === 'dark' ? this.themeMapDark : this.themeMapCommon
        }
    },
    methods: {
        changeDate (date) {
            this.startDate = date[0].Format('yyyy-MM-dd')
            this.endDate = date[1].Format('yyyy-MM-dd')
            this.$bus.$emit('changeDateLossEmit', {startDate: this.startDate, endDate: this.endDate})
            this.getData()
        },
        stationChange () {
            this.getData()
        },
        getData () {
            this.getStationEnergy.getData({startDate: this.startDate, endDate: this.endDate}).then(res => {
                if (res.code === 0) {
                    this.data = res.body.data
                    this.initGraph(res.body.data, res.body.links)
                }
            })
        },
        initGraph (data, links) {
            this.chartSettings = {
                links: links,
                label: {
                    normal: {
                        formatter: v => v.data.name + (v.data.value !== null ? (': ' + v.data.value + '%') : ''),
                        color: this.$store.getters.global_theme === 'dark' ? '#2FBFCB' : 'rgba(86, 118, 232, 1)',
                        fontSize: 14
                    }
                }
            }
            this.chartData = {
                rows: data,
                columns: ['name', 'value']
            }
        },
        afterConfig (option) {
            option.series[0].nodeGap = 20
            option.series[0].draggable = false
            option.series[0].links = option.series[0].links.map(v => {
                if (Object.keys(this.themeMap).includes(v.target)) {
                    return {
                        ...v,
                        lineStyle: {
                            opacity: 0.5,
                            color: (this.themeMap[v.target] || this.themeMap[v.source]).lineColor ? (this.themeMap[v.target] || this.themeMap[v.source]).lineColor : (this.themeMap[v.target] || this.themeMap[v.source]).color
                        }
                    }
                }
                return v
            })
            let _this = this
            option.series[0].data = this.data.map(v => {
                if (Object.keys(this.themeMap).includes(v.name)) {
                    return {
                        ...v,
                        value: v.r,
                        itemStyle: {
                            normal: {
                                color: this.themeMap[v.name].color,
                                borderColor: this.themeMap[v.name].borderColor,
                                shadowColor: this.themeMap[v.name].shadowColor ? this.themeMap[v.name].shadowColor : this.themeMap[v.name].color,
                                borderWidth: 4,
                                shadowBlur: 8
                            }
                        },
                        tooltip: {
                            formatter (params) {
                                if (params.data.target) return ''
                                if (_this.$store.getters.global_theme === 'dark') {
                                    return params.data.we + '千瓦时'
                                } else {
                                    return params.data.we + 'kWh'
                                }
                            }
                            // formatter: v.value + ' kWh'
                        }
                    }
                } else {
                    return {
                        ...v,
                        itemStyle: {
                            normal: {
                                opacity: 0
                            }
                        }
                    }
                }
            })
            return option
        }
    },
    created () {
        const self = this
        this.chartEvents = {
            click: function (e) {
                if (e.name === '灰尘损失电量') {
                    self.$router.push({name: 'ashAnalysis'})
                } else if (e.name === '故障损失电量') {
                    self.$router.push({name: 'deviceFault'})
                } else if (e.name === '阴影损失电量') {
                    self.$router.push({name: 'shadowAnalysis'})
                }
            }
        }
        this.$bus.on('stationChange', this.stationChange)
    },
    mounted () {
        // this.changeDate([new Date(new Date().getTime() - 86400000), new Date(new Date().getTime() - 86400000)])
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.stationChange)
    }
}
</script>

<style lang='scss' scoped>
[data-pagetheme="dark"] {
    .lossAnalysis{
        background:url('../../assets/images/analysis-bg.jpg') no-repeat;
        background-size: cover;
    }
}
.lossAnalysis {
    height: 100%;
    padding: 0px 10px 15px;
    .sankey-con{
        width:100%;
        height: calc(100vh - 100px);
    }
}
</style>
