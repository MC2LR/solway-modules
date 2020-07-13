<template>
  <div class="count-time" @mouseenter="showPop()" @mouseleave="hidePop()">
    <div class="ctime-pop-tpl" v-show="countPopShow">
      <!-- 上部单选区域 -->
      <div class="radioBox">
        <label class="group-radio" v-for="(item,index) in ctimeRadioArr" :key="index">
          <input type="radio" name="group" :value="item.k" v-model="radioIndex" @click="checkType(item)"/>
          <i></i>
          <span style="vertical-align: middle;">{{item.v}}</span>
        </label>
      </div>
      <!-- 选择区域 -->
      <div class="choose-box">
        <!-- 左侧选择区域 -->
        <div class="chooseLeftWrap">
          <div class="chooseLeft">
            <!-- 列表 -->
            <div class="checkbox-wrap">
              <!-- 日 -->
              <div class="countTime-item" v-show="radioIndex==3">
                <div class="next-m" @click="nextD()">
                  <i
                    class="iconfont iconwangyou"
                    style="font-size:12px;color:rgba(17, 42, 68, 1);margin-left: 2px;"
                  ></i>
                </div>
                <div class="next-m pre-m" @click="preD()">
                  <i
                    class="iconfont iconwangzuo-"
                    style="font-size:12px;color:rgba(17, 42, 68, 1);margin-left: 2px;"
                  ></i>
                </div>
                <div class="zhe-prev" style="left:15px"></div>
                <div class="zhe-prev zhe-next"></div>
                <div id="cander1" class="laydate"></div>
              </div>
              <!-- 月 -->
              <div class="countTime-item" v-show="radioIndex==2">
                  <div class="next-m" @click="nextM()">
                      <i class="iconfont iconwangyou"
                          style="font-size:12px;color:rgba(17, 42, 68, 1);margin-left: 2px;"></i>
                  </div>
                  <div class="next-m pre-m" @click="preM()">
                      <i class="iconfont iconwangzuo-"
                          style="font-size:12px;color:rgba(17, 42, 68, 1);margin-left: 2px;"></i>
                  </div>
                  <div class="zhe-prev" style="left:15px"></div>
                  <div class="zhe-prev zhe-next"></div>
                  <div id="cander2" class="laydate"></div>
              </div>
              <!-- 年 -->
              <div class="countTime-item" v-show="radioIndex==1">
                  <div class="next-m" @click="nextY()">
                      <i class="iconfont iconwangyou"
                          style="font-size:12px;color:rgba(17, 42, 68, 1);margin-left: 2px;"></i>
                  </div>
                  <div class="next-m pre-m" @click="preY()">
                      <i class="iconfont iconwangzuo-"
                          style="font-size:12px;color:rgba(17, 42, 68, 1);margin-left: 2px;"></i>
                  </div>
                  <div class="zhe-prev" style="left:15px"></div>
                  <div class="zhe-prev zhe-next"></div>
                  <div id="cander3" class="laydate"></div>
              </div>
              <!-- 自定义 -->
              <div class="countTime-item" v-show="radioIndex==4" style="margin-top: 20px;">
                  <input type="text" id="cander4" class="laydate1" @click="popTimeRange()">
                  <i class="iconfont iconrili1" style="font-size:15px;color:#33B7A8"></i>
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧选择区域 -->
        <div class="chooseRight">
            <div class="cRtop">
                <span
                    style="display:inline-block;width:5px;height:5px;background:rgba(56,218,208,1);border-radius:50%;margin-bottom: 3px;margin-right: 5px;"></span>
                <span>已选择</span>
                <div class="deleteAll" @click="delRightAll()">
                    <i class="iconfont icon-shanchu1" style="font-size:12px;"></i>
                    全部删除
                </div>
            </div>
            <div style="overflow:hidden;width: 200px;">
                <div class="cRlist">
                    <!-- 日 -->
                    <div class="cRlistTime-con" v-for="(item,index) in timeGroupDay" :key="'day'+index"
                        v-show="radioIndex==3">
                        <i class="iconfont iconguanbi"
                            style="font-size:12px;cursor: pointer;color: rgba(255, 101, 101, 1);margin-right: 3px;"
                            @click="delRight(index)"></i>
                        <span class="cRlist-time">{{item}}</span>
                    </div>
                    <!-- 月 -->
                    <div class="cRlistTime-con" v-for="(item,index) in timeGroupMonth" :key="'month'+index"
                        v-show="radioIndex==2">
                        <i class="iconfont iconguanbi"
                            style="font-size:12px;cursor: pointer;color: rgba(255, 101, 101, 1);margin-right: 3px;"
                            @click="delRight(index)"></i>
                        <span class="cRlist-time">{{item}}</span>
                    </div>
                    <!-- 年 -->
                    <div class="cRlistTime-con" v-for="(item,index) in timeGroupYear" :key="'year'+index"
                        v-show="radioIndex==1">
                        <i class="iconfont iconguanbi"
                            style="font-size:12px;cursor: pointer;color: rgba(255, 101, 101, 1);margin-right: 3px;"
                            @click="delRight(index)"></i>
                        <span class="cRlist-time">{{item}}</span>
                    </div>
                    <!-- 自定义 -->
                    <div class="cRlistTime-con" v-for="(item,index) in timeGroupUser" :key="'user'+index"
                        v-show="radioIndex==4">
                        <i class="iconfont iconguanbi"
                            style="font-size:12px;cursor: pointer;color: rgba(255, 101, 101, 1);margin-right: 3px;"
                            @click="delRight(index)"></i>
                        <span class="cRlist-time">{{item}}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <!-- 按钮 -->
      <!-- <div class="confirm" @click="confirm()">
        确定
      </div>
      <div class="cancel-btn" @click="cancel()">
        取消
      </div> -->
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {locationOrigin} from '@dataQuery/tools/env'
import addCssJs, {deleteFile} from '@comm/tools/addCssJs'

