<template>
    <div class="date-btn-group">
        <div class="btn-group">
            <el-button @click="() => handleClick('day')" :type="activeBtn === 'day' ? 'primary' : ''" size="mini" v-if="group.includes('day')">昨天</el-button>
            <el-button @click="() => handleClick('week')" :type="activeBtn === 'week' ? 'primary' : ''" size="mini" v-if="group.includes('week')">最近7天</el-button>
            <el-button @click="() => handleClick('month')" :type="activeBtn === 'month' ? 'primary' : ''" size="mini" v-if="group.includes('month')">最近30天</el-button>
            <el-button @click="() => handleClick('year')" :type="activeBtn === 'year' ? 'primary' : ''" size="mini" v-if="group.includes('year')">最近365天</el-button>
            <el-button @click="() => handleClick('custom')" :type="activeBtn === 'custom' ? 'primary' : ''" size="mini" v-if="group.includes('custom')">自定义</el-button>
        </div>
        <el-date-picker
            class="date-range"
            size="mini"
            v-if="activeBtn === 'custom'"
            v-model="customDate"
            @change="handleChange"
            type="daterange"
            range-separator="至"
            :picker-options="{
                disabledDate: time => (time.getTime() - 86400000) > Date.now()
            }"
            placeholder="选择日期">
        </el-date-picker>
    </div>
</template>

<script>
const dayTime = 86400000
const labelMap = {
    day: 1,
    week: 7,
    month: 30,
    year: 365
}
const groupEndDate = new Date(Date.now() - dayTime)
export default {
    props: {
        group: {
            type: Array,
            default () {
                return ['day', 'week', 'month', 'year', 'custom']
            }
        },
        defaultActive: {
            type: String
        }
    },
    data () {
        return {
            activeBtn: '',
            customDate: []
        }
    },
    created () {
        this.$nextTick(() => {
            this.customDate = this.dateArr
            this.activeBtn = this.type
            this.handleClick(this.type || 'week', true)
        })
    },
    computed: {
        type () {
            return this.defaultActive || this.$store.state.userActionRecord.dateButtonGroup?.type
        },
        dateArr () {
            return this.$store.state.userActionRecord.dateButtonGroup?.dateArr?.map(v => new Date(v)) || [new Date(groupEndDate), new Date(groupEndDate)]
        }
    },
    methods: {
        handleClick (type, impotant) {
            if (!impotant && type === this.activeBtn) return
            this.activeBtn = type
            if (type === 'custom') {
                this.$emit('change', this.customDate)
            } else {
                const endDate = new Date(groupEndDate)
                const startDate = new Date(groupEndDate.getTime() - dayTime * (labelMap[type] - 1))
                this.$emit('change', [startDate, endDate])
            }
            this.$store.dispatch('userActionRecord/setState', {key: 'dateButtonGroup', value: {type: type, dateArr: this.customDate}})
        },
        handleChange (date) {
            this.$emit('change', date)
            this.$store.dispatch('userActionRecord/setState', {key: 'dateButtonGroup', value: {type: this.activeBtn, dateArr: date}})
        }
    }
}
</script>

<style lang="scss">
.date-btn-group {
    .el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange {
        border: none;

        i {
            display: none;
        }

        .el-range-input {
            @include c(color, $text_c1);
        }

        .el-range-separator {
            width: 10%;
        }
    }
}
[data-pagetheme="dark"] {
   .date-btn-group{
        .el-button{
            background: transparent;
            border: 1px solid rgba(47,191,203,0.5);
            color: #2DB7C4;
        }
        .el-button--primary {
            color: #FFFFFF;
            background:rgba(47,191,203,1);
        }
    }
}
</style>

<style lang="scss" scoped>
.date-btn-group {
    display: inline-block;

    .btn-group {
        display: inline-block;
    }
    .date-range {
        width: 210px;
        margin-left: 1em;
    }
}
</style>
