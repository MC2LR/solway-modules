<template>
    <div class="company-management">
        <page-slide-down-admin v-if="!independent"></page-slide-down-admin>
        <common-header :modelName="modelName">
            <span class="btn-con">
                <public-notice></public-notice>
                <full-screen style="margin: 0 30px;"></full-screen>
                <personal-center></personal-center>
            </span>
        </common-header>
        <div v-if="!switchPage" class="page-header">
            <div>
                <el-select v-model="stClass" placeholder="请选择" style="width:120px;" @change="getCompanyListData()">
                    <el-option
                        v-for="item in stClassOptions"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-input placeholder="请输入集团名称" style="width:220px;" v-model="keywords" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="getCompanyListData()"></el-button>
                </el-input>
                <my-paging
                    style="float: right;color:#fff;padding-top: 6px;"
                    :pageSizeArr="[10, 20, 50, 100]"
                    @change="data => selectCompanyInfo1.getData(data)"
                    v-bind="selectCompanyInfo1.res.body"/>
            </div>
        </div>
        <div v-if="!switchPage" class="table-content">
            <el-table
                :data="tableData"
                v-loading="selectCompanyInfo1.loading"
                border
                :row-style="{'cursor': 'pointer'}"
                :max-height="vh - 160"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column
                    prop="COM_NAME"
                    label="集团名称"
                    align="center"
                    width="260">
                </el-table-column>
                <el-table-column
                    prop="expiryDate"
                    label="最早接入时间"
                    align="center"
                    :formatter="(row, column, cellValue) => cellValue && new Date(cellValue).Format('yyyy-MM-dd')"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="BuildCapacity"
                    align="right"
                    label="装机容量">
                </el-table-column>
                <el-table-column
                    prop="count00"
                    align="right"
                    label="电站数量">
                </el-table-column>
                <el-table-column
                    prop="COM_CONT"
                    label="联系人"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="COM_TEL"
                    label="联系电话"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="COM_STATUS"
                    align="center"
                    width="100"
                    label="是否启用">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.COM_STATUS"
                            @change="v => toEnableCompany(scope.row.COM_ID, scope.row.COM_STATUS)"
                            inactive-color="grey">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <span
                            title="模块销售"
                            class="el-icon-office-building configure-company"
                            @click="configureModuleForCompany(scope.row)"
                            style="font-size: 18px;">
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-if="switchPage">
            <test v-bind="moduleSaleParams"></test>
        </div>
    </div>
</template>
<script>
import {api＿selectCompanyInfo1, api＿companyEnableUse} from '@/request/api'
import { independent } from '@comm/tools/env'
import CommonHeader from '@comm/components/CommonHeader'
import personalCenter from '@comm/components/personalCenter/index'
import publicNotice from '@comm/components/publicNotice/publicNotice'
import fullScreen from '@comm/components/fullScreen/index'
import pageSlideDownAdmin from '@comm/components/pageSlideDownAdmin/pageSlideDownAdmin'
import test from '@moduleSale/components/moduleSale/index'
import {Table, TableColumn, Select, Option, Input, Button, Switch, Message} from 'element-ui'
import MyPaging from '@comm/components/paging'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
    data () {
        return {
            independent: independent,
            modelName: '集团管理',
            stClassOptions: [{name: '全部', value: ''}, {name: '光伏', value: '01'}, {name: '风电', value: '02'}],
            keywords: null,
            tableData: [],
            stClass: '',
            switchPage: false,
            moduleSaleParams: {},
            selectCompanyInfo1: api＿selectCompanyInfo1({
                later: true,
                onlyLatest: true,
                res: {
                    body: {
                        data: []
                    }
                }
            }),
            companyEnableUse: api＿companyEnableUse({
                later: true,
                sameTimeOnce: true
            })
        }
    },
    methods: {
        getCompanyListData () {
            this.selectCompanyInfo1.getData({pageIndex: 0, pageSize: 10, stClass: this.stClass, comName: this.keywords})
        },
        configureModuleForCompany (row) {
            this.switchPage = true
            this.moduleSaleParams = {
                comId: row.COM_ID
            }
        },
        backFromModuleSale () {
            this.switchPage = false
        },
        toEnableCompany (comId, comStatus) {
            this.companyEnableUse.getData({comStatus: comStatus ? 1 : 0, comId}).then(res => {
                if (res.code === 0) {
                    Message.success(res.msg || '操作成功')
                } else {
                    Message.error(res.msg || '操作失败')
                }
                this.getCompanyListData()
            })
        }
    },
    created () {
        this.getCompanyListData()
        this.selectCompanyInfo1.subscribe(res => {
            let data = res?.body?.data
            this.tableData = data.map(v => {
                if (v.COM_STATUS) {
                    return {
                        ...v,
                        COM_STATUS: true
                    }
                }
                return {
                    ...v,
                    COM_STATUS: false
                }
            })
        })
    },
    mounted () {
        // 购买模块配置返回
        this.$bus.on('backFromModuleSale', this.backFromModuleSale)
    },
    beforeDestroy () {
        this.$bus.off('backFromModuleSale', this.backFromModuleSale)
    },
    components: {
        CommonHeader,
        personalCenter,
        publicNotice,
        fullScreen,
        pageSlideDownAdmin,
        test,
        MyPaging,
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElSelect: Select,
        ElOption: Option,
        ElSwitch: Switch,
        ElInput: Input,
        ElButton: Button
    }
}
</script>
<style lang="scss">
.company-management {
    @import '@comm/assets/themes/table/t1.scss';
    .el-table td span{
        padding: 0.5em;
        cursor: pointer;
        &.edit {
            @include c(color, $text_c1);
        }
    }
    .el-button--mini.is-round {
        background: transparent;
        color: #31d3c9;
        border: 1px solid #31d3c9;
    }
}
</style>
<style lang="scss" scoped>
.company-management {
    position:relative;
    font-size:12px;
    color: white;
    .btn-con {
        position: absolute;
        right: 30px;
        top: 19px;
    }
    .page-header{
        padding: 20px 20px 0;
    }
    .table-content{
        padding:20px;
    }
}
</style>
