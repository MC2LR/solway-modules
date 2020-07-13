<template>
  <div class="log-detail" @click="$event.stopPropagation()">
    <div class="top">设备运行日志明细</div>
    <div class="con">
      <div class="tools-wrap">
        <i class="iconfont icondaochu-" title="导出图表" style="color: #31d3c9;font-size: 25px;cursor: pointer;float:right;"></i>
      </div>
      <!-- 表格区域 -->
      <el-table :data="tableData" style="width: 100%" max-height="500" :border="true">
        <el-table-column fixed prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui'

export default {
  name: 'logDetail',
  data () {
    return {
      logDetail: true,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  components: {
    elTable: Table,
    elTableColumn: TableColumn
  },
  created () {},
  methods: {}
}
</script>

<style lang="scss">
@import '@/assets/css/tableScroll.scss';

.log-detail {
  $thBackground: #10335C;
  $borderColor: #2a5b95;
  $tbodyBackground: #1b4980;
  $tbodyHoverBackground: #124271;
  $thColor: #fff;
  $tbodyColor: #b2d8ff;
  $borderLeftDisplay: solid;
  $thPadding: 12px 0;
  $tdPadding: 15px 0;
  @import '@/assets/css/table.scss';
}

</style>

<style lang="scss" scoped>
.log-detail {
  height: 88%;
  margin: 0 20px;
  margin-top: 50px;
  margin-bottom: 50px;
  background: #1b4980;
  .top {
    height: 48px;
    line-height: 48px;
    text-align: center;
    background: #285e9f;
  }
  .con {
    padding: 20px 15px 40px 15px;
    .tools-wrap {
      overflow: hidden;
      margin-bottom: 10px;
    }
  }
}
</style>
