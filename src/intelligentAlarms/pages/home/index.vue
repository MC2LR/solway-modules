<template>
    <div class="index">
        <header>
            <div class="heads">
                <p>
                    <i class="iconfont icondianzhanqiehuan_huaban1fuben14" @click="change"> </i> <span style="font-size:18px;color:#333333;font-weight:bold">{{$store.getters.station_name}}</span>
                </p>
                <p>
                    <span class="names">报警数量:</span>
                    <span class="val">
                        {{alarmCount}}
                    </span>
                </p>
                <p>
                    <span class="names">
                        报警设备数:
                    </span>
                    <span class="val">
                        {{deviceCount}}
                    </span>
                </p>
            </div>
            <section>
                <div class="timeOption">
                    <p class="timeSelect" @click="selectDate(index)" v-for="(item,index) in dateData" :key="index" :class="{bck:isData === index}">{{item}}</p>
                        <el-date-picker
                        v-if="custom"
                        class="pick"
                        v-model="value1"
                        @change="changDate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                </div>
                <div class="config">
                    <p class="p" @click="conEvent(2)">通知策略配置</p>
                    <p class="p" @click="conEvent(1)">报警规则配置</p>
                    <p class="p" @click="detail">查看报警详情</p>
                </div>
            </section>
        </header>
        <div class="content">
            <div class="pub">
                <machine ref="machines"></machine>
                <div class="line"></div>
            </div>
            <div class="pub">
                <statess ref="statessed"></statess>
            </div>
            <div class="pub">
                <alarm-class ref="alar"></alarm-class>
            </div>
            <div class="pub">
                <times ref="timess"></times>
            </div>
        </div>
        <alarm-config ref="alarms"></alarm-config>
        <alarm-detaile ref="detaile"></alarm-detaile>
        <add-config></add-config>
        <peralarm></peralarm>
        <info-config ref="infos"></info-config>
    </div>
</template>

