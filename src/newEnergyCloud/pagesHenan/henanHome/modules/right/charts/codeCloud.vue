<template>
    <ve-wordcloud :data="chartData" :extend="extend" height="100%"></ve-wordcloud>
</template>

<script>
import VeWordcloud from 'v-charts/lib/wordcloud.common'
import {api＿queryPlatFaultCodeYun} from '@/request/henanApi'
export default {
    components: {
        VeWordcloud
    },
    data () {
        return {
            queryPlatFaultCodeYun: api＿queryPlatFaultCodeYun({later: true}).subscribe(res => this.queryPlatFaultCodeYunResult(res)),
            chartData: {
                columns: ['word', 'count'],
                rows: []
            },
            extend: {
                tooltip: {
                    show: false,
                    formatter: ''
                },
                series: {
                    drawOutOfBound: true,
                    sizeRange: [12, (window.innerWidth * 0.35) / (1366 * 0.35) * 20],
                    rotationRange: [0, 0],
                    left: '20%',
                    top: '0',
                    width: '80%',
                    height: '100%',
                    textStyle: {
                        normal: {
                            color: function () {
                                return 'rgb(' + [
                                    110 + Math.round(Math.random() * 145),
                                    110 + Math.round(Math.random() * 145),
                                    110 + Math.round(Math.random() * 145)
                                ].join(',') + ')'
                            }
                        }
                    }
                }
            }
        }
    },
    created () {
        this.$nextTick(() => this.getData())
        this.$bus.on(this.$route.name + 'StationChange', this.getData)
        window.addEventListener('resize', this.chartResize)
    },
    computed: {
        stid () {
            return this.$store.state.userActionRecord[this.$route.name + '_selectedStid']
        }
    },
    methods: {
        getData () {
            this.queryPlatFaultCodeYun.getData({
                id: this.stid || void 0
            })
        },
        queryPlatFaultCodeYunResult (res) {
            this.chartData.rows = res.body.map(v => ({
                word: v.faultName,
                count: (v.loss_power || 0) * 10000 // || Math.random() * 10000
            })) || []
        },
        chartResize (e) {
            if (e.isTrusted) this.extend.series.sizeRange = [12, (window.innerWidth * 0.35) / (1366 * 0.35) * 20]
        }
    },
    beforeDestroy () {
        this.$bus.off(this.$route.name + 'StationChange', this.getData)
        window.removeEventListener('resize', this.chartResize)
    }
}
</script>

<style>

</style>
