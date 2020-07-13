<template>
    <div class="henan-select">
        <div @click.stop="showList = !showList" class="show-view">
            <span>{{(options.find(v => v.value === value) || {}).name}}</span>
            <i class="iconfont henansanjiaoxing"></i>
        </div>
        <div v-show="showList" class="list" :class="position">
            <p @click="$emit('input', item.value);$emit('change', item.value)" v-for="item in options" :key="item.value">{{item.name}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        position: {
            type: String,
            default: 'bottom'
        },
        options: {
            type: Array,
            default () {
                return []
            }
        },
        value: {
            type: [Number, String]
        }
    },
    data () {
        return {
            showList: false
        }
    },
    mounted () {
        document.addEventListener('click', this.hideList)
    },
    methods: {
        hideList () {
            this.showList = false
        }
    },
    beforeDestroy () {
        document.removeEventListener('click', this.hideList)
    }
}
</script>

<style lang="scss" scoped>
.henan-select {
    display: inline-block;
    width: 170px;
    height: 19px;
    line-height: 19px;
    font-size: 14px;
    background:linear-gradient(to right, rgba(40,189,217,.5), transparent);
    color: rgba(69,228,247,.8);
    padding-left: 5px;
    position: relative;

    // &:hover {
    //     .list {
    //         height: 60px;
    //         max-height: 200px;
    //         overflow-y: auto;
    //     }
    // }

    .show-view {
        cursor: pointer;
    }

    .list {
        position: absolute;
        width: 100%;
        height: max-content;
        overflow: hidden;
        left: 0;
        transition: all .5s ease;

        &.bottom {
            top: 19px;
        }
        &.top {
            bottom: 19px;
        }

        p {
            background-color: rgba(40,189,217,.5);
            margin: 1px 0;
            cursor: pointer;
            padding-left: 5px;
            color: #fff;

            &:hover {
                color: rgba(69,228,247,.8);
            }
        }
    }
}
</style>
