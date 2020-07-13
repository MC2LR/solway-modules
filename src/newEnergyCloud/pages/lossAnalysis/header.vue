<template>
    <div class="header">
        <switch-station style="margin-right:80px;"></switch-station>
        <span class="data-span">逆变器数量：<span class="font16">{{queryPvStationAnalysisInfoSe.res.body.data.inv_count}}{{queryPvStationAnalysisInfoSe.res.body.units.inv_count}}</span></span>
        <span class="data-span">装机容量：<span class="font16">{{queryPvStationAnalysisInfoSe.res.body.data.inst_kw}}{{queryPvStationAnalysisInfoSe.res.body.units.inst_kw}}</span></span>
        <span class="data-span">理论电量：<span class="font16">{{queryPvStationAnalysisInfoSe.res.body.data.shd_kwh_chk}}{{queryPvStationAnalysisInfoSe.res.body.units.shd_kwh_chk}}</span></span>
        <span class="data-span">实发电量：<span class="font16">{{queryPvStationAnalysisInfoSe.res.body.data.real_kwh_chk}}{{queryPvStationAnalysisInfoSe.res.body.units.real_kwh_chk}}</span></span>
        <span class="data-span">损失电量：<span class="font16">{{queryPvStationAnalysisInfoSe.res.body.data.we}}{{queryPvStationAnalysisInfoSe.res.body.units.we}}</span></span>
    </div>
</template>

<script>
import SwitchStation from '@/components/station/switchStation/switchStation'
import {api＿queryPvStationAnalysisInfoSe} from '@newEnergyCloud/request/api'
import theme from './theme/theme'
export default {
    mixins: [theme],
    data () {
        return {
            startDate: null,
            endDate: null,
            queryPvStationAnalysisInfoSe: api＿queryPvStationAnalysisInfoSe({
                later: true,
                res: {body: {data: {}, units: {}}}
            })
        }
    },
    components: {
        SwitchStation
    },
    methods: {
        dateChange1 (data) {
            this.startDate = data.startDate
            this.endDate = data.endDate
            this.getData()
        },
        getData () {
            this.queryPvStationAnalysisInfoSe.getData({startDate: this.startDate, endDate: this.endDate})
        }
    },
    created () {
        this.$bus.on('changeDateLossEmit', this.dateChange1)
        this.$bus.on('stationChange', this.getData)
    },
     beforeDestroy () {
        this.$bus.off('changeDateLossEmit', this.dateChange1)
        this.$bus.off('stationChange', this.getData)
    }
}
</script>

<style lang="scss" scoped>
@import './theme/theme.scss';
.header {
    height: 60px;
    line-height: 60px;
    vertical-align: middle;
    font-size:12px;
    @include page_c(color, $pageHeadSectionWordColor);
    .font16{
        font-size:16px;
    }
    .data-span{
        margin-right: 40px;
    }
}
</style>
