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
                     <el-select v-model="value1" placeholder="选择状态">
                        <el-option
                        label="已启用"
                        value="01">
                        </el-option>
                           <el-option
                        label="已停用"
                        value="02">
                        </el-option>
                    </el-select>
                    <el-select v-model="value2" placeholder="选择设备类型">
                            <el-option
                        label="气象仪"
                        value="02">
                        </el-option>
                              <el-option
                        label="风机"
                        value="02">
                        </el-option>
                              <el-option
                        label="测风塔"
                        value="02">
                        </el-option>
                              <el-option
                        label="汇流箱"
                        value="02">
                        </el-option>
                              <el-option
                        label="逆变器"
                        value="02">
                        </el-option>

                    </el-select>
                    <el-input
                    class="input"
                        placeholder="请输入规则名进行检索"
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
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        prop="date"
                        label="规则名"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="设备类型"
                 >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="规则分类"
                  >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="报警级别"
              >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="状态"
                    >
                                 <!-- <template slot-scope="scope">
                                 <span :title="scope.row.faultclassStr" :class="{fault: scope.row.eventType === 1, alarm: scope.row.eventType === 2, interrupt: scope.row.eventType === -9}">{{scope.row.faultclassStr}}</span>
                            </template> -->
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="操作"
                         width="150">
                              <template slot-scope="scope">
                                 <i title="暂停" class="el-icon-video-pause" @click="pause(scope)"></i>
                                 <i title="编辑" class="el-icon-edit-outline" @click="edit(scope)"></i>
                                 <i title="删除" class="el-icon-delete-solid" @click="deletes(scope)"></i>
                                 <i title="复制" class="iconfont iconfuzhi" @click="copy(scope)"></i>
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
  api＿getAlarmConfig
} from '@intelligentAlarm/request/api'
export default {
  name: 'alarmConfig',
  data () {
    return {
      value1: '',
      value2: '',
      value3: '',
      input1: '',
       tableData: [],
      //  报警规则分页查询
       getTableList: api＿getAlarmConfig({
         later: true
       }),
      dialogTableVisible: false
    }
  },
  created () {
    this.getTableList.getData({
      condition: '',
      dtype: '',
      isenable: '',
      pageNo: '1',
      pageSize: '10'

    }).then((res) => {
      console.log(res)
    })
  },
  components: {
    ElPageHeader: PageHeader
  },
  methods: {
    open () {
      this.dialogTableVisible = true
    },
    goBack () {
      this.dialogTableVisible = false
    },
    handleSelectionChange (val) {

    },
    handleCurrentChange (val) {

    },
    pause (val) {

    },
    edit (val) {

    },
    deletes (val) {

    },
    copy (val) {

    },
    add () {
        this.dialogTableVisible = false
        this.$bus.emit('opens')
    }
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
        .el-icon-video-pause{
            font-size: 18px;
            color: #FF8C34;
            cursor: pointer;
        }
        .el-icon-edit-outline{
            font-size: 18px;
            color: #1068F0;
            cursor: pointer;
        }
        .el-icon-delete-solid{
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
