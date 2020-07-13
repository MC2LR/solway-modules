<template>
  <div class="redEnvelopeStatistics">
      <div class="time-head">
          <div>
               <el-date-picker
                v-model="dates"
                @change="startDateV"
                type="daterange"
                style="width:300px;margin-top:8px"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
          </div>

      </div>
      <div class="table">
            <el-table
                :data="tableData"
                row-class-name="row-style"
                cell-class-name="cell-style"
                max-height="380"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column
                    prop="stationName"
                    label="电站名称">
                </el-table-column>
                <el-table-column
                    prop="countNum"
                    label="任务次数(次)">
                </el-table-column>
                <el-table-column
                    prop="sumNum"
                    label="红包金额(元)">
                </el-table-column>
                <el-table-column
                    prop="avgNum"
                    label="平均红包(元)">
                </el-table-column>
                <el-table-column
                    prop="maxNum"
                    label="最大红包(元)">
                </el-table-column>
                <el-table-column
                    prop="minNum"
                    label="最小红包(元)"
                    >
                </el-table-column>

            </el-table>
      </div>
      <div class="pages">
                <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page="1"
                :hide-on-single-page="true"
                :page-sizes="[10, 15, 20, 30]"
                background
                layout="total,sizes, prev, pager, next"
                :total='this.tableData.length'>
            </el-pagination>
       </div>
  </div>
</template>

<script>
import {
  Table,
  TableColumn,
  Select,
  Option,
  Input,
  Button,
  Dialog
} from 'element-ui'
import {
  getEnvRedList
} from '@MochaITOM/request/api'
export default {
  name: 'index',
  data () {
    return {
      dates: [],
      endDate: '',
      startDate: '',
      pageNo: 1,
      pageSize: 10,
      getEnvRedListed: getEnvRedList({later: true}),
      tableData: []
    }
  },
  created () {
        this.pages()
  },
  methods: {
    pages () {
      this.getEnvRedListed.getData({
        endDate: this.endDate,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        startDate: this.startDate
      }).then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.tableData = res.data.list
        }
      })
    },
    startDateV (val) {
       if (this.dates.length > 0) {
          this.endDate = this.dates[1].Format('yyyy-MM-dd')
          this.startDate = this.dates[0].Format('yyyy-MM-dd')
        }
        this.pages()
    },
    handleCurrentChange (val) {
        this.pageNo = val
        this.pages()
    },
    handleSizeChange (val) {
        this.pageSize = val
        this.pages()
    }
  },
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElDialog: Dialog,
    ElSelect: Select,
    ElOption: Option,
    ElInput: Input,
    ElButton: Button
  }
}
</script>

<style lang="scss">
.redEnvelopeStatistics {
  .el-range-input {
    margin-left: 20px;
  }
  .el-table__header {
    height: 100px;
  }
  .cell {
    // font-size: 18px;
    text-align: center;
  }
  .header-cell-style {
    color: #a3a7a5;
    font-size: 16px;
    height: 60px;
  }
  .cell-style {
    color: #666666;
    font-size: 14px;
  }
}
</style>
<style lang="scss" scoped>
.redEnvelopeStatistics {
  width: 100%;
  height: 100vh;
  background: white;
  .time-head {
  >>> .el-range-separator{
    line-height: 24px;
    width: 45px;
  }
  >>> .el-range__icon{
    line-height: 27px;
  }
    width: 98%;
    height: 50px;
    margin: 0 auto;
    line-height: 50px;
    font-size: 18px;
    color: white;
    display: flex;
    div {
      // margin-right: 350px;
      display: flex;
      line-height: 50px;
      width: 500px;
    }
  }
  .tableHead {
    width: 98%;
    height: 10%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: right;
    overflow: hidden;
    div {
      width: 50%;
      height: 80%;
      line-height: 54px;
      color: #fbf6e7;
      font-size: 20px;
      overflow: hidden;
    }
  }
  .table {
    width: 98%;
    margin: 0 auto;
    overflow: auto;
  }
  .pages{
   text-align: center;
   padding-top: 10px;
  }
}
</style>
