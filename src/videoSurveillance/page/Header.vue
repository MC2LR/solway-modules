<template>
    <header class="header">
        <div @click="$emit('switchCollapse', !collapse)" class="collapse">
            <span v-show="collapse">展开视频选择<i class="iconfont videozhankai"></i></span>
            <span v-show="!collapse">收起视频选择<i class="iconfont videoshouqi"></i></span>
        </div>
        <!-- <div v-if="moduleName === 'newEnergyCloud'" class="goOldVideo">
            <p @click="$router.push({path: '/iframe', query: {path: 'videoSurveillanceNew'}})">切换到2.0版本</p>
        </div> -->
        <div class="grid-icon">
            <i @click="$emit('colChange', 1)" :class="{active: col === 1}" class="iconfont videoiconbuju-"></i>
            <i @click="$emit('colChange', 2)" :class="{active: col === 2}" class="iconfont videoiconbuju-1"></i>
            <i @click="$emit('colChange', 3)" :class="{active: col === 3}" class="iconfont videoiconbuju-2"></i>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        col: {
            type: Number,
            required: true
        },
        collapse: {
            type: Boolean
        }
    },
    data () {
        return {
            moduleName: process.env.name
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    position: relative;

    .collapse {
        position: absolute;
        left: 0;
        top: 0;
        width: max-content;
        height: 50px;
        line-height: 50px;
        @include c(color, $text_c1);
        cursor: pointer;
        padding: 0 10px;

        i {
            font-size: 14px;
        }
    }

    .grid-icon {
        margin: 0 auto;
        width: max-content;
        height: 100%;
        line-height: 50px;

        .iconfont {
            font-size: 30px;
            margin: 0 20px;
            cursor: pointer;
            color:#989BA3;

            &.active {
                @include c(color, $text_c1);
            }
        }
    }
    .goOldVideo {
        float: right;
        p {
            @include c(color, $text_c1);
            line-height: 50px;
            cursor: pointer;
        }
    }
}
</style>
