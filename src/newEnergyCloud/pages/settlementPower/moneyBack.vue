<template>
    <div class="money-back">
        <div class="title">
            <span>电站名称: {{detailObj.stName}}</span>
            <span>期数: {{new Date(detailObj.acqumonth).Format('yyyy-MM')}}</span>
        </div>
        <el-form ref="Form" :model="detailObj" :inline='true' label-width="108px">
            <el-form-item
                prop="backDate"
                :rules="{ required: true, message: '请选择回款日期' }">
                <div class="width-wrap">
                    <label class="width-label">回款日期</label>
                    <el-date-picker
                        v-model="detailObj.backDate"
                        style="width: 210px"
                        type="date"
                        format="yyyy-MM-dd"
                        placeholder="选择回款日期">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item
                prop="backMoney"
                :rules="{ required: true, message: '请输入回款金额' }">
                <div class="width-wrap">
                    <label class="width-label">回款金额(元)</label>
                    <el-input type="number" v-model="detailObj.backMoney" style="width: 210px" placeholder="请输入回款金额"></el-input>
                </div>
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
    this.$bus.on('openMoneyBack', this.openMoneyBack)
    this.$bus.on('saveMoneyBack', this.saveMoneyBack)
  },
  methods: {
    async openMoneyBack () {
      await this.$timeout(100)

      if (this.detail) {

      } else {

      }
    },
    // 提交
    saveMoneyBack () {
        this.$refs.Form.validate(valid => {
            if (!valid) return false
            this.custStAcquElecUpdateCustStElec.getData({
                id: this.detailObj.id,
                flag: 3,
                costDate: new Date(this.detailObj.backDate).Format('yyyy-MM-dd'),
                cost: this.detailObj.backMoney
            }).then(res => {
                if (res.code !== 200) return this.$message({message: res.msg, type: 'error'})
                this.$message({message: res.msg, type: 'success'})
                this.$bus.emit('updateList')
            })
        })
    }
  },
  destroyed () {
      this.$bus.off('openMoneyBack', this.openMoneyBack)
      this.$bus.off('saveMoneyBack', this.saveMoneyBack)
  }
}
</script>

<style lang="scss">
.money-back {
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
.money-back {
    .title {
        color: #585858;
        font-size: 15px;
        margin-bottom: 20px;
        padding-top: 6px;
        span {
            padding-right: 50px;
        }
    }
    .width-wrap {
        display: inline-block;
        margin-right: 20px;
        .width-label{
            width: 6em;
            display: inline-block;
        }
    }

    .dialog-footer {
        text-align: center;
    }
}
</style>
