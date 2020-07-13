<template>
    <component class="photovoltaic-chart" :is="vw >= 1920 ? 'ChartW1920' : 'ChartW1366'"></component>
</template>

<script>
import widthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [widthHeight],
    components: {
        ChartW1366: () => import('./1366'),
        ChartW1920: () => import('./1920')
    }
}
</script>
