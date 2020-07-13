<template>
    <div class="edit-project">
        <el-form ref="projectForm" :model="saveContractProject.params" :inline='true' label-width="135px">
            <el-row>
                <el-col :span="8">
                    <el-form-item
                    prop="classifyId"
                    label="项目分类"
                    :rules="{ required: true, message: '请选择项目分类' }">
                        <el-select
                        :disabled="!editEnable"
                        v-model="saveContractProject.params.classifyId"
                        placeholder="请选择"
                        style="width: 202px">
                            <el-option
                                v-for="item in cfList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                    prop="code"
                    label="项目编号"
                    :rules="{ required: true, message: '请输入项目编号' }"
                    >
                        <el-input
                         :disabled="!editEnable"
                        placeholder="请输入项目编号"
                        v-model="saveContractProject.params.code"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                    prop="name"
                    label="项目名称"
                    :rules="{ required: true, message: '请输入项目名称' }"
                    >
                        <el-input
                        :disabled="!editEnable"
                        placeholder="请输入项目名称"
                        v-model="saveContractProject.params.name"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item prop="contractId" label="所属合同">
                        <el-select
                        filterable clearable
                        :disabled="!!detail || !editEnable"
                        v-model="saveContractProject.params.contractId"
                        placeholder="请选择"
                        style="width: 202px">
                            <el-option
                                v-for="item in ctList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="volume" label="项目容量(MW)">
                        <el-input
                        :disabled="!editEnable"
                        placeholder="请输入项目容量"
                        v-model="saveContractProject.params.volume"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="site" label="项目地点">
                        <el-input
                        :disabled="!editEnable"
                        placeholder="请输入项目地点"
                        v-model="saveContractProject.params.site"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item
                    prop="startDate"
                    label="开始时间"
                    :rules="{ required: true, message: '请选择开始时间' }"
                    >
                        <el-date-picker
                            :disabled="!editEnable"
                            style="width: 202px"
                            v-model="saveContractProject.params.startDate"
                            type="date"
                            format="yyyy-MM-dd"
                            :picker-options="starttime"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                    prop="endDate"
                    label="结束时间"
                    :rules="{ required: true, message: '请选择结束时间' }"
                    >
                        <el-date-picker
                            :disabled="!editEnable"
                            style="width: 202px"
                            v-model="saveContractProject.params.endDate"
                            type="date"
                            format="yyyy-MM-dd"
                            :picker-options="endtime"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="dockUserId" label="对接人">
                        <el-select
                        filterable clearable
                        :disabled="!editEnable"
                        v-model="saveContractProject.params.dockUserId"
                        placeholder="请选择"
                        style="width: 202px">
                            <el-option
                                v-for="item in getMarketManager.res.body"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item
                    prop="stId"
                    label="电站名称"
                    :rules="{ required: true, message: '请选择电站名称' }"
                    >
                        <el-select
                        :disabled="!editEnable"
                        v-model="saveContractProject.params.stId" placeholder="请选择" style="width: 202px" filterable clearable>
                            <el-option
                                v-for="item in selectAllStation.res.body"
                                :key="item.stId"
                                :label="item.stName"
                                :value="item.stId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="8">
                    <el-form-item prop="createDate" label="创建时间">
                        <el-date-picker
                            style="width: 202px"
                            v-model="saveContractProject.params.createDate"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col> -->
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item prop="note" style="width: 100%" class="reMark" label="备注">
                        <el-input :disabled="!editEnable" placeholder="请输入备注" v-model="saveContractProject.params.note"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import { api＿getBaseContract, api＿saveContractProject, api＿getMarketManager, api＿selectAllStation, api＿UserAuthHandleGetBusinessManageAuth09 } from '@contractManage/request/api'
import {
  Table,
  TableColumn,
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
import mixinWidthHeight from '@comm/mixin/widthHeight'

export default {
  mixins: [mixinWidthHeight],
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
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
      saveContractProject: api＿saveContractProject({
          later: true,
          sameTimeOnce: true,
          params: {
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
      UserAuthHandleGetBusinessManageAuth09: api＿UserAuthHandleGetBusinessManageAuth09({
          later: true,
          res: { body: {} }
      }),
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
      cfList: [],
      editEnable: true
    }
  },
  mounted () {
    this.$bus.on('openEditProject', this.openEditProject)
    this.$bus.on('saveProject', this.savePt)
    // 判断合同管理员权限
    this.UserAuthHandleGetBusinessManageAuth09.getData().then(res => {
        this.editEnable = res.body.enable
    })
  },
  methods: {
    // 打开页面
    async openEditProject () {
      await this.$timeout(100)

      // 获取项目分类
      this.getBaseContract.getData({status: 1})
      // 获取对接人
      this.getMarketManager.getData({comId: this.detail.dockComId})
      //  获取电站
      this.selectAllStation.getData({comId: this.detail.dockComId})

      this.saveContractProject.params = {
        ...this.saveContractProject.params,
        ...this.detail,
        startDate: new Date(this.detail.startDate),
        endDate: new Date(this.detail.endDate)
      }

      this.ctList = [
        {
            id: this.detail.contractId,
            name: this.detail.contract
        }
      ]
      this.cfList = [
        {
            id: this.detail.classifyId,
            name: this.detail.classify
        }
      ]
    },
    // 提交按钮
    savePt () {
      this.$refs.projectForm.validate(valid => {
          if (!valid) return false
          this.saveContractProject.getData().then(res => {
            if (res.code !== 0) return Message.error(res.msg)
            Message.success(res.msg)
            this.$emit('updateSuccess')
          })
      })
    }
  },
  beforeDestroy () {
      this.$bus.off('openEditProject', this.openEditProject)
      this.$bus.off('saveProject', this.savePt)
  }
}
</script>

<style lang="scss">
.edit-project {
  .reMark {
    .el-form-item__content {
      width: calc(100% - 180px);
    }
  }
  .el-dialog--center .el-dialog__body {
    padding: 25px 50px 25px;
  }
}
</style>
