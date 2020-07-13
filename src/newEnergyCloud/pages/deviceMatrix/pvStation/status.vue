<template>
    <div class="status">
        <el-checkbox :style="{color: theme.$pageStatusNameColor}" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
            <el-checkbox :style="{color: theme.$pageStatusNameColor}" v-for="item in cities" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
        <el-checkbox :style="{color: theme.$pageStatusNameColor}" class="shadowCheckbox" v-model="checkShadow" @change="handleShadowChange">阴影</el-checkbox>
    </div>
</template>

<script>
import theme from '../theme/theme'
export default {
    mixins: [theme],
    data () {
        this.cities = [
            { label: '正常', value: 0 },
            { label: '故障', value: 2 },
            { label: '报警', value: 3 },
            { label: '中断', value: 1 }
        ]
        return {
            checkAll: true,
            checkedStatus: this.cities.map(v => v.value),
            checkShadow: false
        }
    },
    methods: {
        handleCheckAllChange (val) {
            this.checkedStatus = val ? this.cities.map(v => v.value) : []
            if (val) this.checkShadow = false
            this.$bus.emit('statusChange', this.checkedStatus)
        },
        handleCheckedStatusChange (val) {
            this.checkAll = val.length === this.cities.length
            this.checkShadow = false
            this.$bus.emit('statusChange', this.checkedStatus)
        },
        handleShadowChange (val) {
            if (val) {
                this.checkAll = false
                this.handleCheckAllChange(false)
            }
            this.$bus.emit('statusChange', [val ? 'shadow' : null])
        }
    }
}
</script>

<style lang="scss" scoped>
.status {
    display: inline-block;

    .el-checkbox-group {
        display: inline-block;
    }

    .shadowCheckbox {
        margin-left: 30px;
    }
}
</style>
