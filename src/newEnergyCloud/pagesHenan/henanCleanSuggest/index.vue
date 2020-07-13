<template>
    <div class="clean-suggest-home">
        <div class="total-info">
            <span>平均清洁指数：{{clean_mark}}</span>
            <span style="margin-left:40px;">建议清洗电站数：{{clean_station_num}}</span>
        </div>
        <div class="condition-area">
            <el-input placeholder="请输入电站名称" v-model="keywords"  @keydown.enter.native="keywordsSearch()" class="input-with-selectc custom_dark1" style="width:200px;">
                <i slot="append" class="el-icon-search" style="cursor:pointer;" @click="keywordsSearch()"></i>
            </el-input>
            <span style="margin-left:40px;">只看建议清洗的电站</span>
            <el-switch
                v-model="ifCleanFlag"
                @change="v => initData(v)"
                inactive-color="grey">
            </el-switch>
        </div>
        <div class="table-container">
            <el-table
                ref="tableRef"
                highlight-current-row
                v-if="cleanSuggestData.res.body"
                v-loading="cleanSuggestData.loading"
                :data="tableData"
                border
                :row-style="{'cursor': 'pointer'}"
                row-class-name="row-style"
                height="100%"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                empty-text="不需要清洗"
                style="width: 100%">
                <el-table-column
                    prop="st_name"
                    label="电站名称">
                </el-table-column>
                <el-table-column
                    prop="clean_mark"
                    width="170px"
                    label="电池板清洁指数（%）">
                </el-table-column>
                <el-table-column
                    prop="clean_level"
                    width="180"
                    align="center"
                    label="积灰程度">
                    <template slot-scope="scope">
                        <span :style="{'color': ['#2CD97E', '#2CD97E', '#2CD97E', '#EE6962', '#EF2F2F', '#969696' ][scope.row.clean_level]}">
                            {{['', '优', '良', '轻度积灰', '中度积灰', '严重积灰'][scope.row.clean_level]}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="real_kwh_next_week"
                    min-width="80"
                    label="清洗建议">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.isSuggest" style="color:#2CD97E;">不用清洗</span>
                        <span v-else :style="{'color': ['#2CD97E', '#2CD97E', '#2CD97E', '#EE6962', '#EF2F2F', '#969696' ][scope.row.clean_level]}">建议清洗，电池板清洗后，按照最近30天的光照条件，预计可提高发电量{{scope.row.real_kwh_next_week}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {api＿cleanSuggest} from '@/request/henanApi'
import {Switch, Button, Table, TableColumn} from 'element-ui'
export default {
    components: {
        ElSwitch: Switch,
        ElButton: Button,
        ElTable: Table,
        ElTableColumn: TableColumn
    },
    data () {
        return {
            keywords: '',
            clean_mark: '-',
            clean_station_num: '-',
            ifCleanFlag: true,
            tableData: [],
            cleanSuggestData: api＿cleanSuggest({later: true})
        }
    },
    methods: {
        initData () {
            this.cleanSuggestData.getData({isSuggest: (this.ifCleanFlag ? 1 : 0)}).then(res => {
                this.tableData = res.body.stations
                this.clean_mark = this.cleanSuggestData.res.body.clean_mark || '-'
                this.clean_station_num = this.cleanSuggestData.res.body.clean_station_num || '-'
            })
        },
        keywordsSearch () {
            this.tableData = this.cleanSuggestData.res.body.stations.filter(v => v.st_name.includes(this.keywords))
        }
    },
    created () {
        this.initData()
    }
}
</script>

<style lang="scss" scoped>
.clean-suggest-home {
    >>> .condition-area{
        @import '@comm/assets/themes/input/input_custom_dark1.scss';
        margin-bottom: 20px;
        font-size:14px;
    }
    >>> .table-container{
        @import '@comm/assets/themes/table/table_custom_dark1.scss';
        height: calc(100vh - 130px);
    }
    font-size:12px;
    color: #47EBFF;
    height: 100%;
    padding: 0px 13px 15px;
    .total-info{
        line-height: 60px;
    }
}
</style>
