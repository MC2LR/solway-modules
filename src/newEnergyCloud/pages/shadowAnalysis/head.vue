<template>
    <div class="head clearfix">
        <switch-station class="pull-left"/>
        <div class="items pull-left">
            <div class="item pull-left">
                <span class="name">阴影损失电量：</span>
                <span class="value">{{queryPvStationAnalysisInfoSe.res.body.data.shade_we ? queryPvStationAnalysisInfoSe.res.body.data.shade_we : queryPvStationAnalysisInfoSe.res.body.data.shade_we === 0 ? 0 : '-'}}{{queryPvStationAnalysisInfoSe.res.body.units.shade_we ? queryPvStationAnalysisInfoSe.res.body.units.shade_we : queryPvStationAnalysisInfoSe.res.body.units.shade_we === 0 ? 0 : '-'}}</span>
            </div>
            <div class="item pull-left">
                <span class="name">损失小时数：</span>
                <span class="value">{{queryPvStationAnalysisInfoSe.res.body.data.shade_we_hours ? queryPvStationAnalysisInfoSe.res.body.data.shade_we_hours : queryPvStationAnalysisInfoSe.res.body.data.shade_we_hours === 0 ? 0 : '-'}}h</span>
            </div>
            <div class="item pull-left">
                <span class="name">损失占比：</span>
                <span class="value">{{queryPvStationAnalysisInfoSe.res.body.data.shade_we_r ? queryPvStationAnalysisInfoSe.res.body.data.shade_we_r : queryPvStationAnalysisInfoSe.res.body.data.shade_we_r === 0 ? 0 : '-'}}%</span>
            </div>
            <div class="item pull-left">
                <span class="name">阴影组串占比：</span>
                <span class="value">{{queryPvStationAnalysisInfoSe.res.body.data.shade_str_r ? queryPvStationAnalysisInfoSe.res.body.data.shade_str_r : queryPvStationAnalysisInfoSe.res.body.data.shade_str_r === 0 ? 0 : '-'}}%</span>
            </div>
            <div class="item pull-left">
                <span class="name">阴影组串数：</span>
                <span class="value">{{queryPvStationAnalysisInfoSe.res.body.data.shade_count ? queryPvStationAnalysisInfoSe.res.body.data.shade_count : queryPvStationAnalysisInfoSe.res.body.data.shade_count === 0 ? 0 : '-'}}串</span>
            </div>
        </div>
    </div>
</template>

<script>
import { api＿queryPvStationAnalysisInfoSe } from '@newEnergyCloud/request/api'
import SwitchStation from '@/components/station/switchStation/switchStation'
import theme from './theme/theme'
export default {
    mixins: [theme],
    components: {
        SwitchStation
    },
    data () {
        return {
            stId: null,
            date: [new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd'), new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd')],
            queryPvStationAnalysisInfoSe: api＿queryPvStationAnalysisInfoSe({
                later: true,
                res: {
                    body: {
                        data: {},
                        names: {},
                        units: {}
                    }
                }
            })
        }
    },
    created () {
        this.getStationInfo()
        this.$bus.on('stationChange', this.stationChange)
        this.$bus.on('dateChange', this.dateChange)
        this.stId = this.$store.getters.station_id
    },
    methods: {
        stationChange (data) {
            this.stId = data.id
            this.getStationInfo()
        },
        dateChange (date) {
            this.date = date
            this.getStationInfo()
        },
        getStationInfo () {
            this.queryPvStationAnalysisInfoSe.getData({
                startDate: this.date[0],
                endDate: this.date[1]
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.stationChange)
        this.$bus.off('dateChange', this.dateChange)
    }
}
</script>

<style lang="scss" scoped>
@import './theme/theme.scss';
.head {
    @include page_c(color, $pageHeadSectionWordColor);
    .switch-station {
        line-height: 37px;
    }
    .items {
        line-height: 33px;
        .item {
            padding: 0 20px;
            .name {
                font-size: 12px;
                @include page_c(color, $pageHeadSectionWordLightColor);
            }
            .value {
                font-size: 16px;
                @include page_c(color, $pageHeadSectionWordColor);
            }
        }

    }
}
</style>
