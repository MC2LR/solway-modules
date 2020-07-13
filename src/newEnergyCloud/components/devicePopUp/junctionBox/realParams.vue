<template>
    <div class="real-params clearfix" v-if="data.cList">
        <div class="param-item">
            <span class="label">状态</span>
            <span class="value">{{data.statusDesc}}</span>
        </div>
        <div class="param-item">
            <span class="label">开关状态</span>
            <span class="value">{{data.kStr}}</span>
        </div>
        <div class="param-item">
            <span class="label">防雷器状态</span>
            <span class="value">{{data.arresterStr}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object
        }
    }
}
</script>

<style lang="scss" scoped>
.real-params {
    padding: 0.5em 0;

    .param-item {
        width: 18%;
        float: left;
        line-height: 1.5;
        .label {
            &::after {
                content: '：';
            }
        }
    }
}
</style>
