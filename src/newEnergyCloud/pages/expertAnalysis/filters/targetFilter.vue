<template>
    <el-dialog
        :title="data.fd_name + '-筛选器'"
        :visible.sync="dialogVisible"
        width="500px"
        @closed="$emit('closed')">
        <div>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="最小值">
                    <el-input v-model="form.gte" type="number"></el-input>
                </el-form-item>
                <el-form-item label="最大值">
                    <el-input v-model="form.lte" type="number"></el-input>
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
        }
    },
    data () {
        return {
            dialogVisible: true,
            form: {
                gte: '',
                lte: ''
            }
        }
    },
    created () {
        this.$nextTick(() => {
            this.form = this.filtersResult[this.data.fd_key] || this.form
        })
    },
    computed: {
        ...mapState(moduleName, [
            'filtersResult'
        ])
    },
    methods: {
        ...mapActions(moduleName, [
            'setFilterData'
        ]),
        confirm () {
            this.setFilterData({key: this.data.fd_key, value: this.form})
            this.dialogVisible = false
        }
    }
}
</script>

<style>

</style>
