<template>
  <div class="alarm">
      <h1>&nbsp;&nbsp;&nbsp;告警分类</h1>
      <div ref="bar" class="bar"></div>
  </div>
</template>

<script>
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pictorialBar'
import 'echarts/lib/component/markLine'
import {
     getCountByRuleName
  } from '@intelligentAlarms/request/api'
export default {
    name: 'alarmClass',
    data () {
        return {
            myChart: null,
            perDatas: [],
            ruleName: [],
            num: [],
            getCountByRuleNamed: getCountByRuleName({later: true})
        }
    },
    created () {
        this.initgetCountByRuleNamed()
    },
    methods: {
        // 接收来自父组件的数据
        getDataAlarm (val) {
              this.ruleName = []
              this.num = []
                if (val.length > 0) {
                        val.forEach(item => {
                            if (item !== null) {
                                    this.ruleName.push(item.ruleName)
                                    this.num.push({
                                        value: item.num,
                                        ruleName: item.ruleName
                                    })
                            }
                                    })
                }
                this.initBar()
        },
        // 获取初始化数据
        initgetCountByRuleNamed () {
            this.getCountByRuleNamed.getData({
                dayNum: 0
            }).then((res) => {
                console.log(res)
                console.log('初始化报警分类')
                 if (res.data.length > 0) {
                        res.data.forEach(item => {
                            if (item !== null) {
                                    this.ruleName.push(item.ruleName)
                                    this.num.push(item.num)
                            }
                        })
      } else if (res.data.length === 0) {
              this.ruleName = []
              this.num = []
      }
         setTimeout(() => {
            this.initBar()
       }, 500)
            })
        },
        // 初始化地图
    initBar () {
      this.myChart = this.$echarts.init(this.$refs.bar)
      let option = {
        xAxis: {
          data: this.ruleName,
          name: '分类规则'
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
            right: '12%',
            bottom: '11%',
            containLabel: true
            },
        series: [
          {
            name: '报警',
            type: 'bar',
            itemStyle: { normal: { color: '#FF7F5B' } },
            data: this.num,
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
    if (this.myChart._$handlers.click) {
      this.myChart._$handlers.click.length = 0
      }
         this.myChart.on('click', (params) => {
             console.log(params)
       let para = {
          dayNum: typeof (this.$parent.paramsl.dayNum) === 'undefined' ? '' : this.$parent.paramsl.dayNum,
          startDate: typeof (this.$parent.paramsl.dayNum) === 'undefined' ? this.$parent.paramsl.startDate : '',
          endDate: typeof (this.$parent.paramsl.dayNum) === 'undefined' ? this.$parent.paramsl.endDate : '',
          pageNo: 1,
          pageSize: 10,
          ruleName: params.data.ruleName
        }
         this.$bus.emit('openz', para)
      })
      this.myChart.setOption(option)
    }
    },
    mounted () {
        this.initBar()
    }
}
</script>

<style lang="scss" scoped>
    .alarm{
        width: 100%;
        float: right;
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
            height: 93%;
        }
    }
</style>
