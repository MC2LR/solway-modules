<template>
    <div class="charging-pile-page">
        <child-header></child-header>
        <child-section></child-section>
        <div class="bottom">
            <charging-pile-list v-if="isToday"></charging-pile-list>
            <charging-pile-list-history v-if="!isToday"></charging-pile-list-history>
            <power-chart v-if="isToday"></power-chart>
            <power-chart-history v-if="!isToday"></power-chart-history>
        </div>
    </div>
</template>

<script>
import ChildHeader from './header'
import ChildSection from './section'
import ChargingPileList from './chargingPileList/chargingPileList'
import PowerChart from './powerChart/powerChart'

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
        ChargingPileList,
        ChargingPileListHistory: () => import('./chargingPileList/chargingPileListHistory'),
        PowerChart,
        PowerChartHistory: () => import('./powerChart/powerChartHistory')
    }
}
</script>

<style lang="scss" scoped>
.charging-pile-page {
    padding: 10px 30px;
    height: calc(100vh - 67px);

    .child-section {
        margin-top: 10px;
    }

    .bottom {
        height: calc(100% - 217px);
        margin-top: 10px;

        .charging-pile-list {
            width: 448px;
            height: 100%;
            float: left;
            margin-right: 10px;
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
