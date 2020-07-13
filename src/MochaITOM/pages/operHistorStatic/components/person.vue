<template>
    <div class="person">
        <div class="hea">
               <p style="text-indent:20px">人员统计</p>
                 <el-select v-model="value" style="width:180px;height:30px" placeholder="请选择"  size="medium" class="ss" @change="select">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>&nbsp;
                   <i v-show="sort === 'eqid,asc'" class="iconfont iconpaixu" title='默认排序' @click="sortChanged()"></i>
                  <i v-show="sort === ',desc'" class="iconfont iconxiangxiajiantou-01" title='降序' @click="sortChanged()"></i>
                  <i v-show="sort === ''" class="iconfont iconxiangshangjiantou-01" title='升序' @click="sortChanged()"></i>
        </div>
        <div ref="bar" class="bar"></div>
    </div>
</template>

<script>
import {
    api＿apiAuthgetTaskHourByPe
} from '@MochaITOM/request/api'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pictorialBar'
import 'echarts/lib/component/markLine'

export default {
  name: 'person',
  data () {
    return {
      myChart: null,
      value: '总工时(h)',
      yAxiss: '总工时(h)',
      sort: 'eqid,asc',
      sortArr: ['eqid,asc', ',desc', ''],
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
      perName: [],
      perDatas: [],
      allpersonD: [],
      getTaskHourByPe: api＿apiAuthgetTaskHourByPe({
        later: true
      }), // 获取人员统计工时
      options: [
        {
          value: '总工时(h)',
          lable: '总工时(h)'
        },
        {
          value: '质量评分',
          lable: '质量评分'
        },
        {
          value: '效率评分',
          lable: '效率评分'
        },
        {
          value: '完成任教数',
          lable: '完成任教数'
        },
        {
          value: '平均响应时间(h)',
          lable: '平均响应时间(h)'
        },
        {
          value: '平均准备时间(h)',
          lable: '平均准备时间(h)'
        },
        {
          value: '平均处理时间(h)',
          lable: '平均处理时间(h)'
        },
        {
          value: '平均延误完成时间(h)',
          lable: '平均延误完成时间(h)'
        },
        {
          value: '实际/计划比',
          lable: '实际/计划比'
        }
      ]
    }
  },
  created () {
    this.getTaskHourByPerson()
  },
  methods: {
      // 升降序
    sortChanged () {
      const index =
        this.sortArr.indexOf(this.sort) === 2
          ? 0
          : this.sortArr.indexOf(this.sort) + 1
      this.sort = this.sortArr[index]
      if (this.sort === ',desc') {
        this.perDatas = this.Sroted(this.perDatas, '>')
      } else {
        this.perDatas = this.Sroted(this.perDatas, '<')
      }
      if (this.perDatas.length > 0) {
        this.initBar()
      }
    },
     Sroted (arr1, symbol) {
      let len = arr1.length
      let temped = null
      for (let i = 0; i < len - 1; i++) {
        if (symbol === '>') {
          for (let j = 0; j < len - 1 - i; j++) {
            if (arr1[j] < arr1[j + 1]) {
               temped = arr1[j]
              arr1[j] = arr1[j + 1]
              arr1[j + 1] = temped
            }
          }
        } else {
          for (var j = 0; j < len - 1 - i; j++) {
            if (arr1[j] > arr1[j + 1]) {
              temped = arr1[j]
              arr1[j] = arr1[j + 1]
              arr1[j + 1] = temped
            }
          }
        }
      }
      return arr1
    },
        // 获取人员统计工时
    getTaskHourByPerson () {
        this.getTaskHourByPe.getData({
                mode: '',
                type: '',
                dayNum: 0,
                endDate: null,
                startDate: null
        }).then((res) => {
               if (res.data.length > 0) {
                    res.data.forEach(item => {
                        if (item !== null) {
                             this.perName.push(item.handlerName)
                             this.perDatas.push(item.totalHour)
                      }
                    })
               }
          this.initBar()
        })
    },
    // 获取来自父组件的数据
    getPersonData (val) {
      this.perName = []
      this.perDatas = []
      this.allpersonD = val
      if (val.length > 0) {
        val.forEach(item => {
          if (item !== null) {
            this.perName.push(item.handlerName)
            this.perDatas.push(item.totalHour)
          }
        })
      }
      this.initBar()
    },
    select () {
      this.yAxiss = this.value
      if (this.allpersonD.length > 0) {
        this.perDatas = []
        this.perName = []
        this.allpersonD.forEach(item => {
          if (item !== null) {
            this.perName.push(item.handlerName)
              // 在这里进行判断下拉框哪条数据
              switch (this.value) {
                  case '总工时(h)':
                   this.perDatas.push(item.totalHour)
                   break
                         case '质量评分':
                   this.perDatas.push(item.qualityScore)
                   break
                         case '效率评分':
                   this.perDatas.push(item.efficacyScore)
                   break
                         case '完成任教数':
                   this.perDatas.push(item.taskCount)
                   break
                         case '平均响应时间(h)':
                   this.perDatas.push(item.responseTime)
                   break
                         case '平均准备时间(h)':
                   this.perDatas.push(item.planTime)
                   break
                         case '平均延误完成时间(h)':
                   this.perDatas.push(item.delayTime)
                   break
                         case '平均处理时间(h)':
                   this.perDatas.push(item.dealTime)
                   break
                   case '实际/计划比':
                   this.perDatas.push(item.percent)
                   break
              }
          }
        })
      }
      this.initBar()
    },
    initBar () {
      this.myChart = this.$echarts.init(this.$refs.bar)
      let option = {
        xAxis: {
          data: this.perName,
          name: '人员',
           axisLabel: {
                      interval: 0,
                      rotate: 40
                    }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}(h))'
        },
        yAxis: {
            name: this.yAxiss
        },
        series: [
          {
            name: '销量',
            type: 'bar',
            itemStyle: { normal: { color: '#0072dd' }, barBorderRadius: [0, 0, 0, 360] },
            data: this.perDatas,
            barWidth: 14,
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
                            color: 'red',
                            width: 2,
                            type: 'solid'
                            }
                        }
                    }
                ]
            }
          },
           {
            name: 'a',
            type: 'bar',
            barGap: 0,
            barWidth: 13,
            itemStyle: { normal: { color: '#5c93fc' }, barBorderRadius: [0, 0, 180, 0] },
            data: this.perDatas,
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
                            color: 'red',
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
          this.$bus.emit('tabls', params)
      })
    }
  },
  mounted () {
    this.initBar()
  }
}
</script>

<style lang="scss" scoped>
.person {
  // background: blue;
  overflow: hidden;
     background: #FFFFFF;
  .hea {
    width: 100%;
    height: 25%;
    padding-top: 13px;
    // overflow: hidden;
    .ss {
      line-height: 50px;
      margin-left: 20px;
    }
     .iconpaixu,.iconxiangshangjiantou-01,.iconxiangxiajiantou-01{
      color: #2FBFCC;
      // font-weight: 700;
      font-size: 18px;
      cursor: pointer;
    }
  }
  .bar {
    width: 100%;
    // overflow: hidden;
    height: 78%;
  }
}
</style>
