<template>
    <div class="flat">
                <el-dialog
                    width="50%"
                    center
                    title="平台规则表达式模板库"
                    top="10vh"
                    custom-class="dialogFlat"
                    :visible.sync="dialogTableVisibledFlat"
                    :modal-append-to-body="false"
                      >
                      <div class="se">
                                <el-select @change="typeSelect" style="width:135px;margin-right:30px" v-model="deType" clearable placeholder="选择设备类型">
                                                <el-option v-if="deTypeShow"
                                                label="气象仪"
                                                value="5">
                                                </el-option>
                                                      <el-option v-if="!deTypeShow"
                                                label="风机"
                                                value="17">
                                                </el-option>
                                                      <el-option v-if="!deTypeShow"
                                                label="测风塔"
                                                value="18">
                                                </el-option>
                                                      <el-option v-if="deTypeShow"
                                                label="汇流箱"
                                                value="1">
                                                </el-option>
                                                      <el-option v-if="deTypeShow"
                                                label="逆变器"
                                                value="2">
                                                </el-option>
                                                    <el-option v-if="deTypeShow"
                                                label="电能表"
                                                value="4">
                                                </el-option>
                                                    <el-option v-if="deTypeShow"
                                                label="箱变"
                                                value="3">
                                                </el-option>
                                </el-select>
                                <el-input
                                  style="width:210px"
                                    placeholder="请输入规则名进行检索"
                                    suffix-icon="el-input__icon el-icon-search"
                                    @blur="searched"
                                    v-model="inputedFlat">
                                </el-input>
                      </div>
                      <el-table
                                    ref="multipleTable"
                                    :data="tableDatasFlat"
                                    tooltip-effect="dark"
                                    class="teed"
                                    max-height="360"
                                    style="width: 100%"
                                    row-class-name="row-style"
                                    cell-class-name="cell-style"
                                    header-row-class-name="header-row-style"
                                    header-cell-class-name="header-cell-style"
                                    >
                                    <el-table-column
                                    prop="ruleName"
                                    label="规则名"
                                >
                                    </el-table-column>
                                    <el-table-column
                                    prop="type"
                                    label="设备类型"
                              >
                                    </el-table-column>
                                    <el-table-column
                                    prop="alaClass"
                                    label="规则分类"
                              >
                                    </el-table-column>
                                    <el-table-column
                                    prop="alarmLevels"
                                    label="报警级别"
                          >
                                    </el-table-column>
                                    <el-table-column
                                    prop="address"
                                    label="操作"
                            >
                                      <template slot-scope="scope">
                                        <span title="添加" style=" color:#2cd97e;cursor: pointer;" @click="editFlat(scope)">添加</span>
                                    </template>
                                    </el-table-column>
                    </el-table>
                    <div class="pages">
                        <el-pagination
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :current-page="1"
                        :hide-on-single-page="false"
                        :page-sizes="[10, 15, 20, 30]"
                        background
                        layout="total,sizes, prev, pager, next"
                        :total='this.tableDatasFlat.length'>
                    </el-pagination>
                    </div>
         </el-dialog>
    </div>
</template>

<script>
import { getConfigTemplate } from '@intelligentAlarms/request/api'
export default {
  name: 'flatConfig',
  data () {
    return {
      dialogTableVisibledFlat: false,
      optionsAlarmFlat: [],
      tableDatasFlat: [

      ],
      inputedFlat: '',
      valuesed: '',
      deType: '',
       pageNo: '1',
      deTypeShow: true,
      pageSize: '10',
      isenable: Boolean,
      getConfigTemplated: getConfigTemplate({ later: true })
    }
  },
  created () {
          // 01是光伏   02是风电
    if (this.$store.getters.station_class === '01') {
        this.deTypeShow = true
    } else {
        this.deTypeShow = false
    }
  },
  methods: {
    // 添加模板
    editFlat (val) {
       this.$bus.emit('flatData', val)
       this.dialogTableVisibledFlat = false
    },
    // 选择设备类型
    typeSelect () {
      this.pages()
    },
    // 搜索
    searched () {
      this.pages()
    },
    handleCurrentChange (val) {
      console.log(val)

      this.pages()
    },
    handleSizeChange (val) {
      console.log(val)

        this.pages()
    },
    pages () {
      this.getConfigTemplated
        .getData({
          condition: this.inputedFlat,
          dtype: this.deType,
          isenable: this.isenable ? '1' : '0',
          pageNo: this.pageNo,
          pageSize: this.pageSize
        })
        .then(res => {
          console.log(res)
          if (res.code === 200) {
            this.tableDatasFlat = res.data.list
            console.log(this.tableDatasFlat)
            if (this.tableDatasFlat.length > 0) {
              this.tableDatasFlat.forEach(item => {
                item.type = ''
                item.alarmLevels = ''
                item.alaClass = ''
                switch (item.ruleClass) {
                  case '01':
                    item.alaClass = '自定义表达式'
                    break
                     case '02':
                    item.alaClass = '数值变化'
                    break
                         case '03':
                    item.alaClass = '数值不变'
                    break
                }
                 switch (item.dtype) {
                   case 1:
                      item.type = '汇流箱'
                      break
                   case 2:
                     item.type = '逆变器'
                     break
                      case 3:
                     item.type = '箱变'
                     break
                    case 4:
                     item.type = '电能表'
                     break
                     case 5:
                     item.type = '气象仪'
                     break
                    case 17:
                     item.type = '电能表'
                     break
                       case 18:
                     item.type = '测风塔'
                     break
                 }
                 switch (item.alarmLevel) {
                   case 1:
                     item.alarmLevels = '严重'
                     break
                  case 2:
                     item.alarmLevels = '告警'
                     break
                  case 3:
                     item.alarmLevels = '提醒'
                  break
                 }
              })
            }
          }
        })
    },
    opens (val) {
      this.isenable = val
      this.dialogTableVisibledFlat = true
      this.pages()
    }
  }
}
</script>

<style lang="scss" scoped>
.flat {
  width: 100%;
  overflow: hidden;
  >>> .dialogFlat {
    height: 70vh;
    overflow: hidden;
  }
  >>> .el-icon-search {
    cursor: pointer;
  }
      .pages{
        width: 100%;
        height: 7%;
        margin-top: 15px;
        overflow: hidden;
        text-align: center;
    }
}
</style>
