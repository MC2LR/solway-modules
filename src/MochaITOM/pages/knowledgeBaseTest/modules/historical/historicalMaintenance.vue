<template>
    <div class="productInfomation">
        <div class="searchCondition">
            <el-select v-model="searchFieldType"
                          class="searchKeywords">
                            <el-option
                            v-for="item in keywords"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
            <el-input
                class="searchContent" style="width:180px"
                placeholder="请输入关键词搜索"
                clearable
                @change="queryProductInformationList({pageIndex: 1})"
                v-model="searchContent">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="queryProductInformationList"></i>
            </el-input>
            <el-select v-model="manufid"
                          filterable
                          clearable
                          collapse-tags
                          placeholder="请选择设备厂商"
                          @change="changeManufacturer"
                          class="searchContent">
                            <el-option
                            v-for="item in manufacturerList.res.data"
                            :key="item.id"
                            :label="item.manufname"
                            :value="item.id">
                            </el-option>
                        </el-select>
            <el-select class="searchContent"
                        v-model="productid"
                        filterable
                        clearable
                        collapse-tags
                        @change="queryProductInformationList({pageIndex: 1})"
                        placeholder="请选择产品型号">
                <el-option
      v-for="item in this.productModelList.res.data"
      :key="item.id"
      :label="item.productName"
      :value="item.id">
                </el-option>
            </el-select>
            <el-select class="searchContent"
            v-model="deviceType"
            @change="queryProductInformationList({pageIndex: 1})"
            clearable
             placeholder="设备类型">
                <el-option
      v-for="item in this.deviceTypes"
      :key="item.value"
      :label="item.label"
      :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="orderContent" style="color:black;">
           <span style="cursor:pointer;" :class="{ 'orderActive': sortField=='views', 'orderUnActive': sortField!='views'}"> <span  @click="changeOrder('views')">按浏览次数排序 </span>
           <span v-show="viewAsc=='asc'" @click="changeViewAsc('desc')">△</span><span v-show="viewAsc=='desc'" @click="changeViewAsc('asc')">▽</span></span>
           <span style="cursor:pointer;" :class="{ 'orderActive': sortField=='time', 'orderUnActive': sortField!='time'}"><span  @click="changeOrder('time')" style="margin: 0px 0px 0px 20px">按发布时间排序 </span>
            <span v-show="publictimeAsc=='asc'" @click="changePublictimeAsc('desc')">△</span><span v-show="publictimeAsc=='desc'" @click="changePublictimeAsc('asc')">▽</span></span>
            <span style="cursor:pointer;" :class="{ 'orderActive': sortField=='faultCode', 'orderUnActive': sortField!='faultCode'}"><span  @click="changeOrder('faultCode')" style="margin: 0px 0px 0px 20px">按故障码排序 </span>
            <span v-show="faultCodeAsc=='asc'" @click="changeFaultCodeAsc('desc')">△</span><span v-show="faultCodeAsc=='desc'" @click="changeFaultCodeAsc('asc')">▽</span></span>
        </div>
        <div style="height:65vh;overflow-y:auto">
             <el-table
    :data="this.productInformationList.res.data.list"
    stripe
    style="width: 97%">
    <el-table-column
      prop="field1"
      label="故障码"
      width="180">
    </el-table-column>
    <el-table-column
      prop="field5"
      label="故障内容"
      width="180">
    </el-table-column>
    <el-table-column
      prop="field2"
      label="厂家名称">
    </el-table-column>
    <el-table-column
      prop="field3"
      label="产品型号">
    </el-table-column>
    <el-table-column
      prop="content"
      label="维修内容">
    </el-table-column>
    <el-table-column
      prop="field4"
      label="维修时间">
    </el-table-column>
  </el-table>
        </div>
        <div class="footer">
        <solway-pagination style="margin:7px"
                    :page-index="productInformationList.res.pageIndex"
                    :page-size="productInformationList.res.pageSize"
                    :total="productInformationList.res.total"
                    @change="queryProductInformationList">
                </solway-pagination>
        </div>
        <el-dialog
  :visible.sync="dialogVisible"
  width="735px"
  :title="this.productInfo.title"
  center
  >
  <content-dialog :product="productInfo"></content-dialog>
  <span slot="footer" class="dialog-footer">
  </span>
</el-dialog>
    </div>
