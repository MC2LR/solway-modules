<template>
  <div class="machine">
        <div ref="pie" class="bar" style="width:99%;height:99%">
        </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
export default {
  name: 'machineStatus',
  data () {
    return {
      myChart: null
    }
  },
  methods: {
    getDataMachine (val) {
      console.log(val)
    },
    initCharts () {
      this.myChart = this.$echarts.init(this.$refs.pie)
          let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
      legend: {
        orient: 'horizontal',
        bottom: 10,
        data: this.legendData
    },
        series: [
          {
            type: 'pie',
            center: ['68%', '45%'],
            data: [
                  {value: 100, name: '张三'},
                {value: 310, name: '李四'},
                {value: 65, name: '王五'},
                {value: 96, name: '李六'},
                {value: 78, name: '陈七'}
            ],
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
          },
         {
            type: 'pie',
            radius: ['20%', '30%'],
            center: ['23%', '45%'],
            data: [
                 {value: 45, name: '牛奶'},
                {value: 69, name: '猪肉'},
                {value: 14, name: '苹果'},
                {value: 96, name: '鸭梨'},
                {value: 47, name: '西红柿'}
            ],
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
      this.myChart.setOption(option)
         this.myChart.on('click', (params) => {
          console.log(params)
          this.$bus.emit('open')
      })
    }
  },
    mounted () {
    this.initCharts()
  }
}
</script>

<style lang="scss" scoped>
.machine {
  width: 100%;
  height: 100%;
  float: right;
}
</style>
