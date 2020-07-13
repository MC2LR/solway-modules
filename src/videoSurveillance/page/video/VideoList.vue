<template>
    <transition-group tag="div" class="video-list">
        <div class="video-container" v-for="(item, index) in maxView" :key="$oc(checkedVideoList[index], 'id') || item" :style="{width: 100/col + '%'}">
            <div class="video-view" :class="'video-view-' + aspect.split(':').join('-')">
                <div v-if="checkedVideoList[index]" :key="checkedVideoList[index].id" class="video">
                    <div
                        @click="$bus.emit($route.name + 'unCheck', checkedVideoList[index])"
                        class="close-window">
                        <span>关闭窗口</span>
                    </div>
                    <video-view
                        v-if="videoReadied && checkedVideoList[index].sn"
                        :ctrl="checkedVideoList[index].ctrl === '01'"
                        :ip="ip"
                        :aspect="aspect"
                        :gbsToken="gbsToken"
                        :sn="checkedVideoList[index].sn">
                    </video-view>
                    <old-video
                        :aspect="aspect"
                        v-else-if="videoReadied && checkedVideoList[index].ctrl === '02' && checkedVideoList[index].pointDest && checkedVideoList[index].pointSource"
                        :data="checkedVideoList[index]">
                    </old-video>
                    <old-ctrl-video
                        :aspect="aspect"
                        v-else-if="videoReadied && checkedVideoList[index].ctrl === '01' && checkedVideoList[index].destUrl && websoket"
                        :websoket="websoket"
                        :data="checkedVideoList[index]">
                    </old-ctrl-video>
                    <div v-else class="old-video-view">
                        <p>{{checkedVideoList[index].name}}</p>
                        <p class="link" @click="$router.push({path: '/iframe', query: {path: 'videoSurveillanceNew'}})">失败，点击去2.0版本查看</p>
                    </div>
                </div>
                <div v-else class="video"></div>
                <i :style="{fontSize: 'calc((100vw - ' + '400px)' + ' / ' + col * 2 + ')'}" class="iconfont videojiankong-"></i>
            </div>
        </div>
    </transition-group>
</template>

<script>
import { independent } from '@comm/tools/env'
import { addJs } from '@comm/tools/addCssJs'
const staticSrc = independent ? `/static/static-videoSurveillance` : `/module/videoSurveillance/static`
export default {
    components: {
        VideoView: () => import('./VideoView'),
        OldVideo: () => import('./OldVideo'),
        OldCtrlVideo: () => import('./OldVideoAndCtrl')
    },
    props: {
        ip: {
            type: String
        },
        websoket: {
            default: null
        },
        gbsToken: {
            type: String
        },
        maxView: {
            type: Number,
            required: true
        },
        col: {
            type: Number,
            required: true
        },
        aspect: {
            type: String,
            required: true
        },
        checkedVideoList: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            videoReadied: false
        }
    },
    async created () {
        await addJs(staticSrc + '/LivePlayer/dist/component/liveplayer-lib.min.js')
        this.videoReadied = true
    }
}
</script>

<style lang="scss" scoped>
@import '../theme/theme';

.video-list {
    height: 100%;
    overflow-y: auto;

    .video-container {
        float: left;
        padding: 0 5px;
        margin-bottom: 10px;
        transition: all .5s ease;

        >.video-view {
            width: 100%;
            position: relative;
            overflow: hidden;
            @include page_c(background-color, $pageMenuBgColor);

            &.video-view-16-9 {
                padding: calc(100% / 16 * 9 / 2) 0;
            }
            &.video-view-4-3 {
                padding: calc(100% / 4 * 3 / 2) 0;
            }

            .video {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                z-index: 1;

                &:hover {
                    .close-window {
                        height: 2em;
                    }
                }

                .close-window {
                    position: absolute;
                    width: max-content;
                    top: 0;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    height: 0;
                    line-height: 2em;
                    transition: height .5s ease;
                    overflow: hidden;
                    cursor: pointer;
                    @include c(color, $text_c1);
                    z-index: 9999;
                    font-size: 18px;
                }

                .old-video-view {
                    font-size: 30px;
                    line-height: 1.5;
                    padding: 20px;
                    position: relative;
                    width: 100%;
                    height: 100%;

                    .link {
                        @include c(color, $text_c1);
                        cursor: pointer;
                        font-size: 25px;
                    }
                }
            }

            i.iconfont {
                position: absolute;
                right: -8%;
                bottom: -20%;
                // @include c(color, #989BA3);
                @include page_c(color, $pageListIconColor);
            }
        }
    }
}
</style>
