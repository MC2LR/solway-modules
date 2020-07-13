<template>
<div class="device-fault-table-con">
    <div class="head">
        <span class="title">故障记录</span>
        <el-select
            multiple collapse-tags clearable
            v-model="pvAnalyzeDeviceFaultLog.params.deviceId"
            class="legendSelect"
            placeholder="请选择"
            @change="getFaultList()"
            >
                <el-option
                v-for="item in getDeviceByStIdsAndDeviceType.res.body"
                :key="item.deviceSerialNnumber"
                :label="item.deviceName"
                :value="item.deviceSerialNnumber">
                </el-option>
        </el-select>
        <!-- <el-button type="primary" class="export" @click="exportCsv">导出</el-button> -->
        <i class="export el-icon-folder-opened" style="color: #59ccd6;font-size: 20px" title="导出" @click="exportCsv"></i>
    </div>
    <el-table
        ref='defaultTable'
        highlight-current-row
        @current-change="handleCurrentChange"
        :data="pvAnalyzeDeviceFaultLog.res.body"
        v-loading="pvAnalyzeDeviceFaultLog.loading"
        style="width: 100%"
        height="calc(100% - 43px)"
        :row-style="{'cursor': 'pointer'}"
        row-class-name="row-style"
        cell-class-name="cell-style"
        header-row-class-name="header-row-style"
        header-cell-class-name="header-cell-style">
        <el-table-column
            prop="sStartTime"
            label="发生时间"
            width="170"
            :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd hh:mm:ss') : ''">
        </el-table-column>
        <el-table-column
            prop="sEndTime"
            label="消缺时间"
            width="170"
            :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd hh:mm:ss') : ''">
        </el-table-column>
        <el-table-column
            prop="deviceName"
            label="设备名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="faultDesc"
            label="故障事件"
            width="180">
        </el-table-column>
        <el-table-column
            prop="loss_power"
            label="损失电量(kWh)"
            width="140"
            :formatter="(row, column, cellValue, index) => cellValue ? cellValue.toFixed(2) : 0">
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import { api＿getDeviceByStIdsAndDeviceType, api＿pvAnalyzeDeviceFaultLog } from '@newEnergyCloud/request/api'
import { downloadBlob, jsonToCsv } from '@comm/tools'
import theme from './theme/theme'
export default {
    mixins: [theme],
    data () {
        return {
            isFirst: true,
            currentRow: {},
            date: [new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd'), new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd')],
            getDeviceByStIdsAndDeviceType: api＿getDeviceByStIdsAndDeviceType({
                later: true,
                res: {
                    body: []
                }
            }),
            pvAnalyzeDeviceFaultLog: api＿pvAnalyzeDeviceFaultLog({
                later: true,
                onlyLatest: true,
                res: {
                    body: []
                },
                beforeSend (params) {
                    if (params.deviceId && params.deviceId.length) params.deviceId = params.deviceId.join()
                    return params
                }
            })
        }
    },
    created () {
        this.$bus.on('stationChange', this.stationChange)
        this.$bus.on('dateChange', this.dateChange)
        this.$bus.on('clickBarName', this.getClickBarName)
        this.stId = this.$store.getters.station_id
        this.stationChange()
    },
    methods: {
        stationChange (data) {
            this.stId = data ? data.id : this.$store.getters.station_id
            this.getDevice()
        },
        dateChange (date) {
            this.date = date
            this.getFaultList()
        },
        getClickBarName (data) {
            this.pvAnalyzeDeviceFaultLog.params.deviceId = []
            this.getDeviceByStIdsAndDeviceType.res.body.forEach(v => {
                if (v.deviceName === data) this.pvAnalyzeDeviceFaultLog.params.deviceId[0] = v.deviceSerialNnumber
            })
            this.getFaultList()
        },
        handleCurrentChange (val) {
            this.currentRow = val
            this.$bus.emit('tableClickChange', val)
        },
        getDevice () {
            this.getDeviceByStIdsAndDeviceType.getData({
                stClass: '01',
                deviceTypes: '02',
                stIds: this.stId
            }).then(res => {
                this.pvAnalyzeDeviceFaultLog.params.deviceId[0] = res.body[0].deviceSerialNnumber
                this.getFaultList()
            })
        },
        getFaultList () {
            // if (this.isFirst && !this.pvAnalyzeDeviceFaultLog.params.deviceId[0]) return
            this.isFirst = false
            this.pvAnalyzeDeviceFaultLog.getData({
                startDate: this.date[0],
                endDate: this.date[1],
                stId: this.stId
            }).then(res => {
                this.$refs.defaultTable && this.$refs.defaultTable.setCurrentRow(res.body[0])
                if (!res.body.length) {
                    let data = {
                        chart: [],
                        device_fail_percent: 0,
                        fault_percent: 0
                    }
                    this.$bus.emit('emptyData', data)
                }
            })
        },
        exportCsv () {
            let result = JSON.parse(JSON.stringify(this.pvAnalyzeDeviceFaultLog.res.body))
            result = result.map(v => {
                v.loss_power = v.loss_power ? v.loss_power.toFixed(2) : ''
                v.sStartTime = v.sStartTime ? new Date(v.sStartTime).Format('yyyy-MM-dd hh:mm:ss') : ''
                v.sEndTime = v.sEndTime ? new Date(v.sEndTime).Format('yyyy-MM-dd hh:mm:ss') : ''
                // delete v.eqid
                // delete v.property
                // delete v.eq_name
                return v
            })
            result.unshift({'sStartTime': '发生时间', 'sEndTime': '消缺时间', 'deviceName': '设备名称', 'faultDesc': '故障事件', 'loss_power': '损失电量(kWh)'})
            const blob = jsonToCsv(result)
            return downloadBlob(blob, '设备故障记录' + '.csv')
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.stationChange)
        this.$bus.off('dateChange', this.dateChange)
        this.$bus.off('clickBarName', this.getClickBarName)
    }
}
</script>

<style lang="scss">
[data-pagetheme="dark"] {
    .device-fault-table-con{
        @import '@comm/assets/themes/table/pageTheme/table_dark1.scss';
        .el-select .el-tag {
            background-color: #2FBFCB;
            color: #fff;
        }
    }
}
[data-pagetheme="light"] {
    .device-fault-table-con {
        @import '@comm/assets/themes/table/t5.scss';
    }
}
.device-fault-table-con {
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
</style>

<style lang="scss" scoped>
@import './theme/theme.scss';
.device-fault-table-con {
    width: 100%;
    height: 100%;
    @include page_c(background-color, $blockBgColor);
    padding-left: 10px;
    padding-top: 10px;
    .head {
        margin-bottom: 10px;
        .title {
            @include page_c(color, $blockLableColor);
            font-size: 16px;
        }
        .export {
            display: block;
            cursor: pointer;
            height: 100%;
            float: right;
            margin-right: 10px;
        }
    }

    .legendSelect {
        width: 200px;
        margin-left: 20px;
        .el-input__inner {
            border: 1px solid #efefef;
            padding-right: 0px;
            padding-left: 10px;
            font-size: 15px;
            color: #606369;
        }
        .el-input__suffix {
            right: 5px;
        }
    }
}
</style>
