<template>
    <div class="public-notice">
        <a class="unread-con" @click="toggleNoticeModal(true)">
            <i class="iconcomm commxiaoxi"></i>
            <span class="unread-num" v-if="unreadNumber">{{unreadNumber}}</span>
        </a>
        <div v-if="showNoticeModal" class="page-bg">
            <div class="notice-container">
                <span class="close-notice" @click="toggleNoticeModal(false)"><i class="iconcomm commxiaoxi"></i></span>
                <div class="notice-header">
                    系统公告
                    <i class="iconcomm commguanbi1 pull-right"  @click="toggleNoticeModal(false)" style="color:black;"></i>
                </div>
                <div class="text-right" style="margin-top: 10px;"><a class="note-button" @click="markReadMultiple()"><span class="red-circle" v-if="unreadNumber"></span>全部标注为已读</a></div>
                <div style="margin: 0 30px;overflow:hidden;">
                    <div class="notice-con">
                        <div v-for="note in noticeList" :key="note.id" class="notice-item" @click="markClick(note)">
                            <div class="clearfix">
                                <span v-bind:class="{'noread-circle':!note.isread,'read-block':note.isread}"></span>
                                <span v-bind:class="{'noread-title':!note.isread}" class="note-title">{{note.title}}</span>
                                <span class="pub-time">{{new Date(note.publishTime).Format('yyyy-MM-dd hh:mm:ss')}}</span>
                                <span class="pull-right top-flag" v-if="note.istop == '1'">
                                <i class="iconcomm commxiangshang"></i>置顶消息</span>
                            </div>
                            <div v-html="note.content" class="note-content"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showAlertNoticeModal" class="page-bg">
            <div class="notice-container-alert" id="notice-container-alert">
                <div class="notice-header clearfix" id="notice-header">
                    <span @click="toNoteIndex('prev')">
                        <i class="iconcomm commzuo" v-bind:class="{'end-color':currentIndex === 0}"></i>
                    </span>
                    当前第{{currentIndex+1}} /总共{{unreadNoticeAlertList.length}}条消息
                    <span @click="toNoteIndex('next')">
                        <i class="iconcomm commyou" v-bind:class="{'end-color': currentIndex === unreadNoticeAlertList.length-1}"></i>
                    </span>
                    <span style="position: absolute;right: 5px;"  @click="showAlertNoticeModal = false;">
                        <i class="iconcomm commguanbi1"></i>
                    </span>
                </div>
                <div class="scroll-area">
                    <div class="notice-con">
                        <div class="notice-list" id="notice-list" v-bind:style="{'width': (100*unreadNoticeAlertList.length)+'%'}">
                            <div v-for="note in unreadNoticeAlertList" :key="note.id" v-bind:style="{'width': (100/unreadNoticeAlertList.length)+'%'}" style="display: inline-block;overflow:hidden;vertical-align:top;height: 100%;">
                                <div class="notice-item">
                                    <div class="title-line text-center">
                                        <div class="note-title">{{note.title}}</div>
                                        <div class="note-time">{{new Date(note.publishTime).Format('yyyy-MM-dd hh:mm:ss')}}</div>
                                    </div>
                                    <div v-html="note.content"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-right" @click="toPublicNotice()">
                    <a class="see-more">查看全部</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {api＿getNoticeUnreadCount, api＿getRoleListForPC, api＿getAllNoticePage, api＿makeNoticeRead, api＿makeNoticeAllRead, api＿getNoticeUnreadWindows} from '@comm/request/api'
