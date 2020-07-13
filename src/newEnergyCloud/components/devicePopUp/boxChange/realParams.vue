<template>
    <div class="real-params clearfix" v-if="data.statusDesc || data.ta">
        <div class="param-item">
            <span class="label">状态</span>
            <span class="value">{{data.statusDesc}}</span>
        </div>
        <div class="param-item">
            <span class="label">A相温度</span>
            <span class="value">{{data.ta}}℃</span>
        </div>
        <div class="param-item">
            <span class="label">B相温度</span>
            <span class="value">{{data.tb}}℃</span>
        </div>
        <div class="param-item">
            <span class="label">C相温度</span>
            <span class="value">{{data.tc}}℃</span>
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
