<template>
    <div class="new-field">
        <el-form ref="fieldForm" :model="params" :inline='true' label-width="108px">
            <el-row>
                <el-col :span="6">
                    <el-form-item
                    prop="fdName"
                    label="字段名称"
                    :rules="[{ required: true, message: '请输入字段名称' }]"
                    >
                        <el-input
                            style="width: 197px"
                            placeholder="请输入字段名称"
                            v-model="params.fdName"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                    prop="fdCode"
                    label="字段code"
                    :rules="[{ required: true, message: '请输入字段code' }]"
                    >
                        <el-input
                            style="width: 197px"
                            placeholder="请输入字段code"
                            v-model="params.fdCode"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                    prop="fdUnit"
                    label="单位"
                    >
                        <el-input
                            style="width: 197px"
                            placeholder="请输入单位"
                            v-model="params.fdUnit"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="attrRequired" label="是否必填">
                        <el-radio-group v-model="params.attrRequired" @change="$forceUpdate()">
                            <el-radio :label="0">是</el-radio>
                            <el-radio :label="1">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item
                    prop="attrPlaceholder"
                    label="提示文本"
                    >
                        <el-input
                            style="width: 197px"
                            placeholder="请输入提示文本"
                            v-model="params.attrPlaceholder"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                    prop="attrValidator"
                    label="校验"
                    >
                        <el-input
                            style="width: 197px"
                            placeholder="请输入校验"
                            v-model="params.attrValidator"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                    prop="attrType"
                    label="组件类型"
                    :rules="[{ required: true, message: '请输入组件类型' }]"
                    >
                        <el-select v-model="params.attrType" placeholder="请选择" style="width: 197px" @change="changeAttrType()">
                            <el-option
                                v-for="item in dynamicWidgetList.res.data"
                                :key="item.widgetType"
                                :label="item.widgetName"
                                :value="item.widgetType">
                                </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                   <el-form-item
                    prop="attrDefVal"
                    label="默认值"
                    v-show="params.attrType === 'text'"
                    >
                        <el-input
                            style="width: 197px"
                            placeholder="请输入默认值"
                            v-model="params.attrDefVal"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                    prop="attrDataUrl"
                    label="远程数据地址"
                    v-show="params.attrType === 'select'"
                    >
                        <el-select v-model="params.attrDataUrl" placeholder="请选择" style="width: 197px" @change="getUrl()">
                            <el-option
                                v-for="item in dynamicFieldDataTplList.res.data"
                                :key="item.url"
                                :label="item.name"
                                :value="item.url">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                    prop="attrFormat"
                    label="格式化"
                    v-show="params.attrType === 'datetime' || params.attrType === 'date' || params.attrType === 'time'"
                    >
                        <el-input
                            style="width: 197px"
                            placeholder="例: yyyy-mm-dd hh:mm:ss"
                            v-model="params.attrFormat"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                  <el-form-item
                  prop="haveNext"
                  label="是否有下级"
                  v-show="params.attrType === 'select'"
                  >
                      <el-radio-group v-model="params.haveNext" @change="hvNext()">
                          <el-radio label="0">是</el-radio>
                          <el-radio label="1">否</el-radio>
                      </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                    prop="nextField"
                    label="关联下级字段"
                    v-show="params.haveNext === '0' && params.attrType === 'select'"
                    >
                        <el-input
                            style="width: 197px"
                            placeholder="请输入关联下级字段"
                            v-model="params.nextField"
                            @input="nextField()"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item
                    prop="attrConfig"
                    label="拓展配置"
                    :rules="[{ validator: validateJson, trigger: 'blur' }]"
                    class="expandConfig"
                    >
                        <el-input
                            type="textarea"
                            :rows="10"
                            autosize
                            placeholder="请输入拓展配置"
                            v-model="params.attrConfig"
                            @input="changeAttrConfig()"
                        ></el-input>
                        <el-button type="primary" @click="ftJson()" class="ftJson">格式化</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取 消</el-button>
            <el-button type="primary" @click="submit()">提 交</el-button>
        </div>
    </div>
</template>

