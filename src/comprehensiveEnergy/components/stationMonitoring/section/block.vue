<template>
    <div class="child-block" :style="{borderColor: borderColor}">
        <div class="top clearfix">
            <i class="iconfont pull-left" :class="icon" :style="{backgroundColor: borderColor}"></i>
            <div class="pull-left">
                <span class="label">{{label}}</span>
                <p  :style="{color: color}">
                    <span class="value">{{value}}</span>
                    <span class="unit">{{unit}}</span>
                </p>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        borderColor: {
            type: String
        },
        color: {
            type: String
        },
        icon: {
            type: String
        },
        label: {
            type: String,
            required: true
        },
        value: {
            default: '-'
        },
        unit: {
            type: String
        }
    }
}
</script>

<style lang="scss" scoped>
.child-block {
    border:2px solid;
    border-radius:4px;
    padding-top: 16px;
    padding-left: 16px;

    .top {
        i.iconfont {
            display: inline-block;
            width:45px;
            height:45px;
            border-radius:2px;
            text-align: center;
            line-height: 45px;
            font-size: 31px;
            margin-right: 13px;
            @include c(color, $text_c2);
        }

        .label {
            font-size: 12px;
            margin-bottom: 12px;
            display: inline-block;
            @include c(color, $text_c2);
        }

        .value {
            font-size: 24px;
        }

        .unit {
            font-size: 12px;
        }
    }
}
</style>
