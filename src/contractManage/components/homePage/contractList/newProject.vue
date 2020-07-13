<template>
    <div class="new-project">
        <el-form ref="projectForm" :model="saveContractProject.params" :inline='true' label-width="108px">
            <el-row>
                <el-col :span="6" style="position: relative;">
                    <el-form-item
                    prop="classifyId"
                    label="项目分类"
                    :rules="{ required: true, message: '请选择项目分类' }">
                        <el-select
                        v-model="saveContractProject.params.classifyId"
                        clearable
                        placeholder="请选择项目分类"
                        style="width: 197px"
                        >
                            <el-option
                                v-for="item in getBaseContract.res.body"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <i class="iconfont iconxinzeng" style="color: #2487E2;display: inline-block;margin-top: 10px;position: absolute;right: -17px;" @click.stop="$bus.emit('openNewType', {status: 1, list: getBaseContract.res.body, 'event': $event})"></i>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                    prop="code"
                    label="项目编号"
                    :rules="[{ required: true, message: '请输入项目编号' },
                    { validator: validateOnly, trigger: 'blur' }]"
                    >
                        <el-input
                        style="width: 197px"
                            placeholder="请输入项目编号"
                            v-model="saveContractProject.params.code"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                    prop="name"
                    label="项目名称"
                    :rules="[{ required: true, message: '请输入项目名称' },
                    { validator: validateOnly, trigger: 'blur' }]"
                    >
                        <el-input
                        style="width: 197px"
                            placeholder="请输入项目名称"
                            v-model="saveContractProject.params.name"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="contractId" label="所属合同">
                        <el-select v-model="saveContractProject.params.contractId" placeholder="请选择" style="width: 197px" filterable clearable :disabled="true">
                            <el-option
                                v-for="item in ctList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item prop="volume" label="项目容量(MW)">
                        <el-input placeholder="请输入项目容量" v-model="saveContractProject.params.volume" style="width: 197px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="site" label="项目地点">
                        <el-input placeholder="请输入项目地点" v-model="saveContractProject.params.site" style="width: 197px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                    prop="startDate"
                    label="开始时间"
                    :rules="{ required: true, message: '请选择开始时间' }"
                    >
                        <el-date-picker
                            style="width: 197px"
                            v-model="saveContractProject.params.startDate"
                            type="date"
                            format="yyyy-MM-dd"
                            :picker-options="starttime"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                    prop="endDate"
                    label="结束时间"
                    :rules="{ required: true, message: '请选择结束时间' }"
                    >
                        <el-date-picker
                            style="width: 197px"
                            v-model="saveContractProject.params.endDate"
                            type="date"
                            format="yyyy-MM-dd"
                            :picker-options="endtime"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item prop="dockUserId" label="对接人">
                        <el-select v-model="saveContractProject.params.dockUserId" placeholder="请选择" style="width: 197px" filterable clearable>
                            <el-option
                                v-for="item in getMarketManager.res.body"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                    prop="stId"
                    label="电站名称"
                    :rules="{ required: true, message: '请选择电站名称' }"
                    >
                        <el-select v-model="saveContractProject.params.stId" placeholder="请选择" style="width: 197px" filterable clearable>
                            <el-option
                                v-for="item in selectAllStation.res.body"
                                :key="item.stId"
                                :label="item.stName"
                                :value="item.stId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item prop="note" style="width: 100%" class="reMark" label="备注">
                        <el-input placeholder="请输入备注" v-model="saveContractProject.params.note"></el-input>
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
import {api＿getBaseContract, api＿saveContractProject, api＿getMarketManager, api＿selectAllStation, api＿getContractProject} from '@contractManage/request/api'
import {
  Select,
  Option,
  Form,
  FormItem,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
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
    ElDatePicker: DatePicker,
    ElRadio: Radio,
    ElRadioGroup: RadioGroup
  },
  props: {
      detail: {
          type: Object
      },
      ctDetail: {
          type: Object
      }
  },
  data () {
    return {
      getBaseContract: api＿getBaseContract({
          later: true
      }),
      getMarketManager: api＿getMarketManager({
          later: true
      }),
      selectAllStation: api＿selectAllStation({
          later: true
      }),
      getContractProject: api＿getContractProject({
          later: true
      }),
      saveContractProject: api＿saveContractProject({
          later: true,
          sameTimeOnce: true,
          params: {
            id: null,
            classifyId: '',
            code: '',
            name: '',
            contractId: '',
            volume: '',
            site: '',
            startDate: '',
            endDate: '',
            stId: '',
            note: '',
            dockUserId: ''
          },
          beforeSend (params) {
              delete params.createDate
              delete params.updateDate
              delete params.createUser
              delete params.updateUser
              params.startDate = params.startDate ? new Date(params.startDate).Format('yyyy-MM-dd') : ''
              params.endDate = params.endDate ? new Date(params.endDate).Format('yyyy-MM-dd') : ''

              return params
          }
      }),
      validateOnly: (rule, value, callback) => {
        if (this.detail) {
          callback()
        } else if (this.codeArr.includes(value)) {
          callback(new Error('项目编号重复'))
        } else if (this.nameArr.includes(value)) {
          callback(new Error('项目名称重复'))
        } else {
          callback()
        }
      },
      starttime: {
        disabledDate: time => {
          if (this.saveContractProject.params.endDate) {
            return (
              time.getTime() > new Date(this.saveContractProject.params.endDate).getTime()
            )
          }
        }
      },
      endtime: {
        disabledDate: time => {
          if (this.saveContractProject.params.startDate) {
            return (
              time.getTime() < new Date(this.saveContractProject.params.startDate).getTime()
            )
          }
        }
      },
      ctList: [],
      codeArr: [],
      nameArr: []
    }
  },
  mounted () {
    this.$bus.on('openProject', this.openProject)
    this.$bus.on('updatePtSort', this.updatePtSort)
  },
  methods: {
    async openProject () {
      await this.$timeout(100)

      this.$refs.projectForm.resetFields()

      // 获取项目分类
      this.getBaseContract.getData({status: 1})
      // 获取对接人
      this.getMarketManager.getData({comId: this.ctDetail.dockComId})
      //  获取电站
      this.selectAllStation.getData({comId: this.ctDetail.dockComId})
      // 获取表格数据
      this.getContractProject.getData().then(res => {
        this.codeArr = res.body.data.map(v => v.code)
        this.nameArr = res.body.data.map(v => v.name)
      })

      if (this.detail) {
        this.ctList = [
            {
                id: this.detail.contractId,
                name: this.detail.contract
            }
        ]
        this.saveContractProject.params = {
            ...this.saveContractProject.params,
            ...this.detail,
            startDate: new Date(this.detail.startDate),
            endDate: new Date(this.detail.endDate)
        }
      } else {
        this.ctList = [
            {
                id: this.ctDetail.id,
                name: this.ctDetail.name
            }
        ]
        this.saveContractProject.params.contractId = this.ctDetail.id
        delete this.saveContractProject.params.id
      }
    },
    // 取消
    cancel () {
      this.$refs.projectForm.resetFields()
      this.saveContractProject.params = {
        classifyId: '',
        code: '',
        name: '',
        contractId: '',
        volume: '',
        site: '',
        startDate: '',
        endDate: '',
        stId: '',
        note: '',
        dockUserId: ''
      }
      this.$bus.emit('hideNewProject')
    },
    // 提交
    submit () {
        this.$refs.projectForm.validate(valid => {
          if (!valid) return false
          this.saveContractProject.getData().then(res => {
            if (res.code !== 200) return Message.error(res.msg)
            Message.success(res.msg)
            this.$bus.emit('hideNewProject')
            this.$bus.emit('updateProject')
          })
      })
    },
    // 更新数据
    updatePtSort (res) {
      this.getBaseContract.res.body = res.data
    }
  },
  destroyed () {
      this.$bus.off('openProject', this.openProject)
      this.$bus.off('updatePtSort', this.updatePtSort)
  }
}
</script>

<style lang="scss">
.new-project {
    margin-top: 5px;
    .el-form--inline .el-form-item {
      margin-right: 0;
    }
  .reMark {
    .el-form-item__content {
      width: calc(100% - 110px);
    }
  }
  .el-dialog--center .el-dialog__body {
    padding: 25px 50px 25px;
  }
}
</style>

<style lang="scss" scoped>
.new-project {
    .dialog-footer {
        text-align: center;
    }
}
</style>
