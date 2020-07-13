<template>
    <div class="round round-animation">
        <div class="circle"></div>
        <div class="circle_bottom animation "></div>
        <div class="circle_bottom2 animation2 "></div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.round {
    display: inline-block;
    position: relative;
    padding: 0.01rem;
    vertical-align: top;
}

.round div {
    background: #459F3E;
}

.round div:first-child {
    width: 0.08rem;
    height: 0.08rem;
}

.round div:nth-child(2) {
    width: 0.08rem;
    height: 0.08rem;
}

.round div:last-child {
    width: 0.14rem;
    height: 0.14rem;
}

.circle {
    background: #459F3E;
    border-radius: 100%;
    width: 0.08rem;
    height: 0.08rem;
    z-index: 999;
    text-align: center;
    top: 0.04rem;
    left: 0.04rem;
    position: absolute;
}

.circle_bottom {
    background: rgba(#459F3E, 0.4);
    border-radius: 100%;
    width: 0.08rem;
    height: 0.08rem;
    filter: alpha(opacity=40);
    z-index: -100;
    position: absolute;
    top: 0.04rem;
    left: 0.04rem;
}

.circle_bottom2 {
    background: rgba(#459F3E, 0.2);
    border-radius: 100%;
    width: 0.14rem;
    height: 0.14rem;
    filter: alpha(opacity=20);
    z-index: -110;
    position: relative;
}

.animation {
    animation: twinkling 2.1s infinite ease-in-out;
    animation-fill-mode: both;
}

.animation2 {
    animation: twinkling 2.1s infinite ease-in-out;
    animation-fill-mode: both;
}

@keyframes twinkling {
    0% {
        opacity: 0.2;
        transform: scale(1);
    }

    50% {
        opacity: 0.5;
        transform: scale(1.12);
    }

    100% {
        opacity: 0.2;
        transform: scale(1);
    }
}
</style>
