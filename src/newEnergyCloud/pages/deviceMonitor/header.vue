<template>
    <div class="header">
        <switch-station></switch-station>
        <div class="infoItem">
            <span class="label">逆变器数量</span>
            <span class="value">{{queryPvStationAnalysisInfoSe.res.body.data.eqcount}}</span>
            <span class="unit">{{queryPvStationAnalysisInfoSe.res.body.units.eqcount}}</span>
        </div>
        <div class="infoItem">
            <span class="label">总装容量</span>
            <span class="value">{{queryPvStationAnalysisInfoSe.res.body.data.inst_kw}}</span>
            <span class="unit">{{queryPvStationAnalysisInfoSe.res.body.units.inst_kw}}</span>
        </div>
        <div class="infoItem">
            <span class="label">环境温度</span>
            <span class="value">{{queryPvStationAnalysisInfoSe.res.body.data.ta_avg}}</span>
            <span class="unit">{{queryPvStationAnalysisInfoSe.res.body.units.ta_avg}}</span>
        </div>
        <div class="infoItem">
            <span class="label">辐射总量</span>
            <span class="value">{{queryPvStationAnalysisInfoSe.res.body.data.rad_chk}}</span>
            <span class="unit">{{queryPvStationAnalysisInfoSe.res.body.units.rad_chk}}</span>
        </div>
        <div class="infoItem">
            <span class="label">发电小时数</span>
            <span class="value">{{queryPvStationAnalysisInfoSe.res.body.data.real_hours}}</span>
            <span class="unit">{{queryPvStationAnalysisInfoSe.res.body.units.real_hours}}</span>
        </div>
        <div class="infoItem">
            <span class="label">发电量</span>
            <span class="value">{{queryPvStationAnalysisInfoSe.res.body.data.real_kwh_chk}}</span>
            <span class="unit">{{queryPvStationAnalysisInfoSe.res.body.units.real_kwh_chk}}</span>
        </div>
    </div>
</template>

<script>
import SwitchStation from '@/components/station/switchStation/switchStation'
import {api＿queryPvStationAnalysisInfoSe} from '@/request/api'
export default {
    components: {
        SwitchStation
    },
    props: ['startDate', 'endDate'],
    data () {
        const defaultDate = new Date(Date.now() - 86400000).Format('yyyy-MM-dd')
        return {
            queryPvStationAnalysisInfoSe: api＿queryPvStationAnalysisInfoSe({
                later: true,
                data: {
                    startDate: defaultDate,
                    endDate: defaultDate
                },
                res: {
                    body: {
                        names: {},
                        data: {},
                        units: {}
                    }
                }
            })
        }
    },
    created () {
        this.$bus.on('deviceMonitorDateChange', this.getData)
        this.$bus.on('stationChange', this.getData)
    },
    methods: {
        getData (dateArr) {
            if (!Array.isArray(dateArr)) return this.queryPvStationAnalysisInfoSe.getData()
            this.queryPvStationAnalysisInfoSe.getData({
                startDate: dateArr[0].Format('yyyy-MM-dd'),
                endDate: dateArr[1].Format('yyyy-MM-dd')
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('deviceMonitorDateChange', this.getData)
        this.$bus.off('stationChange', this.getData)
    }
}
</script>

<style lang="scss" scoped>
@import './theme/theme.scss';
.header {
    height: 60px;
    line-height: 60px;
    padding: 0 13px;
    @include page_c(color, $pageHeaderLine);

    .infoItem {
        display: inline-block;
        margin: 0 10px;

        .label {
            font-size: 12px;
            opacity: .7;

            &::after {
                content: '：';
            }
        }

        .value {
            font-size: 16px;
        }

        .unit {
            font-size: 16px;
        }
    }
}
</style>
