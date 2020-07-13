<template>
    <div class="environmentMonitoring">
        <child-section></child-section>
        <temperature-chart></temperature-chart>
    </div>
</template>

<script>
import childSection from './section/section'
import temperatureChart from './chart/chart'

export default {
    components: {
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
    padding: 10px 30px;
    height: calc(100vh - 67px);
}
</style>
