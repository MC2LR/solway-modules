<template>
    <div class="info-map-mochal">
       <p class="module-name">地图信息</p>
       <!-- 地图顶部的信息部分 -->
       <div class="info_header">
           <div class="personALL">&nbsp;&nbsp;&nbsp; <span class="ss" v-for="(item,index) in personInfos" :key="index">{{item.name}}  <i style="font-size:18px;color:#58E7FF">{{item.num}}</i></span>
           <div class="line"></div>
           </div>
           <div class="machiceState">
               <div class="mac" v-for="(item,index) in machineInfos" :key="index">
                   <p>{{item.name}}</p>
                   <p :style="{color:item.color}">{{item.num}}</p>
               </div>
           </div>
       </div>
       <!-- 地图部分 -->
          <div class="maps" style="width:99.2%;height:95%" id="containers"></div>
      </div>
</template>

<script>
import {
  api＿apiAuthPowerstationinit,
  api＿apiAuthOperationWorkNum,
  api＿apiAuthRunState,
  api＿apiAuthMapData,
  api＿apiAuthPersonList,
  api＿apiAuthtaskDetail,
  api＿apiAuthcomment,
  api＿apiAuthGetAtperson,
  api＿apiAuthRunStateWind
} from '@MochaITOM/request/api'
import { Dialog, Tabs } from 'element-ui'
// import { Message } from 'element-ui'
import {Maps, CreatDom} from './mapIcan'
export default {
  data () {
    return {
      flag: false,
      indexDom: 0,
      firstPlayFlag: true,
      maps: null,
      PowerType: 0,
      atData: [],
      showName: 'pub',
      visible: false,
      atVlaue: [],
      innerVisible: false,
      tabPosition: 'left',
      textArea: '',
      type: '',
      input3: '',
      toName: '',
      taskPoint: [],
      intertiome: null,
      lngs: [],
      lats: [],
      temAtData: [],
      taskProccess: [],
      personInfos: [
        {
          name: '运维人员',
          num: 0
        },
        {
          name: '已派工',
          num: 0
        },
        {
          name: '未派工',
          num: 0
        }
      ],
      machineInfos: [
        {
          name: '运行',
          num: 0,
          color: '#2979EF'
        },
        {
          name: '待机',
          num: 0,
          color: '#54CCC3'
        },
        {
          name: '故障',
          num: 0,
          color: '#FA2636'
        },
        {
          name: '报警',
          num: 0,
          color: '#F8B62D'
        },
        {
          name: '离线',
          num: 0,
          color: '#CFD7E6'
        }
      ],
      commit: [],
      //   定义地图坐标已经小图标的坐标
      mapDatas: {
        mapPoint: { x: Number, y: Number },
        icanDatas: []
      },
      //   初始化地图
      initPowerInfo: api＿apiAuthPowerstationinit({
        later: true,
        sameTimeOnce: true
      }),
      getRunStateWinds: api＿apiAuthRunStateWind({
        later: true
      }),
      // 获取派工信息
      getOperationCount: api＿apiAuthOperationWorkNum({
        later: true,
        sameTimeOnce: true
      }),
      initRunState: api＿apiAuthRunState({
        later: true
      }), // 获取运行状态
      getMapData: api＿apiAuthMapData({
        later: true
      }), // 获取电站具体信息（逆变器等）
      perList: api＿apiAuthPersonList({
        later: true
      }), // 获取任务人员列表
      getTaskDetail: api＿apiAuthtaskDetail({
        later: true
      }), // 获取任务详情
      setComment: api＿apiAuthcomment({
        later: true
      }), // 添加评论
      getAtPer: api＿apiAuthGetAtperson({
        later: true
      }) // 获取at人员信息
    }
  },
  updated () {
      if (document.getElementById('messag') !== null) {
          let ele = document.getElementById('messag')
          ele.scrollTop = ele.scrollHeight
      }
    },
  methods: {
    // 创建地图以及地图上的小图标
    showMap () {
      Maps(this)
    },
    // 获取任务详情
    getTask (val) {
      this.$bus.emit('detaile', val)
    },
    sort (arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
          if (arr[j] > arr[j + 1]) {
            let t = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = t
          }
        }
      }
      return arr
    },
    // 初始化电站信息
    initPowerInfos () {
      // let _this = this
      this.initPowerInfo.getData().then(res => {
        if (res.code === 200 && res.data !== null) {
          this.mapDatas.icanDatas = res.data.filter((item, index, arr) => {
            if (item.stid !== 0) {
                item.ican = 'iconfont icondianzhan'
              return item
            }
          })
          this.gettaskPerson()
        }
      })
    },
    // 获取任务和人员信息
    gettaskPerson () {
      this.perList.getData().then(res => {
        console.log(res)
        if (res.code === 200 && res.data !== null) {
          let temD = res.data // 任务及人员
          let task = []
          if (temD.length > 0) {
            temD.forEach(item => {
                 item.ican = 'iconfont icongongren2'
              if (item.latitude !== null && item.longitude !== null) {
                this.mapDatas.icanDatas.push(item)
              }
                if (item.dispatchTaskVoList.length > 0) {
                   item.dispatchTaskVoList.forEach(items => {
              switch (items.taskStatus) {
                case '00':
                  items.taskican = 'iconfont iconweichulidingdan' // 未处理
                  items.task_run_name = '已发布'
                  break
                case '01':
                  items.taskican = 'iconfont iconrenwu1' // 待处理
                  items.task_run_name = '任务待启动'

                  break
                case '02':
                  items.taskican = 'iconfont iconjinhangzhong' // 进行中
                  items.task_run_name = '任务在途中'

                  break
                case '03':
                  items.taskican = 'iconfont iconrenwuliebiao_zhijian' // 已完成
                  items.task_run_name = '处理完成'
                  break
                   case '04':
                  items.taskican = 'iconfont iconrenwuliebiao_zhijian'
                  items.task_run_name = '任务现场处理中'
                  break
              }
                 task.push({
                          longitude: items.taskLongitude,
                          latitude: items.taskLatitude,
                          run_status: items.taskStatus,
                          ican: items.taskican,
                          name: items.task_run_name,
                          id: items.mainTaskId,
                          distance: items.distance + ''
                        })
                     })
                 }
            })

            this.mapDatas.icanDatas = this.mapDatas.icanDatas.concat(task)
          }
          // 判断中心位置和缩放级别的变量
          let temLng = [] // 储存经度
          let tenLat = [] // 储存维度
          if (this.mapDatas.icanDatas.length > 0) {
            this.mapDatas.icanDatas.forEach(item => {
              if (item.latitude !== null && item.longitude !== null) {
                temLng.push(item.longitude)
                tenLat.push(item.latitude)
              }
            })
            if (temLng.length > 0) {
              temLng = temLng.filter((items) => {
                   if (items !== 'undefined') {
                     return items
                   }
               })
            }
             if (tenLat.length > 0) {
               tenLat = tenLat.filter(item => {
                   if (item !== 'undefined') {
                     return parseFloat(item)
                   }
               })
            }
            tenLat = tenLat.map(Number)
            temLng = temLng.map(Number)
            let lng =
              (this.sort(temLng)[this.sort(temLng).length - 1] +
              this.sort(temLng)[0]) /
              2
            let lat =
              (this.sort(tenLat)[this.sort(tenLat).length - 1] +
                this.sort(tenLat)[0]) /
              2
              // 设置显示中心位置
            this.mapDatas.mapPoint.x = lng
            this.mapDatas.mapPoint.y = lat

            //  设置缩放级别
            this.lngs = this.sort(temLng)
            this.lats = this.sort(tenLat)
          }
          if (this.firstPlayFlag) {
              this.showMap()
              this.firstPlayFlag = false
          } else {
              CreatDom(this.maps, this)
          }
        } else {
              //  this.mapDatas.mapPoint.x = 116.20
              //  this.mapDatas.mapPoint.y = 39.56
                  let temLng = [] // 储存经度
          let tenLat = [] // 储存维度
                      if (this.mapDatas.icanDatas.length > 0) {
            this.mapDatas.icanDatas.forEach(item => {
              if (item.latitude !== null && item.longitude !== null) {
                temLng.push(item.longitude)
                tenLat.push(item.latitude)
              }
            })
            if (temLng.length > 0) {
              temLng = temLng.filter((items) => {
                   if (items !== 'undefined') {
                     return items
                   }
               })
            }
             if (tenLat.length > 0) {
               tenLat = tenLat.filter(item => {
                   if (item !== 'undefined') {
                     return parseFloat(item)
                   }
               })
            }
            tenLat = tenLat.map(Number)
            temLng = temLng.map(Number)
            let lng =
              (this.sort(temLng)[this.sort(temLng).length - 1] +
              this.sort(temLng)[0]) /
              2
            let lat =
              (this.sort(tenLat)[this.sort(tenLat).length - 1] +
                this.sort(tenLat)[0]) /
              2
              // 设置显示中心位置
            this.mapDatas.mapPoint.x = lng
            this.mapDatas.mapPoint.y = lat

            //  设置缩放级别
            this.lngs = this.sort(temLng)
            this.lats = this.sort(tenLat)
          }
               if (this.firstPlayFlag) {
              this.showMap()
              this.firstPlayFlag = false
          } else {
              CreatDom(this.maps, this)
          }
        }
      })
    },

    // 获取设备
    getEquipment (val) {
      this.getMapData
        .getData({
          stcls: val.stClass
        })
        .then(res => {
          console.log(res)

          if (res.code === 200 && res.data !== null) {
            this.mapDatas.icanDatas = []
            if (res.data.length > 0) {
              this.mapDatas.icanDatas = res.data.filter((item, index, arr) => {
                if (item.latitude !== null && item.longitude !== null) {
                  //   定义逆变器和风机图标
                  if (val.stClass === '01') {
                    item.ican = 'iconfont icon3-01guangfufangzhen'
                  } else if (val.stClass === '02') {
                    item.ican = 'iconfont iconfengji20190403-02'
                  }
                  return item
                }
              })
            }
            this.gettaskPerson()
          }
        })
    },
    // 初始化运维工人数量<=
    initOperationNum () {
      this.getOperationCount.getData().then(res => {
        if (res.code === 200) {
          this.personInfos[0].num = res.data.totalCount
          this.personInfos[1].num = res.data.haveDispatch
          this.personInfos[2].num = res.data.noDispatch
        }
      })
    },
    // 获取运行状态时数据=>
    getRunState () {
      this.initRunState.getData().then(res => {
        if (res.code === 200) {
          if (this.machineInfos.length > 0) {
            this.machineInfos[0].num = res.data.invRunCount
            this.machineInfos[1].num = res.data.invStandbyCount
            this.machineInfos[2].num = res.data.invFaultCount
            this.machineInfos[3].num = res.data.invAlarmCount
            this.machineInfos[4].num = res.data.invBreakOffCount
          }
        }
      })
    },
    // 获取运行状态(风电)
    getsRunStateWind () {
         this.getRunStateWinds.getData().then((res) => {
            if (res.code === 200) {
               if (this.machineInfos.length > 0) {
              this.machineInfos[0].num = res.data.wtRunCount
              this.machineInfos[1].num = res.data.wtStandbyCount
              this.machineInfos[2].num = res.data.wtFaultCount
              this.machineInfos[3].num = res.data.wtAlarmCount
              this.machineInfos[4].num = res.data.wtBreakOffCount
          }
            }
         })
    },
    // 电站切换
    changePowerStation (e) {
      let params = {}
      params.busiType = 1
      params.stClass = e.target.data.stationClass
      params.treeId = 'S' + e.target.data.stid
      // 切换电站接口
      this.$store.dispatch('station/changeStation', params).then(res => {
        if (res.code === 200) {
          this.PowerType = 1
        }
      })
    }
  },
  mounted () {
    // 判断进入页面是公司级还是电站级
    if (this.$store.getters.station_type === 1) {
        this.PowerType = 1
        let staCla = {stClass: ''}
        staCla.stClass = this.$store.getters.station_class
        setTimeout(() => {
          this.getEquipment(staCla)
        }, 0)
    } else {
      setTimeout(() => {
        this.initPowerInfos() // 初始化电站信息
      }, 0)
    }
    //   实时更新
       this.intertiome = setInterval(() => {
        if (this.$store.getters.station_type === 1) {
           this.PowerType = 1
          let staCla = {stClass: ''}
          staCla.stClass = this.$store.getters.station_class
          this.getEquipment(staCla)
          } else {
            this.initPowerInfos() // 初始化电站信息
          }
                  // 01是光伏  02风电
            if (this.$store.getters.station_class === '01') {
                this.getRunState() // 获取光伏状态数
            } else if (this.$store.getters.station_class === '02') {
                  this.getsRunStateWind() // 获取风机转态数
            }
          }, 60000)
    //   切换电站将该电站的信息显示上去，需要调接口请求信息
    this.$bus.$on('stationChange', val => {
      console.log(this.$store.getters.station_class)
      if (val.busiType !== 1) {
        this.firstPlayFlag = true
        this.PowerType = 0
        this.initPowerInfos() // 获取全部电站接口
      } else {
        this.PowerType = 1
        this.firstPlayFlag = true
        this.getEquipment(val)
      }
     if (this.$store.getters.station_class === '01') {
         this.getRunState() // 获取光伏状态数
     } else if (this.$store.getters.station_class === '02') {
          this.getsRunStateWind() // 获取风机转态数
     }
    })
  },
  created () {
      // 01是光伏  02风电
    if (this.$store.getters.station_class === '01') {
         this.getRunState() // 获取光伏状态数
    } else if (this.$store.getters.station_class === '02') {
          this.getsRunStateWind() // 获取风机转态数
    }
    // this.initPowerInfos() // 初始化电站信息
    this.initOperationNum() // 初始化运维工人数量
  },
  components: {
    ElDialog: Dialog,
    ElTabs: Tabs
  },
  destroyed () {
    this.$bus.$off('stationChange', () => {

    })
    clearInterval(this.intertiome)
  }
}
</script>

