<template>
  <div class="addconfig">
      <el-dialog
        width="60%"
        center
        title="报警规则配置"
        top="5vh"
        custom-class="dialogsas"
        :visible.sync="dialogTableVisible"
        :modal-append-to-body="false"
         >
         <div class="wrapper">
             <div class="contented">
                 <div class="scop">
                     <p class="tit"><span>报警范围</span></p>
                     <div class="btn">
                       <div>
                         <p class="cur" :class="{bak:baks}" @click="opt(0)">当前公司</p>
                         <p class="cur" :class="{bak:!baks}" @click="opt(1)">委托的公司</p>
                       </div>
                     </div>
                     <div class="selectType">
                         <el-form ref="form" label-width="180px">
                                <div class="dis">
                                    <el-form-item label="生效电站">
                                        <el-select v-model="forms">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="排除电站">
                                        <el-select v-model="forms">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                        <el-form-item label="设备类型">
                                        <el-select v-model="forms" style="width:160px">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                <div  class="dis">
                                    <el-form-item label="生效设备">
                                        <el-select v-model="forms">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="排除设备">
                                        <el-select v-model="forms">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                        </el-form>
                     </div>
                 </div>
                 <div class="scop">
                     <p class="tit"><span>报警规则</span></p>
                     <p @click="flats()" style="height:40px;line-height:30px;margin-top:20px;color:#2FBFCC;text-indent:100px;cursor:pointer">从平台已有模板选择</p>
                     <div class="selectType">
                         <el-form ref="form" label-width="180px">
                                <div class="dis">
                                    <el-form-item label="规则名称">
                                        <el-select v-model="forms">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="规则分类">
                                        <el-select v-model="forms">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-tooltip class="item" effect="dark" placement="top-start">
                                      <div slot="content">自定义表达式：例如规则 a and b*5 >10 连续匹配5分钟时报警<br/><br/>数据变化：例如数值从1变化为0时报警<br/><br/>数值不变：例如数值持续了5分钟都是1的时候报警</div>
                                     <i class="el-icon-question"></i>
                                    </el-tooltip>
                                </div>
                                        <el-form-item label="采集指标">
                                        <el-select v-model="forms" style="width:160px">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                <div  class="dis">
                                    <el-form-item label="持续分钟数">
                                        <el-select v-model="forms">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-input v-model="input" placeholder="请输入持续分钟数" style="width:160px;margin-top:3px;margin-left:50px"></el-input>
                                </div>
                                  <div class="dis">
                                    <el-form-item label="报警开始时间">
                                          <el-time-picker
                                          style="width:160px"
                                            v-model="value1"
                                            :picker-options="{
                                            selectableRange: '00:00:00 - 23:59:59'
                                            }"
                                            placeholder="请选择报警开始时间">
                                        </el-time-picker>
                                    </el-form-item>
                                    <el-form-item label="报警结束时间">
                                       <el-time-picker
                                            v-model="value2"
                                            style="width:160px"
                                            :picker-options="{
                                            selectableRange: '00:00:00 - 23:59:59'
                                            }"
                                            placeholder="请选择报警结束时间">
                                        </el-time-picker>
                                    </el-form-item>
                                </div>
                        </el-form>
                     </div>
                 </div>
                  <div class="scop" style="height:450px">
                     <p class="tit" style="margin-bottom:20px;font-size:14px;font-family:Microsoft YaHei;color:rgba(102,102,102,1);"><span>规则表达式</span></p>
                     <div class="selectType">
                        <div class="left">
                          <p style="height:30px;line-height:30px">基本指标</p>
                          <el-input
                          style="width:80%"
                          placeholder="输入检索"
                          suffix-icon="el-input__icon el-icon-search"
                          v-model="inp">
                      </el-input>
                          <div class="indexs">

                          </div>
                          <p style="height:30px;line-height:30px;margin-bottom:3px">综合指标</p>
                          <span style="cursor:pointer;color:#2FBFCC" @click="modelEvent">从模板选择</span> &nbsp;&nbsp;&nbsp;&nbsp;
                          <span style="cursor:pointer;color:#2FBFCC" @click="more">更多<i class="el-icon-caret-bottom"></i> </span>
                          <div class="comm">
                          </div>
                        </div>
                        <div class="middle">
                                 <el-input
                                     style="width:100%"
                                      type="textarea"
                                      resize="none"
                                       :autosize="{ minRows: 15, maxRows: 18}"
                                       placeholder="请输入表达式"
                                      v-model="textarea1">
                                  </el-input>

                        </div>
                        <div class="right">
                            <div class="ri-left">
                              <el-select v-model="formsed">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                               </el-select>
                                <div style="margin-bottom:10px"></div>
                                <el-input
                                  style="width:80%"
                                  placeholder="输入检索"
                                  suffix-icon="el-input__icon el-icon-search"
                                  v-model="inps">
                              </el-input>
                              <div class="ri-content"></div>
                              <el-button type="primary" @click="simulator" style="width:160px">对表达式进行模拟测试</el-button>
                            </div>
                            <div class="ri-right">
                              <div class="comtent" v-if="showConfig">
                                  <p style="border-bottom:1px solid #E3E3E3;width:100%;height:35px;line-height:35px;text-align:center"></p>
                              </div>
                            </div>
                        </div>
                     </div>
                 </div>
                 <div class="scop" style="height:400px">
                     <p class="tit"><span>报警内容</span></p>
                     <div class="selectType">
                          <el-form ref="form" label-width="170px" style="margin-top:20px">
                               <el-form-item label="报警内容">
                                    <el-input
                                      type="textarea"
                                       :autosize="{ minRows: 4, maxRows: 6}"
                                       placeholder="请输入内容"
                                       resize="none"
                                      v-model="textarea">
                                    </el-input>
                                </el-form-item>
                                 <el-form-item label="">
                                       <el-select v-model="value3" style="width:150px" placeholder="请选择">
                                        <el-option
                                          v-for="item in optio"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                      </el-select>
                                       <el-button type="primary">插入表达式</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <el-select style="width:150px" v-model="value4" placeholder="请选择">
                                        <el-option
                                          v-for="item in optioss"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                      </el-select>
                                       <el-button type="primary">插入表达式</el-button>
                                </el-form-item>
                                  <el-form-item label="报警等级">
                                     <el-radio-group v-model="radio">
                                        <el-radio :label="1">严重</el-radio>
                                        <el-radio :label="2">告警</el-radio>
                                        <el-radio :label="3">提醒</el-radio>
                                      </el-radio-group>
                                </el-form-item>
                                 <div class="dis">
                                   <el-form-item label="是否启用报警">
                                        <p class="btnsd" @click="startBtn(0)" :class="{stas:startss}">启用</p>
                                        <p  class="btnsd" @click="startBtn(1)" :class="{stas:!startss}">停用</p>
                                </el-form-item>
                                       <el-form-item label="报警后是否通知">
                                         <p class="btnsd" @click="infoBtn(0)" :class="{stas:info}">通知</p>
                                        <p  class="btnsd" @click="infoBtn(1)" :class="{stas:!info}">不通知</p>
                                </el-form-item>
                                </div>
                        </el-form>
                     </div>
                 </div>
              <div class="sure">
                 <el-button>取消</el-button><el-button type="primary">确认</el-button>
              </div>
             </div>
         </div>
         </el-dialog>
         <flat-config ref="flat"></flat-config>
         <model-select ref="model"></model-select>
         <simulator ref="simulators"></simulator>
         <comprehen-config ref="comprehensives"></comprehen-config>
  </div>
