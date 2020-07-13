<template>
    <div class="devicelist-status" v-if="getRunStatusInfoList.res.body.deviceStatusList[0]">
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">
            <span :style="{'color': theme.$pageStatusNameColor}">全选</span>
            <span class="alarm-num" v-if="deviceType === '1'">{{getRunStatusInfoList.res.body.deviceStatusList[0].strboxCount}}</span>
            <span class="alarm-num" v-if="deviceType === '2'">{{getRunStatusInfoList.res.body.deviceStatusList[0].invCount}}</span>
            <span class="alarm-num" v-if="deviceType === '3'">{{getRunStatusInfoList.res.body.deviceStatusList[0].boxtranCount}}</span>
            <span class="alarm-num" v-if="deviceType === '4'">{{getRunStatusInfoList.res.body.deviceStatusList[0].meterCount}}</span>
        </el-checkbox>
        <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
            <el-checkbox v-for="(st, index) in statusArr" :label="st.val" :key="st.val">
                <span :style="{'color': theme.$pageStatusNameColor}">{{st.name}}</span>
                <span class="alarm-num" v-if="deviceType === '1'">{{getRunStatusInfoList.res.body.deviceStatusList[0][['strboxRunCount', 'strboxStandbyCount', 'strboxFaultCount', 'strboxAlarmCount', 'strboxBreakOffCount'][index]]}}</span>
                <span class="alarm-num" v-if="deviceType === '2'">{{getRunStatusInfoList.res.body.deviceStatusList[0][['invRunCount', 'invStandbyCount', 'invFaultCount', 'invAlarmCount', 'invBreakOffCount'][index]]}}</span>
                <span class="alarm-num" v-if="deviceType === '3'">{{getRunStatusInfoList.res.body.deviceStatusList[0][['boxtranRunCount', 'boxtranStandbyCount', 'boxtranFaultCount', 'boxtranAlarmCount', 'boxtranBreakOffCount'][index]]}}</span>
                <span class="alarm-num" v-if="deviceType === '4'">{{getRunStatusInfoList.res.body.deviceStatusList[0][['meterRunCount', 'meterStandbyCount', 'meterFaultCount', 'meterAlarmCount', 'meterBreakOffCount'][index]]}}</span>
            </el-checkbox>
        </el-checkbox-group>
        <el-checkbox class="shadowCheckbox" v-if="deviceType === '1' || deviceType === '2'" v-model="checkShadow" @change="handleShadowChange"><span :style="{'color': theme.$pageStatusNameColor}">阴影遮挡</span></el-checkbox>
    </div>
</template>

<script>
import {api＿getRunStatusInfoList} from '@newEnergyCloud/request/api'
import theme from '../theme/theme'
export default {
    mixins: [theme],
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
    methods: {
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
    }
}
</script>

<style lang="scss" scoped>
.devicelist-status {
    display: inline-block;

    .el-checkbox-group {
        display: inline-block;
    }

    .shadowCheckbox {
        margin-left: 30px;
    }
    .alarm-num{
        position: relative;
        top: -19px;
        right: 8px;
        background: #ff7171;
        color: white;
        border-radius: 20px;
        padding: 3px;
        font-size: 12px;
    }
}
</style>
