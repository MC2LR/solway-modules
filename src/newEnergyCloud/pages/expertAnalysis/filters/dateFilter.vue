<template>
    <el-dialog
        title="时间维度-筛选器"
        :visible.sync="dialogVisible"
        width="700px"
        @closed="$emit('closed')">
        <div>
            <el-radio-group v-model="dateType" @change="dateTypeChange">
                <el-radio v-if="dataType == 0" :label="1">年</el-radio>
                <el-radio v-if="dataType == 0" :label="2">月</el-radio>
                <el-radio :label="3">日</el-radio>
                <el-radio v-if="dataType == 0" :label="0">自定义</el-radio>
            </el-radio-group>
            <div v-if="dateType === 0">
                <el-form v-for="(item, index) in dates" :key="index" :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-date-picker
                            v-if="dateType === 0 && typeof dates[index] === 'object'"
                            size="small"
                            v-model="dates[index][0]"
                            type="date"
                            placeholder="选择开始时间"
                            :pickerOptions="{
                                disabledDate: time => time.getTime() > (Date.now() - 86400000)
                            }"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                        <el-button v-if="dateType === 0 && typeof dates[index] === 'object'" size="small">至</el-button>
                        <el-date-picker
                            v-if="dateType === 0 && typeof dates[index] === 'object'"
                            size="small"
                            v-model="dates[index][1]"
                            type="date"
                            placeholder="选择结束时间"
                            :pickerOptions="{
                                disabledDate: time => time.getTime() > (Date.now() - 86400000)
                            }"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item v-show="dates.length > 1">
                        <el-button @click="dates.splice(index, 1)" size="small" type="b4">删除</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-else-if="dateType === 1">
                <el-form v-for="(item, index) in dates" :key="index" :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-date-picker
                            v-if="dateType === 1 && typeof dates[index] === 'string'"
                            size="small"
                            v-model="dates[index]"
                            type="year"
                            placeholder="选择年"
                            :pickerOptions="{
                                disabledDate: time => time.getTime() > (Date.now() - 86400000)
                            }"
                            value-format="yyyy">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item v-show="dates.length > 1">
                        <el-button @click="dates.splice(index, 1)" size="small" type="b4">删除</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-else-if="dateType === 2">
                <el-form v-for="(item, index) in dates" :key="index" :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-date-picker
                            v-if="dateType === 2 && typeof dates[index] === 'string'"
                            size="small"
                            v-model="dates[index]"
                            type="month"
                            placeholder="选择月"
                            :pickerOptions="{
                                disabledDate: time => time.getTime() > (Date.now() - 86400000)
                            }"
                            value-format="yyyy-MM">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item v-show="dates.length > 1">
                        <el-button @click="dates.splice(index, 1)" size="small" type="b4">删除</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-else-if="dateType === 3">
                <el-form v-for="(item, index) in dates" :key="index" :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-date-picker
                            v-if="dateType === 3 && typeof dates[0] === 'object' && dates[0][0] !== ''"
                            size="small"
                            v-model="dates[0]"
                            type="dates"
                            popper-class="date-filter"
                            placeholder="选择一个或多个日期"
                            :pickerOptions="{
                                disabledDate: time => time.getTime() > (Date.now() - 86400000)
                            }"
                            @blur="dateMultipleBlue"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="dateType === 3" class="dates-preview">
                <span v-for="item in dates[0]" :key="item">{{item}}</span>
            </div>
            <el-form>
                <el-form-item>
                    <el-button v-if="dateType === 0" @click="dates.push([])" size="small" type="b5">添加时间段</el-button>
                    <el-button v-if="dateType === 1" @click="dates.push('')" size="small" type="b5">添加年</el-button>
                    <el-button v-if="dateType === 2" @click="dates.push('')" size="small" type="b5">添加月</el-button>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import {moduleName} from '../store'
export default {
    props: {
        data: {
            type: Object,
            default () {
                return {}
            }
        },
        defaultDateType: {
            default: 0
        }
    },
    data () {
        return {
            dialogVisible: true,
            dateType: 0,
            dates: [[]]
        }
    },
    created () {
        this.$nextTick(() => {
            this.dateType = this.filtersResult.dtime ? this.filtersResult.dtime?.dateType : this.defaultDateType
            if (+this.dateType === 5) this.dateType = 3
            const dates = this.filtersResult?.dtime?.dates
            if (this.filtersResult?.dtime?.dates) {
                if (this.dateType === 0) this.dates = dates.map(v => v.split(','))
                else if (this.dateType === 3) this.dates = [dates]
                else this.dates = dates
            } else {
                this.dates = this.defaultDates()
            }
        })
    },
    computed: {
        ...mapState(moduleName, [
            'filtersResult',
            'dataType'
        ])
    },
    methods: {
        ...mapActions(moduleName, [
            'setFilterData'
        ]),
        dateTypeChange () {
            this.dates = this.defaultDates()
        },
        dateMultipleBlue (e) {
            const value = e.$children[0].value.split(', ') || []
            // debugger
            this.dates = [value]
        },
        defaultDates () {
            switch (this.dateType) {
                case 0:
                    return [[]]
                case 1:
                    return ['']
                case 2:
                    return ['']
                case 3:
                    return [[]]
                default:
                    break
            }
        },
        parseDates () {
            switch (this.dateType) {
                case 0:
                    return this.dates.map(v => v.join())
                case 1:
                    return this.dates
                case 2:
                    return this.dates
                case 3:
                    return this.dates[0]
                default:
                    break
            }
        },
        confirm () {
            this.setFilterData({
                key: 'dtime',
                value: {
                    dateType: this.dateType,
                    dates: this.parseDates()
                }
            })
            this.dialogVisible = false
        }
    }
}
</script>

<style lang="scss">
.date-filter.el-picker-panel.el-date-picker.el-popper {
    .el-picker-panel__footer {
        display: none;
    }
}
</style>

<style lang="scss" scoped>
.el-radio-group {
    margin-bottom: 20px;
}

.dates-preview {
    overflow: hidden;
    span {
        margin-right: 30px;
        line-height: 2em;
        float: left;
    }
}
</style>
