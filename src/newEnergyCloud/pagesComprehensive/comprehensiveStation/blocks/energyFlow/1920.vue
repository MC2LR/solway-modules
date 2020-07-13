<template>
    <div class="energy-flow">
        <div class="imgWidthHeight">
            <img src="./1920.png" alt="储能图">
            <i class="comprehensive iconbianyaqidian-"></i>
            <div class="sliders">
                <div class="slider"></div>
                <div class="slider"></div>
                <div class="slider"></div>

                <div class="slider"></div>
                <div class="slider"></div>
                <div class="slider"></div>

                <div class="slider"></div>
                <div class="slider"></div>
                <div class="slider"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.energy-flow {
    position: relative;

    .imgWidthHeight {
        position: absolute;
        width: 413px;
        height: 108px;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;

        i.iconbianyaqidian- {
            position: absolute;
            font-size: 45px;
            right: 31px;
            top: 39px;
            color: #EFA96F;

            text-shadow: 0px 0px 30px #EFA96F;
            animation: shan 2s linear infinite alternate;
        }

        .sliders {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;

            .slider {
                position: absolute;
                left: 75px;
                opacity: 0;
                width: 15px;
                background-color: #57DFE6;

                &:nth-child(1), &:nth-child(2), &:nth-child(3){
                    height: 3px;
                    top: 42px;
                }

                &:nth-child(1) {
                    animation: slider 5s linear infinite;
                }

                &:nth-child(2) {
                    animation: slider 5s linear 0.8s infinite;
                }

                &:nth-child(3) {
                    animation: slider 5s linear 1.4s infinite;
                }

                &:nth-child(4), &:nth-child(5), &:nth-child(6){
                    height: 4px;
                    top: 59px;
                }

                &:nth-child(4) {
                    animation: slider 5s linear 2.1s infinite;
                }

                &:nth-child(5) {
                    animation: slider 5s linear 3.9s infinite;
                }

                &:nth-child(6) {
                    animation: slider 5s linear 2.5s infinite;
                }

                &:nth-child(7), &:nth-child(8), &:nth-child(9){
                    height: 4px;
                    top: 77px;
                }

                &:nth-child(7) {
                    animation: slider 5s linear 0.5s infinite;
                }

                &:nth-child(8) {
                    animation: slider 5s linear 1.1s infinite;
                }

                &:nth-child(9) {
                    animation: slider 5s linear 1.5s infinite;
                }
            }
        }
    }
}
@keyframes shan {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}
@keyframes slider {
    0% {
        left: 75px;
        opacity: 0;
    }

    49% {
        left: 75px;
        opacity: 0;
    }

    50% {
        left: 75px;
        opacity: 1;
    }

    100% {
        opacity: 1;
        left: 295px;
    }
}
</style>
