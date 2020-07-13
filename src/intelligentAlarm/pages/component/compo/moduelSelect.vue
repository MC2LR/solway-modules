<template>
    <div class="moduel">
         <el-dialog
        width="50%"
        center
        title="平台组合指标模板库"
        top="10vh"
        custom-class="dialog"
        :visible.sync="dialogTableVisibledModel"
        :modal-append-to-body="false"
         >
         <div class="se">
                   <el-select style="width:135px;margin-right:30px" v-model="valuesed" placeholder="选择设备类型">
                        <el-option
                        v-for="item in optionsAlarmModel"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input
                    style="width:210px"
                        placeholder="请输入关键词搜索"
                        suffix-icon="el-input__icon el-icon-search"
                        v-model="inputedModel">
                    </el-input>
         </div><br>
          <el-button type="primary" >加入</el-button>
          <el-table
                        ref="multipleTable"
                        :data="tableDatasModel"
                        tooltip-effect="dark"
                        height="430"
                        style="width: 100%"
                        row-class-name="row-style"
                        cell-class-name="cell-style"
                        header-row-class-name="header-row-style"
                        header-cell-class-name="header-cell-style"
                        @selection-change="handleSelectionChangeds">
                        <el-table-column
                        type="selection"
                        width="40">
                        </el-table-column>
                        <el-table-column
                        prop="date"
                        label="汇总数据名"
                    >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="汇总数据中文名"
                 >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="设备类型"
                  >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="计算维度"
              >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="计算函数"
               >
                        </el-table-column>
                         <el-table-column
                        prop="address"
                        label="过滤器"
               >
                        </el-table-column>
                    </el-table>
                  </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'moduelSelect',
    data () {
        return {
            dialogTableVisibledModel: false,
            optionsAlarmModel: [],
            tableDatasModel: [],
            inputedModel: '',
            valuesed: ''
        }
    },
    methods: {
        editFlat (val) {

        },
        opened () {
            this.dialogTableVisibledModel = true
        },
        handleSelectionChangeds (val) {

        }
    }
}
</script>

<style lang="scss" scoped>
    .moduel{
        width: 100%;
        overflow: hidden;
        >>> .dialog {
        height: 70vh;
        overflow: hidden;
        }
         .se {
    width: 100%;
    height: 40px;
    overflow: hidden;
  }
    }
</style>
