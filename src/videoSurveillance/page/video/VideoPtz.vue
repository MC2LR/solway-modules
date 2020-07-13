<template>
    <div class="video-ptz">
        <i data-ptzctrl="true" @mousedown.prevent="$emit('control', 'up')" title="上" class="top iconfont videotop"></i>
        <i data-ptzctrl="true" @mousedown.prevent="$emit('control', 'down')" title="下" class="bottom iconfont videobottom"></i>
        <i data-ptzctrl="true" @mousedown.prevent="$emit('control', 'left')" title="左" class="left iconfont videoleft"></i>
        <i data-ptzctrl="true" @mousedown.prevent="$emit('control', 'right')" title="右" class="right iconfont videoright"></i>
        <i data-ptzctrl="true" @mousedown.prevent="$emit('control', 'zoomin')" title="放大" class="iconfont videojia"></i>
        <i data-ptzctrl="true" @mousedown.prevent="$emit('control', 'zoomout')" title="缩小" class="iconfont videojian"></i>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.video-ptz {
    width: 150px;
    height: 150px;
    background-color: rgba(#fff, .5);
    border-radius: 4px;

    &::before {
        content: '';
        display: block;
        position: absolute;
        width: 50%;
        height: 100%;
        left: -51%;
        top: 0;
        background-color: rgba(#fff, .5);
        border-radius: 4px;
    }

    i.iconfont {
        font-size: 30px;
        position: absolute;
        cursor: pointer;

        &:hover {
            @include c(color, $text_c1);
        }

        &.videojia {
            left: -35%;
            top: 10px;
        }
        &.videojian {
            left: -35%;
            bottom: 10px;
        }

        &.left {
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
        &.right {
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
        &.top {
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
        }
        &.bottom {
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
}
</style>
