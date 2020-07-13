<template>
    <div class="invoice">
        <div class="title">
            <span>电站名称: {{detailObj.stName}}</span>
            <span>期数: {{new Date(detailObj.acqumonth).Format('yyyy-MM')}}</span>
        </div>
        <el-form ref="Form" :model="detailObj" :inline='true' label-width="108px">
            <el-form-item
                prop="createTicketDate"
                :rules="{ required: true, message: '请选择开票日期' }">
                    <label class="width-label">开票日期</label>
                    <el-date-picker
                        v-model="detailObj.createTicketDate"
                        style="width: 210px"
                        type="date"
                        format="yyyy-MM-dd"
                        placeholder="选择开票日期">
                    </el-date-picker>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { api＿custStAcquElecUpdateCustStElec } from '@newEnergyCloud/request/api'
export default {
  props: {
      detail: {
          type: Object
      }
  },
  data () {
    return {
        detailObj: {},
        custStAcquElecUpdateCustStElec: api＿custStAcquElecUpdateCustStElec({
            later: true,
            res: { body: [] }
        })
    }
  },
  mounted () {
    this.detailObj = JSON.parse(JSON.stringify(this.detail))
    this.$bus.on('openInvoice', this.openInvoice)
    this.$bus.on('saveInvoice', this.saveInvoice)
  },
  methods: {
    async openInvoice () {
      await this.$timeout(100)

      if (this.detailObj) {

      } else {

      }
    },
    // 提交
    saveInvoice () {
        this.$refs.Form.validate(valid => {
            if (!valid) return false
            this.custStAcquElecUpdateCustStElec.getData({
                id: this.detailObj.id,
                flag: 2,
                voiceDate: new Date(this.detailObj.createTicketDate).Format('yyyy-MM-dd')
            }).then(res => {
                if (res.code !== 200) return this.$message({message: res.msg, type: 'error'})
                this.$message({message: res.msg, type: 'success'})
                this.$bus.emit('updateList')
            })
        })
    }
  },
  destroyed () {
      this.$bus.off('openInvoice', this.openInvoice)
      this.$bus.off('saveInvoice', this.saveInvoice)
  }
}
</script>

<style lang="scss">
.invoice {
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
.invoice {
    text-align: center;
    .title {
        color: #585858;
        font-size: 15px;
        margin-bottom: 20px;
        padding-top: 6px;
        span {
            padding-right: 50px;
        }
    }
    .width-label{
        width: 6em;
        display: inline-block;
        margin-left: -73px;
    }
    .dialog-footer {
        text-align: center;
    }
}
</style>
