<template>
    <div class="wiring-diagram">
        <div><switch-station style="margin-right:80px;"></switch-station></div>
        <div class="content-area">
            <div class="clearfix" style="line-height:33px;">
                <el-button type="primary" @click="showDetailModal()">详情</el-button>
                <div class="pull-right">
                    <span v-for="item in wiringList" :key="item.id">
                        <span @click="changeWiring(item)" class="common-tab" :class="{'active-tab': activeId === item.id}">{{item.name}}</span>&nbsp;&nbsp;&nbsp;
                    </span>
                </div>
            </div>
            <div class="diagram-con">
                <div class="svg-bg">
                    <!-- <div v-html="svgUrl"></div> -->
                    <svg-frame :svgSrc="svgUrl" :svgData="svgData" class="svg-frame"></svg-frame>
                </div>
            </div>
            <div class="foot-scroll-area" :style="{border:'1px solid ' + theme.$footAreaBorderColor}">
                <div class="scoll-con"><span class="scroll-area"><span v-for="info in latestInfoList" :key="info.id" ><span class="date-class">{{computerDate(info.stime)}}</span>&nbsp;{{info.eventDesc}};  &nbsp;&nbsp;&nbsp;&nbsp;</span></span></div>
                <span class="arrow-up" @click="showLatest7days()"><i class="el-icon-caret-top"></i></span>
                <div class="push-up-modal" :class="{'push-down': height0 === true}" :style="{border:'1px solid ' + theme.$footAreaBorderColor}" v-show="ifPushUpModal">
                    <div class="text-right">
                        <span class="arrow-down" @click="pushDown()"><i class="el-icon-caret-bottom"></i></span>
                    </div>
                    <div>
                        <recent-days v-bind="{currentDeviceIds: this.deviceIds, stid: this.stid}"></recent-days>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            width="1260px"
            center
            top="50px"
            @opened="$bus.emit('openWiringDetailModal')"
            @close="$bus.emit('closeWiringDetail')"
            :visible.sync="wiringDetailModal.visible">
            <wiring-detail v-bind="wiringDetailModal"></wiring-detail>
            <!-- <div slot="footer" class="dialog-footer">
                <el-button type="b2" @click="wiringDetailModal.visible = false">关 闭</el-button>
            </div> -->
        </el-dialog>
    </div>
</template>

