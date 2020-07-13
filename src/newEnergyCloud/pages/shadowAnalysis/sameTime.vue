<template>
    <div class="same-time">
        <p style="height:40px;">
            <span>设备总数：{{deviceTotalNum}}</span>
            <i class="export el-icon-folder-opened" style="color: #59ccd6;font-size: 20px" title="导出" @click="exportCsv"></i>
        </p>
        <el-table
            :data="pvAnalysisGetInvShadeAtSameTime.res.body"
            v-loading="pvAnalysisGetInvShadeAtSameTime.loading"
            style="width: 100%">
            <el-table-column
                prop="eq_name"
                label="设备名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="stringid"
                label="组串名">
            </el-table-column>
            <el-table-column
                prop="shadowtime"
                label="阴影时段"
                :formatter="(row, column, cellValue, index) => row.property === 'SpecialFault' || row.property === 'AlwaysShadow' ? '持续' : cellValue">
            </el-table-column>
            <el-table-column
                prop="shade_hours"
                label="阴影时长(h)"
                :formatter="(row, column, cellValue, index) => row.property === 'SpecialFault' || row.property === 'AlwaysShadow' ? '全天' : cellValue">
            </el-table-column>
            <el-table-column
                prop="streduce"
                label="电流偏差率(%)"
                :formatter="(row, column, cellValue, index) => cellValue ? parseFloat((cellValue * 100).toFixed(2)) : ''">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { api＿pvAnalysisGetInvShadeAtSameTime } from '@newEnergyCloud/request/api'
import { downloadBlob, jsonToCsv } from '@comm/tools'

export default {
    data () {
        return {
            groupStringDetail: {},
            date: new Date(Date.now() - 86400000),
            deviceTotalNum: '',
            pvAnalysisGetInvShadeAtSameTime: api＿pvAnalysisGetInvShadeAtSameTime({
                later: true,
                res: {
                    body: []
                }
            })
        }
    },
    created () {
        this.$bus.on('opensameTime', this.opened)
        this.pvAnalysisGetInvShadeAtSameTime.subscribe(data => {
            let device = []
            data.body.map(v => {
                if (!device.includes(v.eqid)) device.push(v.eqid)
            })
            if (device.length) this.deviceTotalNum = device.length
        })
    },
    methods: {
        dateChange (date) {
            this.$bus.emit('singleDateChange', new Date(date).Format('yyyy-MM-dd'))
        },
        exportCsv () {
            let result = []
            result.push({'eq_name': '设备名称', 'stringid': '组串名', 'shadowtime': '阴影时段', 'shade_hours': '阴影时长（h）', 'streduce': '电流偏差率(％)'})
            let data = this.pvAnalysisGetInvShadeAtSameTime.res.body
            data.map(v => {
                result.push({'eq_name': v.eq_name, 'stringid': v.stringid, 'shadowtime': (v.property === 'SpecialFault' || v.property === 'AlwaysShadow') ? '持续' : v.shadowtime, 'shade_hours': (v.property === 'SpecialFault' || v.property === 'AlwaysShadow') ? '全天' : v.shade_hours, 'streduce': v.streduce})
            })
            const blob = jsonToCsv(result)
            return downloadBlob(blob, '设备同时段对比.csv')
        },
        opened (data) {
            this.groupStringDetail = data
            this.pvAnalysisGetInvShadeAtSameTime.getData({
                queryType: 3,
                dateType: 3,
                eqid: this.groupStringDetail.eqid,
                endDate: this.groupStringDetail.date[1],
                shadowtime: this.groupStringDetail.shadowtime
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('opensameTime', this.opened)
    }
}
</script>

<style lang="scss" scoped>
.same-time {
    height: 100%;
    .device-num-line{
        margin: 0px 0 10px 10px;
        font-size: 16px;
    }
    .el-icon-folder-opened{
        color: #59ccd6;
        font-size: 24px;
        position: absolute;
        right: 50px;
        cursor: pointer;
    }
}
</style>
