<template>
    <div class="group-string" v-if="data.cList">
        <div class="title">光伏组串电流（A）</div>
        <div class="string clearfix">
            <div class="item" v-for="item in data.cList.length" :key="item">
                <i>{{item}}</i>
                <span :class="{shadow: data.cList[item - 1].shadowFlag}" :style="{color: colors[data.cList[item - 1].statuFlag]}">
                    {{(data.cList[item - 1].statuFlag === 0 ? '-' : ((data['c' + item] + '') || '-') + '').substr(0, 5)}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            colors: ['#ccc', 'rgb(219, 65, 47)', 'rgb(255, 153, 0)', 'rgb(63, 173, 34)']
        }
    }
}
</script>

<style lang="scss" scoped>
.group-string {
    margin-top: 10px;
    .title {
        font-size: 16px;
    }

    .string {
        .item {
            width: 10%;
            float: left;
            margin-top: 10px;

            i {
                vertical-align: bottom;
                display: inline-block;
                width: 26px;
                height: 26px;
                line-height: 26px;
                text-align: center;
                font-style: normal;
                background-color: #fff;
            }

            span {
                display: inline-block;
                width: 50px;
                border-bottom: 2px solid #fff;
                height: 26px;
                line-height: 24px;

                &.shadow {
                    background-color: rgba(0, 0, 0, .4);
                }
            }
        }
    }
}
</style>
