<template>
    <iframe ref="myIframe" @load="myPostMessage" :src="iframeSrc + '?_=' + timeStamp" frameborder="0"></iframe>
</template>

<script>
import { independent } from '@comm/tools/env'
const staticSrc = independent ? `/static/static-newEnergyCloud` : `/module/newEnergyCloud/static`
export default {
    props: {
        imgList: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            iframeSrc: staticSrc + '/homeImageFrame/index.html',
            timeStamp: Date.now()
        }
    },
    methods: {
        myPostMessage () {
            this.$refs.myIframe.contentWindow && this.$refs.myIframe.contentWindow.postMessage({imgList: this.imgList}, this.$refs.myIframe.src)
        }
    },
    watch: {
        imgList (newValue, oldValue) {
            if (newValue === oldValue) return
            if (newValue.length === 0) this.timeStamp = Date.now()
            this.myPostMessage()
        }
    }
}
</script>
