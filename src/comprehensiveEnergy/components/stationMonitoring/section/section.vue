<template>
    <div class="child-section">
        <div class="block-outer">
            <child-block
                v-if="isToday"
                :value="realData.day.data.acp"
                :unit="realData.day.units.acp"
                borderColor="#2241B1"
                color="#4486FF"
                icon="icongongshuaiyinshu"
                label="实时功率">
                <block-item
                    :value="realData.day.data.kw_r && realData.day.data.kw_r.toFixed(2)"
                    :unit="realData.day.units.kw_r || '%'"
                    label="出力比"
                    :break="true">
                </block-item>
                <block-item
                    :value="realData.day.data.l"
                    :unit="realData.day.units.l"
                    label="光照强度"
                    :break="true">
                </block-item>
            </child-block>
            <child-block
                v-if="!isToday"
                :value="realData.day.data.max_p"
                :unit="realData.day.units.max_p"
                borderColor="#2241B1"
                color="#4486FF"
                icon="icongongshuaiyinshu"
                label="最大功率">
                <block-item
                    :value="realData.day.data.max_p_r"
                    :unit="realData.day.units.max_p_r"
                    label="最大出力比"
                    :break="true">
                </block-item>
                <block-item
                    :value="realData.day.data.max_sun"
                    :unit="realData.day.units.max_sun"
                    label="最大光照强度"
                    :break="true">
                </block-item>
            </child-block>
        </div>
        <div class="block-outer">
            <child-block
                v-if="!isToday"
                :value="realData.day.data.real_kwh_chk"
                :unit="realData.day.units.real_kwh_chk"
                borderColor="#1A7FA1"
                color="#3BCCFD"
                icon="iconrifadianliang"
                label="日发电量">
                <block-item
                    :value="realData.day.data.real_hours"
                    :unit="realData.day.units.real_hours"
                    label="日发电小时数">
                </block-item>
            </child-block>
            <child-block
                v-if="isToday"
                :value="realData.day.data.dw"
                :unit="realData.day.units.dw"
                borderColor="#1A7FA1"
                color="#3BCCFD"
                icon="iconrifadianliang"
                label="日发电量">
                <block-item
                    :value="realData.day.data.real_hours"
                    :unit="realData.day.units.real_hours"
                    label="日发电小时数">
                </block-item>
            </child-block>
        </div>
        <div class="block-outer">
            <child-block
                :value="realData.month.data.real_kwh_chk"
                :unit="realData.month.units.real_kwh_chk"
                borderColor="#1D8C55"
                color="#39FA9A"
                icon="iconelectricquantity_month"
                label="月累计发电量">
                <block-item
                    :value="realData.month.data.real_hours"
                    :unit="realData.month.units.real_hours"
                    label="月发电小时数">
                </block-item>
            </child-block>
        </div>
        <div class="block-outer">
            <child-block
                :value="realData.year.data.real_kwh_chk"
                :unit="realData.year.units.real_kwh_chk"
                borderColor="#6942A9"
                color="#A069FB"
                icon="iconelectricquantity_year"
                label="年累计发电量">
                <block-item
                    :value="realData.year.data.real_hours"
                    :unit="realData.year.units.real_hours"
                    label="年发电小时数">
                </block-item>
            </child-block>
        </div>
    </div>
</template>

<script>
import ChildBlock from './block'
import BlockItem from './BlockItem'

export default {
    props: {
        realData: {
            type: Object,
            default () {
                return {
                    day: {
                        data: {},
                        units: {}
                    },
                    month: {
                        data: {},
                        units: {}
                    },
                    year: {
                        data: {},
                        units: {}
                    }
                }
            }
        }
    },
    computed: {
        isToday () {
            return this.$store.getters['stationMonitoring/isToday']
        }
    },
    components: {
        ChildBlock,
        BlockItem
    }
}
</script>

<style lang="scss" scoped>
.child-section {
    height:136px;
    @include c(background-color, $bg_c7);
    padding: 15px 0;

    .block-outer {
        float: left;
        width: 25%;
        height: 100%;
        padding: 0 18px;

        .child-block {
            width: 100%;
            height: 100%;
            padding-left: 24px;

            .block-item {
                float: left;
                margin-top: 10px;
                min-width: 50%;
            }

        }

        &:nth-child(1) {
            .child-block {
                .block-item {
                    margin-top: 2px;
                }
            }
        }
    }
}
</style>
