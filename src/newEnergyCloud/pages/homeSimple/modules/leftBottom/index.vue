<template>
    <rotation3d
        @mouseenter.native="rotation3dtimeInterval = 0"
        @mouseleave.native="rotation3dtimeInterval = 30000"
        :timeInterval="fullPageShow ? 0 : rotation3dtimeInterval"
        :panels="(havePv && haveWp) ? ['c', 'b', 'a', 'd', 'e'] : (havePv && !haveWp) ? ['c', 'b', 'a'] : ['c', 'd', 'e']"
        to="toTop">
    <!-- <rotation3d :timeInterval="0" :panels="['c', 'b', 'a']" to="toTop"> -->
        <template>
            <div class="rotation3d-btn"><i class="iconfont icon-fanzhuan"></i></div>
        </template>
        <template v-slot:a v-if="havePv">
            <div class="rotation3d-panel">
                <chartA />
            </div>
        </template>
        <template v-slot:b v-if="havePv">
            <div class="rotation3d-panel">
                <chartB />
            </div>
        </template>
        <template v-slot:c>
            <div class="rotation3d-panel">
                <pv-chartc v-if="havePv && !haveWp"/>
                <wp-pv-chartc v-if="havePv && haveWp"/>
                <wp-chartc v-if="!havePv && haveWp"/>
            </div>
        </template>
        <template v-slot:d v-if="haveWp">
            <div class="rotation3d-panel">
                <chartD />
            </div>
        </template>
        <template v-slot:e v-if="haveWp">
            <div class="rotation3d-panel">
                <chartE />
            </div>
        </template>
    </rotation3d>
</template>

<script>
import 'echarts-gl'
import rotation3d from '@comm/components/rotation3d'
export default {
    props: ['fullPageShow'],
    data () {
        return {
            rotation3dtimeInterval: 30000,
            havePv: '',
            haveWp: ''
        }
    },
    components: {
        rotation3d,
        chartA: () => import('./chartA'),
        chartB: () => import('./chartB'),
        pvChartc: () => import('./pvChartc'),
        wpChartc: () => import('./wpChartc'),
        wpPvChartc: () => import('./wpPvChartc'),
        chartD: () => import('./chartD'),
        chartE: () => import('./chartE')
    },
    created () {
        this.stationClass()
    },
    methods: {
        stationClass () {
            const list = this.$store.getters.station_class_list
            // const list = [
            //     {
            //         id: '01'
            //     }
            // ]
            this.havePv = list.some(v => v.id === '01')
            this.haveWp = list.some(v => v.id === '02')
        }
    }
}
</script>

<style lang="scss" scoped>
.rotation3d {
    .rotation3d-btn {
        position: absolute;
        left: 0;
        top: 0;
        width:22px;
        height:22px;
        background:rgba(20,71,135,1);
        z-index: 3;
        cursor: pointer;
        text-align: center;
        line-height: 22px;

        i.iconfont {
            font-size: 16px;
            color: rgba(255,255,255,.8);
        }
    }

    .rotation3d-panel {
        width: 100%;
        height: 100%;
        background-color: rgba(#003E9A, .4);
        .chart-main {
            height: 100% !important;
            canvas {
            height: 100% !important;

            }
        }
    }
}
</style>
