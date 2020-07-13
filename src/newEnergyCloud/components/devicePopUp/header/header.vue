<template>
    <div @dblclick="$bus.emit('deviceFullscreen')" class="header clearfix">
        <switch-device class="switch-device" :data="data" :tab="tab"></switch-device>
        <div @click="showMore = !showMore" class="more-info-btn">
            <span>更多信息</span>
            <i v-show="!showMore" class="iconfont icon-wangxia-copy"></i>
            <i v-show="showMore" class="iconfont icon-wangshang-copy"></i>
        </div>
        <div class="btn-group">
            <slot></slot>
        </div>
        <div @dblclick.stop class="more-info-content" :class="{show: showMore}">
            <keep-alive>
                <slot v-if="showMore" name="moreInfo"></slot>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import SwitchDevice from './switchDevice'
export default {
    props: {
        data: {
            type: Object
        },
        tab: {
            type: String
        }
    },
    data () {
        return {
            showMore: false
        }
    },
    components: {
        SwitchDevice
    }
}
</script>

<style lang="scss" scoped>
.header {
    height: 46px;
    line-height: 46px;
    background-color: #fff;
    padding: 0 42px;
    position: relative;

    .switch-device {
        float: left;
    }

    .btn-group {
        width: max-content;
        margin: 0 auto;
    }

    .more-info-btn {
        float: right;
        cursor: pointer;

        i {
            vertical-align: top;
        }
    }

    .more-info-content {
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        height: max-content;
        background-color: #fff;
        border-top: 1px solid #ccc;
        padding: 0 42px;
        z-index: 9;

        &.show {
            box-shadow: 0px 10px 10px 1px #ccc;
        }
    }
}
</style>
