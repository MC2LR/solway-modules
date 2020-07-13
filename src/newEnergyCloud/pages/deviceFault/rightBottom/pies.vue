<template>
  <div class="pies">
      <div class="title">故障损失占比</div>
      <div class="pie-con">
          <div class="item pull-left" v-loading='loading'>
            <ve-pie
                :data="chartData1"
                :after-config="afterConfig1"
            ></ve-pie>
          </div>
          <div class="item pull-left" v-loading='loading'>
            <ve-pie
                :data="chartData2"
                :after-config="afterConfig2"
            ></ve-pie>
          </div>
      </div>
  </div>
</template>

<script>
import {rem} from '@comm/mixin'
import theme from '../theme/theme'

export default {
    mixins: [rem, theme],
    data () {
      return {
          loading: true,
          chartData1: {
            columns: ['设备', '百分比'],
            rows: []
          },
          chartData2: {
            columns: ['故障', '百分比'],
            rows: []
          }
      }
    },
    created () {
        this.$bus.on('emptyData', this.emptyData)
        this.$bus.on('piesData', this.getData)
        this.$bus.on('piesLoading', this.piesLoading)
    },
    methods: {
        piesLoading (loading) {
            this.loading = loading
        },
        getData (data) {
            this.loading = false
            this.chartData1.rows = [
                { '设备': data.deviceName, '百分比': data.device_fail_percent },
                { '设备': '其他设备', '百分比': 1 - data.device_fail_percent }
            ]
            this.chartData2.rows = [
                { '故障': data.faultDesc, '百分比': data.fault_percent },
                { '故障': '其他故障', '百分比': 1 - data.fault_percent }
            ]
        },
        emptyData (data) {
            this.loading = false
            this.chartData1.rows = []
            this.chartData2.rows = []
            // this.chartData1.rows = [
            //     { '设备': '-', '百分比': 0 },
            //     { '设备': '其他设备', '百分比': 0 }
            // ]
            // this.chartData2.rows = [
            //     { '故障': '-', '百分比': 0 },
            //     { '故障': '其他故障', '百分比': 0 }
            // ]
        },
        afterConfig1 (options) {
            const _this = this
            options.tooltip = {
                trigger: 'item',
                formatter: '{b} : ({d}%)'
            }
            options.legend = {
                orient: 'vertical',
                icon: 'circle',
                right: 0,
                top: 55,
                textStyle: {
                    color: this.theme.$textColor
                },
                formatter: function (name) {
                    let curValue = ''
                    _this.chartData1.rows.forEach((v, i) => {
                        if (v['设备'] === name) curValue = v['百分比']
                    })
                    let nameShort = name.length > 4 ? name.substr(0, 3) + '..' : name
                    return nameShort + ' ' + parseFloat((curValue * 100).toFixed(2)) + '%'
                }
            }
            new Array(1).fill(0).forEach((v, i) => {
                options.series[i].radius = ['24%', '35%']
                options.series[i].center = ['22%', '20%']
                // options.series[i].roseType = 'radius'
                options.series[i].label = {
                    show: false
                }
            })
            return options
        },
        afterConfig2 (options) {
            const _this = this
            options.tooltip = {
                trigger: 'item',
                formatter: '{b} : ({d}%)'
            }
            options.legend = {
                orient: 'vertical',
                icon: 'circle',
                right: 0,
                top: 55,
                textStyle: {
                    color: this.theme.$textColor
                },
                formatter: function (name) {
                    let curValue = ''
                    _this.chartData2.rows.forEach((v, i) => {
                        if (v['故障'] === name) curValue = v['百分比']
                    })
                    let nameShort = name.length > 4 ? name.substr(0, 3) + '..' : name
                    return nameShort + ' ' + parseFloat((curValue * 100).toFixed(2)) + '%'
                }
            }
            new Array(1).fill(0).forEach((v, i) => {
                options.series[i].radius = ['24%', '35%']
                options.series[i].center = ['27%', '20%']
                // options.series[i].roseType = 'radius'
                options.series[i].label = {
                    show: false
                }
            })
            return options
        }
    },
    beforeDestroy () {
        this.$bus.off('emptyData', this.emptyData)
        this.$bus.off('piesData', this.getData)
        this.$bus.off('piesLoading', this.piesLoading)
    }
}
</script>

<style lang="scss" scoped>
@import '../theme/theme.scss';
.pies {
    height: calc(100% - 86px);
    .title {
        font-size: 16px;
        color: #73767C;
        @include page_c(color, $pageHeadSectionWordColor);
        margin-top: .2rem;
        margin-bottom: .1rem;
    }
    .pie-con {
        width: calc(100% + 40px);
        margin-left: -20px;
        height: calc(100% - 16px - .1rem);
        .item {
            width: 50%;
            height: 100%;
            >.ve-pie {
                height: 100% !important;
                top: -25px;
            }
        }
    }
}
</style>
