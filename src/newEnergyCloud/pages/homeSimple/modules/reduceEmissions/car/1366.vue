<template>
    <div class="bottom" style="width: max-content;overflow: hidden;">
        <img src="./car1366.png" class="base-img">
        <i class="iconfont icon-car"></i>
        <div class="line-con">
            <div class="line"></div>
        </div>
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
.base-img {
    vertical-align: bottom;
}
.icon-qiehuan {
    display: block;
    float: right;
    color: #4CD362;
    padding: 0 7px;
    margin-top: -2px;
}
.icon-car {
    color: #4CD362;
    position: absolute;
    bottom: 10%;
    left: 25%;
    transform: translate3d(0, 0, 0);
    animation: carMove 3s infinite linear;
}
// @keyframes carMove {
//     0% { left: 5%; }
//     100% { left: 100%; }
// }
@keyframes carMove {
    0% { transform: translate(-30px); }
    100% { transform: translate(115px); }
}
.line-con {
    width: 62%;
    height: 3px;
    position: absolute;
    bottom: 3px;
    left: 31%;
    overflow: hidden;
    .line {
        width: 110%;
        height: 3px;
        background: #4CD362;
        position: absolute;
        // bottom: 4%;
        bottom: 0px;
        left: -10%;
        transform: translate3d(0, 0, 0);
        animation: carLineMove 3s infinite cubic-bezier(0.8, 0.7, 0.7, 1);
    }
}

@keyframes carLineMove {
    0% { width: 0%; }
    100% { width: 110%; }
}
</style>
