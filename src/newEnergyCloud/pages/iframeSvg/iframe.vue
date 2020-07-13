<template>
    <iframe ref="myIframe" @load="myPostMessage" :src="iframeSrc" frameborder="0"></iframe>
</template>

<script>
import { independent } from '@comm/tools/env'
const staticSrc = independent ? `/static/static-newEnergyCloud` : `/module/newEnergyCloud/static`
export default {
    props: {
        svgSrc: {
            type: String
        },
        svgData: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            iframeSrc: staticSrc + '/angularSvg/angular.html?v=2'
        }
    },
    methods: {
        myPostMessage () {
            this.$refs.myIframe.contentWindow.postMessage({svgUrl: this.svgSrc, svgData: this.svgData}, this.$refs.myIframe.src)
        }
    },
    watch: {
        svgSrc (newValue, oldValue) {
            if (newValue !== oldValue) this.myPostMessage()
        },
        svgData () {
            this.myPostMessage()
        }
    }
}
</script>
