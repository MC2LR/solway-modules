<template>
  <div class="statess">
        <h1>&nbsp;&nbsp;&nbsp;电站分类</h1>
       <div ref="bar" class="bar"></div>
  </div>
</template>

<script>
import 'echarts/lib/chart/line'
import { getCountByStation } from '@intelligentAlarms/request/api'
export default {
  name: 'staClass',
  data () {
    return {
      myChart: null,
      getCountByStas: getCountByStation({ later: true }),
      perDatas: [],
      staName: [],
      staDatas: []
    }
  },
  created () {
    this.getCountByStaEvent()
  },
  methods: {
    // 根据电站分类统计数量
    getCountByStaEvent () {
      this.getCountByStas
        .getData({
          dayNum: 0
        })
        .then(res => {
          console.log(res)
          console.log('初始化电站分类')

          if (res.data !== null && res.data.length > 0) {
            res.data.forEach(item => {
              if (item !== null) {
                this.staName.push(item.stationName)
                this.staDatas.push(item.num)
              }
            })
          }
          this.initBar()
        })
    },
    // 父组件传值过来重新渲染
    getDataStaClass (val) {
         this.staName = []
         this.staDatas = []
      if (val.length > 0) {
        val.forEach(item => {
          if (item !== null) {
            this.staName.push(item.stationName)
            this.staDatas.push({
              value: item.num,
              staId: item.stationId
            })
          }
        })
      } else if (val.length === 0) {
        this.staName = []
        this.staDatas = []
      }
      setTimeout(() => {
        this.initBar()
      }, 500)
    },
    // 初始化地图实例
    initBar () {
      this.myChart = this.$echarts.init(this.$refs.bar)
      let option = {
        xAxis: {
          data: this.staName,
          name: '电站'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}(个))'
        },
        yAxis: {
          name: '报警数量(个)'
        },
        grid: {
          left: '8%',
          right: '10%',
          bottom: '15%',
          containLabel: true
        },
        series: [
          {
            name: '报警',
            type: 'bar',
            itemStyle: { normal: { color: '#186AF2' } },
            data: this.staDatas,
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
        if (this.myChart._$handlers.click) {
        this.myChart._$handlers.click.length = 0
      }
      this.myChart.on('click', params => {
        console.log(params)
        let para = {
          dayNum: typeof (this.$parent.paramsl.dayNum) === 'undefined' ? '' : this.$parent.paramsl.dayNum,
          startDate: typeof (this.$parent.paramsl.dayNum) === 'undefined' ? this.$parent.paramsl.startDate : '',
          endDate: typeof (this.$parent.paramsl.dayNum) === 'undefined' ? this.$parent.paramsl.endDate : '',
          pageNo: 1,
          pageSize: 10,
          stationId: params.data.stationId
        }
        console.log(para)

        this.$bus.emit('openz', para)
      })
    }
  },
  mounted () {
    this.initBar()
  }
}
</script>

<style lang="scss" scoped>
.statess {
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
    width: 100%;
    height: 95%;
  }
}
</style>
