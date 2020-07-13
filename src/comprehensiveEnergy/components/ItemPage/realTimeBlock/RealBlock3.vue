<template>
    <block-tpl
        icon="iconpeidianfang animation"
        :animation="true"
        headline="配电房"
        :position="position">
        <template v-slot:header>
            <div class="block-header">
                <span class="text">监测中</span>
            </div>
        </template>
        <div class="block3 clearfix">
            <real-item
                :value="data.ata"
                unit="℃"
                label="环境温度"
                color="#9E58FF"
            ></real-item>
            <real-item
                :value="data.cta"
                unit="℃"
                label="柜体温度"
                color="#9E58FF"
            ></real-item>
            <real-item
                :value="data.hum"
                unit="%"
                label="环境湿度"
                color="#9E58FF"
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
