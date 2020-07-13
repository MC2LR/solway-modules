<template>
    <div class="funds-repayment">
         <el-table
            :data="data"
            style="width: 100%"
            :max-height="vh - 280"
            :row-style="{'cursor': 'pointer'}"
            row-class-name="row-style"
            cell-class-name="cell-style"
            header-row-class-name="header-row-style"
            header-cell-class-name="header-cell-style">
             <el-table-column
                label="序号" width="80"
                type="index">
            </el-table-column>
            <el-table-column label="预计回款时间" width="160">
                <template slot-scope="scope">
                    <el-date-picker
                        :disabled="!abled"
                        style="width: 100%"
                        v-model="scope.row.estimateBackDate"
                        format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column label="款项名称" width="180">
                <template slot-scope="scope">
                    <el-input size="small" :disabled="!abled" v-model="scope.row.name" placeholder="请输入款项名称"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="回款全额" width="150">
                <template slot-scope="scope">
                    <el-input size="small" :disabled="!abled" v-model="scope.row.backMoney" @input="watchNumber(scope.row.backMoney, scope.row, 'backMoney')" placeholder="请输入回款全额" type="number" title=""></el-input>
                </template>
            </el-table-column>
            <el-table-column label="回款条件">
                <template slot-scope="scope">
                    <el-input size="small" :disabled="!abled" v-model="scope.row.backCondition" placeholder="请输入回款条件"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="备注">
                <template slot-scope="scope">
                    <el-input size="small" :disabled="!abled" v-model="scope.row.note" placeholder="请输入备注"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                v-if="abled"
                fixed="right"
                width="100"
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <span title="新增" class="add" @click="add(scope.$index)">
                        <i class="iconfont iconjia"></i>
                    </span>
                    <span title="删除" class="delete">
                        <i class="iconfont iconjianshao" @click="data.splice(scope.$index, 1)"></i>
                    </span>
                </template>
            </el-table-column>
            <template slot="empty">
                <span style="color: #000">暂无数据</span>
                <span title="新增" class="add" @click="add(0)">
                    <i class="iconfont iconjia"></i>
                </span>
            </template>
        </el-table>
    </div>
</template>

<script>
import {Table, TableColumn, Select, Option, Input, DatePicker, Message} from 'element-ui'
import {api＿getBackMoneyList, api＿saveContractBackMoney, api＿getContractCost} from '@contractManage/request/api'
import mixinWidthHeight from '@comm/mixin/widthHeight'

export default {
  mixins: [mixinWidthHeight],
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElSelect: Select,
    ElOption: Option,
    ElInput: Input,
    ElDatePicker: DatePicker
  },
  props: {
    detail: {
      type: Object
    }
  },
  data () {
    return {
        abled: false,
        data: [],
        reg: /^\d+(\.\d{1,4})?$/,
        getContractCost: api＿getContractCost({}),
        getBackMoneyList: api＿getBackMoneyList({
            later: true
        }),
        saveContractBackMoney: api＿saveContractBackMoney({
            later: true,
            sameTimeOnce: true
        })
    }
  },
  created () {
    this.$bus.on('openFunds', this.openFunds)
    this.$bus.on('saveFundsRepay', this.saveInfo)
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
    openFunds () {
        this.getBackMoneyList.getData({contractId: this.detail.id}).then(res => {
            if (res.code === 0) {
                this.data = res.body
            } else {
                this.data = []
            }
        })
    },
    add (index) {
        this.data.splice(index + 1, 0, {
            id: null,
            contractId: this.detail.id,
            estimateBackDate: new Date().getTime(),
            name: '',
            backMoney: '',
            backCondition: '',
            note: ''
        })
    },
    saveInfo () {
        let backMoneyList = []
        this.data.map((v, i) => {
            if (v.updateUser) delete v.updateUser
            if (v.updateDate) delete v.updateDate
            backMoneyList.push({
                serNum: i + 1,
                ...v,
                estimateBackDate: v.estimateBackDate ? new Date(v.estimateBackDate).Format('yyyy-MM-dd') : null,
                backMoney: v.backMoney || null
            })
        })
        this.saveContractBackMoney.getData({backMoneyList: JSON.stringify(backMoneyList)}).then(res => {
            if (res.code === 0) {
                Message({
                    message: '保存成功',
                    type: 'success'
                })
                this.$emit('fundsSuccessEmit')
            } else {
                Message({
                    message: '保存失败',
                    type: 'error'
                })
            }
        })
    },
    watchNumber (data, row, type) {
        if (data && !this.reg.test(data)) {
            row[type] = Number(data).toFixed(4)
            return false
        }
    }
  },
  beforeDestroy () {
      this.$bus.off('openFunds', this.openFunds)
      this.$bus.off('saveFundsRepay', this.saveInfo)
  }
}
</script>
<style lang="scss">
.funds-repayment{
    @import '@comm/assets/themes/table/t6.scss';
    .el-table {
        .el-input__inner {
            color: #818181;
        }
        .add {
            cursor: pointer;
            .iconfont {
                color: #4CCA85;
                margin-right: 15px;
            }
        }
        .delete {
            .iconfont {
                color: #EB6868;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.funds-repayment {
    height: 100%;
}
</style>
