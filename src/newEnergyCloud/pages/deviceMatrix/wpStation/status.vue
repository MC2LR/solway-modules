<template>
    <div class="status">
        <el-checkbox :style="{color: theme.$pageStatusNameColor}" v-model="checkAll" @change="handleCheckAllChange">
            <span>全选</span>
            <span class="alarm-num">{{$useful($oc(getRunStatusInfoList.res, 'body', 'deviceStatusList', '0', 'wtCount'), 0)}}</span>
        </el-checkbox>
        <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
            <el-checkbox :style="{color: theme.$pageStatusNameColor}" v-for="item in cities" :label="item.value" :key="item.value">
                <span :style="{color: theme[item.color]}">{{item.label}}</span>
                <span v-if="item.countKey" class="alarm-num">{{$useful($oc(getRunStatusInfoList.res, 'body', 'deviceStatusList', '0', item.countKey), 0)}}</span>
            </el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>
import theme from './theme/theme'
import {api＿wpGetRunStatusInfoList} from '@/request/api'
export default {
    mixins: [theme],
    data () {
        this.cities = [
            { label: '正常', color: '$statusColor0', value: '01', countKey: 'wtRunCount' },
            { label: '故障', color: '$statusColor1', value: '02', countKey: 'wtFaultCount' },
            { label: '报警', color: '$statusColor2', value: '03', countKey: 'wtAlarmCount' },
            { label: '中断', color: '$statusColor3', value: '04', countKey: 'wtBreakOffCount' },
            { label: '待机', color: '$statusColor4', value: '05', countKey: 'wtStandbyCount' },
            { label: '维护', color: '$statusColor5', value: '06', countKey: 'wtOperCount' },
            { label: '其他', color: '$statusColor6', value: '099', countKey: '' }
        ]
        return {
            getRunStatusInfoList: api＿wpGetRunStatusInfoList({
                data: {
                    queryType: 3,
                    dateType: 3,
                    date: new Date().Format('yyyy-MM-dd')
                }
            }),
            checkAll: true,
            checkedStatus: this.cities.map(v => v.value),
            checkShadow: false
        }
    },
    created () {
        this.timer = setInterval(() => {
            this.getRunStatusInfoList.getData()
        }, this.$route.meta.refresh_interval)
    },
    methods: {
        handleCheckAllChange (val) {
            this.checkedStatus = val ? this.cities.map(v => v.value) : []
            if (val) this.checkShadow = false
            this.$bus.emit(this.$route.name + 'StatusChange', this.checkedStatus)
        },
        handleCheckedStatusChange (val) {
            this.checkAll = val.length === this.cities.length
            this.checkShadow = false
            this.$bus.emit(this.$route.name + 'StatusChange', this.checkedStatus)
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.status {
    display: inline-block;

    .el-checkbox-group {
        display: inline-block;

        .el-checkbox {
            margin-right: 0;
        }
    }

    .alarm-num{
        position: relative;
        top: -15px;
        right: 8px;
        background: #ff7171;
        color: white;
        border-radius: 20px;
        padding: 3px;
        font-size: 12px;
    }
}
</style>
