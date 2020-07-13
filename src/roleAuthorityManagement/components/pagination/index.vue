<template>
    <div>
        <el-pagination
            background
            v-bind="elOptions"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="currentPageSize"
            :page-sizes="pageSizes"
            :current-page.sync="currentPage"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        elOptions: {
            type: Object,
            default () {
                return {
                    layout: 'total, sizes, prev, pager, next'
                }
            }
        },
        total: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pageIndex: {
            type: Number,
            default: 0
        },
        pageSizes: {
            type: Array,
            default () {
                return [10, 20, 50, 100]
            }
        },
        firstPageIndex: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            currentPage: this.pageIndex - this.firstPageIndex + 1,
            currentPageSize: this.pageSize
        }
    },
    methods: {
        handleSizeChange (val) {
            this.elOptions.handleSizeChange && this.elOptions.handleSizeChange(val)
            this.$emit('change', {pageSize: val, pageIndex: this.firstPageIndex})
        },
        handleCurrentChange (val) {
            this.elOptions.handleCurrentChange && this.elOptions.handleCurrentChange(val)
            this.$emit('change', {pageIndex: val + this.firstPageIndex - 1})
        }
    },
    watch: {
        pageIndex (pageIndex) {
            this.currentPage = pageIndex - this.firstPageIndex + 1
        },
        pageSize (pageSize) {
            this.currentPageSize = pageSize
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
