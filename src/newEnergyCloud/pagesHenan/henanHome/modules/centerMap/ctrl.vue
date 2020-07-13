<template>
    <div class="ctrl">
        <henan-select class="henan-select" position="top" v-model="type" :options="typeOptions"></henan-select>
        <henan-select v-show="type === '2'" class="henan-select" position="top" v-model="target" :options="targetOptions"></henan-select>
    </div>
</template>

<script>
import HenanSelect from '../../components/HenanSelect'
export default {
    components: {
        HenanSelect
    },
    data () {
        const typeOptions = [
            {name: '分布式光伏实时出力', value: '1'},
            {name: '气象热力图', value: '2'}
        ]
        const targetOptions = [
            {name: '温度', value: '1'}
        ]
        return {
            typeOptions,
            type: typeOptions[0]?.value,
            targetOptions,
            target: targetOptions[0]?.value
        }
    }
}
</script>

<style lang="scss">
.el-popover.dark-popover {
    background-color: #000;
    border: 1px solid #333;
    color: #ccc;

    .el-popover__title {
        color: #999;
    }

    &[x-placement^="top"] {
        .popper__arrow, .popper__arrow::after{
            border-top-color: #333;
        }
    }
}
</style>

<style lang="scss" scoped>
.ctrl {
    height: max-content;

    .corner-border {
        cursor: pointer;
    }

    .map-type {
        @include c(color, $text_c1);
        vertical-align: top;
        font-size: 14px;
    }
}
.map-type-list {
    p {
        cursor: pointer;
    }
}
</style>