</template>

<script>
import { FormItem } from 'element-ui'
import flatConfig from './flatConfig'
import modelSelect from './moduelSelect'
import simulator from './simulator'
import comprehenConfig from './comprehensiveConfig'
export default {
  name: 'addAlarmConfig',
  data () {
    return {
      dialogTableVisible: false,
      baks: true,
      showConfig: false,
      forms: '',
      input: '',
      inp: '',
      inps: '',
      value1: '',
      formsed: '全部',
      value2: '',
      value3: '',
      value4: '',
      textarea: '',
      startss: true,
      textarea1: '',
      info: true,
      radio: 1,
      optio: [],
      optioss: []
    }
  },
  created () {
    debugger
  },
  methods: {
    // 从平台获取模板
    flats () {
      this.$refs.flat.opens()
    },
  // 从模板选择
    modelEvent () {
      this.$refs.model.opened()
    },
    // 报警后是否通知
    infoBtn (val) {
      if (val === 0) {
        this.info = true
      } else {
        this.info = false
      }
    },
    // 启用模拟器
    simulator () {
      this.$refs.simulators.openDi()
    },
    more () {
      this.$refs.comprehensives.opens()
    },
    // 是否报警
    startBtn (val) {
      if (val === 0) {
        this.startss = true
      } else {
        this.startss = false
      }
    },
    opens () {
      this.dialogTableVisible = true
    },
    opt (val) {
      if (val === 0) {
        this.baks = true
      } else {
        this.baks = false
      }
    }
  },
  components: {
    ELFormItem: FormItem, flatConfig, modelSelect, simulator, comprehenConfig
  },
  mounted () {
    this.$bus.on('opens', this.opens)
  },
  destroyed () {
    this.$bus.off('opens', this.opens)
  }
}
</script>

