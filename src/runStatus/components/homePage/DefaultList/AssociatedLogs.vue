<template>
    <div class="detail">
        <span>电站：{{deviceLogNewGetDeviceLogById.res.body.stName}}</span>
        <span>设备类型：{{deviceLogNewGetDeviceLogById.res.body.deviceTypeStr}}</span>
        <br>
        <span>设备：{{deviceLogNewGetDeviceLogById.res.body.deviceName}}</span>
        <span>事件类型：{{deviceLogNewGetDeviceLogById.res.body.eventDesc}}</span>
        <br>
        <span>开始时间：{{getDateTime(deviceLogNewGetDeviceLogById.res.body.sStartTime)}}</span>
        <span>结束时间：{{getDateTime(deviceLogNewGetDeviceLogById.res.body.sEndTime)}}</span>
        <br>
        <span>状态：{{deviceLogNewGetDeviceLogById.res.body.handStatusStr}}</span>
        <br>
        <span>确认时间：{{getDateTime(deviceLogNewGetDeviceLogById.res.body.sureTime)}}</span>
        <span>确认人：{{deviceLogNewGetDeviceLogById.res.body.sureUserRealName}}</span>
    </div>
</template>

<script>
import {api＿deviceLogNewGetDeviceLogById} from '@runStatus/request/api'
export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            deviceLogNewGetDeviceLogById: api＿deviceLogNewGetDeviceLogById({
                data: {
                    id: this.id
                },
                res: {
                    body: {}
                }
            })
        }
    },
    methods: {
        getDateTime (time) {
            return time && new Date(time).Format('yyyy-MM-dd hh:mm')
        }
    }
}
</script>

<style lang="scss" scoped>
.detail {
    line-height: 2;

    span {
        @include c(color, $text_d1_c3);
        display: inline-block;
        width: 300px;
    }
}
</style>
