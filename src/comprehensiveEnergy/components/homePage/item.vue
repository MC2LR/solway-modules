<template>
    <div class="home-item" :class="'size-' + size">
        <i
            v-if="icon"
            :class="icon"
            class="iconfont">
        </i>
        <div class="item-right">
            <p>
                <span class="value">{{value || '-'}}</span>
                <sub class="unit">{{unit}}</sub>
            </p>
            <p class="label">{{label}}</p>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        size: {
            type: String,
            default: 'default'
        },
        icon: {
            type: String
        },
        value: {
            required: true
        },
        unit: {
            type: String
        },
        label: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.home-item {
    display: inline-block;
    padding: 0.2rem 0.15rem;

    i.iconfont {
        display: inline-block;
        width: 0.46rem;
        height: 0.46rem;
        line-height: 0.46rem;
        text-align: center;
        border-radius:50%;
        font-size: 0.21rem;

        &.c1 {
            background:rgba(48,15,45,1);
            color: #FC1C70;
        }

        &.c2 {
            background:#104761;
            color: #1CB5FC;
        }

        &.c3 {
            background:#381E04;
            color: #FC8B1C;
        }

        &.c4 {
            background:#0B4406;
            color: #459F3E;
        }
    }

    .item-right {
        display: inline-block;
        padding-left: 0.2rem;
        vertical-align: top;

        .value {
            font-size: 0.2rem;
        }

        .unit {
            font-size: 0.15rem;
        }

        .label {
            font-size: 0.14rem;
            margin-top: 0.05rem;
            @include c(color, $text_c06);
        }
    }

    &.size-small {
        padding: 0.1rem 0.1rem;

        i.iconfont {
            width: 0.26rem;
            height: 0.26rem;
            line-height: 0.26rem;
            text-align: center;
            border-radius:50%;
            font-size: 0.13rem;
            margin-top: 0.05rem;
        }

        .item-right {
            padding-left: 0.1rem;

            .value {
                font-size: 0.18rem;
            }

            .unit {
                font-size: 0.12rem;
            }

            .label {
                font-size: 0.12rem;
                margin-top: 0.05rem;
            }
        }
    }
}
</style>
