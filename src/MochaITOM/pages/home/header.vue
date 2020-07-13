<template>
    <div class="header-mocha">
        运维管理系统
        <div class="word-contain clearfix">
            <div @click="switchStation" class="pull-left"><i class="iconfont iconzhedie"></i><span style="margin-left:1em;font-size:14px;cursor:pointer;">{{$store.getters.station_name}}</span></div>
            <div class="pull-right header-right">
                <div v-if="date" style="display:inline">
                <span>{{(new Date().Format('yyyy-MM-dd')).split('-').join('/')}}</span>
                <span>星期{{"日一二三四五六".charAt(new Date().getDay())}}</span>
                </div>
                <span v-if="weather">
                <el-divider direction="vertical"></el-divider>
                <span>
                    <i class="iconfont iconqingtian"></i>
                    <span>晴</span>
                    <span>0~16</span>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span>
                    <i class="iconfont iconkongqi"></i>
                    <span>优</span>
                </span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
// import {api＿stationMonitorWeather} from '@/request/api'
// import {requestFullScreen, exitFull, isFullscreen} from '@comm/tools'
import {Divider} from 'element-ui'
import {widthHeight} from '@comm/mixin'
export default {
    mixins: [widthHeight],
    data () {
        return {
            date: true,
            weather: false
            // custWelcMsgCurr: api＿custWelcMsgCurr({
            //     res: {
            //         data: []
            //     }
            // })
        }
    },
    created () {

    },
    computed: {
        // currentRoleData () {
        //     return this.$store.state.user.rolelist.find(v => v.roleId === this.$store.getters.current_role)
        // },
        // isFull () {
        //     return this.vh === window.screen.height
        // }
    },
    mounted () {
    this.$bus.$on('stationChange', val => {
      if (val.treeId[0] === 'T') {
        this.date = true
        // this.weather = false
      } else {
        this.date = true
        // this.weather = true
      }
    })
    },
    methods: {
        switchStation () {
            this.$switchStation()
        }
        // toggleFullscreen () {
        //     (this.isFull || isFullscreen()) ? exitFull() : requestFullScreen()
        // }
    },
    components: {
        ElDivider: Divider
    },
    destroyed () {
    this.$bus.$off('stationChange', () => {
    })
  }
}
</script>

<style lang="scss">
.header-mocha{
    .el-divider {
        background-color: rgba(196, 200, 227, 0.5);
    }
}
</style>
<style lang="scss" scoped>
.header-mocha {
    height:60px;
    line-height: 48px;
    background:url('./images/header-bg.png') no-repeat;
    background-size:101% 100%;
    background-position: 51% 0;
    font-size: 26px;
    text-align: center;
    color: #fff;
    position: relative;
    .word-contain{
        line-height: 28px;
        position: absolute;
        width: 100%;
        padding: 0 23px;
        top: 0;
        font-size:14px;
        .iconzhedie{
            font-size:17px;
            cursor: pointer;
        }
    }
}
</style>
