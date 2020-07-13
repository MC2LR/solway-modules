<template>
    <div class="ash-block-b">
        <i class="el-icon-folder-opened" @click="exportCsv"></i>
        <div style="text-indent:10px;margin-bottom:6px;">清洗记录</div>
        <el-table
            :data="queryPvStationCleanSeList.res.body"
            style="width: 100%"
            height="calc(100% - 20px)"
            :row-style="{'cursor': 'pointer'}"
            cell-class-name="cell-style"
            header-row-class-name="header-row-style"
            header-cell-class-name="header-cell-style"
            row-class-name="row-style">
            <el-table-column
                prop="start_date"
                label="开始日期">
            </el-table-column>
            <el-table-column
                prop="end_date"
                label="结束日期"
                width="100">
            </el-table-column>
            <el-table-column
                prop="before_clean_mark"
                align="right"
                label="清洗前一周平均清洁指数(％)">
            </el-table-column>
            <el-table-column
                prop="after_clean_mark"
                align="right"
                label="清洗后一周平均清洁指数(％)">
            </el-table-column>
            <el-table-column
                align="center"
                prop="name"
                width="80"
                label="清洗效果">
                <template slot-scope="scope">
                    <i class="iconfont icon-tupian" style="color:#5676E8;" @click.stop="cleanResult.show = true;cleanResult.detail = scope.row"></i>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="report_site"
                label="清洗报告"
                width="80">
                <template slot-scope="scope">
                    <a target="_blank" :href="scope.row.report_site">
                        <i class="iconfont icon-baogao" style="color:#2FBFCC"></i>
                    </a>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            :visible.sync="cleanResult.show"
            @opened="$bus.emit('cleanResultEmit')"
            width="90%">
            <clean-result v-if="cleanResult.show" :detail="cleanResult.detail"></clean-result>
        </el-dialog>
    </div>
</template>

<script>
import {api＿queryPvStationCleanSeList} from '@newEnergyCloud/request/api'
import { downloadBlob, jsonToCsv } from '@comm/tools'
import cleanResult from './cleanResult'
import theme from '../theme/theme'
export default {
    mixins: [theme],
    data () {
        return {
            cleanResult: {
                show: false
            },
            queryPvStationCleanSeList: api＿queryPvStationCleanSeList({
                later: true
            })
        }
    },
    components: {
        cleanResult
    },
    methods: {
        dateChange (data) {
            this.startDate = data.startDate
            this.endDate = data.endDate
            this.getData()
        },
        stationChange () {
            this.getData()
        },
        getData () {
            let {startDate, endDate} = this
            this.queryPvStationCleanSeList.getData({startDate, endDate})
        },
        exportCsv () {
            let result = []
            result.push({'st_name': '电站名称', 'start_date': '开始日期', 'end_date': '结束日期', 'before_clean_mark': '清洗前一周平均清洁指数(％)', 'after_clean_mark': '清洗后一周平均清洁指数(％)'})
            let data = this.queryPvStationCleanSeList.res.body
            data.map(v => {
                result.push({'st_name': v.st_name, 'start_date': v.start_date, 'end_date': v.end_date, 'before_clean_mark': v.before_clean_mark, 'after_clean_mark': v.after_clean_mark})
            })
            const blob = jsonToCsv(result)
            return downloadBlob(blob, '清洗记录.csv')
        }
    },
    created () {
        this.$bus.on('changeDateAshEmit', this.dateChange)
        this.$bus.on('stationChange', this.stationChange)
    },
    beforeDestroy () {
        this.$bus.off('changeDateAshEmit', this.dateChange)
        this.$bus.off('stationChange', this.stationChange)
    }
}
</script>

<style lang="scss" scoped>
@import '../theme/theme.scss';
.ash-block-b {
    height: 100%;
    padding:10px;
    @include page_c(color, $pageHeadSectionWordColor);
}
</style>
<style lang="scss">
[data-pagetheme="dark"] {
    .ash-block-b{
        @import '@comm/assets/themes/table/pageTheme/table_dark1.scss';
    }
}
.ash-block-b{
    position: relative;
    .el-icon-folder-opened{
        position:absolute;
        z-index: 2;
        right: 10px;
        cursor: pointer;
        font-size:24px;
        color:#31d3c9;
    }
    .el-table th {
        padding: 3px 0;
        font-size:12px;
    }
    .el-table td {
        padding: 4px 0;
    }
}
</style>
