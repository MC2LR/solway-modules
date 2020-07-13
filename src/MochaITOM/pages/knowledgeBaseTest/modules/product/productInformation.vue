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
            v-model="repositoryClass"
            @change="queryProductInformationList({pageIndex: 1})"
            clearable
             placeholder="全部文档分类">
                <el-option
      v-for="item in this.productClassList.res.data"
      :key="item.dictValue"
      :label="item.dictName"
      :value="item.dictValue">
                </el-option>
            </el-select>
        </div>
        <div class="orderContent" style="color:black;">
           <span style="cursor:pointer;" :class="{ 'orderActive': sortField=='views', 'orderUnActive': sortField!='views'}"> <span  @click="changeOrder('views')">按浏览次数排序 </span>
           <span v-show="viewAsc=='asc'" @click="changeViewAsc('desc')">△</span><span v-show="viewAsc=='desc'" @click="changeViewAsc('asc')">▽</span></span>
            <span style="cursor:pointer;" :class="{ 'orderActive': sortField=='time', 'orderUnActive': sortField!='time'}"><span  @click="changeOrder('time')" style="margin: 0px 0px 0px 20px">按发布时间排序 </span>
            <span v-show="publictimeAsc=='asc'" @click="changePublictimeAsc('desc')">△</span><span v-show="publictimeAsc=='desc'" @click="changePublictimeAsc('asc')">▽</span></span>
        </div>
        <div style="height:65vh;overflow-y:auto">
            <span style="cursor:pointer; font-family: '微软雅黑';display:inline-block;margin:0px 35px 10px 0px;color:#333333;width:360px;height:168px;background-color:#FFFFFF;border-radius:5px"
            v-for="item in this.productInformationList.res.data.list"
            :key="item.id"
        :label="item.field1"
        :value="item.id"
        @click="dialogOpen(item.id)"
        >
            <div><span style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;display:inline-block;width: 220px;
            line-height:30px;font-size:14px;color:#333333;
            margin:0px 0px 0px 20px">{{item.field1}}</span>
            <span style="overflow: hidden;display:inline-block;
            line-height:30px;font-size:12px;color:#656565;margin:0px 0px 0px 40px">浏览次数</span></div>
            <div style="margin:0px 45px 0px 0px;line-height:10px;font-size:12px;color:#49BFAD;text-align:right">{{item.views}}</div>
            <div style="margin:0px 0px 0px 20px;line-height:18px;font-size:12px;color:#656565;">厂家名称 {{item.field2}}</div>
            <div style="margin:0px 0px 0px 20px;line-height:30px;font-size:12px;color:#656565;">产品型号 {{item.field3}}</div>
            <div style="margin:0px 0px 0px 20px;line-height:30px;font-size:12px;color:#656565;">资料分类 {{item.field4}}</div>
            <div style="margin:0px 0px 0px 20px;line-height:30px;font-size:12px;color:#656565;">{{item.field5}}</div>
                </span>
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
  :title="this.repositoryOne.res.data.title"
  center
  >
  <content-dialog :product="this.repositoryOne.res.data"></content-dialog>
  <span slot="footer" class="dialog-footer">
  </span>
</el-dialog>
    </div>
</template>
<script>
import {api＿getRepositoryOne, getDictionaryList, api＿getManufacturer, api＿getProductModel, api＿getProductInformation} from '@/request/api'
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
            repositoryClass: [],
            ascOrDesc: 'asc',
            manufid: [],
            productid: [],
            sortField: 'views',
            viewAsc: 'desc',
            publictimeAsc: 'desc',
            keywords: [{
          value: '1',
          label: '标题'
        }, {
          value: '2',
          label: '关键词'
        }, {
          value: '3',
          label: '简介'
        }, {
          value: '4',
          label: '正文'
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
            repositoryOne: api＿getRepositoryOne({
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
            this.repositoryOne.getData({'queryType': 'proInfo', 'id': data})
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
                'queryType': 'proInfo',
                'manuFId': this.manufid,
                'productId': this.productid,
                'ascOrDesc': this.ascOrDesc,
                'repclass': this.repositoryClass,
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
              } else if (data === 'time') {
                this.ascOrDesc = this.publictimeAsc
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
