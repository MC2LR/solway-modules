<template>
    <div>
        <LivePlayer ref="player" :aspect="aspect" :videoUrl="videoUrl" fluent autoplay live stretch :hasaudio="true" :loading.sync="bLoading" v-loading="bLoading" element-loading-text="加载中"></LivePlayer>
    </div>
</template>

<script>
import { independent } from '@comm/tools/env'
import LivePlayer from '@liveqing/liveplayer'
import axios from 'axios'
const staticSrc = independent ? `/static/static-videoSurveillance` : `/module/videoSurveillance/static`
export default {
    props: ['data', 'aspect'],
    components: {
        LivePlayer
    },
    data () {
        return {
            videoUrl: this.data.pointDest,
            getStreamParams: {
                station_id: this.data.stid,
                stream: [{
                    name: this.data.name,
                    source: this.data.pointSource,
                    dest: this.data.pointDest
                }]
            },
            isPlay: true,
            bLoading: true
        }
    },
    created () {
        window.videojs.options.flash.swf = staticSrc + '/LivePlayer/dist/component/liveplayer.swf'
        this.timer = setInterval(() => this.getVideoStream(), 50 * 1000)
    },
    mounted () {
        this.$refs.player.player.on('pause', this.pause)
        this.$refs.player.player.on('play', this.play)
    },
    methods: {
        pause (e) {
            this.isPlay = false
        },
        play (e) {
            this.isPlay = true
            this.getVideoStream()
        },
        getVideoStream () {
            if (!this.isPlay) return
            axios.post(this.data.getStreamUrl, JSON.stringify(this.getStreamParams), {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            })
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
        this.$refs.player.player.off('pause', this.pause)
        this.$refs.player.player.off('play', this.play)
    }
}
</script>

<style lang="scss" scoped>

</style>
