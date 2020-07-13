<template>
    <div class="deviceListWpCompany">
        <div class="header-con">
            <switch-station/>
        </div>
        <div class="page-body" v-loading="!getWpRunStatusInfoList.res.body">
            <el-table
                v-if="getWpRunStatusInfoList.res.body"
                border
                v-loading="getWpRunStatusInfoList.loading"
                :data="getWpRunStatusInfoList.res.body.deviceStatusList"
                :max-height="vh - 70"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                style="width: 100%">
                <el-table-column prop="stName" label="电站名称">
                    <template slot-scope="scope">
                        <div @click="toStationPage(scope.row)" style="cursor:pointer;color:#2FBFCC;">
                            <div v-if="scope.row.st_comm === 1"><span>{{scope.row.stName || '-'}}</span><i title="通讯中断" class="iconfont icon-icon-life-alarm-copy" style="color:#9d9d9d;"></i></div>
                            <div v-else-if="scope.row.st_comm === 2"><span>{{scope.row.stName || '-'}}</span><i title="通讯初始化" class="iconfont icon-icon-life-alarm-copy" style="color:#9d9d9d"></i></div>
                            <div v-else-if="scope.row.st_status === 99"><span>{{scope.row.stName || '-'}}</span><i title="正常" class="iconfont icon-icon-life-alarm-copy" style="color: #52b876;"></i></div>
                            <div v-else-if="scope.row.st_status === 1"><span>{{scope.row.stName || '-'}}</span><i title="故障" class="iconfont icon-icon-life-alarm-copy" style="color: #ff6161;"></i></div>
                            <div v-else-if="scope.row.st_status === 2"><span>{{scope.row.stName || '-'}}</span><i title="报警" class="iconfont icon-icon-life-alarm-copy" style="color: #be9856;"></i></div>
                            <div v-else><span>{{scope.row.stName || '-'}}</span></div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="deviceCount" label="总台数" align="center" width="120" :formatter="(row) => ((row.comm + row.fault + row.maintain + row.run + row.wait) || '-')"></el-table-column>
                <el-table-column prop="run" label="运行台数" align="center" width="120"></el-table-column>
                <el-table-column prop="alarm" label="报警台数" align="center" width="120"></el-table-column>
                <el-table-column prop="wait" label="待机" align="center" width="120"></el-table-column>
                <el-table-column prop="fault" label="故障" align="center" width="120"></el-table-column>
                <el-table-column prop="maintain" label="维护" align="center" width="120"></el-table-column>
                <el-table-column prop="comm" label="离线" align="center" width="120"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {api＿getWpRunStatusInfoList} from '@newEnergyCloud/request/api'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import SwitchStation from '@/components/station/switchStation/switchStation'
import theme from '../theme/theme'
export default {
    mixins: [theme, mixinWidthHeight],
    data () {
        return {
            intervalWpCom: null,
            getWpRunStatusInfoList: api＿getWpRunStatusInfoList({
                later: true
            })
        }
    },
    methods: {
        initData () {
            this.getWpRunStatusInfoList.getData({
                queryType: 1,
                dateType: 3,
                date: new Date().Format('yyyy-MM-dd')
            })
        },
        toStationPage (row) {
            let data = {
                id: row.stid,
                stClass: '02',
                dataType: 0
            }
            this.$store.dispatch('station/changeStation', data)
        }
    },
    created () {
        // 切换公司
        this.$bus.on('stationChange', this.initData)
        this.initData()
    },
    mounted () {
        this.intervalWpCom = setInterval(() => {
            this.initData()
        }, this.$store.getters.refresh_interval())
    },
    beforeDestroy () {
        this.intervalWpCom && clearInterval(this.intervalWpCom)
        this.$bus.off('stationChange', this.initData)
    },
    components: {
        SwitchStation
    }
}
</script>
<style lang="scss">
[data-pagetheme="darkBlue"] {
   .deviceListWpCompany{
        @import '@comm/assets/themes/table/pageTheme/table_dark_blue1.scss';
    }
}
[data-pagetheme="dark"] {
    .deviceListWpCompany{
        @import '@comm/assets/themes/table/pageTheme/table_dark1.scss';
    }
}
</style>
<style lang="scss" scoped>
@import '../theme/theme.scss';
.deviceListWpCompany{
    height: 100%;
    padding: 0px 10px 15px;
    .header-con{
        height: 60px;
        line-height: 60px;
        @include page_c(color, $pageHeaderLine);
    }
    .page-body{
        .icon-icon-life-alarm-copy{
            position: absolute;
            right: 20px;
            font-size: 26px;
        }
    }
}
</style>
