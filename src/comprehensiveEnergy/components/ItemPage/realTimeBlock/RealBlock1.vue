<template>
    <block-tpl
        :icon="'iconchongdianzhuang' + (animation ? ' animation' : '')"
        headline="充电桩系统"
        :animation="animation"
        :position="position">
        <template v-if="data.useCount" v-slot:header>
            <div class="block-header">
                <span class="text">用电中</span>
            </div>
        </template>
        <div class="block1 clearfix">
            <div class="left">
                <span class="s1">充电中</span>
                <span class="s2">{{data.useCount}}</span><span class="s4">/</span><span class="s5">{{data.total}}</span>
            </div>
            <div class="right">
                <real-item
                    :value="data.dw"
                    unit="kWh"
                    label="日用电量"
                    color="#21D749"
                ></real-item>
            </div>
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
            const animation = this.data ? (this.data.useCount > 0) : false
            this.$store.dispatch('second/animation', {block1: animation})
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
.block1 {
    font-size: 16px;
    padding-top: 0.05rem;
    padding-bottom: 0.1rem;

    .left {
        padding-left: 0.37rem;

        .s1 {
            @include c(color, #21D749);
            font-size: 0.18rem;
            display: inline-block;
            margin-bottom: 0.1rem;
        }

        .s2 {
            @include c(color, #21D749);
            font-size: 0.31rem;
            margin-left: 1em;
        }

        .s4, .s5 {
            @include c(color, #C6DAF1);
            font-size: 0.31rem;
        }
    }

    .right {
        padding-left: 0.37rem;
        padding-top: 0.1rem;
    }
}
</style>
