<template>
    <div class="full-page-show">
        <aside-menu theme="darkBlue" :fullpage="true"></aside-menu>
        <full-page-header></full-page-header>
        <div class="body">
            <full-block1 class="block block1"></full-block1><!-- 能源概览分布 -->
            <full-block2 class="block block2"></full-block2><!-- 实景图 -->
            <div class="block-center top">
                <full-block3 class="block block3"></full-block3><!-- 天气 -->
                <full-block4 class="block block4"></full-block4><!-- 节能减排 -->
            </div>
            <full-block5 class="block block5" @click.native="$router.push({name: 'stationRun'})"></full-block5><!-- 光伏发电 -->
            <full-block6 class="block block6" @click.native="$router.push({name: 'chargingPile'})"></full-block6><!-- 充电桩 -->
            <div class="block-center bottom">
                <full-block7 @click.native="$router.push({name: 'energyStorage'})" class="block block7"></full-block7><!-- 储能 -->
            </div>
        </div>
    </div>
</template>

<script>
import {rem} from '@comm/mixin'
import fullPageHeader from './header'
import {block1, block2, block3, block4, block5, block6, block7} from './blocks'
import AsideMenu from '@/components/AsideMenu'
export default {
    mixins: [rem],
    components: {
        fullPageHeader,
        fullBlock1: block1,
        fullBlock2: block2,
        fullBlock3: block3,
        fullBlock4: block4,
        fullBlock5: block5,
        fullBlock6: block6,
        fullBlock7: block7,
        AsideMenu
    }
}
</script>

<style lang="scss" scoped>
.full-page-show {
    height: 100vh;
    background: url(./images/bg.png) no-repeat;
    background-size: cover;
    @include c(color, #fff);

    .body {
        padding: 10px 0.23rem;
        height: calc(100% - 67px);

        .block {
            background:rgba(0,62,154,.4);
            box-shadow:0px 3px 3px 0px rgba(0,1,1,0.36);
            cursor: pointer;
        }

        .block1 {
            width: 33%;
            height: 55%;
            float: left;
            margin-bottom: 10px;
        }

        .block2 {
            width: 36%;
            height: 55%;
            float: right;
            margin-bottom: 10px;
        }

        .block-center {
            overflow-x: hidden;
            overflow-y: visible;
            padding: 0 10px;

            &.top {
                height: 55%;
                margin-bottom: 10px;
            }

            &.bottom {
                height: calc(45% - 10px);
            }
        }

        .block3 {
            height: 55%;
            margin-bottom: 10px;
        }

        .block4 {
            height: calc(45% - 10px);
        }

        .block5 {
            width: 33%;
            height: calc(45% - 10px);
            float: left;
        }

        .block6 {
            width: 33%;
            height: calc(45% - 10px);
            float: right;
        }

        .block7 {
            height: 100%;
        }
    }
}
</style>
