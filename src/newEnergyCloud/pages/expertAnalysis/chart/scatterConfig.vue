<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="centerDialogVisible"
        :modal="true"
        append-to-body
        @close="$emit('close')"
        width="400px">
        <el-form :model="form" size="small">
            <el-form-item label="颜色">
                <el-input v-model="form.color" type="color"></el-input>
            </el-form-item>
            <el-form-item label="散点大小">
                <el-input v-model="form.size" type="number" placeholder="默认" min="1"></el-input>
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
        }
    },
    data () {
        return {
            centerDialogVisible: false,
            form: {
                color: this.dialogColor,
                size: this.chartConfig.size || ''
            }
        }
    },
    methods: {
        ...mapActions(moduleName, [
            'setChartOption'
        ]),
        confirm () {
            this.setChartOption({type: 'scatterChartConfig', key: this.dialogKey, config: this.form})
            this.centerDialogVisible = false
        }
    },
    watch: {
        configVisible (val) {
            if (val === false) return
            this.centerDialogVisible = true
            this.form.color = this.dialogColor
            this.form.size = this.chartConfig.size ? +this.chartConfig.size : ''
        }
    }
}
</script>

<style lang="scss" scoped>
.el-input {
    width: 100px;
}
</style>
