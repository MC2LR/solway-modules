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
                     <el-select v-model="value1" placeholder="选择状态">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="value2" placeholder="选择设备类型">
                        <el-option
                        v-for="item in optionsEquip"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="value3" placeholder="选择报警级别">
                        <el-option
                        v-for="item in optionsAlarm"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input
                    class="input"
                        placeholder="请输入报警内容"
                        suffix-icon="el-input__icon el-icon-search"
                        v-model="input1">
                    </el-input>
                    <el-button type="primary" style="margin-left:20px" :disabled="mare"> <i class="iconfont iconrenling"></i> 认领</el-button>
                    <el-button type="primary"  :disabled="mare"><i class="iconfont iconguanbi"></i> 关闭</el-button>
                </div>
                <div class="table">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        class="te"
                        max-height="430"
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
                        prop="date"
                        label="序号"
                        width="150">
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
                        label="状态"
                    >
                        </el-table-column>
                           <!-- <template slot-scope="scope">
                                 <span :title="scope.row.faultclassStr" :class="{fault: scope.row.eventType === 1, alarm: scope.row.eventType === 2, interrupt: scope.row.eventType === -9}">{{scope.row.faultclassStr}}</span>
                            </template> -->
                        <el-table-column
                        prop="address"
                        label="操作"
                         width="100">
                              <template slot-scope="scope">
                                <i class="iconfont iconrenling" @click="regniz(scope)"></i>
                                <i class="iconfont iconguanbi" @click="close(scope)"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pages">
                        <el-pagination
                        @current-change="handleCurrentChange"
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
import { PageHeader } from 'element-ui'
import {
  getAlarmLog
} from '@intelligentAlarm/request/api'
export default {
  name: 'alarmDetaile',
  data () {
    return {
      value1: '',
      value2: '',
      value3: '',
      input1: '',
      mare: true,
      getAlarmLoged: getAlarmLog({later: true}),
       tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      optionsAlarm: [
        {
          value: '选项一',
          label: '花花'
        }
      ],
      optionsEquip: [{
          value: '选项二',
          label: '小花花'
      }],
      dialogTableVisible: false
    }
  },
  components: {
    ElPageHeader: PageHeader
  },
  methods: {
    // 初始化分页
    initgetAlarmLoged () {
      this.getAlarmLoged.getData({
        alarmLevel: 1,
        condition: '',
        dayNum: 7,
        dtype: '2',
        endDate: '',
        pageNo: '',
        pageSize: '',
        ruleName: '',
        startDate: '',
        stationId: 1,
        status: '01'
      }).then((res) => {

      })
    },
    // 父组件
    open () {
      this.dialogTableVisible = true
      // this.initgetAlarmLoged()
    },
    // 返回
    goBack () {
      this.dialogTableVisible = false
    },
    handleSelectionChange (val) {
        val.length === 0 ? this.mare = true : this.mare = false
    },
    regniz (val) {

    },
    close (val) {

    },
    handleCurrentChange (val) {

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
