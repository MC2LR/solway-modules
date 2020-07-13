<template>
  <div class="daily-output">
    <div class="title" v-if="stationTypeNum === 1 && data[currentStationType]">
      <span class="light-white" style="margin-right:0.1rem;">电站数量</span>
      <span class="font18">{{data[currentStationType].powerStationNum}}<span class="font12">个</span></span>
      <span class="light-white" style="margin: 0 0.1rem 0 0.8rem;">电站容量</span>
      <span class="font18">{{data[currentStationType].installedCapacity[0]}}<span class="font12">{{data[currentStationType].installedCapacity[1]}}</span></span>
    </div>
    <div class="title" v-if="stationTypeNum === 2">
      <el-row>
        <el-col :span="12" v-if="data['01']">
          <span class="light-white" style="margin-right:0.05rem;">光伏电站</span>
          <span class="font18">{{data['01'].powerStationNum}}<span class="font12">个</span></span>
          <span class="light-white" style="margin: 0 0.05rem 0 0.2rem;">容量</span>
          <span class="font18">{{data['01'].installedCapacity[0]}}<span class="font12">{{data['01'].installedCapacity[1]}}</span></span>
        </el-col>
        <el-col :span="12" v-if="data['02']">
          <span class="light-white" style="margin-right:0.05rem;margin-left:0.3rem;">风电场</span>
          <span class="font18">{{data['02'].powerStationNum}}<span class="font12">个</span></span>
          <span class="light-white" style="margin: 0 0.05rem 0 0.2rem;">容量</span>
          <span class="font18">{{data['02'].installedCapacity[0]}}<span class="font12">{{data['02'].installedCapacity[1]}}</span></span>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <div class="content-middle">
        <div class="odometer-block">
          <div class="odometer zdy-theme" id="odometer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addCss, addJs } from '@comm/tools/addCssJs'
import { independent } from '@comm/tools/env'
import { api＿getRunBaseInfoAll } from '@newEnergyCloud/request/api'
import {Row, Col} from 'element-ui'
const staticSrc = independent ? '/static/static-newEnergyCloud' : '/module/newEnergyCloud/static'
addCss(staticSrc + '/odometer/odometer-theme-car.css')
const $ = window.$
export default {
  data () {
    return {
      stationTypeNum: 1,
      currentStationType: '',
      data: {
        installedCapacity: []
      },
      // runBaseInfo: api＿runBaseInfo({
      //   later: true,
      //   onlyLatest: true
      // }),
      getRunBaseInfoAll: api＿getRunBaseInfoAll({
        later: true,
        onlyLatest: true
      })
    }
  },
  methods: {
    hideNum0 () {
      let has = false
      let styleText = ''
      $('#odometer .odometer-value').each(function (index) {
          const $this = $(this)
          if (!has && $this.text() === '0') {
            styleText += `.daily-output #odometer .odometer-digit:nth-child(${index + 1}) .odometer-value{color: transparent;}`
          } else {
            styleText += `.daily-output #odometer .odometer-digit:nth-child(${index + 1}) .odometer-value{color: #28EEEF;}`
            has = true
          }
      })
      let nod = document.createElement('style')
      nod.type = 'text/css'
      if (nod.styleSheet) {
        nod.styleSheet.cssText = styleText
      } else {
        nod.innerHTML = styleText
      }
      document.getElementsByTagName('head')[0].appendChild(nod)
    },
    initData (value) {
        if (this._isDestroyed) return
      if (!this.od) {
        this.od = new window.Odometer({
          el: document.getElementById('odometer'),
          value: 10000000
        })
      }
      this.od.update(10000000 + (+value.toFixed()) + '')
      this.hideNum0()
      setTimeout(() => {
        this.hideNum0()
      }, 2500)
    },
    getData () {
      // this.runBaseInfo.getData({date: new Date().Format('yyyy-MM-dd')})
      this.getRunBaseInfoAll.getData({date: new Date().Format('yyyy-MM-dd')})
    },
    stationClass () {
      const list = this.$store.getters.station_class_list
      this.stationTypeNum = list.length
      if (this.stationTypeNum === 1) this.currentStationType = list[0].id
    }
  },
  created () {
    this.stationClass()
    // this.runBaseInfo.subscribe((res) => {
    //   this.data = res.body
    //   this.$nextTick(() => {
    //       this.initData(this.data.real_kwh_chk)
    //   })
    // })
    this.getRunBaseInfoAll.subscribe(res => {
      this.data = res.body
      this.$nextTick(() => {
        this.initData(this.data.real_kwh_chk)
      })
    })
    addJs(staticSrc + '/odometer/odometer.js', () => {
        this.getData()
    })
  },
  mounted () {
    this.interval = setInterval(() => {
      this.getData()
    }, this.$store.getters.refresh_interval())
  },
  components: {
    ElRow: Row,
    ElCol: Col
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>
<style lang="scss">
.odometer-block {
    p {
      color: #8beaea;
    }
    .odometer.odometer-auto-theme .odometer-digit .odometer-digit-spacer{
      visibility: visible;
      color: #528FBD;
      opacity: 0.15;
      height: 0.4rem;;
    }
    .zdy-theme {
      color: #28EEEF;
      font-family: 'kuhei';
      font-size: 0.50rem;
      line-height: 1;
      height: 1em;
      text-align: center;
      position: relative; // overflow: hidden;

      &::before {
          content: '当日发电';
          display: inline-block;
          position: absolute;
          left: 0.2rem;
          bottom: 0.15rem;
          font-family: 'font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;';
          color: white;
          font-size: 16px;
      }

      &::after {
          content: '度';
          display: inline-block;
          position: absolute;
          right: 0.75rem;
          bottom: 0.13rem;
          font-family: 'font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;';
          color: white;
          font-size: 16px;
      }
      .odometer-digit {
          background: #081929 linear-gradient(0deg, rgba(109, 205, 236, 1), rgba(78, 168, 198, 0.5), rgba(78, 168, 198, 0.27), rgba(78, 168, 198, 0.27), rgba(78, 168, 198, 0.5), rgba(109, 205, 236, 1));
          margin-right: 0.12rem;
          padding: 0.04rem 0.05rem;
          height: 0.58rem;
          width: 0.4rem;
          background: url("../images/themeMonitoringNumBg.png") no-repeat;
          background-size: 100%;
          overflow: hidden;

          &:first-child {
              border-radius: 0;
          }
          // .odometer-digit-spacer {
          //     visibility: visible;
          //     color: #528FBD;
          //     opacity: 0.15;
          // }
          .odometer-digit-inner {
            transform: translateX(0.08rem) translateY(0.08rem);
          }
        }
    }
  }
</style>
<style lang="scss" scoped>
.daily-output {
  color: white;
  .light-white{
    color:rgba(255,255,255,0.7);
  }
  .font18{
    font-size:18px;
  }
  .title{
    padding:0.16rem 0.2rem 0;
    font-size:12px;
  }
  .content{
    height: calc(100% - 0.4rem);
    display: flex;
    align-items: center;
    justify-content: center;
    .content-middle{
        align-items: center;
        width:100%;
    }
  }
}
</style>
