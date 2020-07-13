<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="centerDialogVisible"
        :modal="true"
        append-to-body
        @close="$emit('close')"
        width="400px">
        <el-form :model="form" size="small">
            <el-form-item label="图表">
                <el-radio-group v-model="form.chatrType">
                    <el-radio :label="0">柱状图</el-radio>
                    <el-radio :label="1">折线图</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="颜色">
                <el-input v-model="form.color" type="color"></el-input>
            </el-form-item>
            <el-form-item label="线宽">
                <el-input v-model="form.width" type="number" placeholder="自适应" min="1"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import {moduleName} from '../store'
export default {
    props: {
        chartConfig: {
            type: Object,
            default () {
                return {}
            }
        },
        dialogKey: {
            type: String,
            default: ''
        },
        dialogTitle: {
            type: String,
            default: ''
        },
        dialogColor: {
            type: String,
            default: ''
        },
        configVisible: {
            type: Boolean,
            default: false
        },
        defaultChartType: {
            default: 0
        }
    },
    data () {
        return {
            centerDialogVisible: false,
            form: {
                chatrType: this.chartConfig.chatrType == null ? this.defaultChartType : this.chartConfig.chatrType,
                color: this.dialogColor,
                width: this.chartConfig.width || ''
            }
        }
    },
    methods: {
        ...mapActions(moduleName, [
            'setChartOption'
        ]),
        confirm () {
            this.setChartOption({type: 'lineBarChartConfig', key: this.dialogKey, config: this.form})
            this.centerDialogVisible = false
        }
    },
    watch: {
        configVisible (val) {
            if (val === false) return
            this.centerDialogVisible = true
            this.form.chatrType = this.chartConfig.chatrType == null ? +this.defaultChartType : (+this.chartConfig.chatrType || 0)
            this.form.color = this.dialogColor
            this.form.width = this.chartConfig.width ? +this.chartConfig.width : ''
        }
    }
}
</script>

<style lang="scss" scoped>
.el-input {
    width: 100px;
}
</style>
