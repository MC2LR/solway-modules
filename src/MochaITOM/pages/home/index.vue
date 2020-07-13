<template>
    <div class="home-mochal">
        <aside-menu theme="darkBlue" :fullpage="true"></aside-menu>
        <home-header ></home-header>
        <div class="clearfix body-container">
            <div class="body-left">
                <div class="left-top" :class="{'open': !fold, 'fold': fold}">
                    <info-map v-fullpage></info-map>
                </div>
                <div class="left-bottom" :class="{'close': !fold, 'fold': fold}">
                    <span class="triangle" :class="{'arrow-down': fold, 'arrow-up': !fold}" @click="fold = !fold"></span>
                    <info-person v-fullpage></info-person>
                </div>
            </div>
            <div class="body-right">
                <div class="right-top">
                    <info-event v-fullpage></info-event>
                </div>
                <div class="right-bottom">
                    <info-task v-fullpage></info-task>
                </div>
            </div>
        </div>
        <el-dialog
            width="876px"
            center
            @opened="$bus.emit('openPublishTaskDialog')"
            @close="publishTaskDialog.show = false"
            :title="dialogTitle"
            :destroy-on-close="true"
            :visible.sync="publishTaskDialog.show">
            <publish-task @updateSuccess="updateSuccess" v-bind="publishTaskDialog"></publish-task>
        </el-dialog>
        <detaile></detaile>
    </div>
</template>

<script>
import {Dialog} from 'element-ui'
import HomeHeader from './header'
import infoMap from './modules/infoMap'
import infoPerson from './modules/infoPerson'
import infoEvent from './modules/infoEvent'
import infoTask from './modules/infoTask'
import AsideMenu from '@/components/AsideMenu'
import detaile from './modules/detaile/index'
export default {
    data () {
        return {
            dialogTitle: '派工',
            fold: true,
            publishTaskDialog: {
                show: false
            }
        }
    },
    components: {
        detaile,
        HomeHeader,
        AsideMenu,
        infoMap,
        infoPerson,
        infoEvent,
        infoTask,
        ElDialog: Dialog,
        PublishTask: () => import('./modules/infoEvent/dialogs/publishTask')
    },
    methods: {
        // 统一保存成功回调
        updateSuccess () {
            this.publishTaskDialog = {
                show: false
            }
            this.$bus.$emit('publishTaskSuccessEmit')
        }
    },
    created () {
        this.$bus.on('showPublishTaskDialog', (data) => {
            this.publishTaskDialog = {
                ...data,
                show: true
            }
        })
    },
    mounted () {
        // 任务详情弹框
        // this.$bus.$on('detaile', (val) => {
        //     // this.$refs.taskpop.event(val)
        // })
    },
    beforeDestroy () {
        this.publishTaskDialog = {}
    }
}
</script>

<style lang="scss" scoped>
.home-mochal {
    color: #fff;
    background: url('./images/bg.png') no-repeat;
    background-size: cover;
    .body-container{
        margin:0 21px 0;
        .body-left{
            height:calc(100vh - 70px);
            float:left;
            width: 51%;
            padding-right:0.5%;
            .left-top{
                background: url('./images/border-bg1.png') no-repeat;
                background-size: 100% 100%;
                &.open{
                    height: calc(100% - 1% - 33px);
                    animation: height100 0.2s linear 0s;
                }
                &.fold{
                    height: 65%;
                }
            }
            .left-bottom{
                margin-top:1%;
                position: relative;
                background: url('./images/border-bg3-big.png') no-repeat;
                background-size: 100% 100%;
                &.close{
                    height: 33px;
                    animation: height0 0.2s linear 0s;
                    background: url('./images/border-bg3-small.png') no-repeat;
                    background-size: 100% 100%;
                }
                &.fold{
                    height: 34%;
                }
                .triangle{
                    position:absolute;
                    left: 49.5%;
                    cursor: pointer;
                    &.arrow-down{
                        border-top:15px solid rgba(88, 231, 255, 1);
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        top:5.5%;
                    }
                    &.arrow-up{
                        border-bottom:15px solid rgba(88, 231, 255, 1);
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        bottom: 2px;
                    }
                }
            }
        }
        .body-right{
            float:right;
            height:calc(100vh - 70px);
            width: 49%;
            .right-top{
                background: url('./images/border-bg2.png') no-repeat;
                background-size: 100% 100%;
                height: 51%;
            }
            .right-bottom{
                background: url('./images/border-bg4.png') no-repeat;
                background-size: 100% 100%;
                height: 48%;
                margin-top:1%;
            }
        }
    }
    @keyframes height100 {
        0% {
            height:65%;
        }
        100% {
            height:calc(100% - 1% - 33px);
        }
    }
    @keyframes height0 {
        0% {
            height:34%;
        }
        100% {
            height: 33px;
        }
    }
}
</style>
