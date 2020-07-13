<template>
  <div class="indexs">
         <h1>&nbsp;&nbsp;&nbsp;时间</h1>
        <div ref="bar" class="bar"></div>
  </div>
</template>

<script>
import 'echarts/lib/chart/line'
import {
    getCountByTime
  } from '@intelligentAlarms/request/api'
export default {
  name: 'times',
  data () {
    return {
      myChart: null,
      getCountByTimed: getCountByTime({later: true}),
      Name: [],
      times: []
    }
  },
  created () {
    this.initgetCountByTimed()
  },
  methods: {
    // 接收父组件传值
    getDataTime (val) {
            this.Name = []
          this.times = []
        if (val.length > 0) {
         val.forEach(item => {
          if (item !== null) {
                     this.Name.push(item.num)
                    this.times.push(item.time)
        }
      })
  }
      this.initBar()
    },
    // 初始化地图
    initgetCountByTimed () {
      this.getCountByTimed.getData({
            dayNum: 0
      }).then((res) => {
        console.log(res)
        console.log('初始化时间')
          if (res.data.length > 0) {
          res.data.forEach(item => {
              if (item !== null) {
                    this.Name.push(item.num)
                    this.times.push(item.time)
            }
          })
      } else if (res.data.length === 0) {
          this.Name = []
          this.times = []
      }
      setTimeout(() => {
        this.initBar()
      }, 500)
      })
    },
    // 渲染地图实例
    initBar () {
      this.myChart = this.$echarts.init(this.$refs.bar)
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          name: '时间',
          boundaryGap: true,
          data: this.times
        },
        yAxis: {
          type: 'value',
          name: '报警数量(个)'
        },
         grid: {
            left: '8%',
            right: '10%',
            bottom: '8%',
            containLabel: true
            },
        series: [
          {
            type: 'line',
            symbolSize: 6, // 拐点圆的大小
            color: ['#8AEED5'], // 折线条的颜色
            data: this.Name,
            smooth: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3,
                  type: 'solid' // 'dotted'虚线 'solid'实线
                },
                label: {
                    show: true,
                    textStyle: {
                        color: 'red'
                    }
                }
              }
            }
          }
        ]
      }
      this.myChart.setOption(option)
        if (this.myChart._$handlers.click) {
      this.myChart._$handlers.click.length = 0
      }
         this.myChart.on('click', (params) => {
          console.log(params)
          this.$bus.emit('openz')
      })
    }
  },
  mounted () {
    this.initBar()
  }
}
</script>

<style lang="scss" scoped>
.indexs {
  width: 100%;
  height: 100%;
  overflow: auto;
  h1 {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    margin-top: 10px;
    text-indent: 20px;
    color: rgba(51, 51, 51, 1);
  }
  .bar {
    width: 99%;
    height: 90%;
  }
  // background: red;
}
</style>