</template>
<script>
import {getDictionaryList, api＿getManufacturer, api＿getProductModel, api＿getProductInformation} from '@/request/api'
import solwayPagination from '@/components/pagination'
import contentDialog from './dialogs/content'
export default {
    components: {
        solwayPagination,
        contentDialog
    },
    data () {
        return {
            dialogTitle: '',
            dialogVisible: false,
            searchContent: '',
            searchFieldType: '1',
            deviceType: [],
            ascOrDesc: 'asc',
            manufid: [],
            productid: [],
            sortField: 'views',
            viewAsc: 'desc',
            publictimeAsc: 'desc',
            faultCodeAsc: 'desc',
            keywords: [{
          value: '1',
          label: '故障码'
        }, {
          value: '2',
          label: '故障处理'
        }],
        deviceTypes: [{
          value: '1',
          label: '汇流箱'
        }, {
          value: '2',
          label: '逆变器'
        }, {
          value: '3',
          label: '箱变'
        }, {
          value: '5',
          label: '气象仪'
        }, {
          value: '17',
          label: '风机'
        }, {
          value: '18',
          label: '测风塔'
        }],
        manufacturerList: api＿getManufacturer({
                later: true,
                res: {
                    data: []
                }
            }),
            productModelList: api＿getProductModel({
               later: true,
                res: {
                    data: []
                }
            }),
            productInformationList: api＿getProductInformation({
                later: true,
                res: {
                    data: []
                }
            }),
            productClassList: getDictionaryList({
                later: true,
                res: {
                    data: []
                }
            }),
            productInfo: {}
        }
    },
    created () {
            this.queryManufacturerList()
            this.queryProductInformationList()
            this.queryProductClassList()
    },
    methods: {
        dialogOpen (data) {
            // this.repositoryOne.getData({'queryType': 'proInfo', 'id': data})
            this.dialogVisible = true
        },
        queryProductClassList () {
            this.productClassList.getData({'search.dictType_eq': 'REPOSITORY_CLASS'})
        },
        changeManufacturer (data) {
            this.productModelList.res.data = []
            this.productid = '' // 删除产品型号选中项
            if (this.manufid !== '' && this.manufid !== []) {
                this.queryProductModelList()
            }
            this.queryProductInformationList({pageIndex: 1})
        },
        queryProductInformationList (data = {}) {
            this.productInformationList.getData({
                'queryType': 'historyRepair',
                'manuFId': this.manufid,
                'productId': this.productid,
                'ascOrDesc': this.ascOrDesc,
                'deviceType': this.deviceType,
                'searchContent': this.searchContent,
                'searchFieldType': this.searchFieldType,
                'page.pn': data.pageIndex,
                'page.size': data.pagesize})
        },
        queryProductModelList () {
            this.productModelList.getData({'search.manufId_eq': this.manufid})
        },
        queryManufacturerList () {
            this.manufacturerList.getData({})
        },
        handleCurrentChange (data) {
            this.productInformationList.params.pageIndex = data - 1
            this.queryProductInformationList()
        },
        handleSizeChange (data) {
            this.productInformationList.params.pageSize = data
            this.queryProductInformationList()
        },
        changeOrder: function (data) {
              this.sortField = data
              if (data === 'views') {
                  this.ascOrDesc = this.viewAsc
              } else if (data === 'faultCode') {
                this.ascOrDesc = this.faultCodeAsc
              }
              this.queryProductInformationList()
            },
        changeViewAsc: function (data) {
            this.ascOrDesc = data
            if (this.sortField === 'views') {
                this.viewAsc = data
                this.queryProductInformationList()
            }
        },
        changePublictimeAsc: function (data) {
            this.ascOrDesc = data
            if (this.sortField === 'time') {
                this.publictimeAsc = data
                this.queryProductInformationList()
            }
        },
        changeFaultCodeAsc: function (data) {
            this.ascOrDesc = data
            if (this.sortField === 'faultCode') {
                this.faultCodeAsc = data
                this.queryProductInformationList()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.searchCondition{
    margin: 5px 0px 0px 0px;
}
.searchContent{
    margin:20px 25px 0px 0px;
    width:220px
}
.searchKeywords{
    margin:20px -5px 0px 0px;
    width:100px
}
.orderContent{
    line-height: 50px;
    font-size:14px
}
.footer{
        text-align: center;
    }
.orderActive{
    color:#49BFAD;
}
.orderUnActive{
    color:#333333;
}
</style>
