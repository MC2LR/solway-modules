<template>
    <block-tpl
        :icon="'iconguangfu ' + (animation ? 'animation' : '')"
        headline="光伏系统"
        :animation="animation"
        :position="position">
        <template v-if="pvwpStationPvMobileRealTimeDetail.res.body.ov.p" v-slot:header>
            <div class="block-header">
                <span class="text">发电中</span>
            </div>
        </template>
        <div class="block3 clearfix">
            <real-item
                :value="pvwpStationPvMobileRealTimeDetail.res.body.ov.p"
                unit="kW"
                label="实时功率"
                color="#FF8D1C">
            </real-item>
            <real-item
                :value="pvwpStationPvMobileRealTimeDetail.res.body.ov.day_real_kwh_chk"
                unit="kWh"
                label="日发电量"
                color="#FF8D1C"
            ></real-item>
            <real-item
                :value="pvwpStationPvMobileRealTimeDetail.res.body.ov.inst_kw"
                unit="kW"
                label="容量"
                color="#FF8D1C"
            ></real-item>
        </div>
    </block-tpl>
</template>

<script>
import BlockTpl from './BlockTpl'
import RealItem from './Item'
import {api＿pvwpStationPvMobileRealTimeDetail} from '@comprehensiveEnergy/request/api'

export default {
    props: {
        position: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            pvwpStationPvMobileRealTimeDetail: api＿pvwpStationPvMobileRealTimeDetail({
                res: {
                    body: {
                        ov: {
                            inst_kw: '',
                            day_real_kwh_chk: '',
                            p: ''
                        }
                    }
                }
            })
        }
    },
    created () {
        this.timer = setInterval(() => {
            this.pvwpStationPvMobileRealTimeDetail.getData()
        }, this.$store.state.second.dataInterval)
    },
    computed: {
        animation () {
            const animation = !!this.pvwpStationPvMobileRealTimeDetail.res.body.ov.p
            this.$store.dispatch('second/animation', {block4: animation})
            return animation
        }
    },
    beforeDestroy () {
        this.timer && clearInterval(this.timer)
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
