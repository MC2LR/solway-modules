<template>
    <div class="section-item">
        <i class="comprehensive pull-left small" :class="icon" :style="{color: color}"></i>
        <span class="name">{{name}}</span>
        <span class="value">{{value + units}}</span>
    </div>
</template>

<script>
export default {
    props: {
        icon: {
            type: String
        },
        name: {
            type: String
        },
        units: {
            type: String
        },
        value: {
            // type: String
        },
        color: {
            type: String
        }
    },
    data () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.section-item {
    line-height: 65px;
    i {
        display: inline-block;
        margin: auto;
        width: 50px;
        height: 65px;
        font-size: 38px;
    }
    span {
        font-size: 24px;
    }
    span.name {
        margin-right: 15px;
    }
}
</style>
