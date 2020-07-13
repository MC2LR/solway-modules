<template>
    <div class="shadow-analysis">
        <shadow-analysis-head></shadow-analysis-head>
        <date-btn-group @change="changeDate"></date-btn-group>

        <div class="content">
            <line-chart v-fullpage></line-chart>
            <div class="tables pull-left">
                <device-table v-fullpage></device-table>
                <group-string-table v-fullpage></group-string-table>
            </div>
            <edit-block v-fullpage></edit-block>
        </div>
    </div>
</template>

<script>
import { api＿getDeviceTypeByStIds } from '@newEnergyCloud/request/api'
import shadowAnalysisHead from './head'
import dateBtnGroup from '@/components/dateBtnGroup'
import lineChart from './lineChart'
import deviceTable from './deviceTable'
import groupStringTable from './groupStringTable'
import editBlock from './editBlock'

export default {
    components: {
        shadowAnalysisHead,
        dateBtnGroup,
        lineChart,
        deviceTable,
        groupStringTable,
        editBlock
    },
    data () {
        return {
            detail: {
                show: false
            },
            date: [new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd'), new Date(new Date(Date.now() - 86400000)).Format('yyyy-MM-dd')],
            getDeviceTypeByStIds: api＿getDeviceTypeByStIds({
                later: true,
                res: {
                    body: []
                }
            })
        }
    },
    created () {
        this.$nextTick(() => {
            document.getElementsByClassName('shadow-analysis')[0].addEventListener('click', this.initData)
        })
    },
    methods: {
        changeDate (date) {
            this.date = [date[0].Format('yyyy-MM-dd'), date[1].Format('yyyy-MM-dd')]
            this.$bus.emit('dateChange', this.date)
        },
        initData () {
            this.$bus.emit('initShadowAnalysis')
        }
    },
    beforeDestroy () {
        document.getElementsByClassName('shadow-analysis')[0].removeEventListener('click', this.initData)
    }
}
</script>

<style lang="scss">
[data-pagetheme="dark"] {
    .shadow-analysis{
        @import '@comm/assets/themes/input/pageTheme/input_dark1.scss';
        background:url('../../assets/images/analysis-bg.jpg') no-repeat;
        background-size: cover;
        .content{
            .v-fullpage{
                background: #141d40;
            }
        }
    }
}
.shadow-analysis {
    .tables {
        .el-table  {
            .row-style {
                &:hover,
                &.hover-row {
                    td {
                        color: #fff;
                        .iconfont.icon-xiangqing1 {
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
    // .el-dialog.GroupDetail {
    //     height: calc(100% - 6vh);
    //     .el-dialog__header {
    //         padding: 0;
    //         width: 0;
    //         .el-dialog__headerbtn {
    //             top: -5px;
    //             right: -27px;
    //             .el-dialog__close {
    //                 color: #fff;
    //                 font-size: 28px;
    //             }
    //         }
    //     }
    //     .el-dialog__body {
    //         height: 100%;
    //         padding: 15px 20px;
    //         .shadow-detail {
    //             text-align: center;
    //             .date-picker-arrow {
    //                 width: 100%;
    //                 .el-date-editor .el-input__inner {
    //                     color: #787A7F;
    //                 }
    //                 i.iconfont {
    //                     width: 22px;
    //                     height: 54px;
    //                     line-height: 54px;
    //                     color: rgba(47,191,204, 1);
    //                     background:rgba(47,191,204, .2);
    //                     top: 18.6vh;
    //                     &.disabled {
    //                         color: rgba(189,192,197, 1);
    //                         background:rgba(189,192,197, .2);
    //                     }
    //                     &.icon-wangzuo- {
    //                         left: 15px;
    //                     }
    //                     &.icon-wangyou{
    //                         right: 15px;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
}
</style>

<style lang="scss" scoped>
.shadow-analysis {
    height: 100%;
    padding: 15px 10px;
    padding-top: 5px;
    .date-btn-group {
        height: 28px;
        margin-top: 0px;
        margin-bottom: 10px;
    }
    .content {
        width: 100%;
        height: calc(100% - 75px);
        .tables {
            width: 53%;
            height: calc(63% - 10px);
            margin-right: 10px;
        }
        .edit-block {
            float: right;
            width: calc(47% - 10px);
            height: calc(63% - 10px);
        }
    }

}
</style>
