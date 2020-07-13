<template>
    <el-dialog
        :title="data.fd_name + '-筛选器'"
        :visible.sync="dialogVisible"
        width="700px"
        @closed="$emit('closed')">
        <div>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-select
                        v-model="form"
                        multiple
                        filterable
                        clearable
                        reserve-keyword
                        placeholder="全部">
                        <el-option
                            v-for="item in baseSearchConditionGetStByRoleAndComIds.res.body"
                            :key="item.stId"
                            :label="item.stName"
                            :value="item.stId">
                        </el-option>
                    </el-select>
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
import {api＿baseSearchConditionGetStByRoleAndComIds} from '@/request/api'
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
            baseSearchConditionGetStByRoleAndComIds: api＿baseSearchConditionGetStByRoleAndComIds({
                data: {
                    stClass: '01'
                }
            }),
            form: []
        }
    },
    created () {
        this.$nextTick(() => {
            this.form = this.filtersResult['stid'] || this.form
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
            this.setFilterData({key: 'stid', value: this.form})
            this.dialogVisible = false
        }
    }
}
</script>

<style lang="scss" scoped>
.el-select {
    width: 500px;
}
</style>
