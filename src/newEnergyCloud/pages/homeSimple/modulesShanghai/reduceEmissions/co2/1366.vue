<template>
    <div class="bottom clearfix">
        <img src="./co21366.png" class="base-img">
        <img src="./co2line11366.png" class="line line1">
        <img src="./co2line11366.png" class="line line2">
        <img src="./co2line21366.png" class="line line3">
        <img src="./co2line21366.png" class="line line4">
        <div class="dot dot1"></div>
        <div class="dot dot2"></div>
        <div class="dot dot3"></div>
        <div class="dot dot4"></div>
        <div class="word word1">CO₂</div>
        <div class="word word2">CO₂</div>
        <div class="word word3">CO₂</div>
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
.line {
    position: absolute;
}
.line1 {
    top: -21px;
    left: 41px;
    animation: co2Line1 1.8s infinite linear;
    transform: translate3d(0, 0, 0);
}
.line2 {
    top: -4px;
    left: 20px;
    animation: co2Line2 1.8s 1s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.line3 {
    top: -26px;
    left: 28px;
    animation: co2Line3 1.8s 1.5s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.line4 {
    top: 5px;
    left: 35px;
    animation: co2Line4 1.8s 2s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
// @keyframes co2Line1 {
//     0% { top: -21px; opacity: 1; }
//     100% { top: -36px; opacity: 0; }
// }
@keyframes co2Line1 {
    0% { transform: translateY(-5px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

// @keyframes co2Line2 {
//     0% { top: -4px; opacity: 1; }
//     100% { top: -19px; opacity: 0; }
// }
@keyframes co2Line2 {
    0% { transform: translateY(-2px); opacity: 1; }
    100% { transform: translateY(-17px); opacity: 0; }
}

// @keyframes co2Line3 {
//     0% { top: -26px; opacity: 1; }
//     100% { top: -41px; opacity: 0; }
// }
@keyframes co2Line3 {
    0% { transform: translateY(-10px); opacity: 1; }
    100% { transform: translateY(-25px); opacity: 0; }
}

// @keyframes co2Line4 {
//     0% { top: 5px; opacity: 1; }
//     100% { top: -10px; opacity: 0; }
// }
@keyframes co2Line4 {
    0% { transform: translateY(5px); opacity: 1; }
    100% { transform: translateY(-10px); opacity: 0; }
}
.dot {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
}
.dot1 {
    top: 5px;
    left: 6px;
    background: #23F9FC;
    animation: co2Dot1 1.8s infinite linear;
    transform: translate3d(0, 0, 0);
}
.dot2 {
    top: 19px;
    left: 28px;
    background: #23F9FC;
    animation: co2Dot2 1.8s 1s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.dot3 {
    top: 21px;
    left: 20px;
    background: #885CF0;
    animation: co2Dot3 1.8s 1.5s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.dot4 {
    top: -6px;
    left: 54px;
    background: #885CF0;
    animation: co2Dot4 1.8s 2s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
// @keyframes co2Dot1 {
//     0% { top: 5px; opacity: 1; }
//     100% { top: -10px; opacity: 0; }
// }
@keyframes co2Dot1 {
    0% { transform: translateY(7px); opacity: 1; }
    100% { transform: translateY(-8px); opacity: 0; }
}

// @keyframes co2Dot2 {
//     0% { top: 19px; opacity: 1; }
//     100% { top: 4px; opacity: 0; }
// }
@keyframes co2Dot2 {
    0% { transform: translateY(5px); opacity: 1; }
    100% { transform: translateY(-10px); opacity: 0; }
}

// @keyframes co2Dot3 {
//     0% { top: 21px; opacity: 1; }
//     100% { top: 6px; opacity: 0; }
// }
@keyframes co2Dot3 {
    0% { transform: translateY(6px); opacity: 1; }
    100% { transform: translateY(-9px); opacity: 0; }
}

// @keyframes co2Dot4 {
//     0% { top: -6px; opacity: 1; }
//     100% { top: -21px; opacity: 0; }
// }
@keyframes co2Dot4 {
    0% { transform: translateY(6px); opacity: 1; }
    100% { transform: translateY(-9px); opacity: 0; }
}

.word {
    position: absolute;
    font-size: 12px;
}
.word1 {
    top: -19px;
    left: 3px;
    color: #23F9FC;
    animation: co2Word1 1.8s 1s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.word2 {
    top: 14px;
    left: 46px;
    color: #23F9FC;
    animation: co2Word2 1.8s 1.5s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.word3 {
    top: -36px;
    left: 38px;
    color: #885CF0;
    animation: co2Word3 1.8s infinite linear;
    transform: translate3d(0, 0, 0);
}
// @keyframes co2Word1 {
//     0% { top: -19px; opacity: 1; }
//     100% { top: -34px; opacity: 0; }
// }
@keyframes co2Word1 {
    0% { transform: translateY(5px); opacity: 1; }
    100% { transform: translateY(-10px); opacity: 0; }
}

// @keyframes co2Word2 {
//     0% { top: 14px; opacity: 1; }
//     100% { top: -1px; opacity: 0; }
// }
@keyframes co2Word2 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-15px); opacity: 0; }
}

// @keyframes co2Word3 {
//     0% { top: -36px; opacity: 1; }
//     100% { top: -51px; opacity: 0; }
// }
@keyframes co2Word3 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-15px); opacity: 0; }
}
</style>
