<template>
    <div class="date-picker-arrow" :class="theme">
        <el-date-picker
            v-model="value"
            :type="type"
            @change="date => $emit('change', date)"
            :picker-options="{
                disabledDate
            }"
            :format="format"
            placeholder="选择日期">
        </el-date-picker>

        <i @click="goPrevious" class="iconfont icon-wangzuo-" :class="{disabled: leftDisabled}"></i>
        <i @click="goNext" class="iconfont icon-wangyou" :class="{disabled: rightDisabled}"></i>
    </div>
</template>

<script>

export default {
    props: {
        date: {
            type: Date
        },
        disabledDate: {
            type: Function,
            required: true
        },
        type: {
            type: String,
            default: 'date'
        },
        format: {
            type: String,
            default: null
        },
        theme: {
            type: String,
            default: 'light'
        }
    },
    data () {
        return {
            value: new Date(this.date)
        }
    },
    methods: {
        getStepTime (type = this.type) {
            const dayTime = 86400000
            if (type === 'date') return dayTime
            if (type === 'week') return dayTime * 7
        },
        getPrevious (date) {
            const tempDate = new Date(date)
            if (this.type === 'month') return new Date(tempDate.setMonth(tempDate.getMonth() - 1))
            if (this.type === 'year') return new Date(tempDate.setFullYear(tempDate.getFullYear() - 1))
            const stepTime = this.getStepTime()
            return new Date(tempDate.getTime() - stepTime)
        },
        getNext (date) {
            const tempDate = new Date(date)
            if (this.type === 'month') return new Date(tempDate.setMonth(tempDate.getMonth() + 1))
            if (this.type === 'year') return new Date(tempDate.setFullYear(tempDate.getFullYear() + 1))
            const stepTime = this.getStepTime()
            return new Date(tempDate.getTime() + stepTime)
        },
        goPrevious () {
            if (this.leftDisabled) return
            this.value = this.getPrevious(this.value)
            this.$emit('change', this.value)
        },
        goNext () {
            if (this.rightDisabled) return
            this.value = this.getNext(this.value)
            this.$emit('change', this.value)
        }
    },
    computed: {
        leftDisabled () {
            return this.disabledDate(this.getPrevious(this.value))
        },
        rightDisabled () {
            return this.disabledDate(this.getNext(this.value))
        }
    }
}
</script>

<style lang="scss">
.date-picker-arrow {
    .el-date-editor {
        .el-input__inner {
            background-color: transparent;
            border: none;
            text-align: center;
            // @include c(color, $text_c1);
            font-size: 18px;
        }

        span {
            display: none;
        }
    }

    &.light {}

    &.darkBlue {
        .el-date-editor {
            .el-input__inner {
                color: rgba(255,255,255,.8);
            }
        }
    }

    &.dark {
        .el-date-editor {
            .el-input__inner {
                color: #3fdcef;
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.date-picker-arrow {
    display: inline-block;
    position: relative;
    height: 34px;

    .el-date-editor {
        width: 180px;
        height: 100%;
        line-height: 34px;
        vertical-align: top;
    }

    i.iconfont {
        @include c(background-color, $text_c1);
        position: absolute;
        top: 7px;
        cursor: pointer;
        width:19px;
        height:19px;
        line-height: 19px;
        border-radius: 2px;
        text-align: center;
        font-size: 14px;
        @include c(color, #EDEFF9);
        border: 1px solid transparent;

        &.disabled {
            border-color: rgba(255,253,253,.6);
            color: rgba(255,253,253,.6);
            background-color: #BDC0C5;
        }
    }

    &.light {
        i.iconfont {
            background-color: $text_c1;
            color: #EDEFF9;

            &.disabled {
                border-color: rgba(255,253,253,.6);
                color: rgba(255,253,253,.6);
                background-color: #BDC0C5;
            }
        }
    }

    &.darkBlue {
        i.iconfont {
            background-color: $text_c1;
            color: #EDEFF9;
            opacity: .8;

            &.disabled {
                border-color: rgba(255,253,253,.6);
                color: rgba(255,253,253,.6);
                background-color: #173E6A;
                opacity: .5;
            }
        }
    }

    &.dark {
        i.iconfont {
            background-color: $text_c1;
            color: #EDEFF9;
            opacity: .8;

            &.disabled {
                border-color: rgba(255,253,253,.6);
                color: rgba(255,253,253,.6);
                background-color: #2cafbd;
                opacity: .5;
            }
        }
    }

    i.icon-wangzuo- {
        left: 0;
    }

    i.icon-wangyou {
        right: 0;
    }
}
</style>
