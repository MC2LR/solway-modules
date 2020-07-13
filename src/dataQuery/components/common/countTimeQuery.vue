<template>
  <div class="count-time-query" @mouseenter="showPop()" @mouseleave="hidePop()">
    <div class="ctime-pop-tpl" v-show="countPopShow">
      <!-- 上部单选区域 -->
      <div class="radioBox">
        <label class="group-radio" v-for="(item,index) in ctimeRadioArr" :key="index">
          <input
            type="radio"
            name="group"
            :value="index"
            v-model="radioIndex"
            @change="checkType(item.v)"
          />
          <i></i>
          <span style="vertical-align: middle;">{{item.v}}</span>
        </label>
        <select name="" v-model="trIndex" @change="getTimeRange()">
          <option :value="item.k" v-for="(item,index) in timeRangeArr" :key="index">{{item.v}}</option>
        </select>
      </div>
      <!-- 选择区域 -->
      <div class="choose-box">
        <!-- 左侧选择区域 -->
        <div class="chooseLeftWrap">
          <div class="chooseLeft">
            <!-- 列表 -->
            <div class="checkbox-wrap">
              <!-- 流经时间 -->
              <div class="countTime-item" v-show="radioIndex==0">
                <input type="text" id="cander1" class="laydate1" v-if="TimeFlag" @click="popTimeRange()"/>
                <i class="iconfont iconrili1" style="margin-left:5px;font-size:15px;color:#33B7A8"></i>
              </div>
              <!-- 开始时间 -->
              <div class="countTime-item" v-show="radioIndex==1">
                <input type="text" id="cander2" class="laydate1" v-if="TimeFlag" @click="popTimeRange()"/>
                <i class="iconfont iconrili1" style="margin-left:5px;font-size:15px;color:#33B7A8"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 按钮 -->
      <!-- <div class="confirm" @click="confirm()">确定</div>
      <div class="cancel-btn" @click="cancel()">取消</div> -->
    </div>
  </div>
</template>

<script>
import { locationOrigin } from '@dataQuery/tools/env'
import addCssJs, { deleteFile } from '@comm/tools/addCssJs'

