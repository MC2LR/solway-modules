<template>
    <div class="page_slide_down" v-show="ifShow">
        <div class="hover-header-con"></div>
        <div class="systems-page">
            <div class="module-list clearfix" >
                <div class="square-common s11 knowledgeBaseSummary" v-bind:class="{'active':currentState == 'knowledgeBaseSummary'}" @click="jumpPage('outer_knowledgeBaseSummary')">运维知识</div>
                <div class="s12-con pointer dataShareSummary"  v-bind:class="{'active':currentState == 'dataShareSummary'}"  @click="jumpPage('outer_dataShareSummary')">
                    <div class="s12">共享数据</div>
                    <div class="circle-rotate1"><span></span></div>
                    <div class="circle-rotate2"><span></span></div>
                    <div class="circle-rotate3"><span></span></div>
                    <div class="circle-rotate4"><span></span></div>
                    <div class="circle-rotate5"><span></span></div>
                    <div class="circle-rotate6"><span></span></div>
                    <div class="circle-rotate7"><span></span></div>
                    <div class="circle-rotate8"><span></span></div>
                </div>
                <div class="square-common s13 dataReportSummary"  v-bind:class="{'active':currentState == 'dataReportSummary'}" @click="jumpPage('outer_dataReportSummary')">数据报表</div>
                <div class="square-common s21 maintenancePersonSummary"  v-bind:class="{'active':currentState == 'maintenancePersonSummary'}" @click="jumpPage('outer_maintenancePersonSummary')">运维人员</div>
                <div class="square-common s22 productionManageSummary"  v-bind:class="{'active':currentState == 'productionManageSummary'}" @click="jumpPage('outer_productionManageSummary')">生产管理</div>
                <div class="square-common s23 efficientOperationSummary"  v-bind:class="{'active':currentState == 'efficientOperationSummary'}"  @click="jumpPage('outer_efficientOperationSummary')">高效运维</div>
                <div class="square-common s31 monitoringSummary"  v-bind:class="{'active':currentState == 'monitoringSummary' || currentState == 'monitoringSummaryWp'}"  @click="jumpPage('outer_monitoringSummary')">电站监视</div>
                <div class="square-common s32 analyzeSummary"  v-bind:class="{'active':currentState == 'analyzeSummary' || currentState == 'analyzeSummaryWp'}"  @click="jumpPage('outer_analyzeSummary')">运行分析</div>
                <div class="square-common s33 actionPlanSummary"  v-bind:class="{'active':currentState == 'actionPlanSummary' || currentState == 'actionPlanSummaryWp'}"  @click="jumpPage('outer_actionPlanSummary')">行动方案</div>
                <div title="视频监控" class="square-common s34 videoSurveillance"  v-bind:class="{'active':currentState == 'videoSurveillance'}"  @click="jumpPage('outer_videoSurveillance')">
                    <i v-if="currentState == 'videoSurveillance'" class="iconcomm commshipin1"></i>
                    <i v-if="currentState != 'videoSurveillance'" class="iconcomm commxianshipin-"></i>
                </div>
                <span class="animate-block1 animate-block-horizental"></span>
                <span class="animate-block2 animate-block-horizental"></span>
                <span class="animate-block3 animate-block-vertical"></span>
                <span class="animate-block4 animate-block-vertical"></span>
                <span class="animate-block5 animate-block-oblique"></span>
                <span class="animate-block6 animate-block-oblique"></span>
            </div>
            <div class="attached-funciton-con">
                <div class="flex-con">
                    <div @click="jumpPage('outer_contractManage')" v-if="isContract" class="attached-funciton"><span>合同管理</span></div>
                    <div @click="jumpPage('outer_runStatus')" v-if="hasRunstatusPage" class="attached-funciton"><span>状态调整</span></div>
                    <div @click="jumpPage('outer_dataQuery')" class="attached-funciton"><span>数据查询</span></div>
                    <div @click="jumpPage('outer_expertAnalysis')" class="attached-funciton"><span>专家分析</span></div>
                    <div @click="jumpPage('outer_dataExport')" class="attached-funciton"><span>数据导出</span></div>
                    <div @click="jumpPage('outer_workingConfigure')" v-if="hasAuthority" class="attached-funciton"><span>运行配置</span></div>
                    <div @click="jumpPage('outer_settlementAmount')" class="attached-funciton"><span>结算电量</span></div>
                </div>
            </div>
            <div class="fixed-circle-con">
                <div class="left-top" @click="jumpPage('outer_Monitoring')" >
                    <i style="position:relative;font-size:150px;color:rgba(78, 176, 222, 1);top: 110px;right: -96px;" class="iconcomm commditu"></i>
                </div>
                <div class="right-top" @click="jumpPage('outer_Resources')">
                    <i style="position:relative;font-size:130px;color:rgba(109, 110, 183, 1);top: 130px;left: 90px;" class="iconcomm commziyuanpingjia"></i>
                </div>
                <div class="left-bottom" @click="jumpPage('outer_Equipment')">
                    <i style="position:relative;font-size:120px;color:rgba(117, 121, 195, 1);bottom: -70px;right: -115px;" class="iconcomm commshebeixingneng"></i>
                </div>
                <div class="right-bottom" @click="jumpPage('outer_People')">
                    <i style="position:relative;font-size:140px;color:rgba(78, 176, 222, 1);bottom: -70px;left: 90px;" class="iconcomm commyunweiguanli"></i>
                </div>
                <i class="iconcomm commguanbi1 close_btn_slide" @click="ifShow = false"></i>
            </div>
            <div v-if="switchStClassDisplay" style="position:fixed;left:50%;top:0;width:0;height:54px;text-align: center;vertical-align: middle;">
                <div @click="stClass = '01'" v-bind:style="{'background': stClass === '01' ? 'rgba(48, 96, 141, 1)' : 'rgba(46, 96, 143, .5)'}" style="outline: 1px solid rgba(48, 96, 141, .3);cursor: pointer;position: absolute;left:-120px; top:0;width: 120px;height:54px;background:rgba(48, 96, 141, 0);line-height: 54px;">
                    <img v-if="stClass === '01'" style="width: 30px;" src="./photovoltaic.gif" alt="光伏">
                    <i v-if="stClass === '02'" style="font-size: 20px;color:#ffb400;" title="光伏" class="iconcomm commdianchiban-1"></i>
                    <span>光伏</span>
                </div>
                <div @click="stClass = '02'" v-bind:style="{'background': stClass === '02' ? 'rgba(48, 96, 141, 1)' : 'rgba(46, 96, 143, .5)'}" style="outline: 1px solid rgba(48, 96, 141, .3);cursor: pointer;position: absolute;right:-120px; top: 0;width: 120px;height:54px;background:rgba(48, 96, 141, 0);line-height: 54px;">
                    <i v-if="stClass === '01'" style="font-size: 30px;color:#1ef202;" title="风电" class="iconcomm commfengji-"></i>
                    <img v-if="stClass === '02'" style="width: 35px;vertical-align: top;" src="./fan.gif" alt="风机">
                    <span style="vertical-align: super;">风电</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {api＿checkModuleAuth} from '@comm/request/api'
