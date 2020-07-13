<template>
    <div class="group-string-table" @click.stop>
        <el-table
            ref='defaultTable'
            :data="queryPvStringShadowSeList.res.body"
            v-loading="queryPvStringShadowSeList.loading"
            style="width: 100%"
            height="100%"
            :row-style="{'cursor': 'pointer'}"
            header-row-class-name="header-row-style"
            header-cell-class-name="header-cell-style"
            row-class-name="row-style">
            <el-table-column
                prop="stringid"
                label="组串"
                width="60">
            </el-table-column>
            <el-table-column
                sortable
                prop="shadowtime"
                label="阴影时段"
                width="150"
                :formatter="(row, column, cellValue, index) => row.property === 'SpecialFault' || row.property === 'AlwaysShadow' ? '持续' : cellValue">
            </el-table-column>
            <el-table-column
                width="120"
                sortable
                prop="shade_hours"
                label="阴影时长(h)"
                :formatter="(row, column, cellValue, index) => row.property === 'SpecialFault' || row.property === 'AlwaysShadow' ? '全天' : cellValue">
            </el-table-column>
            <el-table-column
                sortable
                prop="streduce"
                label="电流偏差率(%)"
                width="140"
                :formatter="(row, column, cellValue, index) => cellValue ? parseFloat((cellValue * 100).toFixed(2)) : ''">
            </el-table-column>
            <el-table-column
                label="详情"
                width="48">
                <template slot-scope="scope">
                    <i class="iconfont icon-xiangqing1" title="详情" @click="groupStringDetail.detail = scope.row;groupStringDetail.show = true;"></i>
                </template>
            </el-table-column>
            <el-table-column
                label="同时段"
                width="65">
                <template slot-scope="scope">
                    <!-- <i class="iconfont icon-xiangqing1" title="同时段" @click="sameTimeDetail.detail = scope.row"></i> -->
                    <i class="iconfont icon-xiangqing1" title="同时段" @click="sameTimeDetail.detail = scope.row;sameTimeDetail.show = true;"></i>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            @click.stop
            append-to-body
            custom-class='GroupDetail'
            :visible.sync="groupStringDetail.show"
            width="90%"
            top='3vh'
            @opened="$bus.emit('openGroupDetail', {...groupStringDetail.detail, date: date})"
            @close="delete groupStringDetail.detail">
            <shadow-detail v-if="groupStringDetail.show" @click.stop></shadow-detail>
        </el-dialog>

        <el-dialog
            @click.stop
            append-to-body
            custom-class='sameTimeDetail'
            :visible.sync="sameTimeDetail.show"
            width="90%"
            top='3vh'
            @opened="$bus.emit('opensameTime', {...sameTimeDetail.detail, date: date})"
            @close="delete sameTimeDetail.detail">
            <same-time v-if="sameTimeDetail.show" @click.stop></same-time>
        </el-dialog>
    </div>
</template>

<script>
import { api＿queryPvStringShadowSeList } from '@newEnergyCloud/request/api'
import shadowDetail from './detail/index'
import sameTime from './sameTime'
import { downloadBlob, jsonToCsv } from '@comm/tools'
import theme from './theme/theme'