<style lang="scss" scoped>
.addconfig {
  width: 100%;
  overflow: hidden;
  >>> .el-dialog__header {
    box-shadow: 0px 1px 14px 0px rgba(81, 149, 245, 0.2);
  }
  >>> .dialogsas {
    height: 88vh;
    overflow: hidden;
  }
  >>> .dialog {
    height: 70vh;
    overflow: hidden;
  }
  >>> .dialogFlat{
        height: 70vh;
    overflow: hidden;
  }
  >>> .cell-style {
    text-align: center;
    font-size: 12px;
    color: #666666;
  }
  >>> .header-cell-style {
    text-align: center;
    color: #333333;
  }
  >>> .el-button{
    padding: 0;
    width: 80px;
    height: 30px;
  }
  .se {
    width: 100%;
    height: 40px;
    overflow: hidden;
  }
  .wrapper {
    width: 98%;
    height: 79vh;
    margin: 0 auto;
    overflow: auto;
    .contented {
      width: 100%;
      .scop {
        width: 100%;
        height: 330px;
        .tit {
          width: 100%;
          height: 30px;
          border-bottom: 1px solid #e3e3e3;
          line-height: 30px;
          span {
            border-bottom: 2px solid #2fbfcc;
            padding-bottom: 5px;
            font-size: 14px;
            color: #333333;
          }
        }
        .btn {
          width: 100%;
          margin: 0 auto;
          height: 50px;
          margin-top: 20px;
          text-align: center;
          overflow: hidden;
          // padding-left: 15%;
          display: flex;
          justify-content: center;
          .cur {
            float: left;
            width: 96px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 14px;
            color: #2fbfcc;
            border: 1px solid rgba(47, 191, 204, 1);
            border-radius: 4px;
            margin-right: 20px;
            cursor: pointer;
          }
          .bak {
            background: #2fbfcc;
            color: #ffffff;
          }
        }
        .selectType {
          width: 100%;
          height: 245px;
          .left {
            width: 20%;
            height: 400px;
            float: left;
            .indexs {
              width: 100%;
              height: 150px;
              overflow: auto;
            }
            .comm {
              width: 100%;
              height: 140px;
              overflow: auto;
            }
          }
          .middle {
            width: 35%;
            height: 400px;
            float: left;
            text-align: center;
            >>> .el-textarea__inner {
              width: 90%;
            }
          }
          .right {
            width: 45%;
            height: 400px;
            float: left;
            display: flex;
            .ri-left {
              width: 50%;
              height: 100%;
            }
            .ri-right {
              width: 50%;
              height: 100%;
              .comtent {
                width: 80%;
                height: 350px;
                overflow: auto;
                border: 1px solid #e3e3e3;
              }
            }
            .ri-content {
              width: 100%;
              height: 210px;
              overflow: auto;
            }
          }
          .dis {
            display: flex;
            >>> .el-select{
                width: 160px;
            }
            .btnsd {
              width: 64px;
              height: 30px;
              color: #2fbfcc;
              border: 1px solid #2fbfcc;
              margin-top: 5px;
              line-height: 30px;
              cursor: pointer;
              text-align: center;
              float: left;
            }
            .stas {
              background: #2fbfcc;
              color: white;
            }
            .btnsd:nth-child(1) {
              border-right: 0;
              border-radius: 3px 0px 0px 3px;
            }
            .btnsd:nth-child(2) {
              border-radius: 0px 3px 3px 0px;
            }
            .btnsd:nth-child(3) {
              border-right: 0;
              border-radius: 3px 0px 0px 3px;
            }
            .btnsd:nth-child(4) {
              border-radius: 0px 3px 3px 0px;
            }
            .el-icon-question {
              font-size: 18px;
              color: #f61c1c;
              cursor: pointer;
            }
          }
          >>> .el-textarea__inner {
            width: 100%;
          }
        }
      }
    }
    .sure {
      width: 50%;
      height: 70px;
      margin: 0 auto;
      text-align: center;
    }
  }
}
</style>
