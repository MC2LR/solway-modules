<template>
    <div class="header">
        <span class="name">蓝景丽家绿色家装市场</span>
        <div class="mask"></div>
        <div class="advertise pull-right">
            <span>双11没抢到？没关系。双12还有，最高直减10000元，火速收入囊中</span>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.header {
    height: 0.67rem;
    background:rgba(0,62,154,.4);
    box-shadow:0px 3px 3px 0px rgba(0,1,1,0.23);
    font-size: 0.22rem;
    line-height: 0.67rem;
    padding-left: 0.37rem;
    padding-right: 0.27rem;
    position: relative;
    .name {
        position: absolute;
        z-index: 2;
    }
    .mask {
        width: 100%;
        height: 100%;
        padding-left: 0.37rem;
        padding-right: 0.27rem;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        background-image: linear-gradient(to right, rgba(5, 48, 84, .4), transparent,transparent, rgba(5, 48, 84, .7) 50%, transparent,transparent,transparent,transparent, rgba(5, 48, 84, .7) 95%);
    }
    .advertise {
        width: 50%;
        height: 100%;
        overflow: hidden;
        position: relative;
        .mask {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            // background-image: linear-gradient(to right, rgba(5, 48, 84, .6), transparent, transparent, transparent, rgba(5, 48, 84, .6));
        }

        span {
            color: #fecd69;
            position: absolute;
            right: 0;
            top: 0;
            min-width: 100%;
            width: max-content;
            word-break: keep-all;
            animation: run 10s linear 0s infinite;
        }
    }
}

@keyframes run {
    0% {
        right: -100%;
    }
    100% {
        right: 100%;
    }
}
</style>
