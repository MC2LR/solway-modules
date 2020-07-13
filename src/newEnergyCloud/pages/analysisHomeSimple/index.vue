<template>
    <div class="analysis-home">
        <home-header></home-header>
        <aside-menu theme="darkBlue" :fullpage="true"></aside-menu>
        <div v-if="isHome" class="body clearfix">
            <date-btn-group
            @change="changeDate"/>
            <div class="dark-theme-bg">
                <span class="circle-bg"></span>
                <div class="body-top">
                    <power-generation class="block-analysis"/>
                    <fault-generation class="block-analysis"/>
                </div>
                <div class="body-bottom">
                    <shadow-power-loss class="block-analysis"/>
                    <ash-power-loss class="block-analysis"/>
                    <expert-analysis class="block-analysis"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {rem} from '@comm/mixin'
import dateBtnGroup from '@/components/dateBtnGroup'
import AsideMenu from '@/components/AsideMenu'
import HomeHeader from './header'
import PowerGeneration from './modules/PowerGeneration'
import FaultGeneration from './modules/FaultGeneration'
import ShadowPowerLoss from './modules/ShadowPowerLoss'
import AshPowerLoss from './modules/AshPowerLoss'
import ExpertAnalysis from './modules/ExpertAnalysis'
import theme from './theme/theme'

export default {
    mixins: [rem, theme],
    components: {
        HomeHeader,
        AsideMenu,
        dateBtnGroup,
        PowerGeneration,
        FaultGeneration,
        ShadowPowerLoss,
        AshPowerLoss,
        ExpertAnalysis
    },
    data () {
        return {
            isHome: true
        }
    },
    created () {
        if (this.$store.getters.station_name) {
            this.isHome = false
            this.$store.dispatch('station/clearStation').then(res => {
                this.isHome = true
            })
        }
    },
    methods: {
        changeDate (date) {
            const dateArr = [date[0].Format('yyyy-MM-dd'), date[1].Format('yyyy-MM-dd')]
            this.$bus.emit('dateChange', dateArr)
        }
    }
}
</script>

<style lang="scss">
[data-pagetheme="darkBlue"] {
    .analysis-home{
        background: rgba(#051829, .7) url('./images/bg-star.jpg');
        background-size: cover;
    }
}
[data-pagetheme="dark"] {
    .analysis-home{
        .body {
            background: rgba(19,41,53, 1);
            .title {
                color:#45E4F7;
                .title-bg{
                    background:linear-gradient(to right, rgba(40,189,217,.5), transparent);
                    text-indent: 5px;
                }
            }
            .dark-theme-bg{
                background: linear-gradient(90deg, rgba(20,49,129,0.28) 10%, transparent 0),linear-gradient(rgba(20,49,129,0.28) 10%, transparent 0);
                background-size: 20px 20px;
                position: relative;
                .circle-bg{
                    display: inline-block;
                    position: absolute;
                    background:rgba(40,116,255, 0.35);
                    height: calc(85%);
                    width: 35%;
                    border-radius: 50%;
                    left: 35%;
                    top:10%;
                    filter: blur(45px);
                    box-shadow:0px 6px 90px 160px rgba(40,116,255, 0.2);
                }
                // .circle-bg-out{
                //     display: inline-block;
                //     position: absolute;
                //     background:rgba(14,21,45, 1);
                //     height: 450px;
                //     width: 500px;
                //     border-radius: 50%;
                //     left: calc(50% - 250px);
                //     top:50px;
                //     box-shadow: inset 0px 60px 400px 0px rgba(40,116,255, 0.52);
                // }
            }
            .block-analysis{
                height: 100%;
                position: relative;

                &::before {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    background: linear-gradient(to left, rgba(35,155,186, 1), rgba(35,155,186, 1)) left top no-repeat,
                                linear-gradient(to bottom, rgba(35,155,186, 1), rgba(35,155,186, 1)) left top no-repeat,
                                linear-gradient(to left, rgba(35,155,186, 1), rgba(35,155,186, 1)) right bottom no-repeat,
                                linear-gradient(to left, rgba(35,155,186, 1), rgba(35,155,186, 1)) right bottom no-repeat;
                    background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
                }
            }
        }
    }
}
.analysis-home {
    .date-btn-group {
        .el-button {
            background: rgba(0,62,154, 0.4);
            border-color: rgba(0,62,154, 0.4);
            color: rgba(255, 255, 255, .8);
            &.el-button--primary {
                background: #2FBFCC;
                border-color: #2FBFCC;
                color: rgba(255, 255, 255, 1);
            }
            &:last-child {
                margin-right: 10px;
            }
        }
    }
}
</style>

<style lang="scss" scoped>
@import './theme/theme.scss';
.analysis-home {
    font-size: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .body {
        padding: 10px 23px;
        height: calc(100vh - 67px);
        .dark-theme-bg{
            height: calc(100% - 45px);
        }
        .date-btn-group {
            height: 28px;
            margin-bottom: 10px;
        }
        .body-top {
            height: 52%;
            margin-bottom: 10px;
            .power-generation {
                width: 52%;
                height: 100%;
                display: inline-block;
                margin-right: 10px;
                @include page_c(background-color, $blockBgColor);
            }
            .fault-generation {
                width: calc(48% - 10px);
                height: 100%;
                display: inline-block;
                @include page_c(background-color, $blockBgColor);
            }
        }
        .body-bottom {
            width: 100%;
            height: calc(48% - 10px);
            display: flex;
            justify-content: space-between;
            .shadow-power-loss {
                flex: 1;
                margin-right: 10px;
                @include page_c(background-color, $blockBgColor);
            }
            .ash-power-loss {
                flex: 1;
                margin-right: 8px;
                @include page_c(background-color, $blockBgColor);
            }
            .expert-analysis {
                flex: 1;
                @include page_c(background-color, $blockBgColor);
            }
        }
    }
}
</style>
