<template>
    <div class="new-station">
        <el-form ref="stationForm" :model="psUpdate.params" :inline='true' label-width="135px">
            <el-row>
                <el-col :span="8">
                    <el-form-item
                    prop="depid"
                    label="所属部门"
                    >
                        <el-select v-model="psUpdate.params.depid" placeholder="请选择" style="width: 202px" v-if="getDepartmentTree.res">
                            <el-option
                                v-for="item in getDepartmentTree.res"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                    prop="stationcode"
                    label="电站编号"
                    :rules="{ required: true, message: '请输入电站编号', trigger: 'blur' }"
                    >
                        <el-input v-model="psUpdate.params.stationcode" placeholder="请输入电站编号" @input="$forceUpdate()"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                    prop="stationname"
                    label="电站简称"
                    :rules="{ required: true, message: '请输入电站简称', trigger: 'blur' }"
                    >
                        <el-input v-model="psUpdate.params.stationname" placeholder="请输入电站简称" @input="$forceUpdate()"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item
                    prop="stationfullname"
                    label="电站全称"
                    :rules="{ required: true, message: '请输入电站全称', trigger: 'blur' }"
                    >
                        <el-input v-model="psUpdate.params.stationfullname" placeholder="请输入电站全称" @input="$forceUpdate()"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                    prop="stationClass"
                    label="电站分类"
                    >
                        <el-select v-model="psUpdate.params.stationClass" placeholder="请选择" style="width: 202px" v-if="getDepartmentTree.res">
                            <el-option
                                v-for="item in getDepartmentTree.res"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    prop="stationType"
                    label="电站类型"
                    >
                        <el-select v-model="psUpdate.params.stationType" placeholder="请选择" style="width: 202px" v-if="getDepartmentTree.res">
                            <el-option
                                v-for="item in getDepartmentTree.res"
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
                  prop="managerid"
                  label="负责人"
                  >
                      <el-select v-model="psUpdate.params.managerid" placeholder="请选择" style="width: 202px" v-if="getDepartmentTree.res">
                          <el-option
                              v-for="item in getDepartmentTree.res"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                          </el-option>
                      </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item
                  prop="buildcapacity"
                  label="总装机量(kw)"
                  >
                      <el-input v-model="psUpdate.params.buildcapacity" placeholder="请输入总装机量" @input="$forceUpdate()"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  prop="productiondate"
                  label="投产时间"
                  >
                  <el-date-picker
                      style="width: 202px"
                      v-model="psUpdate.params.productiondate"
                      type="date"
                      format="yyyy-MM-dd"
                      placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  prop="closedate"
                  label="停产时间"
                  >
                  <el-date-picker
                      style="width: 202px"
                      v-model="psUpdate.params.closedate"
                      type="date"
                      format="yyyy-MM-dd"
                      placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item
                  prop="lineInType"
                  label="电站接入方式"
                  >
                      <el-select v-model="psUpdate.params.lineInType" placeholder="请选择" style="width: 202px" v-if="getDepartmentTree.res">
                          <el-option
                              v-for="item in getDepartmentTree.res"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                          </el-option>
                      </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item
                  prop="insureName"
                  label="保险公司名称"
                  >
                      <el-input v-model="psUpdate.params.insureName" placeholder="请输入总装机量" @input="$forceUpdate()"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                  <el-form-item
                  prop="insureCont"
                  label="保险公司联系人"
                  >
                      <el-input v-model="psUpdate.params.insureCont" placeholder="请输入联系人" @input="$forceUpdate()"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item
                  prop="insureTel"
                  label="保险公司联系电话"
                  >
                      <el-input v-model="psUpdate.params.insureTel" placeholder="请输入联系电话" @input="$forceUpdate()"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import { api＿getDepartmentTree, api＿powerStationUpdate } from '@stationManage/request/api'
import {
  Select,
  Option,
  Form,
  FormItem,
  Input,
  Row,
  Col,
  DatePicker
} from 'element-ui'

export default {
  components: {
    ElSelect: Select,
    ElOption: Option,
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElRow: Row,
    ElCol: Col,
    ElDatePicker: DatePicker
  },
  props: {
    detail: {
      type: Object
    }
  },
  data () {
    return {
      getDepartmentTree: api＿getDepartmentTree({
          later: true,
          res: {}
      }),
      psUpdate: api＿powerStationUpdate({
          later: true,
          sameTimeOnce: true,
          params: {
          },
          beforeSend (params) {
          }
      })
    }
  },
  created () {
    this.$bus.on('openNewStation', this.openStation)
  },
  methods: {
    // 打开页面
    async openStation () {
      this.$refs.stationForm.resetFields()

      // 获取公司下的部门
      this.getDepartmentTree.getData({comid: ''})

      if (this.detail) {

      } else {
      }
    }
  },
  beforeDestroy () {
      this.$bus.off('openNewContract', this.openStation)
  }
}
</script>

<style lang="scss">
.new-station {
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
