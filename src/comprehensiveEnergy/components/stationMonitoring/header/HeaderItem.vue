<template>
    <div class="header-item">
        <span class="value">{{value}}</span><span class="unit">{{unit}}</span>
        <br>
        <span class="label">{{label}}</span>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            default: '-'
        },
        unit: {
            type: String
        },
        label: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.header-item {
    display: inline-block;
    padding: 5px;
    line-height: 25px;

    .value {
        font-size: 16px;
    }

    .unit {
        font-size: 12px;
    }

    .label {
        font-size: 12px;
        @include c(color, $text_c2);
    }
}
</style>
