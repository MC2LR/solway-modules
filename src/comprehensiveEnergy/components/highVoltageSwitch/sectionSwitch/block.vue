<template>
    <div class="block">
        <div class="one" :style="{backgroundColor: backgroundColorOpacity, borderColor: backgroundColor}">
            {{title}}
        </div>
        <div class="two clearfix" :style="{borderColor: backgroundColor}">
            <i class="iconfont pull-left" :class="icon" :style="{color: backgroundColor}"></i>
            <div class="pull-left">
                <span class="name">{{name}}</span>
                <span class="value">{{value + units}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        icon: {
            type: String
        },
        title: {
            type: String
        },
        name: {
            type: String,
            default: '-'
        },
        value: {
            default: '-'
        },
        units: {
            type: String
        },
        backgroundColor: {
            type: String
        },
        backgroundColorOpacity: {
            type: String
        }
    },
    data () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.block {
    width: 100%;
    // height: 100%;
    font-size: 24px;
    .one {
        width: 100%;
        border: 2px solid;
        padding-left: 13px;
        font-size: 16px;
        line-height: 35px;
    }
    .two {
        width: 100%;
        height: 99px;
        border: 2px solid;
        border-top: 0;
        padding: 0;
        i {
            font-size: 75px;
            display: inline-block;
            width: 80px;
            height: 100px;
            line-height: 103px;
        }
        .name {
            display: block;
            font-size: 12px;
            margin-top: 25px;
            margin-bottom: 20px;
        }
        .value {
            display: block;
            font-size: 18px;
        }
    }
}
</style>
