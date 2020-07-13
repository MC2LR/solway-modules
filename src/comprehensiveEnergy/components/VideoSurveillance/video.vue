<template>
    <div class="real-video">
        <iframe
            v-if="isPlay"
            :key="iframeKey"
            :src="src"
            width="100%"
            height="100%"
            ref="ysopen"
            allowfullscreen>
        </iframe>
        <div class="transparent" @dblclick="isFull ? exitFull() : requestFullScreen()"></div>
        <div class="pause-box" v-if="!isPlay">
            <img :src="lappDeviceCapture.res.data.picUrl" alt="视频图片">
            <i @click="play" class="iconfont iconshipin"></i>
        </div>
        <div class="retry" v-if="retry">
            <i @click="iframeKey = Date.now(); retry = false; isPlay = true;" class="iconfont iconzhongbo"></i>
        </div>
        <div class="control">
            <div class="control-strip" :class="{hasprogress: false}">
                <i @click="() => postMessage('stop')" v-if="isPlay" title="暂停" class="iconfont iconzanting pull-left"></i>
                <i @click="play" v-if="!isPlay" title="播放" class="iconfont iconshipin pull-left"></i>
                <i @click="requestFullScreen" v-if="!isFull" title="全屏" class="iconfont iconquanping pull-right"></i>
                <i @click="exitFull" v-if="isFull" title="退出全屏" class="iconfont iconleavefullscreen pull-right"></i>
                <i @click="() => postMessage('capturePicture')" v-if="isPlay" title="截屏" class="iconfont iconjieping pull-right"></i>
                <!-- <i @click="() => postMessage('openSound')" v-if="!selfAudio" title="开启声音" class="iconfont iconjingyin pull-right"></i>
                <i @click="() => postMessage('closeSound')" v-if="selfAudio" title="静音" class="iconfont iconshengyin1 pull-right"></i> -->
                <span
                    @click="$bus.emit('historyVideo', {
                        verificationCode: verificationCode,
                        serialNumber: serialNumber,
                        channel: channel,
                        channelName: channelName
                    })"
                    v-if="realTime" class="pull-right">历史录像</span>

                <!-- <div v-if="!realTime" class="progress-box">
                    <div class="progress-bar">
                        <div class="progress"></div>
                    </div>
                    <div class="time-bar"></div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { api＿lappVideoByTime, api＿lappDeviceCapture } from '@/request/api'
import { independent } from '@comm/tools/env'
import {requestFullScreen, isFullscreen, exitFull} from '@comm/tools'

const staticSrc = independent ? '/static/static-comprehensiveEnergy' : '/module/comprehensiveEnergy/static'

