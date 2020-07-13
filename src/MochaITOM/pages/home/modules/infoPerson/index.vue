<template>
    <div class="info-person-mochal">
        <span class="module-name">人员信息</span>
        <div class="table-line">
            <el-table
                :data="getUserInfoListData.res.data"
                border
                :row-style="{'cursor': 'pointer'}"
                row-class-name="row-style"
                height="100%"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                empty-text="暂无人员"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    width="100px"
                    align="center"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="weekHours"
                    label="本周工时">
                    <template slot-scope="scope">
                        <el-progress :percentage="switchPercent(scope.row.weekHours)" :format="formatProgress" :stroke-width="8"></el-progress>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    width="90px"
                    align="center"
                    label="状态">
                </el-table-column>
                <el-table-column
                    prop="positionUpTime"
                    align="center"
                    width="120px"
                    label="位置更新时间">
                    <template slot-scope="scope">
                        {{scope.row.positionUpTime || '无'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="distance"
                    align="right"
                    width="110px"
                    label="距离剩余(m)">
                    <template slot-scope="scope">{{formatNum(scope.row.distance)}}</template>
                </el-table-column>
                 <el-table-column
                    align="center"
                    width="55px"
                    label="详细">
                    <template slot-scope="scope">
                        <span class="detail-circle" @click="showDetail(scope.row);$event.stopPropagation();">···</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 人员详情 -->
        <el-dialog
            width="1000px"
            center
            @opened="$bus.emit('openPersonDetailEmit')"
            @close="personDetailDialog.show = false"
            :destroy-on-close="true"
            :visible.sync="personDetailDialog.show">
            <person-detail v-bind="personDetailDialog"></person-detail>
        </el-dialog>
    </div>
</template>

<script>
import {getUserInfoList} from '@/request/api'
import {Table, TableColumn, Progress} from 'element-ui'
export default {
    data () {
        return {
            personDetailDialog: {
                show: false
            },
            getUserInfoListData: getUserInfoList({
                later: true
            })
        }
    },
    methods: {
        showDetail (item) {
            this.personDetailDialog = {
                show: true,
                userId: item.userId,
                name: item.name,
                phone: item.phone
            }
        },
        initPeopleList () {
            this.getUserInfoListData.getData()
        },
        formatNum (num) {
            return (num !== null) ? ((num.toFixed() + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')) : '无'
        },
        formatProgress (val) {
            if (val) return 168 * val / 100
            return '0'
        },
        switchPercent (val) {
            if (val) return val / 168 * 100
            return 0
        }
    },
    created () {
        this.initPeopleList()
    },
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElProgress: Progress,
        PersonDetail: () => import('./personDetail')
    }
}
</script>
<style lang="scss">
.info-person-mochal {
    @import '@comm/assets/themes/table/tableMiniLine/t2.scss';
    .el-progress__text {
        color: rgb(177, 204, 244);
    }
}
</style>
<style lang="scss" scoped>
.info-person-mochal {
    color: white;
    height: 100%;
    &.v-fullpage{
        background: #2e4477;
        .module-name{
            display: inline-block;
            padding: 20px;
        }
        .table-line{
            height: calc(100% - 60px);
        }
    }
    .table-line{
        padding:10px 18px;
        margin-top: 5px;
        height: calc(100% - 20px);
        position: relative;
        .detail-circle{
            display: inline-block;
            width: 16px;
            height:16px;
            line-height: 14px;
            color: #29DFA6;
            border:1px solid #29DFA6;
            border-radius: 50%;
            text-align: center;
        }
    }
}
</style>
