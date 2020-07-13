<template>
    <div class="outer">
        <div class="img-w-h">
            <img src="./1920.png" alt="光伏电池板">
            <div v-show="acp" class="gradation"></div>
            <div v-show="acp" class="lines">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            acp: 0
        }
    },
    created () {
        this.$bus.on('monitoringData', this.getData)
    },
    methods: {
        getData (res) {
            this.acp = res.body.day.data.acp
        }
    },
    beforeDestroy () {
        this.$bus.off('monitoringData', this.getData)
    }
}
</script>

<style lang="scss" scoped>
.outer {
    position: relative;

    .img-w-h {
        width: 330px;
        height: 157px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

    .gradation {
        width: 90%;
        height: 105%;
        background-image: linear-gradient(135deg, rgba(254,205,105,0.43), transparent, transparent);
        position: absolute;
        left: 10%;
        top: 8%;
        transform: rotate(52deg) translateX(50px) skewY(-30deg);
        animation: gradation 3s linear 0s infinite;
    }

    .lines {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        .line {
            position: absolute;
            width: 17px;
            height: 1px;
            background-color: #FECD69;

            &:nth-child(1), &:nth-child(2), &:nth-child(3), &:nth-child(4) {
                right: 43%;
                animation: rightRun 3s linear 0s infinite;
            }

            &:nth-child(5), &:nth-child(6), &:nth-child(7), &:nth-child(8) {
                left: 43%;
                animation: leftRun 3s linear 0s infinite;
            }

            &:nth-child(1) {
                top: 80%;
                animation-delay: 1s;
            }

            &:nth-child(2) {
                top: 70%;
                animation-delay: 0.7s;
            }

            &:nth-child(3) {
                top: 75%;
                animation-delay: 1.7s;
            }

            &:nth-child(4) {
                top: 85%;
                animation-delay: 2.7s;
            }

            &:nth-child(5) {
                top: 70%;
                animation-delay: 0.7s;
            }

            &:nth-child(6) {
                top: 75%;
                animation-delay: 1.7s;
            }

            &:nth-child(7) {
                top: 80%;
                animation-delay: 2.7s;
            }

            &:nth-child(8) {
                top: 85%;
                animation-delay: 1.2s;
            }
        }
    }
}

@keyframes leftRun {
    0% {
        left: 43%;
    }
    100% {
        left: 0%;
    }
}

@keyframes rightRun {
    0% {
        right: 43%;
    }
    100% {
        right: 0%;
    }
}

@keyframes gradation {
    0% {
        background-image: linear-gradient(135deg, rgba(254,205,105,0.43), transparent, transparent, transparent, transparent, transparent);
    }
    50% {
        background-image: linear-gradient(135deg, rgba(254,205,105,0.43), transparent, transparent, transparent);
    }
    75% {
        background-image: linear-gradient(135deg, rgba(254,205,105,0.43), transparent, transparent);
    }
    100% {
        background-image: linear-gradient(135deg, rgba(254,205,105,0.43), transparent, transparent);
    }
}
</style>
