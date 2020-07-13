<template>
    <div class="taskInfo">
        <header>
            <p style="text-indent:30px">任务信息</p>
            <div>
                <aside>
                    <p v-if="filt">已过滤<span @click="$emit('reset');filt = false;bck=0">×</span></p>
                </aside>
                <section class="op">
                    <p :class="{bckSty:index === bck}" class="p" @click="opEv(index)" v-for="(item,index) in opt" :key="index">{{item}}</p>
                </section>
                <section class="demo-input-suffix">
                    <el-input
                        @blur="searchs"
                        style="width:90%"
                        placeholder="请输入关键字"
                        suffix-icon="el-icon-search"
                        v-model="input1">
                    </el-input>
                </section>

            </div>
        </header>
        <div class="info">
            <el-table
                :data="tableData.list"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                max-height="200"
                width="100%"
              >
                <el-table-column
                    prop="name"
                    label="任务名称"

                    >
                </el-table-column>
                <el-table-column
                    prop="day"
                    label="发布时间"
                    >
                </el-table-column>
                <el-table-column
                    prop="types"
                    label="任务类型"
                    width="100"
                    >
                </el-table-column>
                <el-table-column
                    prop="percent"
                    label="实际/计划比(%)"
                    >
                </el-table-column>
                <el-table-column
                    prop="realHour"
                    label="实际工时(h)"
                    >
                </el-table-column>
                <el-table-column
                    prop="height"
                    label="详情"

                    >
                    <template slot-scope="scope">
                            <span style="color:#33CCFF;cursor:pointer" @click="showDetail(scope)">详情</span>
                        </template>
                </el-table-column>

            </el-table>
            <div style="width:100%;margin-left:10%;">
                 <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :hide-on-single-page="this.tableData.total===1||this.tableData.total===0"
                    :page-size="10"
                    background
                    layout="total, prev, pager, next"
                    :total="this.tableData.total">
                  </el-pagination>
            </div>
        </div>
        <taskPop ref="taskpop" style="position:absolute"></taskPop>
    </div>
</template>

<script>
import taskPop from '../../home/modules/detaile/index'
import {Table} from 'element-ui'

export default {
  name: 'taskInfo',
  data () {
    return {
      filt: false,
      tableData: [

      ],
      pagesize: 0,
      bck: 0, // 状态
      input1: '', // 输入框的内容
      opt: ['所有', '进行中', '已完成']
    }
  },
  components: {
      taskPop,
      ElTable: Table
  },
  mounted () {

  },
  destroyed () {
  },
  methods: {
    // 处理当前页
    handleCurrentChange (val) {
        this.$emit('pageChange', val)
    },
    showDetail (val) {
      this.$bus.$emit('detaile', val.row)
       localStorage.setItem('detaileId', val.row.id)
    },
    // 输入框搜索事件
    searchs () {
        this.$emit('chilEvent', {name: '搜索框', value: this.input1})
        this.input1 = ''
    },
    // 获取数据
    getTaskData (val) {
      this.tableData = val
      this.tableData.list.forEach(item => {
        if (item.day < 0) {
          item.day *= -1
        }
        item.types = ''
        switch (item.type) {
          case '01':
            item.types = '通用'
            break
              case '02':
            item.types = '检修'
            break
              case '03':
            item.types = '清洗'
            break
              case '04':
            item.types = '抄表'
            break
        }
      })
    },
    opEv (index) {
      this.bck = index
      this.$emit('chilEvent', {name: 'bizType', value: this.opt[this.bck]})
    }
  }
}
</script>
<style lang="scss" scoped>
.taskInfo {
  // background: red;
     background: #FFFFFF;
  header {
    width: 100%;
    height: 23%;
    p{

        padding-top: 12px;
        // padding-bottom: 6px;
    }
    div{
        height: 40px;
        display: flex;
        justify-content: space-around;
        section{
            line-height:10px;
            width: 40%;
        }
        aside{
            line-height:10px;
            width: 20%;
            padding-left:20px;
            position: relative;
            p{
                height: 30px;
                width: 80px;
                border-radius: 5px;
                box-shadow:1px 1px 2px 0px rgba(91,91,91,0.16);
                text-align: center;
                margin-top: 2px;
                span{
                  position: absolute;
                  // right: 0;
                  top: 3px;
                  cursor: pointer;
                }
            }
        }
        .op{
            display: flex;
            margin-top: 2px;
             .bckSty {
                background: #33ccff;
                }
            .p{
                text-align: center;
                line-height: 5px;
                width: 61px;
                height: 30px;
                cursor: pointer;
                font-size: 14px;
                border: 1px solid #33ccff;
            }
            .p:nth-child(1){
              border-radius: 4px 0 0 4px;
              border-right: 0;
            }
            .p:nth-child(3){
              border-radius:0 4px 4px 0;
              border-left: 0;
            }
        }
    }
  }
  .info {
    width: 100%;
    height:77%;

    >>> .cell-style {
      text-align: center;
    }
    >>> .header-cell-style {
      text-align: center;
    }
  }
}
</style>
