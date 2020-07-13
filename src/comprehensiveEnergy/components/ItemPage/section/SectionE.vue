<template>
    <div class="section section-e">
        <CommItem
            size="small"
            icon="iconbianyaqi c2"
            label="变压器容量"
            :value="data.capacity"
            unit="kVA"
        ></CommItem>
        <CommItem
            size="small"
            icon="iconshishigongshuai c4"
            label="实时总功率"
            :value="data.acp"
            unit="kW"
        ></CommItem>
        <CommItem
            size="small"
            icon="iconShape c3"
            label="日用电量"
            :value="data.dw"
            unit="kWh"
        ></CommItem>
        <CommItem
            size="small"
            icon="icondianfei c1"
            label="日电费"
            :value="data.fee"
            unit="元"
        ></CommItem>
    </div>
</template>

<script>
import CommItem from '../../homePage/item'

export default {
    props: {
        data: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    components: {
        CommItem
    }
}
</script>

<style lang="scss">
.section.section-e {
    i.iconfont.iconShape.c3 {
        font-size: 0.1rem !important;
    }
}
</style>
