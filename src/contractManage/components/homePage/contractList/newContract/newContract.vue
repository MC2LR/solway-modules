<template>
    <div class="new-contract">
        <el-form ref="contractForm" :model="saveCtApi.params" :inline='true' label-width="135px">
            <el-row>
                <el-col :span="8">
                    <el-form-item
                    prop="classifyId"
                    label="合同大类"
                    :rules="{ required: true, message: '请选择合同大类' }"
                    >
                        <el-select v-model="saveCtApi.params.classifyId" placeholder="请选择" style="width: 202px" v-if="getBaseContract.res && getBaseContract.res.body">
                            <el-option
                                v-for="item in getBaseContract.res.body"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <i class="iconfont iconxinzeng" style="color: #2487E2;margin-left: 10px" @click.stop="$bus.emit('openNewType', {status: 0, list: getBaseContract.res.body, 'event': $event})"></i>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                    prop="smallClassifyId"
                    label="合同小类"
                    :rules="{ required: true, message: '请选择合同小类' }"
                    >
                        <el-select v-model="saveCtApi.params.smallClassifyId" placeholder="请选择" style="width: 202px" v-if="getBaseContractSmall.res && getBaseContractSmall.res.body">
                            <el-option
                                v-for="item in getBaseContractSmall.res.body"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <i class="iconfont iconxinzeng" style="color: #2487E2;margin-left: 10px" @click.stop="$bus.emit('openNewType', {status: 2, list: getBaseContractSmall.res.body, 'event': $event})"></i>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                    prop="code"
                    label="合同编号"
                    :rules="[{ required: true, message: '请输入合同编号', trigger: 'blur' },
                    { validator: validateCodeOnly, trigger: 'blur' }]"
                    >
                        <el-input v-model="saveCtApi.params.code" placeholder="请输入合同编号" @input="$forceUpdate()"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item
                    prop="contractAmount"
                    label="合同额(元)"
                    :rules="[{ required: true, message: '请输入合同额', trigger: 'blur' }]"
                    >
                        <el-input v-model="saveCtApi.params.contractAmount" type="number" placeholder="请输入合同额" @input="$forceUpdate()"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                    prop="name"
                    label="合同摘要"
                    :rules="[{ required: true, message: '请输入合同摘要', trigger: 'blur' },
                    { validator: validateNameOnly, trigger: 'blur' }]"
                    >
                        <el-input v-model="saveCtApi.params.name" placeholder="请输入合同摘要" @input="$forceUpdate()"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                    prop="projectManagerId"
                    label="项目经理"
                    :rules="{ required: true, message: '请选择项目经理' }"
                    >
                        <el-select v-model="saveCtApi.params.projectManagerId" placeholder="请选择" style="width: 202px" filterable clearable>
                            <el-option
                                v-for="item in manageList"
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
                    prop="marketUserId"
                    label="市场负责人"
                    :rules="{ required: true, message: '请选择市场负责人' }"
                    >
                        <el-select v-model="saveCtApi.params.marketUserId" placeholder="请选择" style="width: 202px" filterable clearable>
                            <el-option
                                v-for="item in manageList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                    prop="partyA"
                    label="合同甲方"
                    :rules="{ required: true, message: '请输入合同甲方' }"
                    >
                        <el-autocomplete
                            class="inline-input"
                            v-model="saveCtApi.params.partyA"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入合同甲方"
                            @select="handleSelect"
                        ></el-autocomplete>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                    prop="partyB"
                    label="合同乙方"
                    :rules="{ required: true, message: '请输入合同乙方' }"
                    >
                      <el-autocomplete
                            class="inline-input"
                            v-model="saveCtApi.params.partyB"
                            :fetch-suggestions="querySearchB"
                            placeholder="请输入合同乙方"
                            @select="handleSelect"
                        ></el-autocomplete>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  prop="startDate"
                  label="开始时间"
                  >
                    <el-date-picker
                        style="width: 202px"
                        v-model="saveCtApi.params.startDate"
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
                    >
                      <el-date-picker
                          style="width: 202px"
                          v-model="saveCtApi.params.endDate"
                          type="date"
                          format="yyyy-MM-dd"
                          :picker-options="endtime"
                          placeholder="选择日期">
                      </el-date-picker>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="16">
                    <el-form-item
                    prop="Date"
                    label="合同时间范围"
                    :rules="{ required: true, message: '请选择合同时间范围' }"
                    >
                        <el-date-picker
                            style="width: 600px"
                            v-model="saveCtApi.params.Date"
                            format="yyyy-MM-dd"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col> -->
                <el-col :span="8">
                    <el-form-item
                    prop="signDate"
                    label="签订时间"
                    :rules="{ required: true, message: '请选择签订时间' }"
                    >
                        <el-date-picker
                            style="width: 202px"
                            v-model="saveCtApi.params.signDate"
                            format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期"
                            >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item prop="status" label="是否归档">
                        <el-select v-model="saveCtApi.params.status" placeholder="请选择" style="width: 202px" @change="$forceUpdate()">
                            <el-option label="是" value="0"></el-option>
                            <el-option label="否" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="remind" label="是否提醒">
                        <el-radio-group v-model="saveCtApi.params.remind" @change="$forceUpdate()">
                            <el-radio label="0">是</el-radio>
                            <el-radio label="1">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item
                    prop="dockComId"
                    label="对接公司"
                    :rules="{ required: true, message: '请选择对接公司' }"
                    >
                        <el-select v-model="saveCtApi.params.dockComId" placeholder="请选择" style="width: 202px" filterable @change="selectCompany()">
                            <el-option
                            v-for="item in selectAllCompany.res.body"
                            :key="item.comId"
                            :label="item.comName"
                            :value="item.comId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                    prop="dockUserId"
                    label="对接人"
                    :rules="{ required: true, message: '请选择对接人' }"
                    >
                        <el-select v-model="saveCtApi.params.dockUserId" placeholder="请选择" style="width: 202px" filterable clearable>
                            <el-option
                                v-for="item in dockUserList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="周期提醒">
                        <span>自合同到期前3个月起，每月通过弹窗提醒客户一次，到期一个月内每天通过弹窗提醒客户。</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item prop="note" style="width: 100%" class="reMark" label="备注">
                        <el-input placeholder="请输入备注" v-model="saveCtApi.params.note"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import {api＿getBaseContract, api＿saveContract, api＿getMarketManager, api＿getContract, api＿selectAllCompany, api＿getPartyAB} from '@contractManage/request/api'
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
  Autocomplete,
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
    ElRadioGroup: RadioGroup,
    ElAutocomplete: Autocomplete
  },
  props: {
    detail: {
      type: Object
    }
  },
  data () {
    return {
      getBaseContract: api＿getBaseContract({
          later: true,
          res: {body: []}
      }),
      getBaseContractSmall: api＿getBaseContract({
          later: true,
          res: {body: []}
      }),
      getContract: api＿getContract({
          later: true
      }),
      getMarketManager: api＿getMarketManager({
          later: true
      }),
      saveCtApi: api＿saveContract({
          later: true,
          sameTimeOnce: true,
          params: {
            classifyId: '',
            smallClassifyId: '',
            contractAmount: '',
            projectManagerId: '',
            code: '',
            name: '',
            marketUserId: '',
            partyA: '',
            partyB: '',
            startDate: '',
            endDate: '',
            remind: '0',
            status: '1',
            note: '',
            dockUserId: '',
            dockComId: '',
            signDate: ''
          },
          beforeSend (params) {
              // if (params.Date) {
              //   params.startDate = params.Date[0].Format('yyyy-MM-dd')
              //   params.endDate = params.Date[1].Format('yyyy-MM-dd')
              //   delete params.Date
              // }

              params.startDate = params.startDate ? new Date(params.startDate).Format('yyyy-MM-dd') : ''
              params.endDate = params.endDate ? new Date(params.endDate).Format('yyyy-MM-dd') : ''
              params.signDate = params.signDate ? new Date(params.signDate).Format('yyyy-MM-dd') : ''
              params.estimateStartDate = params.estimateStartDate ? new Date(params.estimateStartDate).Format('yyyy-MM-dd') : ''
              params.estimateEndDate = params.estimateEndDate ? new Date(params.estimateEndDate).Format('yyyy-MM-dd') : ''
              params.estimateCheckoutDate = params.estimateCheckoutDate ? new Date(params.estimateCheckoutDate).Format('yyyy-MM-dd') : ''

              if (params.Date) delete params.Date
              delete params.createDate
              delete params.updateDate
              delete params.createUser
              delete params.updateUser
              return params
          }
      }),
      selectAllCompany: api＿selectAllCompany({
          later: true,
          res: {body: []}
      }),
      getPartyAB: api＿getPartyAB({
          later: true
      }),
      validateCodeOnly: (rule, value, callback) => {
        if ((this.detail && this.detail.code === value)) {
          callback()
        } else if (this.codeArr.includes(value)) {
          callback(new Error('合同编号重复'))
        } else {
          callback()
        }
      },
      validateNameOnly: (rule, value, callback) => {
        if ((this.detail && this.detail.name === value)) {
          callback()
        } else if (this.nameArr.includes(value)) {
          callback(new Error('合同摘要重复'))
        } else {
          callback()
        }
      },
      starttime: {
        disabledDate: time => {
          if (this.saveCtApi.params.endDate) {
            return (
              time.getTime() > new Date(this.saveCtApi.params.endDate).getTime()
            )
          }
        }
      },
      endtime: {
        disabledDate: time => {
          if (this.saveCtApi.params.startDate) {
            return (
              time.getTime() < new Date(this.saveCtApi.params.startDate).getTime()
            )
          }
        }
      },
      partyAs: [],
      partyBs: [],
      codeArr: [],
      nameArr: [],
      manageList: [],
      dockUserList: []
    }
  },
  created () {
    this.$bus.on('openNewContract', this.openContract)
    this.$bus.on('updateSort', this.updateSort)
    this.$bus.on('saveContract', this.saveCt)
    this.$bus.on('updateSmallSort', this.updateSmallSort)
  },
  methods: {
    // 打开页面
    openContract () {
      this.$refs.contractForm.resetFields()

      // 获取合同大类
      this.getBaseContract.getData({status: 0})

      // 获取合同小类
      this.getBaseContractSmall.getData({status: 2})

      // 获取市场负责人
      this.getMarketManager.getData({comId: 135}).then(res => {
        this.manageList = res.body
      })
      // 获取表格数据
      this.getContract.getData().then(res => {
        this.codeArr = res.body.data.map(v => v.code)
        this.nameArr = res.body.data.map(v => v.name)
      })
      // 对接公司
      this.selectAllCompany.getData()
      // 合同甲方
      this.getPartyAB.getData({status: 0}).then(res => {
        this.partyAs = []
        res.body.forEach(v => {
          this.partyAs.push({value: v})
        })
      })
      // 合同乙方
      this.getPartyAB.getData({status: 1}).then(res => {
        this.partyBs = []
        res.body.forEach(v => {
          this.partyBs.push({value: v})
        })
      })

      if (this.detail) {
        this.saveCtApi.params = {
          ...this.saveCtApi.params,
          ...this.detail,
          Date: [new Date(this.detail.startDate), new Date(this.detail.endDate)],
          signDate: this.detail.signDate ? new Date(this.detail.signDate) : ''
        }
        this.getMarketManager.getData({comId: this.saveCtApi.params.dockComId}).then(res => {
          this.dockUserList = res.body
        })
      } else {
        delete this.saveCtApi.params.id
      }
    },
    // 选择对接公司
    selectCompany () {
      // 获取对接人
      this.saveCtApi.params.dockUserId = ''
      this.dockUserList = []
      this.getMarketManager.getData({comId: this.saveCtApi.params.dockComId}).then(res => {
        this.dockUserList = res.body
      })
    },
    // 提交按钮
    saveCt () {
      this.$refs.contractForm.validate(valid => {
          if (!valid) return false
          this.saveCtApi.getData().then(res => {
            if (res.code !== 0) return Message.error(res.msg)
            Message.success(res.msg)
            this.$emit('updateSuccess')
         })
      })
    },
    // 更新合同大类数据
    updateSort (res) {
      this.getBaseContract.res.body = res.data
    },
    // 更新合同小类数据
    updateSmallSort (res) {
      this.getBaseContractSmall.res.body = res.data
    },
    querySearch (queryString, cb) {
      var party = this.partyAs
      var results = queryString ? party.filter(this.createFilter(queryString)) : party
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearchB (queryString, cb) {
      var party = this.partyBs
      var results = queryString ? party.filter(this.createFilter(queryString)) : party
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (party) => {
        return (party.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      // console.log(item)
    }
  },
  beforeDestroy () {
      this.$bus.off('openNewContract', this.openContract)
      this.$bus.off('saveContract', this.saveCt)
      this.$bus.off('updateSort', this.updateSort)
      this.$bus.off('updateSmallSort', this.updateSmallSort)
  }
}
</script>

<style lang="scss">
.new-contract {
  .reMark {
    .el-form-item__content {
      width: calc(100% - 197px);
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