<script>
import { api＿wiringdiagramSelectByCondition, api＿wiringGetSvgData, api＿rtmDeviceLogWiringdiagram } from '@newEnergyCloud/request/api'
import SwitchStation from '@/components/station/switchStation/switchStation'
import svgFrame from '@newEnergyCloud/pages/iframeSvg/iframe'
import theme from './theme/theme'
// import { download } from '@comm/request/http'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight, theme],
    data () {
        return {
            latestInfoList: [],
            ifPushUpModal: false,
            height0: false,
            activeId: null,
            svgUrl: null,
            deviceIds: '',
            stid: '',
            wiringDetailModal: {
                visible: false
            },
            wiringList: [],
            svgDataInterval: null,
            latest10DataInterval: null,
            wiringdiagramSelectByCondition: api＿wiringdiagramSelectByCondition({
                later: true
            }),
            svgData: null,
            wiringGetSvgData: api＿wiringGetSvgData({
                later: true
            }),
            rtmDeviceLogWiringdiagram: api＿rtmDeviceLogWiringdiagram({
                later: true
            })
        }
    },
    created () {
        this.$bus.on('stationChange', this.stationChange)
        this.getWiringDiagramList() // 接线图列表
    },
    methods: {
        computerDate (time) {
            if (new Date(time).Format('yyyy-MM-dd') === new Date().Format('yyyy-MM-dd')) {
                return '今日' + new Date(time).Format('hh:mm:ss')
            } else {
                return new Date(time).Format('yyyy-MM-dd hh:mm:ss')
            }
        },
        stationChange (data) {
            this.getWiringDiagramList()
        },
        // 获取最近10条信息，从右到左移动显示
        getLatestInfoData () {
            this.rtmDeviceLogWiringdiagram.getData({eqids: this.deviceIds, stid: this.stid}).then(res => {
                if (res.code === 0) {
                    this.latestInfoList = res?.body?.data
                } else {
                    this.latestInfoList = []
                }
            })
        },
        // 向上展开最近7天的信息弹框
        showLatest7days () {
            this.height0 = false
            this.ifPushUpModal = true
            this.$bus.$emit('emitLatestday')
        },
        // 向下合住
        pushDown () {
            this.height0 = true
            setTimeout(() => {
                this.ifPushUpModal = false
            }, 200)
        },
        getWiringDiagramList () {
            this.wiringdiagramSelectByCondition.getData({type: '01'}).then(res => {
                if (res.body && res.body.length) {
                    this.wiringList = res.body
                    if (this.wiringList[0].stId && this.wiringList[0].deviceIds) {
                        this.changeWiring(this.wiringList[0])
                    }
                } else {
                    this.wiringList = []
                    this.latestInfoList = []
                    this.svgUrl = null
                    this.activeId = ''
                    this.deviceIds = ''
                    this.stid = ''
                    if (this.svgDataInterval) clearInterval(this.svgDataInterval)
                    if (this.latest10DataInterval) clearInterval(this.latest10DataInterval)
                }
                // todo test
                // this.wiringList = [
                //     {deviceIds: 1000, id: 19, name: '一次图', num: 1, stId: 4196, svgPath: '', type: '01', typeName: '变电站接线图'},
                //     {deviceIds: 1000, id: 20, name: '一次图-2#', num: 2, stId: 4196, svgPath: '', type: '01', typeName: '变电站接线图'},
                //     {deviceIds: 1000, id: 21, name: '一次图-1#', num: 3, stId: 4196, svgPath: '', type: '01', typeName: '变电站接线图'}
                // ]
                // this.changeWiring(this.wiringList[0])
            })
        },
        changeWiring (item) {
            this.activeId = item.id
            this.deviceIds = item.deviceIds
            this.stid = item.stId
            this.getSvgData()
            this.getLatestInfoData()
            this.svgDataInterval && clearInterval(this.svgDataInterval)
            this.latest10DataInterval && clearInterval(this.latest10DataInterval)
            this.svgDataInterval = setInterval(() => {
                this.getSvgData()
            }, 30000)
            this.latest10DataInterval = setInterval(() => {
                this.getLatestInfoData() // 最近10条
            }, 30000)
            this.svgUrl = '/document/svg/' + item.stId + '_' + item.type + '_' + item.num + '.svg?_=' + Date.now()
        },
        getSvgData () {
            this.wiringGetSvgData.getData({stid: this.stid, devIds: this.deviceIds}).then(res => {
                this.svgData = res?.body
            })
        },
        // 打开详情弹框
        showDetailModal () {
            this.wiringDetailModal = {
                visible: true,
                deviceIds: this.deviceIds,
                stid: this.stid,
                wiringList: this.wiringList,
                currentWiringId: this.activeId
            }
        }
    },
    components: {
        SwitchStation,
        svgFrame,
        recentDays: () => import('./recent7days'),
        wiringDetail: () => import('./wiringDetail')
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.stationChange)
        if (this.svgDataInterval) clearInterval(this.svgDataInterval)
        if (this.latest10DataInterval) clearInterval(this.latest10DataInterval)
    }
}
</script>
<style lang="scss">
.wiring-diagram {
    .el-dialog__headerbtn .el-dialog__close {
        position: absolute;
        right: -50px;
        font-size: 30px;
        color: white;
        top: -25px;
    }
    .el-dialog {
        .el-dialog__header {
            padding: 0px;
            padding-bottom: 0px;
        }
        .el-dialog__body {
            padding: 0;
        }
    }
    .el-dialog--center .el-dialog__body {
        padding: 0;
        background-color: #edeff9;
    }
}
</style>
<style lang="scss" scoped>
@import './theme/theme.scss';
.wiring-diagram {
    height: 100%;
    padding: 20px 15px;
    @include page_c(color, $pageHeaderLine);
    .content-area{
        padding: 10px;
        margin-top: 20px;
        .common-tab{
            cursor: pointer;
        }
        .active-tab{
            color: #2FBFCC;
            border-bottom:1px solid #2FBFCC;
        }
        .diagram-con{
            width:100%;
            margin-top: 5px;
            .svg-bg{
                height: calc(100vh - 185px);
                overflow: auto;
                background: black;
                margin: 10px 0;
                text-align: center;
            }
            .svg-frame {
                width: 100%;
                height: 100%;
            }
        }
        .foot-scroll-area{
            position: relative;
            height: 40px;
            @include page_c(background-color, $footAreaBgColor);
            .scoll-con{
                position: absolute;
                overflow: hidden;
                height: 40px;
                width: 100%;
            }
            .scroll-area{
                display: inline-block;
                position:absolute;
                right: 40px;
                top: 12px;
                min-width: 100%;
                width: max-content;
                word-break: keep-all;
                animation: run 50s linear 0s infinite;
                .date-class{
                    color: red;
                }
            }
            .arrow-up{
                position:absolute;
                right: 0;
                width: 40px;
                height: 36px;
                @include page_c(background-color, $footArrowBgColor);
                line-height: 48px;
                text-align: center;
                cursor: pointer;
                .el-icon-caret-top{
                    font-size: 30px;
                    color: #2FBFCC;
                }
            }
            .arrow-down{
                display: inline-block;
                width: 40px;
                height: 36px;
                line-height: 48px;
                text-align: center;
                cursor: pointer;
                .el-icon-caret-bottom{
                    font-size: 30px;
                    color: #2FBFCC;
                }
            }
            .push-up-modal{
                position:absolute;
                z-index: 99;
                bottom: -2px;
                left: -0.5%;
                right: -0.5%;
                width: 101%;
                @include page_c(background-color, $footAreaBgColor);
                animation: height100 0.2s linear 0s;
                height: calc(100vh - 88px);
                &.push-down{
                    animation: height0 0.2s linear 0s;
                }
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
@keyframes height100 {
    0% {
        height:40px;
    }
    100% {
        height:calc(100vh - 89px)
    }
}
@keyframes height0 {
    0% {
        height:calc(100vh - 89px)
    }
    100% {
        height:0px;
    }
}
</style>
