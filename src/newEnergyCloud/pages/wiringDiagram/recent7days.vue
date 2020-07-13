<template>
    <div class="recent-days">
       <div>
            <el-input placeholder="请输入指标、事件描述" v-model="keyword" class="input-with-select" style="width:300px;margin-right:15px;" @keydown.enter.native="getLatestInfoData()">
            </el-input>
            <el-date-picker
                v-model="beginTime"
                type="datetime"
                @change="chooseDate('start')"
                placeholder="选择开始时间">
            </el-date-picker>
            至
            <el-date-picker
                v-model="endTime"
                @change="chooseDate('end')"
                type="datetime"
                placeholder="选择结束时间">
            </el-date-picker>
            <el-button type="primary" @click="getLatestInfoData()">查询</el-button>
        </div>
        <div style="margin-top:10px;">
            <el-table
                :data="rtmDeviceLogWiringdiagram.res.body.data"
                v-loading="rtmDeviceLogWiringdiagram.loading"
                border
                :row-style="{'cursor': 'pointer'}"
                :height="vh - 240"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column
                    type="index"
                    align="center"
                    label="序号"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="stime"
                    width="160px"
                    :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd hh:mm:ss') : ''"
                    label="发生时间">
                </el-table-column>
                <el-table-column
                    prop="pointName"
                    width="260px"
                    label="指标">
                </el-table-column>
                <el-table-column
                    prop="eventDesc"
                    label="事件描述">
                </el-table-column>
            </el-table>
        </div>
        <div style="text-align:center;padding:10px;">
            <solway-pagination
                :page-index="rtmDeviceLogWiringdiagram.res.body.pageIndex"
                :page-size="rtmDeviceLogWiringdiagram.res.body.pageSize"
                :total="rtmDeviceLogWiringdiagram.res.body.total"
                @change="data => rtmDeviceLogWiringdiagram.getData(data)">
            </solway-pagination>
        </div>
    </div>
</template>

<script>
import { api＿rtmDeviceLogWiringdiagram } from '@newEnergyCloud/request/api'
import {Table, TableColumn, Input, Button, Message} from 'element-ui'
import solwayPagination from '@/components/pagination'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
    props: {
        currentDeviceIds: {},
        stid: {}
    },
    data () {
        return {
            keyword: null,
            beginTime: new Date(new Date(Date.now() - 86400000 * 6)),
            endTime: new Date(new Date(Date.now())),
            rtmDeviceLogWiringdiagram: api＿rtmDeviceLogWiringdiagram({
                later: true,
                res: {
                    body: {
                        data: []
                    }
                }
            })
        }
    },
    created () {
        this.$bus.on('emitLatestday', this.getLatestInfoData)
    },
    methods: {
        getLatestInfoData () {
            this.chooseDate('end')
            if (this.currentDeviceIds && this.stid) {
                this.rtmDeviceLogWiringdiagram.getData({eqids: this.currentDeviceIds, stid: this.stid, beginTime: this.beginTime.Format('yyyy-MM-dd hh:mm'), endTime: this.endTime.Format('yyyy-MM-dd hh:mm'), keywords: this.keyword})
            } else {
                this.rtmDeviceLogWiringdiagram.res = {
                    body: {
                        data: []
                    }
                }
            }
        },
        // 校验时间
        chooseDate (type) {
            let startTime = new Date(this.beginTime).getTime()
            let endTime = new Date(this.endTime).getTime()
            if (type === 'end') {
                if (endTime < startTime) {
                    Message.error('结束时间不能小于开始时间')
                    this.endTime = new Date(startTime + 86400000)
                    return false
                }
                if (endTime > startTime + 86400000 * 6) {
                    Message.error('不能超过7天')
                    this.endTime = new Date(startTime + 86400000 * 6)
                    return false
                }
            }
        }
    },
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElInput: Input,
        ElButton: Button,
        solwayPagination
    },
    beforeDestroy () {
        this.$bus.off('emitLatestday', this.getLatestInfoData)
    }
}
</script>

<style lang="scss">
[data-pagetheme="dark"] {
    .recent-days{
        @import '@comm/assets/themes/table/pageTheme/table_dark1.scss';
        @import '@comm/assets/themes/pagination/pageTheme/pagination_dark1.scss';
        @import '@comm/assets/themes/input/pageTheme/input_dark1.scss';
    }
}
</style>
<style lang="scss" scoped>
.recent-days {
    height: 100%;
    padding:10px;
}
</style>
