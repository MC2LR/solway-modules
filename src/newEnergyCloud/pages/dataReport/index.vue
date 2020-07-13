<template>
    <div class="data-report">
        <div class="head">
            <switch-station class="pull-left"/>
            <switch-date-picker
            :theme="themeName"
            style="margin-left: 15px"
            @change="dateChange"
            :tabs="['day', 'month', 'year', 'custom']"
            :defaultDate='new Date(new Date().getTime() - 86400000)'
            :disabledDate="time => time.getTime() > (new Date().getTime() - 86400000)"/>
        </div>
        <div class="content">
            <div class="havaData" v-if='reportShowTab.res.body.length'>
                <div class="handles">
                    <el-button
                        class="button"
                        :class="{'active': firstIndex === index}"
                        v-for="(item, index) in reportShowTab.res.body"
                        :key="index"
                        @click="changeTab1(index)">
                    {{item.layName}}
                    </el-button>
                    <!-- 导出 -->
                    <i class="iconfont icon-daochu- pull-right" style="color: #2fbfcc;margin-left: 30px;font-size: 20px;cursor: pointer;" title="导出报表" @click="downReport"></i>
                    <div
                    class="pull-right"
                    style="color:#FB9D2A;font-size:18px;margin-left:5px;cursor: pointer;"
                    @click="clickSubscribe()">
                        订阅
                    </div>
                    <i
                    class="iconfont icon-xuanzhong pull-right subscribe"
                    :class="{'gray': checkSubscribe.res.body.hasSubscribe === 0}"
                    :title="checkSubscribe.res.body.hasSubscribe ? '取消订阅' : '未订阅'"
                    @click="clickSubscribe()"
                    ></i>
                </div>
                <div
                class="automaticReportView"
                v-html="reportShowView.res"
                v-loading='reportShowView.loading'></div>
                <div class="shifts">
                    <el-button
                        class="button"
                        :class="{'active': secondIndex === index}"
                        v-for="(item, index) in reportShowTab.res.body[firstIndex].subTabs"
                        :key="index"
                        @click="changeTab2(index)">
                    {{item.layName}}
                    </el-button>
                </div>
            </div>
            <div class="noData" v-if="!reportShowTab.res.body.length">
                暂无相关数据～
            </div>
        </div>
    </div>
</template>

<script>
import { api＿reportShowTab, api＿reportShowView, api＿reportShowUserCheckSubscribe, api＿reportShowUserDoSubscribe, api＿reportShowExcel } from '@newEnergyCloud/request/api'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import switchStation from '@/components/station/switchStation/switchStation'
import DatePickerArrow from '@newEnergyCloud/components/datePickerArrow/DatePickerArrow'
import switchDatePicker from '@newEnergyCloud/components/dayWeekMonthYearAccum'
import { download } from '@comm/request/http'
import theme from './theme/theme'

export default {
    mixins: [mixinWidthHeight, theme],
    components: {
        switchStation,
        DatePickerArrow,
        switchDatePicker
    },
    data () {
        return {
            dateMap: {
                'day': 4,
                'custom': 3,
                'month': 2,
                'year': 1
            },
            stData: {},
            date: {
                type: 'day',
                value: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
            },
            dateType: 4, // 日 周 月 年 = 4 3 2 1
            hasSubscribe: false,
            firstIndex: 0,
            secondIndex: 0,
            timeType: 0,
            reportShowTab: api＿reportShowTab({
                later: true,
                res: {
                    body: [
                        { subTabs: [] }
                    ]
                }
            }),
            reportShowView: api＿reportShowView({
                later: true,
                res: ''
            }),
            checkSubscribe: api＿reportShowUserCheckSubscribe({
                later: true,
                res: {
                    body: {
                        hasSubscribe: null
                    }
                }
            }),
            reportShowUserDoSubscribe: api＿reportShowUserDoSubscribe({
                later: true
            })
        }
    },
    created () {
        this.$bus.on('stationChange', this.stationChange)
        this.stData.dataType = this.$store.getters.station_type
        this.getTabData()
    },
    methods: {
        // 导出
        downReport () {
            download({
                url: `${api＿reportShowExcel}?tabId=${this.reportShowTab.res.body[this.firstIndex].id}&useSt=${this.stData.dataType === 0 ? 1 : 0}&dateType=${this.timeType}&date=${this.date.type === 'custom' ? new Date(this.date.value[0]).Format('yyyy-MM-dd') + ',' + new Date(this.date.value[1]).Format('yyyy-MM-dd') : new Date(this.date.value).Format('yyyy-MM-dd')}`,
                progress: false
            })
        },
        stationChange (data) {
            this.stData.dataType = this.$store.getters.station_type
            this.getTabData()
        },
        dateChange (date) {
            this.date = date
            this.getTabData()
        },
        getTabData () {
            this.reportShowTab.getData({
                useSt: this.stData.dataType === 0 ? 1 : 0,
                reportType: this.dateMap[this.date.type]
            }).then(res => {
                if (!res.body) return this.$message.error(res.msg)
                if (this.dateMap[this.date.type] === 2) {
                    this.reportShowTab.res.body = this.reportShowTab.res.body.filter(v => v.layName === '电量')
                }
                res.body && res.body[0] && this.changeTab1(0)
            })
        },
        changeTab1 (i) {
            this.firstIndex = i
            this.checkSubscribe.getData({ tabId: this.reportShowTab.res.body[i].id })
            this.changeTab2(0)
        },
        changeTab2 (i) {
            this.secondIndex = i
            this.timeType = [null, 1, 2, 3, 4][this.reportShowTab.res.body[this.firstIndex].reportType]
            const o = {
                dateType: this.timeType,
                subTabId: this.reportShowTab.res.body[this.firstIndex].subTabs[i].id,
                style: 0,
                useSt: this.stData.dataType === 0 ? 1 : 0,
                date: this.date.type === 'custom' ? new Date(this.date.value[0]).Format('yyyy-MM-dd') + ',' + new Date(this.date.value[1]).Format('yyyy-MM-dd') : new Date(this.date.value).Format('yyyy-MM-dd')
            }
            this.reportShowView.getData(o)
        },
        clickSubscribe () {
            if (this.checkSubscribe.res.body.doSubscribe !== 1) return this.$message.error('该报表不可订阅')
            this.reportShowUserDoSubscribe.getData({ tabId: this.reportShowTab.res.body[this.firstIndex].id, subscribeAble: this.checkSubscribe.res.body.hasSubscribe ? 0 : 1 }).then(res => {
                if (res.code !== 0) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                this.checkSubscribe.getData({})
            })
        }

    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.stationChange)
    }
}
</script>

