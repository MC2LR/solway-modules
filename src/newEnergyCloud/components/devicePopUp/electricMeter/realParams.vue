<template>
    <div class="real-params clearfix" v-if="data.statusDesc || data.name">
        <div class="param-item">
            <span class="label">状态</span>
            <span class="value">{{data.statusDesc}}</span>
        </div>
        <div class="param-item">
            <span class="label">总电能</span>
            <span class="value">{{data.w}}</span>
        </div>
        <div class="param-item">
            <span class="label">正向总电能</span>
            <span class="value">{{data.wp}}</span>
        </div>
        <div class="param-item">
            <span class="label">反向总电能</span>
            <span class="value">{{data.wn}}</span>
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
