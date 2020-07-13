<template>
  <div class="statess">
        <h1>电站分类</h1>
       <div ref="bar" class="bar"></div>
  </div>
</template>

<script>
import 'echarts/lib/chart/line'
export default {
    name: 'staClass',
    data () {
        return {
            myChart: null,
            perDatas: []
        }
    },
    methods: {
        getDataStaClass (val) {
            console.log(val)
        },
           initBar () {
      this.myChart = this.$echarts.init(this.$refs.bar)
      let option = {
        xAxis: {
          data: ['张三', '李四', '王五', '李六', '陈七'],
          name: '电站'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}(个))'
        },
        yAxis: {
            name: '报警数量(个数)'
        },
         grid: {
            left: '3%',
            right: '10%',
            bottom: '15%',
            containLabel: true
            },
        series: [
          {
            name: '报警',
            type: 'bar',
            itemStyle: { normal: { color: 'blue' } },
            data: [10, 25, 68, 74, 95],
            barWidth: 25,
            markLine: {
                symbol: 'none',
                label: {
                    show: true,
                    position: 'insideMiddleTop',
                    formatter: '{b}: {c}'
                },
                data: [
                    {
                        name: '平均值',
                        type: 'average',
                        lineStyle: {
                            normal: {
                            color: '#FF8360',
                            width: 2,
                            type: 'solid'

                            }
                        }
                    }
                ]
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
    .statess{
        width: 100%;
        height: 100%;
        overflow: auto;
      h1{
            font-size: 16px;
            font-family:Microsoft YaHei;
            font-weight:bold;
            margin-top: 10px;
            text-indent: 20px;
            color:rgba(51,51,51,1);
        }
        .bar{
            width: 100%;
            height: 100%;
        }
    }
</style>
