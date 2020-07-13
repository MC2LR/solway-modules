<template>
    <div class="device-table" @click.stop>
        <i class="export el-icon-folder-opened" style="color: #59ccd6;font-size: 20px" title="导出" @click="exportCsv"></i>
        <el-table
            ref='defaultTable'
            highlight-current-row
            @current-change="handleCurrentChange"
            :data="pvAnalyzeGetShadowDeviceList.res.body"
            v-loading="pvAnalyzeGetShadowDeviceList.loading"
            style="width: 100%"
            height="100%"
            :row-style="{'cursor': 'pointer'}"
            header-row-class-name="header-row-style"
            header-cell-class-name="header-cell-style"
            row-class-name="row-style">
            <el-table-column
                prop="eq_name"
                :label="deviceLabelName"
                width="180"
                sortable>
            </el-table-column>
            <el-table-column
                prop="shade_count"
                label="阴影组串数(个)"
                sortable>
            </el-table-column>
            <el-table-column
                prop="shade_str_r"
                label="阴影组串占比(%)"
                sortable>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { api＿pvAnalyzeGetShadowDeviceList, api＿pvwpDeviceStExcel, api＿getDeviceInvJb } from '@newEnergyCloud/request/api'
import {download} from '@comm/request/http'
import theme from './theme/theme'

export default {
    mixins: [theme],
    data () {
        return {
            currentRow: {},
            date: [new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd'), new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd')],
            deviceLabelName: '设备',
            pvAnalyzeGetShadowDeviceList: api＿pvAnalyzeGetShadowDeviceList({
                later: true,
                params: { eqId: null },
                res: {
                    body: []
                }
            }),
            getDeviceInvJb: api＿getDeviceInvJb({later: true})
        }
    },
    created () {
        this.$bus.on('stationChange', this.stationChange)
        this.$bus.on('dateChange', this.dateChange)
        this.$bus.on('clickBarId', this.getClickBarId)
        this.$bus.on('clickEditBlock', this.getClickBarId)
        this.$bus.on('initShadowAnalysis', this.initShadowAnalysis)
        this.stId = this.$store.getters.station_id
        this.getDeviceInvJb.subscribe(res => {
            this.deviceLabelName = res.body.jb === 1 ? '逆变器名称' : '汇流箱名称' // 1小逆  0非小逆
        })
        this.stationChange()
    },
    methods: {
        judgeDeviceType () {
            this.getDeviceInvJb.getData({stid: this.stId})
        },
        stationChange (data) {
            this.stId = data ? data.id : this.$store.getters.station_id
            this.judgeDeviceType()
            this.getList()
        },
        dateChange (date) {
            this.date = date
            this.getList()
        },
        getClickBarId (data) {
            this.pvAnalyzeGetShadowDeviceList.params.eqId = data
            this.getList()
        },
        initShadowAnalysis () {
            if (!this.pvAnalyzeGetShadowDeviceList.params.eqId) return
            this.pvAnalyzeGetShadowDeviceList.params.eqId = null
            this.getList()
        },
        handleCurrentChange (val) {
            this.currentRow = val
            this.$bus.emit('dtClickChange', val)
        },
        getList () {
            this.pvAnalyzeGetShadowDeviceList.getData({
                startDate: this.date[0],
                endDate: this.date[1]
            }).then(res => {
                this.$refs.defaultTable && this.$refs.defaultTable.setCurrentRow(res.body[0])
                if (!res.body.length) {
                    this.$bus.emit('emptyData')
                }
            })
        },
        exportCsv () {
            let params = 'startDate' + '=' + this.date[0] + '&' + 'endDate' + '=' + this.date[1] + '&' + 'dateType' + '=' + 4 + '&' + 'queryType' + '=' + 3 + '&' + 'busiType' + '=' + 'X0001' + '&' + 'file' + '=' + 'pv_station_device_shadow_analisis_0001.ureport.xml' + '&' + 'name' + '=' + '阴影分析-列表'
            download({
                url: api＿pvwpDeviceStExcel + '?' + params
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.stationChange)
        this.$bus.off('dateChange', this.dateChange)
        this.$bus.off('clickBarId', this.getClickBarId)
        this.$bus.off('clickEditBlock', this.getClickBarId)
        this.$bus.off('initShadowAnalysis', this.initShadowAnalysis)
    }
}
</script>

<style lang="scss">
[data-pagetheme="dark"] {
    .device-table{
        @import '@comm/assets/themes/table/pageTheme/table_dark1.scss';
        .el-table th.is-leaf, .el-table td {
            border-bottom: 1px solid black;
        }
    }
}
[data-pagetheme="light"] {
    .device-table{
        @import '@comm/assets/themes/table/t5.scss';
    }
}
.device-table {
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
    }
}
</style>

<style lang="scss" scoped>
@import './theme/theme.scss';
.device-table {
    width: 100%;
    height: 48%;
    @include page_c(background-color, $blockBgColor);
    @include page_c(border-color, $blockBorderColor);
    margin-bottom: 10px;
    position: relative;
    .export {
        display: block;
        float: right;
        margin-right: 10px;
        margin-top: 5px;
        position: absolute;
        z-index: 2;
        right: 10px;
    }
}
</style>
