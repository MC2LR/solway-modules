<template>
    <div class="energy-flow-chart clearfix" :class="color">
        <i class="comprehensive icondianchi-" :class="'s' + useStatus"></i>
        <i class="comprehensive iconbianyaqikong-"></i>
        <i class="comprehensive iconbianyaqidian-" :class="{shan: remain && (useStatus !== '03')}"></i>
        <div class="line line1">
            <div :class="remain ? 's' + useStatus : 'history'">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="line line2">
            <div :class="remain ? 's' + useStatus : 'history'">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="line line3">
            <div :class="remain ? 's' + useStatus : 'history'">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="remain">
            <span class="label">SOC</span>
            <span class="value">{{remain || historyRemain}}%</span>
        </div>
        <div class="battery-grid">
            <div :style="{height: (remain || historyRemain) + '%'}" :class="['s' + useStatus, remain ? 'remain' : '']">
                <div>
                    <div class="grid" v-for="item in 10" :key="item"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        remain: {
            default: ''
        },
        historyRemain: {
            default: ''
        },
        useStatus: {
            type: String,
            default: '03'
        }
    },
    computed: {
        color () {
            const value = this.remain || this.historyRemain
            if (value > 70) return 'green'
            if (value > 50) return 'orange'
            if (value > 30) return 'yellow'
            return 'red'
        }
    }
}
</script>

<style lang="scss" scoped>
@-moz-document url-prefix() {
    .energy-flow-chart i.icondianchi- {
        position: relative;
        top: 5px;
    }
    .energy-flow-chart i.iconbianyaqikong- {
        position: relative;
        top: 2px;
    }
}
.energy-flow-chart {
    position: relative;

    >.remain {
        position: absolute;
        top: -25px;
        left: 75px;

        .label {
            font-size: 12px;
            margin-right: 5px;
        }

        .value {
            font-size: 16px;
        }
    }

    i.icondianchi- {
        float: left;
        font-size: 150px;
        color: #56B244;

        // &.s02 {
        //     color: #D45B5B;
        // }
    }

    i.iconbianyaqikong- {
        float: right;
        font-size: 145px;
        color: #FB9D2A;
    }

    i.iconbianyaqidian- {
        position: absolute;
        right: 107px;
        top: 51px;
        font-size: 60px;
        color: #FB9D2A;

        &.shan {
            text-shadow: 0px 0px 30px #FB9D2A;
            animation: shan 2s linear infinite alternate;
        }
    }

    .battery-grid {
        position: absolute;
        height: 123px;
        left: 67px;
        top: 15px;
        width:91px;
        // background-color: rgba(255,255,255,.3);

        > div {
            position: absolute;
            bottom: 0;
            left: 2px;
            overflow: hidden;
            width: 87px;
            border-radius: 2px;

            > div {
                width: 100%;
                height: 123px;
                position: absolute;
                left: 0;
                bottom: 0;

                .grid {
                    // background:rgba(86,178,68,1);
                    height: 11.4px;
                    margin-top: 1px;
                }
            }

            // &.s01 {

            //     &.remain {
            //         animation: battery01 3s linear infinite;
            //     }
            // }
            // &.s02 {
            //     background-color: #D45B5B;

            //     // &.remain {
            //     //     animation: battery02 3s linear infinite;
            //     // }

            //     // .grid {
            //     //     background-color: #D45B5B;
            //     // }
            // }

            // .grid {
            //     width:66px;
            //     height:23px;
            //     background:rgba(86,178,68,1);
            //     opacity:0.8;
            //     margin-top: 8px;

            //     &:nth-child(1) {
            //         margin-top: 0;
            //     }
            // }
        }
    }

    .line {
        position: absolute;
        width:312px;
        height:7px;
        background:rgba(254,254,254,0);
        border:1px solid rgba(71,215,233,1);
        border-left: none;
        border-right: none;
        left: 162px;
        overflow: hidden;

        &.line1 {
            top: 55px;

            .s01, .s02 {
                animation-delay: 0.2s
            }
        }

        &.line2 {
            top: 75px;
            .s01, .s02 {
                animation-delay: 0.5s
            }
        }

        &.line3 {
            top: 95px;
        }

        > div {
            width: 100%;
            height: 100%;

            &.history {
                transform: translateX(-100%);
            }

            &.s01 {
                transform: translateX(100%);
                animation: line01 2s linear infinite;

                > div {
                    float: left;
                }
            }

            &.s02 {
                transform: translateX(-100%);
                animation: line02 2s linear infinite;

                >div {
                    float: right;
                }
            }

            > div {
                width:14px;
                height:100%;
                background:rgba(87,223,230,1);
                margin-right: 25px;
            }
        }
    }
}

.green {
    i.icondianchi- {
        color: #57DFE6;
    }

    .grid {
        background-color: #57DFE6;
    }
}
.orange {
    i.icondianchi- {
        color: #F7D240;
    }

    .grid {
        background-color: #F7D240;
    }
}
.yellow {
    i.icondianchi- {
        color: #FB9D2A;
    }

    .grid {
        background-color: #FB9D2A;
    }
}
.red {
    i.icondianchi- {
        color: #FF7381;
    }

    .grid {
        background-color: #FF7381;
    }
}

@keyframes battery01 {
    0% {
        height: 0%;
    }
    19% {
        height: 0%;
    }
    20% {
        height: 25%;
    }
    39% {
        height: 25%;
    }
    40% {
        height: 50%;
    }
    59% {
        height: 50%;
    }
    60% {
        height: 75%;
    }
    79% {
        height: 75%;
    }
    80% {
        height: 100%;
    }
    99% {
        height: 100%;
    }
    100% {
        height: 0%;
    }
}
@keyframes battery02 {
    0% {
        height: 100%;
    }
    19% {
        height: 100%;
    }
    20% {
        height: 75%;
    }
    39% {
        height: 75%;
    }
    40% {
        height: 50%;
    }
    59% {
        height: 50%;
    }
    60% {
        height: 25%;
    }
    79% {
        height: 25%;
    }
    80% {
        height: 0%;
    }
    99% {
        height: 0%;
    }
    100% {
        height: 100%;
    }
}
@keyframes line01 {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(-50%);
    }
}
@keyframes line02 {
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(50%);
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
</style>
