<template>
  <div class="simulator">
        <el-dialog
        width="55%"
        center
        title="表达式模拟测试"
        top="5vh"
        custom-class="dialog"
        @close="closeds"
        :visible.sync="dialogTableVisibledss"
        :modal-append-to-body="false"
         >
            <div class="content">
                <div class="content-header">
                    <span>默认数值范围</span>  &nbsp;&nbsp;
                    <input type="text" v-model="startScope" @change="scopedStar"> ~
                    <input type="text" v-model="endScope" style="margin-right:30px" @change="scopedEnd">
                    <span>数据频率(秒)</span>  &nbsp;&nbsp;
                    <input type="text" @input="setTime" v-model="seconds" style="width:100px;">
                    <p style="display:inline-block;float:right;background:#2FBFCC;width:120px;height:30px;line-height:30px;text-align:center;border-radius:5px;color:#fff;margin-top:8px;cursor:pointer;" @click="clearData">清空模拟图表数据</p>
                </div>
                <div class="lines" ref="barz">

                </div><br><br>
                <p style="font-size:12px;color:#333;text-indent:20px">表达式：{{express}}</p><br>
                <div class="datas">
                     <el-form class="simulator-form" ref="form" label-width="140px">
                          <el-form-item :label="item.name" v-for="(item,index) in this.SimulateData" :key="index">
                                 <span :style="{background:item.color}" style="width:24px;height:8px;background:#0EC866;border-radius:2px;display:inline-block; vertical-align:middle"></span>  <input type="text" @input="powerEvent(index)" v-model="item.num"> <div style="display:inline-block;width:80%;height:100%; vertical-align:middle">
                                   <el-slider :ref="'el' + index" v-model="item.num"></el-slider>
                                  </div>
                            </el-form-item>
                     </el-form>
                </div>
            </div>
         </el-dialog>
  </div>
