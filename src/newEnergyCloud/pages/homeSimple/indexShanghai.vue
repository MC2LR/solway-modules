<template>
    <div class="home-shanghai">
        <home-header></home-header>
        <aside-menu theme="darkBlue" :fullpage="true"></aside-menu>
        <div class="body">
            <div class="top-con clearfix">
                <div class="left-con">
                    <div class="left-top border-box">
                        <daily-output></daily-output>
                    </div>
                    <div class="left-bottom border-box">
                        <pv-chart></pv-chart>
                    </div>
                </div>
                <div class="right-con border-box">
                    <rotation-map></rotation-map>
                </div>
            </div>
            <div class="bottom-con">
                <div class="left-con border-box">
                    <project-item></project-item>
                </div>
                <div class="right-con border-box">
                    <reduce-emissions></reduce-emissions>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {rem} from '@comm/mixin'
import HomeHeader from './modulesShanghai/header'
import AsideMenu from '@/components/AsideMenu'
import DailyOutput from './modulesShanghai/dailyOutput'
import PvChart from './modules/leftBottom/pvChartc'
import ProjectItem from './modulesShanghai/projectItemOne'
import RotationMap from './modules/mapImage/rotationMap'
import ReduceEmissions from './modulesShanghai/reduceEmissions/reduceEmissions'

export default {
    mixins: [rem],
    components: {
        HomeHeader,
        AsideMenu,
        DailyOutput,
        PvChart,
        ProjectItem,
        RotationMap,
        ReduceEmissions
    },
    data () {
        return {
            // isFullPageShow: true
        }
    }
}
</script>

<style lang="scss" scoped>
.home-shanghai {
    font-size: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: rgba(#051829, .7) url('./images/bg-shanghai.png') no-repeat;
    background-size: 100% 100%;

    .body {
        padding: 0px 23px 10px;
        height: calc(100vh - 67px);
        .border-box {
            position: relative;
            border:1px solid rgba(3,248,254,0.2);
            box-shadow: inset 0px 0px 30px 8px rgba(39,103,241,0.3);

            &::before {
                position: absolute;
                content: '';
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                background: linear-gradient(to left, rgba(40,194,221, 1), rgba(40,194,221, 1)) left top no-repeat,
                            linear-gradient(to bottom, rgba(40,194,221, 1), rgba(40,194,221, 1)) left top no-repeat,
                            linear-gradient(to left, rgba(40,194,221, 1), rgba(40,194,221, 1)) right top no-repeat,
                            linear-gradient(to left, rgba(40,194,221, 1), rgba(40,194,221, 1)) right top no-repeat,
                            linear-gradient(to left, rgba(40,194,221, 1), rgba(40,194,221, 1)) left bottom no-repeat,
                            linear-gradient(to bottom, rgba(40,194,221, 1), rgba(40,194,221, 1)) left bottom no-repeat,
                            linear-gradient(to left, rgba(40,194,221, 1), rgba(40,194,221, 1)) right bottom no-repeat,
                            linear-gradient(to left, rgba(40,194,221, 1), rgba(40,194,221, 1)) right bottom no-repeat;
                background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
            }
        }
        .left-con{
            width: 45%;
            height: 100%;
            float:left;
        }
        .right-con{
            width: calc(55% - 12px);
            height: 100%;
            margin-left:12px;
            float: left;
        }
        .top-con{
            height: 73%;
            margin-bottom: 12px;
            .left-top{
                height: 40%;
                margin-bottom:12px;
                .daily-output-shanghai {
                    height: 100%;
                }
            }
            .left-bottom{
                height: calc(60% - 12px);
            }
            .rotation-map {
                height: 100%;
                overflow: hidden;
            }
        }
        .bottom-con{
            height: calc(27% - 12px);
            .project-item-one-shanghai{
                height: 100%;
            }
            .reduce-emissions {
                height: 100%;
            }
        }
        // .left-con {
        //     float: left;
        //     width: 45%;
        //     height: 100%;

        //     .daily-output-shanghai {
        //         height: 48%;
        //         background-color: rgba(#003E9A, .4);
        //     }

        //     .project-item-shanghai {
        //         background-color: rgba(#003E9A, .4);
        //         margin-top: 10px;
        //         height: calc(52% - 10px);
        //     }
        // }
        // .right-con{
        //     float:right;
        //     width:54%;
        //     height: 100%;
        //     margin-left:1%;
        //     .rotation-map {
        //         height: 60%;
        //         overflow: hidden;
        //     }
        //     .reduce-emissions {
        //         height: calc(40% - 10px);
        //         margin-top: 10px;
        //         background-color: rgba(#003E9A, .4);
        //     }
        // }
    }
}
</style>
