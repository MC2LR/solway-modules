<template>
    <div class="real-item">
        <span :style="{width: labelWidth}" class="s8">{{label}}</span>
        <span :style="{color: color}" class="s6">{{value || '-'}}</span><sub :style="{color: color}" class="s7">{{unit}}</sub>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            required: true
        },
        unit: {
            type: String
        },
        label: {
            type: String,
            required: true
        },
        labelWidth: {
            type: String
        },
        color: {
            type: String
        }
    }
}
</script>

<style lang="scss" scoped>
.real-item {
    .s6 {
        font-size: 0.14rem;
    }

    .s7 {
        font-size: 0.12rem;
        display: inline-block;
    }

    .s8 {
        font-size: 0.12rem;
        @include c(color, #fff);
        opacity: 0.7;
        display: inline-block;
        margin-top: 0.08rem;
        width: 4.5em;
    }
}
</style>
