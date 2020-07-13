<template>
    <div>
        <LivePlayer ref="player" :aspect="aspect" :videoUrl="videoUrl" fluent live stretch :hasaudio="true" :loading.sync="bLoading" v-loading="bLoading" element-loading-text="加载中"></LivePlayer>
        <video-ptz ref="ptz" @mouseup.native="ctrlStop" @control="controlPtz" class="video-ptz"></video-ptz>
    </div>
</template>

<script>
import { independent } from '@comm/tools/env'
import LivePlayer from '@liveqing/liveplayer'
import VideoPtz from './VideoPtz'
import {api＿getVideoToken} from '@videoSurveillance/request/api'
const staticSrc = independent ? `/static/static-videoSurveillance` : `/module/videoSurveillance/static`
export default {
    props: ['data', 'websoket', 'aspect'],
    components: {
        LivePlayer,
        VideoPtz
    },
    data () {
        return {
            videoUrl: '',
            getVideoToken: api＿getVideoToken({
                onlayLatest: true,
                data: {
                    stid: this.data.stid,
                    eqid: this.data.eqid
                }
            }).subscribe(res => this.setToken(res)),
            isPlay: false,
            token: '',
            bLoading: true
        }
    },
    created () {
        window.videojs.options.flash.swf = staticSrc + '/LivePlayer/dist/component/liveplayer.swf'
        this.timer = setInterval(() => this.getVideoStream(), 50 * 1000)
        this.timer2 = setInterval(() => this.getVideoToken.getData(), 4 * 60 * 1000)
    },
    methods: {
        setToken (res) {
            this.token = res.body.token
            if (this.videoUrl) return
            const {stid, eqid} = this.data
            this.videoUrl = (this.data.destUrl + '/' + stid + '_' + eqid + '?stid=' + stid + '&eqid=' + eqid + '&token=' + encodeURIComponent(this.token))
            this.$nextTick(() => {
                this.$refs.player.player.on('pause', this.pause)
                this.$refs.player.player.on('play', this.play)
                this.$refs.player.player.play()
            })
        },
        pause (e) {
            this.isPlay = false
        },
        play (e) {
            this.isPlay = true
            this.getVideoStream()
        },
        getVideoStream () {
            if (!this.isPlay) return
            const {stid, eqid} = this.data
            this.websoket.send(JSON.stringify({
                stid, eqid, token: this.token, cmd: 'getvideo'
            }))
        },
        controlPtz (type) {
            const {stid, eqid} = this.data
            this.websoket.send(JSON.stringify({
                stid, eqid, token: this.token, cmd: {zoomin: 'zoom+', zoomout: 'zoom-'}[type] || type
            }))
        },
        ctrlStop (event) {
            if (!event.target.dataset.ptzctrl) return
            this.controlPtz('stop')
        }
    },
    watch: {
        websoket (newValue) {
            if (newValue) {
                const {stid, eqid} = this.data
                this.getVideoToken.getData({stid, eqid})
            }
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
        clearInterval(this.timer2)
        this.$refs.player.player.off('pause', this.pause)
        this.$refs.player.player.off('play', this.play)
    }
}
</script>

<style lang="scss" scoped>
.video-ptz {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity 1s ease .5s;

    &:hover {
        opacity: 1;
    }
}
</style>
