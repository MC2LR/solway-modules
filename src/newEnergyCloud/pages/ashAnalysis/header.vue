<template>
    <div class="header">
        <switch-station style="margin-right:80px;"></switch-station>
        <span v-if="stationDustInfo.res.body.data">
            <span class="data-span">积灰损失电量：<span class="font16">{{stationDustInfo.res.body.data.dust_we || '-'}}{{stationDustInfo.res.body.units.dust_we}}</span></span>
            <span class="data-span">损失小时数：<span class="font16">{{stationDustInfo.res.body.data.dust_we_hours || '-'}}{{stationDustInfo.res.body.units.dust_we_hours}}</span></span>
            <span class="data-span">损失占比：<span class="font16">{{stationDustInfo.res.body.data.dust_we_r || '-'}}{{stationDustInfo.res.body.units.dust_we_r}}</span></span>
            <span class="data-span">清洁指数：<span class="font16">{{stationDustInfo.res.body.data.clean_mark || '-'}}{{stationDustInfo.res.body.units.clean_mark}}</span></span>
            <span class="data-span">周边电站清洁指数：<span class="font16">{{stationDustInfo.res.body.data.clean_mark_50km || '-'}}{{stationDustInfo.res.body.units.clean_mark_50km}}</span></span>
        </span>
    </div>
</template>

<script>
import SwitchStation from '@/components/station/switchStation/switchStation'
import {api＿stationDustInfo} from '@newEnergyCloud/request/api'
import theme from './theme/theme'
export default {
    mixins: [theme],
    data () {
        return {
            startDate: null,
            endDate: null,
            stationDustInfo: api＿stationDustInfo({
                later: true,
                res: {body: {data: {}, units: {}}}
            })
        }
    },
    components: {
        SwitchStation
    },
    methods: {
        dateChange (data) {
            this.startDate = data.startDate
            this.endDate = data.endDate
            this.getData()
        },
        getData () {
            this.stationDustInfo.getData({startDate: this.startDate, endDate: this.endDate})
        }
    },
    created () {
        this.$bus.$on('changeDateAshEmit', this.dateChange)
        this.$bus.on('stationChange', this.getData)
    },
     beforeDestroy () {
        this.$bus.off('changeDateAshEmit', this.dateChange)
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
        margin-right: 45px;
    }
}
</style>
