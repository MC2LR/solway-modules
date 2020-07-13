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
                        prop="alarmClass"
                        label="报警分类"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="alarmLevel"
                        label="报警级别"
                 >
                        </el-table-column>
                        <el-table-column
                        prop="alarmStatus"
                        label="报警状态"
                  >
                        </el-table-column>
                        <el-table-column
                        prop="infoWay"
                        label="通知方式"
              >
                        </el-table-column>
                        <el-table-column
                        prop="infoName"
                        label="通知人"
                    >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="操作"
                         width="150">
                              <template slot-scope="scope">
                                 <i  class="iconfont iconbianji" title="编辑" @click="edit(scope)"></i>
                                 <i class="iconfont iconshanchu" title="删除" @click="deletes(scope)"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pages">
                        <el-pagination
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChangeds"
                        :current-page="1"
                        :hide-on-single-page="true"
                        :page-sizes="[15, 20, 25, 30]"
                        background
                        layout="total,sizes, prev, pager, next"
                        :total="this.tableData.length">
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
                      <!-- <el-form-item label="报警分类">
                          <el-checkbox v-model="checked">智能报警</el-checkbox>
                      </el-form-item> -->
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
                              <el-checkbox label="短信"></el-checkbox>
                            </el-checkbox-group>
                      </el-form-item>
                        <el-form-item label="通知人员">
                          <div style="width:100%;display:flex;height:30px"><el-checkbox @change="allSelect" v-model="checkedss" style="width:50%">角色</el-checkbox> <span style="width:50%">人员</span></div>
                          <div class="infoEvent">

                            <div style="display:flex" v-for="(item,index) in allDatas" :key="index">
                                <div style="width:50%"><el-checkbox @change="getOption(index)" v-model="item.check">{{item.roleName}}</el-checkbox></div>

                                <div style="width:50%">
                                  <el-select v-model="item.optionDataselects"  collapse-tags multiple @visible-change="getSelect($event,index)">
                                          <el-option
                                            v-for="items in item.optionData"
                                            :key="items.id"
                                            :label="items.realname"
                                            :value="items.id">
                                          </el-option>
                                  </el-select>
                                </div>
                            </div>
                          </div>
                      </el-form-item>
                   </el-form><br><br>
                  <div style="width:60%;margin:0 auto;height:50px;text-align:center">
                          <el-button style="background:#E7E7E7" @click="dialogTableVisibledinfos = false">取消</el-button>
                         <el-button type="primary" @click="sures">确认</el-button>
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
import {
    getInfoRulePage, alarmInfoDelete, alarmInfoUpde, queryCurrRole, queryUser, configEdit
} from '@intelligentAlarms/request/api'
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
      personData: [],
      checked: 1,
      checkedCities: [],
      pageSized: 10,
      pageNum: 1,
      checkedss: false,
      unpdeParams: null,
      allDatas: [],
      roleIndex: [],
      dialogTableVisibledinfos: false,
      configEditd: configEdit({later: true}),
      getInfoRulePaged: getInfoRulePage({later: true}),
      alarmInfoDeleted: alarmInfoDelete({later: true}),
      alarmInfoUpded: alarmInfoUpde({later: true}),
      queryCurrRoled: queryCurrRole({later: true}),
      queryUserd: queryUser({later: true}),
      icans: 'el-icon-video-pause',
      tableData: [

      ],
      dialogTableVisiblez: false
    }
  },
  components: {
    ElPageHeader: PageHeader,
    ELFormItem: FormItem,
    ELCheckbox: Checkbox
  },
  created () {
    this.getPage()
    this.initRole()
  },
  methods: {
    clearOption () {
      if (this.allDatas.length > 0) {
        this.allDatas.forEach(item => {
           item.check = false
            item.optionDataselects = []
             item.optionData = []
        })
      }
      this.checkedss = false
      this.checkList2 = []
      // this.checked = false
      this.checkList1 = []
      this.radio = ''
      this.checkList = []
    },
    // 角色全选
    allSelect (val) {
        if (val) {
          this.allDatas.forEach(item => {
            item.check = true
            this.roleIndex = []
            this.allDatas.forEach((item, index) => {
              if (item.check) {
                this.roleIndex.push(index)
              }
            })
          })
        } else {
            this.allDatas.forEach(item => {
             item.check = false
             item.optionDataselects = []
          })
        }
    },
    // 选择人员信息
    getSelect (e, val) {
      if (this.checkedss) {
        if (e) {
          if (this.roleIndex.length !== 0) {
            this.roleIndex.forEach(item => {
               if (item === val) {
                  console.log(this.allDatas[val].roleId)
                  this.queryUserd.getData({roleId: this.allDatas[val].roleId}).then((res) => {
                      console.log(res)
                      if (res.code === 200) {
                        this.allDatas[val].optionData = res.data
                      }
                  })
               } else {
                 this.allDatas[val].optionData = []
               }
            })
          } else {
            console.log(this.allDatas[val].optionData)
                 this.allDatas[val].optionData = []
          }
          console.log(this.roleIndex)
        }
      }
    },
    // 选择角色
    getOption (val) {
      this.roleIndex = [] // 设置roleIndex是为了角色全选后不全部发请求，点下拉框才请求
      this.allDatas.forEach((item, index) => {
        if (item.check) {
          this.roleIndex.push(index)
           this.queryUserd.getData({roleId: item.roleId}).then((res) => {
                      console.log(res)
                      if (res.code === 200) {
                        item.optionData = res.data
                      }
                  })
        } else {
          item.optionData = []
          item.optionDataselects = []
        }
      })
      console.log(this.roleIndex)
    },
    // 初始化公司角色
    initRole () {
      this.queryCurrRoled.getData().then((res) => {
         if (res.code === 200) {
            const allDatas = res.data
            if (allDatas.length > 0) {
              allDatas.forEach((item, index) => {
               item.check = false
               item.optionDataselects = []
               item.optionData = []
               item.roleUser = ''
             })
             this.allDatas = allDatas.map(v => ({...v}))
            }
         }
      })
    },
    // 分页查询
    getPage () {
        this.getInfoRulePaged.getData({
              pageNumber: this.pageNum,
              pageSize: this.pageSized
        }).then((res) => {
            console.log(res)
            if (res.code === 200) {
                this.tableData = res.data.list
                this.tableData.forEach(item => {
                    item.infoName = ''
                    item.infoWay = ''
                    item.alarmLevel = ''
                    item.alarmStatus = ''
                    item.alarmClass = item.ruleType === 1 ? '智能报警' : '其他报警'
                    if (item.userRuleItems.length > 0) {
                      item.userRuleItems.forEach(items => {
                         item.infoName += items.realname + '、'
                      })
                      item.infoName = item.infoName.substr(0, item.infoName.length - 1)
                    }
                    if (item.tplItems.length > 0) {
                      item.tplItems.forEach(itemsd => {
                          item.infoWay += itemsd.msgName + '、'
                      })
                      item.infoWay = item.infoWay.substr(0, item.infoWay.length - 1)
                    }
                    if (item.eventRuleItem.l1Rules.length > 0) {
                      item.eventRuleItem.l1Rules.forEach(value => {
                        item.alarmLevel += value.name + '、'
                      })
                        item.alarmLevel = item.alarmLevel.substr(0, item.alarmLevel.length - 1)
                    }
                       if (item.eventRuleItem.l2Rules.length > 0) {
                      item.eventRuleItem.l2Rules.forEach(value => {
                        item.alarmStatus += value.name + '、'
                      })
                        item.alarmStatus = item.alarmStatus.substr(0, item.alarmStatus.length - 1)
                    }
                })
            }
            console.log(this.tableData)
        })
    },
    opens () {
      this.dialogTableVisiblez = true
      this.getPage()
    },
    goBack () {
      this.dialogTableVisiblez = false
    },
    handleSelectionChange (val) {},
    handleCurrentChange (val) {
      this.pageNum = val
    },
    handleSizeChangeds (val) {
      this.pageSized = val
    },
    // 更新
    sures () {
        this.configEditd.getData().then((res) => {
        console.log(res)
      })
      console.log(this.unpdeParams)
          let infoMethods = []
          let alarmStatus = []
          let alarmLevel = []
          let a = false
          if (this.checkList2.length === 3 && this.checkList1.length === 3) {
            a = true
          }
          let userRoles = []
          let roleParams = []
          if (this.allDatas.length > 0) {
            this.allDatas.forEach(item => {
              if (item.check) {
                 item.userRole = ''
                 userRoles = []
                  userRoles.push('R' + item.roleId + ':')
                  if (item.optionDataselects.length !== 0) {
                    item.optionDataselects.forEach(items => {
                      console.log(items)
                       userRoles.push('U' + items)
                    })
                  } else {
                    userRoles.push('*')
                  }
                item.userRole = userRoles.join().slice(0, userRoles.join().indexOf(',')) + userRoles.join().slice(userRoles.join().indexOf(',') + 1)
                  console.log(item)
                roleParams.push(item.userRole)
                }
            })
          }
      if (this.unpdeParams === null) {
         this.checkList.forEach(item => {
             console.log(item)
              if (item === '应用消息') {
                   infoMethods.push(1)
                   infoMethods.push(2)
              }
              if (item === '邮件') {
                infoMethods.push(3)
              }
              if (item === '短信') {
                infoMethods.push(4)
              }
          })
            this.checkList2.forEach(item => {
               switch (item) {
                 case '提醒':
                   alarmLevel.push(3)
                   break
                     case '告警':
                   alarmLevel.push(2)
                   break
                     case '严重':
                   alarmLevel.push(1)
                   break
               }
            })
            this.checkList1.forEach(item => {
               switch (item) {
                 case '恢复':
                   alarmStatus.push(3)
                   break
                     case '认领':
                   alarmStatus.push(2)
                   break
                     case '发生':
                   alarmStatus.push(1)
                   break
               }
            })
          let params = {
            msgTpl: infoMethods.join(), // 通知方式
            dateRuleId: this.radio, // 通知时间
            eventRule: a ? ':' : ((alarmLevel.length === 3 ? '*' : alarmLevel.join()) + ':' + (alarmStatus.length === 3 ? '*' : alarmStatus.join())), // 报警规则和报警级别
            ruleType: this.checked,
            userRule: this.checkedss ? ':' : roleParams.join(';')
        }
        console.log(params)
        this.alarmInfoUpded.getData({
             ...params
        }).then((res) => {
          console.log(res)
          if (res.code === 200) {
            this.getPage()
            this.dialogTableVisibledinfos = false
            this.unpdeParams = null
          }
        })
      } else {
        this.checkList2.forEach(item => {
             this.unpdeParams.eventRuleItem.l1Rules.forEach(valus => {
                if (item === valus.name) {
                  alarmLevel.push(valus.id)
                }
             })
              this.unpdeParams.eventRuleItem.l2Rules.forEach(value => {
                if (item === value.name) {
                  alarmStatus.push(value.id)
                }
             })
        })
           this.checkList1.forEach(item => {
              this.unpdeParams.eventRuleItem.l2Rules.forEach(value => {
                if (item === value.name) {
                  alarmStatus.push(value.id)
                }
             })
        })
          this.checkList.forEach(item => {
            if (item === '应用消息') {
                   infoMethods.push(1)
                   infoMethods.push(2)
            }
             this.unpdeParams.tplItems.forEach(items => {
               if (item === items.msgName) {
                  infoMethods.push(items.msgTplId)
               }
             })
          })
          console.log(infoMethods)
          infoMethods = [...new Set(infoMethods)]

        let params = {
            msgTpl: infoMethods.join(), // 通知方式
            dateRuleId: this.radio, // 通知时间
            eventRule: a ? ':' : ((alarmLevel.length === 3 ? '*' : alarmLevel.join()) + ':' + (alarmStatus.length === 3 ? '*' : alarmStatus.join())), // 报警规则和报警级别
            id: this.unpdeParams.id,
            ruleType: this.checked,
            userRule: this.checkedss ? ':' : roleParams.join(';')
        }
        console.log(params)
        this.alarmInfoUpded.getData({
             ...params
        }).then((res) => {
          console.log(res)
          if (res.code === 200) {
            this.getPage()
            this.dialogTableVisibledinfos = false
            this.unpdeParams = null
          }
        })
      }
    },
    // 编辑通知规则
    edit (val) {
      // 配置项接口
      // this.configEditd.getData().then((res) => {
      //   console.log(res)
      // })
      this.clearOption()
      this.unpdeParams = val.row
      console.log(this.unpdeParams)

      // 编辑角色
      if (val.row.roleRuleItems.length > 0) {
        val.row.roleRuleItems.forEach(item => {
           if (this.allDatas.length > 0) {
             this.allDatas.forEach(items => {
               if (item.roleName === items.roleName) {
                 items.check = true
                }
             })
           }
         })
      }
      // 编辑时不是点击下拉框请求
        if (this.allDatas.length > 0) {
          this.allDatas.forEach(item => {
              if (item.check) {
                  this.queryUserd.getData({roleId: item.roleId}).then((res) => {
                      console.log(res)
                      if (res.code === 200) {
                        item.optionData = res.data
                      }
                  })
              }
          })
        }
        // option进行反选
      if (val.row.userRuleItems.length > 0) {
        val.row.userRuleItems.forEach(item => {
           if (this.allDatas.length > 0) {
             this.allDatas.forEach(items => {
               if (items.check) {
                 items.optionDataselects.push(item.id)
                 }
             })
           }
         })
      }
      // this.checked = true
      val.row.eventRuleItem.l1Rules.forEach(item => {
          this.checkList2.push(item.name)
      })
        val.row.eventRuleItem.l2Rules.forEach(item => {
          this.checkList1.push(item.name)
      })
       let infoways = val.row.infoWay.split('、')
       infoways.forEach(item => {
          switch (item) {
            case '微信':
            this.checkList.push('微信')
            break
                case '邮件':
            this.checkList.push('邮件')
            break
            default :
            this.checkList.push('应用消息')
          }
       })
        switch (val.row.dateRuleItem.name) {
          case '工作时间':
            this.radio = 1
            break
           case '非工作时间':
            this.radio = 2
            break
           case '任意时间':
            this.radio = 3
            break
        }
      this.dialogTableVisibledinfos = true
    },
    deletes (val) {
      console.log(val.row.id)
      // this.alarmInfoDeleted.getData({id: val.row.id}).then(res => {
      //     if (res.code === 200) {
      //         this.tableData.splice(val.row.$index, 1)
      //     }
      // })
    },
    add () {
      this.radio = ''
      this.unpdeParams = null
      this.checkList = []
      this.checkList1 = []
      this.checkList2 = []
      this.checkedss = false
      this.allDatas.forEach(item => {
            item.check = false
            item.optionDataselects = []
            item.optionData = []
            item.roleUser = ''
      })
      //  this.checked = false
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
    height: 78vh;
    overflow: hidden;
    padding: 0;
    .infoConfigs {
      width: 90%;
      height: 68vh;
      margin: 0 auto;
      overflow: auto;
      font-size: 12px;
      margin-top:45px;
      .infoEvent{
        width: 100%;
        height: 150px;
        overflow: auto;
        // display: flex;
        .ground.el-checkbox-group{
          width: 50%;

          .item{
              display: block;
              height: 30px;
            }
        }
      }
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
