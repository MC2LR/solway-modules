<template>
  <div class="indexs">
         <h1>时间</h1>
        <div ref="bar" class="bar"></div>
  </div>
</template>

<script>
import 'echarts/lib/chart/line'
export default {
  name: 'times',
  data () {
    return {
      myChart: null
    }
  },
  methods: {
    getDataTime (val) {
      console.log(val)
    },
    initBar () {
      this.myChart = this.$echarts.init(this.$refs.bar)
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          name: '时间',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          name: '报警数量个数'
        },
         grid: {
            left: '3%',
            right: '10%',
            bottom: '15%',
            containLabel: true
            },
        series: [
          {
            type: 'line',
            symbolSize: 6, // 拐点圆的大小
            color: ['#8AEED5'], // 折线条的颜色
            data: [800, 300, 500, 800, 300, 900, 500],
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
         this.myChart.on('click', (params) => {
          console.log(params)
          this.$bus.emit('open')
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