<script>
import times from './component/times'
import statess from './component/staClass'
import alarmClass from './component/alarmClass'
import machine from './component/machineStatus'
import alarmConfig from './component/compo/alarmConfig'
import alarmDetaile from './component/compo/alarmDetaile'
import addConfig from './component/compo/addAlarmConfig'
import peralarm from './component/compo/perAlarmDetaile'
import infoConfig from './component/compo/infoConfig'
import {
  getCountByStation,
  getCountByTime,
  getCountByRuleName,
  getCountByDtype,
  getCountByAlarmLevel,
  getAlarmAndDeviceCount
} from '@intelligentAlarms/request/api'
export default {
  name: 'index',
  data () {
    return {
      isData: 0,
      value1: [],
      dayNum: 0,
      endDate: '',
      startDate: '',
      alarmCount: '',
      deviceCount: '',
      paramsl: {
        dayNum: 0
      },
      getAlarmAndDeviceCounted: getAlarmAndDeviceCount({ later: true, cacheParams: false }),
      getCountByTimed: getCountByTime({ later: true, cacheParams: false }),
      getCountBySta: getCountByStation({ later: true, cacheParams: false }),
      getCountByRuleNamed: getCountByRuleName({ later: true, cacheParams: false }),
      getCountByDtyped: getCountByDtype({ later: true, cacheParams: false }),
      getCountByAlarmLeveled: getCountByAlarmLevel({ later: true, cacheParams: false }),
      dateData: ['今日', '最近7天', '最近30天', '最近365天', '自定义'],
      custom: false
    }
  },
  created () {
    // 获取设备数量和设备数
    this.getAlarmAndDeviceCounted
      .getData({
        dayNum: this.dayNum
      })
      .then(res => {
        if (res.code === 200) {
          this.alarmCount = res.data.alarmCount
          this.deviceCount = res.data.deviceCount
        }
      })
  },
  mounted () {
        //   切换电站将该电站的信息显示上去，需要调接口请求信息
    this.$bus.$on('stationChange', val => {
      console.log(val)
      setTimeout(() => {
        this.allEvent()
      }, 0)
      if (val.busiType !== 1) {

      } else {

      }
    })
  },
  methods: {
    // 获取报警数量和报警设备数
    getAlarmAndDeviceNum () {
      this.getAlarmAndDeviceCounted
        .getData({
          ...this.paramsl
        })
        .then(res => {
          if (res.code === 200) {
            this.alarmCount = res.data.alarmCount
            this.deviceCount = res.data.deviceCount
          }
        })
    },
    allEvent () {
      this.getCountByStaEvent()
      this.initgetCountByTimed()
      this.initData()
      this.initgetCountByRuleNamed()
      this.getAlarmAndDeviceNum()
    },
    // 根据电站分类统计数量
    getCountByStaEvent () {
      this.getCountBySta
        .getData({
          ...this.paramsl
        })
        .then(res => {
          console.log(res)
          console.log('电站分类')

          if (res.code === 200) {
            this.$refs.statessed.getDataStaClass(res.data)
          }
        })
    },
    // 初始化time数据
    initgetCountByTimed () {
      this.getCountByTimed
        .getData({
          ...this.paramsl
        })
        .then(res => {
          console.log(res)
           console.log('时间')
          if (res.code === 200) {
            this.$refs.timess.getDataTime(res.data)
          }
        })
    },
    // 告警分类
    initgetCountByRuleNamed () {
      this.getCountByRuleNamed
        .getData({
          ...this.paramsl
        })
        .then(res => {
          console.log(res)
          console.log('告警分类')
          if (res.code === 200) {
            this.$refs.alar.getDataAlarm(res.data)
          }
        })
    },
    // 初始化报警类型及状态
    initData () {
      this.getCountByDtyped
        .getData({
          ...this.paramsl
        })
        .then(res => {
          console.log(res)
          console.log('状态1')
          if (res.code === 200) {
            this.$refs.machines.getDataMachined(res.data)
          }
        })
      this.getCountByAlarmLeveled.getData({ ...this.paramsl }).then(res => {
        console.log(res)
        console.log('状态')
        if (res.code === 200) {
          this.$refs.machines.getDataMachines(res.data)
        }
      })
    },
    // 显示切换电站pop
    change () {
      this.$switchStation()
    },
    // 选择时间
    changDate (val) {
      if (this.value1.length > 0) {
        this.paramsl.endDate = this.value1[1].Format('yyyy-MM-dd')
        this.paramsl.startDate = this.value1[0].Format('yyyy-MM-dd')
      }
      this.allEvent()
    },
    // 配置事件
    conEvent (val) {
      if (val === 1) {
        this.$refs.alarms.open()
      } else {
        this.$refs.infos.opens()
      }
    },
    // 显示详情页面
    detail () {
      this.$refs.detaile.open()
    },
    // 选择时间
    selectDate (index) {
      this.isData = index
      index === 4 ? (this.custom = true) : (this.custom = false)
      switch (index) {
        case 0:
          this.paramsl.dayNum = 0
          if (
            typeof this.paramsl.endDate !== 'undefined' &&
            typeof this.paramsl.startDate !== 'undefined'
          ) {
            delete this.paramsl.endDate
            delete this.paramsl.startDate
          }
          this.allEvent()

          break
        case 1:
          this.paramsl.dayNum = 7
          if (
            typeof this.paramsl.endDate !== 'undefined' &&
            typeof this.paramsl.startDate !== 'undefined'
          ) {
            delete this.paramsl.endDate
            delete this.paramsl.startDate
          }
          this.allEvent()

          break
        case 2:
          this.paramsl.dayNum = 30
          if (
            typeof this.paramsl.endDate !== 'undefined' &&
            typeof this.paramsl.startDate !== 'undefined'
          ) {
            delete this.paramsl.endDate
            delete this.paramsl.startDate
          }
          this.allEvent()

          break
        case 3:
          this.paramsl.dayNum = 365
          if (
            typeof this.paramsl.endDate !== 'undefined' &&
            typeof this.paramsl.startDate !== 'undefined'
          ) {
            delete this.paramsl.endDate
            delete this.paramsl.startDate
          }
          this.allEvent()
          break
        case 4:
          delete this.paramsl.dayNum
          this.paramsl.endDate = ''
          this.paramsl.startDate = ''
          this.value1 = []
          break
      }
    }
  },
  destroyed () {
  this.$bus.$off('stationChange', () => {

  })
},
  components: {
    times,
    statess,
    alarmClass,
    machine,
    alarmConfig,
    alarmDetaile,
    addConfig,
    peralarm,
    infoConfig
  }
}
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100vh;
  overflow: auto;
  background: #edeff9;
  header {
    width: 100%;
    height: 95px;
    overflow: hidden;
    .heads {
      width: 100%;
      height: 45%;
      overflow: hidden;
      display: flex;
      align-items: center;
      p {
        width: 150px;
        height: 20px;
        line-height: 20px;
        // text-align: center;
        margin-left: 9px;
        overflow: hidden;
        .icondianzhanqiehuan_huaban1fuben14 {
          cursor: pointer;
        }
        .names {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(96, 99, 105, 1);
        }
        .val {
          color: #2fbfcc;
        }
      }
    }
    section {
      width: 99%;
      margin: 0 auto;
      height: 55%;
      overflow: hidden;
      .timeOption {
        width: 65%;
        height: 40px;
        float: left;
        .pick {
          width: 30%;
          height: 30px;
          float: left;
        }
        >>> .el-range-separator {
          height: auto;
          width: 30px;
        }
        >>> .el-date-editor .el-range__icon {
          line-height: 24px;
        }

        .timeSelect {
          width: 80px;
          height: 30px;
          float: left;
          font-size: 14px;
          text-align: center;
          line-height: 30px;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          margin-right: 20px;
          cursor: pointer;
        }
        .timeSelect:nth-child(1) {
          width: 60px;
        }
        .timeSelect:nth-child(5) {
          width: 60px;
        }
        .bck {
          background: #2fbfcc;
          color: #d8f3f6;
        }
      }
      .config {
        width: 35%;
        height: 40px;
        overflow: hidden;
        float: right;
        .bck {
          background: #2fbfcc;
          color: #d8f3f6;
        }
        .p {
          width: 110px;
          height: 30px;
          float: right;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          text-align: center;
          line-height: 30px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          cursor: pointer;
        }
        .p:nth-child(2) {
          margin-right: 20px;
          margin-left: 60px;
        }
      }
    }
  }
  .content {
    width: 100%;
    height: calc(100vh - 95px);
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .pub {
      width: 49%;
      height: 48%;
      overflow: auto;
      background: #ffffff;
      position: relative;
      .line {
        position: absolute;
        left: 47%;
        width: 3px;
        top: 15%;
        height: 50%;
        border-right: 1px dotted rgba(234, 234, 234, 1);
      }
    }
  }
}
</style>
