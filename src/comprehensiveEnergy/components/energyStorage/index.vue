<template>
    <div class="energy-storage">
        <child-header></child-header>
        <child-section></child-section>
        <div class="bottom">
            <energy-flow v-if="isToday"></energy-flow>
            <energy-flow-history v-if="!isToday"></energy-flow-history>
            <power-chart v-if="isToday"></power-chart>
            <power-chart-history v-if="!isToday"></power-chart-history>
        </div>
    </div>
</template>

<script>
import ChildHeader from './header'
import ChildSection from './section'
import PowerChart from './powerChart/powerChart'
import EnergyFlow from './energyFlow/energyFlow'

export default {
    created () {
        this.$store.dispatch('stationMonitoring/dateChange', new Date())
    },
    computed: {
        isToday () {
            return this.$store.getters['stationMonitoring/isToday']
        }
    },
    components: {
        ChildHeader,
        ChildSection,
        PowerChart,
        PowerChartHistory: () => import('./powerChart/powerChartHistory'),
        EnergyFlow,
        EnergyFlowHistory: () => import('./energyFlow/energyFlowHistory')
    }
}
</script>

<style lang="scss" scoped>
.energy-storage {
    padding: 10px 30px;
    height: calc(100vh - 67px);

    .child-section {
        margin-top: 10px;
    }

    .bottom {
        height: calc(100% - 217px);
        margin-top: 10px;

        .energy-flow {
            width: 682px;
            height: 100%;
            float: right;
            margin-left: 10px;
            @include c(background-color, $bg_c7);
        }

        .power-chart {
            @include c(background-color, $bg_c7);
            overflow: hidden;
            height: 100%;
        }
    }
}
</style>
