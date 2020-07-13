<template>
    <div class="wrap">
        <station-header/>
        <station-section />
        <station-charts />
    </div>
</template>

<script>
import stationHeader from './Header'
import stationSection from './section/sectionCon'
import stationCharts from './charts/chartsCon'

export default {
    components: {
        stationHeader,
        stationSection,
        stationCharts
    }
}
</script>

<style lang="scss" scoped>
@import '../theme/theme.scss';

.wrap {
    height: 100%;
}
</style>
