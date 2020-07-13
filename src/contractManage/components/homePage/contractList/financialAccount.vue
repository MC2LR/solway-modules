<template>
    <div class="financial-account">
        <div class="clearfix content-con">
            <div class="pull-left width2-1">
                <div>
                    <label class="width-label">合同金额</label>
                    <span>{{data.contractAmount}}</span>元
                </div>
                <div>
                    <label class="width-label">费用成本</label>
                    <el-input :disabled="!abled" v-model="data.contractCostCost" type="number" @input="watchNumber(data.contractCostCost, 'contractCostCost')" title=""></el-input>元
                </div>
                <div>
                    <label class="width-label">预计毛利</label>
                    <span>{{money}}</span>元
                </div>
            </div>
            <div class="pull-left width2-1">
                <div>
                    <label class="width-label">公摊成本</label>
                    <el-input :disabled="!abled" v-model="data.contractPoolCost"  type="number" @input="watchNumber(data.contractPoolCost, 'contractPoolCost')" title=""></el-input>元
                </div>
                <div>
                    <label class="width-label">人工成本</label>
                    <el-input :disabled="!abled" v-model="data.contractLaborCost"  type="number" @input="watchNumber(data.contractLaborCost,'contractLaborCost')" title=""></el-input>元
                </div>
                <div>
                    <label class="width-label">预计毛利率</label>
                    <span>{{rate}}</span>%
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {api＿getContract, api＿updateContractCost, api＿getContractCost} from '@contractManage/request/api'
import {Input, Message} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'

export default {
  mixins: [mixinWidthHeight],
  components: {
    ElInput: Input
  },
  props: {
    detail: {
      type: Object
    }
  },
  data () {
    return {
        abled: false,
        data: {},
        money: 0,
        rate: 0,
        reg: /^\d+(\.\d{1,4})?$/,
        getContractCost: api＿getContractCost({}),
        getContract: api＿getContract({
            later: true
        }),
        updateContractCost: api＿updateContractCost({
            later: true,
            sameTimeOnce: true
        })
    }
  },
  created () {
    this.$bus.on('openFinancial', this.openFinancial)
    this.$bus.on('savefinancialAccount', this.saveInfo)
    this.getContractCost.subscribe(res => {
        if (res.code === 0) {
            this.abled = res.body.contractManageAuthType
        } else {
            this.abled = false
        }
    })
  },
  methods: {
    // 打开页面
    openFinancial () {
        this.getContract.getData({contractId: this.detail.id}).then(res => {
            this.data = res.body.data[0]
            this.calculate()
        })
    },
    watchNumber (data, type) {
        if (data && !this.reg.test(data)) {
            this.data[type] = Number(data).toFixed(4)
            return false
        }
        this.calculate()
    },
    calculate () {
        let {contractAmount = '', contractCostCost = '', contractPoolCost = '', contractLaborCost = ''} = this.data
        if (contractAmount && (contractCostCost || contractPoolCost || contractLaborCost)) {
            let money = (contractAmount - contractCostCost - contractPoolCost - contractLaborCost)
            if (this.isInteger(money)) {
                this.money = money
            } else {
                this.money = money.toFixed(2)
            }
            this.rate = (this.money / this.data.contractAmount * 100).toFixed(2)
        } else {
            this.money = '-'
            this.rate = '-'
        }
    },
    isInteger (num) {
        return Math.floor(num) === num
    },
    // 保存合同财务信息
    saveInfo () {
        let {contractPoolCost, contractCostCost, contractLaborCost} = this.data
        this.updateContractCost.getData({id: this.detail.id, contractPoolCost, contractCostCost, contractLaborCost}).then(res => {
            if (res.code === 0) {
                Message({
                    message: '保存成功',
                    type: 'success'
                })
                this.$emit('financialSuccessEmit')
            } else {
                Message({
                    message: '保存失败',
                    type: 'error'
                })
            }
        })
    }
  },
  beforeDestroy () {
      this.$bus.off('openFinancial', this.openFinancial)
      this.$bus.off('savefinancialAccount', this.saveInfo)
  }
}
</script>
<style lang="scss">
.financial-account{
    .el-input {
        width: 230px;
        margin-right:10px;
    }
}
</style>
<style lang="scss" scoped>
.financial-account {
    height: 100%;
    .content-con{
        width:800px;
        margin: 20px auto;
        .width-label{
            width:6em;
            display: inline-block;
        }
    }
    .width2-1{
        width:50%;
        >div{
            margin-bottom:25px;
            height: 35px;
            line-height: 35px;
        }
    }
}
</style>