export default {
    name: 'publicNotice',
    components: {
    },
    data () {
        return {
            allowAlertRouterList: ['main', 'companyManagement', 'businessManagement'], // 允许公告弹框的路由配置
            unreadNumber: 0, // 未读条数
            interval: null, // 定时器（5分钟刷新一次）
            showNoticeModal: false, // 历史公告消息弹框，默认不显示
            noticeList: [], // 历史公告列表
            showAlertNoticeModal: false, // 未读的消息弹框
            getNoticeUnreadCount: api＿getNoticeUnreadCount({ // 获取未读条数
                onlyLatest: true,
                later: true,
                res: {data: []}
            }),
            getRoleListForPC: api＿getRoleListForPC({
                later: true
            }),
            getAllNoticePage: api＿getAllNoticePage({ // 公告列表
                later: true
            }),
            makeNoticeRead: api＿makeNoticeRead({ // 单条公告标记已读
                later: true
            }),
            makeNoticeAllRead: api＿makeNoticeAllRead({ // 多条公告标记已读
                later: true
            }),
            getNoticeUnreadWindows: api＿getNoticeUnreadWindows({ // 未读公告列表
                later: true
            }),
            unreadNoticeAlertList: [], // 未读公告弹框列表
            perNoteWidth: 100, // 每条弹框公告的宽度
            currentIndex: 0 // 当前是第几条公告
        }
    },
    methods: {
        getUnReadNoticeNumber () {
            this.getNoticeUnreadCount.getData({
                comIds: this.comId,
                appOrPc: '01'
            }).then(res => {
                this.unreadNumber = res.body
            })
        },
        // 显示或关闭公告列表
        toggleNoticeModal (ifOpen) {
            this.showNoticeModal = ifOpen
            if (ifOpen) this.noticeListData()
        },
        async noticeListData () {
            await this.getRoleListForPC.getData()
            this.getAllNoticePage.getData({
                comIds: this.comId,
                appOrPc: '01'
            }).then(res => {
                if (res.code === 0) {
                    this.noticeList = res.body.data
                } else {
                    this.noticeList = []
                }
            })
        },
        // 单条--标记已读
        async markClick (item) {
            if (item.isread === 1) return
            await this.makeNoticeRead.getData({id: item.id})
            if (this.makeNoticeRead.res.code === 0 && this.makeNoticeRead.res.body === 1) {
                for (let i = 0; i < this.noticeList.length; i++) {
                    if (item.id === this.noticeList[i].id) {
                        this.noticeList[i]['isread'] = 1
                        break
                    }
                }
            }
        },
        // 多条--标记已读
        markReadMultiple () {
            if (!this.unreadNumber) return
            this.makeNoticeAllRead.getData({comIds: this.comId, appOrPc: '01'}).then(res => {
                if (res.code === 0) {
                    // 标记成功
                    this.getUnReadNoticeNumber()
                    for (let i = 0; i < this.noticeList.length; i++) {
                        this.noticeList[i]['isread'] = 1
                    }
                }
            })
        },
        toNoteIndex (type) {
            let distance = 0
            if (type === 'next') {
                this.currentIndex++
                distance = -this.currentIndex * this.perNoteWidth
                if (this.currentIndex < this.unreadNoticeAlertList.length) {
                    this.makeNoticeRead.getData({id: this.unreadNoticeAlertList[this.currentIndex].id})
                }
            } else if (type === 'prev') {
                this.currentIndex--
                distance = -this.currentIndex * this.perNoteWidth
            }
            if (this.currentIndex >= this.unreadNoticeAlertList.length) {
                this.currentIndex = this.unreadNoticeAlertList.length - 1
                return
            }
            if (this.currentIndex < 0) {
                this.currentIndex = 0
                return
            }
            let animateDom = document.getElementById('notice-list')
            animateDom.style.left = distance + '%'
        },
        getUnReadNoticeAlert () {
            this.showAlertNoticeModal = false
            this.getNoticeUnreadWindows.getData({
                comIds: this.comId,
                type: '01',
                appOrPc: '01'
            }).then(res => {
                if (res.code === 0) {
                    this.unreadNoticeAlertList = res.body
                    if (res.body.length) {
                        this.showAlertNoticeModal = true
                        this.makeNoticeRead.getData(res.body[0].id)
                        setTimeout(() => {
                            this.dragFun()
                        }, 0)
                    }
                } else {
                    this.unreadNoticeAlertList = []
                }
            })
        },
        // 从弹框公告，跳转至历史所有公告
        toPublicNotice () {
            this.showAlertNoticeModal = false
            this.showNoticeModal = true
            this.noticeListData()
        },
        async init () {
            await this.getRoleListForPC.getData()
            this.getUnReadNoticeNumber()
            let currentRouter = this.$route.path
            if (this.allowAlertRouterList.includes(currentRouter)) {
                this.getUnReadNoticeAlert()
            }
        },
        dragFun () {
            // 控制公告弹框跟随鼠标移动
            let container = document.getElementById('notice-container-alert') // 整个移动的区域（弹框整体）
            let headerDrag = document.getElementById('notice-header') // 鼠标点击起作用的区域（仅在点击头部header区域可移动
            let x, y // 存储div的坐标
            let isDrop = false // 移动状态的判断鼠标按下才能移动
            headerDrag.onmousedown = (event) => {
                let e = event || window.event // 要用event这个对象来获取鼠标的位置
                x = e.clientX - container.offsetLeft
                y = e.clientY - container.offsetTop
                isDrop = true // 设为true表示可以移动
            }
            document.onmousemove = (event) => {
                if (isDrop) { // 是否为可移动状态
                    let e = event || window.event
                    let moveX = e.clientX - x // 得到距离左边距离
                    let moveY = e.clientY - y // 得到距离上边距离
                    let maxX = document.documentElement.clientWidth - container.offsetWidth
                    let maxY = document.documentElement.clientHeight - container.offsetHeight
                    moveX = Math.min(maxX, Math.max(0, moveX))
                    moveY = Math.min(maxY, Math.max(0, moveY))
                    container.style.left = moveX + 'px'
                    container.style.top = moveY + 'px'
                }
            }
            document.onmouseup = () => {
                isDrop = false // 设置为false不可移动
            }
        }
    },
    created () {
        // 每五分钟获取一次最新公告信息
        this.interval = setInterval(() => {
            this.getUnReadNoticeNumber()
        }, 300000)
        this.init()
        this.getRoleListForPC.subscribe(res => {
            let rolelist = res.rolelist
            this.comId = ''
            for (let i = 0; i < rolelist.length; i++) {
                if (rolelist[i].roleId === res.currentRole) {
                    this.comId = rolelist[i].comId ? rolelist[i].comId : ''
                    break
                }
            }
        })
        this.makeNoticeRead.subscribe(res => {
            if (res.code === 0 && res.body === 1) {
                this.getUnReadNoticeNumber()
            }
        })
    },
    beforeDestroy () {
        if (this.interval) clearInterval(this.interval)
    }
}
</script>
<style lang="scss">
.public-notice {
    font-size:13px;
    p {
        margin: 0 0 10px;
    }
    ol, ul{
        padding-left: 40px;
        li{
            list-style: decimal;
        }
    }
}
</style>
<style lang="scss" scoped>

