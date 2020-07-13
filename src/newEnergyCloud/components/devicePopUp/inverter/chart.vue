<template>
    <ve-gauge width="375px" height="200px" :after-set-option="data => Echart = data" :data="chartData"></ve-gauge>
</template>

<script>
import VeGauge from 'v-charts/lib/gauge.common'
export const getAVWMaxValueData = (instkw, currentV) => {
    const reList = []
    const reMap1 = {}
    const reMap2 = {}
    const reMap3 = {}
    reMap1['A1'] = (250 / 600)
    reMap1['A2'] = (450 / 600)
    reMap1['A3'] = 600
    reMap2['A1'] = 0.1
    reMap2['A3'] = Math.ceil(instkw * 1.1)
    if ((reMap2['A3'] % 10) > 0) reMap2['A3'] = reMap2['A3'] + (10 - reMap2['A3'] % 10)
    reMap2['A2'] = (instkw / reMap2['A3'])
    let ACPmax
    if (currentV && currentV > 300) ACPmax = Math.ceil(reMap2['A3'] * 1000 / 380)
    else ACPmax = Math.ceil(reMap2['A3'] * 1000 / 220)
    if ((ACPmax % 10) > 0) ACPmax = ACPmax + (10 - ACPmax % 10)
    reMap3['A1'] = 0.1
    reMap3['A2'] = 0.9
    reMap3['A3'] = ACPmax
    reList.push(reMap1)
    reList.push(reMap3)
    reList.push(reMap2)
    const reMap4 = {}
    const reMap5 = {}
    const reMap6 = {}
    reMap4['A1'] = (400 / 1000)
    reMap4['A2'] = (800 / 1000)
    reMap4['A3'] = 1000
    reMap5['A1'] = 0.1
    reMap5['A2'] = 0.9
    reMap5['A3'] = Math.ceil(instkw * 1000 / 700)
    if ((reMap5['A3'] % 10) > 0) reMap5['A3'] = reMap5['A3'] + (10 - reMap5['A3'] % 10)
    reMap6['A1'] = reMap2['A1']
    reMap6['A2'] = reMap2['A2']
    reMap6['A3'] = reMap2['A3']
    reList.push(reMap4)
    reList.push(reMap5)
    reList.push(reMap6)
    return reList
}
export const getOption = (ucp, value, unit, name, displayName) => ({
    animation: false,
    tooltip: {
        formatter: '{a}  : {c}' + unit
    },
    toolbox: {
        show: false,
        feature: {
            mark: { show: true },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    series: [
        {
            name,
            type: 'gauge',
            startAngle: 180,
            radius: 120,
            center: ['50%', '70%'],
            endAngle: 0,
            max: ucp['A3'],
            splitNumber: 10, // 分割段数，默认为5
            axisLine: { // 坐标轴线
                lineStyle: { // 属性lineStyle控制线条样式
                    color: [[ucp['A1'], '#5CDD66'], [ucp['A2'], '#6CE1FE'], [1, '#FE5415']],
                    width: 8
                }
            },
            axisTick: { // 坐标轴小标记
                splitNumber: 10, // 每份split细分多少段
                length: 12, // 属性length控制线长
                lineStyle: { // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            },
            splitLine: { // 分隔线
                show: true, // 默认显示，属性show控制显示与否
                length: 20, // 属性length控制线长
                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer: {
                width: 5
            },
            title: {
                show: true,
                offsetCenter: ['0', '-40%'], // x, y，单位px
                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    color: '#333'
                }
            },
            detail: {
                formatter: function (value) {
                    if (value) {
                        return value.toFixed(1)
                    } else {
                        return value
                    }
                },
                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto',
                    fontWeight: 'bolder',
                    fontSize: 20
                },
                offsetCenter: [0, '15%'],
                height: -30
            },
            data: [{ value, name: displayName }]
        }
    ]
})
export default {
    components: {
        VeGauge
    },
    props: ['rate', 'value', 'unit', 'name', 'fullName'],
    data () {
        return {
            Echart: null,
            chartData: {
                columns: [],
                rows: []
            }
        }
    },
    watch: {
        value (newValue) {
            if (newValue === null || newValue === void 0) return
            const {rate, value, unit, name, fullName} = this
            const newOption = getOption(rate, value, unit, name, fullName)
            this.Echart.setOption(newOption, true)
        }
    }
}
</script>

<style lang="scss" scoped>
.ve-gauge {
    margin: 0 auto;
}
</style>
