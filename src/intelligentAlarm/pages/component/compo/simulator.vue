<template>
  <div class="simulator">
        <el-dialog
        width="55%"
        center
        title="表达式模拟测试"
        top="10vh"
        custom-class="dialog"
        :visible.sync="dialogTableVisibledss"
        :modal-append-to-body="false"
         >
            <div class="content">
                <div class="content-header">
                    <span>默认数值范围</span>  &nbsp;&nbsp;
                    <input type="text"> ——
                    <input type="text" style="margin-right:30px">
                    <span>数据频率(秒)</span>  &nbsp;&nbsp;
                    <input type="text" style="width:100px;">
                    <p style="display:inline-block;float:right;background:#2FBFCC;width:120px;height:30px;line-height:30px;text-align:center;border-radius:5px;color:#fff;margin-top:8px;cursor:pointer;margin-right:130px  ">清空模拟图表数据</p>
                </div>
                <div class="lines" ref="barz">

                </div><br><br>
                <p style="font-size:12px;color:#333;text-indent:20px">表达式：电量>0 and 功率*100&lt;0 and 电站平均功率&gt;1</p><br>
                <div class="datas">
                     <el-form ref="form" label-width="140px">
                          <el-form-item label="功率(kw)">
                                 <span style="width:24px;height:8px;background:#0EC866;border-radius:2px;display:inline-block"></span>  <input type="text"> <el-progress color="#0EC866" :percentage="percent"></el-progress>
                            </el-form-item>
                             <el-form-item label="电压(v)">
                                     <span style="width:24px;height:8px;background:#2F80ED;border-radius:2px;display:inline-block"></span>  <input type="text"> <el-progress color="#2F80ED" :percentage="percent1"></el-progress>
                            </el-form-item>
                             <el-form-item label="电站平均功率(kw)">
                                     <span style="width:24px;height:8px;background:#7F00FF;border-radius:2px;display:inline-block"></span>  <input type="text"> <el-progress color="#7F00FF" :percentage="percent2"></el-progress>
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
export default {
    name: 'simulator',
    data () {
        return {
            dialogTableVisibledss: false,
            forms: '',
            input1: '',
            input2: '',
            input3: '',
            percent: 20,
            percent1: 50,
            percent2: 38,
            myChart: null
       }
    },
    methods: {
        openDi () {
            this.dialogTableVisibledss = true
            setTimeout(() => {
                this.initBar()
            }, 0)
        },
    initBar () {
      this.myChart = this.$echarts.init(this.$refs.barz)
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
            data: [0, 300, 500, 800, 300, 600, 500],
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
    //      this.myChart.on('click', (params) => {
    //       console.log(params)
    //   })
    }
    },
    mounted () {
    //    setTimeout(() => {
    //    }, 1000)
    }
}
</script>
<style lang="scss" scoped>
 .simulator{
     width: 100%;
     height: 0;
     .content{
         width: 100%;
         height: 60vh;
         overflow: auto;
         .content-header{
             width: 95%;
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
             height: 40%;
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
