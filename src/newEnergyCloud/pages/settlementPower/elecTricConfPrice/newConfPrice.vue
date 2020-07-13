<template>
    <div class="new-price">
        <el-form ref="Form" :model="custStElecPriceSaveElecPrice.params" :inline='true' label-width="120px">
            <el-row>
                <el-col :span="12" style="text-align: right;padding-right: 70px">
                    <el-form-item prop="sharpOrigPrice" label="尖原电价(元)"
                    :rules="{ required: true, message: '请输入尖原电价' }">
                        <el-input
                            v-model="custStElecPriceSaveElecPrice.params.sharpOrigPrice"
                            style="width: 210px"
                            placeholder="请输入尖原电价"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" style="text-align: left;padding-left: 20px">
                    <el-form-item prop="sharpPrice" label="尖折扣电价(元)"
                    :rules="{ required: true, message: '请输入尖折扣电价' }">
                        <el-input
                            v-model="custStElecPriceSaveElecPrice.params.sharpPrice"
                            style="width: 210px"
                            placeholder="请输入尖折扣电价"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" style="text-align: right;padding-right: 70px">
                    <el-form-item prop="peakOrigPrice" label="峰原电价(元)"
                    :rules="{ required: true, message: '请输入峰原电价' }">
                        <el-input
                            v-model="custStElecPriceSaveElecPrice.params.peakOrigPrice"
                            style="width: 210px"
                            placeholder="请输入峰原电价"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" style="text-align: left;padding-left: 20px">
                    <el-form-item prop="peakPrice" label="峰折扣电价(元)"
                    :rules="{ required: true, message: '请输入峰折扣电价' }">
                        <el-input
                            v-model="custStElecPriceSaveElecPrice.params.peakPrice"
                            style="width: 210px"
                            placeholder="请输入峰折扣电价"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" style="text-align: right;padding-right: 70px">
                    <el-form-item prop="flatOrigPrice" label="平原电价(元)"
                    :rules="{ required: true, message: '请输入平原电价' }">
                        <el-input
                          v-model="custStElecPriceSaveElecPrice.params.flatOrigPrice"
                          style="width: 210px"
                          placeholder="请输入平原电价"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" style="text-align: left;padding-left: 20px">
                    <el-form-item prop="flatPrice" label="平折扣电价(元)"
                    :rules="{ required: true, message: '请输入平折扣电价' }">
                        <el-input
                          v-model="custStElecPriceSaveElecPrice.params.flatPrice"
                          style="width: 210px"
                          placeholder="请输入平折扣电价"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" style="text-align: right;padding-right: 70px">
                    <el-form-item prop="valleyOrigPrice" label="谷原电价(元)"
                    :rules="{ required: true, message: '请输入谷原电价' }">
                        <el-input
                          v-model="custStElecPriceSaveElecPrice.params.valleyOrigPrice"
                          style="width: 210px"
                          placeholder="请输入谷原电价"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" style="text-align: left;padding-left: 20px">
                    <el-form-item prop="valleyPrice" label="谷折扣电价(元)"
                    :rules="{ required: true, message: '请输入谷折扣电价' }">
                        <el-input
                          v-model="custStElecPriceSaveElecPrice.params.valleyPrice"
                          style="width: 210px"
                          placeholder="请输入谷折扣电价"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" style="text-align: right;padding-right: 70px">
                    <el-form-item
                    prop="startDate"
                    label="生效日期"
                    :rules="{ required: true, message: '请选择生效日期' }"
                    >
                        <el-date-picker
                            v-model="custStElecPriceSaveElecPrice.params.startDate"
                            style="width: 210px"
                            type="month"
                            format="yyyy-MM"
                            :picker-options="starttime"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12" style="text-align: left;padding-left: 20px">
                    <el-form-item
                    prop="endDate"
                    label="结束日期"
                    :rules="{ required: true, message: '请选择结束日期' }"
                    >
                        <el-date-picker
                            v-model="custStElecPriceSaveElecPrice.params.endDate"
                            style="width: 210px"
                            type="month"
                            format="yyyy-MM"
                            :picker-options="endtime"
                            placeholder="选择日期">
                        </el-date-picker>
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
import { api＿custStElecPriceSaveElecPrice } from '@newEnergyCloud/request/api'
export default {
  props: {
      detail: {
          type: Object
      }
  },
  data () {
    return {
      custStElecPriceSaveElecPrice: api＿custStElecPriceSaveElecPrice({
          later: true,
          params: {
            id: null,
            stId: '',
            sharpPrice: '',
            peakPrice: '',
            flatPrice: '',
            valleyPrice: '',
            startDate: '',
            endDate: ''
          },
          res: { body: [] },
          beforeSend (params) {
              delete params.createTime
              delete params.updateTime
              delete params.stid
              params.startDate = params.startDate ? new Date(params.startDate).Format('yyyy-MM') : ''
              params.endDate = params.endDate ? new Date(params.endDate).Format('yyyy-MM') : ''
              return params
          }
      }),
      starttime: {
        disabledDate: time => {
          if (this.custStElecPriceSaveElecPrice.params.endDate) {
            return (
              time.getTime() > new Date(this.custStElecPriceSaveElecPrice.params.endDate).getTime()
            )
          }
        }
      },
      endtime: {
        disabledDate: time => {
          if (this.custStElecPriceSaveElecPrice.params.startDate) {
            return (
              time.getTime() < new Date(this.custStElecPriceSaveElecPrice.params.startDate).getTime()
            )
          }
        }
      }
    }
  },
  mounted () {
    this.$bus.on('openPrice', this.openPrice)
    this.$bus.on('updateElecPriceList', this.getStid)
    this.$bus.on('clearElecPriceConfList', this.clearElecPriceConfList)
  },
  methods: {
    async openPrice () {
      await this.$timeout(100)
      this.$refs.Form.resetFields()
      this.custStElecPriceSaveElecPrice.params = {}
      if (this.detail) {
        this.custStElecPriceSaveElecPrice.params = {
            ...this.custStElecPriceSaveElecPrice.params,
            ...this.detail,
            startDate: new Date(this.detail.startDate),
            endDate: new Date(this.detail.endDate)
        }
        this.custStElecPriceSaveElecPrice.params.stId = this.stid
      } else {
        delete this.custStElecPriceSaveElecPrice.params.id
        this.custStElecPriceSaveElecPrice.params.stId = this.stid
      }
    },
    getStid (stid) {
        this.stid = stid
    },
    clearElecPriceConfList () {
        this.stid = null
    },
    // 取消
    cancel () {
        this.$refs.Form.resetFields()
        this.$bus.emit('hideNewPrice')
    },
    // 提交
    submit () {
        this.$refs.Form.validate(valid => {
          if (!valid) return false
          this.custStElecPriceSaveElecPrice.getData(this.custStElecPriceSaveElecPrice.params).then(res => {
            if (res.code !== 200) return this.$message({message: res.msg || '提交失败', type: 'error'})
            this.$message({message: res.msg || '提交成功', type: 'success'})
            this.$bus.emit('hideNewPrice')
            this.$bus.emit('updateElecPriceList', this.stid)
          })
      })
    }
  },
  destroyed () {
    this.$bus.off('openPrice', this.openPrice)
    this.$bus.off('updateElecPriceList', this.getStid)
    this.$bus.off('clearElecPriceConfList', this.clearElecPriceConfList)
  }
}
</script>

<style lang="scss">
.new-price {
    margin-top: 5px;
    .el-form--inline .el-form-item {
      margin-right: 0;
    }
    .el-dialog--center .el-dialog__body {
      padding: 25px 50px 25px;
    }
}
</style>

<style lang="scss" scoped>
.new-price {
    .dialog-footer {
        text-align: center;
    }
}
</style>
