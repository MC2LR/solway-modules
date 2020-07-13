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
                       <div v-if="compandShow">
                         <p class="cur" :class="{bak:baks}" @click="opt(0)">当前公司</p>
                         <p class="cur" :class="{bak:!baks}" @click="opt(1)">委托的公司</p>
                       </div>
                     </div>
                     <div class="selectType">
                         <el-form ref="form" label-width="180px">
                                <div class="dis" >
                                    <el-form-item label="生效电站">
                                        <el-cascader
                                          style="width:160px"
                                          :key="keys"
                                        v-model="Effectivestation"
                                        @change="effstat"
                                        :options="options"
                                        :props="props"
                                        collapse-tags
                                        clearable></el-cascader>
                                    </el-form-item>
                                     <el-form-item label="排除电站">
                                        <el-cascader
                                          style="width:160px"
                                          :key="keysed"
                                        v-model="outstation"
                                        @change="outstat"
                                        :options="optionsed"
                                        :props="props"
                                        collapse-tags
                                        clearable></el-cascader>
                                    </el-form-item>
                                </div>
                                        <el-form-item label="设备类型">
                                        <el-select @change="deTyped" clearable  v-model="dtype" style="width:160px">
                                                  <el-option v-if="deTypeShow"
                                                label="气象仪"
                                                value="5">
                                                </el-option>
                                                      <el-option v-if="!deTypeShow"
                                                label="风机"
                                                value="17">
                                                </el-option>
                                                      <el-option v-if="!deTypeShow"
                                                label="测风塔"
                                                value="18">
                                                </el-option>
                                                      <el-option v-if="deTypeShow"
                                                label="汇流箱"
                                                value="1">
                                                </el-option>
                                                      <el-option v-if="deTypeShow"
                                                label="逆变器"
                                                value="2">
                                                </el-option>
                                                    <el-option v-if="deTypeShow"
                                                label="电能表"
                                                value="4">
                                                </el-option>
                                                    <el-option v-if="deTypeShow"
                                                label="箱变"
                                                value="3">
                                                </el-option>
                                        </el-select>
                                    </el-form-item>
                                <div  class="dis" v-if="deFlag">
                                    <el-form-item label="生效设备" >
                                        <el-select clearable  multiple
                                             collapse-tags v-model="Effectequipment">
                                             <el-option
                                              v-for="item in EffectequipmentData"
                                              :key="item.sn"
                                              :label="item.name"
                                              :value="item.sn">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="排除设备">
                                        <el-select  multiple clearable
    collapse-tags v-model="optequipment">
                                             <el-option
                                              v-for="item in EffectequipmentData"
                                              :key="item.sn"
                                              :label="item.name"
                                              :value="item.sn">
                                            </el-option>
                                        </el-select>
                                  </el-form-item>
                                </div>
                        </el-form>
                     </div>
                 </div>
                 <div class="scop">
                     <p class="tit"><span>报警规则</span></p>
                     <p  style="height:40px;line-height:30px;margin-top:20px;color:#2FBFCC;text-indent:100px;"> <span @click="flats()" style="cursor:pointer">从平台已有模板选择</span> </p>
                     <div class="selectType">
                         <el-form ref="form" label-width="180px">
                                <div class="dis">
                                    <el-form-item label="规则名称">
                                      <el-input v-model="ruleName" placeholder="请输入规则名称" style="width:160px;margin-top:3px;"></el-input>
                                    </el-form-item>
                                    <el-form-item label="规则分类">
                                        <el-select @change="classEvent" v-model="ruleClass">
                                            <el-option
                                                  label="自定义表达式"
                                                  value="01">
                                                  </el-option>
                                                     <el-option
                                                  label="数值变化"
                                                  value="02">
                                                  </el-option>
                                                     <el-option
                                                  label="数值不变"
                                                  value="03">
                                                  </el-option>
                                        </el-select>
                                    </el-form-item> &nbsp;
                                    <el-tooltip class="item" effect="dark" placement="top-start">
                                      <div slot="content">自定义表达式：例如规则 a and b*5 >10 连续匹配5分钟时报警<br/><br/>数据变化：例如数值从1变化为0时报警<br/><br/>数值不变：例如数值持续了5分钟都是1的时候报警</div>
                                     <i class="iconfont iconwenhao"></i>
                                    </el-tooltip>
                                </div>
                                        <el-form-item label="采集指标" v-if="gatherShow" >
                                        <el-select v-model="Gatherindicat" collapse-tags clearable multiple filterable style="width:160px">
                                              <el-option
                                                v-for="item in GatherindicatData"
                                                :key="item.id"
                                                :label="item.stdName"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                <div  class="dis" v-if="ruleClass!=='02'">
                                    <el-form-item label="持续分钟数">
                                        <el-select v-model="durationMinutes" clearable>
                                            <el-option label="发生一次立即报警" value="01"></el-option>
                                            <el-option label="持续指定时间报警" value="02"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-input v-if="durationMinutes === '02'" v-model="seriesMinute" placeholder="请输入持续分钟数" style="width:160px;margin-top:3px;margin-left:50px"></el-input>
                                </div>
                                  <div class="dis">
                                    <el-form-item label="报警开始时间">
                                          <el-time-select
                                          style="width:160px"
                                          @change="starts"
                                            v-model="startTime"
                                            :picker-options="{
                                              start: '00:00',
                                              step: '00:15',
                                              end: '23:59'
                                            }"
                                            placeholder="请选择报警开始时间">
                                        </el-time-select>
                                    </el-form-item>
                                    <el-form-item label="报警结束时间">
                                       <el-time-select
                                            v-model="endTime"
                                            @change="ends"
                                            style="width:160px"
                                            :picker-options="{
                                              start: '00:00',
                                              step: '00:15',
                                              end: '23:59',
                                              minTime: startTime
                                            }"
                                            placeholder="请选择报警结束时间">
                                        </el-time-select>
                                    </el-form-item>
                                </div>
                        </el-form>
                     </div>
                 </div>
                  <div class="scop" style="height:400px" v-if="isShow">
                     <p class="tit" style="margin-bottom:20px;font-size:14px;font-family:Microsoft YaHei;color:rgba(102,102,102,1);"><span>规则表达式</span></p>
                     <div class="selectType">
                        <div class="left">
                          <p style="height:30px;line-height:30px">基本指标</p>
                          <el-input
                          @blur="getBasicIndex"
                          style="width:80%"
                          placeholder="输入检索"
                          suffix-icon="el-input__icon el-icon-search"
                          v-model="basicIndex">
                      </el-input>
                          <div class="indexs">
                              <p  @dblclick="getStaValue(index)" v-for="(item,index) in this.GatherindicatData" class="stdNameSty" @mouseover="mouseovers($event,index)" :class="{'stdNameStys':index===stdIndexs}" :key="index">{{item.stdName}}</p>
                            </div>
                          <p style="height:30px;line-height:30px;margin-bottom:3px">综合指标</p>
                          <span style="cursor:pointer;color:#2FBFCC" @click="modelEvent">从模板选择</span> &nbsp;&nbsp;&nbsp;&nbsp;
                             <el-dropdown  trigger="click">
                                  <span class="el-dropdown-link">
                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                  </span>
                                  <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item > <span @click="more">增加</span> </el-dropdown-item>
                                    <el-dropdown-item><span>编辑</span></el-dropdown-item>
                                    <el-dropdown-item><span>删除</span></el-dropdown-item>
                                  </el-dropdown-menu>
                                </el-dropdown>
                          <div class="comm">
                              <p class="stdNameStyed" @click="comClick(index)" @mousemove="comSty($event,index)" :class="{'stdNameStys':index===comIndexs}" @dblclick="getComIndex(index)" v-for="(item,index) in this.comIndicator" :key="index">{{item.name}}</p>
                          </div>
                        </div>
                        <div class="middle">
                                <p style="text-align:left;font-size:12px;margin-bottom:3px;margin-left:20px">示例：a>0 && (b*3>10 || c==10)</p>
                                 <el-input
                                     style="width:100%;"
                                      type="textarea"
                                      @blur="ExpreValid"
                                      resize="none"
                                       :autosize="{ minRows: 15, maxRows: 15}"
                                       placeholder="请输入表达式"
                                      v-model="ruleExp">
                                  </el-input>

                        </div>
                        <div class="right">
                            <div class="ri-left">
                              <el-select v-model="formsed" @change="seleOperat" placeholder="请选择运算表达式">
                                    <el-option :label="item.dictName" :value="item.dictValue" v-for="(item,index) in this.  getAlarmRuleOperatorClassed.res.data" :key="index">
                                    </el-option>

                               </el-select>
                                <div style="margin-bottom:10px">
                                </div>
                                <el-input
                                  style="width:80%"
                                  placeholder="输入检索"
                                  suffix-icon="el-input__icon el-icon-search"
                                  v-model="inps">
                              </el-input>
                              <div class="ri-content">
                                   <p class="stdNameStyed" @mousemove="opratorSty($event,index)" v-for="(item,index) in Operators" :key="index" @dblclick="getOpratIndex(index)" :class="{'stdNameStys':index===opratIndexs}">{{item.name}}</p>

                              </div>
                              <el-button type="primary" @click="simulator" style="width:160px">对表达式进行模拟测试</el-button>
                            </div>
                            <div class="ri-right">
                              <div class="comtent" v-if="showConfig">
                                  <p style="border-bottom:1px solid #E3E3E3;width:100%;height:35px;line-height:35px;text-align:center;font-size:14px;">{{opratorExpalin.expalin}}</p>
                                  <div style="width:100%;text-indent:18px">
                                      {{opratorExpalin.demo}}
                                  </div>
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
                                      v-model="alarmContent">
                                    </el-input>
                                </el-form-item>
                                 <el-form-item label="">
                                       <el-select  v-model="value3" style="width:150px" placeholder="请选择基本指标">
                                        <el-option
                                          v-for="item in this.GatherindicatData"
                                          :key="item.id"
                                          :label="item.stdName"
                                          :value="item.id">
                                        </el-option>
                                      </el-select>
                                       <el-button type="primary" @click="insert">插入表达式</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <el-select style="width:150px"  v-model="value4" placeholder="请选择综合指标">
                                        <el-option
                                          v-for="(item,index) in this.comIndicator"
                                          :key="index"
                                          :label="item.name"
                                          :value="item.id">
                                        </el-option>
                                      </el-select>
                                       <el-button type="primary" @click="comInsert">插入表达式</el-button>
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
                 <el-button @click="dialogTableVisible = false">取消</el-button><el-button type="primary" @click="edAndCopy">确认</el-button>
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
import {
  GetStationTresed,
  AlarmConfigEdandcopy,
  getDeviceByStation,
  getStdPointInfo,
  getGroupPoint,
  checkExpression,
  testExpression,
  getAlarmRuleOperatorClass,
  getAlarmRuleOperator
} from '@intelligentAlarms/request/api'
export default {
  name: 'addAlarmConfig',
  data () {
    return {
      startTime: '',
      stidList: [],
      opratIndexs: 0,
      Operators: [],
      noStidList: [],
      stdIndexs: 0,
      endTime: '',
      Effectivestation: '',
      isShow: true,
      gatherShow: false,
      EffectequipmentData: [],
      optequipment: [],
      optequipmentData: [],
      Effectequipment: [],
      props: { multiple: true },
      options: [],
      optionsed: [],
      comIndexs: 0,
      dialogTableVisible: false,
      baks: true,
      Gatherindicat: [],
      GatherindicatData: [],
      eqidList: [],
      keys: 0,
      keysed: 0,
      showConfig: false,
      outstation: '',
      forms: '',
      alarmContent: '',
      durationMinutes: '01',
      ruleName: '',
      input: '',
      dtype: '',
      ruleClass: '01',
      ruleExp: '',
      seriesMinute: '',
      basicIndex: '',
      inps: '',
      formsed: '',
      value3: '',
      value4: '',
      textarea: '',
      startss: true,
      deFlag: false,
      deTypeShow: true,
      entrust: '0',
      info: true,
      stdNames: '',
      radio: 1,
      optio: [],
      optioss: [],
      comIndicator: [],
      statid: [],
      compandShow: Boolean,
      opratorExpalin: {
         expalin: '',
         demo: ''
      },
      getGroupPointed: getGroupPoint({later: true}),
      getStdPointInfoed: getStdPointInfo({later: true}),
      editandcopy: AlarmConfigEdandcopy({ later: true }), // 添加和编辑
      getStationTreds: GetStationTresed({ later: true }),
      getDeviceByStationed: getDeviceByStation({ later: true }),
      checkExpressioned: checkExpression({later: true}),
      testExpressioned: testExpression({later: true}),
      getAlarmRuleOperatorClassed: getAlarmRuleOperatorClass({later: true}),
      getAlarmRuleOperatored: getAlarmRuleOperator({later: true})
    }
  },
  created () {
    // 获取公司树形结构
      this.getStationTreeEvent()
      this.getTypeAlarmRuleOperator()
       // 01是光伏   02是风电
    if (this.$store.getters.station_class === '01') {
        this.deTypeShow = true
    } else {
        this.deTypeShow = false
    }
    if (JSON.parse(localStorage.getItem('intelligentAlarms')).user.userInfo.currentRoleCompanyId === 135) {
        this.compandShow = true
    } else {
        this.compandShow = false
    }
  },
  methods: {
       // 获取运算表达式
       getTypeAlarmRuleOperator () {
         this.getAlarmRuleOperatorClassed.getData()
         console.log(this.getAlarmRuleOperatorClassed)
       },
       // // 获取综合指标
        getGroupPages () {
            this.getGroupPointed.getData({
                condition: '',
                dtype: this.dtype
            }).then((res) => {
                if (res.code === 200 && res.data.length > 0) {
                  this.comIndicator = res.data
                  console.log(this.comIndicator)
                }
            })
        },
        // 规则分类
    classEvent (val) {
        if (this.ruleClass === '01') {
           this.gatherShow = false
            this.isShow = true
        } else {
            this.gatherShow = true
            this.isShow = false
        }
    },
    // 选择生效电站
    effstat (val) {
      console.log(val)
      if (val.length === 1) {
           this.deFlag = true
           if (this.dtype !== '') {
             this.getDevice()
           }
      } else {
          this.deFlag = false
      }
      for (let i = 0; i < this.Effectivestation.length; i++) {
        this.stidList.push(this.Effectivestation[i][this.Effectivestation[i].length - 1])
      }
    },
    // 选择排除电站
    outstat () {
          for (let i = 0; i < this.outstation.length; i++) {
            this.noStidList.push(this.outstation[i][this.outstation[i].length - 1])
      }
    },

    // 编辑或复制
    edAndCopy () {
        this.editandcopy.getData({
            alarmContentCn: '', // 报警内容
            alarmLevel: this.radio, // 报警级别
            bizType: this.$store.getters.station_class, // 业务类型 01 光伏  02 发电
            companyType: this.compandShow ? '01' : '02',
            dtype: this.dtype, // 设备类型
            endTime: this.endTime, // 结束时间
            startTime: this.startTime, // 开始时间
            isenable: this.startss ? '1' : '0', // 是否启用
            isnotice: this.infoBtn ? '1' : '0', // 是否通知
            ruleName: this.ruleName, // 规则名称
            seriesMinute: this.durationMinutes, // 持续分钟数
            ruleExpCn: this.ruleExp, // 规则表达式
            seriesType: this.durationMinutes, // 持续类型
            ruleClass: this.ruleClass, // 规则分类
            stidList: this.stidList, // 生效电站列表
            noStidList: this.noStidList, // 排除电站列表
            eqidList: this.Effectequipment, // 生效设备
            noEqidList: this.optequipment, // 排除设备列表
            stdPointRuleList: this.gatherShow ? this.Gatherindicat : [] // 采集指标
        }).then(res => {
          console.log(res)
          if (res.code === 200) {
                this.dialogTableVisible = false
                this.$bus.emit('unpes')
          }
        })
    },

    // 获取采集指标
    getStdPointInfoEvent () {
      this.getStdPointInfoed.getData({bizType: '02', dtype: this.dtype}).then((res) => {
        if (res.code === 200) {
          this.GatherindicatData = res.data
        }
      })
    },
    // 获取公司电站树
    getStationTreeEvent () {
      this.getStationTreds
        .getData({
          entrust: this.entrust,
          stcls: this.$store.getters.station_class
        })
        .then(res => {
          console.log(res)
          this.statid = res.data
          this.keys += 1
          this.keysed += 1
          this.filtertree(res.data)
        })
    },
    // 设备类型
    deTyped () {
      if (this.deFlag) {
        this.Effectequipment = ''
        this.optequipment = ''
        this.getDevice()
      }
        this.getGroupPages() // 综合指标
        this.getStdPointInfoEvent() // 基本指标
    },
    // 获取生效设备
    getDevice () {
      this.getDeviceByStationed
        .getData({
          deviceType: this.dtype,
          stationId: this.Effectivestation[0][this.Effectivestation[0].length - 1]
        })
        .then(res => {
          if (res.code === 200) {
            this.EffectequipmentData = res.data
            this.optequipmentData = res.data
          }
        })
    },
    // 获取电站树
    filtertree (val) {
      this.options = []
      val.forEach(item => {
        if (item.pid === null) {
          this.options.push({
            valued: item.id,
            value: item.busiId,
            label: item.name,
            children: []
          })
        } else {
          this.options.forEach(items => {
            if (item.pid === items.valued) {
              items.children.push({
                valued: item.id,
                value: item.busiId,

                label: item.name,
                pid: item.pid,
                children: []
              })
            } else {
              items.children.forEach(itemss => {
                if (itemss.valued === item.pid) {
                  itemss.children.push({
                    valued: item.id,
                    pid: item.pid,
                    value: item.busiId,

                    label: item.name,
                    children: []
                  })
                } else {
                  itemss.children.forEach(itemed => {
                    if (itemed.valued === item.pid) {
                      itemed.children.push({
                        valued: item.id,
                        value: item.busiId,

                        label: item.name,
                        pid: item.pid
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
      this.options[0].children.forEach(item => {
        item.children.forEach(items => {
          if (items.children.length === 0) {
            delete items.children
          }
        })
      })
      this.optionsed = this.optionsed.concat(this.options)
    },
    // 从平台获取模板
    flats () {
      this.$refs.flat.opens(this.startss)
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
      console.log(this.ruleExp)

      this.$refs.simulators.openDi(this.ruleExp, this.GatherindicatData, this.comIndicator, this.ruleExp)
    },
    more () {
      this.$refs.comprehensives.opens()
    },
    // 选择具体表达式
    seleOperat (val) {
      this.getAlarmRuleOperatored.getData({classify: val}).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.Operators = res.data
                if (this.Operators.length > 0) {
                  this.showConfig = true
                  this.opratorExpalin.expalin = this.Operators[0].explain
                  this.opratorExpalin.demo = this.Operators[0].demo
                }
        }
      })
    },
    // 是否报警
    startBtn (val) {
      if (val === 0) {
        this.startss = true
      } else {
        this.startss = false
      }
    },
    // 编辑进行反选
    opens (val) {
      console.log(val)
      this.dialogTableVisible = true
      if (val === '新增') {
        this.ruleName = ''
        this.alarmContent = ''
        this.radio = 1
        this.startss = true
        this.info = true
        this.dtype = ''
        this.durationMinutes = '01'
        this.seriesMinute = ''
        this.ruleExp = ''
        this.ruleClass = '01'
        this.Effectivestation = ''
        this.outstation = ''
        this.isShow = true
         this.startTime = ''
         this.endTime = ''
         this.value3 = ''
         this.value4 = ''
         this.GatherindicatData = []
         this.comIndicator = []
         this.EffectequipmentData = []
         this.EffectequipmentData = []
         this.Effectequipment = []
         this.optequipment = []
         this.Gatherindicat = []
         this.compandShow = true
      } else {
        console.log(this.statid)
        let arrStaid = []
        let arrNoStaid = []
        for (let i = 0; i < this.statid.length; i++) {
            for (let j = 0; j < val.stidList.length; j++) {
              if (this.statid[i].stids !== null) {
                if (this.statid[i].stids.indexOf(val.stidList[j]) !== -1 && this.statid[i].companyId !== 0) {
                   console.log(this.statid[i])
                   arrStaid.push([
                     this.statid[i].companyId, this.statid[i].busiId, val.stidList[j]
                   ])
                }
              }
            }
        }
         for (let i = 0; i < this.statid.length; i++) {
            for (let j = 0; j < val.noStidList.length; j++) {
              if (this.statid[i].stids !== null) {
                if (this.statid[i].stids.indexOf(val.noStidList[j]) !== -1 && this.statid[i].companyId !== 0) {
                   console.log(this.statid[i])
                   arrNoStaid.push([
                     this.statid[i].companyId, this.statid[i].busiId, val.noStidList[j]
                   ])
                }
              }
            }
        }
        console.log(arrStaid)
        // 编辑
        this.ruleName = val.ruleName
        this.alarmContent = val.alarmContentCn
        this.startTime = val.startTime
        this.endTime = val.endTime
        this.radio = val.alarmLevel
        this.durationMinutes = val.seriesType === '1' ? '01' : '02'
        this.seriesMinute = val.seriesMinute
        this.ruleExp = val.ruleExp
        this.Effectivestation = arrStaid
        this.outstation = arrNoStaid
        this.ruleClass = '01'
        this.isShow = true
        this.dtype = val.dtype + ''
        if (val.isenable === '1') {
          this.startss = true
        } else {
          this.startss = false
        }
        if (val.isnotice === '1') {
          this.info = true
        } else {
          this.info = false
        }
        if (val.companyType === '01') {
          this.compandShow = true
        } else {
          this.compandShow = false
        }
      }
    },
    opt (val) {
      if (val === 0) {
        this.entrust = '0'
        this.baks = true
      } else {
        this.entrust = '1'
        this.baks = false
      }
      this.getStationTreeEvent()
    },
    ends (val) {

    },
    starts (val) {

    },
    // 双击获取综合指标
    getComIndex (val) {
      this.ruleExp += this.comIndicator[val].name
    },
    // 双击表达式
    getOpratIndex (index) {
      this.ruleExp += this.Operators[index].name
    },
    // 获取基本指标
    getBasicIndex () {
         this.stdNames = this.basicIndex
         this.getStdPointInfoEvent()
    },
    // 综合指标点击改变样式
    comClick (val) {
            this.comIndexs = val
        let a = document.getElementsByClassName('stdNameStyed')
        for (let i = 0; i < a.length; i++) {
           if (val === i) {
             if (a[i].style.background === '') {
               a[i].style.background = '#2FBFCC'
               a[i].style.color = '#ffffff'
             } else {
               a[i].style.background = ''
               a[i].style.color = '#666'
             }
           } else {
             a[i].style.background = ''
             a[i].style.color = ''
           }
        }
    },
    // 进行指标双击选择
    getStaValue (val) {
      this.ruleExp += this.GatherindicatData[val].stdName
    },
    comSty (e, val) {
        this.comIndexs = val
        let selection = window.getSelection()
        selection.removeAllRanges()
        let range = document.createRange()
        range.selectNodeContents(e.target)
        selection.addRange(range)
    },
    // 实现拖拽
    mouseovers (e, val) {
        this.stdIndexs = val
        let selection = window.getSelection()
        selection.removeAllRanges()
        let range = document.createRange()
        range.selectNodeContents(e.target)
        selection.addRange(range)
    },
    opratorSty (e, index) {
        this.showConfig = true
        this.opratorExpalin.expalin = this.Operators[index].explain
        this.opratorExpalin.demo = this.Operators[index].demo
        this.opratIndexs = index
        let selection = window.getSelection()
        selection.removeAllRanges()
        let range = document.createRange()
        range.selectNodeContents(e.target)
        selection.addRange(range)
    },
    // 模板选择
    flatAdd (val) {
      this.ruleName = val.row.ruleName // 规则名称
      this.startTime = val.row.startTime === null ? '' : val.row.startTime // 报警开始时间
      this.endTime = val.row.endTime === null ? '' : val.row.endTime// 结束时间seriesMinute
      this.durationMinutes = val.row.seriesType === null ? '' : val.row.seriesType // 连续时间类型
      this.seriesMinute = val.row.seriesMinute === null ? '' : val.row.seriesMinute // 连续时间
       this.Gatherindicat = val.row.stdPointRules === null ? '' : val.row.stdPointRules// 采集指标
    },
    // 表达式验证
    ExpreValid () {
      this.testExpressioned.getData({expression: this.ruleExp}).then(res => {
          if (res.code !== 200) {
               this.$message.error('表达式错误，请重新输入')
          }
      })
    },
    // 基本指标插入
    insert () {
        console.log(this.value3)
        console.log(this.GatherindicatData)
        if (this.GatherindicatData.length > 0) {
          this.GatherindicatData.forEach(item => {
             if (this.value3 === item.id) {
                this.alarmContent += '#{' + item.stdName + '}'
             }
          })
        }
    },
    // 综合插入
    comInsert () {
        console.log(this.value4)
        if (this.comIndicator.length > 0) {
          this.comIndicator.forEach(item => {
            if (this.value4 === item.id) {
               this.alarmContent += '#{' + item.name + '}'
            }
          })
        }
    }
  },
  components: {
    ELFormItem: FormItem,
    flatConfig,
    modelSelect,
    simulator,
    comprehenConfig
  },
  mounted () {
    this.$bus.on('opens', this.opens)
    this.$bus.on('flatData', this.flatAdd)
    this.$bus.on('addGroup', this.getGroupPages)
  },
  destroyed () {
    this.$bus.off('opens', this.opens)
    this.$bus.off('flatData', this.flatAdd)
    this.$bus.off('addGroup', this.getGroupPages)
  }
}
</script>
<style  lang="scss">
.el-scrollbar__view,
.el-cascader-menu__list {
  height: 200px;
  overflow: auto;
}

</style>
<style lang="scss" scoped>
::selection{background:rgba(49,191,204,0.5);color:#fff;}::-moz-selection{background:rgba(49,191,204,0.5);color:#fff;} ::-webkit-selection{background:rgba(49,191,204,0.5);color:#fff;}
.addconfig {
  width: 100%;
  overflow: hidden;
  >>> .el-dialog__header {
    box-shadow: 0px 1px 14px 0px rgba(81, 149, 245, 0.2);
  }
   >>> .el-dropdown-link {
    cursor: pointer;
    color: #4EC8D4;
  }
 >>> .el-icon-arrow-down {
    font-size: 12px;
  }
 >>> .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .iconwenhao {
    color: #f61c1c;
    height: 16px;
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
  >>> .el-button {
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
    // height: 79vh;
    margin: 0 auto;
    overflow: auto;
    .contented {
      width: 100%;
      .scop {
        width: 100%;
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
          overflow: auto;
          .left {
            width: 24%;
            height: 100%;
            overflow: auto;
            float: left;
            padding-left: 15px;
             background:rgba(236,238,248,0.4);
            .indexs {
              width: 100%;
              height: 120px;
              overflow: auto;
              .stdNameSty{
                width: 110px;
                text-align: center;
                line-height: 20px;
                margin-top: 3px;
                border-radius: 10px;
                cursor: pointer;
                font-size: 12px;
                height: 20px;
                // background: #2FBFCC;
                color: #666;
              }
              .stdNameStys{
                cursor: pointer;
                background: #2FBFCC;
                color: #fff
              }
            }
            .comm {
              width: 100%;
              height: 110px;
              overflow: auto;
              .stdNameStyed{
                width: 130px;
                text-align: center;
                line-height: 20px;
                margin-top: 3px;
                border-radius: 10px;
                cursor: pointer;
                font-size: 12px;
                height: 20px;
                // background: #2FBFCC;
                color: #666;
              }
              .stdNameStys{
                cursor: pointer;
                background: #2FBFCC;
                color: #fff;
              }
            }
          }
          .middle {
            width: 32%;
            height: 100%;
            float: left;
            text-align: center;
            >>> .el-textarea__inner {
              width: 90%;
            margin: 0 auto;
              background:rgba(236,238,248,0.4);
            }
          }
          .right {
            width: 42%;
            float: left;
            display: flex;
            .ri-left {
              width: 55%;
              height: 100%;
              padding-top: 13px;
              background:rgba(236,238,248,0.4);

            }
            .ri-right {
              width: 45%;
              height: 100%;
              .comtent {
                width: 80%;
                height: 330px;
                margin: 0 auto;
                overflow: auto;
                margin-top: 12px;
                font-size: 12px;
                color:#666;
                border: 1px solid #e3e3e3;
              }
            }
            .ri-content {
              width: 100%;
              height: 220px;
              overflow: auto;
              .stdNameStyed{
                width: 130px;
                text-align: center;
                line-height: 20px;
                margin-top: 3px;
                border-radius: 10px;
                cursor: pointer;
                font-size: 12px;
                height: 20px;
                // background: #2FBFCC;
                color: #666;
              }
              .stdNameStys{
                cursor: pointer;
                background: #2FBFCC;
                color: #fff;

              }
            }
          }
          .dis {
            display: flex;
            >>> .el-select {
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
