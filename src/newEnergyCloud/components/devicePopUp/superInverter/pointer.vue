<template>
    <div class="pointer">
        <div :style="{width: width[0]}" class="left">0</div>
        <div :style="{width: width[1]}" class="center"></div>
        <div :style="{width: width[2]}" class="right">{{max}}</div>
        <div :style="{left: value + '%'}" class="mark"></div>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: Array
        },
        max: {
            type: Number
        },
        value: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style lang="scss" scoped>
.pointer {
    height: 20px;
    position: relative;
    border: 1px solid rgba(0,0,0,0.2);

    .left, .center, .right {
        height: 100%;
        float: left;
        color: rgba(255,255,255,0.8);
        line-height: 18px;
    }

    .left {
        background-color: rgba(92,221,102,0.5);
    }

    .center {
        background-color: #6CE1FE;
    }

    .right {
        text-align: right;
        background-color: rgba(254,84,21,0.5);
    }

    .mark {
        width: 4px;
        height: 30px;
        position: absolute;
        top: -5px;
        transform: translateX(-2px);
        background-color: rgba(0,0,0,0.3);
        border-radius: 2px;
    }
}
</style>
