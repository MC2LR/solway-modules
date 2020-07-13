<template>
    <div class="center-map">
        <select-station class="select-station"></select-station>
        <div class="center-box">
            <ve-heatmap
                :events="chartEvents"
                :set-option-opts="true"
                :after-set-option-once="getChart"
                :after-config="afterConfig"
                :data="chartData"
                :settings="chartSettings"
                height="100%">
            </ve-heatmap>
        </div>
        <station-popup @close="showPopup = false" v-show="stid && showPopup" class="station-popup" :style="{left: xPos + 'px', top: yPos + 'px'}"></station-popup>
        <map-ctrl class="map-ctrl"></map-ctrl>
    </div>
</template>

<script>
import VeHeatmap from 'v-charts/lib/heatmap.common.js'
import MapCtrl from './ctrl'
import SelectStation from './selectStation'
import StationPopup from './stationPopup'
import {api＿queryStationStatusMapData} from '@/request/api'
export default {
    components: {
        VeHeatmap,
        MapCtrl,
        SelectStation,
        StationPopup
    },
    data () {
        this.queryStationStatusMapData = api＿queryStationStatusMapData({later: true})
        this.chartSettings = {
            position: 'province/henan',
            // position: 'china',
            type: 'map',
            geo: {
                roam: true,
                label: {
                    show: true,
                    color: '#fff',
                    emphasis: {
                        color: '#fff'
                    }
                },
                itemStyle: {
                    normal: {
                        // areaColor: "#96EF8A",
                        // borderColor: "#56e4fd",
                        shadowColor: '#486dd6',
                        shadowOffsetX: 5,
                        shadowOffsetY: 5,
                        shadowBlur: 5,
                        areaColor: '#2156C4',
                        borderColor: '#486dd6',
                        // borderColor: '#7156A4',
                        borderWidth: '1'
                        // shadowColor: 'rgba(0,54,255, 1)',
                        // shadowBlur: 10
                    },
                    emphasis: {
                        areaColor: '#2146A4'
                    }
                }
            }
        }
        this.chartEvents = {
            click: (param) => {
                param.data && param.data.id && this.clickMapArea(param, param.data.id)
            }
        }
        return {
            showPopup: false,
            myChart: null,
            allStations: [],
            xPos: 0,
            yPos: 0,
            chartData: {
                columns: ['lat', 'lng', 'num'],
                rows: []
            }
        }
    },
    created () {
        this.$bus.on(this.$route.name + 'StationChange', this.stationChange)
        this.timer = setInterval(() => this.queryStationStatusMapData.getData(), this.$route.meta.refresh_interval)
        this.queryStationStatusMapData.subscribe(async res => {
            if (res.data.map(v => v.data.length).reduce((a, b) => a + b, 0) === 0) return
            this.allStations = res.data.reduce((a, b) => a.concat(b.name === '风电' ? [] : b.data), []).filter(v => v.id)
            this.setChart(this.allStations)
        })
    },
    computed: {
        stid () {
            return this.$store.state.userActionRecord[this.$route.name + '_selectedStid']
        }
    },
    methods: {
        stationChange (allStations) {
            if (this.myChart) {
                const option = this.myChart.getOption()
                if (allStations) {
                    option.series[0].data = allStations.map(v => [v.value[0], v.value[1], v.power])
                }
                this.myChart.clear()
                this.myChart.setOption(this.afterConfig(option), true)
            }
        },
        getChart (chart) {
            this.myChart = chart
            this.queryStationStatusMapData.getData()
        },
        setChart (allStations) {
            if (this.chartData.rows.length) return this.stationChange()
            this.chartData.rows = allStations.map(v => ({
                lat: v.value[0],
                lng: v.value[1],
                num: v.kw_r
            }))
        },
        afterConfig (options) {
            options.visualMap.seriesIndex = 0
            options.visualMap.show = false
            options.series[0].roam = false
            options.series[1] = {
                name: '电站',
                type: 'scatter',
                coordinateSystem: 'geo',
                roam: false,
                data: this.formatMapData(this.allStations)
            }
            options.tooltip = {
                trigger: 'item',
                formatter: function (a, b, c) {
                    // console.log(a.data)
                    return a.name + '<br/>实时功率：' + a.data.power + '千瓦' + '<br/>发电效率：' + a.data.kw_r.toFixed(2) + '%<br/>今日发电量：' + (a.data.dw || '-') + '千瓦时'
                }
            }
            return options
        },
        formatMapData (PartObj, idx) {
            return PartObj.filter(v => v.id).map(item => {
                const isCurentStation = (this.stid === item.id)
                const itemStyle = isCurentStation
                ? { normal: { color: 'rgba(255,214,103,1)', shadowColor: 'rgba(255,214,103,.5)' } }
                : { normal: { color: 'rgba(255,217,102,1)', shadowColor: 'rgba(255,255,255,1)' } }
                return {
                    dw: item.dw,
                    power: item.power,
                    name: item.name,
                    id: item.id,
                    kw_r: item.kw_r,
                    value: item.value,
                    symbolSize: isCurentStation ? 20 : 10,
                    itemStyle
                }
            })
        },
        clickMapArea (data, stid) {
            this.$store.dispatch('userActionRecord/setState', {key: this.$route.name + '_selectedStid', value: stid})
            this.$bus.emit(this.$route.name + 'StationChange')
            const e = data.event || window.event
            this.xPos = e.offsetX + document.body.scrollLeft + document.documentElement.scrollLeft
            this.yPos = e.offsetY + document.body.scrollTop + document.documentElement.scrollTop - 90
            this.showPopup = true
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
        this.$bus.off(this.$route.name + 'StationChange', this.stationChange)
    }
}
</script>

<style lang="scss" scoped>
.center-map {
    height: calc(100vh - 145px);
    position: relative;

    .select-station {
        position: absolute;
        left: 35%;
        top: 30px;
        z-index: 9;
    }

    .map-ctrl {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 30px;
        width: 30%;
        min-width: 450px;
    }

    .center-box {
        position: relative;
        width: 100%;
        height: 100%;
        margin: 0 auto;

        &::before {
            content: '';
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            width: 30%;
            height: 60%;
            background-color: #fff;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            background-color: rgba(69, 103, 164, .3);
            box-shadow: 0 0 300px 300px rgba(69, 103, 164, .3);
        }
    }

    .station-popup {
        position: absolute;
        z-index: 10;
        transform: translateX(-80%) translateY(-50%);
    }
}
</style>
