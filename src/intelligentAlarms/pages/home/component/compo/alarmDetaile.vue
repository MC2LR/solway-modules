<template>
  <div class="detaile">
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
                <el-page-header @back="goBack" content="报警详情" style="font-size:14px;" class="pagehead"></el-page-header>
                <div class="select">
                     <el-select v-model="status"  @change="initgetAlarmLoged" clearable placeholder="选择状态">
                         <el-option
                            label="发生"
                            value="01">
                            </el-option>
                             <el-option
                            label="认领"
                            value="02">
                            </el-option>
                             <el-option
                            label="关闭"
                            value="03">
                            </el-option>
                    </el-select>
                    <el-select v-model="deType" clearable @change="initgetAlarmLoged" placeholder="选择设备类型">
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
                    <el-select v-model="alarmLevel" clearable @change="initgetAlarmLoged" placeholder="选择报警级别">
                         <el-option
                            label="严重"
                            value="1">
                            </el-option>
                             <el-option
                            label="告警"
                            value="2">
                            </el-option>
                             <el-option
                            label="提醒"
                            value="3">
                            </el-option>
                    </el-select>
                    <el-input
                    class="input"
                        placeholder="请输入报警内容"
                        @blur="initgetAlarmLoged"
                        suffix-icon="el-input__icon el-icon-search"
                        v-model="alarmContent">
                    </el-input>
                    <el-button type="primary" @click="claimed" style="margin-left:20px" :disabled="mare"> <i class="iconfont iconrenling"></i> 认领</el-button>
                    <el-button type="primary" @click="closeds"  :disabled="mare"><i class="iconfont iconguanbi"></i> 关闭</el-button>
                </div>
                <div class="table">
                    <el-table
                        stripe
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        class="te"
                        max-height="390"
                        style="width: 100%"
                        row-class-name="row-style"
                        cell-class-name="cell-style"
                        header-row-class-name="header-row-style"
                        header-cell-class-name="header-cell-style"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="index"
                        label="序号"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="alarmLevel"
                        label="级别"
                 >
                        </el-table-column>
                        <el-table-column
                        prop="alarmContent"
                        label="报警内容"
                  >
                        </el-table-column>
                        <el-table-column
                        prop="stationName"
                        label="电站名称"
              >
                        </el-table-column>
                        <el-table-column
                        prop="deviceName"
                        label="设备名称"
               >
                        </el-table-column>
                        <el-table-column
                        prop="accidentTime"
                        label="发生时间"
                >
                        </el-table-column>
                        <el-table-column
                        prop="status"
                        label="状态"
                    >
                               <template slot-scope="scope">
                               <el-popconfirm
                                    title="确定要删除吗?"
                                  >
                                 <span slot="reference">{{scope.row.status}}</span>
                                  </el-popconfirm>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="操作"
                         width="100">
                              <template slot-scope="scope">
                                <el-popconfirm

                                    @onConfirm="regniz(scope)"
                                    title="确定要认领?"
                                  >
                                    <i slot="reference" v-if="scope.row.status !== '已认领' && scope.row.status !== '已关闭'" class="iconfont iconrenling" ></i>
                                  </el-popconfirm>
                                  <el-popconfirm
                                    @onConfirm="close(scope)"
                                    title="确定要关闭?"
                                  >
                                    <i slot="reference" v-if="scope.row.status !== '已关闭'" class="iconfont iconguanbi" title="关闭" ></i>
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
                        :total="this.tableData.length">
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
  getAlarmLogs,
  claimAlarm,
  closeAlarm
} from '@intelligentAlarms/request/api'
export default {
  name: 'alarmDetaile',
  data () {
    return {
      alarmLevel: '',
      alarmContent: '',
      status: '',
      deType: '',
      pageNo: '',
      pageSize: '',
      idListd: [],
      getAlarmLoged: getAlarmLogs({later: true}),
      claimAlarmed: claimAlarm({later: true}),
      closeAlarmed: closeAlarm({later: true}),
      mare: true,
      tableData: [],
      deTypeShow: true,
      dialogTableVisible: false
    }
  },
  components: {
    ElPageHeader: PageHeader

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
    // 认领
      claim (val) {
        this.claimAlarmed.getData({
            idList: this.idListd.join()
        }).then((res) => {
          console.log(res)
            if (res.code === 200) {
                // this.tableData[val.$index].status = '认领'
                this.initgetAlarmLoged()
                this.idListd = []
            }
        })
      },
       // 初始化分页
    initgetAlarmLoged () {
      this.getAlarmLoged.getData({
        alarmLevel: this.alarmLevel,
        condition: this.alarmContent,
        dtype: this.deType,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        status: this.status
      }).then((res) => {
        console.log(res)
        if (res.code === 200) {
            this.tableData = res.data.list
            if (this.tableData.length > 0) {
              this.tableData.forEach((item, index) => {
                item.index = ''
                item.index = index + 1
              })
            }
        }
      })
    },
    open () {
      this.dialogTableVisible = true
       this.alarmLevel = ''
      this.alarmContent = ''
      this.status = ''
      this.deType = ''
      this.pageNo = ''
      this.pageSize = ''
      this.initgetAlarmLoged()
    },
    goBack () {
      this.dialogTableVisible = false
    },
      handleSelectionChange (val) {
        this.idListd = []
        if (val.length !== 0) {
          val.forEach(item => {
            console.log(item.status)

            if (item.status !== '已关闭') {
              this.idListd.push(item.id)
            }
          })
        }
       val.length === 0 ? this.mare = true : this.mare = false
    },
    // 认领
    regniz (val) {
      this.idListd = []
      this.idListd.push(val.row.id)
      this.claim(val)
    },
    closed (val) {
      this.idListd = []
      this.idListd.push(val.row.id)
      this.closeAlarmed.getData({
        idList: this.idListd.join()
      }).then((res) => {
          console.log(res)
           if (res.code === 200) {
                this.initgetAlarmLoged()
           }
      })
    },
    // 关闭
    close (val) {
      this.closed(val)
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.initgetAlarmLoged()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.initgetAlarmLoged()
    },
    // 批量认领
    claimed () {
        this.$MessageBox('是否进行认领?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      this.claimAlarmed.getData({
            idList: this.idListd.join()
        }).then((res) => {
          console.log(res)
            if (res.code === 200) {
                this.idListd = []
                this.initgetAlarmLoged()
                this.$message({
                  type: 'success',
                  message: '认领成功!'
                })
            }
        })
        }).catch(() => {

        })
    },
    // 批量关闭
    closeds () {
     this.$MessageBox('是否进行关闭?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.closeAlarmed.getData({
            idList: this.idListd.join()
        }).then((res) => {
          console.log(res)
            if (res.code === 200) {
                this.idListd = []
                 this.$message({
                  type: 'success',
                  message: '关闭成功!'
                })
                this.initgetAlarmLoged()
            }
        })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.detaile {
  height: 0;
  >>> .dialogsa {
    height: 100vh;
    margin: 0;
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
        width: 13%;
    }
    .table{
        width: 98%;
        height: 85%;
        overflow: auto;
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
    }
        .iconrenling{
            font-size: 18px;
            color: #2CD97E;
            cursor: pointer;
        }
        .iconguanbi{
            font-size: 18px;
            color: #FF8360;
            cursor: pointer;
        }
    }
    .pages{
        width: 100%;
        height: 7%;
        margin-top: 15px;
        overflow: hidden;
        text-align: center;
    }
  }
}
</style>
