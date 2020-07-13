<template>
    <div class="date-picker-arrow">
        <el-date-picker
            v-model="value"
            type="date"
            :picker-options="{
                disabledDate
            }"
            placeholder="选择日期">
        </el-date-picker>

        <i @click="goPrevious" class="iconfont iconwangzuo-" :class="{disabled: leftDisabled}"></i>
        <i @click="goNext" class="iconfont iconwangyou" :class="{disabled: rightDisabled}"></i>
    </div>
</template>

<script>
import {DatePicker} from 'element-ui'

export default {
    props: {
        date: {
            type: Date
        },
        disabledDate: {
            type: Function
        }
    },
    data () {
        return {
            value: new Date(this.date),
            leftDisabled: this.disabledDate(this.getPrevious(this.date)),
            rightDisabled: this.disabledDate(this.getNext(this.date))
        }
    },
    methods: {
        getPrevious (date) {
            return new Date(date.getTime() - 86400000)
        },
        getNext (date) {
            return new Date(date.getTime() + 86400000)
        },
        goPrevious () {
            if (this.leftDisabled) return
            this.value = this.getPrevious(this.value)
        },
        goNext () {
            if (this.rightDisabled) return
            this.value = this.getNext(this.value)
        }
    },
    watch: {
        value (date, oldDate) {
            this.leftDisabled = this.disabledDate(this.getPrevious(date))
            this.rightDisabled = this.disabledDate(this.getNext(date))
            this.$emit('change', date)
        }
    },
    components: {
        ElDatePicker: DatePicker
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
            @include c(color, $text_c1);
            font-size: 18px;
        }

        span {
            display: none;
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
        @include c(color, #112A44);
        border: 1px solid transparent;

        &.disabled {
            border-color: rgba(255,253,253,.6);
            color: rgba(255,253,253,.6);
            background-color: #072C4A;
        }
    }

    i.iconwangzuo- {
        left: 0;
    }

    i.iconwangyou {
        right: 0;
    }
}
</style>
