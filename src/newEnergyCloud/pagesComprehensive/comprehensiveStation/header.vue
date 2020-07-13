<template>
    <div class="header comprehensiveStation">
        <!-- <span class="name">蓝景丽家绿色家装市场</span> -->
        <switch-station class="switch-station"></switch-station>
        <div class="mask"></div>
        <div class="fullpage" :class="{isFull: isFull}">
            <i @click="toggleFullscreen" class="iconfont icon-quanping1" title="全屏/退出全屏"></i>
        </div>
        <div class="advertise pull-right">
            <span>
                <i v-for="item in custWelcMsgCurr.res.data" :key="item.id">{{item.content}}</i>
            </span>
        </div>
    </div>
</template>

<script>
import SwitchStation from '@/components/station/switchStation/switchStation'
import {api＿custWelcMsgCurr} from '@/request/api'
import {requestFullScreen, exitFull, isFullscreen} from '@comm/tools'
import {widthHeight} from '@comm/mixin'
export default {
    mixins: [widthHeight],
    data () {
        return {
            custWelcMsgCurr: api＿custWelcMsgCurr({
                res: {
                    data: []
                }
            })
        }
    },
    computed: {
        isFull () {
            return this.vh === window.screen.height
        }
    },
    methods: {
        toggleFullscreen () {
            (this.isFull || isFullscreen()) ? exitFull() : requestFullScreen()
        }
    },
    components: {
        SwitchStation
    }
}
</script>

<style lang="scss">
.comprehensiveStation.header {
    .switch-station {
        position: absolute;
        left: 0.37rem;
        top: 0;
        line-height: 67px;
        z-index: 2;

        .switch-btn {
            width: max-content;
        }
    }
}
</style>

<style lang="scss" scoped>
.header {
    height: 67px;
    background:rgba(0,62,154,.4);
    box-shadow:0px 3px 3px 0px rgba(0,1,1,0.23);
    font-size: 22px;
    line-height: 67px;
    padding-left: 0.37rem;
    padding-right: 0.27rem;
    position: relative;

    // .name {
    //     position: absolute;
    //     z-index: 2;
    // }
    .mask {
        width: 100%;
        height: 100%;
        padding-left: 0.37rem;
        padding-right: 0.27rem;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        background-image: linear-gradient(to right, rgba(5, 48, 84, .4), transparent,transparent, rgba(5, 48, 84, .7) 50%, transparent,transparent,transparent,transparent, rgba(5, 48, 84, .7) 95%);
        pointer-events: none;
    }

    &:hover {
        .fullpage.isFull {
            visibility: visible;
        }
    }

    .fullpage {
        float: right;
        width: 25px;
        height: 100%;
        position: relative;
        right: -3px;
        z-index: 9;

        &.isFull {
            visibility: hidden;
        }

        i.iconfont {
            cursor: pointer;
            font-size: 25px;
        }
    }

    .advertise {
        width: 50%;
        height: 100%;
        overflow: hidden;
        position: relative;
        // right: 30px;
        .mask {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            // background-image: linear-gradient(to right, rgba(5, 48, 84, .6), transparent, transparent, transparent, rgba(5, 48, 84, .6));
        }

        span {
            color: #fecd69;
            position: absolute;
            right: 0;
            top: 0;
            min-width: 100%;
            width: max-content;
            word-break: keep-all;
            animation: run 10s linear 0s infinite;

            i {
                margin-right: 5em;
            }
        }
    }
}

@keyframes run {
    0% {
        right: -100%;
    }
    100% {
        right: 100%;
    }
}
</style>