export default {
  name: 'countTimeQuery',
  props: ['countPopShow'],
  data () {
    return {
      radioIndex: 0,
      TimeFlag: true,
      ctimeRadioArr: [
        {
          k: 0,
          v: '流经时间'
        },
        {
          k: 1,
          v: '开始时间'
        }
      ],
      timeRange: '',
      startTime: '',
      endTime: '',
      trIndex: 1,
      timeRangeArr: [
        {
          k: 1,
          v: '今日'
        },
        {
          k: 0,
          v: '今日以前'
        }
      ]
    }
  },
  mounted () {
    // 获取默认时间
    this.checkTimeRange()

    // 发送默认数据
    this.confirm()
    // 重置时间
    this.$bus.on('resetTime', this.resetTime)
  },
  methods: {
    resetTime () {
      this.trIndex = 1
      this.checkTimeRange()
      this.confirm()
    },
    popTimeRange () {
      const _this = this
      setTimeout(() => {
        document.getElementsByClassName('layui-laydate')[0].onmouseover = function () {
          _this.$emit('listenHover')
        }
      }, 0)
    },
    // 格式化时间
    FormatDateTime (UnixTime) {
      var date = new Date(UnixTime)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      var second = date.getSeconds()
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? ('0' + second) : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    },
    // 切换select
    getTimeRange () {
      this.checkTimeRange()
    },
    // 切换select -> 切换时间范围
    checkTimeRange () {
      const _this = this
      // layui日历

      var startTime, endTime, TimeMin, TimeMax, yesterday
      if (this.trIndex === 1) {
        startTime = this.FormatDateTime(
          new Date(new Date(new Date().toLocaleDateString()).getTime())
        )
        endTime = this.FormatDateTime(new Date())
        TimeMin = startTime
        TimeMax = endTime
      } else {
        yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        yesterday.setHours(23, 59, 59, 999)

        startTime = this.FormatDateTime(
          new Date(new Date(yesterday.toLocaleDateString()).getTime())
        )
        endTime = new Date(yesterday)
        endTime.setHours(23, 59, 59, 999)
        endTime = this.FormatDateTime(endTime)

        TimeMin = '1900-01-01 00:00:00'
        TimeMax = this.FormatDateTime(yesterday)
      }
      // .substring(0, startTime.length - 3)
      this.startTime = startTime
      this.endTime = endTime
      this.TimeFlag = false

      addCssJs([
        locationOrigin + '/laydate/css/laydate.css',
        locationOrigin + '/laydate/js/laydate.js'
      ])
        .then(() => {
          this.TimeFlag = true
        })
        .then(() => {
          // 流经时间
          window.laydate.render({
            elem: '#cander1',
            type: 'datetime',
            range: true,
            theme: '#245182',
            trigger: 'click',
            min: TimeMin,
            max: TimeMax,
            value: startTime + ' - ' + endTime,
            done: function (value, date, endDate) {
              var timrArr = value.split(' - ')
              _this.startTime = timrArr[0]
              _this.endTime = timrArr[1]
              _this.confirm()
            }
          })
          // 开始时间
          window.laydate.render({
            elem: '#cander2',
            type: 'datetime',
            range: true,
            theme: '#245182',
            trigger: 'click',
            min: TimeMin,
            max: TimeMax,
            value: startTime + ' - ' + endTime,
            done: function (value, date, endDate) {
              var timrArr = value.split(' - ')
              _this.startTime = timrArr[0]
              _this.endTime = timrArr[1]
              _this.confirm()
            }
          })
        })
    },
    // 点击单选按钮
    checkType (name) {
      this.$emit('listenRadioName', {
        name: name,
        radioIndex: this.radioIndex
      })
    },
    // 点击取消按钮
    cancel () {
      this.$emit('listenCtFlag', false)
    },
    // 点击确定按钮
    confirm () {
      this.$emit('listenTime', {
        startTime: this.startTime,
        endTime: this.endTime,
        radioIndex: this.radioIndex,
        trIndex: this.trIndex
      })
      this.$emit('listenCtFlag', false)
    },
    // 鼠标移入
    showPop () {
      this.$emit('listenHover')
    },
    // 鼠标移出
    hidePop () {
      this.$emit('listenleave')
    }
  },
  beforeDestroy () {
    this.$bus.off('resetTime', this.resetTime)
    deleteFile([
        locationOrigin + '/laydate/css/laydate.css',
        locationOrigin + '/laydate/js/laydate.js'
    ])
  }
}
</script>

<style lang="scss">
/* layui样式 */
.laydate {
  .laydate-theme-molv .layui-laydate-content {
    background: #245182 !important;
    border: none;
  }

  .layui-laydate-list {
    background: #245182;
  }

  .laydate-month-list > li,
  .laydate-year-list > li {
    color: #fff;
  }

  .layui-laydate,
  .layui-laydate-hint {
    box-shadow: none;
  }

  .layui-laydate-content th {
    color: #fff;
  }

  .layui-laydate-content td {
    color: #fff;
  }

  .layui-laydate-content .laydate-day-next,
  .layui-laydate-content .laydate-day-prev {
    color: #666;
  }

  .layui-laydate .laydate-disabled {
    color: #666 !important;
  }

  .laydate-theme-molv .layui-laydate-footer {
    background: #245182;
    border: none;
  }

  .laydate-footer-btns span {
    color: #245182;
    background: none;
    border: none;
  }

  .laydate-footer-btns {
    right: 42%;
  }

  .laydate-footer-btns span.laydate-btns-now {
    color: #49dfb6;
  }

  .laydate-footer-btns span.laydate-btns-confirm {
    display: none;
  }

  .layui-laydate#layui-laydate1 .layui-this {
    background-color: #49dfb6 !important;
    color: #fff !important;
  }

  .layui-laydate#layui-laydate2 .layui-this {
    background-color: #49dfb6 !important;
    color: #fff !important;
  }

  .layui-laydate#layui-laydate3 .layui-this {
    background-color: #49dfb6 !important;
    color: #fff !important;
  }
}
</style>

