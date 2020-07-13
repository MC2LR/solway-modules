<template>
    <div class="message-subscribe">
        <div v-if="errorTip">{{errorTip}}</div>
        <div v-if="!errorTip">
            <p style="margin: 10px 0;">订阅后将通过当前公众号定时推送已订阅消息，可订阅的消息模板如下：</p>
            <div class="message-list">
                <div class="message-head">
                    <div class="weui-flex" style="background: #e8e8e8;">
                        <div class="weui-flex__item">模板类型</div>
                        <div class="weui-flex__item">推送时间</div>
                        <div class="width-big weui-flex">
                            <div class="weui-flex__item">推送名称</div>
                            <div style="width:105px;line-height: 32px;">操作</div>
                        </div>
                    </div>
                </div>
                <div class="message-item-list">
                    <div class="message-item" v-for="item in messageList" :key="item.type.value">
                        <div class="weui-flex">
                            <div class="weui-flex__item">{{item.type.name}}</div>
                            <div class="weui-flex__item">{{item.type.time}}</div>
                            <div class="width-big">
                                <div class="weui-flex" v-for="childItem in item.ls" :key="childItem.id">
                                    <div class="weui-flex__item">
                                        {{childItem.name}}
                                    </div>
                                    <div style="width:105px;">
                                        <input class="weui-switch" type="checkbox" v-model='childItem.subscriber' @change="subscribeOrNot(childItem.subscriber, childItem.id)"/> {{childItem.subscriber === 1 ? '已订阅' : '未订阅'}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 成功弹框提示 -->
            <div v-if="msg">
                <div class="weui-mask_transparent"></div>
                <div class="weui-toast">
                    <i class="weui-icon-success-no-circle weui-icon_toast"></i>
                    <p class="weui-toast__content">{{msg}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {api＿getOpenIdNew, api＿doWxLogin, api＿queryMsgSubList, api＿updateMsgSub} from '@/request/api'
export default {
    data () {
        return {
            code: '',
            openId: '',
            messageList: [], // 消息列表
            msg: '', // 接口回来的提示
            errorTip: '', // 提示信息
            getOpenIdNew: api＿getOpenIdNew({ // 获取openID
                later: true,
                onlyLatest: true
            }),
            doWxLogin: api＿doWxLogin({ // 微信公众号信息存入
                later: true,
                onlyLatest: true
            }),
            queryMsgSubList: api＿queryMsgSubList({ // 消息模板列表
                later: true,
                onlyLatest: true
            }),
            updateMsgSub: api＿updateMsgSub({ // 订阅、取消
                later: true,
                sameTimeOnce: true
            })
        }
    },
    methods: {
        getWxCode () {
            let searchArr = window.location.search.substring(1).split('&')
            searchArr.map(v => {
                let cur = v.split('=')
                if (cur[0] === 'code') {
                    this.code = cur[1]
                }
            })
            if (window.location.hash.split('?').length > 1) {
                let hashArr = window.location.hash.split('?')[1].split('&')
                hashArr.map(v => {
                    let cur = v.split('=')
                    if (cur[0] === 'date') {
                        this.dayTime = new Date(Number(cur[1]))
                    }
                    if (cur[0] === 'cycle') {
                        this.cycle = cur[1]
                    }
                })
            }
        },
        getOpenIdData () {
            this.getOpenIdNew.getData({
                code: this.code
            }).then(res => {
                if (res.code === 200 || res.code === 0) {
                    this.openId = res.data.openId
                    this.saveWxLoginInfo()
                }
            })
        },
        // 模拟登陆-存入公众号信息
        saveWxLoginInfo () {
            this.doWxLogin.getData({openId: this.openId}).then(async (res) => {
                if (res.status === 12) {
                    this.errorTip = '账号未绑定，请通过【账户绑定】进行绑定'
                } else if (res.status === 5) {
                    this.errorTip = '新能云用户被删除'
                } else if (res.status === 4) {
                    this.errorTip = '新能云用户被锁'
                } else if (res.status === 2) {
                    this.errorTip = '接口error'
                } else if (res.status === 1) {
                    this.getMessageTplData()
                }
            })
        },
        getMessageTplData () {
            this.queryMsgSubList.getData({openId: this.openId}).then(res => {
                if (res.code === 0 || res.code === 200) {
                    this.messageList = res.data
                }
            })
        },
        subscribeOrNot (checked, tplId) {
            let enable = checked ? 1 : 0
            this.updateMsgSub.getData({openId: this.openId, tplId, enable}).then(res => {
                if (res.code === 200 || res.code === 0) {
                    this.msg = res.msg
                    setTimeout(() => {
                        this.msg = ''
                        this.getMessageTplData()
                    }, 500)
                }
            })
        }
    },
    created () {
        this.getWxCode()
        this.getOpenIdData()
    }
}
</script>

<style lang="scss" scoped>
.message-subscribe {
    font-size:0.16rem;
    .message-list{
        margin:20px 0;
    }
    .width-big{
        width:58%;
    }
    .message-head{
        .weui-flex__item{
            background:#e8e8e8;
            height: 32px;
            line-height: 32px;
        }
    }
    .message-item-list{
        height:calc(100vh - 110px);
        overflow:auto;
        -webkit-overflow-scrolling: touch;
        font-size: 0.13rem;
    }
    .message-item{
        margin: 10px 0;
        line-height: 32px;
        .weui-switch{
            vertical-align: middle;
        }
    }
}
</style>