<style lang="scss">
.iconrenwu1,
.iconweichulidingdan,
.iconrenwuliebiao_zhijian,
.iconjinhangzhong {
  font-size: 30px;
  color: #12d997;
}
.icondianzhan,
.iconjinhangzhong,
.icon3-01guangfufangzhen,
.iconrenwuliebiao_zhijian,
.icondianzhan,
.iconfengji20190403-02,
.icon3-01guangfufangzhen
 {
    // color: yellow;
  font-size: 30px;
}

.icongongren2 {
  //   color: #EFB00C;
  color: #12d997;
  font-size: 30px;
}
.anchorBL {
display: none;
}
.el-select-dropdown__item:hover{
  background:#ECF8FF;
}
 .BMap_noprint .anchorTR{
   top: 20px;
 }
</style>

<style lang="scss" scoped>
.info-map-mochal {
  width: 100%;
  height: 100%;

  position: relative;
  &.v-fullpage{
    background: #041e5a;
    .module-name{
        display: inline-block;
        padding: 20px;
    }
  }
  .info_header {
    width: 100%;
    height: 9%;
    display: flex;
    background-image: linear-gradient(to bottom , rgba(10,36,88,1),rgba(10,36,88,0.7));;
    position: absolute;
    z-index: 9;
    align-items: center;
    line-height: 58px;
    .line {
      width: 1px;
      height: 34px;
      background: linear-gradient(
        0deg,
        rgba(88, 231, 255, 0) 0%,
        rgba(88, 231, 255, 1) 25%,
        rgba(88, 231, 255, 0.95) 71%,
        rgba(88, 231, 255, 0) 100%
      );
      opacity: 0.8;
    }
    .personALL {
      width: 49.3%;
      height: 100%;
      display: flex;
      font-size:16px;
      color:#B1CCF4;
      align-items: center;
      .ss {
        width: 30%;
        height: 58px;
      }
    }
    .machiceState {
      display: flex;
      align-items: center;
      color:#B1CCF4;
      font-size: 14px;
      width: 49.3%;
      height: 58px;
      .mac {
        width: 20%;
        p {
          height: 23px;
          line-height: 25px;
          text-align: center;
        }
      }
    }
  }
  .maps {
    margin: 0 auto;
    padding-bottom: 10px;
    // border: 2px solid red;
  }
  >>> .anchorBL {
    display: none;
  }
  >>>  .BMap_noprint{
    top:65px !important;
  }

}
</style>
