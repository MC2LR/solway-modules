<template>
    <div class="account-bind">
        <div class="page" v-if="unbinded">
            <div>新能云账号绑定</div>
            <div class="weui-form">
                <div class="weui-form__control-area">
                    <div class="weui-cells__group weui-cells__group_form">
                        <div class="weui-cells weui-cells_form">
                            <div class="weui-cell">
                                <div class="weui-cell__hd"><label class="weui-label">账号</label></div>
                                <div class="weui-cell__bd">
                                    <input class="weui-input" v-model="userName" @blur="judgeRegisted()" autofocus type="text" placeholder="新能云账号" />
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
                                <div class="weui-cell__bd">
                                    <input class="weui-input" v-model="password" @blur="valiPass()" type="password" placeholder="请输入密码"/>
                                    <button id="js_input_clear" class="weui-btn_reset weui-btn_icon weui-btn_input-clear">
                                        <i class="weui-icon-clear"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="weui-form__opr-area">
                    <a class="weui-btn weui-btn_primary" v-bind:class="{'disabledBtn': (errorTip || loading)}" @click="toBind()">绑定</a>
                </div>
            </div>
        </div>
        <div v-if="!unbinded" class="m-b-20">
            <div class="m-b-20 m-t-20">您已绑定新能云账号：{{bindAccount}}</div>
            <div>
                <a class="weui-btn weui-btn_primary" @click="confirmFlag = true" v-bind:class="{'disabledBtn': loading}">解除绑定</a>
            </div>
        </div>
        <!-- 错误提示 -->
        <div v-if="errorTip" style="padding:0 32px;">
            <alert
                v-bind:title=errorTip
                type="error">
            </alert>
        </div>
        <!-- 成功弹框提示 -->
        <div v-if="successTip">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-icon-success-no-circle weui-icon_toast"></i>
                <p class="weui-toast__content">{{successMsg}}</p>
            </div>
        </div>
        <!-- confirm确认框 -->
        <div class="js_dialog" v-if="confirmFlag">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__bd">此操作不可恢复，确定解绑吗?</div>
                <div class="weui-dialog__ft">
                    <a class="weui-dialog__btn weui-dialog__btn_default" @click="confirmFlag = false">否</a>
                    <a class="weui-dialog__btn weui-dialog__btn_primary" @click="unbind()">确定</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {api＿getOpenId, api＿checkAccountBinding, api＿accountBinding, api＿removeBinding, api＿checkPhone} from '@/request/api'
import {Alert} from 'element-ui'
// 1.获取code（微信接口）
// 2.获取openID（后台接口），并存本地
// 3.获取本微信号，绑定的状态（后台接口）
// 4.绑定账号，填写手机号，失去焦点，接口判断此账号是否是新能云已注册的账号，若没有注册，提示去新能云平台注册
export default {
    data () {
        return {
            unbinded: true, // 绑定状态
            bindedNumber: '', // 已绑定账号
            code: '', // 通过微信获取的code
            openId: '', // openID
            userName: '', // 账号
            password: '', // 密码
            bindAccount: '', // 绑定账户名称（手机号）
            errorTip: '', // 错误提示，默认不显示
            successTip: false, // 成功提示
            confirmFlag: false, // 二次确认框
            loading: false, // loading中
            getOpenId: api＿getOpenId({ // 获取Openid
                later: true,
                onlyLatest: true,
                res: {
                    data: []
                }
            }),
            checkAccountBinding: api＿checkAccountBinding({ // 判断是否已绑定
                later: true,
                onlyLatest: true,
                res: {
                    data: []
                }
            }),
            accountBinding: api＿accountBinding({ // 绑定
                later: true,
                sameTimeOnce: true,
                res: {
                    data: []
                }
            }),
            removeBinding: api＿removeBinding({ // 解绑
                later: true,
                sameTimeOnce: true,
                res: {
                    data: []
                }
            }),
            checkPhone: api＿checkPhone({ // 判断账号是否注册过
                later: true,
                onlyLatest: true
            })
        }
    },
    methods: {
        // 判断该手机号是否注册过
        judgeRegisted () {
            if (!this.userName) return
            this.errorTip = ''
            this.checkPhone.getData({phone: this.userName}).then(res => {
                if (res.key !== '2') {
                    this.errorTip = '账号未注册，请到新能云注册'
                }
            })
        },
        // 判断是否绑定过账号
        judgeIfBind () {
            this.checkAccountBinding.getData({
                openId: this.openId
            }).then(res => {
                if (res.code === 0 || res.code === 200) {
                    if (res.data) { // 已绑定
                        this.unbinded = false
                        this.bindAccount = res.data.account
                    } else { // 未绑定
                        this.unbinded = true
                    }
                } else {
                    this.errorTip = res.msg ? res.msg : '是否绑定接口error'
                }
            })
        },
        // 校验密码
        valiPass () {
            if (!this.password) {
                this.errorTip = '密码必填'
                return false
            } else {
                 this.errorTip = ''
            }
        },
        // 绑定账号
        toBind () {
            if (this.errorTip) return
            this.errorTip = ''
            if (!this.userName) {
                this.errorTip = '账号必填'
                return
            }
            if (!this.password) {
                this.errorTip = '密码必填'
                return
            }
            this.loading = true
            this.accountBinding.getData({
                userName: this.userName,
                password: this.password,
                openId: this.openId
            }).then(res => {
                this.loading = false
                if (res.code === 0 || res.code === 200) {
                    if (res.data.status === 1) {
                        this.successTip = true
                        this.successMsg = '绑定成功'
                        setTimeout(() => {
                            this.successTip = false
                            this.judgeIfBind()
                        }, 1000)
                    } else if (res.data.status === 2) {
                        this.errorTip = '密码错误'
                    } else if (res.data.status === 4) {
                        this.errorTip = '关联用户被锁'
                    } else if (res.data.status === 5) {
                        this.errorTip = '关联用户被删除'
                    } else {
                        this.errorTip = '绑定失败'
                    }
                } else {
                    this.errorTip = '绑定失败'
                }
            })
        },
        // 解绑账号
        unbind () {
            this.confirmFlag = false
            this.loading = true
            this.removeBinding.getData({
                openId: this.openId
            }).then(res => {
                this.loading = false
                if ((res.code === 0 || res.code === 200) && res.data.status === 1) {
                    this.successTip = true
                    this.successMsg = '解绑成功'
                    setTimeout(() => {
                        this.successTip = false
                        this.userName = ''
                        this.password = ''
                        this.judgeIfBind()
                    }, 1000)
                } else {
                    this.errorTip = '解绑失败'
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
                this.judgeIfBind()
            })
        }
    },
    created () {
        this.getWxCode()
        this.getOpenIdData()
    },
    components: {
        Alert
    }
}
</script>

<style lang="scss" scoped>
.account-bind {
    font-size:0.16rem;
    .m-t-20{
        margin-top:0.2rem;
    }
    .m-b-20{
        margin-bottom:0.2rem;
    }
    .disabledBtn{background: grey;}
}
</style>
