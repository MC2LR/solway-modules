<template>
    <div @click="video.play()">
        <video ref="videoElement"></video>
    </div>
</template>

<script>
import Hls from 'hls.js'

export default {
    mounted () {
        const video = this.video = this.$refs.videoElement
        if (Hls.isSupported()) {
            const hls = new Hls()
            hls.loadSource('/hls/movie.m3u8')
            hls.attachMedia(video)
            // hls.on(Hls.Events.MANIFEST_PARSED, function () {
            //     video.play()
            // })
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = '/hls/movie.m3u8'
            // video.addEventListener('loadedmetadata', function () {
            //     video.play()
            // })
        }
    }
}
</script>

<style>

</style>
