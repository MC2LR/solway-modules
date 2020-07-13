<template>
    <div class="date-range-switch" :class="theme">
        <div class="tabs">
            <span
                v-for="item in switchTabs"
                :key="item.value"
                class="tab"
                @click="activeTab = item.value; handleChange()"
                :class="{active: item.value === activeTab}">
                {{item.label}}
            </span>
        </div>
        <div class="date-picker">
            <date-picker-arrow
                :theme="themeName"
                key="day"
                v-if="activeTab === 'day'"
                type="date"
                @change="handleChange"
                :date="dayDate"
                :disabledDate="disabledDate">
            </date-picker-arrow>
            <date-picker-arrow
                :theme="themeName"
                key="week"
                v-if="activeTab === 'week'"
                :date="weekDate"
                type="week"
                @change="handleChange"
                format="yyyy 第 W 周"
                :disabledDate="disabledDate">
            </date-picker-arrow>
            <date-picker-arrow
                :theme="themeName"
                key="month"
                v-if="activeTab === 'month'"
                :date="monthDate"
                @change="handleChange"
                type="month"
                :disabledDate="disabledDate">
            </date-picker-arrow>
            <date-picker-arrow
                :theme="themeName"
                key="year"
                v-if="activeTab === 'year'"
                :date="yearDate"
                @change="handleChange"
                type="year"
                :disabledDate="disabledDate">
            </date-picker-arrow>
            <el-date-picker
                class="date-range"
                v-if="activeTab === 'custom'"
                v-model="customDate"
                @change="handleChange"
                type="daterange"
                range-separator="至"
                :picker-options="{
                    disabledDate
                }"
                placeholder="选择日期">
            </el-date-picker>
        </div>
    </div>
</template>

<script>
import DatePickerArrow from '../datePickerArrow/DatePickerArrow'
import theme from './theme/theme'

const labelMap = {
    day: '日',
    week: '周',
    month: '月',
    year: '年',
    accum: '累计',
    custom: '自定义'
}
export default {
    mixins: [theme],
    components: {
        DatePickerArrow
    },
    props: {
        tabs: {
            type: Array,
            default () {
                return ['day', 'week', 'month', 'year', 'accum', 'custom']
            }
        },
        labelMap: {
            type: Object,
            default () {
                return {...labelMap}
            }
        },
        defaultTab: {
            type: String,
            default: 'day'
        },
        defaultDate: {
            type: Date,
            default () {
                return new Date()
            }
        },
        disabledDate: {
            type: Function,
            default: time => time.getTime() > Date.now()
        },
        theme: {
            type: String,
            default: 'light'
        }
    },
    data () {
        return {
            switchTabs: this.tabs.map(v => ({value: v, label: this.labelMap[v] || labelMap[v]})),
            activeTab: this.defaultTab,
            dayDate: new Date(this.defaultDate),
            weekDate: new Date(this.defaultDate),
            monthDate: new Date(this.defaultDate),
            yearDate: new Date(this.defaultDate),
            accumDate: null,
            customDate: [new Date(this.defaultDate), new Date(this.defaultDate)]
        }
    },
    methods: {
        handleChange (date = this[this.activeTab + 'Date']) {
            const activeTab = this.activeTab
            this[activeTab + 'Date'] = date
            this.$emit('change', {type: activeTab, value: date})
        }
    }
}
</script>

<style lang="scss">
.date-range-switch {
    .el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange {
        border: none;

        i {
            display: none;
        }

        .el-range-input {
            @include c(color, $text_c1);
            font-size: 18px;
        }

        .el-range-separator {
            width: 10%;
            line-height: 28px;
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
.date-range-switch {
    &.dark {
        .tabs {
            .tab {
                color: rgba(47,191,203, 0.5);
                &.active {
                    color: rgba(47,191,203, 1) !important;
                }
            }
        }
    }
}

.date-range-switch {
    display: inline-block;
    height: 34px;
    line-height: 34px;

    .tabs {
        display: inline-block;
        .tab {
            margin-right: 1em;
            cursor: pointer;

            &.active {
                @include c(color, $text_c1);
            }
        }
    }

    .date-picker {
        display: inline-block;

        .date-range {
            width: 300px;
        }
    }
}
</style>
