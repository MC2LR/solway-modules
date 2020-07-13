<template>
  <div class="addconfig">
      <el-dialog
        width="60%"
        center
        title="报警明细"
        top="5vh"
        custom-class="dialogsas"
        :visible.sync="dialogTableVisible"
        :modal-append-to-body="false"
         >
         <div class="wrapper">
             <div class="contented">
                    <el-table
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
                    >
                        <el-table-column
                        prop="ids"
                        label="序号"
                        width="80">
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
                        width="100"
                        label="状态"
                    >
                                 <template slot-scope="scope">
                                    <span >{{scope.row.status}}</span>
                                    </template>
                        </el-table-column>
                        <el-table-column
                        prop="opra"
                        label="操作"
                         width="100">
                              <template slot-scope="scope">
                                 <el-popconfirm

                                    @onConfirm="regnizd(scope)"
                                    title="确定要认领?"
                                  >
                                    <i slot="reference" v-if="scope.row.status !== '已认领' && scope.row.status !== '已关闭'"  class="el-icon-tickets"></i>

                                  </el-popconfirm>
                                   <el-popconfirm
                                    @onConfirm="close(scope)"
                                    title="确定要关闭?"
                                  >
                                   <i slot="reference" title="关闭" v-if="scope.row.status !== '已关闭'" class="el-icon-circle-check"></i>

                                  </el-popconfirm>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pages">
                            <el-pagination
                            @current-change="handleCurrentChanged"
                            @size-change="handleSizeChanged"
                            :current-page="1"
                            :hide-on-single-page="false"
                            :page-sizes="[10, 15, 25, 30]"
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
import {
getAlarmLog, claimAlarm, closeAlarm

} from '@intelligentAlarms/request/api'
export default {
  name: 'addAlarmConfig',
  data () {
    return {
      dialogTableVisible: false,
      tableData: [],
      idListd: [],
      getAlarmLoged: getAlarmLog({later: true}),
      claimAlarmed: claimAlarm({later: true}),
      closeAlarmed: closeAlarm({later: true}),
      pageNo: 1,
      pageSize: 10

    }
  },
  methods: {
      openz (val) {
          this.getAlarmLoged.getData({...val}).then(res => {
              console.log(res)
              if (res.code === 200) {
                this.tableData = res.data.list
                this.tableData.forEach((item, index) => {
                   item.ids = index + 1
                })
              }
          })
          this.dialogTableVisible = true
      },
      // 认领
      regnizd (val) {
      this.idListd = []
      this.idListd.push(val.row.id)
            this.claimAlarmed.getData({
            idList: this.idListd.join()
        }).then((res) => {
          console.log(val)
            if (res.code === 200) {
              this.getAlarmLoged.getData({}).then(res => {
              console.log(res)
                    if (res.code === 200) {
                      this.tableData = res.data.list
                      this.tableData.forEach((item, index) => {
                        item.ids = index + 1
                      })
                    }
                })
                this.idListd = []
            }
        })
      },
      // 关闭
    close (val) {
      this.idListd = []
      this.idListd.push(val.row.id)
      this.closeAlarmed.getData({
        idList: this.idListd.join()
      }).then((res) => {
          console.log(res)
           if (res.code === 200) {
               this.getAlarmLoged.getData({}).then(res => {
              console.log(res)
                    if (res.code === 200) {
                      this.tableData = res.data.list
                      this.tableData.forEach((item, index) => {
                        item.ids = index + 1
                      })
                    }
                })
           }
      })
    },
      handleCurrentChanged (val) {
          this.pageNo = val
          this.getAlarmLoged.getData({
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }).then(res => {
            if (res.code === 200) {
              this.tableData = res.data.list
              this.tableData.forEach((item, index) => {
                item.ids = index + 1
              })
            }
        })
      },
      handleSizeChanged (val) {
        this.pageSize = val
        this.getAlarmLoged.getData({
            pageNo: this.pageNo,
            pageSize: this.pageSize
        }).then(res => {
      console.log(res)
            if (res.code === 200) {
              this.tableData = res.data.list
              this.tableData.forEach((item, index) => {
                item.ids = index + 1
              })
            }
        })
      }
  },
  mounted () {
      this.$bus.on('openz', this.openz)
  },
  destroyed () {
      this.$bus.off('openz', this.openz)
  }
}
</script>

<style lang="scss" scoped>
.addconfig {
  width: 100%;
  overflow: hidden;
  >>> .el-dialog__header {
    box-shadow: 0px 1px 14px 0px rgba(81, 149, 245, 0.2);
  }
  >>> .dialogsas {
    height: 88vh;
    overflow: hidden;
  }
  .wrapper {
    width: 98%;
    height: 79vh;
    margin: 0 auto;
    overflow: auto;
    .contented {
      width: 100%;
    >>> .cell-style {
      text-align: center;
      font-size: 12px;
      color: #666666;
    }
    >>> .header-cell-style {
      text-align: center;
      color: #333333;
      background: #ECEEF8;
      opacity:0.5;
    }
        .el-icon-tickets{
        font-size: 18px;
        color: #2CD97E;
        cursor: pointer;
    }
    .el-icon-circle-check{
        font-size: 18px;
        color: #FF8360;
        cursor: pointer;
    }
    .pages{
        width: 100%;
        height: 5%;
        overflow: hidden;
        text-align: center;
        margin-top: 20px;
    }
    }
  }
}
</style>
