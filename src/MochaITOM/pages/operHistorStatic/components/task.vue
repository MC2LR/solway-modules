<template>
    <div class="task">
         <div class="hea">
           <div class="title"></div>

         </div>
        <div ref="pie" class="pie1"></div>
    </div>
</template>

<script>
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import echarts from 'echarts'
import {
    api＿apiAuthGetTaskTime,
    api＿apiAuthgetTasknum
} from '@MochaITOM/request/api'
export default {
  name: 'task',
  data () {
    return {
      myChart: null,
      pieData: [],
      taskPieDatas: [],
      legendData: [],
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
      getTaskTime: api＿apiAuthGetTaskTime({
        later: true
      }), // 获取任务时间
      getTaskNum: api＿apiAuthgetTasknum({
        later: true
      }) // 获取任务个数

    }
  },
  created () {
    this.getTaskNums()
      this.getTaskTimes()
  },
  methods: {
       // 获取任务个数
    getTaskNums () {
        this.getTaskNum.getData({
                mode: '',
                type: '',
                dayNum: 0,
                endDate: null,
                startDate: null
              }
        ).then((res) => {
            if (res.code === 200) {
              this.$bus.emit('getTask', res.data.totalCount)
              this.taskPieDatas.push({
                value: res.data.completedCount,
                name: '已完成',
               itemStyle: {normal: {color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{

offset: 0, color: '#56CCF2' },
{
 // 100% 处的颜色
offset: 1, color: '#2F80ED'
 }], false)}}

              })
                this.taskPieDatas.push({
                value: res.data.noCompleteCount,
                name: '进行中',
                            itemStyle: {normal: {color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{

offset: 0, color: '#8F94FB' },
{
 // 100% 处的颜色
offset: 1, color: '#7A7FEB'
 }], false)}}
              })
            }
      this.initCharts(this.$refs.pie)
        })
    },
    // 接收父组件传值
    getDataByparent (val) {
         this.taskPieDatas = []
         this.taskPieDatas.push({
                value: val.completedCount,
                name: '已完成',
               itemStyle: {normal: {color: '#44A8F0'}}
              })
          this.taskPieDatas.push({
                value: val.noCompleteCount,
                name: '进行中',
               itemStyle: {normal: {color: '#7A7FEA'}}

              })
      this.initCharts(this.$refs.pie)
    },
    // 初始化数据 获取任务时间
    getTaskTimes () {
             this.getTaskTime.getData({
                mode: this.taskListParams.mode,
                type: this.taskListParams.type,
                dayNum: this.taskListParams.dayNum,
              endDate: this.taskListParams.endDate,
              startDate: this.taskListParams.startDate
      }).then((res) => {
          if (res.code === 200) {
            this.pieDatas(res.data)
              this.$bus.emit('getTaskTime', res.data.taskHour)
          }
      })
    },
    // 对数据进行处理
    pieDatas (val) {
      this.pieData = []
      this.pieData.push({
        value: Math.abs(val.dealHour),
        name: '平均处理时间' + Math.abs(val.dealHour).toFixed(1) + 'h',
        itemStyle: {normal: {color: '#F88F47'}}
      })
         this.pieData.push({
        value: Math.abs(val.planHour),
        name: '平均准备时间' + Math.abs(val.planHour).toFixed(1) + 'h',
        itemStyle: {normal: {color: '#3BAAFC'}}
      })
         this.pieData.push({
        value: Math.abs(val.responseHour),
        name: '平均响应时间' + Math.abs(val.responseHour).toFixed(1) + 'h',
        itemStyle: {normal: {color: '#2CD97E'}}

      })
      if (this.pieData.length > 0) {
        this.pieData.forEach((item) => {
            this.legendData.push(item.name)
        })
      }
      this.initCharts(this.$refs.pie)
    },
    // 获取来自父级的数据
    getTaskData (val) {
        this.pieDatas(val)
    },
    initCharts (val) {
      this.myChart = this.$echarts.init(val)
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
      legend: {
        orient: 'vertical',
        right: 5,
        top: 0,
        data: this.legendData
    },
        series: [
          {
            type: 'pie',
            center: ['68%', '45%'],
            data: this.pieData,
            radius: ['20%', '30%'],
           itemStyle: {
                normal: {
                    label: { // 此处为指示线文字
                        show: true,
                        textStyle: {
                            fontWeight: 600,
                            fontSize: 10 // 文字的字体大小
                        },
                          formatter: '{d}%'
                    },
                    labelLine: { // 指示线状态
                        show: true,
                        smooth: 0.2,
                        length: 10,
                        length2: 10
                    }
                }
            }
          },
         {
            type: 'pie',
            radius: ['20%', '30%'],
            center: ['25%', '45%'],
            data: this.taskPieDatas,
              itemStyle: {
                normal: {
                    label: { // 此处为指示线文字
                        show: true,
                        textStyle: {
                            fontWeight: 600,
                            fontSize: 10 // 文字的字体大小
                        },
                          formatter: '{b}:{c}  ({d}%)'
                    },
                    labelLine: { // 指示线状态
                        show: true,
                        smooth: 0.2,
                        length: 10,
                        length2: 10
                    }
                }
            }
          }
        ]
      }
      this.myChart.setOption(option)
    }
  },
  mounted () {
    this.initCharts(this.$refs.pie)
  }
}
</script>

<style lang="scss" scoped>
.task {
   .title{
     display: flex;
     width: 100%;
     background: #FFFFFF;
     overflow: hidden;
    p{
      width: 50%;
      text-align: center;
      line-height: 45px;
    }
   }
  .hea{
    height: 15%;
    width: 100%;
    display: flex;
    position: relative;
    .ssd{
      position: absolute;
      width: 5px;
      height:50%;
      border: none;
      top: 100%;
      left: 46.5%;
      z-index: 20;
      span{
        color: rgba(121, 121, 121, 0.4);
        display: block;
        margin-bottom: 10px;
      }
    }
  }
  .pie1 {
    width: 100%;
    height: 85%;
    overflow: hidden;
     background: #FFFFFF;

    // background: red;
    // border-right: 1px dashed #797979;
    // margin-top: 50px;
  }
}
</style>
