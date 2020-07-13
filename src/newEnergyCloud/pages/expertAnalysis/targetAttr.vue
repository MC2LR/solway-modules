<template>
    <el-popover
        placement="bottom"
        width="100"
        @hide="$emit('setTargetAttr', targetDataType)"
        trigger="hover">
        <div>
            <el-radio-group v-model="targetDataType">
                <el-radio v-if="dataType == 0" :label="0">自动</el-radio>
                <el-radio :label="1">求和</el-radio>
                <el-radio :label="2">平均值</el-radio>
                <el-radio :label="3">最大值</el-radio>
                <el-radio :label="4">最小值</el-radio>
                <el-radio :label="5">中位数</el-radio>
            </el-radio-group>
        </div>
        <span slot="reference">{{target.fd_name}}</span>
    </el-popover>
</template>

<script>
import { mapState } from 'vuex'
import {moduleName} from './store'
export default {
    props: {
        target: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            targetDataType: this.target.targetDataType || 0
        }
    },
    created () {
        this.$nextTick(() => {
            this.targetDataType = this.target.targetDataType || (+this.dataType === 1 ? 2 : 0)
        })
    },
    computed: {
        ...mapState(moduleName, [
            'group',
            'dataType'
        ])
    }
}
</script>

<style lang="scss" scoped>
.el-radio {
    margin-bottom: 10px;
}
</style>
