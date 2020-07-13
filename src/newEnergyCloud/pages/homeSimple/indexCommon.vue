<template>
    <div class="home">
        <home-header></home-header>
        <aside-menu theme="darkBlue" :fullpage="true"></aside-menu>
        <div class="body clearfix">
            <div class="let-top">
                <daily-output></daily-output>
                <completion-rate></completion-rate>
            </div>
            <rotation-map></rotation-map>
            <bottomLeft :full-page-show="isFullPageShow" class="bottomLeft pull-left"></bottomLeft>
            <reduce-emissions class="pull-right"></reduce-emissions>
        </div>
    </div>
</template>

<script>
import {rem} from '@comm/mixin'
import HomeHeader from './header'
import AsideMenu from '@/components/AsideMenu'
import DailyOutput from './modules/dailyOutput'
import CompletionRate from './modules/completionRate'
import RotationMap from './modules/mapImage/rotationMap'
import bottomLeft from './modules/leftBottom'
import ReduceEmissions from './modules/reduceEmissions/reduceEmissions'

export default {
    mixins: [rem],
    components: {
        HomeHeader,
        AsideMenu,
        DailyOutput,
        CompletionRate,
        RotationMap,
        bottomLeft,
        ReduceEmissions
    },
    data () {
        return {
            isFullPageShow: true
        }
    },
    created () {
        // this.timer = setInterval(() => { this.tiemStamp = Date.now() }, 30 * 1 * 1000)
        // 刷新页面改为销毁组件重新创建
        // this.timer = setTimeout(() => window.location.reload(), 30 * 60 * 1000)
        // 心跳发给本地服务
        const _this = this
        const timer = this.timer = setInterval(() => {
            const xhr = new XMLHttpRequest()
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log('心跳响应：ok')
                    } else {
                        console.log('心跳响应：err')
                        clearInterval(timer)
                        _this.isFullPageShow = false
                        return 'request is unsucessful ' + xhr.status
                    }
                }
            }
            xhr.open('GET', 'http://127.0.0.1:3000/heartbeat')
            xhr.send()
        }, 10 * 1 * 1000)
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.home {
    font-size: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: rgba(#051829, .7) url('./images/bg-star.jpg');
    background-size: cover;

    .body {
        padding: 10px 23px;
        height: calc(100vh - 67px);

        .let-top {
            float: left;
            width: 45%;
            height: 60%;

            .daily-output {
                height: 40%;
                background-color: rgba(#003E9A, .4);
            }

            .completion-rate {
                background-color: rgba(#003E9A, .4);
                margin-top: 10px;
                height: calc(60% - 10px);
            }
        }

        .rotation-map {
            height: 60%;
            float: right;
            width: calc(55% - 10px);
            overflow: hidden;
        }

        .bottomLeft, .reduce-emissions {
            height: calc(40% - 10px);
            width: calc(50% - 5px);
            margin-top: 10px;
        }

        .reduce-emissions {
            background-color: rgba(#003E9A, .4);
        }
    }
}
</style>
