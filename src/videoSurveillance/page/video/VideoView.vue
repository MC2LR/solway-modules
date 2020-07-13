<template>
    <div class="video-view">
        <LivePlayer @message="$message" :aspect="aspect" :videoUrl="videoUrl" fluent autoplay live stretch :hasaudio="true" :loading.sync="bLoading" v-loading="bLoading" element-loading-text="加载中"></LivePlayer>
        <video-ptz v-if="ctrl" ref="ptz" @mouseup.native="ctrlStop" @control="controlPtz" class="video-ptz"></video-ptz>
        <div v-if="!onLine" class="device-status">设备离线</div>
        <div v-if="onLine && (channelStatus !== 'ON')" class="device-status">通道OFF</div>
    </div>
</template>

<script>
import LivePlayer from '@liveqing/liveplayer'
import axios from 'axios'
import VideoPtz from './VideoPtz'
const win = window
export default {
    props: ['sn', 'ip', 'gbsToken', 'ctrl', 'aspect'],
    components: {
        LivePlayer,
        VideoPtz
    },
    data () {
        return {
            videoUrl: '',
            bLoading: true,
            onLine: true,
            channelStatus: 'ON'
        }
    },
    created () {
        this.streamStart()
        this.getDeviceInfo()
        this.getChannelinfo()
    },
    methods: {
        controlPtz (type) {
            axios.get(this.ip + '/api/v1/control/ptz', {
                params: {serial: this.sn.split('-')[0], command: type, token: this.gbsToken, code: this.sn.split('-')[1]},
                withCredentials: true
            })
        },
        ctrlStop (event) {
            if (!event.target.dataset.ptzctrl) return
            this.controlPtz('stop')
        },
        flvSupported () {
            return win.videojs.browser.IE_VERSION || (win.flvjs.getFeatureList() && win.flvjs.getFeatureList().mseLiveFlvPlayback)
        },
        streamStart () {
            axios.get(this.ip + '/api/v1/stream/start', {
                params: {serial: this.sn.split('-')[0], token: this.gbsToken, code: this.sn.split('-')[1]},
                withCredentials: true
            }).then(res => {
                this.videoUrl = this.flvSupported() ? res.data.FLV : res.data.HLS
            })
        },
        getDeviceInfo () {
            axios.get(this.ip + '/api/v1/device/info', {
                params: {serial: this.sn.split('-')[0], token: this.gbsToken, code: this.sn.split('-')[1]},
                withCredentials: true
            }).then(res => {
                this.onLine = res.data.Online
            })
        },
        getChannelinfo () {
            axios.get(this.ip + '/api/v1/device/channelinfo', {
                params: {serial: this.sn.split('-')[0], token: this.gbsToken, code: this.sn.split('-')[1]},
                withCredentials: true
            }).then(res => {
                this.channelStatus = res.data.Status
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.video-view {
    width: 100%;
    height: 100%;
    position: relative;

    // &:hover {
    //     .video-ptz {
    //         opacity: 0.1;
    //     }
    // }

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

    .device-status {
        width: max-content;
        height: 1em;
        line-height: 1;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        font-size: 30px;
        color: #fff;
    }
}
</style>
