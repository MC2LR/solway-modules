<template>
    <div class="charging-pile" :class="'s' + useStatus">
        <div class="name">{{name}}</div>
        <div class="icon">
            <div class="dot"></div>
            <i class="comprehensive iconchongdianzhuang"></i>
        </div>
        <div v-if="(useNumber + '') >= 0" class="footer">使用{{useNumber}}次</div>
    </div>
</template>

<script>
export default {
    props: {
        useStatus: {
            type: String,
            default: '02'
        },
        name: {
            type: String,
            default: ''
        },
        useNumber: {
            type: Number
        }
    }
}
</script>

<style lang="scss" scoped>
.charging-pile {
    width: 68px;
    min-height: 82px;
    float: left;
    margin: 0 11px 10px;
    padding-top: 5px;
    background-color: rgba(255,255,255,.2);

    &.s01 {
        background-color: rgba(65,182,76,.2);
        .name {
            border-bottom-color: #41B64C;
        }

        .icon {
            .dot {
                display: block;
                animation: twinkle 2s linear infinite;
            }
            .comprehensive {
                color: #41B64C;
                // animation: shan 1s linear infinite alternate;
            }
        }
    }

    &.s02 {
        background-color: rgba(63,188,227,.2);
        .name {
            border-bottom-color: #3FBCE3;
        }

        .icon {
            .comprehensive {
                color: #3FBCE3;
            }
        }
    }

    &.s03 {
        background-color: rgba(244,82,82,.2);
        .name {
            border-bottom-color: #F45252;
        }

        .icon {
            .comprehensive {
                color: #F45252;
            }
        }
    }

    .name {
        font-size: 12px;
        width: 47px;
        margin: 0 auto;
        border-bottom: 1px solid #FFFFFF;
        line-height: 1;
        height: 1.3em;
        overflow: hidden;
        // text-overflow: ellipsis;
        word-break: keep-all;
        text-align: center;
    }

    .icon {
        text-align: center;
        padding-top: 15px;
        position: relative;

        .dot {
            position: absolute;
            left: 50%;
            top: 18px;
            width: 11px;
            height: 11px;
            margin-left: -9px;
            background: #fff;
            border: 3px solid rgba(255, 255, 255, .5);
            border-radius: 50%;
            background-clip: padding-box;
            transform-origin: 50% 50%;
            display: none;
        }

        .comprehensive {
            font-size: 36px;
            color: #648AA9;
        }
    }

    .footer {
        font-size: 12px;
        text-align: center;
        padding: 5px 0;
    }
}
@keyframes shan {
    from {
        text-shadow: 0px 0px 30px #EFA96F;
        // opacity: 1;
    }

    to {
        text-shadow: 0px 0px 0px #EFA96F;
        // opacity: 0;
    }
}

@keyframes twinkle {
    0% { transform: scale(1); opacity: 1;}
    100% { transform: scale(3); opacity: 0;}
}
</style>
