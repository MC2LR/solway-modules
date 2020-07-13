<template>
    <div class="environmentMonitoring">
        <child-header></child-header>
        <child-section class="child-section"></child-section>
        <temperature-chart></temperature-chart>
    </div>
</template>

<script>
import ChildHeader from './header'
import childSection from './section/section'
import temperatureChart from './chart/chart'

export default {
    components: {
        ChildHeader,
        childSection,
        temperatureChart
    },
    data () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.environmentMonitoring {
    padding: 10px;
    height: calc(100vh - 67px);

    .child-section {
        margin-top: 10px;
    }
}
</style>