import {api＿setSTClass, api＿getSTClassLIst, api＿getCurrentInfoNew, api＿getConctactManageAuth, api＿getBusinessManageAuth} from '@runStatus/request/api'
export default {
    name: 'pageSlideDown',
    data () {
        return {
            getConctactManageAuth: api＿getConctactManageAuth({
                later: true
            }),
            getBusinessManageAuth: api＿getBusinessManageAuth({
                later: true
            }),
            checkModuleAuth: api＿checkModuleAuth({
                later: true
            }),
            hasRunstatusPage: false,
            isContract: false,
            hasAuthority: false,
            ifShow: false,
            currentState: '',
            stClass: '',
            switchStClassDisplay: false,
            wpPages: [
                'outer_monitoringSummary',
                'outer_analyzeSummary',
                'outer_actionPlanSummary',
                'outer_expertAnalysis'
            ]
        }
    },
    methods: {
        showPage () {
            this.ifShow = true
        },
        jumpPage (page) {
            if (this.stClass === '02' && this.wpPages.includes(page)) {
                page += 'Wp'
            }
            if (this.$route.path === '/' + page) {
                this.ifShow = false
                return
            }
            if (this.currentSTinfo.currentSTClass !== this.stClass) {
                api＿setSTClass({data: {stClass: this.stClass}}).subscribe(res => {
                    this.$router.push({name: page})
                })
            } else {
                this.$router.push({name: page})
            }
        }
    },
    created () {
        this.$bus.on('toSlideDown', this.showPage)
        api＿getSTClassLIst().subscribe(res => {
            let data = res.data
            if (data && data.length === 1) {
                this.stClass = res.data[0].id
            } else if (data && data.length === 2) {
                this.switchStClassDisplay = true
            }
        })
        api＿getCurrentInfoNew().subscribe(res => {
            this.currentSTinfo = res
            this.stClass = res.currentSTClass || '01'
        })
        this.getConctactManageAuth.getData().then(res => {
            if (res.body && res.body.enable) {
                this.isContract = true
            } else {
                this.isContract = false
            }
        })
        this.getBusinessManageAuth.getData().then(res => {
            if (res.body && res.body.enable) {
                this.hasRunstatusPage = true
            } else {
                this.hasRunstatusPage = false
            }
        })
        // 运行配置权限
        this.checkModuleAuth.getData({codes: 631}).then(res => {
            if (res.body && res.body[631] && res.body[631].userStatus === '00') {
                this.hasAuthority = true
            } else {
                this.hasAuthority = false
            }
        })
    },
    mounted () {

    },
    beforeDestroy () {
        this.$bus.off('toSlideDown', this.showPage)
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
