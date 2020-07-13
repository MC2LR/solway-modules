<template>
    <div class="block-item">
        <span class="label">{{label}}</span>
        <div v-if="isBreak"></div>
        <span class="value">{{value || '-'}}</span><span class="unit">{{unit}}</span>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String
        },
        value: {
            default: '-'
        },
        unit: {
            type: String
        },
        break: {
            type: Boolean,
            default: false
        }
    },
    // data () {
    //     return {
    //         isBreak: this.break
    //     }
    // },
    computed: {
        isBreak () {
            return this.break
        }
    }
}
</script>

<style lang="scss" scoped>
.block-item {
    @include c(color, $text_c2);
    display: inline-block;

    .label {
        margin-right: 13px;
        font-size: 12px;
    }

    .value {
        font-size: 12px;
    }

    .unit {
        font-size: 12px;
    }
}
</style>
