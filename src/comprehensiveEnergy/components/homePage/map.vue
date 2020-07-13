<template>
    <div class="home-map">
        <div ref="chinaChart" class="map-view"></div>
        <pop-up
            @close="popUp = false"
            :x="xPos"
            :y="yPos"
            :sid="stId"
            :sName="stName"
            v-if="popUp">
        </pop-up>
        <pop-up2
            @close="popUp2 = false"
            :x="xPos"
            :y="yPos"
            :sid="stId"
            :sName="stName"
            v-if="popUp2">
        </pop-up2>
    </div>
</template>

<script>
import 'echarts/map/js/china.js'
import {
    api＿mobileRtmDeviceMonitorGetPowerStationStatusDataNew2
} from '@comprehensiveEnergy/request/api'

export default {
    data () {
        return {
            myChart: null,
            mobileRtmDeviceMonitorGetPowerStationStatusDataNew2: api＿mobileRtmDeviceMonitorGetPowerStationStatusDataNew2().subscribe(this.updateData),
            xPos: 0,
            yPos: 0,
            popUp: false,
            popUp2: false,
            stId: '',
            stName: '',
            stData: ''
        }
    },
    mounted () {
        this.myChart = this.$echarts.init(this.$refs.chinaChart)
        this.myChart.on('click', (param) => {
            param.data && param.data.id && this.clickMapArea(param, param.data.id)
        })
        window.addEventListener('resize', this.myChart.resize)
        this.updateChart()
    },
    methods: {
        updateChart () {
            this.myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                geo: {
                    map: 'china',
                    roam: true,
                    regions: [
                        {
                            name: '南海诸岛',
                            value: 0,
                            itemStyle: {
                                normal: {
                                    opacity: 0,
                                    label: {
                                        show: false
                                    }
                                }
                            }
                        }
                    ],
                    label: {
                        normal: {
                            show: false,
                            textStyle: {
                                color: '#16e6ff',
                                borderColor: 'rgb(0,211,255)'
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: 'white'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: 'rgba(0,0,0,0.5)',
                            borderColor: 'rgb(0,211,255)'
                        },
                        emphasis: {
                            areaColor: 'rgba(75,241,241,0.65)'
                        }
                    }
                },
                series: [
                    {
                        name: '分布式光伏',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        roam: false,
                        symbolSize: 8,
                        data: []
                    }
                ]
            })
        },
        updateData (res) {
            const op = this.myChart.getOption()
            res.data.forEach(v => {
                if (v.name === '分布') {
                    op.series[0].data = this.formatMapData(v)
                }
            })
            this.myChart.setOption(op, true)
        },
        async clickMapArea (param, id) {
            const e = param.event || window.event
            this.stId = id
            this.stName = param.name
            this.stData = param
            this.xPos = e.offsetX + document.body.scrollLeft + document.documentElement.scrollLeft
            this.yPos = e.offsetY + document.body.scrollTop + document.documentElement.scrollTop
            await this.$timeout(0)
            if (this.$store.getters.isEnergyStation(id)) {
                this.popUp = true
            } else {
                this.popUp2 = true
            }
        },
        formatMapData (PartObj) {
            const arrData = []
            const symbol = 'circle'

            for (let j = 0; j < PartObj.data.length; j++) {
                const powerName = PartObj.data[j].name
                const itemStyle = {
                    color: '#FFAC35',
                    shadowColor: 'rgba(255,172,53,1)',
                    shadowBlur: 10
                }
                const normalitemStyle = { normal: itemStyle }
                const obj = {
                    name: powerName,
                    id: PartObj.data[j].id,
                    value: PartObj.data[j].value,
                    symbol: symbol,
                    itemStyle: normalitemStyle
                }
                arrData.push(obj)
            }
            return arrData
        }
    },
    components: {
        PopUp: () => import('./popUp'),
        PopUp2: () => import('./popUp2')
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.myChart.resize)
        if (this.myChart && !this.myChart.isDisposed) {
            this.myChart.clear()
            this.myChart.dispose()
            this.myChart = null
        }
    }
}
</script>

<style lang="scss" scoped>
.home-map {
    .map-view {
        width: 100%;
        height: 100%;
    }
}
</style>
