<template>
  <div class="config">
       <el-dialog
        width="100%"
        center
        :show-close='false'
        top="0"
        custom-class="dialogsa"
        :visible.sync="dialogTableVisible"
        :modal-append-to-body="false"
         >
            <div class="content">
                <el-page-header @back="goBack" content="报警规则配置" style="font-size:14px;" class="pagehead"></el-page-header>
                <div class="select">
                     <el-select v-model="value1" @change = "search" clearable placeholder="选择状态">
                        <el-option
                        label="已启用"
                        value="1">
                        </el-option>
                           <el-option
                        label="已停用"
                        value="0">
                        </el-option>
                    </el-select>
                    <el-select v-model="value2" @change = "search" clearable placeholder="选择设备类型">
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
                    class="input"
                        placeholder="请输入规则名进行检索"
                        @blur="search"
                        suffix-icon="el-input__icon el-icon-search"
                        v-model="input1">
                    </el-input>
                </div>
                <el-button type="primary" style="margin-left:20px;margin-bottom:20px" @click="add">增加</el-button><br>
                <div class="table">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        class="te"
                        max-height="380"
                        style="width: 100%"
                                row-class-name="row-style"
                                cell-class-name="cell-style"
                                header-row-class-name="header-row-style"
                                header-cell-class-name="header-cell-style"
                      >
                        <el-table-column
                        prop="ruleName"
                        label="规则名"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="type"
                        label="设备类型"
                 >
                        </el-table-column>
                        <el-table-column
                        prop="ruleClass"
                        label="规则分类"
                  >
                        </el-table-column>
                        <el-table-column
                        prop="alarmLevels"
                        label="报警级别"
              >
                        </el-table-column>
                        <el-table-column
                        prop="isenable"
                        label="状态"
                    >
                               <template slot-scope="scope">
                                 <span>{{scope.row.isenable ==="1"?"已启用":"已禁用"}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="操作"
                         width="150">
                              <template slot-scope="scope">

                                  <el-popconfirm

                                    @onConfirm="pause(scope)"
                                    :title="scope.row.isenable==='1'?'是否暂停?':'是否启动?'"
                                  >
                                        <i slot="reference" :title="scope.row.isenable==='1'?'暂停':'启动'" :class="{'iconfont iconzanting':scope.row.isenable === '1','iconfont iconqidong':scope.row.isenable === '0'}"></i>
                                  </el-popconfirm>

                             &nbsp;&nbsp;
                               <el-popconfirm

                                    @onConfirm="edit(scope)"
                                    title="是否编辑"
                                  >
                                      <i slot="reference" title="编辑" class="iconfont iconbianji" ></i>
                                  </el-popconfirm>

                                &nbsp;&nbsp;
                                  <el-popconfirm
                                    @onConfirm="deletes(scope)"
                                    title="是否删除"
                                  >
                                       <i slot="reference" title="删除" class="iconfont iconshanchu"></i>
                                  </el-popconfirm>
                                &nbsp;&nbsp;
                                     <el-popconfirm
                                    @onConfirm="copy(scope)"
                                    title="是否复制"
                                  >
                                 <i slot="reference" title="复制" class="iconfont iconfuzhi" ></i>
                                  </el-popconfirm>
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
                        :total="$useful($oc(this.getTableList.res, 'data', 'total'), 0)">
                    </el-pagination>
                    </div>
                </div>
            </div>
        </el-dialog>
  </div>
</template>

<script>
import { PageHeader } from 'element-ui'
import {
  api＿getAlarmConfig,
  AlarmConfigDelete, updateConfigStatus
} from '@intelligentAlarms/request/api'
export default {
  name: 'alarmConfig',
  data () {
    return {
      value1: '',
      value2: '',
      value3: '',
      input1: '',
      pageNo: '',
      deTypeShow: true,
      pageSize: '',
      tableData: [],
      allData: {},
      AlarmConfigDeleted: AlarmConfigDelete({later: true}),
      //  报警规则分页查询
       getTableList: api＿getAlarmConfig({
         later: true
       }),
       updateConfigStatused: updateConfigStatus({later: true}),
      dialogTableVisible: false
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
  components: {
    ElPageHeader: PageHeader
  },
  methods: {
    // 搜索
    search () {
     this.getTable()
    },
    // 获取规则列表
    getTable () {
      this.getTableList.getData({
      condition: this.input1,
      dtype: this.value2,
      isenable: this.value1,
      pageNo: this.pageNo,
      pageSize: this.pageSize

    }).then((res) => {
      if (res.code === 200) {
        this.allData = res.data
        this.tableData = res.data.list
        if (this.tableData.length > 0) {
          this.tableData.forEach(item => {
            item.type = ''
            item.alarmLevels = ''
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
        console.log(this.tableData)
      }
    })
    },
    open () {
      this.dialogTableVisible = true
      this.getTable()
    },
    goBack () {
      this.dialogTableVisible = false
      this.input1 = ''
      this.value2 = ''
      this.value1 = ''
      this.pageNo = '1'
      this.pageSize = '10'
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getTable()
    },
    handleCurrentChange (val) {
       this.pageNo = val
       this.getTable()
    },
    pause (val) {
         val.row.isenable === '0' ? this.tableData[val.$index].isenable = '1' : this.tableData[val.$index].isenable = '0'
         console.log(val.row)
         this.updateConfigStatused.getData({
            dtype: val.row.dtype,
            id: val.row.id,
            isenable: val.row.isenable
         })
    },
    edit (val) {
        this.$bus.emit('opens', val.row)
    },
    // 删除接口
    deletes (val) {
      this.AlarmConfigDeleted.getData({id: val.row.id}).then((res) => {
        console.log(res)
        if (res.code === 200) {
         this.getTable()
        }
      })
    },
    copy (val) {
        this.$bus.emit('opens', val.row)
    },
    add () {
        this.$bus.emit('opens', '新增')
    }
  },
  mounted () {
    this.$bus.on('unpes', this.getTable)
  },
  beforeDestroy () {
    this.$bus.off('unpes', this.getTable)
  }
}
</script>

<style lang="scss" scoped>
.config {
  height: 0;
  >>> .dialogsa {
    height: 100vh;
    margin: 0;
  }
  >>> .el-icon-search{
    cursor: pointer;
  }
  >>> .el-dialog__body {
    padding: 0;
  }
  >>> .el-dialog__header {
    padding: 0;
  }
  .content {
    width: 100%;
    height: 100vh;
    background: #edf0f9;
    overflow: hidden;
    >>> .el-page-header {
      padding-left: 20px;
      margin-top: 15px;
      margin-bottom: 10px;
      font-size: 14px;
    }
    >>> .el-page-header__title {
      font-size: 18px;
    }
    .select {
      width: 100%;
      padding:10px 0 10px 20px;
      max-height: 60px;
      overflow: hidden;
    //   background: red;
    }
    .input{
        width: 15%;
    }
    .table{
        width: 98%;
        height: 85%;
        margin: 0 auto;
        >>> .te{
            overflow: auto;
        }
    >>> .cell-style {
      text-align: center;
      font-size: 12px;
      color: #666666;
    }
    >>> .header-cell-style {
      text-align: center;
      color: #333333;
      font-size: 14px;
      font-family:Microsoft YaHei;
    }
        .iconzanting, .iconqidong{
            font-size: 18px;
            color: #FF8C34;
            cursor: pointer;
        }
        .iconbianji{
            font-size: 18px;
            color: #1068F0;
            cursor: pointer;
        }
        .iconshanchu{
            font-size: 18px;
            color: #FB6684;
            cursor: pointer;

        }
        .iconfuzhi{
            font-size: 16px;
            color: #32CA7F;
            cursor: pointer;

        }
    }
    .pages{
        width: 100%;
        height: 7%;
        margin-top: 20px;
        overflow: hidden;
        text-align: center;
    }
  }
}
</style>
