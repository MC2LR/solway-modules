<template>
    <div class="fault-label">
        <p class="label">累计发生故障次数</p>
        <p>
            <span class="count">{{$useful($oc(stid ? queryStationDeviceFaultAccumInfoHis.res : queryCompanyDeviceFaultAccumInfoHis.res, 'body', 'data', 'fail_count'), '--')}}</span>
            <span class="unit">{{$useful($oc(stid ? queryStationDeviceFaultAccumInfoHis.res : queryCompanyDeviceFaultAccumInfoHis.res, 'body', 'units', 'fail_count'), '--')}}</span>
        </p>

        <p class="label">处理故障数</p>
        <p>
            <span class="count">--</span>
            <span class="unit">--</span>
        </p>

        <p class="label">故障率</p>
        <p>
            <span class="count">{{$useful($oc(stid ? queryStationDeviceFaultAccumInfoHis.res : queryCompanyDeviceFaultAccumInfoHis.res, 'body', 'data', 'fail_r'), '--')}}</span>
            <span class="unit">{{$useful($oc(stid ? queryStationDeviceFaultAccumInfoHis.res : queryCompanyDeviceFaultAccumInfoHis.res, 'body', 'units', 'fail_r'), '--')}}</span>
        </p>
    </div>
</template>

<script>
import {api＿queryCompanyDeviceFaultAccumInfoHis, api＿queryStationDeviceFaultAccumInfoHis} from '@/request/henanApi'
export default {
    data () {
        return {
            queryCompanyDeviceFaultAccumInfoHis: api＿queryCompanyDeviceFaultAccumInfoHis({
                later: true
            }),
            queryStationDeviceFaultAccumInfoHis: api＿queryStationDeviceFaultAccumInfoHis({
                later: true
            })
        }
    },
    created () {
        this.$nextTick(() => this.getData())
        this.$bus.on(this.$route.name + 'StationChange', this.getData)
    },
    computed: {
        stid () {
            return this.$store.state.userActionRecord[this.$route.name + '_selectedStid']
        }
    },
    methods: {
        getData () {
            this.stid ? this.queryStationDeviceFaultAccumInfoHis.getData({stid: this.stid}) : this.queryCompanyDeviceFaultAccumInfoHis.getData()
        }
    },
    beforeDestroy () {
        this.$bus.off(this.$route.name + 'StationChange', this.getData)
    }
}
</script>

<style lang="scss" scoped>
.fault-label {
    padding: 10px;

    .label {
        font-size: 12px;
        opacity: .8;
        margin-top: 1em;
        line-height: 2;
    }

    .count {
        font-size: 18px;
        color:rgba(71, 236, 255, 1);
    }

    .unit {
        font-size: 12px;
        color:rgba(71, 236, 255, 1);
    }
}
</style>