export default {
    mixins: [theme],
    components: {
        shadowDetail,
        sameTime
    },
    data () {
        return {
            groupStringDetail: {
                show: false
            },
            sameTimeDetail: {
                show: false
            },
            currentRow: {},
            date: [new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd'), new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd')],
            queryPvStringShadowSeList: api＿queryPvStringShadowSeList({
                later: true,
                params: { st_eqid: null },
                res: {
                    body: []
                }
            })
        }
    },
    created () {
        this.$bus.on('dateChange', this.dateChange)
        this.$bus.on('dtClickChange', this.dtClickChange)
        this.$bus.on('emptyData', this.emptyData)
    },
    methods: {
        dateChange (date) {
            this.date = date
        },
        dtClickChange (val) {
            if (!val) return
            this.queryPvStringShadowSeList.params.st_eqid = val.st_eqid
            this.getList()
        },
        emptyData () {
            this.queryPvStringShadowSeList.res.body = []
        },
        getList () {
            this.queryPvStringShadowSeList.getData({
                startDate: this.date[0],
                endDate: this.date[1]
            })
        },
        exportCsv () {
            let result = JSON.parse(JSON.stringify(this.queryPvStringShadowSeList.res.body))
            result = result.map(v => {
                v.streduce = v.streduce ? parseFloat((v.streduce * 100).toFixed(2)) : ''
                v.shade_hours = v.property === 'SpecialFault' || v.property === 'AlwaysShadow' ? '全天' : v.shade_hours
                v.shadowtime = v.property === 'SpecialFault' || v.property === 'AlwaysShadow' ? '持续' : v.shadowtime
                delete v.eqid
                delete v.property
                delete v.eq_name
                return v
            })
            result.unshift({'stringid': '组串', 'shadowtime': '阴影时段', 'streduce': '电流偏差率(%)', 'shade_hours': '阴影时长'})
            const blob = jsonToCsv(result)
            return downloadBlob(blob, '阴影分析-组串列表' + '.csv')
        }
    },
    beforeDestroy () {
        this.$bus.off('dateChange', this.dateChange)
        this.$bus.off('dtClickChange', this.dtClickChange)
        this.$bus.off('emptyData', this.emptyData)
    }
}
</script>

<style lang="scss">
[data-pagetheme="dark"] {
    .group-string-table{
        @import '@comm/assets/themes/table/pageTheme/table_dark1.scss';
        .el-table th.is-leaf, .el-table td {
            border-bottom: 1px solid black;
        }
    }
}
[data-pagetheme="light"] {
    .group-string-table{
        @import '@comm/assets/themes/table/t5.scss';
        .el-table {
            .el-table__empty-block {
                border-right: 1px solid transparent;
                border-bottom: 1px solid transparent;
            }
        }
    }
}
.group-string-table {
    .el-table {
        .el-table__body tr.current-row > td {
            background: #2FBFCC;
            color: #fff;
        }
        th {
            padding: 2px 0;
        }
        td {
            padding: 1px 0;
        }
        .el-table__fixed-right .el-table__fixed-body-wrapper {
            top: 43px;
        }
    }
}

.el-dialog.GroupDetail {
    height: calc(100% - 6vh);
    .el-dialog__header {
        padding: 0;
        width: 0;
        .el-dialog__headerbtn {
            top: -5px;
            right: -27px;
            .el-dialog__close {
                color: #fff;
                font-size: 28px;
            }
        }
    }
    .el-dialog__body {
        height: 100%;
        padding: 15px 20px;
        .shadow-detail {
            text-align: center;
            .date-picker-arrow {
                width: 100%;
                .el-date-editor .el-input__inner {
                    color: #787A7F;
                }
                i.iconfont {
                    width: 22px;
                    height: 54px;
                    line-height: 54px;
                    color: rgba(47,191,204, 1);
                    background:rgba(47,191,204, .2);
                    top: 18.6vh;
                    &.disabled {
                        color: rgba(189,192,197, 1);
                        background:rgba(189,192,197, .2);
                    }
                    &.icon-wangzuo- {
                        left: 15px;
                    }
                    &.icon-wangyou{
                        right: 15px;
                    }
                }
            }
        }
    }
}
</style>

<style lang="scss" scoped>
@import './theme/theme.scss';
.group-string-table {
    width: 100%;
    height: calc(52% - 10px);
    @include page_c(background-color, $blockBgColor);
    .el-table {
        .iconfont.icon-xiangqing1 {
            color: #2FBFCC;
        }
    }
    .export {
        display: block;
        float: right;
        margin-right: 10px;
        margin-top: 5px;
    }
}
</style>
