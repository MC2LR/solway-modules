<template>
  <div class="completion-rate">
     <el-row>
        <el-col :span="12">
          <el-row>
            <el-col :span="13">
              <div class="circle-bg" :class="{'circle-bg1': (!monthRate || monthRate < 25), 'circle-bg2': monthRate >= 25 && monthRate < 50, 'circle-bg3': monthRate >= 50 && monthRate < 75, 'circle-bg4': monthRate >75}">
                <ve-liquidfill ref="monthChart" :after-config="afterConfig" :data="monthChart" width="100%" height="100%" :settings="monthSettings">
                  <div class="label-name">计划完成</div>
                </ve-liquidfill>
              </div>
            </el-col>
            <el-col :span="11">
              <div class="content">
                <div class="content-middle">
                  <div class="lightwhite m-b-10">月发电量</div>
                  <div class="font18 m-b-15">{{monthData.real_kwh_chk | dataNullFilter}}{{monthUnits.real_kwh_chk | dataNullFilter}}</div>
                  <div class="lightwhite m-b-10">月发电小时数</div>
                  <div class="font18 m-b-15">{{monthData.real_hours | dataNullFilter}}h</div>
                  <div><span class="lightwhite">同比</span>
                    <img v-if="monthData.real_kwh_chk_tb_rate > 0" src="../images/arrow-ascend.png" class="arrow">
                    <img v-if="monthData.real_kwh_chk_tb_rate < 0" src="../images/arrow-descend.png" class="arrow">
                    <span class="font18">{{monthData.real_kwh_chk_tb_rate | dataNullFilter}}%</span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="13">
              <div class="circle-bg" :class="{'circle-bg1': (!yearRate || yearRate < 25), 'circle-bg2': yearRate >= 25 && yearRate < 50, 'circle-bg3': yearRate >= 50 && yearRate < 75, 'circle-bg4': yearRate >75}">
                <ve-liquidfill ref="yearChart" :after-config="afterConfig" :data="yearChart" width="100%" height="100%" :settings="yearSettings">
                  <div class="label-name">计划完成</div>
                </ve-liquidfill>
              </div>
            </el-col>
            <el-col :span="11">
              <div class="content">
                <div class="content-middle">
                  <div class="lightwhite m-b-10">年发电量</div>
                  <div class="font18 m-b-15">{{yearData.real_kwh_chk | dataNullFilter}}{{yearUnits.real_kwh_chk | dataNullFilter}}</div>
                  <div class="lightwhite m-b-10">年发电小时数</div>
                  <div class="font18 m-b-15">{{yearData.real_hours | dataNullFilter}}h</div>
                  <div><span class="lightwhite">同比</span>
                    <img v-if="yearData.real_kwh_chk_hb_rate > 0" src="../images/arrow-ascend.png" class="arrow">
                    <img v-if="yearData.real_kwh_chk_hb_rate < 0" src="../images/arrow-descend.png" class="arrow">
                    <span class="font18">{{yearData.real_kwh_chk_hb_rate | dataNullFilter}}%</span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
     </el-row>
  </div>
</template>

