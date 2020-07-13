<template>
    <div class="comprehensive">
                <el-dialog
                    width="50%"
                    center
                    title="综合指标配置"
                    top="10vh"
                    custom-class="dialogFlatss"
                    :visible.sync="dialogTableVisibledFlats"
                    :modal-append-to-body="false"
                      >
                        <div class="wraper">
                            <div class="top">
                                 <el-form ref="form" label-width="150px" style="margin-top:20px">
                                    <div class="dis">
                                        <el-form-item label="综合质变名称">
                                                <el-input style="width:160px" v-model="compreName" placeholder="例如acp_st"></el-input>
                                        </el-form-item>
                                        <el-form-item label="综合数据中文名称">
                                                <el-input style="width:160px" v-model="compreNameChine" placeholder="例如电站级平均功率"></el-input>
                                        </el-form-item>
                                    </div>
                                     <div class="dis">
                                        <el-form-item label="原始指标名称">
                                               <el-select v-model="forms" style="width:160px">
                                                <el-option label="区域一" value="shanghai"></el-option>
                                                <el-option label="区域二" value="beijing"></el-option>
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
                                                 <el-select v-model="formed" style="width:170px">
                                                <el-option label="区域一" value="shanghai"></el-option>
                                                <el-option label="区域二" value="beijing"></el-option>
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
                                    style="width:80%"
                                    placeholder="输入检索"
                                    suffix-icon="el-input__icon el-icon-search"
                                    v-model="inp">
                                </el-input>
                                    <div class="indexs">

                                    </div>
                                    </div>
                                    <div class="middle">
                                            <el-input
                                                style="width:100%"
                                                type="textarea"
                                                resize="none"
                                                :autosize="{ minRows: 10, maxRows: 10}"
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
                                        </div>
                                        <div class="ri-right">
                                        <div class="comtent" v-if="showConfig">
                                            <p style="border-bottom:1px solid #E3E3E3;width:100%;height:35px;line-height:35px;text-align:center"></p>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="sure">
                        <el-button>取消</el-button><el-button type="primary">确认</el-button>
                    </div>
         </el-dialog>
    </div>
</template>

<script>
import { FormItem } from 'element-ui'
export default {
  name: 'flatConfig',
  data () {
    return {
      dialogTableVisibledFlats: false,
      compreName: '',
      compreNameChine: '',
      seconds: '',
      radio: 0,
      formed: '',
      showConfig: true
    }
  },
  methods: {
    opens () {
      this.dialogTableVisibledFlats = true
    }
  },
  components: {
    ELFormItem: FormItem
  }
}
</script>

<style lang="scss" scoped>
.comprehensive {
  width: 100%;
  overflow: hidden;
  >>> .dialogFlatss {
    height: 79vh;
    overflow: hidden;
  }
  .wraper {
    width: 100%;
    height: 60vh;
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
          height: 160px;
          float: left;
          .indexs {
            width: 100%;
            height: 100%;
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
          height:200px;
          float: left;
          text-align: center;
          >>> .el-textarea__inner {
            width: 90%;
          }
        }
        .right {
          width: 45%;
          height: 250px;
          float: left;
          display: flex;
          .ri-left {
            width: 50%;
            height: 100%;
          }
          .ri-right {
            width: 50%;
            height: 90%;
            .comtent {
              width: 100%;
              height:100%;
              overflow: auto;
              border: 1px solid #e3e3e3;
            }
          }
          .ri-content {
            width: 100%;
            height: 150px;
            overflow: auto;
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
