<template>
    <div class="station-info">
        <div class="items pull-left">
            <div class="item pull-left">
                <span class="name">故障损失电量：</span>
                <span class="value">{{queryPvStationAnalysisInfoSe.res.body.data.fail_we === 0 ? 0 : queryPvStationAnalysisInfoSe.res.body.data.fail_we ? queryPvStationAnalysisInfoSe.res.body.data.fail_we : '-'}}{{queryPvStationAnalysisInfoSe.res.body.units.fail_we || '-'}}</span>
            </div>
            <div class="item pull-left">
                <span class="name">损失小时数：</span>
                <span class="value">{{queryPvStationAnalysisInfoSe.res.body.data.fail_we_hours === 0 ? 0 : queryPvStationAnalysisInfoSe.res.body.data.fail_we_hours ? queryPvStationAnalysisInfoSe.res.body.data.fail_we_hours : '-'}}h</span>
            </div>
            <div class="item pull-left">
                <span class="name">损失占比：</span>
                <span class="value">{{queryPvStationAnalysisInfoSe.res.body.data.fail_we_r === 0 ? 0 : queryPvStationAnalysisInfoSe.res.body.data.fail_we_r ? queryPvStationAnalysisInfoSe.res.body.data.fail_we_r : '-'}}%</span>
            </div>
            <div class="item pull-left">
                <span class="name">故障台次：</span>
                <span class="value">{{queryPvStationAnalysisInfoSe.res.body.data.fail_count === 0 ? 0 : queryPvStationAnalysisInfoSe.res.body.data.fail_count ? queryPvStationAnalysisInfoSe.res.body.data.fail_count : '-'}}台次</span>
            </div>
            <div class="item pull-left">
                <span class="name">故障台数：</span>
                <span class="value">{{queryPvStationAnalysisInfoSe.res.body.data.fail_number === 0 ? 0 : queryPvStationAnalysisInfoSe.res.body.data.fail_number ? queryPvStationAnalysisInfoSe.res.body.data.fail_number : '-'}}台</span>
            </div>
            <div class="item pull-left">
                <span class="name">故障率：</span>
                <span class="value">{{queryPvStationAnalysisInfoSe.res.body.data.fail_r === 0 ? 0 : queryPvStationAnalysisInfoSe.res.body.data.fail_r ? queryPvStationAnalysisInfoSe.res.body.data.fail_r : '-'}}次/台</span>
            </div>
        </div>
    </div>
</template>

<script>
import { api＿queryPvStationAnalysisInfoSe } from '@newEnergyCloud/request/api'
import theme from './theme/theme'

export default {
    mixins: [theme],
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
.station-info {
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