<style lang="scss" scoped>
#cander1,
#cander2 {
  border: 1px solid #396faa;
  background: rgba(13, 46, 85, 1);
  border-radius: 2px;
  text-align: center;
  color: #fff;
  width: 150px;
  height: 20px;
  font-size: 12px;
  padding: 1px 5px;
  outline: none;
  opacity: 0.7;
}
.ctime-pop-tpl {
  background: rgba(57, 111, 170, 1);
  border-radius: 2px;
  padding: 25px;
  padding-bottom: 20px;
  position: absolute;
  top: 33px;
  left: -90px;
  z-index: 111;
  &::before {
    content: '';
    display: inline-block;
    width: 150px;
    height: 5px;
    background: rgba(57, 111, 170, 1);
    position: absolute;
    top: -5px;
    left: 155px;
  }
  select {
    width: 88px;
    background: #0d3463;
    color: rgba(255, 255, 255, 0.8);
    text-align-last: center;
    height: 28px;
    line-height: 28px;
    border: 1px solid #5f92c8;
    margin-left: 12px;
    outline: none;
    margin-top: -5px;
  }
  .search-con {
    display: inline-block;
    position: relative;
    margin-bottom: 15px;
    input {
      text-indent: 1em;
      height: 20px;
      width: 210px;
      line-height: 21px;
      border: 1px solid rgba(88, 155, 231, 0.6);
      border-radius: 2px;
      background-color: rgba(23, 62, 106, 0.8);
      color: rgba(255, 255, 255, 0.8);
      outline: none;
    }
    i {
      position: absolute;
      cursor: pointer;
      width: 40px;
      text-align: center;
      height: 30px;
      right: 0;
      top: 0px;
      line-height: 25px;
    }
  }
  .group-radio {
    display: inline-block;
    width: 110px;
    margin-bottom: 10px;
    & input {
      opacity: 0;
      position: absolute;
    }
    & span {
      font-size: 14px;
      margin-left: 3px;
    }
    & i {
      display: inline-block;
      width: 18px;
      height: 18px;
      background: rgba(22, 54, 95, 0.27);
      border: 1px solid rgba(20, 54, 98, 1);
      border-radius: 9px;
      position: relative;
      vertical-align: middle;
    }
    & i:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 0;
      height: 0;
      transition: all 0.2s;
      background-color: transparent;
    }
    & input:checked + i {
      border: 1px solid #1caf9a;
    }
    & input:checked + i:before {
      width: 10px;
      height: 10px;
      background: #1caf9a;
      left: 3px;
      top: 3px;
      border-radius: 50%;
    }
  }
  .radioBox {
    display: flex;
    flex-direction: row;
    font-size: 12px;
  }
  .choose-box {
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .chooseLeftWrap {
      height: 150px;
      overflow: hidden;
      background: rgba(36, 81, 130, 1);
      .chooseLeft {
        min-width: 320px;
        height: 150px;
        padding: 15px;
        .checkbox-wrap .countTime-item {
          margin-bottom: 4px;
          position: relative;
          display: flex;
          align-items: center;
          input {
            flex: 1;
          }
          .next-m {
            width: 16px;
            height: 16px;
            background: rgba(255, 255, 255, 1);
            border-radius: 2px;
            position: absolute;
            top: 17px;
            right: 23px;
            z-index: 2;
            cursor: pointer;
          }
          .pre-m {
            left: 21px;
          }
          .zhe-prev {
            width: 70px;
            height: 31px;
            background: rgba(36, 81, 130, 1);
            position: absolute;
            top: 9px;
            z-index: 1;
          }
          .zhe-next {
            right: 15px;
          }
        }
      }
    }
    .chooseRight {
      width: 254px;
      background: rgba(36, 81, 130, 1);
      padding: 17px 30px 15px 30px;
      .deleteAll {
        color: rgba(255, 109, 109, 1);
        float: right;
        cursor: pointer;
      }
      .cRlist {
        margin-top: 10px;
        width: 223px;
        height: 290px;
        overflow-y: scroll;
        .cRlistTime-con {
          margin-bottom: 8px;
          .cRlist-time {
            display: inline-block;
            border: 1px solid #396faa;
            background: rgba(13, 46, 85, 1);
            text-align: center;
            font-size: 12px;
            line-height: 18px;
            padding: 2px 5px;
          }
        }
      }
    }
  }
  .confirm {
    float: right;
    width: 50px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    background: rgba(34, 180, 140, 1);
    border-radius: 2px;
    margin-top: 10px;
    cursor: pointer;
  }
  .cancel-btn {
    float: right;
    width: 50px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    background: rgba(46, 85, 136, 1);
    border: 1px solid rgba(20, 54, 98, 1);
    border-radius: 2px;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
