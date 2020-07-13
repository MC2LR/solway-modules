<template>
    <div class="history">
        <div class="header clearfix">
            <i @click="$bus.emit('historyVideo', null)" class="iconfont iconfanhui" title="返回实时监控"></i>

            <span class="name">设备：{{data.channelName}}</span>

            <el-select
                class="input-i1"
                clearable
                v-model="videoDateRange"
                placeholder="请选择历史视频">
                <el-option
                    v-for="item in lappVideoByTime.res.data"
                    :key="item.id"
                    :label="new Date(item.startTime).Format('yyyy-MM-dd hh:mm:ss') + ' 至 ' + new Date(item.endTime).Format('yyyy-MM-dd hh:mm:ss')"
                    :value="item.startTime + '-' + item.endTime">
                </el-option>
            </el-select>

            <el-date-picker
                v-model="dateRange"
                type="datetimerange"
                :clearable="false"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="input-i1"
                popper-class="history-video-daterange"
                align="center">
            </el-date-picker>

        </div>

        <div class="video-box">
            <i class="iconfont iconjiankong-"></i>
            <history-video
                class="history-video"
                v-if="videoDateRange"
                :key="videoDateRange"
                :begin="new Date(+videoDateRange.split('-')[0]).Format('yyyy-MM-dd hh:mm:ss').split(' ').join('').split(':').join('').split('-').join('')"
                :end="new Date(+videoDateRange.split('-')[1]).Format('yyyy-MM-dd hh:mm:ss').split(' ').join('').split(':').join('').split('-').join('')"
                :realTime="false"
                :verificationCode="data.verificationCode"
                :serialNumber="data.serialNumber"
                :channel="data.channel"
                :accessToken="token">
            </history-video>
        </div>
    </div>
</template>

<script>
import {api＿lappVideoByTime} from '@/request/api'
import {DatePicker, Select, Option} from 'element-ui'
import HistoryVideo from './video'
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    },
    data () {
        const dateNow = Date.now()
        return {
            lappVideoByTime: api＿lappVideoByTime({
                data: {
                    accessToken: this.data.token,
                    deviceSerial: this.data.serialNumber,
                    channelNo: this.data.channelNo,
                    recType: 2
                }
            }),
            videoDateRange: '',
            dateRange: [new Date(dateNow - dateNow % (3600 * 1000 * 24 * 1) - 3600 * 1000 * 8), new Date()],
            pickerOptions: {
                disabledDate (time) {
                    return time.getTime() > Date.now()
                },
                shortcuts: [
                    {
                        text: '今天',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - start.getTime() % (3600 * 1000 * 24 * 1) - 3600 * 1000 * 8)
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '最近一周',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '最近半年',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 182)
                            picker.$emit('pick', [start, end])
                        }
                    }
                ]
            }
        }
    },
    components: {
        ElDatePicker: DatePicker,
        ElSelect: Select,
        ElOption: Option,
        HistoryVideo
    }
}
</script>

<style lang="scss">
.history {
    .el-date-editor {
        width: 440px;
        @include c(color, $text_c2);

        .el-range-separator, .el-range__icon, .el-range__close-icon {
            line-height: 26px;
        }

        .el-range-separator {
            width: 10%;
            @include c(color, $text_c2);
        }

        input.el-range-input {
            @include c(background-color, $bg_input_c1);
            @include c(color, $text_c2);
        }
    }
}
.history-video-daterange .el-button.el-picker-panel__link-btn.el-button--text.el-button--mini {
    display: none;
}
</style>

<style lang="scss" scoped>
.history {
    height: 100%;

    .header {
        height: 50px;
        line-height: 50px;

        i.iconfont {
            font-size: 20px;
            @include c(color, $text_c2);
            cursor: pointer;
        }

        span.name {
            font-size: 16px;
            margin-left: 50px;
            @include c(color, $text_c2);
        }

        .el-date-editor {
            float: right;
            margin-top: 10px;
        }

        .el-select {
            height: 34px;
            line-height: 34px;
            margin-left: 50px;
            float: right;
            margin-top: 10px;
            width: 350px;
        }
    }

    .video-box {
        width: 100%;
        height: calc(100% - 50px);
        background-color: #072C4A;
        position: relative;
        overflow: hidden;

        i.iconfont.iconjiankong- {
            position: absolute;
            bottom: 0;
            right: 0;
            font-size: 50vh;
            transform: translateX(8%) translateY(15%);
            color: rgba(#1F6AB7, .3);
        }

        .history-video {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
