<template>
    <div class="child-block" ref='childBlock' :style="{background: background}">
        <div class="left-con" :style="{marginLeft: mLsIcon + 'px'}">
            <i class="iconfont pull-left small" :class="icon"></i>
        </div>
        <div class="right-con" :style="{marginLeft: marginLeft + 'px'}">
            <div class="name">{{name}}</div>
            <div class="value">{{value + units}}</div>
        </div>
        <i class="iconfont big" :class="icon" :style="{right: right + 'px', top: top + 'px'}"></i>
    </div>
</template>

<script>
export default {
    props: {
        icon: {
            type: String
        },
        name: {
            type: String
        },
        units: {
            type: String,
            default: ''
        },
        value: {
            // type: String
            default: ''
        },
        background: {
            type: String
        },
        right: {
            type: String
        },
        top: {
            type: String
        },
        marginLeft: {
            type: String,
            default: ''
        },
        mLsIcon: {
            type: String,
            default: ''
        }
    },
    data () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.child-block {
    height: 100%;
    overflow: hidden;
    position: relative;
    .left-con {
        height: 100%;
        line-height: 118px;
        float: left;
        text-align: center;
        padding: 0 10px;
        i.small {
            display: inline-block;
            width: 100%;
            height: 60px;
            font-size: 65px;
            margin: auto;
        }
    }
    .right-con {
        float: left;
        height: 100%;
        padding: 23px 0 30px 0;
        .name {
            font-size: 20px;
            margin-bottom: 23px;
            opacity: .8;
        }
        .value {
            font-size: 30px;
        }
    }
    i.big {
        display: inline-block;
        width: 100px;
        height: 130px;
        line-height: 130px;
        text-align: center;
        font-size: 150px;
        position: absolute;
        // right: -22px;
        // top: 0px;
        opacity: .2;
    }
}
</style>
