<template>
    <div class="layout-baidumap">
        <iframe ref="myIframe" @load="myPostMessage" :src="iframeSrc" frameborder="0"></iframe>
    </div>
</template>

<script>
import { independent } from '@comm/tools/env'
import devicePopUp from '@/components/devicePopUp'
const staticSrc = independent ? `/static/static-newEnergyCloud` : `/module/newEnergyCloud/static`
export default {
    data () {
        return {
            iframeSrc: staticSrc + '/deviceLayoutView/layoutViewBaiduMap.html?t=' + Date.now()
        }
    },
    created () {
        this.$bus.on('stationChange', this.stationChange)
    },
    mounted () {
        window.addEventListener('message', this.devicePopup)
    },
    methods: {
        stationChange () {
            this.iframeSrc = staticSrc + '/deviceLayoutView/layoutViewBaiduMap.html?t=' + Date.now()
        },
        myPostMessage () {

        },
        devicePopup (e) {
            if (e.data.type !== 'devicePopup') return
            devicePopUp(e.data)
        }
    },
    beforeDestroy () {
        window.removeEventListener('message', this.devicePopup)
        this.$bus.off('stationChange', this.stationChange)
    }
}
</script>

<style lang="scss" scoped>
.layout-baidumap {
    height: calc(100% - 60px);
    padding: 10px;

    iframe {
        width: 100%;
        height: 100%;
    }
}
</style>
