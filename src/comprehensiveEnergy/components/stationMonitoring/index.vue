<template>
    <div class="stationMonitoring">
        <child-header :realData="pvwpStationRtOverviewDay.res.body"></child-header>
        <child-section :realData="pvwpStationRtOverviewDay.res.body"></child-section>
        <power-chart></power-chart>
    </div>
</template>

<script>
import ChildHeader from './header/header'
import ChildSection from './section/section'
import PowerChart from './chart/chart'
import { api＿pvwpStationRtOverviewDay } from '@comprehensiveEnergy/request/api'

export default {
    data () {
        return {
            pvwpStationRtOverviewDay: api＿pvwpStationRtOverviewDay({
                data: {
                    stcls: '01'
                }
            })
        }
    },
    created () {
        this.$store.dispatch('stationMonitoring/dateChange', new Date())
        this.timer = setInterval(this.getData, this.$store.state.stationMonitoring.dataInterval)
        this.$bus.on('dateChange', this.getData)
    },
    methods: {
        getData () {
            this.pvwpStationRtOverviewDay.getData({date: this.dateStr})
        }
    },
    computed: {
        isToday () {
            return this.$store.getters['stationMonitoring/isToday']
        },
        dateStr () {
            return this.$store.getters['stationMonitoring/dateStr']
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
        this.$bus.off('dateChange', this.getData)
    },
    components: {
        ChildHeader,
        ChildSection,
        PowerChart
    }
}
</script>

<style lang="scss" scoped>
.stationMonitoring {
    padding: 10px 30px;
    height: calc(100vh - 67px);

    .child-section, .power-chart {
        margin-top: 10px;
    }
}
</style>
