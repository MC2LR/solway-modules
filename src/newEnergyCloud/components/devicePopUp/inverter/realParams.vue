<template>
    <div class="real-params clearfix" v-if="data.cList || data.acc_kw">
        <div class="param-item">
            <span class="label">状态</span>
            <span class="value">{{data.statusDesc}}</span>
        </div>
        <div class="param-item">
            <span class="label">容量</span>
            <span class="value">{{data.acc_kw}}kW</span>
        </div>
        <div class="param-item">
            <span class="label">出力</span>
            <span class="value">{{(data.acp / data.acc_kw * 100).toFixed(1)}}%</span>
        </div>
        <div class="param-item">
            <span class="label">总发电量</span>
            <span class="value">{{data.tw.join('')}}</span>
        </div>
        <div class="param-item">
            <span class="label">日发电量</span>
            <span class="value">{{data.dw.join('')}}</span>
        </div>
        <div class="param-item">
            <span class="label">温度</span>
            <span class="value">{{data.t.toFixed(1)}}℃</span>
        </div>
        <div class="param-item">
            <span class="label">无功功率</span>
            <span class="value">{{data.acq.toFixed(1)}}kVar</span>
        </div>
        <div class="param-item">
            <span class="label">效率</span>
            <span class="value">{{(data.ef * 100).toFixed()}}%</span>
        </div>
        <div class="param-item">
            <span class="label">频率</span>
            <span class="value">{{data.f.toFixed(2)}}Hz</span>
        </div>
        <div class="param-item">
            <span class="label">功率因数</span>
            <span class="value">{{data.pf.toFixed(2)}}</span>
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
