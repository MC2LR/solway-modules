<template>
    <ve-map :key="key" v-loading="queryStationStatusMapData.loading" height="100%" :after-set-option="getChart" :settings="chartSettings" :geo="chartGeo" :series="chartSeries" :data="chartData"/>
</template>

<script>
import VeMap from 'v-charts/lib/map.common'
import 'echarts-gl'
import {api＿queryStationStatusMapData} from '@/request/api'
// import shanghaiJson from 'echarts/map/json/province/shanghai.json'
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
            // mapOrigin: shanghaiJson
            // position: 'china'
            mapURLProfix: 'https://unpkg.com/echarts@4.8.0/map/json/',
            position: 'province/shanghai',
            beforeRegisterMap (data) {
                data.features.map(v => {
                    if (v.properties.name === '崇明区') v.properties['cp'] = [121.867706, 31.485944]
                    if (v.properties.name === '浦东新区') v.properties['cp'] = [121.767706, 31.105944]
                    if (v.properties.name === '奉贤区') v.properties['cp'] = [121.558472, 30.912345]
                    if (v.properties.name === '闵行区') v.properties['cp'] = [121.445972, 31.051658]
                    if (v.properties.name === '金山区') v.properties['cp'] = [121.300736, 30.8024697]
                    if (v.properties.name === '宝山区') v.properties['cp'] = [121.399999, 31.398896]
                })
                return data
            }
        }
        this.chartGeo = {
            map: 'province/shanghai',
            // map: 'china',
            label: {
                show: true,
                color: '#fff',
                fontSize: '12',
                emphasis: {
                    show: false
                },
                formatter (v) {
                    if (v.name === '长宁区') {
                        return '上海市区'
                    }
                    return v.name
                }
            },
            zoom: 1.7,
            aspectScale: 1,
            // center: [105, 38],
            center: [121.473717, 31.1055],
            roam: true,
            // itemStyle: {
            //     normal: {
            //         areaColor: 'rgba(0,0,0,0.5)',
            //         borderColor: 'rgb(0,211,255)'
            //         // areaColor: '#23FCFF',
            //         // borderColor: '#111'
            //     }
            // },
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
            },
            regions: [{
                name: '普陀区',
                label: {
                    color: 'transparent'
                }
            }, {
                name: '杨浦区',
                label: {
                    color: 'transparent'
                }
            }, {
                name: '黄浦区',
                label: {
                    color: 'transparent'
                }
            }, {
                name: '徐汇区',
                label: {
                    color: 'transparent'
                }
            }, {
                name: '虹口区',
                label: {
                    color: 'transparent'
                }
            }, {
                name: '静安区',
                label: {
                    color: 'transparent'
                }
            }]
            //  {
            //     name: '长宁区',
            //     label: {
            //         color: 'transparent'
            //     }
            // },
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
            this.Echart = data
            this.newOption = this.Echart.getOption()
            this.queryStationStatusMapData.getData()
        },
        async setChart () {
            // const newOption = this.Echart.getOption()

            let name = ''
            let picFlag = false
            let id = this.currentId
            if (this.allStations.length) {
                const {name: Name, picFlag: PicFlag, id: Id} = this.allStations[this.currentStationIndex]
                name = Name
                picFlag = PicFlag
                id = Id
                if (++this.currentStationIndex === this.allStations.length) {
                    this.currentStationIndex = 0
                }
            }
            // do {
                // const {name: Name, picFlag: PicFlag, id: Id} = this.allStations[this.currentStationIndex]
                // name = Name
                // picFlag = PicFlag
                // id = Id
                // if (++this.currentStationIndex === this.allStations.length) {
                //     this.currentStationIndex = 0
                //     // if (!this.currentId) break
                // }
            //     if (this.allStations.every(v => v.picFlag === false)) break
            // } while (!picFlag)
            this.currentId = id
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
            // this.Echart.clear()
            this.Echart.setOption(this.newOption, false, true)
            if (!this.currentId) return
            await this.$timeout(5000)
            picFlag && this.$bus.emit('changeStationImage', {stid: this.currentId, name})
            await this.$timeout(1000)
            picFlag && this.$emit('slideTop', '-100%')
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
    computed: {
        comId () {
            return this.$store.getters.current_companyid
        }
    },
    beforeDestroy () {
        this.$bus.off('changeMapStation', this.setChart)
        window.removeEventListener('resize', this.windowResize)
    }
}
</script>