export default {
  name: 'countTime',
  props: ['countPopShow', 'resetFlag'],
  data () {
    return {
      radioIndex: 3,
      key: {
        3: 'timeGroupDay',
        2: 'timeGroupMonth',
        1: 'timeGroupYear',
        4: 'timeGroupUser'
      },
      timeGroupDay: [],
      timeGroupMonth: [],
      timeGroupYear: [],
      timeGroupUser: [],
      ctimeRadioArr: [
        {
          k: 3,
          v: '日'
        },
        {
          k: 2,
          v: '月'
        },
        {
          k: 1,
          v: '年'
        },
        {
          k: 4,
          v: '自定义'
        }
      ],
      userTimes: []
    }
  },
  mounted () {
    // 重置统计时间
    this.$bus.on('resetFlag', (v) => {
      if (v === 1) {
        this.radioIndex = 3
        this.checkType({
            k: 3,
            v: '日'
          })
        this[this.key[this.radioIndex]] = []
        this[this.key[this.radioIndex]].push(this.FormatDateTime(yesterday))
      } else if (v === 2) {
        this.radioIndex = 2
        this.checkType({
            k: 2,
            v: '月'
          })
        this[this.key[this.radioIndex]] = []
        this[this.key[this.radioIndex]].push(formaxMonth)
      } else if (v === 3) {
        this.radioIndex = 1
        this.checkType({
            k: 1,
            v: '年'
          })
        this[this.key[this.radioIndex]] = []
        this[this.key[this.radioIndex]].push(maxYear.toString())
      } else {
        this.radioIndex = 4
        this.checkType({
            k: 4,
            v: '自定义'
          })
        this[this.key[this.radioIndex]] = []
        this.userTimes = []
      }

      this.confirm()
    })

    const _this = this
    // layui日历
    const myDate = new Date()
    const maxYear = myDate.getFullYear()
    const Month = myDate.getMonth() + 1
    const maxMonth = maxYear + '-' + Month
    const forMonth = Month < 10 ? '0' + Month : Month
    const formaxMonth = maxYear + '-' + forMonth
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const maxDay = maxMonth + '-' + yesterday.getDate()

    addCssJs([
        locationOrigin + '/laydate/css/laydate.css',
        locationOrigin + '/laydate/js/laydate.js'
    ]).then(() => {
        // 日
        window.laydate.render({
            elem: '#cander1',
            position: 'static',
            showBottom: true,
            btns: ['now'],
            theme: '#245182',
            max: maxDay,
            ready (date) {
                $('#cander1 .laydate-btns-now').html('今日')
                _this[_this.key[_this.radioIndex]].push(_this.FormatDateTime(yesterday))
            },
            done: function (value, date) {
                if (_this[_this.key[_this.radioIndex]].indexOf(value) === -1) {
                  _this[_this.key[_this.radioIndex]].push(value)
                }
            }
        })
        // 月
        window.laydate.render({
            elem: '#cander2',
            position: 'static',
            showBottom: true,
            btns: ['now', 'confirm'],
            type: 'month',
            theme: '#245182',
            max: maxMonth.toString(),
            ready (date) {
                $('#cander2 .laydate-btns-now').html('本月')
                const layKey = $('#cander2').attr('lay-key')
                $('#layui-laydate' + layKey).on('click', 'ul.layui-laydate-list.laydate-month-list li', () => {
                    setTimeout(() => {
                        $('#layui-laydate' + layKey + ' .laydate-btns-confirm').click()
                    }, 0)
                })
            },
            done: function (value, date) {
                if (_this[_this.key[_this.radioIndex]].indexOf(value) === -1) {
                  _this[_this.key[_this.radioIndex]].push(value)
                }
            }
        })
        // 年
        window.laydate.render({
            elem: '#cander3',
            position: 'static',
            showBottom: true,
            btns: ['now', 'confirm'],
            type: 'year',
            theme: '#245182',
            max: maxYear.toString(),
            ready (date) {
                $('#cander3 .laydate-btns-now').html('今年')
                const layKey = $('#cander3').attr('lay-key')
                $('#layui-laydate' + layKey).on('click', 'ul.layui-laydate-list.laydate-year-list li', () => {
                    setTimeout(() => {
                        $('#layui-laydate' + layKey + ' .laydate-btns-confirm').click()
                    }, 0)
                })
            },
            done: function (value, date) {
                if (_this[_this.key[_this.radioIndex]].indexOf(value) === -1) {
                  _this[_this.key[_this.radioIndex]].push(value)
                }
            }
        })
        // 自定义
        window.laydate.render({
            elem: '#cander4',
            range: true,
            theme: '#245182',
            trigger: 'click',
            max: maxDay,
            done: function (value, date) {
                if (_this[_this.key[_this.radioIndex]].indexOf(value) === -1 && value) {
                  _this[_this.key[_this.radioIndex]].push(value)
                  var newValue = value.split(' - ').join('_')
                  _this.userTimes.push(newValue)
                }
            }
        })
    })
    this.checkType({
          k: 3,
          v: '日'
        })
    this.confirm()
  },
  methods: {
    // 格式化时间
    FormatDateTime (UnixTime) {
      var date = new Date(UnixTime)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      return y + '-' + m + '-' + d
    },
    popTimeRange () {
      const _this = this
      setTimeout(() => {
        document.getElementsByClassName('layui-laydate')[3].onmouseover = function () {
          _this.$emit('listenHover')
        }
      }, 0)
    },
    // 日 下一个按钮
    nextD () {
      setTimeout(() => {
        $('#cander1 .laydate-icon.laydate-next-m').click()
      }, 0)
    },
    // 日 上一个按钮
    preD () {
      setTimeout(() => {
        $('#cander1 .laydate-icon.laydate-prev-m').click()
      }, 0)
    },
    // 月 下一个按钮
    nextM () {
      setTimeout(() => {
        $('#cander2 .laydate-icon.laydate-next-y').click()
      }, 0)
    },
    // 月 上一个按钮
    preM () {
      setTimeout(() => {
        $('#cander2 .laydate-icon.laydate-prev-y').click()
      }, 0)
    },
    // 年 下一个按钮
    nextY () {
      setTimeout(() => {
        $('#cander3 .laydate-icon.laydate-next-y').click()
      }, 0)
    },
    // 年 上一个按钮
    preY () {
      setTimeout(() => {
        $('#cander3 .laydate-icon.laydate-prev-y').click()
      }, 0)
    },
    // 右侧删除小按钮
    delRight (index) {
      if (this.radioIndex === 4) {
        this.userTimes.splice(index, 1)
        this[this.key[this.radioIndex]].splice(index, 1)
      } else {
        this[this.key[this.radioIndex]].splice(index, 1)
      }
    },
    // 全部删除
    delRightAll (index) {
      if (this.radioIndex === 4) {
        this.userTimes = []
        this[this.key[this.radioIndex]] = []
      } else {
        this[this.key[this.radioIndex]] = []
      }
    },
    // 点击单选按钮
    checkType (item) {
      this.$emit('listenRadioName', item)
    },
    // 点击取消按钮
    cancel () {
      this.$emit('listenCtFlag', false)
    },
    // 点击确定按钮
    confirm () {
      if (this.radioIndex === 4) {
        this.$emit('listenTimeArr', this.userTimes)
      } else {
        this.$emit('listenTimeArr', this[this.key[this.radioIndex]])
      }
      this.$emit('listenCtFlag', false)
    },
    // 鼠标移入
    showPop () {
      this.$emit('listenHover')
    },
    // 鼠标移出
    hidePop () {
      this.$emit('listenleave')
      if (this.radioIndex === 4) {
        this.$emit('listenTimeArr', this.userTimes)
      } else {
        this.$emit('listenTimeArr', this[this.key[this.radioIndex]])
      }
    }
  },
  destroyed () {
    deleteFile([
        locationOrigin + '/laydate/css/laydate.css',
        locationOrigin + '/laydate/js/laydate.js'
    ])
  }
}
</script>

<style lang="scss">
/* layui样式 */
#cander4 {
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
}
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
    color: rgb(88, 117, 153);
  }

  .layui-laydate .laydate-disabled {
    color: rgb(88, 117, 153) !important;
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
.ctime-pop-tpl {
  width: 650px;
  background: rgba(57, 111, 170, 1);
  border-radius: 2px;
  padding: 20px;
  position: absolute;
  top: 33px;
  left: -390px;
  z-index: 111;
  &::before {
    content: '';
    display: inline-block;
    width: 150px;
    height: 5px;
    background: rgba(57, 111, 170, 1);
    position: absolute;
    top: -5px;
    left: 455px;
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
    width: 84px;
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
    height: 320px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .chooseLeftWrap {
      height: 320px;
      margin-right: 20px;
      overflow: hidden;
      background: rgba(36, 81, 130, 1);
      .chooseLeft {
        min-width: 320px;
        height: 320px;
        padding: 15px;
        padding-top: 0;
        .checkbox-wrap .countTime-item {
          margin-bottom: 4px;
          position: relative;
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
            line-height: 16px;
          }
          .pre-m {
            left: 21px;
            line-height: 16px;
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
