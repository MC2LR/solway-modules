<template>
    <div class="bottom clearfix">
        <img src="./o21920.png" class="base-img">
        <div class="word word1">O₂</div>
        <div class="word word2">O₂</div>
        <div class="word word3">O₂</div>
        <div class="word word4">O₂</div>
        <div class="word word5">O₂</div>
        <div class="dot dot1"></div>
        <div class="dot dot2"></div>
        <div class="dot dot3"></div>
        <div class="dot dot4"></div>
        <div class="dot dot5"></div>
        <div class="dot dot6"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    }
}
</script>

<style lang="scss" scoped>
.clearfix:before, .clearfix:after {
    content: '';
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
}
.bottom {
    width: max-content;
    height: max-content;
}
.base-img {
    display: block;
    float: left;
}
.word {
    position: absolute;
    font-size: 12px;
    color: #5FFF64;
}
.word1 {
    top: 25px;
    left: 10px;
    animation: o2Word1 2s infinite linear;
    transform: translate3d(0, 0, 0);
}
.word2 {
    top: 14px;
    left: 39px;
    animation: o2Word2 2s 1s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.word3 {
    top: -8px;
    left: 59px;
    animation: o2Word3 2s 1.5s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.word4 {
    top: 20px;
    left: 68px;
    animation: o2Word4 2s 2s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.word5 {
    top: 64px;
    left: 60px;
    animation: o2Word5 2s 2.5s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
// @keyframes o2Word1 {
//     0% { top: 25px; opacity: 1; }
//     100% { top: 5px; opacity: 0; }
// }
@keyframes o2Word1 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

// @keyframes o2Word2 {
//     0% { top: 14px; opacity: 1; }
//     100% { top: -6px; opacity: 0; }
// }
@keyframes o2Word2 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

// @keyframes o2Word3 {
//     0% { top: -8px; opacity: 1; }
//     100% { top: -28px; opacity: 0; }
// }
@keyframes o2Word3 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

// @keyframes o2Word4 {
//     0% { top: 20px; opacity: 1; }
//     100% { top: 0px; opacity: 0; }
// }
@keyframes o2Word4 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

// @keyframes o2Word5 {
//     0% { top: 64px; opacity: 1; }
//     100% { top: 44px; opacity: 0; }
// }
@keyframes o2Word5 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

.dot {
    position: absolute;
    width: 3px;
    height: 3px;
    background: #5FFF64;
}
.dot1 {
    top: 34px;
    left: 31px;
    animation: o2Dot1 2s infinite linear;
    transform: translate3d(0, 0, 0);
}
.dot2 {
    top: 49px;
    left: 38px;
    animation: o2Dot2 2s 1s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.dot3 {
    top: 57px;
    left: 57px;
    animation: o2Dot3 2s 1.5s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.dot4 {
    top: 42px;
    left: 67px;
    animation: o2Dot4 2s 2s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.dot5 {
    top: 42px;
    left: 88px;
    animation: o2Dot5 2s 2.5s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.dot6 {
    top: 70px;
    left: 24px;
    animation: o2Dot6 2s 3s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
// @keyframes o2Dot1 {
//     0% { top: 34px; opacity: 1; }
//     100% { top: 14px; opacity: 0; }
// }
@keyframes o2Dot1 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

// @keyframes o2Dot2 {
//     0% { top: 49px; opacity: 1; }
//     100% { top: 29px; opacity: 0; }
// }
@keyframes o2Dot2 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

// @keyframes o2Dot3 {
//     0% { top: 49px; opacity: 1; }
//     100% { top: 29px; opacity: 0; }
// }
@keyframes o2Dot3 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

// @keyframes o2Dot4 {
//     0% { top: 42px; opacity: 1; }
//     100% { top: 22px; opacity: 0; }
// }
@keyframes o2Dot4 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

// @keyframes o2Dot5 {
//     0% { top: 42px; opacity: 1; }
//     100% { top: 22px; opacity: 0; }
// }
@keyframes o2Dot5 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

// @keyframes o2Dot6 {
//     0% { top: 70px; opacity: 1; }
//     100% { top: 50px; opacity: 0; }
// }
@keyframes o2Dot6 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}
</style>
