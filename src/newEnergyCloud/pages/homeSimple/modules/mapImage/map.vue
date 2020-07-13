<template>
    <ve-map :key="key" v-loading="queryStationStatusMapData.loading" height="100%" :after-set-option="getChart" :settings="chartSettings" :geo="chartGeo" :series="chartSeries" :data="chartData"/>
</template>

<script>
import VeMap from 'v-charts/lib/map.common'
import 'echarts-gl'
import {api＿queryStationStatusMapData} from '@/request/api'
export default {
    components: {
        VeMap
    },
    data () {
        this.chartData = {
            columns: [],
            rows: []
        }
        this.chartSettings = {
            position: 'china'
        }
        this.chartGeo = {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            zoom: 1.2,
            aspectScale: 1,
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: 'rgba(0,0,0,0.5)',
                    borderColor: 'rgb(0,211,255)'
                }
            }
        }
        this.chartSeries = [
            {
                name: '地面光伏',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                roam: false,
                symbolSize: 8,
                // symbol: 'rect',
                data: []
            },
            {
                name: '分布式光伏',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                roam: false,
                symbolSize: 8,
                // symbol: 'circle',
                data: []
            },
            {
                name: '户用光伏',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                roam: false,
                symbolSize: 8,
                // symbol: 'triangle',
                data: []
            },
            {
                name: '风电',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                roam: false,
                symbolSize: 15,
                // symbol: 'image://url',
                data: []
            }
        ]
        this.queryStationStatusMapData = api＿queryStationStatusMapData({later: true})
        return {
            key: Date.now(),
            Echart: null,
            timer: null,
            currentId: null,
            currentStationIndex: 0
        }
    },
    created () {
        this.queryStationStatusMapData.subscribe(async res => {
            if (res.data.map(v => v.data.length).reduce((a, b) => a + b, 0) === 0) {
                await this.$timeout(5000)
                return this.queryStationStatusMapData.getData()
            }
            this.allStations = res.data.reduce((a, b) => a.concat(b.data), []).filter(v => v.id && v.picFlag)
            this.setChart(res)
        })

        this.$bus.on('changeMapStation', this.setChart)

        window.addEventListener('resize', this.windowResize)
    },
    methods: {
        windowResize (e) {
            if (e.isTrusted) this.key = Date.now()
        },
        getChart (data) {
            if (this.Echart) {
                this.Echart = data
                this.newOption = this.Echart.getOption()
                this.mapDataToOption()
            } else {
                this.Echart = data
                this.newOption = this.Echart.getOption()
                this.queryStationStatusMapData.getData()
            }
        },
        async setChart () {
            let name = ''
            let picFlag = false
            let id = this.currentId
            if (this.allStations.length) {
                const {name: Name, picFlag: PicFlag, id: Id} = this.allStations[this.currentStationIndex]
                name = Name
                picFlag = PicFlag
                id = Id
                if (++this.currentStationIndex === this.allStations.length) this.currentStationIndex = 0
            }
            this.currentId = id
            this.mapDataToOption()
            if (!this.currentId) return
            await this.$timeout(5000)
            picFlag && this.$bus.emit('changeStationImage', {stid: this.currentId, name})
            await this.$timeout(1000)
            picFlag && this.$emit('slideTop', '-100%')
        },
        mapDataToOption () {
            this.queryStationStatusMapData.res.data.forEach(v => {
                switch (v.name) {
                    case '地面':
                        this.newOption.series[0].data = this.formatMapData(v, '1')
                        break

                    case '分布':
                        this.newOption.series[1].data = this.formatMapData(v, '2')
                        break

                    case '户用':
                        this.newOption.series[2].data = this.formatMapData(v, '3')
                        break

                    case '风电':
                        this.newOption.series[3].data = this.formatMapData(v, '4')
                        break

                    default:
                        break
                }
            })
            this.Echart.setOption(this.newOption, false, true)
        },
        formatMapData (PartObj, idx) {
            let validStations = PartObj.data.filter(v => v.id)

            const result = validStations.map(item => {
                const isCurentStation = (this.currentId === item.id)
                const itemStyle = isCurentStation
                ? { normal: { color: 'rgba(255,214,103,1)', shadowColor: 'rgba(255,214,103,.5)', shadowBlur: 30 } }
                : { normal: { color: '#23FCFF', shadowBlur: 0 } }
                return {
                    name: item.name,
                    id: item.id,
                    value: item.value,
                    symbolSize: isCurentStation ? 20 : 6,
                    // symbol: symbol,
                    itemStyle,
                    label: {
                        show: isCurentStation,
                        formatter: '{b}',
                        position: 'right'
                    }
                }
            })
            validStations = null
            return result
        }
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.windowResize)
        this.$bus.off('changeMapStation', this.setChart)
    }
}
</script>
