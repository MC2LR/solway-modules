<template>
    <block-tpl
        icon="iconchunengguanli"
        headline="蓄冷"
        :position="position">
        <div class="block2 clearfix">
            <real-item
                class="pull-left"
                :value="data.capacity"
                unit="kWh"
                label="容量"
                labelWidth="2.5em"
                color="#39AEFF"
            ></real-item>
            <Pie-chart
                :value="data.remain"
                color="#39AEFF"
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
    components: {
        BlockTpl,
        RealItem,
        PieChart
    }
}
</script>

<style lang="scss" scoped>
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
