<template>
    <div class="device-fault">
        <div class="head clearfix">
            <switch-station class="pull-left"/>
            <station-info></station-info>
        </div>
        <date-btn-group @change="changeDate"></date-btn-group>
        <div class="content">
            <div class="charts" v-fullpage>
                <line-chart></line-chart>
            </div>
            <div class="tables pull-left" v-fullpage>
                <table-area></table-area>
            </div>
            <div class="right-bottom pull-right" v-fullpage>
                <fault-count></fault-count>
                <pies></pies>
            </div>
        </div>
    </div>
</template>

<script>
import mixinWidthHeight from '@comm/mixin/widthHeight'
import SwitchStation from '@/components/station/switchStation/switchStation'
import dateBtnGroup from '@/components/dateBtnGroup'
import stationInfo from './stationInfo'
import lineChart from './lineChart'
import faultCount from './rightBottom/count'
import pies from './rightBottom/pies'
import tableArea from './tableArea'
import theme from './theme/theme'

export default {
    mixins: [mixinWidthHeight, theme],
    components: {
        SwitchStation,
        dateBtnGroup,
        stationInfo,
        lineChart,
        tableArea,
        faultCount,
        pies
    },
    data () {
        return {
            stId: null,
            groupEndDate: new Date(Date.now() - 86400000),
            date: [new Date(this.groupEndDate).Format('yyyy-MM-dd'), new Date(this.groupEndDate).Format('yyyy-MM-dd')]
        }
    },
    created () {
        this.$bus.on('stationChange', this.stationChange)
        this.stId = this.$store.getters.station_id
    },
    methods: {
        stationChange (data) {
            this.stId = data.id
        },
        changeDate (date) {
            this.date = [date[0].Format('yyyy-MM-dd'), date[1].Format('yyyy-MM-dd')]
            this.$bus.emit('dateChange', this.date)
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.stationChange)
    }
}
</script>

<style lang="scss">
[data-pagetheme="dark"] {
    .device-fault {
        @import '@comm/assets/themes/input/pageTheme/input_dark1.scss';
        background:url('../../assets/images/analysis-bg.jpg') no-repeat;
        background-size: cover;
    }
}
.device-fault {
    .tables {
        .el-table  {
            .row-style {
                &:hover,
                .hover-row {
                    // background: #2FBFCC;
                    // box-shadow: 0px 10px 13px 0px rgba(12,61,65,0.28);
                    color: #fff;
                    td {
                        // background: transparent;
                    }
                }
            }
        }
    }
}
</style>

<style lang="scss" scoped>
@import './theme/theme.scss';
[data-pagetheme="dark"] {
    .device-fault {
        .content {
            .charts{
                &.v-fullpage{
                    background-color: #141d40;
                }
            }
            .tables{
                &.v-fullpage{
                    background-color: #141d40;
                }
            }
            .right-bottom{
                &.v-fullpage{
                    background-color: #141d40;
                }
            }
        }
    }
}
.device-fault {
    height: 100%;
    padding: 15px 10px;
    padding-top: 5px;
    padding-bottom: 8px;
    .head {
        @include page_c(color, $pageHeadSectionWordColor);
        .switch-station {
            line-height: 37px;
        }
    }
   .date-btn-group {
        height: 28px;
        margin-top: 5px;
        margin-bottom: 10px;
    }
    .content {
        width: 100%;
        height: calc(100% - 88px);
        .charts {
            width: 100%;
            height: 47%;
            margin-bottom: 10px;
            border:1px solid transparent;
            border-radius: 4px;
            @include page_c(background-color, $blockBgColor);
            @include page_c(border-color, $blockBorderColor);
            position: relative;
        }
        .tables {
            width: 60%;
            height: calc(53% - 10px);
            margin-right: 10px;
        }
        .right-bottom {
            width: calc(40% - 10px);
            height: calc(53% - 10px);
            padding: 20px;
            padding-top: 30px;
            border:1px solid transparent;
            border-radius: 4px;
            @include page_c(background-color, $blockBgColor);
            @include page_c(border-color, $blockBorderColor);
        }
    }

}
</style>
