<template>
    <div class="wp-device-layout-header clearfix">
        <switch-station class="switch-station"></switch-station>
        <el-button class="button-tab" @click="$router.push({name: 'deviceList'})">列表视图</el-button>
        <el-button class="button-tab" @click="$router.push({name: 'deviceMatrix'})">矩阵视图</el-button>
        <el-button class="button-tab active">布局视图</el-button>
    </div>
</template>

<script>
import SwitchStation from '@/components/station/switchStation/switchStation'
export default {
    components: {
        SwitchStation
    }
}
</script>
<style lang="scss">
[data-pagetheme="darkBlue"] {
   .wp-device-layout-header{
        @import '@comm/assets/themes/button/pageTheme/button_dark_blue1.scss';
    }
}
[data-pagetheme="light"] {
   .wp-device-layout-header{
        @import '@comm/assets/themes/button/pageTheme/button_dark_blue1.scss';
        // @import '@comm/assets/themes/button/pageTheme/button_light1.scss';
    }
}
</style>
<style lang="scss" scoped>
@import './theme/theme.scss';
.wp-device-layout-header {
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
}
</style>
