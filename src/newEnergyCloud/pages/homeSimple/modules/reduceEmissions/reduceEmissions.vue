<template>
  <div class="reduce-emissions" v-loading="(getStationRtOverviewComDay.resNumber === 0) && getStationRtOverviewComDay.loading">
    <div class="item item1 pull-left">
      <div class="top pull-left">
        <div class="left pull-left">
          <div class="title">功率</div>
          <div class="content"><b>{{getStationRtOverviewComDay.res.body.day.data.acp ? getStationRtOverviewComDay.res.body.day.data.acp : getStationRtOverviewComDay.res.body.day.data.acp === 0 ? 0 : '-'}}</b>{{getStationRtOverviewComDay.res.body.day.units.acp ? getStationRtOverviewComDay.res.body.day.units.acp : ''}}</div>
        </div>
        <div class="right pull-right">
          <div class="title">累计发电量</div>
          <div class="content"><b>{{getStationRtOverviewComDay.res.body.accum.data.real_kwh_chk ? getStationRtOverviewComDay.res.body.accum.data.real_kwh_chk : getStationRtOverviewComDay.res.body.accum.data.real_kwh_chk === 0 ? 0 : '-'}}</b>{{getStationRtOverviewComDay.res.body.accum.units.real_kwh_chk ? getStationRtOverviewComDay.res.body.accum.units.real_kwh_chk : ''}}</div>
        </div>
      </div>
      <div class="bottom-con pull-left">
        <component :is="vw >= 1920 ? 'sun1920' : 'sun1366'"></component>
      </div>
    </div>
    <div class="item item2 pull-left">
      <div class="top pull-left">
        <div class="left pull-left">
          <div class="title">可供电动车：北京
            <div style="display: block;float: right;">上海</div>
            <i class="iconfont icon-left-right-switch"></i>
            </div>
          <div class="content">{{(getStationRtOverviewComDay.res.body.accum.data.real_kwh_chk_o && getStationRtOverviewComDay.res.body.day.data.dwOrigin) ? ((getStationRtOverviewComDay.res.body.accum.data.real_kwh_chk_o + getStationRtOverviewComDay.res.body.day.data.dwOrigin) / 18 * 100 / 2176 / 10000).toFixed(2) : '-'}}万次</div>
        </div>
      </div>
      <div class="bottom-con pull-left">
        <component :is="vw >= 1920 ? 'car1920' : 'car1366'"></component>
      </div>
    </div>
    <div class="item item3 pull-left">
      <div class="top pull-left">
        <div class="left pull-left">
          <div class="title">CO₂&nbsp;&nbsp; 减排
          </div>
          <div class="content"><b>{{getStationRtOverviewComDay.res.body.accum.data.co2 ? getStationRtOverviewComDay.res.body.accum.data.co2 : getStationRtOverviewComDay.res.body.accum.data.co2 === 0 ? 0 : '-'}}</b>{{getStationRtOverviewComDay.res.body.accum.units.co2 ? getStationRtOverviewComDay.res.body.accum.units.co2 : ''}}</div>
        </div>
      </div>
      <div class="bottom-con pull-left">
        <component :is="vw >= 1920 ? 'co21920' : 'co21366'"></component>
      </div>
    </div>
    <div class="item item4 pull-left">
      <div class="top pull-left">
        <div class="left pull-left">
          <div class="title">植树</div>
          <div class="content"><b>{{getStationRtOverviewComDay.res.body.accum.data.planted_tree ? getStationRtOverviewComDay.res.body.accum.data.planted_tree : getStationRtOverviewComDay.res.body.accum.data.planted_tree === 0 ? 0 : '-'}}</b>{{getStationRtOverviewComDay.res.body.accum.units.planted_tree ? getStationRtOverviewComDay.res.body.accum.units.planted_tree : ''}}</div>
        </div>
      </div>
      <div class="bottom-con pull-left">
        <component :is="vw >= 1920 ? 'o21920' : 'o21366'"></component>
      </div>
    </div>
  </div>
</template>

<script>
import { api＿getStationRtOverviewComDayPvWp } from '@newEnergyCloud/request/api'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
  mixins: [mixinWidthHeight],
  data () {
    return {
      timer: null,
      getStationRtOverviewComDay: api＿getStationRtOverviewComDayPvWp({
        later: true,
        res: {
          body: {
            day: {
              data: {},
              units: {}
            },
            accum: {
              data: {},
              units: {}
            }
          }
        }
      })
    }
  },
  components: {
    sun1920: () => import('./sun/1920'),
    sun1366: () => import('./sun/1366'),
    car1920: () => import('./car/1920'),
    car1366: () => import('./car/1366'),
    co21920: () => import('./co2/1920'),
    co21366: () => import('./co2/1366'),
    o21920: () => import('./o2/1920'),
    o21366: () => import('./o2/1366')
  },
  mounted () {
    this.getStationRtOverviewComDay.getData()
    this.timer = setInterval(() => {
      this.getStationRtOverviewComDay.getData()
    }, this.$store.getters.refresh_interval())

    this.getStationRtOverviewComDay.subscribe(res => {
      if (!res || !res.body) {
        this.getStationRtOverviewComDay.res = {
          body: {
            day: {
              data: {},
              units: {}
            },
            month: {
              data: {},
              units: {}
            },
            year: {
              data: {},
              units: {}
            },
            accum: {
              data: {},
              units: {}
            }
          }
        }
      }
      this.$bus.emit('IndexStationData', this.getStationRtOverviewComDay.res)
    })
  },
  beforeDestroy () {
    this.timer && clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.reduce-emissions {
  padding: 17px 0;
  .item {
    width: 32%;
    height: 100%;
    position: relative;
    padding: 0 .15rem;
    .top {
      width: 100%;
    }
    .bottom-con {
      position: absolute;
      bottom: 0;
      .bottom {
        height: 100%;
        text-align: center;
        position: relative;
      }
    }
    .title {
      color: rgba(255, 255, 255, .8);
      font-size: 12px;
    }
    .content {
      color: rgba(255, 255, 255, 1);
      font-size: 18px;
      padding-top: .1rem;
    }
  }
  .item1 {
    padding:0 .0rem 0 .1rem;
    .bottom-con {
      left: 50%;
      transform: translate(-50%);
    }
  }
  .item2 {
    width: 30%;
    .icon-left-right-switch {
      display: block;
      float: right;
      color: #4CD362;
      padding: 0 7px;
      margin-top: -2px;
    }
  }
  .item3 {
    width: 18%;
    padding-right: .05rem;
  }
  .item4 {
    width: 20%;
    padding-right: .1rem;
  }
}
</style>
