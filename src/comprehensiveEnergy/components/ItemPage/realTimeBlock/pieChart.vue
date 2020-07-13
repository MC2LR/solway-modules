<template>
    <div class="pie-chart" ref="ele"></div>
</template>

<script>
import 'echarts/lib/chart/pie'

export default {
    props: {
        value: {
            type: Number,
            default: 0
        },
        color: {
            type: String,
            default: '#FF8D1C'
        }
    },
    data () {
        return {
            myChart: null
        }
    },
    mounted () {
        this.myChart = this.$echarts.init(this.$refs.ele)
        this.setOption()
        window.addEventListener('resize', this.myChart.resize)
    },
    methods: {
        setOption () {
            const option = {
                color: ['#003966', this.color],
                series: [
                    {
                        type: 'pie',
                        radius: ['80%', '100%'],
                        hoverOffset: 0,
                        clockwise: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                fontSize: 18
                            }
                        },
                        data: [{
                            value: 100 - this.value,
                            name: ''
                        }, {
                            value: this.value,
                            name: this.value + '%'
                        }]
                    }
                ]
            }
            this.myChart.setOption(option)
        }
    },
    watch: {
        value () {
            this.setOption()
        }
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.myChart.resize)
        if (this.myChart && !this.myChart.isDisposed()) {
            this.myChart.clear()
            this.myChart.dispose()
            this.myChart = null
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
