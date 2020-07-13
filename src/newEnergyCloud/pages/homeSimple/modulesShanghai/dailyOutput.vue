<template>
    <div class="daily-output-shanghai">
        <div class="content">
            <div class="content-middle">
                <!-- <div class="odometer-block" style="margin-bottom:0.2rem;position:relative;">
                    <div class="odometer zdy-theme total-zdy" id="odometer1" :data-unit="totalUnit"></div>
                </div> -->
                <div style="width:100%;position:relative;left:-26px;">
                    <div class="block-title">
                        <span class="vertical-line line-s"></span>
                        <span class="vertical-line line-m"></span>
                        <span class="vertical-line line-l"></span>
                        当日发电
                    </div>
                    <div class="odometer-block">
                        <div class="odometer zdy-theme day-zdy" id="odometer"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { addCss, addJs } from '@comm/tools/addCssJs'
import { independent } from '@comm/tools/env'
import { api＿getRunBaseInfoAll } from '@newEnergyCloud/request/api'
const staticSrc = independent ? '/static/static-newEnergyCloud' : '/module/newEnergyCloud/static'
addCss(staticSrc + '/odometer/odometer-theme-car.css')
const $ = window.$
export default {
    data () {
        return {
            // totalKwh: '',
            // totalUnit: '',
            interval: null,
            getRunBaseInfoAll: api＿getRunBaseInfoAll({
                later: true,
                onlyLatest: true
            })
        }
    },
    methods: {
        initData () {
            this.getRunBaseInfoAll.getData({date: new Date().Format('yyyy-MM-dd')})
        },
        hideNum0 (type) {
            let has = false
            let styleText = ''
            $('#odometer' + type + ' .odometer-value').each(function (index) {
                const $this = $(this)
                if (!has && $this.text() === '0') {
                    styleText += `.daily-output #odometer${type} .odometer-digit:nth-child(${index + 1}) .odometer-value{color: transparent;}`
                } else {
                    styleText += `.daily-output #odometer${type} .odometer-digit:nth-child(${index + 1}) .odometer-value{color: #28EEEF;}`
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
        drawData (value) {
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
        }
        // drawData1 (value) {
        //     if (!this.od1) {
        //         this.od1 = new window.Odometer({
        //             el: document.getElementById('odometer1'),
        //             value: 10000000
        //         })
        //     }
        //     this.od1.update(10000000 + (+value.toFixed()) + '')
        //     this.hideNum0(1)
        //     setTimeout(() => {
        //         this.hideNum0(1)
        //     }, 2500)
        // }
    },
    created () {
        addJs(staticSrc + '/odometer/odometer.js', () => {
            this.initData()
        })
        this.getRunBaseInfoAll.subscribe(res => {
            this.$nextTick(() => {
                this.drawData(res.body.real_kwh_chk)
            })
        })
        // this.$bus.on('IndexStationData', (v) => {
        //     this.totalKwh = v?.body?.accum?.data ? v.body.accum.data.real_kwh_chk : '-'
        //     this.drawData1(this.totalKwh)
        //     this.totalUnit = v?.body?.accum?.units ? v.body.accum.units.real_kwh_chk : '-'
        // })
    },
    mounted () {
        this.interval = setInterval(() => {
            this.initData()
        }, this.$store.getters.refresh_interval())
    },
    beforeDestroy () {
        if (this.interval) clearInterval(this.interval)
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
        left: 20px;
        &.total-zdy::before {
            content: '累计发电量';
            display: inline-block;
            position: absolute;
            left: 0.05rem;
            bottom: 0.15rem;
            font-family: 'font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;';
            color: white;
            font-size: 16px;
        }

        &.total-zdy::after {
            content: attr(data-unit);
            display: inline-block;
            width: 4em;
            text-align: left;
            position: absolute;
            right: 0.3rem;
            bottom: 0.13rem;
            font-family: 'font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;';
            color: white;
            font-size: 16px;
        }
        // &.day-zdy::before {
        //     content: '当日发电';
        //     display: inline-block;
        //     position: absolute;
        //     left: 0.2rem;
        //     bottom: 0.15rem;
        //     font-family: 'font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;';
        //     color: white;
        //     font-size: 16px;
        // }

        &.day-zdy::after {
            content: '度';
            width: 4em;
            text-align: left;
            display: inline-block;
            position: absolute;
            right: 0.3rem;
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
            .odometer-digit-inner {
                transform: translateX(0.08rem) translateY(0.08rem);
            }
        }
    }
  }
</style>
<style lang="scss" scoped>
.daily-output-shanghai {
    font-size: 0;
    .content{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .content-middle{
            align-items: center;
            width:100%;
        }
    }
    .block-title{
        text-align: center;
        font-size:24px;
        color: #03F8FE;
        margin-bottom: 15px;
        .vertical-line{
            display: inline-block;
            width:3px;
            &.line-l{
                height:18px;
                background: rgba(3,248,254,0.8);
                margin-right: 16px;
            }
            &.line-m{
                height:12px;
                background: rgba(3,248,254,0.5);
            }
            &.line-s{
                height:8px;
                background: rgba(3,248,254,0.3);
            }
        }
    }
}
</style>
