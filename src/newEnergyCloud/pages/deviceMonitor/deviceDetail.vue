<template>
    <div class="detail clearfix">
        <div class="item">
            <span class="label">装机容量</span>
            <span>{{data.acc_kw}}</span>
            <span>{{units.acc_kw}}</span>
        </div>
        <div v-for="item in deviceParams" :key="item.value" class="item">
            <span class="label">{{item.label}}</span>
            <span>{{data[item.value]}}</span>
            <span>{{units[item.value]}}</span>
        </div>
    </div>
</template>

<script>
import {deviceParams} from './handle'
export default {
    props: ['data', 'units'],
    data () {
        return {
            deviceParams
        }
    }
}
</script>

<style lang="scss" scoped>
.detail {
    color: #333;
    padding: 20px;

    .item {
        width: 33%;
        float: left;
        line-height: 3;

        .label {
            display: inline-block;
            width: 100px;
        }
    }
}
</style>
