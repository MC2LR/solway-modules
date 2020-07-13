<template>
    <div class='ash-analysis'>
        <page-header></page-header>
        <div>
            <date-btn-group @change="changeDate"/>
        </div>
        <div class="ash-content clearfix">
            <div class="pull-left width-left bg-white">
                <div class="a height-top" v-fullpage>
                    <block-a></block-a>
                </div>
                <div class="b height-center" v-fullpage>
                    <block-b></block-b>
                </div>
                <div class="c height-bottom" v-fullpage>
                    <block-c></block-c>
                </div>
            </div>
            <div class="pull-right width-right bg-white">
                <div class="d height-top" v-fullpage>
                    <block-d></block-d>
                </div>
                <div class="e height-center" v-fullpage>
                    <block-e></block-e>
                </div>
                <div class="f height-bottom" v-fullpage>
                    <edit-area></edit-area>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {rem} from '@comm/mixin'
// import {api＿getStationEnergy} from '@newEnergyCloud/request/api'
import dateBtnGroup from '@/components/dateBtnGroup'
import PageHeader from './header'
import blockA from './blocks/blockA'
import blockB from './blocks/blockB'
import blockC from './blocks/blockC'
import blockD from './blocks/blockD'
import blockE from './blocks/blockE'
import editArea from './editArea'
import theme from './theme/theme'
export default {
    mixins: [rem, theme],
    components: {
        dateBtnGroup,
        PageHeader,
        blockA,
        blockB,
        blockC,
        blockD,
        blockE,
        editArea
    },
    data () {
        return {
            date: {}
        }
    },
    methods: {
        changeDate (date) {
            this.startDate = date[0].Format('yyyy-MM-dd')
            this.endDate = date[1].Format('yyyy-MM-dd')
            this.$bus.$emit('changeDateAshEmit', {startDate: this.startDate, endDate: this.endDate})
        }
    },
    created () {
        // 切换电站
        // this.$bus.on('stationChange', data => this.changeDate([new Date(Date.now() - 86400000), new Date(Date.now() - 86400000)]))
    },
    mounted () {
        // this.changeDate([new Date(Date.now() - 86400000), new Date(Date.now() - 86400000)])
    },
    beforeDestroy () {
        // this.$bus.off('stationChange', this.changeDate)
    }
}
</script>
<style lang="scss">
[data-pagetheme="dark"] {
    .ash-analysis{
        @import '@comm/assets/themes/input/pageTheme/input_dark1.scss';
    }
}
</style>
<style lang='scss' scoped>
@import './theme/theme.scss';
[data-pagetheme="dark"] {
    .ash-analysis{
        background:url('../../assets/images/analysis-bg.jpg') no-repeat;
        background-size: cover;
        .ash-content{
            .bg-white{
                >div{
                    &.v-fullpage{
                        background: #141d40;
                    }
                }
            }
        }
    }
}
.ash-analysis {
    height: 100%;
    padding: 0px 10px 15px;
    .ash-content{
        margin: 10px 0;
        height: calc(100vh - 105px);
        overflow:auto;
        .bg-white{
            >div{
                border:1px solid transparent;
                border-radius: 4px;
                @include page_c(background-color, $blockBgColor);
                @include page_c(border-color, $blockBorderColor);
                background: white;
                width:100%;
                margin-bottom:10px;
            }
        }
    }
    .height-top{
        height: 240px;
    }
    .height-center{
        height: 240px;
    }
    .height-bottom{
        height: 484px;
    }
    .width-left{
        width:53%;
        margin-right:1%;
    }
    .width-right{
        width:46%;
    }
}
</style>
