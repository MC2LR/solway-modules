<template>
    <div class="video-page">
        <div class="video-con" v-if="videoSrc" :style="{height: winHeight + 'px'}">
            <video :src="videoSrc" controls="controls" autoplay style="width:100%;height:100%;"></video>
        </div>
        <div class="js_dialog" v-if="alertModal">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__bd">请输入密码</div>
                <div class="weui-dialog__bd"><input class="weui-input" v-model="password" type="password" placeholder="请输入密码"/></div>
                <div v-if="errorTip" style="padding:15px;">
                    <alert
                        v-bind:title=errorTip
                        type="error">
                    </alert>
                </div>
                <div class="weui-dialog__ft">
                    <a class="weui-dialog__btn weui-dialog__btn_primary" @click="searchVideo()">{{isloading ? '正在打开视频...' : '确定'}}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {api＿getOpenId, api＿getVideo} from '@/request/api'
import {Alert} from 'element-ui'
export default {
    data () {
        return {
            videoSrc: null,
            alertModal: false,
            code: '',
            openId: '',
            password: '',
            errorTip: '', // 错误提示，默认不显示
            winHeight: window.innerHeight,
            isloading: false,
            getOpenId: api＿getOpenId({ // 获取Openid
                later: true,
                onlyLatest: true,
                res: {
                    data: []
                }
            }),
            getVideo: api＿getVideo({ // 获取视频地址
                later: true
            })
        }
    },
    methods: {
        searchVideo () {
            this.errorTip = ''
            this.isloading = true
            this.getVideo.getData({secert: this.password, openid: this.openId}).then(res => {
                this.isloading = false
                if (res.code === 0) {
                    this.videoSrc = res?.body?.url
                } else {
                    this.videoSrc = null
                    this.errorTip = res.msg
                }
                if (!this.videoSrc) {
                    this.alertModal = true
                } else {
                    this.alertModal = false
                }
            })
        },
        // 微信动态code
        getWxCode () {
            let paramsArr = window.location.search.substring(1).split('&')
            paramsArr.map(v => {
                let cur = v.split('=')
                if (cur[0] === 'code') this.code = cur[1]
            })
        },
        // openId
        getOpenIdData () {
            this.getOpenId.getData({
                code: this.code
            }).then(res => {
                this.openId = res.openid
                this.searchVideo()
            })
        }
    },
    created () {
        this.getWxCode()
        this.getOpenIdData()
    },
    mounted () {
        // 禁止长按事件
        window.addEventListener('contextmenu', (e) => {
            e.preventDefault()
        })
        document.oncontextmenu = function () {
            return false
        }
    },
    components: {
        Alert
    }
}
</script>

<style lang="scss" scoped>
.video-page {
    font-size:0.16rem;
    .m-t-20{
        margin-top:0.2rem;
    }
    .m-b-20{
        margin-bottom:0.2rem;
    }
    .video-con{
        width:100%;
    }
}
</style>
