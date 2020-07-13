<template>
    <div class="wp-device-matrix-header">
        <switch-station class="switch-station"></switch-station>
        <el-button class="button-tab" @click="$router.push({name: 'deviceList'})">列表视图</el-button>
        <el-button class="button-tab active">矩阵视图</el-button>
        <el-button class="button-tab" @click="$router.push({name: 'deviceLayoutView'})">布局视图</el-button>
        <device-status class="device-status"></device-status>
    </div>
</template>

<script>
import SwitchStation from '@/components/station/switchStation/switchStation'
import DeviceStatus from './status'
export default {
    components: {
        SwitchStation,
        DeviceStatus
    }
}
</script>
<style lang="scss">
[data-pagetheme="darkBlue"] {
   .wp-device-matrix-header{
        @import '@comm/assets/themes/button/pageTheme/button_dark_blue1.scss';
    }
}
[data-pagetheme="light"] {
   .wp-device-matrix-header{
        @import '@comm/assets/themes/button/pageTheme/button_dark_blue1.scss';
        // @import '@comm/assets/themes/button/pageTheme/button_light1.scss';
    }
}
</style>
<style lang="scss" scoped>
@import './theme/theme.scss';
.wp-device-matrix-header {
    @include page_c(color, $fontColor);
    height: 60px;
    padding: 0 13px;
    vertical-align: middle;

    .switch-station {
        @include page_c(color, $stationNameColor);
    }

    &::before {
        height: 100%;
        content: '';
        line-height: 60px;
        display: inline-block;
        vertical-align: middle;
    }

    .device-status {
        margin-left: 50px;
        height: 34px;
        line-height: 34px;
        background-color: #fff;
        padding: 0 1em;
        @include page_c(background-color, $pageDeviceStatusBg);
    }
}
</style>
