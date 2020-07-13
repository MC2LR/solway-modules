<template>
    <div
        class="kuai-kuai"
        :class="{animation: animation}"
        :style="{left: position.left + 'px', top: position.top + 'px'}">
        <header class="header">
            <i v-if="icon" class="iconfont" :class="icon"></i>
            <span>{{headline}}</span>
            <slot name="header"></slot>
        </header>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        position: {
            type: Object,
            default () {
                return {}
            }
        },
        icon: {
            type: String
        },
        headline: {
            type: String
        },
        animation: {
            type: Boolean
        }
    }
}
</script>

<style lang="scss" scoped>
.kuai-kuai {
    width: 2.4rem;
    min-height: 1rem;
    position: fixed;
    background-color: rgba(0,56,138,0.3 * 0.7);
    margin-left: -1.8rem;
    transform: translateY(-100%);
    left: -2.5rem;
    transition: all 0.5s ease;
    z-index: 9;

    &:hover {
        transform: scale(1.2) translateY(-92%);
    }

    &::before, &::after {
        position: absolute;
        content: '';
        display: inline-block;
        width: 1.4rem;
        height: 0.2rem;
        border:2px solid rgba(0,195,255,1);
    }

    &::before {
        left: -2px;
        top: -2px;
        border-bottom: none;
        border-right: none;
    }

    &::after {
        right: -2px;
        bottom: -2px;
        border-top: none;
        border-left: none;
    }

    &.animation {
        // &:hover {

        //     &::before, &::after {
        //         animation-duration: 10s;
        //     }
        // }

        &::before {
            animation: leftTop 6s infinite linear;
        }

        &::after {
            animation: rightBottom 6s infinite linear;
        }
    }

    .header {
        padding: 0.12rem 0.1rem 0;
        font-size: 0.14rem;
        margin: 0;

        .iconfont {
            display: inline-block;
            width: 0.23rem;
            height: 0.23rem;
            background:rgba(255,255,255,.1);
            border-radius:50%;
            font-size: 0.12rem;
            text-align: center;
            line-height: 0.23rem;
            position: relative;

            &.animation {
                background-color: rgba(#459F3E, 1);

                &::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(#459F3E, 1);
                    z-index: 1;
                    border-radius: 50%;
                    animation: twinkling 2.1s infinite ease-in-out;
                    animation-fill-mode: both;
                }
            }
        }
    }
}
@keyframes twinkling {
    0% {
        opacity: 0.1;
        transform: scale(1);
    }

    50% {
        opacity: .3;
        transform: scale(1.6);
    }

    100% {
        opacity: 0.1;
        transform: scale(1);
    }
}
@keyframes leftTop {
    0% {
        height: 100%;
        width: 0;
        left: 0;
        top: 0;
    }

    33% {
        height: 0;
        width: 1.2rem;
        left: 0;
        top: 0;
    }

    66% {
        height: 0;
        width: 1.2rem;
        left: 1.2rem;
        top: 0;
        border-left: none;
        border-right: 2px solid rgba(0,195,255,1);
    }

    100% {
        height: 100%;
        width: 0;
        left: 2.4rem;
        top: 0;
        border-left: none;
        border-right: 2px solid rgba(0,195,255,1);
    }
}
@keyframes rightBottom {
    0% {
        height: 100%;
        width: 0rem;
        right: 0;
        bottom: 0;
    }

    33% {
        height: 0;
        width: 1.2rem;
        right: 0;
        bottom: 0;
    }

    66% {
        height: 0;
        width: 1.2rem;
        right: 1.2rem;
        bottom: 0;
        border-right: none;
        border-left: 2px solid rgba(0,195,255,1);
    }

    100% {
        height: 100%;
        width: 0;
        right: 2.4rem;
        bottom: 0;
        border-right: none;
        border-left: 2px solid rgba(0,195,255,1);
    }
}
</style>
