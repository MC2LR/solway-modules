<template>
    <div class="comprehensive">
                <el-dialog
                    width="57%"
                    center
                    title="综合指标配置"
                    top="5vh"
                    custom-class="dialogFlatss"
                    :visible.sync="dialogTableVisibledFlats"
                    :modal-append-to-body="false"
                      >
                        <div class="wraper">
                            <div class="top">
                                 <el-form ref="form" label-width="150px" style="margin-top:20px">
                                    <div class="dis">
                                        <el-form-item label="综合指标名称">
                                                <el-input style="width:160px" v-model="compreName" placeholder="例如acp_st"></el-input>
                                        </el-form-item>
                                        <el-form-item label="综合数据中文名称">
                                                <el-input style="width:160px" v-model="compreNameChine" placeholder="例如电站级平均功率"></el-input>
                                        </el-form-item>
                                    </div>
                                     <div class="dis">
                                        <el-form-item label="原始指标名称">
                                               <el-select v-model="indicators" style="width:160px">
                                                <el-option :label="item.stdName" :value="item.id"
                                                    v-for="(item,index) in GatherindicatData"
                                                    :key="index"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="通讯正常秒数">
                                                <el-input style="width:160px" v-model="seconds" placeholder="请输入通讯正常秒数"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="dis">
                                        <el-form-item label="计算维度">
                                                <el-radio-group v-model="radio">
                                                    <el-radio :label="1">同站</el-radio>
                                                    <el-radio :label="2">同机型</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="计算函数">
                                                 <el-select v-model="calculateFunc" style="width:170px">
                                                <el-option :label="item.dictName" :value="item.dictValue" v-for="(item,index) in funData" :key="index"></el-option>

                                            </el-select>
                                        </el-form-item>
                                    </div>
                                 </el-form>
                            </div>
                            <div class="bottom">
                                 <p class="tit"><span>过滤器</span></p>
                                <div class="selectType">
                                    <div class="left">
                                    <p style="height:30px;line-height:30px">基本指标</p>
                                    <el-input
                                    @blur="selectBasicIndex"
                                    style="width:80%"
                                    placeholder="输入检索"
                                    suffix-icon="el-input__icon el-icon-search"
                                    v-model="basick">
                                </el-input>
                                    <div class="indexs">
                                         <p @click="stdSelect(index)" @dblclick="getStaValue(index)" v-for="(item,index) in this.GatherindicatData" class="stdNameSty" @mouseover="mouseovers($event,index)" :class="{'stdNameStys':index===stdIndexs}" :key="index">{{item.stdName}}</p>
                                    </div>
                                    </div>
                                    <div class="middle">
                                      <p style="text-align:left;font-size:12px;margin-bottom:3px;margin-left:20px">示例：a>0 && (b*3>10 || c==10)</p>
                                            <el-input
                                               @blur="ExpreValids"
                                                style="width:100%"
                                                type="textarea"
                                                resize="none"
                                                :autosize="{ minRows: 10, maxRows: 10}"
                                                placeholder="请输入表达式"
                                                v-model="ruleExp">
                                            </el-input>

                                    </div>
                                    <div class="right">
                                        <div class="ri-left">
                                             <el-select v-model="selExpression" @change="seleOperats" placeholder="请选择运算表达式">
                                              <el-option :label="item.dictName" :value="item.dictValue" v-for="(item,index) in this.getAlarmRuleOperatorClassed.res.data" :key="index">
                                              </el-option>
                                         </el-select>
                                            <div style="margin-bottom:10px"></div>
                                            <el-input
                                            style="width:80%"
                                            placeholder="输入检索"
                                            suffix-icon="el-input__icon el-icon-search"
                                            v-model="inpIndex">
                                        </el-input>
                                        <div class="ri-content">
                                            <p class="stdNameStyed" @mousemove="opratorStys($event,index)" v-for="(item,index) in Operators" :key="index" @dblclick="getOpratIndexs(index)" :class="{'stdNameStys':index===opratIndexs}">{{item.name}}</p>
                                        </div>
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
                        </div>
                        <div class="sure">
                        <el-button @click="cancels">取消</el-button><el-button type="primary" @click="addSure">确认</el-button>
                    </div>
         </el-dialog>
    </div>
</template>