<style lang="scss">
.data-report {
    .head {
        .date-range-switch {
            .tabs .tab {
                font-size: 16px;
            }
        }
    }

    .content {

        .el-checkbox .el-checkbox__input.is-checked .el-checkbox__inner {
            background-color: #FB9D2A;
            border-color: #FB9D2A;
        }

        .el-checkbox .el-checkbox__input .el-checkbox__inner {
            width: 18px;
            height: 18px;
            &:hover {
                border-color: #FB9D2A;
            }
        }

        .el-checkbox .el-checkbox__inner::after {
            height: 8px;
            left: 5px;
            top: 2px;
            width: 5px;
        }

        .el-checkbox .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #FB9D2A;
        }

        .el-checkbox .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #FB9D2A;
        }

        .el-checkbox .el-checkbox__label {
            font-size: 18px;
            vertical-align: text-bottom;
        }
    }
}

</style>

<style lang="scss" scoped>
@import './theme/theme.scss';

[data-pagetheme="dark"] {
    .data-report {
        .content {
            .handles {
                .button {
                    box-shadow: none;
                    border-radius: 0;
                }
            }
        }
    }
}

.data-report {
    height: 100%;
    padding: 20px 15px;
    .head {
        line-height: 40px;
        @include page_c(color, $pageHeaderLine);
        .switch-station {
            line-height: 38px;
        }
        .time-type {
            font-size: 18px;
            color: #606369;
            height: 34px;
            line-height: 32px;
            padding-right: 20px;
            span {
                padding: 0 10px;
            }
        }
    }
    .content {
        padding-top: 10px;
        height: calc(100% - 40px);
        .handles {
            .button {
                width: 96px;
                height: 29px;
                line-height: 29px;
                background:rgba(255, 255, 255, 1);
                border-radius: 4px;
                color: #606369;
                padding: 0;
                border: none;
                box-shadow: 0 0 5px #dadada;
                &.active {
                    color: #fff;
                    background:rgba(47, 191, 204, 1);
                }
            }
            .subscribe {
                width: 18px;
                height: 18px;
                line-height: 18px;
                background:#FB9D2A;
                border-radius: 2px;
                color: #fff;
                text-align: center;
                cursor: pointer;
                &.gray {
                    color: transparent;
                    border: 1px solid #DCDFE6;;
                    background-color: #fff;
                }
            }
        }
        .automaticReportView {
            width: 100%;
            overflow: auto;
            background-color: #fff;
            min-height: 300px;
            margin-top: 10px;
            height: calc(100vh - 168px);
            & >>> #_ureport_table {
                width: calc(100% - 1px);
            }
            & >>> form {
                display: none;
            }
            & >>> table {
                min-width: 100%;
                td {
                    height: 50px;
                    border-color: #ccc;
                    color: #73767C;
                    word-break: keep-all;
                    white-space: nowrap;
                    overflow: hidden;
                    padding: 1em;
                }
                tr:first-child {
                    td:first-child {
                        color: #28b1a7;
                        font-size: 22px;
                    }
                    td {
                        font-size: 14px;
                        font-weight: 700;
                        height: 60px;
                    }
                }
            }
        }
        .shifts {
            word-break: keep-all;
            white-space: nowrap;
            overflow-x: scroll;
            .button {
                width: 91px;
                height: 35px;
                line-height: 35px;
                background:rgba(237, 239, 249, 1);
                box-shadow: 0px 4px 8px 1px rgba(66,150,157,0.14);
                border-radius: 4px;
                color: #5D5D5D;
                padding: 0;
                border: none;
                &.active {
                    color: #2FBFCB;
                    background:rgba(255, 255, 255, 1);
                }
            }
        }
        .noData {
            height: 100%;
            @include page_c(color, $pageHeaderLine);
            // color: #fff;
            font-size: 20px;
            text-align: center;
            line-height: 500px;
        }
    }
}
</style>
