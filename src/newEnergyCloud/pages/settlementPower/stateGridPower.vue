<template>
    <div class="state-grid-power">
        <div class="title">
            <span>电站名称: {{detailObj.stName}}</span>
            <span>期数: {{new Date(detailObj.acqumonth).Format('yyyy-MM')}}</span>
        </div>
        <el-form ref="Form" :model="detailObj" :inline='true' label-width="108px">
            <el-form-item
                prop="netKwh"
                :rules="{ required: true, message: '请输入国网电量' }">
              <div class="width-wrap">
                  <label class="width-label">国网电量</label>
                  <el-input type="number" v-model="detailObj.netKwh" style="width: 210px" placeholder="请输入国网电量"></el-input>
              </div>
            </el-form-item>
            <el-form-item
                prop="netPrice"
                :rules="{ required: true, message: '请输入单价' }">
              <div class="width-wrap">
                  <label class="width-label">单价</label>
                  <el-input type="number" v-model="detailObj.netPrice" style="width: 210px" placeholder="请输入单价"></el-input>
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
    this.$bus.on('openStateGridPower', this.openStateGridPower)
    this.$bus.on('saveStateGridPower', this.saveStateGridPower)
  },
  methods: {
    async openStateGridPower () {
      await this.$timeout(100)

      if (this.detail) {

      } else {

      }
    },
    // 提交
    saveStateGridPower () {
        this.$refs.Form.validate(valid => {
            if (!valid) return false
            this.custStAcquElecUpdateCustStElec.getData({
                id: this.detailObj.id,
                flag: 1,
                netKwh: this.detailObj.netKwh,
                netPrice: this.detailObj.netKwh
            }).then(res => {
                if (res.code !== 200) return this.$message({message: res.msg, type: 'error'})
                this.$message({message: res.msg, type: 'success'})
                this.$bus.emit('updateList')
            })
        })
    }
  },
  destroyed () {
      this.$bus.off('openStateGridPower', this.openStateGridPower)
      this.$bus.off('saveStateGridPower', this.saveStateGridPower)
  }
}
</script>

<style lang="scss">
.state-grid-power {
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
.state-grid-power {
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