<script>
import { FormItem } from 'element-ui'
import {
   addGroupPoint, getStdPointInfo, testExpression, getAlarmRuleOperatorClass, getAlarmRuleOperator, dictList
} from '@intelligentAlarms/request/api'
export default {
  name: 'flatConfig',
  data () {
    return {
      dialogTableVisibledFlats: false,
      compreName: '',
      stdIndexs: 0,
      opratIndexs: 0,
      compreNameChine: '',
      seconds: '',
      indicators: '',
      ruleExp: '',
      selExpression: '',
      radio: 1,
      calculateFunc: '',
      inpIndex: '',
      basick: '',
      stdNames: '',
      funData: [],
      GatherindicatData: [],
      Operators: [],
      opratorExpalin: {
         expalin: '',
         demo: ''
      },
      addGroupPointed: addGroupPoint({later: true}),
      getStdPointInfoed: getStdPointInfo({later: true}),
      testExpressioneds: testExpression({later: true}),
      getAlarmRuleOperatorClassed: getAlarmRuleOperatorClass({later: true}),
      getAlarmRuleOperatored: getAlarmRuleOperator({later: true}),
      dictListed: dictList({later: true}),
      showConfig: false
    }
  },
  created () {
    this.getStdPointInfoEv()
    this.getAlarmRuleOperatorClassed.getData()
  },
  methods: {
    // 双击
    getOpratIndexs (index) {
      this.ruleExp += this.Operators[index].name
    },
    opratorStys (e, index) {
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
    // 选择运算表达式
    seleOperats (val) {
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
        // 实现拖拽
    mouseovers (e, val) {
        this.stdIndexs = val
        let selection = window.getSelection()
        selection.removeAllRanges()
        let range = document.createRange()
        range.selectNodeContents(e.target)
        selection.addRange(range)
    },
        // 进行指标双击选择
    getStaValue (val) {
      this.ruleExp += this.GatherindicatData[val].stdName
    },
      // 指标选择样式修改
    stdSelect (val) {
        this.stdIndexs = val
    },
    // serach
    selectBasicIndex () {
    this.getStdPointInfoEv()
    },
    // 获取采集指标
    getStdPointInfoEv () {
      this.getStdPointInfoed.getData({bizType: '02', dtype: this.$parent.dtype}).then((res) => {
        if (res.code === 200) {
          this.GatherindicatData = res.data
        }
      })
    },
        // 表达式验证
    ExpreValids () {
      this.testExpressioneds.getData({expression: this.ruleExp}).then(res => {
          if (res.code !== 200) {
               this.$message.error('表达式错误，请重新输入')
          }
      })
    },
    opens () {
      this.dialogTableVisibledFlats = true
      this.dictListed.getData({dictType: 'ALARM_GROUP_POINT_FUN'}).then(res => {
           console.log(res)
           if (res.code === 200) {
              this.funData = res.data.filter(o => o.dictType === 'ALARM_GROUP_POINT_FUN')
              console.log(this.funData)
           }
      })
    },
    // 确定
    addSure () {
      this.addGroupPointed.getData({
            'aggDim': this.radio === 1 ? '01' : '02',
            'aggFunction': this.calculateFunc,
            'bizType': Number(this.$store.getters.station_class),
            'commTime': Number(this.seconds),
            'companyid': JSON.parse(localStorage.getItem('intelligentAlarms')).user.userInfo.currentRoleCompanyId,
            'dtype': Number(this.$parent.dtype),
            'field': this.compreName,
            'name': this.compreNameChine,
            'originalField': this.selExpression,
            'ruleExpCn': this.ruleExp
      }).then(res => {
        console.log(res)
         if (res.code === 200) {
           this.$bus.emit('addGroup')
           this.clears()
         }
      })
    },
    // 取消
    cancels () {
      this.dialogTableVisibledFlats = false
      this.clears()
    },
    clears () {
       this.compreName = ''
      this.compreNameChine = ''
      this.indicators = ''
      this.seconds = ''
      this.radio = 0
      this.formsed = ''
      this.basick = ''
      this.ruleExp = ''
      this.selExpression = ''
      this.inpIndex = ''
      this.calculateFunc = ''
    }
  },
  components: {
    ELFormItem: FormItem
  }
}
</script>

<style lang="scss" scoped>
::selection{background:rgba(49,191,204,0.5);color:#fff;}::-moz-selection{background:rgba(49,191,204,0.5);color:#fff;} ::-webkit-selection{background:rgba(49,191,204,0.5);color:#fff;}
.comprehensive {
  width: 100%;
  overflow: hidden;
  >>> .dialogFlatss {
    height: 90vh;
    overflow: hidden;
  }
  .wraper {
    width: 100%;
    // height: 60vh;
    overflow: auto;
    .top {
      width: 100%;
      height: 35%;
      .dis {
        display: flex;
      }
    }
    .bottom {
      width: 100%;
      height: 65%;
      .tit {
        width: 100%;
        height: 30px;
        border-bottom: 1px solid #e3e3e3;
        line-height: 30px;
        margin-bottom: 20px;
        span {
          border-bottom: 2px solid #2fbfcc;
          padding-bottom: 5px;
          font-size: 14px;
          color: #333333;
        }
      }
      .selectType {
        width: 100%;
        height: 245px;
        overflow: hidden;
        .left {
          width: 20%;
          max-height: 220px;
          overflow: auto;
          float: left;
              background:rgba(236,238,248,0.4);
              padding-left: 10px;

          .indexs {
            width: 100%;
            height: 100%;
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
                color: #fff;

              }
          }
          .comm {
            width: 100%;
            height: 140px;
            overflow: auto;
          }
        }
        .middle {
          width: 35%;
          height:200px;
          float: left;
          text-align: center;
            >>> .el-textarea__inner {
              width: 90%;
            margin: 0 auto;
              background:rgba(236,238,248,0.4);
            }
        }
        .right {
          width: 45%;
          max-height: 220px;
          overflow: auto;
          float: left;
          display: flex;
          .ri-left {
            width: 50%;
            height: 100%;
              background:rgba(236,238,248,0.4);

          }
          .ri-right {
            width: 50%;
            height: 90%;
            .comtent {
              width: 80%;
              height:220px;
              margin:0 auto;
              overflow: auto;
              border: 1px solid #e3e3e3;
            }
          }
          .ri-content {
            width: 100%;
            height: 150px;
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
      height:40px;
      margin: 0 auto;
      padding-top: 10px;
      text-align: center;
    }
}
</style>
