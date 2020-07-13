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
                   <el-select style="width:135px;margin-right:30px" @change="seleType" clearable v-model="dtypes" placeholder="选择设备类型">
                          <el-option v-if="deTypeShows"
                            label="气象仪"
                            value="5">
                            </el-option>
                                    <el-option v-if="!deTypeShows"
                            label="风机"
                            value="17">
                            </el-option>
                                    <el-option v-if="!deTypeShows"
                            label="测风塔"
                            value="18">
                            </el-option>
                                    <el-option v-if="deTypeShows"
                            label="汇流箱"
                            value="1">
                            </el-option>
                                    <el-option v-if="deTypeShows"
                            label="逆变器"
                            value="2">
                            </el-option>
                                <el-option v-if="deTypeShows"
                            label="电能表"
                            value="4">
                            </el-option>
                                <el-option v-if="deTypeShows"
                            label="箱变"
                            value="3">
                            </el-option>
                    </el-select>
                    <el-input
                    style="width:210px"
                        placeholder="请输入关键词搜索"
                        @blur="sercheds"
                        suffix-icon="el-input__icon el-icon-search"
                        v-model="inputedModel">
                    </el-input>
         </div><br>
          <el-button type="primary" @click="addGroup">加入</el-button>
          <el-table
                        ref="multipleTable"
                        :data="tableDatasModel"
                        tooltip-effect="dark"
                        max-height="380"
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
                        prop="field"
                        label="汇总数据名"
                    >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="汇总数据中文名"
                 >
                        </el-table-column>
                        <el-table-column
                        prop="dtypes"
                        label="设备类型"
                  >
                        </el-table-column>
                        <el-table-column
                        prop="aggDims"
                        label="计算维度"
              >
                        </el-table-column>
                        <el-table-column
                        prop="aggFunction"
                        label="计算函数"
               >
                        </el-table-column>
                         <el-table-column
                        prop="ruleExp"
                        label="过滤器"
               >
                        </el-table-column>
                    </el-table>
                    <div class="pages">
                        <el-pagination
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :current-page="1"
                        :hide-on-single-page="false"
                        :page-sizes="[10, 15, 20, 30]"
                        background
                        layout="total,sizes, prev, pager, next"
                        :total='this.tableDatasModel.length'>
                    </el-pagination>
                    </div>
                  </el-dialog>
    </div>
</template>

<script>
import {
getGroupPointTemple,
addGroupPoint
} from '@intelligentAlarms/request/api'
export default {
    name: 'moduelSelect',
    data () {
        return {
            dialogTableVisibledModel: false,
            tableDatasModel: [],
            inputedModel: '',
            dtypes: '',
            deTypeShows: true,
            pageNo: '',
            pageSize: '',
            templateIds: [],
            getGroupPointTempled: getGroupPointTemple({later: true}),
            addGroupPointed: addGroupPoint({later: true})
        }
    },
 created () {
          // 01是光伏   02是风电
    if (this.$store.getters.station_class === '01') {
        this.deTypeShows = true
    } else {
        this.deTypeShows = false
    }
  },
    methods: {
        // 加入指标
        addGroup () {
            this.addGroupPointed.getData([...this.templateIds]).then((res) => {
                console.log(res)
                if (res.code === 200) {
                    this.$bus.emit('addGroup')
                    this.dialogTableVisibledModel = false
                }
            })
        },
        handleCurrentChange (val) {
            this.pageNo = val
            this.getPages()
        },
        handleSizeChange (val) {
            this.pageSize = val
            this.getPages()
        },
        // 获取分页
        getPages () {
            this.getGroupPointTempled.getData({
                condition: this.inputedModel,
                dtype: this.dtypes,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            }).then((res) => {
                console.log(res)
                if (res.code === 200 && res.data.list.length > 0) {
                        this.tableDatasModel = res.data.list
                        this.tableDatasModel.forEach(item => {
                            item.aggDims = ''
                            item.bizTypes = ''
                            item.aggDims = item.aggDim === '01' ? '同站' : '同机型'
                            item.aggDims = item.aggDim === '01' ? '光伏' : '风电'
                        })
                } else if (res.data.list.length === 0) {
                    this.tableDatasModel = []
                }
            })
        },
        opened () {
            this.dialogTableVisibledModel = true
            this.getPages()
        },
        //
        handleSelectionChangeds (val) {
                console.log(val)
                this.templateIds = []
                if (val.length > 0) {
                    val.forEach(item => {
                        this.templateIds.push(item.id)
                    })
                }
        },
        // 设备类型选择
        seleType () {
            console.log(this.dtypes)
            this.getPages()
        },
        // 搜索
        sercheds () {
            this.getPages()
        }
    }
}
</script>

<style lang="scss" scoped>
    .moduel{
        width: 100%;
        overflow: hidden;
        >>> .dialog {
        min-height:80vh;
        overflow: hidden;
        }
         .se {
    width: 100%;
    height: 40px;
    overflow: hidden;
  }
      .pages{
        width: 100%;
        height: 7%;
        margin-top: 20px;
        overflow: hidden;
        text-align: center;
    }
    }
</style>
