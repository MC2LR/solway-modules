<template>
    <div class="detail">
        <span>电站：{{row.stName}}</span>
        <br>
        <span>设备类型：{{row.deviceTypeStr}}</span>
        <span>设备名称：{{row.deviceName}}</span>
        <br>
        <span>开始时间：{{getDateTime(row.startDate)}}</span>
        <span>结束时间：{{getDateTime(row.endDate)}}</span>
        <br>
        <span>实际状态：{{row.realStatusStr}}</span>
        <span>事件说明：{{row.eventExplain}}</span>
        <br>
        <span>电量计算参考设备：{{row.referenceDevice}}</span>
        <span>系统计算损失电量（KWh）：{{row.lostElecSystem}}</span>
        <br>
        <span>人工统计损失电量（KWh）：{{row.lostElecUser}}</span>
        <span>电量每日折算比例：{{row.dayRate}}</span>
        <br>
        <span>录入时间：{{getDateTime(row.updateDate)}}</span>
    </div>
</template>

<script>
export default {
    props: {
        row: {
            type: Object,
            required: true
        }
    },
    methods: {
        getDateTime (time) {
            return new Date(time).Format('yyyy-MM-dd hh:mm')
        }
    }
}
</script>

<style lang="scss" scoped>
.detail {
    @include c(color, $text_c2);
    line-height: 2;

    span {
        display: inline-block;
        width: 300px;
    }
}
</style>