<script>
import Liquidfill from 'v-charts/lib/liquidfill.common'
import {Row, Col} from 'element-ui'
export default {
  data () {
    return {
      colorMapArr: ['rgba(208,107,109,0.8)', 'rgba(255,160,59,0.8)', 'rgba(31, 204, 214,0.8)', 'rgba(92,180,118,0.7)'],
      outlineColorMapArr: ['rgba(208,107,109,0.2)', 'rgba(255,160,59,0.2)', 'rgba(31, 204, 214,0.2)', 'rgba(1,216,103,0.2)'],
      // outlineShadowColorMapArr: ['rgba(255,60,59,0.5)', 'rgba(255,160,59,0.2)', 'rgba(255,160,59,0.2)', 'rgba(255,160,59,0.2)'],
      rangeType: 1,
      monthRate: 0,
      yearRate: 0,
      monthData: {},
      yearData: {},
      monthChart: {},
      monthSettings: {},
      yearChart: {},
      yearSettings: {},
      monthUnits: {},
      yearUnits: {}
    }
  },
  filters: {
    dataNullFilter: function (value) {
      if (!value) return '-'
      return value
    }
  },
  methods: {
    judgeRange (rate) {
      if (rate === null || rate === undefined) {
        this.rangeType = 0
      } else if (rate >= 0 && rate < 0.25) {
        this.rangeType = 0
      } else if (rate >= 0.25 && rate < 0.5) {
        this.rangeType = 1
      } else if (rate >= 0.5 && rate < 0.75) {
        this.rangeType = 2
      } else if (rate >= 0.75) {
        this.rangeType = 3
      }
    },
    setGraphSettings (type, value) {
      this.judgeRange(value)
      this[type] = {
        wave: [value],
        seriesMap: [
          {
            period: 1500,
            waveLength: '100%',
            amplitude: '3%',
            label: {
              color: 'white',
              formatter (options) {
                if (value !== null && value !== undefined) {
                  return parseInt(options.value * 100) + '%'
                } else {
                  return '-%'
                }
              },
              fontSize: 16
            },
            center: ['50%', '50%'],
            radius: '58%',
            color: [this.colorMapArr[this.rangeType]],
            outline: {
              borderDistance: '0',
              itemStyle: {
                borderColor: 'transparent',
                color: this.outlineColorMapArr[this.rangeType],
                borderWidth: '0'
                // shadowColor: this.outlineShadowColorMapArr[this.rangeType],
                // shadowBlur: '10'
              }
            },
            backgroundStyle: {
              color: 'transparent'
            }
          }
        ]
      }
    },
    afterConfig (options) {
      options.tooltip.confine = true
      options.tooltip.trigger = 'item'
      return options
    },
    drawGraph (type, rate) {
      this.setGraphSettings(type + 'Settings', rate)
      this[type + 'Chart'] = {
        columns: ['name', 'percent'],
        rows: [{
          name: '计划完成率',
          percent: rate
        }]
      }
    }
  },
  created () {
    this.$bus.on('IndexStationData', (v) => {
      this.monthData = v.body.month.data
      this.monthUnits = v.body.month.units
      this.yearData = v.body.year.data
      this.yearUnits = v.body.year.units
      this.monthRate = this.monthData.finish_r
      this.yearRate = this.yearData.finish_r
      this.drawGraph('month', this.monthRate ? this.monthRate / 100 : this.monthRate)
      this.drawGraph('year', this.yearRate ? this.yearRate / 100 : this.yearRate)
    })
  },
  mounted () {
    setTimeout(() => {
      this.$refs.monthChart.resize()
      this.$refs.yearChart.resize()
    }, 0)
  },
  components: {
    VeLiquidfill: Liquidfill,
    ElRow: Row,
    ElCol: Col
  }
}
</script>

<style lang="scss" scoped>
.completion-rate{
  color: white;
  font-size:12px;
  .lightwhite{
    color:rgba(255,255,255,0.7)
  }
  .font18{
    font-size:18px;
  }
  .m-b-10{
    margin-bottom:10px;
  }
  .m-b-15{
    margin-bottom:0.15rem;
  }
  .arrow{
    width: 0.14rem;
    margin: 0 8px;
    vertical-align: sub;
  }
  .label-name{
    position: absolute;
    top: 1.58rem;
    left:calc(50% - 2em);
  }
  .content{
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .content-middle{
        align-items: center;
        width:100%;
    }
  }
  .circle-bg{
    width:1.8rem;
    height: 1.8rem;
    margin: 0 auto;
    &.circle-bg1{
      background: url('../images/circle1.png') no-repeat;
      background-size: 66%;
      background-position: 50%;
    }
    &.circle-bg2{
      background: url('../images/circle2.png') no-repeat;
      background-size: 66%;
      background-position: 50%;
    }
    &.circle-bg3{
      background: url('../images/circle3.png') no-repeat;
      background-size: 66%;
      background-position: 50%;
    }
    &.circle-bg4{
      background: url('../images/circle4.png') no-repeat;
      background-size: 66%;
      background-position: 50%;
    }
  }
}
.el-row {
  height: 100%;
  .el-col{
    height: 100%;
  }
}
</style>
