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
                        prop="date"
                        label="序号"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="级别"
                 >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="报警内容"
                  >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="电站名称"
              >
                        </el-table-column>
                                             <el-table-column
                        prop="address"
                        label="设备名称"
              >
                        </el-table-column>
                                             <el-table-column
                        prop="address"
                        label="发生时间"
              >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        width="100"
                        label="状态"
                    >
                        </el-table-column>
                                 <!-- <template slot-scope="scope">
                                 <span :title="scope.row.faultclassStr" :class="{fault: scope.row.eventType === 1, alarm: scope.row.eventType === 2, interrupt: scope.row.eventType === -9}">{{scope.row.faultclassStr}}</span>
                            </template> -->
                        <el-table-column
                        prop="opra"
                        label="操作"
                         width="100">
                              <template slot-scope="scope">
                                    <i class="el-icon-tickets" @click="regnizd(scope)"></i>
                                   <i class="el-icon-circle-check" @click="close(scope)"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pages">
                            <el-pagination
                            @current-change="handleCurrentChanged"
                            :current-page="1"
                            :hide-on-single-page="true"
                            :page-sizes="[15, 20, 25, 30]"
                            background
                            layout="total,sizes, prev, pager, next"
                            :total="500">
                        </el-pagination>
                    </div>
             </div>
         </div>
         </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'addAlarmConfig',
  data () {
    return {
      dialogTableVisible: false,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
         {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
         {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
         {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
         {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
         {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]

    }
  },
  methods: {
      open () {
          this.dialogTableVisible = true
      },
      regnizd (val) {

      },
      close (val) {

      },
      handleCurrentChanged (val) {

      }
  },
  mounted () {
      this.$bus.on('open', this.open)
  },
  destroyed () {
      this.$bus.off('open', this.open)
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
