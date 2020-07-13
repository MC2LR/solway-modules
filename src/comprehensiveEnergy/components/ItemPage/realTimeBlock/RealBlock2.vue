<template>
    <block-tpl
        :icon="'iconchunengguanli' + (animation ? ' animation' : '')"
        headline="储能系统"
        :animation="animation"
        :position="position">
        <template v-slot:header>
            <div class="block-header">
                <span class="text">{{{'01': '充电中', '02': '放电中', '03': '未使用'}[data.useStatus]}}</span>
            </div>
        </template>
        <div class="block2 clearfix">
            <real-item
                class="pull-left"
                :value="data.capacity"
                unit="kWh"
                label="容量"
                labelWidth="2.5em"
                color="#FF8D1C"
            ></real-item>

            <Pie-chart
                :value="data.remain"
                color="#FF8D1C"
                class="pull-right">
            </Pie-chart>
        </div>
    </block-tpl>
</template>

<script>
import BlockTpl from './BlockTpl'
import RealItem from './Item'
import PieChart from './pieChart'

export default {
    props: {
        position: {
            type: Object,
            default () {
                return {}
            }
        },
        data: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    computed: {
        animation () {
            const animation = this.data ? this.data.useStatus !== '03' : false
            this.$store.dispatch('second/animation', {block2: animation})
            return animation
        }
    },
    components: {
        BlockTpl,
        RealItem,
        PieChart
    }
}
</script>

<style lang="scss" scoped>
.block-header {
    float: right;
    @include c(color, #21D749);

    .text {
        font-size: 0.14rem;
        margin-left: 1em;
        margin-right: .5em;
    }
}
.block2 {
    font-size: 12px;
    padding-bottom: 0.1rem;
    padding-left: 0.37rem;
    padding-right: 0.15rem;

    .real-item {
        margin-top: 0.2rem;
    }

    .pie-chart {
        width: 0.54rem;
        height: 0.54rem;
    }
}
</style>
