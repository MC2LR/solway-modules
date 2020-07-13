<template>
    <div class="energy-saving">
        <p class="family">可供 <span class="number">{{(electricity / 3 / 365).toFixed() || '-'}}</span> <span class="unit">户</span> 家庭一年用电</p>
        <p class="car">可供电动汽车北京往返上海 <span class="number">{{(electricity / 18 * 100 / 2176).toFixed() || '-'}}</span> <span class="unit">次</span></p>
        <div class="animation">
            <i class="comprehensive iconcar"></i>
            <div class="line"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        electricity: {
            type: Number
        }
    }
}
</script>

<style lang="scss" scoped>
.energy-saving {
    font-size: 0.14rem;
    line-height: 1.5;

    .family, .car {
        span.number {
            font-size: 0.16rem;
        }
    }

    .family {
        span {
            color: #7CED69;
        }
    }

    .car {
        span {
            color: #FEC658;
        }
    }

    .animation {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 1.6rem;
        height: 100%;
        border-bottom: 3px solid #FEC658;
        overflow-x: hidden;
        overflow-y: visible;

        i.iconcar {
            position: absolute;
            bottom: -0.01rem;
            left: 0;
            font-size: 0.15rem;
            color: #FEC658;
            animation: car 3s linear 0s infinite;
        }

        .line {
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0px;
            height: 3px;
            background-color: #FEC658;

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                height: 3px;
                background-color: #fff;
                animation: lineAnimation 3s linear 0s infinite;
            }
        }
    }
}

@keyframes car {
    0% {
        left: -1.5em;
    }
    100% {
        left: 1.6rem;
    }
}

@keyframes lineAnimation {
    0% {
        width: 0rem;
    }
    100% {
        width: 1.75rem;
    }
}
</style>