</template>
<script>
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pictorialBar'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/markArea'
import 'echarts/lib/component/dataZoom'
import {
checkExpression

} from '@intelligentAlarms/request/api'
export default {
    name: 'simulator',
    data () {
        return {
            dialogTableVisibledss: false,
            forms: '',
            startScope: 1,
            seconds: '10',
            endScope: 100,
            myChart: null,
            express: '',
            SimulateData: [],
            checkExpressioned: checkExpression({later: true}),
            times: null,
            paras: {},
            lineDataTime: [],
            lineData: [],
            param: {},
            xAxisce: [1, 2, 3, 4, 5],
            errors: []
       }
    },
    methods: {
      // 关闭清除定时
            closeds () {
                 clearInterval(this.times)
            },
            powerEvent (index) {
                this.SimulateData[index].num = Number(this.SimulateData[index].num)
                if (!Number(this.SimulateData[index].num)) {
                  this.SimulateData[index].num = this.startScope
                } else {
                  if (Number(this.SimulateData[index].num) > Number(this.endScope)) {
                     this.SimulateData[index].num = Number(this.endScope)
                  }
                   if (Number(this.SimulateData[index].num) < Number(this.startScope)) {
                     this.SimulateData[index].num = Number(this.startScope)
                  }
                }
            },
            // 时间格式判定
            scopedStar () {
              if (Number(this.startScope) > Number(this.endScope)) {
                 this.startScope = Number(this.endScope) - 1
              }
              if (this.SimulateData.length > 0) {
                    for (let i = 0; i < this.SimulateData.length; i++) {
                      if (Number(this.SimulateData[i].num) < Number(this.startScope)) {
                         this.SimulateData[i].num = Number(this.startScope)
                      }
                      console.log(this.SimulateData[i].num)
                    }
                }
            },
            scopedEnd () {
                 if (Number(this.startScope) > Number(this.endScope)) {
                 this.endScope = Number(this.startScope) + 1
              }
                if (this.SimulateData.length > 0) {
                    for (let i = 0; i < this.SimulateData.length; i++) {
                      if (Number(this.SimulateData[i].num) > Number(this.endScope)) {
                         this.SimulateData[i].num = Number(this.endScope)
                      }
                      console.log(this.SimulateData[i].num)
                    }
                }
            },
          // 数据频率
          setTime () {
              if (!Number(this.seconds)) {
                 this.seconds = '5'
                this.xAxisce = [1, 2, 3, 4, 5]
                 clearInterval(this.times)
                 this.times = setInterval(() => {
                    this.updePage()
                }, Number(this.seconds + '000'))
              } else {
                this.xAxisce = [1, 2, 3, 4, 5]
                 clearInterval(this.times)
                 this.times = setInterval(() => {
                   this.updePage()
                }, Number(this.seconds + '000'))
              }
          },
          // 刷新页面
          updePage () {
                     this.lineDataTime = []
                     this.param = []
                     this.xAxisce.push(this.xAxisce[this.xAxisce.length - 1] + 1)
                     this.SimulateData.forEach((items, index) => {
                      this.param[items.name] = items.num
                      this.lineData[index].datas.push(this.SimulateData[index].num)
                      console.log(this.lineData[index].datas)
                      this.lineDataTime.push({
                          name: this.SimulateData[index].name,
                          type: 'line',
                          symbolSize: 6, // 拐点圆的大小
                          color: this.lineData[index].color, // 折线条的颜色
                          data: this.lineData[index].datas,
                          smooth: false,
                          markArea: {
                              data: this.errors

                          },
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
                       })
                  })
                  this.checkExpress()
                  this.myChartEvent()
          },
      // 请求表达式
        checkExpress () {
          this.checkExpressioned.getData({
            expression: this.express,
            params: {
                ...this.param
            }
          }).then(res => {
            console.log(res)
            if (res.code === 200) {
              if (!res.data) {
                this.errors.push([
                  {
                    name: '报警',
                    xAxis: this.lineData[0].datas.length - 1,
                    itemStyle: {
                        color: '#EAC9C5'
                    }
                  },
                  {
                    xAxis: this.lineData[0].datas.length
                  }
                ])
              }
            }
          })
        },
        // 清除数据
        clearData () {
            this.seconds = ''
            this.errors = []
            if (this.SimulateData.length > 0) {
              this.SimulateData.forEach(item => {
                item.num = 0
              })
            }
            clearInterval(this.times)
            this.xAxisce = []
            this.lineData = []
            this.myChartEvent()
            this.SimulateData.forEach((items, index) => {
                this.param[items.name] = items.num
                this.lineData.push({
                  datas: [],
                  color: []
                })
          })
        },
        // 接收要模拟的数据
        openDi (val, b, c, t) {
            this.express = val
            this.SimulateData = []
            this.errors = []
            let all = b.concat(c)
             if (all.length > 0) {
               all.forEach((item, index) => {
             if (typeof (item.name) === 'undefined') {
                       item.name = ''
                       item.name = item.stdName
                 }
            if (t.indexOf(item.name) !== -1) {
                     this.SimulateData.push({
                       name: item.name,
                       num: this.startScope,
                       color: ''
                     })
                   }
                })
             }
            this.dialogTableVisibledss = true
             this.xAxisce = []
            this.lineData = []
            // 设置每条线要渲染的数据
            let sty = document.getElementsByClassName('el-slider__bar')
            console.log(sty[0])
            this.SimulateData.forEach((items, index) => {
                     let a = '#' + Math.floor(Math.random() * 16777215).toString(16)
                     setTimeout(() => {
                       sty[index].style.background = a
                     }, 0)
                     console.log(a)
                     items.color = a
                      this.param[items.name] = items.num
                      this.lineData.push({
                        datas: [],
                        color: []
                      })
                    this.lineData.forEach(item => {
                        item.color.push(a)
                      })
                })
                // 初始化验证
            this.checkExpress()
            setTimeout(() => {
              this.initBar()
              this.setTime()
            }, 0)
        },
    myChartEvent () {
        let option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: this.xAxisce
        },
          dataZoom: [{
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          // left: '9%',
          bottom: -5,
          start: 5,
          end: 90 // 初始化滚动条
  }],
        yAxis: [{
          type: 'value',
          name: '指标'
        },
        {
          type: 'value',
          name: '结果'
        }
        ],
         grid: {
            left: '3%',
            right: '7%',
            bottom: '3%',
            containLabel: true
            },
        series: [
          ...this.lineDataTime
        ]
      }
      this.myChart.setOption(option)
    },
    initBar () {
      this.myChart = this.$echarts.init(this.$refs.barz)
      this.myChartEvent()
    },
    mounted () {
    },
    beforeDestroy () {
      clearInterval(this.times)
    }
  }
}
</script>
<style lang="scss" scoped>
 .simulator{
     width: 100%;
     height: 0;

    //  .el-form.simulator-form {
    //    .el-form-item:nth-child(1) {
    //       >>> .el-slider__bar{
    //         background: #0EC866;
    //       }
    //    }
    //    .el-form-item:nth-child(2) {
    //       >>> .el-slider__bar{
    //         background: #2F80ED;
    //       }
    //    }
    //    .el-form-item:nth-child(3) {
    //       >>> .el-slider__bar{
    //         background: #7F00FF;
    //       }
    //    }
    //    .el-form-item:nth-child(4) {
    //       >>> .el-slider__bar{
    //         background: red;
    //       }
    //    }
    //  }
     >>> .dialog{
      //  height: 85vh;
       overflow: auto;
     }
     .content{
         width: 100%;
        //  height: 60vh;
         overflow: auto;
         .content-header{
             width: 90%;
             height: 50px;
             margin: 0 auto;
             line-height: 50px;
             font-size: 12px;
             overflow: hidden;
             color: #666;
             input{
                 width: 56px;
                 height: 30px;
                 border-radius: 3px;
                 outline: none;
                 border: 1px solid #C4C4C4;
             }
         }
         .lines{
             width: 95%;
             height: 300px;
             margin: 0 auto;
         }
         .datas{
             width: 95%;
             height: 25%;
             margin: 0 auto;

             input{
                     width:56px;
                     height: 26px;
                     border:1px solid rgba(196,196,196,1);
                     outline: none;
                 }
                >>> .el-progress {
                     width: 70%;
                     display: inline-block;
                     margin-left: 20px;
                 }

         }
     }
 }
</style>
