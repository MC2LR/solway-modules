<template>
    <div class="index">
        <div class="headers">
               <div>
                <p>
                    <i class="iconfont iconzhedie" @click="change"> </i>
                     <span style="font-size:18px;color:#333333;font-weight:bold">{{$store.getters.station_name}}</span>
                </p>
                <p>
                    <span class="names">发布任务数量:</span>
                    <span class="val">
                        {{pubTaskNum}}
                    </span>
                </p>
                <p>
                    <span class="names">
                        平均任务时间(h):
                    </span>
                    <span class="val">
                        {{avgTime}}
                    </span>
                </p>
            </div>
        </div>
        <div class="warper">
            <div>
                <p v-for="(item,index) in days" :key="index" :class="{bckSty:index === bck}" @click="navs(index)">{{item}}</p>
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
            <section>
                <el-select v-model="value" placeholder="请选择" style="width:97px"  size="medium" class="ss" @change="select">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <p v-for="(item,index) in type" :key="index" @click="typeEven(index)" :class="{bckSty:typ === index}">{{item}}</p>
            </section>
        </div>
        <div class="dataWrapper">

            <div><task class="pub"  ref="tasks"></task>
            <div class="line"></div>
            </div>
            <div><stasta class="pub"  ref="stastas"></stasta></div>
            <div><person class="pub"  ref="persons"></person></div>
            <div><taskInfo class="pub" @reset="reset" @chilEvent="getChilData" @pageChange="pageEvent"  ref="taskInfo"></taskInfo></div>
        </div>
    </div>
</template>

