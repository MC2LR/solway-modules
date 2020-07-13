<template>
    <block-tpl
        :icon="'iconfont39' + (animation ? ' animation' : '')"
        headline="空调系统"
        :animation="animation"
        :position="position">
        <template v-if="data.acp" v-slot:header>
            <div class="block-header">
                <span class="text">用电中</span>
            </div>
        </template>
        <div class="block3 clearfix">
            <real-item
                :value="data.acp"
                unit="kW"
                label="实时功率"
                color="#52D6FF"
            ></real-item>
            <real-item
                :value="data.dw"
                unit="kWh"
                label="日用电量"
                color="#52D6FF"
            ></real-item>
            <real-item
                :value="data.fee"
                unit="元"
                label="日电费"
                color="#52D6FF"
            ></real-item>
        </div>
    </block-tpl>
</template>

<script>
import BlockTpl from './BlockTpl'
import RealItem from './Item'

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
            const animation = !!this.data.acp
            this.$store.dispatch('second/animation', {block5: animation})
            return animation
        }
    },
    components: {
        BlockTpl,
        RealItem
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
.block3 {
    font-size: 12px;
    padding-bottom: 0.1rem;
    padding-left: 0.37rem;

}
</style>
