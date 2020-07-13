<template>
    <el-dialog
        title="开发者调试专用"
        :visible.sync="centerDialogVisible"
        @close="$emit('close')"
        width="300px"
        center>
        <div>
            <el-input @keydown.native.enter="confirm" v-model="menuKey" type="password" placeholder="请输入秘钥"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
// import md5 from 'js-md5'
export default {
    props: ['allMenuVisible'],
    data () {
        return {
            centerDialogVisible: false,
            menuKey: ''
        }
    },
    methods: {
        confirm () {
            if (this.menuKey && this.menuKey === this.getAllMenuKey()) {
                this.$store.dispatch('asideMenu/allMenu')
                this.centerDialogVisible = false
                window.location.reload()
            }
        },
        getAllMenuKey () {
            // return md5(('err:' + encodeURIComponent(md5(new Date().toDateString()))).toUpperCase())
            return new Date().Format('yyyy-MM-dd').split('-').reverse().join('')
        }
    },
    watch: {
        allMenuVisible (newValue) {
            if (newValue === true) {
                this.centerDialogVisible = true
            }
        }
    }
}
</script>

<style>

</style>
