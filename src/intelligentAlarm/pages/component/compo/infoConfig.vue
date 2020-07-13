<template>
  <div class="info-config">
       <el-dialog
        width="100%"
        center
        :show-close='false'
        top="0"
        custom-class="dialogsaz"
        :visible.sync="dialogTableVisiblez"
        :modal-append-to-body="false"
         >
            <div class="content">
                <el-page-header @back="goBack" content="通知策略配置" style="font-size:14px;" class="pagehead"></el-page-header>
                <el-button type="primary" style="margin-left:20px;margin-bottom:20px" @click="add">增加</el-button><br>
                <div class="table">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        class="te"
                        max-height="600"
                        style="width: 100%"
                                row-class-name="row-style"
                                cell-class-name="cell-style"
                                header-row-class-name="header-row-style"
                                header-cell-class-name="header-cell-style"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        prop="date"
                        label="报警分类"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="报警级别"
                 >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="报警状态"
                  >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="通知方式"
              >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="通知人"
                    >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="操作"
                         width="150">
                              <template slot-scope="scope">
                                 <i class="el-icon-edit-outline" @click="edit(scope)"></i>
                                 <i class="el-icon-delete-solid" @click="deletes(scope)"></i>
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
        <el-dialog
        width="50%"
        center
        top="10vh"
        custom-class="dialoginfo"
        :visible.sync="dialogTableVisibledinfos"
        :modal-append-to-body="false"
         >
              <div class="infoConfigs">
                   <el-form ref="form" label-width="240px">
                      <el-form-item label="报警分类">
                          <el-checkbox v-model="checked">智能报警</el-checkbox>
                      </el-form-item>
                       <el-form-item label="报警级别">
                           <el-checkbox-group v-model="checkList2">
                              <el-checkbox label="严重"></el-checkbox>
                              <el-checkbox label="告警"></el-checkbox>
                              <el-checkbox label="提醒"></el-checkbox>
                            </el-checkbox-group>
                      </el-form-item>
                      <el-form-item label="报警状态">
                            <el-checkbox-group v-model="checkList1">
                              <el-checkbox label="发生"></el-checkbox>
                              <el-checkbox label="认领"></el-checkbox>
                              <el-checkbox label="恢复"></el-checkbox>
                            </el-checkbox-group>
                      </el-form-item>
                        <el-form-item label="时间设置">
                          <div style="width:70%;height:100px;">
                               <el-radio-group v-model="radio" >
                                <el-radio :label="1">工作时间 （周一到周五8:30-18:30）</el-radio>
                                <el-radio :label="2">非工作时间（周一到周五18:30-8:30周六日全天）</el-radio>
                                <el-radio :label="3">任何时间（每天00:00-23:59）</el-radio>
                              </el-radio-group>
                          </div>
                      </el-form-item>
                       <el-form-item label="通知方式">
                            <el-checkbox-group v-model="checkList">
                              <el-checkbox label="应用消息"></el-checkbox>
                              <el-checkbox label="邮件"></el-checkbox>
                              <el-checkbox label="微信"></el-checkbox>
                            </el-checkbox-group>
                      </el-form-item>
                        <el-form-item label="通知人员">
                              <el-select v-model="valueInfo1" placeholder="请选择" style="width:160px">
                              <el-option value="你好"></el-option>
                            </el-select>
                              <el-select v-model="valueInfo2" placeholder="请选择" style="width:160px">
                              <el-option value="你好"></el-option>
                            </el-select>
                      </el-form-item>
                   </el-form><br><br>
                  <div style="width:60%;margin:0 auto;height:50px;text-align:center">
                          <el-button style="background:#E7E7E7">取消</el-button>
                         <el-button type="primary">确认</el-button>
                  </div>
              </div>
              <div class="titles">
                  消息通知配置
              </div>
         </el-dialog>
  </div>
</template>

<script>
import { PageHeader, FormItem, Checkbox } from 'element-ui'
export default {
  name: 'infoConfig',
  data () {
    return {
      value2: '',
      value3: '',
      radio: 0,
      valueInfo1: '',
      valueInfo2: '',
      checkList: [],
      checkList1: [],
      checkList2: [],
      checked: '',
      dialogTableVisibledinfos: false,
      icans: 'el-icon-video-pause',
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      dialogTableVisiblez: false
    }
  },
  components: {
    ElPageHeader: PageHeader,
    ELFormItem: FormItem,
    ELCheckbox: Checkbox
  },
  methods: {
    opens () {
      this.dialogTableVisiblez = true
    },
    goBack () {
      this.dialogTableVisiblez = false
    },
    handleSelectionChange (val) {},
    handleCurrentChange (val) {},
    edit (val) {},
    deletes (val) {},
    add () {
      this.dialogTableVisiblez = false
      this.dialogTableVisibledinfos = true
    }
  }
}
</script>

<style lang="scss" scoped>
.info-config {
  height: 0;
  position: relative;
  .titles{
    font-size: 18px;
    width: 100%;
    height: 45px;
    text-align: center;
    position: absolute;
    line-height: 40px;
    box-shadow: 0px 1px 14px 0px rgba(81, 149, 245, 0.2);
    top: 0;
    z-index: 9;
  }
  overflow: hidden;
  >>> .dialoginfo {
    height: 75vh;
    overflow: hidden;
    padding: 0;
    .infoConfigs {
      width: 90%;
      height: 65vh;
      margin: 0 auto;
      overflow: auto;
      font-size: 12px;
      margin-top:45px;
    }
  }
  >>> .el-dialog__headerbtn{
    z-index:10
  }
  >>> .el-form-item__label {
    padding-right: 18px;
    font-size: 12px;
  }
  >>> .el-checkbox__label{
    font-size: 12px;
  }
  >>> .el-radio__label{
    font-size: 12px;
  }
  >>> .dialogsaz {
    height: 100vh;
    margin: 0;
    font-size: 12px;
  }
  >>> .el-dialog__body {
    padding: 0;
  }
  >>> .el-dialog__header {
    box-shadow: 0px 1px 14px 0px rgba(81, 149, 245, 0.2);
    padding: 0;
  }
  >>> .el-form-item {
    margin: 0;
  }
  >>> .el-radio{
    margin-top:13px
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
    .input {
      width: 13%;
    }
    .table {
      width: 98%;
      height: 85%;
      margin: 0 auto;
      >>> .te {
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
        font-family: Microsoft YaHei;
      }
      .el-icon-edit-outline {
        font-size: 18px;
        color: #1068f0;
        cursor: pointer;
      }
      .el-icon-delete-solid {
        font-size: 18px;
        color: #fb6684;
        cursor: pointer;
      }
    }
    .pages {
      width: 100%;
      height: 10%;
      margin-top: 15px;
      overflow: hidden;
      text-align: center;
    }
  }
}
</style>
