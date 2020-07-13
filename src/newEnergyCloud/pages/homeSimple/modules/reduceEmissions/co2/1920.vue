<template>
    <div class="bottom clearfix">
        <img src="./co21920.png" class="base-img">
        <img src="./co2line11920.png" class="line line1">
        <img src="./co2line11920.png" class="line line2">
        <img src="./co2line21920.png" class="line line3">
        <img src="./co2line21920.png" class="line line4">
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
    top: -33px;
    left: 60px;
    animation: co2Line1 2s infinite linear;
    transform: translate3d(0, 0, 0);
}
.line2 {
    top: -15px;
    left: 22px;
    animation: co2Line2 2s 1s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.line3 {
    top: -40px;
    left: 39px;
    animation: co2Line3 2s 1.5s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.line4 {
    top: -7px;
    left: 45px;
    animation: co2Line4 2s 2s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
// @keyframes co2Line1 {
//     0% { top: -33px; opacity: 1; }
//     100% { top: -53px; opacity: 0; }
// }
@keyframes co2Line1 {
    0% { transform: translateY(2px); opacity: 1; }
    100% { transform: translateY(-18px); opacity: 0; }
}

// @keyframes co2Line2 {
//     0% { top: -15px; opacity: 1; }
//     100% { top: -35px; opacity: 0; }
// }
@keyframes co2Line2 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

// @keyframes co2Line3 {
//     0% { top: -40px; opacity: 1; }
//     100% { top: -60px; opacity: 0; }
// }
@keyframes co2Line3 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

// @keyframes co2Line4 {
//     0% { top: -7px; opacity: 1; }
//     100% { top: -27px; opacity: 0; }
// }
@keyframes co2Line4 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

.dot {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
}
.dot1 {
    top: 8px;
    left: 10px;
    background: #23F9FC;
    animation: co2Dot1 2s infinite linear;
    transform: translate3d(0, 0, 0);
}
.dot2 {
    top: 24px;
    left: 33px;
    background: #23F9FC;
    animation: co2Dot2 2s 1s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.dot3 {
    top: 30px;
    left: 22px;
    background: #885CF0;
    animation: co2Dot3 2s 1.5s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.dot4 {
    top: -5px;
    left: 74px;
    background: #885CF0;
    animation: co2Dot4 2s 2s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
// @keyframes co2Dot1 {
//     0% { top: 8px; opacity: 1; }
//     100% { top: -12px; opacity: 0; }
// }
@keyframes co2Dot1 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

// @keyframes co2Dot2 {
//     0% { top: 24px; opacity: 1; }
//     100% { top: 4px; opacity: 0; }
// }
@keyframes co2Dot2 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

// @keyframes co2Dot3 {
//     0% { top: 30px; opacity: 1; }
//     100% { top: 10px; opacity: 0; }
// }
@keyframes co2Dot3 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

// @keyframes co2Dot4 {
//     0% { top: -5px; opacity: 1; }
//     100% { top: -25px; opacity: 0; }
// }
@keyframes co2Dot4 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

.word {
    position: absolute;
    font-size: 12px;
}
.word1 {
    top: -19px;
    left: 10px;
    color: #23F9FC;
    animation: co2Word1 2s 1s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.word2 {
    top: 19px;
    left: 58px;
    color: #23F9FC;
    animation: co2Word2 2s 1.5s infinite linear;
    transform: translate3d(0, 0, 0);
    opacity: 0;
}
.word3 {
    top: -37px;
    left: 54px;
    color: #885CF0;
    animation: co2Word3 2s infinite linear;
    transform: translate3d(0, 0, 0);
}
// @keyframes co2Word1 {
//     0% { top: -19px; opacity: 1; }
//     100% { top: -39px; opacity: 0; }
// }
@keyframes co2Word1 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

// @keyframes co2Word2 {
//     0% { top: 19px; opacity: 1; }
//     100% { top: -1px; opacity: 0; }
// }
@keyframes co2Word2 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}

// @keyframes co2Word3 {
//     0% { top: -37px; opacity: 1; }
//     100% { top: -57px; opacity: 0; }
// }
@keyframes co2Word3 {
    0% { transform: translateY(0px); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
}
</style>
