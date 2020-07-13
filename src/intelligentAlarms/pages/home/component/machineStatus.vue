<template>
  <div class="machine">
        <div ref="pie" class="bar" style="width:49%;height:95%">
        </div>
        <div ref="pie1" class="bar1" style="width:49%;height:95%">
        </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import {
     getCountByAlarmLevel, getCountByDtype
  } from '@intelligentAlarms/request/api'
export default {
  name: 'machineStatus',
  data () {
    return {
      myChart: null,
      myChart1: null,
      CountByDtyped: [],
      CountByAlarm: [],
      getCountByDtyped: getCountByDtype({later: true}),
      getCountByAlarmLeveled: getCountByAlarmLevel({later: true})
    }
  },
  created () {
    this.initData()
  },
  methods: {
    // 获取父组件数据
    getDataMachined (val) {
      console.log(val)
          this.CountByDtyped = []
          val.forEach(item => {
            console.log(item)

             this.CountByDtyped.push({
               value: item.num,
               name: item.dtypeName,
               dtype: item.dtype
             })
           })
         this.initCharts()
      this.initChartsed()
    },
      // 获取父组件数据
    getDataMachines (val) {
      console.log(val)
      this.CountByAlarm = []
           val.forEach(item => {
             console.log(item)
             this.CountByAlarm.push({
               value: item.num,
               name: item.alarmLevelName,
               alarmLevem: item.alarmLevel
             })
           })
         this.initCharts()
      this.initChartsed()
    },
    initData () {
       this.getCountByDtyped.getData({
         dayNum: 0
       }).then((res) => {
         console.log(res)
         console.log('初始化状态')

         if (res.code === 200) {
           res.data.forEach(item => {
             console.log(item)
             this.CountByDtyped.push({
               value: item.num,
               name: item.dtypeName,
               dtype: item.dtype

             })
           })
         this.initCharts()
         this.initChartsed()
         }
       })
       this.getCountByAlarmLeveled.getData({dayNum: 0}).then((res) => {
         if (res.code === 200) {
           console.log(res)
         console.log('初始化状态')
           res.data.forEach(item => {
             console.log(item)
             this.CountByAlarm.push({
               alarmLevem: item.alarmLevel,
               value: item.num,
               name: item.alarmLevelName
             })
           })
         this.initCharts()
      this.initChartsed()
         }
       })
       setTimeout(() => {
         this.initCharts()
      this.initChartsed()
       }, 1000)
    },
    // 初始化地图
    initCharts () {
      let option = {
        tooltip: {
          trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
      legend: {
        orient: 'horizontal',
        bottom: 10

    },
        series: [
         {
           type: 'pie',
            radius: ['20%', '30%'],
            center: ['50%', '45%'],
            data: this.CountByAlarm,
              color: ['#F9697A', '#2A90FB', '#FDBC41'],
              itemStyle: {
                normal: {
                  label: { // 此处为指示线文字
                        show: true,
                        textStyle: {
                          fontWeight: 600,
                            fontSize: 10 // 文字的字体大小
                        },
                          formatter: '{c}  ({d}%)'
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
      if (this.myChart._$handlers.click) {
      this.myChart._$handlers.click.length = 0
      }
        this.myChart.on('click', (params) => {
        console.log(params)
     let para = {
          alarmLevel: params.data.alarmLevem,
          dayNum: typeof (this.$parent.paramsl.dayNum) === 'undefined' ? '' : this.$parent.paramsl.dayNum,
          startDate: typeof (this.$parent.paramsl.dayNum) === 'undefined' ? this.$parent.paramsl.startDate : '',
          endDate: typeof (this.$parent.paramsl.dayNum) === 'undefined' ? this.$parent.paramsl.endDate : '',
          pageNo: 1,
          pageSize: 10
        }
        console.log(para)
        this.$bus.emit('openz', para)
      })
      this.myChart.setOption(option)
    },
        // 初始化地图
    initChartsed () {
      let option = {
        tooltip: {
          trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
      legend: {
        orient: 'horizontal',
        bottom: 10

    },
        series: [
          {
            type: 'pie',
            center: ['50%', '45%'],
            data: this.CountByDtyped,
            radius: ['20%', '30%'],
           itemStyle: {
             normal: {
               label: { // 此处为指示线文字
                        show: true,
                        textStyle: {
                          fontWeight: 600,
                            fontSize: 10 // 文字的字体大小
                        },
                          formatter: '{c} ({d}%)'
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
     if (this.myChart1._$handlers.click) {
      this.myChart1._$handlers.click.length = 0
      }
      this.myChart1.setOption(option, true)
      this.myChart1.on('click', (params) => {
        console.log(params)
       let para = {
          dtype: params.data.dtype + '',
          dayNum: typeof (this.$parent.paramsl.dayNum) === 'undefined' ? '' : this.$parent.paramsl.dayNum,
          startDate: typeof (this.$parent.paramsl.dayNum) === 'undefined' ? this.$parent.paramsl.startDate : '',
          endDate: typeof (this.$parent.paramsl.dayNum) === 'undefined' ? this.$parent.paramsl.endDate : '',
          pageNo: 1,
          pageSize: 10
        }
        this.$bus.emit('openz', para)
      })
    }
  },
    mounted () {
      this.myChart = this.$echarts.init(this.$refs.pie)
      this.myChart1 = this.$echarts.init(this.$refs.pie1)
      this.initCharts()
      this.initChartsed()
  }

}
</script>

<style lang="scss" scoped>
.machine {
  width: 100%;
  height: 100%;
  display: flex;
  float: right;
}
</style>
