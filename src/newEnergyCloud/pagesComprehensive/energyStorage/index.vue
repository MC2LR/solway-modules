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
        this.$store.dispatch('userActionRecord/setState', {key: 'comprehensive_date', value: new Date()})
    },
    computed: {
        isToday () {
            return new Date(this.$store.state.userActionRecord.comprehensive_date).Format('yyyy-MM-dd') === new Date().Format('yyyy-MM-dd')
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
    padding: 10px;
    height: calc(100vh - 67px);

    .child-section {
        margin-top: 10px;
    }

    .bottom {
        height: calc(100% - 217px + 67px);
        margin-top: 10px;

        .energy-flow {
            width: 682px;
            height: 100%;
            float: right;
            margin-left: 10px;
            @include c(background-color, #0E3D77);
        }

        .power-chart {
            @include c(background-color, #0E3D77);
            overflow: hidden;
            height: 100%;
        }
    }
}
</style>
