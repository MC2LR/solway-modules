<template>
    <div class="handle">
        <date-btn-group @change="dateChange" class="date-btn-group"></date-btn-group>
        <el-select v-model="sortName" @change="sortBy(sortType)" size="mini">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <div class="sort" :class="{'theme-dark': themeName === 'dark'}" @click="sortBy({normal: 'desc', desc: 'asc', asc: 'normal'}[sortType])">
            <i v-show="sortType === 'normal'" class="iconfont icon-paixu"></i>
            <i v-show="sortType === 'desc'" class="iconfont icon-xiangxiajiantou-"></i>
            <i v-show="sortType === 'asc'" class="iconfont icon-xiangshangjiantou-"></i>
        </div>
        <span>分组</span>
        <el-select style="width: 200px;" @change="emitGetdata" size="mini" v-model="group" multiple collapse-tags placeholder="全部">
            <el-option v-for="item in selectDeviceGroup.res.body" :key="item.id" :label="item.group_name" :value="item.id"></el-option>
        </el-select>

        <el-button @click="$bus.emit($route.name + 'Export')" size="mini" type="primary">导出数据</el-button>
    </div>
</template>

<script>
import DateBtnGroup from '@/components/dateBtnGroup'
import {api＿selectDeviceGroup} from '@/request/api'
import theme from './theme/theme'
export const deviceParams = [
    { label: '发电小时数', value: 'real_hours' },
    { label: '发电量 ', value: 'real_kwh_chk' },
    { label: 'PR', value: 'pr' },
    { label: '清洁指数', value: 'clean_mark' },
    { label: '总损失电量', value: 'we' },
    { label: '积灰损失电量', value: 'dust_we' },
    { label: '阴影损失电量', value: 'shade_we' },
    { label: '故障损失电量', value: 'fail_we' },
    { label: '检修损失电量', value: 'repair_we' },
    { label: '限电损失电量', value: 'restrict_we' },
    { label: '其他损失电量', value: 'other_we' },
    { label: '总损失小时', value: 'we_hours' },
    { label: '积灰损失小时', value: 'dust_we_hours' },
    { label: '阴影损失小时', value: 'shade_we_hours' },
    { label: '故障损失小时', value: 'fail_we_hours' },
    { label: '检修损失小时', value: 'repair_we_hours' },
    { label: '限电损失小时', value: 'restrict_we_hours' },
    { label: '其他损失小时', value: 'other_we_hours' }
]
export default {
    mixins: [theme],
    components: {
        DateBtnGroup
    },
    data () {
        const defaultDate = new Date(Date.now() - 86400000)
        return {
            selectDeviceGroup: api＿selectDeviceGroup({
                data: {
                    stId: this.$store.getters.station_id
                },
                res: {
                    body: []
                }
            }),
            options: deviceParams,
            sortName: deviceParams[0].value,
            group: [],
            sortType: 'normal',
            dateArr: [defaultDate, defaultDate]
        }
    },
    created () {
        this.$bus.on('stationChange', this.getData)
        // this.$bus.once('deviceMonitorMounted', () => {
        //     this.$bus.emit('deviceMonitorGetData', {
        //         startDate: this.dateArr[0].Format('yyyy-MM-dd'),
        //         endDate: this.dateArr[1].Format('yyyy-MM-dd'),
        //         groupIds: this.group.join(),
        //         sort: this.sortName + ',' + this.sortType
        //     })
        // })
    },
    methods: {
        sortBy (sortType) {
            this.sortType = sortType
            this.$bus.emit('deviceMonitorGetData', {
                sort: this.sortName + ',' + this.sortType
            })
        },
        getData (station) {
            this.selectDeviceGroup.getData({
                stId: station.id
            })
        },
        emitGetdata (obj) {
            this.$bus.emit('deviceMonitorGetData', {
                startDate: this.dateArr[0].Format('yyyy-MM-dd'),
                endDate: this.dateArr[1].Format('yyyy-MM-dd'),
                groupIds: this.group.join(),
                ...obj
            })
        },
        dateChange (dateArr) {
            this.dateArr = dateArr
            this.$bus.emit('deviceMonitorDateChange', dateArr)
            this.emitGetdata(this.isLoaded ? {} : {sort: this.sortName + ',' + this.sortType})
            this.isLoaded = true
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.getData)
    }
}
</script>

<style lang="scss" scoped>
@import './theme/theme.scss';
[data-pagetheme="dark"] {
    .handle >>> {
        @import '@comm/assets/themes/input/pageTheme/input_dark1.scss';
    }
}
.handle {
    padding: 0 13px;
    @include page_c(color, rgba(255,255,255,0.8) #333 rgba(255,255,255,0.8));

    .date-btn-group {
        margin-right: 20px;
    }

    .el-select {
        width: 150px;

        >>> .el-input__inner {
            border: none;
        }
    }

    .el-button {
        margin-left: 20px;
    }

    .sort {
        display: inline-block;
        width: 28px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        vertical-align: middle;
        background-color: #fff;
        border-radius: 2px;
        margin-right: 20px;
        cursor: pointer;

        i {
            font-size: 16px;
            @include c(color, $text_c1);
        }
    }

    .sort.theme-dark {
        background-color: transparent;
        border: 1px solid rgba($text_c1, .5);
    }
}
</style>
