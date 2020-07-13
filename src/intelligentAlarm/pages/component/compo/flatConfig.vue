<template>
    <div class="flat">
                <el-dialog
                    width="50%"
                    center
                    title="平台规则表达式模板库"
                    top="10vh"
                    custom-class="dialogFlat"
                    :visible.sync="dialogTableVisibledFlat"
                    :modal-append-to-body="false"
                      >
                      <div class="se">
                                <el-select style="width:135px;margin-right:30px" v-model="valuesed" placeholder="选择设备类型">
                                    <el-option
                                    v-for="item in optionsAlarmFlat"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-input
                                  style="width:210px"
                                    placeholder="请输入规则名进行检索"
                                    suffix-icon="el-input__icon el-icon-search"
                                    v-model="inputedFlat">
                                </el-input>
                      </div>
                      <el-table
                                    ref="multipleTable"
                                    :data="tableDatasFlat"
                                    tooltip-effect="dark"
                                    class="teed"
                                    height="430"
                                    style="width: 100%"
                                    row-class-name="row-style"
                                    cell-class-name="cell-style"
                                    header-row-class-name="header-row-style"
                                    header-cell-class-name="header-cell-style"
                                    >
                                    <el-table-column
                                    prop="date"
                                    label="规则名"
                                >
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
                                    label="操作"
                            >
                                      <template slot-scope="scope">
                                        <i class="el-icon-edit-outline" @click="editFlat(scope)"></i>
                                    </template>
                                    </el-table-column>
                    </el-table>
         </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'flatConfig',
    data () {
        return {
            dialogTableVisibledFlat: false,
            optionsAlarmFlat: [],
            tableDatasFlat: [],
            inputedFlat: '',
            valuesed: ''
        }
    },
    methods: {
        editFlat (val) {

        },
        opens () {
            this.dialogTableVisibledFlat = true
        }
    }
}
</script>

<style lang="scss" scoped>
    .flat{
        width: 100%;
        overflow: hidden;
        >>> .dialog {
        height: 70vh;
        overflow: hidden;
        }
    }
</style>
