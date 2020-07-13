<template>
    <div class="real-time" v-loading="ceVideoValidateCodeCurrStation.loading || lappCameraList.loading">
        <div class="header">
            <el-select
                clearable
                multiple
                :multiple-limit="4"
                @change="v => $emit('checkedVideos', v)"
                v-model="checkedVideoSns"
                placeholder="请选择摄像头">
                <el-option
                    v-for="item in lappCameraList.res.data"
                    :key="item.deviceSerial"
                    :label="item.channelName"
                    :value="item.deviceSerial">
                </el-option>
            </el-select>
        </div>
        <div class="video-list clearfix" v-if="ceVideoValidateCodeCurrStation.res.data">
            <i class="iconfont iconjiankong-"></i>
            <real-video
                :class="{onlay: selfCheckedVideos.length === 1}"
                v-for="item in selfCheckedVideos"
                :key="item.deviceSerial"
                :verificationCode="ceVideoValidateCodeCurrStation.res.data[item.deviceSerial]"
                :serialNumber="item.deviceSerial"
                :channel="item.channelNo"
                :channelName="item.channelName"
                :accessToken="token">
            </real-video>
        </div>
    </div>
</template>

<script>
import {Select, Option} from 'element-ui'
import realVideo from './video'
import { api＿lappCameraList, api＿ceVideoValidateCodeCurrStation } from '@/request/api'
export default {
    props: {
        token: {
            type: String,
            required: true
        },
        checkedVideos: {
            type: Array
        }
    },
    data () {
        return {
            ceVideoValidateCodeCurrStation: api＿ceVideoValidateCodeCurrStation(),
            lappCameraList: api＿lappCameraList({
                data: {
                    accessToken: this.token,
                    pageSize: 50
                },
                res: {
                    data: []
                }
            }),
            checkedVideoSns: [...this.checkedVideos]
        }
    },
    created () {
        this.lappCameraList.subscribe(res => {
            this.checkedVideoSns = [res.data[0].deviceSerial]
        })
    },
    computed: {
        selfCheckedVideos () {
            return this.lappCameraList.res.data.filter(v => this.checkedVideoSns.includes(v.deviceSerial))
        }
    },
    components: {
        realVideo,
        ElSelect: Select,
        ElOption: Option
    }
}
</script>

<style lang="scss">
.real-time .header .el-select input {
    @include c(background-color, $bg_input_c1);
    @include c(color, $text_c2);
    @include c(border-color, $line_c1);
    width: 500px;
}
</style>
<style lang="scss" scoped>
.real-time{
    height: 100%;

    .header {
        height: 50px;
    }

    .video-list {
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

        .real-video {
            float: left;
            width: 50%;
            height: 50%;

            &.onlay {
                width: 100%;
                height: 100%;
            }
        }
    }

}
</style>
