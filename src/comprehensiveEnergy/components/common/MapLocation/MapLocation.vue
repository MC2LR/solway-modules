<template>
    <div class="map-location">
        <el-button @click="visible = true" type="text">
            <i class="iconfont icondingweiweizhi"></i>
            <span>定位</span>
        </el-button>
        <el-dialog
            @open="open"
            :visible.sync="visible"
            :modal-append-to-body="false"
            width="1000px">
            <iframe
                ref="baidumap"
                class="iframe"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                :src="src">
            </iframe>
        </el-dialog>
    </div>
</template>

<script>
import {Dialog, Button} from 'element-ui'
import { independent } from '@comm/tools/env'

export default {
    props: {
        options: {
            type: Object
        }
    },
    data () {
        return {
            visible: false,
            src: independent
                ? '/static/static-comprehensiveEnergy/baiduMap/baidumap.html?_=' + Math.random()
                : '/module/comprehensiveEnergy/static/baiduMap/baidumap.html?_=' + Math.random()
        }
    },
    methods: {
        open () {
            if (this.isMounted) return
            const { longitude, latitude } = this.options
            const timeout = () => {
                setTimeout(() => {
                    const ifreame = this.$refs.baidumap.contentWindow
                    if (!ifreame) return
                    if (!ifreame.childFunction) return timeout()
                    ifreame.childFunction({ longitude, latitude })
                    this.isMounted = true
                }, 500)
            }
            timeout()
        }
    },
    components: {
        ElDialog: Dialog,
        ElButton: Button
    }
}
</script>

<style lang="scss" scoped>
.map-location {
    display: inline-block;

    .el-button {
        line-height: 1;
        padding: 0;
    }

    .iframe {
        width: 100%;
        height: 500px;
    }
}
</style>