<script>
import task from './components/task'
import person from './components/person'
import stasta from './components/stasta'
import taskInfo from './components/taskInfo'
import {
    api＿apiAuthGetTaskTime,
    api＿apiAuthGettaskLists,
    api＿apiAuthgetTaskHourByStId,
    api＿apiAuthgetTaskHourByPe,
    api＿apiAuthtaskDetail,
    api＿apiAuthgetTasknum
} from '@MochaITOM/request/api'
export default {
  name: 'index',
  data () {
    return {
      days: ['今日', '最近7天', '最近30天', '最近365天', '自定义'],
      type: ['共享运维', '专业运维', '全部'],
      bck: 0, // dayNum
      typ: 2, // type
      custom: false,
      avgTime: '',
      pubTaskNum: '',
      taskListParams: {
        bizType: '',
        mode: '',
        type: '',
        content: '',
        dayNum: '0',
        pageNO: 1,
        endDate: null,
        startDate: null
      },
      value: '全部任务', // taskType
      getTaskTime: api＿apiAuthGetTaskTime({
        later: true
      }), // 获取任务时间
      getTaskList: api＿apiAuthGettaskLists({
        later: true
      }), // 获取任务列表
      getTaskHourByPe: api＿apiAuthgetTaskHourByPe({
        later: true
      }), // 获取人员统计工时
      getTaskHourByStId: api＿apiAuthgetTaskHourByStId({
        later: true
      }), // 获取电站统计工时
      getTaskDetail: api＿apiAuthtaskDetail({
        later: true
      }), // 获取任务详情
      getTaskNum: api＿apiAuthgetTasknum({
        later: true
      }), // 获取任务个数
      value1: [],
      options: [
          {
              value: '全部任务',
              lable: '全部任务'
          },
           {
              value: '通用任务',
              lable: '通用任务'
          },
           {
              value: '检修任务',
              lable: '检修任务'
          },
           {
              value: '清洗任务',
              lable: '清洗任务'
          },
           {
              value: '抄表任务',
              lable: '抄表任务'
          }
      ]
    }
  },
  created () {
    this.getTasklist()
  },
  methods: {
         // 显示切换电站pop
      change () {
          this.$switchStation()
      },
    reset () {
      this.taskListParams.bizType = ''
      this.getTasklist()
    },
    // 总调用
    allEvent () {
          this.getTasklist()
          this.getTaskTimes()
          this.getTaskHourByPerson()
          this.getTaskHourBystid()
          this.getTaskNums()
    },
    // 获取任务个数
    getTaskNums () {
        this.getTaskNum.getData({
                  mode: this.taskListParams.mode,
               type: this.taskListParams.type,
                dayNum: this.taskListParams.dayNum,
              endDate: this.taskListParams.endDate,
              startDate: this.taskListParams.startDate}
        ).then((res) => {
            if (res.code === 200) {
              this.$refs.tasks.getDataByparent(res.data)
              this.pubTaskNum = res.data.totalCount
            }
        })
    },
    // 分页
    pageEvent (val) {
        this.pageNO = val
        this.getTasklist()
    },
    // 对任务列表的搜索天数进行赋值
    getChilData (val) {
      switch (val.name) {
        case '搜索框':
           this.taskListParams.content = ''
           this.taskListParams.content = val.value
          break
        case 'bizType':
          if (val.value === '进行中') {
             this.taskListParams.bizType = '01'
          } else if (val.value === '已完成') {
             this.taskListParams.bizType = '02'
          } else {
             this.taskListParams.bizType = ''
          }
          break
      }
            this.taskListParams.content = ''
            this.pageNO = 1
           this.getTasklist()
    },
    // 获取人员统计工时
    getTaskHourByPerson () {
        this.getTaskHourByPe.getData({
                mode: this.taskListParams.mode,
                type: this.taskListParams.type,
                dayNum: this.taskListParams.dayNum,
              endDate: this.taskListParams.endDate,
              startDate: this.taskListParams.startDate
        }).then((res) => {
          if (res.code === 200) { this.$refs.persons.getPersonData(res.data) }
        })
    },
    // 获取电站统计工时
    getTaskHourBystid () {
        this.getTaskHourByStId.getData({
               mode: this.taskListParams.mode,
                type: this.taskListParams.type,
                dayNum: this.taskListParams.dayNum,
              endDate: this.taskListParams.endDate,
              startDate: this.taskListParams.startDate
        }).then((res) => {
            if (res.code === 200) { this.$refs.stastas.getStaData(res.data) }
        })
    },
    // 获取任务时间
    getTaskTimes () {
             this.getTaskTime.getData({
                mode: this.taskListParams.mode,
                type: this.taskListParams.type,
                dayNum: this.taskListParams.dayNum,
              endDate: this.taskListParams.endDate,
              startDate: this.taskListParams.startDate
      }).then((res) => {
          if (res.code === 200) {
              this.$refs.tasks.getTaskData(res.data)
              this.avgTime = res.data.taskHour
          }
      })
    },
    // 获取任务列表（右下角任务列表）
    getTasklist () {
       this.getTaskList.getData({
        bizType: this.taskListParams.bizType,
        mode: this.taskListParams.mode,
        type: this.taskListParams.type,
        content: this.taskListParams.content,
        dayNum: this.taskListParams.dayNum,
        endDate: this.taskListParams.endDate,
        startDate: this.taskListParams.startDate,
        pageNo: this.pageNO,
        pageSize: 10
      }).then((res) => {
          if (res.code === 200) { this.$refs.taskInfo.getTaskData(res.data) }
      })
    },
    // 选择时间
    changDate (val) {
      if (this.custom) {
        if (this.value1.length > 0) {
          this.endDate = this.value1[1].Format('yyyy-MM-dd')
          this.startDate = this.value1[0].Format('yyyy-MM-dd')
        }
      }
      this.allEvent()
    },
    // 天数判断
    navs (index) {
      this.bck = index
      index === 4 ? this.custom = true : this.custom = false
      switch (index) {
          case 0:
            this.taskListParams.dayNum = '0'
            break
          case 1:
               this.taskListParams.dayNum = '7'
            break
          case 2:
               this.taskListParams.dayNum = '30'
            break
          case 3:
            this.taskListParams.dayNum = '365'
            break
      }
            this.pageNO = 1
          this.taskListParams.content = ''
          if (!this.custom) {
              this.value1 = ''
          }
          this.allEvent()
    },
    // 任务类型判断
    typeEven (index) {
      this.typ = index
      if (this.type[index] === '专业运维') {
         this.taskListParams.mode = '02'
      } else if (this.type[index] === '共享运维') {
         this.taskListParams.mode = '01'
      } else {
         this.taskListParams.mode = ''
      }
      this.pageNO = 1
      this.taskListParams.content = ''
      this.allEvent()
    },
    select (val) {
        switch (val) {
          case '全部任务':
         this.taskListParams.type = ''

            break
              case '通用任务':
         this.taskListParams.type = '01'

            break
              case '检修任务':
         this.taskListParams.type = '02'

            break
              case '清洗任务':
         this.taskListParams.type = '03'

            break
              case '抄表任务':
         this.taskListParams.type = '04'

            break
        }
        this.pageNO = 1
       this.taskListParams.content = ''
       this.allEvent()
    }
  },
  mounted () {
      this.$bus.$on('stationChange', val => {
      console.log('切换电站了')
      setTimeout(() => {
        this.allEvent()
      }, 0)
    })
      this.$bus.on('tabls', (val) => {
        this.$refs.taskInfo.filt = true
        this.getTasklist()
    })
    this.$bus.on('getTaskTime', (val) => {
        this.avgTime = val
    })
    this.$bus.on('getTask', (val) => {
        this.pubTaskNum = val
    })
  },
    destroyed () {
    this.$bus.$off('stationChange', () => {

    })
    this.$bus.off('tabls')
},
  components: {
    task,
    person,
    stasta,
    taskInfo
  }
}
</script>
<style lang = "scss" scoped>
.index {
  width: 100%;
  height: 100vh;
  overflow: auto;
  color: #666666;
  background: #EDEFF9;
  border-left:1px solid #797979;
  .headers{
    width: 99%;
    height: 5%;
    margin: 0 auto;

         div{
                width: 100%;
                height:100%;
                overflow: hidden;
                display: flex;
                margin-top: 10px;
                align-items: center;
                p{
                    width: 150px;
                    height: 20px;
                    line-height: 20px;
                    text-indent: 15px;
                    overflow: hidden;
                    .names{
                        font-size: 14px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(96,99,105,1);
                    }
                    .val{
                        color: #2FBFCC;
                    }
                }
            }
  }
  .warper {
    width: 97%;
    margin: 0 auto;
    height: 7%;
    overflow: hidden;
    margin-bottom: 8px;
    >>> .el-range-input{
      margin-left: 10px;
    }
    >>> .el-input__icon{
      height:36px;
    }
    div {
      width:65%;
      height: 100%;
      float: left;
      overflow: hidden;
      /* padding-left: 10px; */
      display: flex;
      p {
       background: white;
       width: 80px;
       height: 30px;
       line-height: 30px;
        /* float: left; */
        border-radius: 4px;
        margin-right: 21px;
        text-align: center;
        margin-top: 10px;
        cursor: pointer;
        font-size: 14px;
      }
      p:nth-child(1){
        width: 60px;
        margin-left: 5px;
      }
     p:nth-child(5){
        width: 60px;
      }
    .pick{
        width: 246px;
        height: 30px;
        margin-top:10px;
        >>> .el-range-separator{
          line-height: 23px;
        }
    }
    }
    section {
      width: 35%;
      height: 100%;
      overflow: hidden;
      float: right;
          >>> .el-input__icon{
      height: 37px;
    }
      p {
        float: right;
        text-align: center;
        background: white;
        margin-top: 10px;
        cursor: pointer;
        /* padding: 10px 15px 10px 15px; */
        width: 80px;
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        border: 1px solid #33CCFF;
      }
      p:nth-child(3){
          border-right: 0;
          border-left: 0;
      }
      p:nth-child(4){
          border-radius: 4px 0 0 4px;
          /* border-right: 0; */
      }
        p:nth-child(2){
          border-radius: 0 4px 4px 0;
          /* border-right: 0; */
      }
      .ss{
        margin-top: 10px;
        margin-left: 28px;
        width: 30%;
        font-size: 12px;
        float: right;
        >>> .el-input__inner{
          font-size: 12px;
          height: 30px;
        }
        >>> .el-input__icon{
          height: 30px;
          line-height: 30px;
        }
      }
    }
    .bckSty {
      background: #2FBFCC;
      color: #fff;
    }
  }
  .dataWrapper {
    width: 99%;
    height: 85%;
    /* margin-left: 15px; */
    /* background: red; */
    padding-left:15px ;
      overflow: hidden;
      margin: 0 auto;
    div {
      width: 50%;
      height: 50%;
      overflow: hidden;
      position: relative;
      /* margin-left:20px; */
      float: left;
      .pub {
          width: 98%;
          height: 96%;
          margin: 0;
          overflow: hidden;
      }
      .line{
                    position: absolute;
                    left: 49%;
                    width: 3px;
                    top: 15%;
                    height: 50%;
                    border-right: 1px dotted rgba(234,234,234,1);
                }
    }
  }
}
</style>
