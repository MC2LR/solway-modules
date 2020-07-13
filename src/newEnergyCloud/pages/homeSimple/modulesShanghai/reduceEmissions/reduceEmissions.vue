<template>
  <div class="reduce-emissions" v-loading="(getStationRtOverviewComDay.resNumber === 0) && getStationRtOverviewComDay.loading">
    <div class="item item1 pull-left">
      <div class="total-power-word">
        <div class="title">累计发电 </div>
        <div class="content"><b>{{getStationRtOverviewComDay.res.body.accum.data.real_kwh_chk ? getStationRtOverviewComDay.res.body.accum.data.real_kwh_chk : getStationRtOverviewComDay.res.body.accum.data.real_kwh_chk === 0 ? 0 : '-'}}</b>{{getStationRtOverviewComDay.res.body.accum.units.real_kwh_chk ? getStationRtOverviewComDay.res.body.accum.units.real_kwh_chk : ''}}</div>
      </div>
      <div class="content-middle-con">
        <div class="content-middle">
          <div class="bottom-con">
            <component :is="vw >= 1920 ? 'sun1920' : 'sun1366'"></component>
          </div>
        </div>
      </div>
    </div>
    <div class="item item3 pull-left">
      <div class="co-word">
        <div class="title">CO₂&nbsp;&nbsp; 减排 </div>
        <div class="content"><b>{{getStationRtOverviewComDay.res.body.accum.data.co2 ? getStationRtOverviewComDay.res.body.accum.data.co2 : getStationRtOverviewComDay.res.body.accum.data.co2 === 0 ? 0 : '-'}}</b>{{getStationRtOverviewComDay.res.body.accum.units.co2 ? getStationRtOverviewComDay.res.body.accum.units.co2 : ''}}</div>
      </div>
      <div class="content-middle-con">
        <div class="content-middle">
          <div class="bottom-con">
            <component :is="vw >= 1920 ? 'co21920' : 'co21366'"></component>
          </div>
        </div>
      </div>
    </div>
    <div class="item item4 pull-left">
      <div class="tree-word">
        <div class="title">植树</div>
        <div class="content"><b>{{getStationRtOverviewComDay.res.body.accum.data.planted_tree ? getStationRtOverviewComDay.res.body.accum.data.planted_tree : getStationRtOverviewComDay.res.body.accum.data.planted_tree === 0 ? 0 : '-'}}</b>{{getStationRtOverviewComDay.res.body.accum.units.planted_tree ? getStationRtOverviewComDay.res.body.accum.units.planted_tree : ''}}</div>
      </div>
      <div class="content-middle-con">
        <div class="content-middle">
          <div class="bottom-con">
            <component :is="vw >= 1920 ? 'o21920' : 'o21366'"></component>
          </div>
        </div>
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
      // this.$bus.emit('IndexStationData', this.getStationRtOverviewComDay.res)
    })
  },
  beforeDestroy () {
    this.timer && clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.reduce-emissions {
  padding: 0 0.3rem 0 0.15rem;
  font-size: 14px;
  .item {
    height: 100%;
    position: relative;
    padding: 0 .05rem;
    .content-middle-con{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .content-middle{
        width:80%;
        align-items: center;
      }
    }
    .top {
      width: 100%;
    }
    .bottom-con {
      position: relative;
      .bottom {
        height: 100%;
        position: relative;
        position: relative;
        bottom: 0;
        transform: translate(-50%);
        left: 50%;
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
    width: 32%;
    max-width:300px;
    .total-power-word{
      position: absolute;
      right: -4.4em;
      top:calc(50% - 3em);
      width: 7em;
    }
    .bottom-con {
      .bottom {
        bottom: 0rem;
      }
    }
  }
  .item3 {
    width: 32%;
    .co-word{
      position: absolute;
      left: calc(50% + 3em);
      top:calc(50% - 3em);
      width: 7em;
    }
    .bottom-con {
      .bottom {
        bottom: -0.2rem;
      }
    }
  }
  .item4 {
    width: 33%;
    .tree-word{
      position: absolute;
      left: calc(50% + 3em);
      top:calc(50% - 3em);
      width: 7em;
    }
    .bottom-con {
      .bottom {
        bottom: -0.2rem;
      }
    }
  }
}
</style>
