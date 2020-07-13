<template>
    <div>
        <svg-frame :svgSrc="svgSrc" :svgData="svgData" class="svg-frame"></svg-frame>
    </div>
</template>

<script>
import svgFrame from './iframe'
import { independent } from '@comm/tools/env'
const staticSrc = independent ? `/static/static-newEnergyCloud` : `/module/newEnergyCloud/static`
export default {
    components: {
        svgFrame
    },
    data () {
        return {
            svgSrc: staticSrc + '/angularSvg/test.svg',
            svgData: {}
        }
    },
    created () {
        this.timer = setInterval(() => {
            this.svgData = {
                v20: (Math.random() * 10).toFixed(1),
                v21: (Math.random() * 10).toFixed(1),
                v22: (Math.random() * 10).toFixed(1)
            }
        }, 2000)
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.svg-frame {
    width: 100%;
    height: 400px;
}
</style>
