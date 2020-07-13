<template>
   <div class="index">
        <el-dialog
        title="故障小助手"
        width="50%"
        center
        top="40px"
        custom-class="dialogsa"
        :visible.sync="dialogTableVisible"
        :modal-append-to-body="false"
         >
            <div class="content">
                <div class="perRow per1">
                    <span>故障描述</span><p></p>
                </div>
                  <div class="perRow">
                    <span>故障原因及处理流程</span><textarea  rows="8" style="resize:none;overflow-y:scroll;display:block;width:69%"></textarea>
                </div>
                  <div class="perRow">
                    <span>处理建议</span><textarea  rows="8" style="resize:none;overflow-y:scroll;display:block;width:69%"></textarea>
                </div>
                  <div class="perRow">
                    <span>维修记录</span><div class="per3">
                         <el-table
                            :data=tableData
                            border
                            row-class-name="row-style"
                            cell-class-name="cell-style"
                            header-row-class-name="header-row-style"
                            header-cell-class-name="header-cell-style"
                            style="width:100%;">
                            <el-table-column
                                prop="date"
                                label="故障内容"
                                width="140">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="维修内容"
                                width="140">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="维修时间"
                                width="140">
                            </el-table-column>
                         </el-table>
                    </div>
                </div>
            </div>
        </el-dialog>
   </div>
</template>

<script>
// import { Dialog} from 'element-ui'
export default {
    name: 'index',
    data () {
        return {
            dialogTableVisible: false,
            tableData: [

            ]
        }
    },
    mounted () {
         this.$bus.on('showAssistant', this.AssistantData)
    },
    methods: {
        AssistantData (val) {
            this.dialogTableVisible = true
            console.log(val)
        }
    },
    destroyed () {
        this.$bus.off('showAssistant')
    },
   components: {
    // ElDialog: Dialog,
    // ElTable: Table
  }
}
</script>

<style lang="scss" scoped>
    .index{
        width: 100%;
        height: 100%;
        >>> .dialogsa{
            height:85%;
            overflow-y: auto;

        }
        .content{
            .perRow{
                width: 100%;
                display: flex;
                font-size: 12px;
                margin-bottom: 20px;
                span{
                    width: 20%;
                    text-align: right;
                    margin-right: 15px;
                }
                p{
                    border-bottom: 1px solid #CBCBCB;
                    width: 69.5%;
                }
               >>> .header-row-style{
                    background: #F1F1F1;
                    // width: 80%;
                    color: black;
                }
                >>> .row-style{
                    color: black;
                }
                >>> .cell-style{
                    border-bottom: 1px solid #CBCBCB;
                }
            }
            .per1{
                height: 40px;
                line-height: 40px;

            }
            .per3{
                width: 70%;
            }
        }
    }
</style>
