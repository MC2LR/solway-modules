<template>
    <div class="video-surveillance">
        <page-header :collapse="asideCollapse" @switchCollapse="v => asideCollapse = v" @colChange="v => col = v" :col="col" class="header"></page-header>
        <aside-tree v-show="!asideCollapse" :max="max" @checkedChange="checkedChange" @treeLoad="treeLoad" class="video-menu"></aside-tree>
        <div class="video-list-container" :class="{asideCollapse: asideCollapse}">
            <video-list
                :ip="ip"
                :gbsToken="gbsToken"
                :maxView="max"
                :col="col"
                :aspect="aspect"
                :websoket="websoket"
                :checkedVideoList="checkedVideoList">
            </video-list>
        </div>
    </div>
</template>

<script>
import VideoList from './video/VideoList'
import PageHeader from './Header'
import AsideTree from './AsideTree'
// import axios from 'axios'
// import {isProduction} from '@comm/tools/env'
import {api＿getToken} from '@videoSurveillance/request/api'
export default {
    components: {
        VideoList,
        PageHeader,
        AsideTree
    },
    data () {
        return {
            aspect: '16:9',
            col: 1,
            checkedVideoList: [],
            max: 10,
            moduleName: process.env.name,
            gbsToken: '',
            ip: 'http://edge.solway.com.cn:10000',
            // ip: isProduction ? 'http://edge.solway.com.cn:10000' : 'http://103.3.121.25:10000',
            tree: null,
            websoket: null,
            asideCollapse: false
        }
    },
    created () {
        this.iconfont = this.moduleName !== 'videoSurveillance' ? import('../projectConfig/iconfont') : ''
        this.getToken()
    },
    methods: {
        treeLoad (tree) {
            this.tree = tree
            this.websoket = this.openWs(tree.onlineUrl)
        },
        openWs (url) {
            const WS = new WebSocket(url)
            WS.onclose = () => {
                if (this._isBeingDestroyed) return
                this.websoket = this.openWs(url)
            }
            return WS
        },
        checkedChange (list) {
            this.checkedVideoList = list
            if (list.length > 4) {
                this.col = 3
            } else if (list.length > 1) {
                this.col = 2
            } else {
                this.col = 1
            }
        },
        getToken () {
            api＿getToken().subscribe(res => {
                this.gbsToken = res.URLToken || res.AuthToken
            })
        }
    },
    beforeDestroy () {
        this.websoket && this.websoket.close && this.websoket.close()
    }
}
</script>

<style lang="scss" scoped>
@import './theme/theme';

.video-surveillance {
    height: 100vh;
    padding: 0 15px;
    @include page_c(background-color, $pageWrapBgColor);

    header.header {
        height: 50px;
    }

    .video-menu {
        height: calc(100% - 70px);
        width: 300px;
        float: left;
        @include page_c(background-color, $pageMenuBgColor);
    }

    .video-list-container {
        height: calc(100% - 70px);
        margin-left: 310px;
        margin-right: -5px;

        &.asideCollapse {
            margin-left: 0;
        }
    }
}
</style>