<script>
import { api＿dynamicFieldUpdate, api＿dynamicFieldDataTplList, api＿dynamicWidgetList } from '@dynamicFormConfig/request/api'
import {
  Select,
  Option,
  Form,
  FormItem,
  Input,
  Button,
  Row,
  Col,
  Radio,
  RadioGroup,
  Message
} from 'element-ui'

export default {
  components: {
    ElSelect: Select,
    ElOption: Option,
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElButton: Button,
    ElRow: Row,
    ElCol: Col,
    ElRadio: Radio,
    ElRadioGroup: RadioGroup
  },
  props: {
      detail: {
          type: Object
      },
      formDetail: {
          type: Object
      }
  },
  data () {
    return {
      params: {
        fdName: '',
        fdCode: '',
        fdUnit: '',
        attrRequired: 1,
        attrMultiple: '0',
        attrPlaceholder: '',
        attrType: '',
        attrDefVal: '',
        attrDataUrl: '',
        attrFormat: '',
        attrConfig: '',
        haveNext: '1'
      },
      param_required: '',
      validateJson: (rule, value, callback) => {
        if (!value) callback()
        if (typeof value === 'string') {
          try {
            var obj = JSON.parse(value)
            if (typeof obj === 'object' && obj) {
              callback()
            } else {
              callback(new Error('请输入正确的json格式'))
            }
          } catch (e) {
            callback(new Error('请输入正确的json格式'))
          }
        } else {
          callback(new Error('请输入正确的json格式'))
        }
      },
      dynamicFieldDataTplList: api＿dynamicFieldDataTplList({
          later: true,
          res: {
            data: []
          }
      }),
      dynamicWidgetList: api＿dynamicWidgetList({
          later: true,
          res: {
            data: []
          }
      }),
      dynamicFieldUpdate: api＿dynamicFieldUpdate({
          later: true,
          sameTimeOnce: true,
          beforeSend (params) {
            delete params.haveNext
            delete params.nextField
            if (params.attrType !== 'select') {
                delete params.sqlListFtl
                delete params.sqlValFtl
                delete params.attrDataUrl
            }
            if (params.attrType !== 'text') {
                delete params.attrDefVal
            }
            if (!['datetime', 'date', 'time'].includes(params.attrType)) {
                delete params.attrFormat
            }
            return params
          }
      })
    }
  },
  mounted () {
    this.$bus.on('openNewField', this.openNewField)
  },
  methods: {
    // 切换组件类型
    changeAttrType () {
      this.$forceUpdate()
      this.params.haveNext = '1'
      try {
        var obj = JSON.parse(this.params.attrConfig)
        if (typeof obj === 'object' && obj) {
          if (this.params.attrType !== 'select') {
            delete obj.pid
            delete obj.cid
            delete this.params.nextField
            this.params.attrConfig = JSON.stringify(obj, null, '\t')
          }
        }
      } catch (e) {}
    },
    // 格式化按钮
    ftJson () {
      this.$forceUpdate()
      try {
        var obj = JSON.parse(this.params.attrConfig)
        if (typeof obj === 'object' && obj) {
          this.params.attrConfig = JSON.stringify(obj, null, '\t')
        } else {
          Message({
            type: 'error',
            message: '请输入正确的json格式'
        })
        }
      } catch (e) {
        Message({
            type: 'error',
            message: '请输入正确的json格式'
        })
      }
    },
    // 输入拓展配置
    changeAttrConfig () {
      this.$forceUpdate()
      try {
        var obj = JSON.parse(this.params.attrConfig)
        if (typeof obj === 'object' && obj) {
          this.params.nextField = obj.cid
        }
      } catch (e) {}
    },
    // 是否有下级
    hvNext () {
      this.$forceUpdate()
      if (this.params.haveNext === '1') {
        this.params.nextField = ''
        try {
          var obj = JSON.parse(this.params.attrConfig)
          if (typeof obj === 'object' && obj) {

          } else {
            this.params.attrConfig = {}
          }
        } catch (e) {
          this.params.attrConfig = {}
        }
        if (typeof this.params.attrConfig === 'string') this.params.attrConfig = JSON.parse(this.params.attrConfig)
        delete this.params.attrConfig.cid
        this.params.attrConfig = JSON.stringify(this.params.attrConfig, null, '\t')
      }
    },
    // 输入下级字段
    nextField () {
      this.$forceUpdate()
      try {
        var obj = JSON.parse(this.params.attrConfig)
        if (typeof obj === 'object' && obj) {

        } else {
          this.params.attrConfig = {}
        }
      } catch (e) {
        this.params.attrConfig = {}
      }

      if (typeof this.params.attrConfig === 'string') this.params.attrConfig = JSON.parse(this.params.attrConfig)

      this.params.attrConfig.pid = ''
      this.params.attrConfig.cid = this.params.nextField
      this.params.attrConfig = JSON.stringify(this.params.attrConfig, null, '\t')
    },
    // 选择远程地址
    getUrl () {
      this.$forceUpdate()
      this.dynamicFieldDataTplList.res.data.forEach(v => {
        if (v.url === this.params.attrDataUrl) {
          this.param_required = v.paramConfig ? JSON.parse(v.paramConfig).param_required : null
        }
      })

      try {
        var obj = JSON.parse(this.params.attrConfig)
        if (typeof obj === 'object' && obj) {

        } else {
          this.params.attrConfig = {}
        }
      } catch (e) {
        this.params.attrConfig = {}
      }
      if (typeof this.params.attrConfig === 'string') this.params.attrConfig = JSON.parse(this.params.attrConfig)

      this.params.attrConfig.pid = ''
      this.params.attrConfig.paramRequired = this.param_required
      this.params.attrConfig = JSON.stringify(this.params.attrConfig, null, '\t')
    },
    // 打开页面
    async openNewField () {
      await this.$timeout(0)
      this.$refs.fieldForm.resetFields()
      this.params = {
        fdName: '',
        fdCode: '',
        fdUnit: '',
        attrRequired: 1,
        attrMultiple: '0',
        attrPlaceholder: '',
        attrType: '',
        attrDefVal: '',
        attrDataUrl: '',
        attrFormat: '',
        haveNext: '1'
      }

      // 远程数据地址
      this.dynamicFieldDataTplList.getData()
      // 组件类型
      this.dynamicWidgetList.getData()

      if (this.detail) {
          this.params = {
            ...this.params,
            ...this.detail
        }
        if (this.params.attrType === 'select' && this.params.attrConfig) {
            let attrConfig = JSON.parse(this.params.attrConfig)
            if (attrConfig.cid) { this.params.haveNext = '0'; this.params.nextField = attrConfig.cid }
        }
      } else {
          delete this.params.id
      }
    },
    // 提交
    submit () {
        this.$refs.fieldForm.validate(valid => {
          if (!valid) return false
          if (this.params.attrType === 'select') {
            this.dynamicFieldDataTplList.res.data.forEach(v => {
              if (v.url === this.params.attrDataUrl) {
                this.params.sqlListFtl = v.sqlListFtl
                this.params.sqlValFtl = v.sqlValFtl
              }
            })
          }

          this.dynamicFieldUpdate.getData({fmCode: this.formDetail.fmCode, ...this.params}).then(res => {
            if (res.code === 200) {
                Message({
                    type: 'success',
                    message: '提交成功'
                })
                this.$bus.emit('hideNewField')
                this.$bus.emit('openConfigForm')
            } else {
                Message({
                    type: 'error',
                    message: '提交失败'
                })
            }
          })
      })
    },
    // 取消
    cancel () {
      this.$refs.fieldForm.resetFields()
      this.$bus.emit('hideNewField')
    }
  },
  beforeDestroy () {
    this.$bus.off('openNewField', this.openNewField)
  }
}
</script>

<style lang="scss">
.new-field {
    margin-top: 5px;
    .el-form--inline .el-form-item {
      margin-right: 0;
    }
  .expandConfig {
      width: 100%;
    .ftJson {
      margin-left: 10px;
      vertical-align: bottom;
    }
    .el-form-item__content {
      width: calc(100% - 110px);
      .el-textarea {
        width: calc(100% - 110px);
      }
    }
  }
  .el-dialog--center .el-dialog__body {
    padding: 25px 50px 25px;
  }
}
</style>

<style lang="scss" scoped>
.new-field {
    .dialog-footer {
        text-align: center;
    }
}
</style>
