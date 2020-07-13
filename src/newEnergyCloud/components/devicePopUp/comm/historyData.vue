<template>
    <div class="history-data" v-loading="this[this.historyApi].loading">
        <div class="header">
            <el-date-picker
                class="date-range"
                size="small"
                v-model="dateRange[0]"
                @change="dateHandleChange"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                :picker-options="{
                    disabledDate: time => {
                        return time > Date.now()
                    }
                }"
                :clearable="false">
            </el-date-picker>
            <span>至&nbsp;&nbsp;&nbsp;</span>
            <el-date-picker
                class="date-range"
                size="small"
                v-model="dateRange[1]"
                @change="dateHandleChange"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                :picker-options="{
                    disabledDate: time => {
                        return time > Date.now()
                    }
                }"
                :clearable="false">
            </el-date-picker>
            <el-button type="primary" size="small" :loading="downloading" @click="() => dateHandleChange()">查询</el-button>
            <el-button type="primary" size="small" :loading="downloading" @click="exportList">导出</el-button>
        </div>
        <el-table
            v-if="this[this.historyApi].res.body.data"
            border
            :data="this[this.historyApi].res.body.data"
            :max-height="vh - 230"
            row-class-name="row-style"
            cell-class-name="cell-style"
            header-row-class-name="header-row-style"
            header-cell-class-name="header-cell-style"
            style="width: 100%">
            <el-table-column type="index" width="50" :index="i => (this[this.historyApi].res.body.pageIndex - 1) * this[this.historyApi].res.body.pageSize + i + 1" fixed></el-table-column>
            <slot>
                <el-table-column prop="dtime" label="时间" align="center" width="160" fixed :formatter="(row, column, cellValue, index) => cellValue ? (new Date(cellValue*1000).Format('yyyy-MM-dd hh:mm:ss')) : '-'"></el-table-column>
            </slot>
        </el-table>
        <div class="footer" v-if="this[this.historyApi].res.body.totalPage">
            <solway-pagination
                :elOptions="{layout: 'sizes, prev, pager, next'}"
                :page-index="this[this.historyApi].res.body.pageIndex"
                :page-size="this[this.historyApi].res.body.pageSize"
                :total="this[this.historyApi].res.body.totalPage * this[this.historyApi].res.body.pageSize"
                :firstPageIndex="1"
                @change="data => this[this.historyApi].getData(data)">
            </solway-pagination>
        </div>
    </div>
</template>

<script>
import {api＿deviceHistoryData, api＿wpDeviceHistoryData, baseApi} from '@newEnergyCloud/request/api'
import solwayPagination from '@newEnergyCloud/components/pagination'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import {download} from '@comm/request/http'
export default {
    mixins: [mixinWidthHeight],
    components: {
        solwayPagination
    },
    props: {
        device: {
            type: Object
        }
    },
    data () {
        const enddate = new Date()
        const begindate = new Date(enddate.getTime() - 86400 * 1000)
        return {
            downloading: false,
            dateRange: [begindate, enddate],
            deviceHistoryData: api＿deviceHistoryData({
                later: true,
                onlyLatest: true,
                res: {
                    body: {
                        data: []
                    }
                }
            }),
            wpDeviceHistoryData: api＿wpDeviceHistoryData({
                later: true,
                onlyLatest: true,
                res: {
                    body: {
                        data: []
                    }
                }
            })
        }
    },
    computed: {
        historyApi () {
            return {'01': 'deviceHistoryData', '02': 'wpDeviceHistoryData'}[this.$store.getters.station_class]
        }
    },
    created () {
        this.getData()
    },
    methods: {
        getData () {
            const {stid, sn, id, type} = this.device
            const enddate = new Date()
            const begindate = new Date(enddate.getTime() - 86400 * 1000)
            this[this.historyApi].getData({
                pageIndex: 1,
                pageSize: 10,
                devicetype: type,
                begindate: begindate.Format('yyyy-MM-dd hh:mm'),
                enddate: enddate.Format('yyyy-MM-dd hh:mm'),
                stationid: stid,
                serialnumber: sn,
                id
            })
        },
        dateHandleChange () {
            if (this.dateRange[1] < this.dateRange[0]) {
                return this.$message('结束时间不能早于开始时间')
            }
            if (Math.abs(this.dateRange[1].getTime() - this.dateRange[0].getTime()) > 86400000 * 7) {
                return this.$message('历史数据查询，不能超过7天')
            }
            this[this.historyApi].getData({
                begindate: this.dateRange[0].Format('yyyy-MM-dd hh:mm'),
                enddate: this.dateRange[1].Format('yyyy-MM-dd hh:mm')
            })
        },
        exportList () {
            if (this.downloading) return
            const {stid, sn, type} = this.device
            this.downloading = true
            const self = this
            const begindate = this.dateRange[0].Format('yyyy-MM-dd hh:mm')
            const enddate = this.dateRange[1].Format('yyyy-MM-dd hh:mm')
            download({
                // url: baseApi + (this.$store.getters.station_class === '01' ? '/HistoryData/exportHsData.htm' : '/pvwp/device/exportDeviceHisData.htm'),
                // params: this.$store.getters.station_class === '01' ? {
                //     stationid: stid,
                //     serialnumber: sn,
                //     devicetype: type,
                //     begindate,
                //     enddate
                // } : {
                //     stid: stid,
                //     eqid: sn,
                //     deviceType: type,
                //     beginDate: begindate,
                //     endDate: enddate
                // },
                url: baseApi + '/pvwp/device/exportDeviceHisData.htm',
                params: {
                    stid: stid,
                    eqid: sn,
                    deviceType: type,
                    beginDate: begindate,
                    endDate: enddate
                },
                firstName: begindate + '至' + enddate,
                callback () {
                    self.downloading = false
                }
            })
        }
    }
}
</script>

<style lang="scss">
.history-data {
    @import '@comm/assets/themes/table/t3.scss';
    .el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange {
        border: none;

        i {
            display: none;
        }

        .el-range-input {
            @include c(color, $text_c1);
        }

        .el-range-separator {
            width: 10%;
        }
    }
}
</style>

<style lang="scss" scoped>
.history-data {
    padding: 0 42px;
    padding-bottom: 20px;

    .header {
        padding: 10px 0;

        .date-range {
            width: 190px;
            margin-right: 1em;
        }
    }

    .footer {
        padding-top: 5px;
    }
}
</style>
