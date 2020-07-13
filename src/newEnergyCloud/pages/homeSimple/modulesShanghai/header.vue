<template>
    <div class="header-shanghai">
        <div class="header-bg">
            <img v-if="currentRoleData.comLogo" :src="currentRoleData.comLogo[0] === '/' ? currentRoleData.comLogo : ('/' + currentRoleData.comLogo)" alt="logo">
            <span class="company-title">{{currentRoleData.comName}}</span>
        </div>
        <div class="fullpage" :class="{isFull: isFull}">
            <i @click="toggleFullscreen" class="iconfont icon-quanping1" title="全屏/退出全屏"></i>
        </div>
    </div>
</template>

<script>
// import {api＿custWelcMsgCurr} from '@/request/api'
import {requestFullScreen, exitFull, isFullscreen} from '@comm/tools'
import {widthHeight} from '@comm/mixin'
export default {
    mixins: [widthHeight],
    data () {
        return {
            // custWelcMsgCurr: api＿custWelcMsgCurr({
            //     res: {
            //         data: []
            //     }
            // })
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
.header-shanghai {
    height:53px;
    text-align: center;
    color: #fff;
    line-height: 53px;
    font-size: 22px;
    padding: 0 23px;
    position: relative;
    text-align: center;
    .header-bg{
        width: 843px;
        height: 53px;
        margin: 14px auto 0;
        background: url('../images/header-bg.png') no-repeat;
        line-height: 30px;
    }
    img {
        height: 38px;
    }

    .company-title {
        vertical-align: super;
        font-size: 32px;
        color: rgb(46,136,243);
        font-weight: bold;
        text-shadow: #fff 2px 0 0, #fff 0 2px 0, #fff -1px 0 0, #fff 0 -1px 0
    }

    &:hover {
        .fullpage.isFull {
            visibility: visible;
        }
    }

    .fullpage {
        width: 60px;
        height: 94%;
        position: absolute;
        right: 5px;
        z-index: 9;
        bottom: 10px;

        &.isFull {
            visibility: hidden;
        }

        i.iconfont {
            cursor: pointer;
            font-size: 25px;
        }
    }
}
</style>
