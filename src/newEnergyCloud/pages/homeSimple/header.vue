<template>
    <div class="header">
        <img v-if="currentRoleData.comLogo" class="pull-left" :src="currentRoleData.comLogo[0] === '/' ? currentRoleData.comLogo : ('/' + currentRoleData.comLogo)" alt="logo">
        <span class="pull-left company-title">{{currentRoleData.comName}}</span>
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
        currentRoleData () {
            return this.$store.state.user.rolelist.find(v => v.roleId === this.$store.getters.current_role)
        },
        isFull () {
            return this.vh === window.screen.height
        }
    },
    methods: {
        toggleFullscreen () {
            (this.isFull || isFullscreen()) ? exitFull() : requestFullScreen()
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    height:67px;
    background:rgba(6,43,90,.7);
    box-shadow:0px 3px 3px 0px rgba(0,1,1,0.23);
    text-align: center;
    color: #fff;
    line-height: 67px;
    font-size: 22px;
    padding: 0 23px;
    position: relative;

    img {
        height: 57px;
        margin: 5px 0;
        position: relative;
        z-index: 2;
    }

    .company-title {
        position: relative;
        z-index: 2;
    }

    .mask {
        width: 100%;
        height: 100%;
        padding-left: 37px;
        padding-right: 27px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        background-image: linear-gradient(to right, rgba(5, 48, 84, .4), transparent,transparent, rgba(5, 48, 84, .7) 50%, transparent,transparent,transparent,transparent, rgba(5, 48, 84, .7) 95%);
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
            animation: run 20s linear 0s infinite;

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
