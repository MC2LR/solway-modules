<template>
    <div class="stasta">
        <div class="hea">
             <p style="text-indent:20px">电站统计</p>
            <el-select v-model="value" style="width:180px;height:30px" placeholder="请选择"  size="medium" class="ss" @change="select">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            &nbsp;
                <!-- <i class="el-icon-sort"></i> -->
        <i v-show="sort === 'eqid,asc'" class="iconfont iconpaixu" title='默认排序' @click="sortChange()"></i>
        <i v-show="sort === ',desc'" class="iconfont iconxiangxiajiantou-01" title='降序' @click="sortChange()"></i>
        <i v-show="sort === ''" class="iconfont iconxiangshangjiantou-01" title='升序' @click="sortChange()"></i>
        </div>
        <div ref="bar" class="bar"></div>
    </div>
</template>

<script>
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/markLine'
import { api＿apiAuthgetTaskHourByStId } from '@MochaITOM/request/api'
export default {
  name: 'stasta',
  data () {
    return {
      myChart: null,
      value: '总工时(h)',
      staName: [],
      staData: [],
      allstaD: [],
      sort: 'eqid,asc',
      sortArr: ['eqid,asc', ',desc', ''],
      yAxised: '总工时(h)',
      getTaskHourByStId: api＿apiAuthgetTaskHourByStId({
        later: true
      }), // 获取电站统计工时
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
    this.getTaskHourBystid()
  },
  methods: {
    // 升降序
    sortChange () {
      const index =
        this.sortArr.indexOf(this.sort) === 2
          ? 0
          : this.sortArr.indexOf(this.sort) + 1
      this.sort = this.sortArr[index]
      console.log(this.sort)
      if (this.sort === ',desc') {
        this.staData = this.Sroted(this.staData, '>')
      } else {
        this.staData = this.Sroted(this.staData, '<')
      }
      console.log(this.staData)
      if (this.staData.length > 0) {
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
    // 获取电站统计工时
    getTaskHourBystid () {
      this.getTaskHourByStId
        .getData({
          mode: '',
          type: '',
          dayNum: 0,
          endDate: null,
          startDate: null
        })
        .then(res => {
          if (res.code === 200) {
            if (res.data.length > 0) {
              res.data.forEach(item => {
                if (item !== null) {
                  this.staName.push(item.stationName)
                  // 在这里进行判断下拉框哪条数据
                  switch (this.value) {
                    case '总工时(h)':
                      this.staData.push(item.totalHour)
                      break
                    case '质量评分':
                      this.staData.push(item.qualityScore)
                      break
                    case '效率评分':
                      this.staData.push(item.efficacyScore)
                      break
                    case '完成任教数':
                      this.staData.push(item.taskCount)
                      break
                    case '平均响应时间(h)':
                      this.staData.push(item.responseTime)
                      break
                    case '平均准备时间(h)':
                      this.staData.push(item.planTime)
                      break
                    case '平均延误完成时间(h)':
                      this.staData.push(item.delayTime)
                      break
                    case '实际/计划比':
                      this.staData.push(item.percent)
                      break
                  }
                }
              })
            }
          }
          this.initBar()
        })
    },
    // 来自父组件的数据
    getStaData (val) {
      this.staName = []
      this.staData = []
      console.log(val)
      this.allstaD = val
      if (val.length > 0) {
        val.forEach(item => {
          if (item !== null) {
            this.staName.push(item.stationName)
            // 在这里进行判断下拉框哪条数据
            switch (this.value) {
              case '总工时(h)':
                this.staData.push(item.totalHour)
                break
              case '质量评分':
                this.staData.push(item.qualityScore)
                break
              case '效率评分':
                this.staData.push(item.efficacyScore)
                break
              case '完成任教数':
                this.staData.push(item.taskCount)
                break
              case '平均响应时间(h)':
                this.staData.push(item.responseTime)
                break
              case '平均准备时间(h)':
                this.staData.push(item.planTime)
                break
              case '平均延误完成时间(h)':
                this.staData.push(item.delayTime)
                break
              case '实际/计划比':
                this.staData.push(item.percent)
                break
            }
          }
        })
      }
      this.initBar()
    },
    select () {
      this.yAxised = this.value
      if (this.allstaD.length > 0) {
        this.staName = []
        this.staData = []
        this.allstaD.forEach(item => {
          if (item !== null) {
            this.staName.push(item.stationName)
            // 在这里进行判断下拉框哪条数据
            switch (this.value) {
              case '总工时(h)':
                this.staData.push(item.totalHour)
                break
              case '质量评分':
                this.staData.push(item.qualityScore)
                break
              case '效率评分':
                this.staData.push(item.efficacyScore)
                break
              case '完成任教数':
                this.staData.push(item.taskCount)
                break
              case '平均响应时间(h)':
                this.staData.push(item.responseTime)
                break
              case '平均准备时间(h)':
                this.staData.push(item.planTime)
                break
              case '平均延误完成时间(h)':
                this.staData.push(item.delayTime)
                break
              case '平均处理时间(h)':
                this.staData.push(item.dealTime)
                break
              case '实际/计划比':
                this.staData.push(item.percent)
                break
            }
          }
        })
      }
      console.log(this.staData)
      this.initBar()
    },
    initBar () {
      this.myChart = this.$echarts.init(this.$refs.bar)
      let option = {
        xAxis: {
          data: this.staName,
          name: '电站',
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}(h))'
        },
        yAxis: {
          name: this.yAxised
        },
        series: [
          {
            name: '销量',
            type: 'bar',
            itemStyle: {
              normal: { color: '#0072dd' },
              barBorderRadius: [0, 0, 0, 360]
            },
            data: this.staData,
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
            itemStyle: {
              normal: { color: '#5c93fc' },
              barBorderRadius: [0, 0, 180, 0]
            },
            data: this.staData,
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
      this.myChart.on('click', params => {
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
.stasta {
  // background: blue;
  background: #ffffff;

  .hea {
    width: 100%;
    height: 15%;
    padding-top: 13px;
    // overflow: hidden;
    .ss {
      line-height: 50px;
      margin-left: 20px;
    }
    .iconpaixu,
    .iconxiangshangjiantou-01,
    .iconxiangxiajiantou-01 {
      color: #2fbfcc;
      // font-weight: 700;
      font-size: 18px;
      cursor: pointer;
    }
  }
  .bar {
    width: 100%;
    height: 78%;
    // overflow: hidden;
    margin-top: 20px;
  }
}
</style>
