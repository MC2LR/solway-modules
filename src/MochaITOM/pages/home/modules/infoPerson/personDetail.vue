<template>
    <div class="person-detail-modal">
        <div class="basic-info">
            <i class="iconfont icongongren2"></i>
            <span>{{name || '-'}}</span>
            <!-- <span class="lable-name">注册时间：</span>
            <span>12233423</span> -->
            <span class="lable-name">联系电话：</span>
            <span>{{phone || '-'}}</span>
        </div>
        <div style="font-size:16px;margin:10px 0;">
            <span>任务记录</span>
            <span style="font-size:14px;margin-left:30px;">发布时间：</span>
            <el-date-picker
                @change="dateChange"
                style="width:400px;"
                v-model="searchDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </div>
        <div class="person-detail-table">
            <el-table
                :data="taskListByUserId.res.data"
                border
                :row-style="{'cursor': 'pointer'}"
                row-class-name="row-style"
                height="100%"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style"
                empty-text="暂无任务"
                style="width: 100%">
                <el-table-column
                    prop="pointTime"
                    align="center"
                    width="120px"
                    label="发布时间">
                </el-table-column>
                <el-table-column
                    width="90px"
                    align="center"
                    prop="modeName"
                    label="任务类型">
                </el-table-column>
                <el-table-column
                    prop="stationName"
                    width="220px"
                    align="center"
                    label="电站名称">
                </el-table-column>
                <el-table-column
                    width="100px"
                    prop="workeHour"
                    align="center"
                    label="实际工时(h)">
                </el-table-column>
                <el-table-column
                    prop="name"
                    align="right"
                    label="任务名称">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {getTaskListByUserId} from '@/request/api'
// import {Table, TableColumn, Progress} from 'element-ui'
export default {
    props: {
        userId: {},
        name: {},
        phone: {}
    },
    data () {
        return {
            searchDate: '',
            startTime: '',
            endTime: '',
            taskListByUserId: getTaskListByUserId({
                later: true
            })
        }
    },
    methods: {
        initData () {
            this.taskListByUserId.getData({userId: this.userId, startTime: this.startTime, endTime: this.endTime})
        },
        dateChange () {
            this.startTime = this.searchDate ? new Date(this.searchDate[0]).Format('yyyy-MM-dd') : ''
            this.endTime = this.searchDate ? new Date(this.searchDate[1]).Format('yyyy-MM-dd') : ''
            this.initData()
        }
    },
    created () {
        this.$bus.on('openPersonDetailEmit', this.initData)
    },
    beforeDestroy () {
        this.$bus.off('openPersonDetailEmit', this.initData)
    }
}
</script>

<style lang="scss">
.person-detail-modal {
    @import '@comm/assets/themes/table/tableWhite/t1.scss';
}
</style>
<style lang="scss" scoped>
.person-detail-modal {
    font-size:12px;
    .basic-info{
        font-size:16px;
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 10px;
        .icongongren2{
            color: #868484;
            font-size: 24px;
        }
        .lable-name{
            margin-left:35px;
        }
    }
    >>> .el-input__inner {
        padding: 0px 10px;
    }
    .person-detail-table{
        height: calc(100vh - 300px);
    }
}
</style>