export default {
    props: {
        realTime: {
            type: Boolean,
            default: true
        },
        verificationCode: {
            type: String,
            required: true
        },
        serialNumber: {
            type: String,
            required: true
        },
        channel: {
            type: Number,
            required: true
        },
        accessToken: {
            type: String,
            required: true
        },
        channelName: {
            type: String
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        audio: {
            type: Boolean,
            default: true
        },
        begin: {
            type: String
        },
        end: {
            type: String
        }
    },
    data () {
        return {
            lappVideoByTime: api＿lappVideoByTime({
                data: {
                    accessToken: this.accessToken,
                    deviceSerial: this.serialNumber
                }
            }),
            lappDeviceCapture: api＿lappDeviceCapture({
                later: true,
                res: {
                    data: {
                        picUrl: 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='
                    }
                }
            }),
            retry: false,
            iframeKey: Date.now(),
            isPlay: this.autoplay,
            selfAudio: this.audio,
            isFull: false,
            osdTime: this.realTime ? '' : 0,
            startTime: this.begin && this.begin.substr(8)
        }
    },
    mounted () {
        window.addEventListener('message', this.postMessageFun, false)
        window.addEventListener('resize', this.isFullscreen, false)
        if (!this.realTime) {
            this.historyTimer = setInterval(() => this.postMessage('getOSDTime'), 1000)
        }
    },
    computed: {
        iframeSrc () {
            return `${staticSrc}/ezuikit/iframe.html`
        },
        url () {
            const {verificationCode, serialNumber, channel, realTime} = this
            const extensionName = realTime ? 'live' : 'rec'
            return `ezopen://${verificationCode}@open.ys7.com/${serialNumber}/${channel}.${extensionName}`
        },
        src () {
            const {iframeSrc, accessToken, isPlay, selfAudio, url, begin, end} = this
            return `${iframeSrc}?url=${url}&autoplay=${isPlay + 0}&audio=${selfAudio + 0}&accessToken=${accessToken}&begin=${begin || ''}&end=${end || ''}`
        }
    },
    methods: {
        postMessage (data) {
            this.$refs.ysopen && this.$refs.ysopen.contentWindow && this.$refs.ysopen.contentWindow.postMessage(data, location.origin + this.iframeSrc)
        },
        play () {
            this.iframeKey = Date.now()
            this.isPlay = true
        },
        stop () {
            this.isPlay = false
            this.realTime && this.lappDeviceCapture.getData({
                accessToken: this.accessToken,
                deviceSerial: this.serialNumber,
                channelNo: this.channel
            })
        },
        postMessageFun (event) {
            if (event.origin !== location.origin) return
            if (event.data === 'stop') {
                return this.stop()
            }
            if (event.data.name === 'getOSDTime') {
                this.setOsdTime(event.data.time)
            }
            if (event.data === 'openSound') {
                this.selfAudio = true
                return
            }
            if (event.data === 'closeSound') {
                this.selfAudio = false
            }
        },
        requestFullScreen () {
            requestFullScreen(this.$el)
        },
        isFullscreen () {
            this.isFull = isFullscreen(this.$el)
        },
        exitFull,
        setOsdTime (timeStamp) {
            if (timeStamp > 0) {
                this.osdTime = timeStamp
            } else if (this.osdTime > 0) {
                this.retry = true
                this.isPlay = false
                this.osdTime = 0
            }
        }
    },
    beforeDestroy () {
        this.isPlay && this.$refs.ysopen.contentWindow && this.postMessage('stop')
        window.removeEventListener('message', this.postMessageFun)
        window.removeEventListener('resize', this.isFullscreen)
        clearInterval(this.historyTimer)
    }
}
</script>
<style lang="scss" scoped>
.real-video {
    position: relative;
    background-color: #072C4A;

    // &:hover {
    //     .control-strip {
    //         height: 30px;
    //         transition: all .4s ease .2s;
    //     }
    // }

    iframe {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .pause-box {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #072C4A;

        img {
            width: 100%;
            height: 100%;
        }

        i.iconfont.iconshipin {
            font-size: 50px;
            width: 50px;
            height: 50px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            @include c(color, $text_c1);
            cursor: pointer;
        }
    }

    .retry {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #072C4A;

        i.iconfont.iconzhongbo {
            font-size: 50px;
            width: 50px;
            height: 50px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            @include c(color, $text_c1);
            cursor: pointer;
        }
    }

    .transparent {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .control {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 40%;

        &:hover {
            .control-strip {
                height: 30px;
                transition: all .4s ease;

                &.hasprogress {
                    height: 50px;
                }
            }
        }

        .control-strip {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 0;
            background-color: #0B395E;
            transition: all .4s ease .5s;
            line-height: 30px;
            overflow: hidden;
            padding: 0 20px;
            user-select: none;

            i.iconfont {
                @include c(color, $text_c2);
                font-size: 16px;
                cursor: pointer;

                &.iconjieping {
                    font-size: 17px;
                }

                &.pull-right {
                    margin-left: 40px;
                }

                &.pull-left {
                    margin-right: 40px;
                }
            }

            span {
                font-size: 12px;
                cursor: pointer;
            }

            .progress-box {
                overflow: hidden;
                height: 100%;
                background-color: #fff;
                padding-top: 11px;

                .progress-bar {
                    height: 8px;
                    border-radius: 4px;
                    background-color:gray;
                }
            }

        }
    }

}
</style>
