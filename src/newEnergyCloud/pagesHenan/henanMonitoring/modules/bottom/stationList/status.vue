<template>
    <div class="henanMonitoring-stationList-status" v-if="getRunStatusInfoList.body">
        <el-badge :value="getRunStatusInfoList.body.stCount['99'] || 0" class="item">
            <el-checkbox v-model="checkAll" @change="handleCheckAllChange" class="custom_dark1">全选
            </el-checkbox>
        </el-badge>
        <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
            <el-badge :value="getRunStatusInfoList.body.stCount['0'] || 0" class="item">
                <el-checkbox :label="statusArr[0].val" class="custom_dark1">正常
                </el-checkbox>
            </el-badge>
            <el-badge :value="getRunStatusInfoList.body.stCount['1'] || 0" class="item">
                <el-checkbox :label="statusArr[1].val" class="custom_dark1">故障
                </el-checkbox>
            </el-badge>
            <el-badge :value="getRunStatusInfoList.body.stCount['2'] || 0" class="item">
                <el-checkbox :label="statusArr[2].val" class="custom_dark1">报警
                </el-checkbox>
            </el-badge>
            <el-badge :value="getRunStatusInfoList.body.stCount['3'] + getRunStatusInfoList.body.stCount['7'] || 0" class="item">
                <el-checkbox :label="statusArr[3].val" class="custom_dark1">中断
                </el-checkbox>
            </el-badge>
            <el-badge :value="getRunStatusInfoList.body.stCount['4'] || 0" class="item">
                <el-checkbox :label="statusArr[4].val" class="custom_dark1">初始化
                </el-checkbox>
            </el-badge>
            <el-badge :value="getRunStatusInfoList.body.stCount['5'] || 0" class="item">
                <el-checkbox :label="statusArr[5].val" class="custom_dark1">未知
                </el-checkbox>
            </el-badge>
            <el-badge :value="getRunStatusInfoList.body.stCount['6'] || 0" class="item">
                <el-checkbox :label="statusArr[6].val" class="custom_dark1">未接入
                </el-checkbox>
            </el-badge>
        </el-checkbox-group>
    </div>
</template>

<script>
export default {
    data () {
        return {
            statusArr: [{name: '正常', val: '0'}, {name: '故障', val: '1'}, {name: '报警', val: '2'}, {name: '中断', val: '3,7'}, {name: '初始化', val: '4'}, {name: '未知', val: '5'}, {name: '未接入', val: '6'}],
            checkAll: false,
            checkedStatus: [],
            checkShadow: false,
            intervalStatus: null,
            getRunStatusInfoList: {
                body: {
                        stCount: []
                    }
            }
        }
    },
    created () {
        this.$bus.on('stationList', this.getStationList)
    },
    mounted () {
        this.checkAll = true
        this.checkedStatus = this.statusArr.map(v => v.val)
    },
    beforeDestroy () {
        this.$bus.off('stationList', this.getStationList)
    },
    methods: {
        getStationList (data) {
            this.getRunStatusInfoList = data
        },
        // 全选
        handleCheckAllChange (value) {
            this.checkedStatus = value ? this.statusArr.map(v => v.val) : []
            let val = ''
            val = value ? '99' : '-1'
            this.emitStatusData(val)
        },
        // 其他状态
        handleCheckedStatusChange (value) {
            let val = ''
            this.checkAll = value.length === 7
            val = value.length === 7 ? '99' : !value.length ? '-1' : value.join()
            this.emitStatusData(val)
        },
        emitStatusData (val) {
            this.$bus.emit('stationListStatus', val)
        }
    }
}
</script>

<style lang="scss">
.henanMonitoring-stationList-status {
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
.henanMonitoring-stationList-status {
    display: inline-block;

    .el-checkbox-group {
        display: inline-block;
    }

    .shadowCheckbox {
        margin-left: 30px;
    }
    .alarm-num{
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
