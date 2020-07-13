<template>
    <div class="henanMonitoring-top-right">
        <ve-wordcloud v-loading="queryPlatFaultCodeYun.loading" :data="chartData" :extend="extend" height="100%"></ve-wordcloud>
        <div class="noFault" v-if="!queryPlatFaultCodeYun.res || !queryPlatFaultCodeYun.res.body || !queryPlatFaultCodeYun.res.body.length">
            无故障发生
        </div>
    </div>
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
                    show: false
                },
                series: {
                    drawOutOfBound: true,
                    sizeRange: [12, (window.innerWidth * 0.35) / (1366 * 0.35) * 20],
                    rotationRange: [0, 0],
                    left: '0',
                    top: '0',
                    width: '100%',
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
        this.$bus.on('stationChange', this.getData)
        window.addEventListener('resize', this.chartResize)
    },
    computed: {
        stid () {
            return this.$store.getters.station_type === 0 ? this.$store.getters.station_id : this.$store.getters.current_company_stids
        }
    },
    methods: {
        getData () {
            this.queryPlatFaultCodeYun.getData({
                ids: this.stid || void 0
            })
        },
        queryPlatFaultCodeYunResult (res) {
            this.chartData.rows = res.body.map(v => ({
                word: v.faultName,
                count: (v.loss_power || 0) * 10000 // || 0 || Math.random() * 10000
            })) || []
        },
        chartResize () {
            this.extend.series.sizeRange = [12, (window.innerWidth * 0.35) / (1366 * 0.35) * 20]
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.getData)
        window.removeEventListener('resize', this.chartResize)
    }
}
</script>

<style lang="scss" scoped>
.henanMonitoring-top-right {
    position: relative;
    height: 100%;
    .noFault {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

</style>
