<template>
    <div class="new-form">
        <el-form ref="Form" :model="params" :inline='true' label-width="150px">
            <el-row>
                <el-col :span="12">
                    <el-form-item
                    prop="fmCode"
                    label="表单code"
                    :rules="[{ required: true, message: '请输入code', trigger: 'blur' }]"
                    >
                        <el-input v-model="params.fmCode" placeholder="请输入表单code" @input="$forceUpdate()"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                    prop="fmName"
                    label="名称"
                    :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
                    >
                        <el-input v-model="params.fmName" placeholder="请输入名称" @input="$forceUpdate()"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item
                    prop="fmDesc"
                    label="描述"
                    >
                        <el-input v-model="params.fmDesc" placeholder="请输入描述" @input="$forceUpdate()"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                    prop="fmPrefix"
                    label="前缀"
                    >
                        <el-input v-model="params.fmPrefix" placeholder="请输入前缀" @input="$forceUpdate()"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="13">
                    <el-form-item
                    prop="fmConfig"
                    label="扩展配置"
                    style="width: 100%"
                    class="fmConfig"
                    :rules="[{ validator: validateJson, trigger: 'blur' }]"
                    >
                        <el-input
                          type="textarea"
                          :rows="10"
                          autosize
                          placeholder="请输入扩展配置"
                          v-model="params.fmConfig">
                        </el-input>
                        <el-button type="primary" @click="ftJson()" class="ftJson">格式化</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import { api＿dynamicFormUpdate } from '@dynamicFormConfig/request/api'
import {
  Form,
  FormItem,
  Input,
  Button,
  Row,
  Col,
  Message
} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'

export default {
  mixins: [mixinWidthHeight],
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElButton: Button,
    ElRow: Row,
    ElCol: Col
  },
  props: {
    detail: {
      type: Object
    }
  },
  data () {
    return {
      params: {
        fmCode: '',
        fmName: '',
        fmDesc: '',
        fmPrefix: '',
        fmConfig: '',
        hasBaseTbl: 1,
        hasCtn: 0
      },
      dynamicFormUpdate: api＿dynamicFormUpdate({
          later: true,
          sameTimeOnce: true,
          beforeSend (params) {
            delete params.keyword
            delete params.fmCssClass
            delete params.enable
            return params
          }
      }),
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
      }
    }
  },
  created () {
    this.$bus.on('openNewForm', this.open)
    this.$bus.on('saveform', this.saveForm)
  },
  methods: {
    // 格式化
    ftJson () {
      this.$forceUpdate()
      try {
        var obj = JSON.parse(this.params.fmConfig)
        if (typeof obj === 'object' && obj) {
          this.params.fmConfig = JSON.stringify(obj, null, '\t')
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
    // 打开页面
    open () {
      if (this.detail) {
        this.params = {
          ...this.params,
          ...this.detail
        }
      } else {
        delete this.params.id
      }
    },
    // 保存
    saveForm () {
      this.$refs.Form.validate(valid => {
          if (!valid) return false
          this.dynamicFormUpdate.getData(this.params).then(res => {
            if (res.code === 200) {
                Message({
                    type: 'success',
                    message: '成功'
                })
                this.$emit('updateSuccess')
            } else {
                Message({
                    type: 'error',
                    message: '失败'
                })
            }
         })
      })
    }
  },
  beforeDestroy () {
    this.$bus.off('openNewForm', this.open)
    this.$bus.off('saveform', this.saveForm)
  }
}
</script>

<style lang="scss">
.new-form {
  .fmConfig {
    .ftJson {
      margin-left: 10px;
      vertical-align: bottom;
    }
    .el-form-item__content {
      width: calc(100% - 150px);
      .el-textarea {
        width: calc(100% - 150px);
      }
    }
  }
  .el-dialog--center .el-dialog__body {
    padding: 25px 50px 25px;
  }
  .el-popper[x-placement^=bottom] .popper__arrow {
    border-bottom-color: red;
  }
}
</style>
