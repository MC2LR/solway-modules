<template>
    <div class="clock-con">
        <div class="horizon-axis">
            <div class="left">9</div>
            <div class="right">3</div>
        </div>
        <div class="vertical-axis">
            <div class="left">12</div>
            <div class="right">6</div>
        </div>
        <img src="./img/clock-circle1920.png" alt="" class="circleImg">
        <div class="circleDot"></div>
        <div class="needle hour" :style="{transform: `rotate(${h}deg)`}"></div>
        <div class="needle minute" :style="{transform: `rotate(${m}deg)`}"></div>
        <div class="needle second" :style="{transform: `rotate(${s}deg)`}"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            timer: null,
            s: 0,
            m: 0,
            h: 0
        }
    },
    mounted () {
        this.timer = setInterval(() => {
            const date = new Date()
            this.s = date.getSeconds() * 6
            this.m = date.getMinutes() * 6
            this.h = date.getHours() * 30 + date.getMinutes() / 2
        }, 1000)
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.clock-con {
    width: 140px;
    height: 140px;
    border: 3px solid #23518b;
    border-radius: 50%;
    position: relative;
    background: transparent;
    margin-left: .1rem;
    .circleImg {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
    .circleDot {
        width: 8px;
        height: 8px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 111;
        background: #5DD6DA;
        border-radius: 50%;
    }
    .horizon-axis {
        width: 100%;
        height: 12px;
        padding: 0 3px;
        font-size: 12px;
        position: absolute;
        top: 70px;
        margin-top: -6px;
        .left {
            float: left;
        }
        .right {
            float: right;
        }
    }
    .vertical-axis {
        width: 12px;
        height: 100%;
        font-size: 12px;
        position: absolute;
        left: 70px;
        margin-left: -8px;
        padding: 3px 0;
        .right {
            position: absolute;
            bottom: 0;
            left: 6px;
            margin-left: -3px;
        }
    }
    .needle {
        position: absolute;
        z-index: 1;
        transform-origin: center bottom;
    }
    .second {
        width: 4px;
        height: 42px;
        left: 68px;
        top: 27px;
        margin-left: -2px;
        background: url(./img/s1920.png) no-repeat center center;
    }
    .minute {
        width: 4px;
        height: 33px;
        left: 67px;
        top: 36px;
        z-index: 2;
        margin-left: -2px;
        background: url(./img/m1920.png) no-repeat center center;
    }
    .hour {
        width: 3px;
        height: 24px;
        left: 68px;
        top: 43px;
        z-index: 3;
        margin-left: -1.5px;
        background: url(./img/h1920.jpg) no-repeat center center;
    }
}
</style>
