<template>
    <div class="henan-monitoring-top" v-show="!fullPage">
        <div class="container">
            <div class="box left">
                <left></left>
            </div>
            <div class="box center">
                <center></center>
            </div>
            <div class="box right">
                <right></right>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        left: () => import('./left'),
        center: () => import('./center'),
        right: () => import('./right')
    },
    data () {
        return {
            fullPage: false
        }
    },
    created () {
        this.$bus.on('detailFullPage', this.detailFullPage)
    },
    beforeDestroy () {
        this.$bus.off('detailFullPage', this.detailFullPage)
    },
    methods: {
        detailFullPage (data) {
            this.fullPage = data
        }
    }

}
</script>

<style lang="scss" scoped>
.henan-monitoring-top {
    padding: 0 30px;
    margin: 10px 0;

    .container {
        height: 194px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .box {
            position: relative;
            border:1px solid;
            border-image:linear-gradient(137deg, rgba(39,212,233,.36), rgba(52,64,185,.36), rgba(92,137,193,.36)) 10 10;
            background-color: rgba(15,47,80,.7);
            box-shadow:3px 2px 3px 0px rgba(0,1,1,0.36);
            box-sizing: border-box;

            &::before {
                position: absolute;
                content: '';
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                background: linear-gradient(to left, rgba(40,194,221, 1), rgba(40,194,221, 1)) left top no-repeat,
                            linear-gradient(to bottom, rgba(40,194,221, 1), rgba(40,194,221, 1)) left top no-repeat,
                            linear-gradient(to left, rgba(40,194,221, 1), rgba(40,194,221, 1)) right bottom no-repeat,
                            linear-gradient(to left, rgba(40,194,221, 1), rgba(40,194,221, 1)) right bottom no-repeat;
                background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
            }
        }

        .left {
            width: 36%;
        }

        .center {
            width: 35%;
        }

        .right {
            width: 25%;
        }
    }
}
</style>
