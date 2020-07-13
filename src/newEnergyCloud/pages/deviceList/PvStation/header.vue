<template>
    <div class="divice-list-header">
        <switch-station/>
        <el-button v-if="!isHenan" class="button-tab active">列表视图</el-button>
        <el-button v-if="!isHenan" class="button-tab" @click="$router.push({name: 'deviceMatrix', params: { menuIndex: $route.name }})">矩阵视图</el-button>
        <div v-if="isHenan" class="defined-button active">列表视图</div>
        <div v-if="isHenan" class="defined-button" @click="$router.push({name: 'deviceMatrix', params: { menuIndex: $route.name }})">矩阵视图</div>
    </div>
</template>

<script>
import SwitchStation from '@/components/station/switchStation/switchStation'
export default {
    data () {
        return {
            isHenan: process.env.isHenan === 'true'
        }
    },
    components: {
        SwitchStation
    }
}
</script>
<style lang="scss">
[data-pagetheme="darkBlue"] {
   .divice-list-header{
        @import '@comm/assets/themes/button/pageTheme/button_dark_blue1.scss';
    }
}
[data-pagetheme="light"] {
   .divice-list-header{
        @import '@comm/assets/themes/button/pageTheme/button_light1.scss';
    }
}
</style>
<style lang="scss" scoped>
@import '../theme/theme.scss';
.divice-list-header {
    height: 60px;
    vertical-align: middle;
    @include page_c(color, $pageHeaderLine);
    &::before {
        height: 100%;
        content: '';
        line-height: 60px;
        display: inline-block;
        vertical-align: middle;
    }
    .defined-button{
        position:relative;
        display: inline-block;
        background-color: transparent;
        box-shadow: 0px 0px 9px rgba(56, 185, 207, 1) inset;
        line-height: 30px;
        color: rgba(40, 194, 221, 1);
        padding:0 13px;
        margin-right:27px;
        cursor: pointer;
        &.active{
            color: #fff;
            box-shadow:none;
            background-color: rgba(69, 228, 247,0.7);
        }
        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) left top no-repeat,
                        linear-gradient(to bottom, rgba(40,194,221, .5), rgba(40,194,221, .5)) left top no-repeat,
                        linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) right top no-repeat,
                        linear-gradient(to bottom, rgba(40,194,221, .5), rgba(40,194,221, .5)) right top no-repeat,
                        linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) left bottom no-repeat,
                        linear-gradient(to bottom, rgba(40,194,221, .5), rgba(40,194,221, .5)) left bottom no-repeat,
                        linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) right bottom no-repeat,
                        linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) right bottom no-repeat;
            background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
        }
    }
    .device-status {
        margin-left: 50px;
        height: 34px;
        line-height: 34px;
        background-color: #fff;
        padding: 0 1em;
    }
}
</style>