.public-notice {
    display: inline-block;
    height: 30px;
    line-height: 39px;
    vertical-align: text-bottom;
    .page-bg{
        position: fixed;
        z-index: 100;
        left:0;
        right:0;
        top:0;
        bottom:0;
        background: rgba(0,0,0,0.5);
        line-height: normal;
        .commguanbi1{
            cursor: pointer;
            font-size: 16px;
        }
    }
    .commxiaoxi{
        font-size:25px;
        cursor: pointer;
    }
    .unread-con{
        position: relative;
        display: inline-block;
        line-height: normal;
        vertical-align: middle;
        .unread-num{
            position: absolute;
            display:inline-block;
            background: #3DB9A9;
            border-radius: 50%;
            left: -14px;
            top: -5px;
            width: 22px;
            height: 22px;
            line-height: 23px;
            text-align: center;
        }
    }
    .notice-container{
        margin:72px 15px;
        height: calc(100vh - 100px);
        position: relative;
        background:rgba(255,255,255,1);
        .red-circle{
            display: inline-block;
            width:6px;
            height: 6px;
            border-radius: 50%;
            background:#FF6262;
            margin-right: 5px;
        }
        .close-notice{
            position: absolute;
            width: 57px;
            height: 65px;
            background: #eff4f8;
            right: 118px;
            top: -65px;
            text-align: center;
            cursor: pointer;
            line-height:65px;
            .commxiaoxi{
                color:#3DB9A9;font-size: 25px;
            }
        }
        .notice-header{
            height:53px;
            background:rgba(239,244,248,1);
            color:rgba(61,185,169,1);
            font-size:18px;
            padding-left: 45px;
            line-height: 53px;
        }
        .note-button{
            display:inline-block;
            width:128px;
            height:30px;
            line-height: 30px;
            text-align: center;
            border:1px solid rgba(61,185,169,1);
            border-radius:4px;
            color:rgba(61,185,169,1);
            margin-right: 40px;
            cursor: pointer;
        }
        .notice-con{
            height: calc(100vh - 200px);
            overflow:auto;
            position: relative;
            right: -17px;
            left: -17p;
            margin-left: -17px;
            span{
                display: inline-block;
            }
        }
        .notice-item{
            border-bottom:1px solid rgba(225,230,235,1);
            padding:25px 0;
            .noread-circle{
                width:11px;
                height:11px;
                margin-right:6px;
                background:rgba(255,97,97,1);
                border-radius:50%;
            }
            .read-block{
                width:11px;
                height:11px;
                margin-right:6px;
            }
            .note-title{
                font-size:18px;
                color:rgba(15,39,66,1);
                width:260px;
                &.noread-title{
                    color:rgba(34,142,246,1);
                }
            }
            .pub-time{
                color:rgba(13,39,64,0.6);
                font-size:12px;
            }
            .top-flag{
                font-size:14px;
                color:rgba(154,160,167,1);
                margin-right: 25px;
            }
            .note-content{
                color:rgba(13,39,64,0.7);
                padding: 15px 20px 0;
            }
        }
    }
    .notice-container-alert{
        width:790px;
        height: 400px;
        max-width: 1110px;
        left:calc(50% - 395px);
        top:91px;
        position: absolute;
        background:rgba(255,255,255,1);
        resize: both;
        overflow: auto;
        .notice-header{
            height:126px;
            background: url('header-bg.png') no-repeat;
            background-size: cover;
            background-position: center;
            font-size:0.18rem;
            line-height: 38px;
            text-align: center;
            color: white;
            font-size: 16px;
            cursor: move;
            >span{
                width:50px;
                cursor: pointer;
                display: inline-block;
            }
            .iconcomm{
                color:white;
                &.end-color{
                    color:#BCBCBC;
                }
            }
        }
        .scroll-area{
            width:100%;padding:0 20px;height:calc(100% - 180px);
        }
        .notice-con{
            overflow-x: hidden;
            color: black;
            width:100%;height: 100%;
            .notice-list{
                left:0;
                position: relative;
                height: 100%;
                .notice-item{
                    width:100%;
                    height: 100%;
                    overflow: auto;
                    position: relative;
                    right: -17px;
                }
                .title-line{
                    margin:12px 0 30px;
                    .note-title{
                        font-size:20px;
                        color:rgba(0,0,0,1);
                        margin-bottom: 6px;
                    }
                    .note-time{
                        color:rgba(1,1,1,0.8);
                        font-size:12px;
                    }
                }
            }
        }
        .see-more{
            color:rgba(34,142,246,1);
            line-height: 50px;
            margin-right: 35px;
            cursor: pointer;
            font-size: 15px;
            border: 1px solid rgba(34,142,246,1);
            padding: 5px 15px;
        }
    }
}
</style>
