<template>
    <div class="hour-item">
        <i class="icon" :class="icon"></i>
        <div class="pull-left right">
            <span class="label">{{label}}</span>
            <br>
            <span class="value">{{value}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['label', 'icon', 'value']
}
</script>

<style lang="scss" scoped>
.hour-item {
    height: 50px;
    background-color: #eee;

    i.icon {
        width: 50px;
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        float: left;
        text-align: center;
        font-size: 30px;
        @include c(color, $text_c1);
        // background-color: #f00;
    }

    .right {
        line-height: 20px;
        padding-left: 10px;
        padding-top: 5px;
    }

}
</style>
