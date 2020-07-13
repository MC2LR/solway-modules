<template>
    <div class="henanMonitoring-devicelist-status" v-if="getRunStatusInfoList.res.body && getRunStatusInfoList.res.body.deviceStatusList[0]">
        <el-badge :value="deviceType === '1' ? getRunStatusInfoList.res.body.deviceStatusList[0].strboxCount : deviceType === '2' ? getRunStatusInfoList.res.body.deviceStatusList[0].invCount : deviceType === '3' ? getRunStatusInfoList.res.body.deviceStatusList[0].boxtranCount : getRunStatusInfoList.res.body.deviceStatusList[0].meterCount" class="item">
            <el-checkbox v-model="checkAll" @change="handleCheckAllChange" class="custom_dark1">全选
                <!-- <span class="alarm-num" v-if="deviceType === '1'">{{getRunStatusInfoList.res.body.deviceStatusList[0].strboxCount}}</span>
                <span class="alarm-num" v-if="deviceType === '2'">{{getRunStatusInfoList.res.body.deviceStatusList[0].invCount}}</span>
                <span class="alarm-num" v-if="deviceType === '3'">{{getRunStatusInfoList.res.body.deviceStatusList[0].boxtranCount}}</span>
                <span class="alarm-num" v-if="deviceType === '4'">{{getRunStatusInfoList.res.body.deviceStatusList[0].meterCount}}</span> -->
            </el-checkbox>
        </el-badge>
        <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
            <el-badge v-for="(st, index) in statusArr" :key="st.val" :value="numMap(deviceType, index)" class="item">
                <el-checkbox :label="st.val" class="custom_dark1">{{st.name}}
                </el-checkbox>
            </el-badge>
            <!-- <el-checkbox v-for="(st, index) in statusArr" :label="st.val" :key="st.val" class="custom_dark1">{{st.name}}
                <span class="alarm-num" v-if="deviceType === '1'">{{getRunStatusInfoList.res.body.deviceStatusList[0][['strboxRunCount', 'strboxStandbyCount', 'strboxFaultCount', 'strboxAlarmCount', 'strboxBreakOffCount'][index]]}}</span>
                <span class="alarm-num" v-if="deviceType === '2'">{{getRunStatusInfoList.res.body.deviceStatusList[0][['invRunCount', 'invStandbyCount', 'invFaultCount', 'invAlarmCount', 'invBreakOffCount'][index]]}}</span>
                <span class="alarm-num" v-if="deviceType === '3'">{{getRunStatusInfoList.res.body.deviceStatusList[0][['boxtranRunCount', 'boxtranStandbyCount', 'boxtranFaultCount', 'boxtranAlarmCount', 'boxtranBreakOffCount'][index]]}}</span>
                <span class="alarm-num" v-if="deviceType === '4'">{{getRunStatusInfoList.res.body.deviceStatusList[0][['meterRunCount', 'meterStandbyCount', 'meterFaultCount', 'meterAlarmCount', 'meterBreakOffCount'][index]]}}</span>
            </el-checkbox> -->
        </el-checkbox-group>
        <el-checkbox class="shadowCheckbox custom_dark1" v-if="deviceType === '1' || deviceType === '2'" v-model="checkShadow" @change="handleShadowChange">阴影遮挡</el-checkbox>
    </div>
</template>

<script>
import {api＿getRunStatusInfoList} from '@newEnergyCloud/request/api'
export default {
    props: {
        deviceType: {}
    },
    data () {
        return {
            statusArr: [{name: '正常', val: '01'}, {name: '待机', val: '07'}, {name: '故障', val: '02'}, {name: '报警', val: '03'}, {name: '中断', val: '04'}],
            checkAll: false,
            checkedStatus: [],
            checkShadow: false,
            intervalStatus: null,
            getRunStatusInfoList: api＿getRunStatusInfoList({
                later: true,
                res: {body: {deviceStatusList: []}}
            })
        }
    },
    created () {
        this.runStationNum()
        this.$bus.on('stationChange', this.runStationNum)
    },
    mounted () {
        this.checkAll = true
        this.checkedStatus = this.statusArr.map(v => v.val)
        this.emitStatusData('00')
        this.intervalStatus = setInterval(() => {
            this.runStationNum()
        }, this.$store.getters.refresh_interval())
    },
    beforeDestroy () {
        clearInterval(this.intervalStatus)
        this.$bus.off('stationChange', this.runStationNum)
    },
    methods: {
        numMap (deviceType, index) {
            if (deviceType === '1') {
                return this.getRunStatusInfoList.res.body.deviceStatusList[0][['strboxRunCount', 'strboxStandbyCount', 'strboxFaultCount', 'strboxAlarmCount', 'strboxBreakOffCount'][index]]
            } else if (deviceType === '2') {
                return this.getRunStatusInfoList.res.body.deviceStatusList[0][['invRunCount', 'invStandbyCount', 'invFaultCount', 'invAlarmCount', 'invBreakOffCount'][index]]
            } else if (deviceType === '3') {
                return this.getRunStatusInfoList.res.body.deviceStatusList[0][['boxtranRunCount', 'boxtranStandbyCount', 'boxtranFaultCount', 'boxtranAlarmCount', 'boxtranBreakOffCount'][index]]
            } else if (deviceType === '4') {
                return this.getRunStatusInfoList.res.body.deviceStatusList[0][['meterRunCount', 'meterStandbyCount', 'meterFaultCount', 'meterAlarmCount', 'meterBreakOffCount'][index]]
            }
        },
        // 全选
        handleCheckAllChange (val) {
            this.checkedStatus = val ? this.statusArr.map(v => v.val) : []
            this.checkShadow = false
            if (this.checkAll) {
                this.emitStatusData('00')
            } else {
                this.emitStatusData('')
            }
        },
        // 其他状态
        handleCheckedStatusChange (value) {
            let checkedCount = value.length
            this.checkAll = checkedCount === this.statusArr.length
            this.checkShadow = false
            if (checkedCount) {
                if (this.checkAll) this.emitStatusData('00')
                else this.emitStatusData(this.checkedStatus.join(','))
            } else {
                this.emitStatusData('')
            }
        },
        // 阴影
        handleShadowChange () {
            if (this.checkShadow) {
                this.checkAll = false
                this.checkedStatus = []
                this.emitStatusData('05')
            } else {
                this.emitStatusData('')
            }
        },
        emitStatusData (val) {
            this.$bus.$emit('status', val)
        },
        runStationNum () {
            this.getRunStatusInfoList.getData({
                queryType: 3,
                dateType: 3,
                date: new Date().Format('yyyy-MM-dd')
            })
        }
    }
}
</script>

<style lang="scss">
.henanMonitoring-devicelist-status {
    @import '@comm/assets/themes/checkbox/checkbox_custom_dark1.scss';
    .el-checkbox {
        margin-right: 35px;
    }
    .el-badge {
        vertical-align: baseline;
    }
    .el-badge__content {
        border: none;
        padding: 0 5px;
    }
    .el-badge__content.is-fixed {
        right: 33px;
        top: 10px;
    }
}
</style>

<style lang="scss" scoped>
.henanMonitoring-devicelist-status {
    display: inline-block;

    .el-checkbox-group {
        display: inline-block;
    }

    .shadowCheckbox {
        margin-left: 10px;
    }
    .alarm-num {
        position: relative;
        top: -13px;
        right: 4px;
        background: #ff7171;
        color: white;
        border-radius: 20px;
        padding: 3px;
        font-size: 12px;
    }
}
</style>
